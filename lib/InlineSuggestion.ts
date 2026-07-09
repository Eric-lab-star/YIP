// InlineSuggestion.ts
// VSCode Copilot 스타일 인라인 자동완성 확장.
// 입력이 멈추면(디바운스) 서버에 커서 앞/뒤 문맥을 보내 이어쓸 텍스트를
// 받아오고, 커서 위치에 회색 "고스트 텍스트"를 데코레이션으로 표시한다.
// Tab 으로 수락, Esc/타이핑으로 취소된다.
import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";

export interface InlineSuggestionOptions {
  // 입력이 멈춘 뒤 제안을 요청하기까지 대기 시간(ms)
  debounce: number;
  // 제안 텍스트를 받아오는 함수. 빈 문자열이면 제안 없음.
  fetchSuggestion: (ctx: {
    before: string;
    after: string;
  }) => Promise<string>;
}

const suggestionKey = new PluginKey<DecorationSet>("inlineSuggestion");

// 플러그인 외부에서 현재 제안 텍스트를 추적하기 위한 가벼운 상태.
interface SuggestionState {
  text: string;
  // 제안이 위치한 문서상의 위치
  pos: number;
}

let current: SuggestionState | null = null;

export const InlineSuggestion = Extension.create<InlineSuggestionOptions>({
  name: "inlineSuggestion",

  addOptions() {
    return {
      debounce: 500,
      fetchSuggestion: async () => "",
    };
  },

  addProseMirrorPlugins() {
    const options = this.options;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let reqId = 0;

    const clearSuggestion = (view: import("@tiptap/pm/view").EditorView) => {
      if (!current) return;
      current = null;
      view.dispatch(view.state.tr.setMeta(suggestionKey, { clear: true }));
    };

    return [
      new Plugin<DecorationSet>({
        key: suggestionKey,

        state: {
          init: () => DecorationSet.empty,
          apply(tr, old, _oldState, newState) {
            const meta = tr.getMeta(suggestionKey);
            if (meta?.clear) return DecorationSet.empty;

            if (meta?.show) {
              const { text, pos } = meta as { text: string; pos: number };
              if (!text) return DecorationSet.empty;
              const widget = Decoration.widget(
                pos,
                () => {
                  const span = document.createElement("span");
                  span.className = "inline-suggestion";
                  span.textContent = text;
                  span.style.opacity = "0.4";
                  span.style.pointerEvents = "none";
                  span.style.whiteSpace = "pre-wrap";
                  return span;
                },
                { side: 1 }
              );
              return DecorationSet.create(newState.doc, [widget]);
            }

            // 문서가 바뀌면 기존 제안은 위치가 어긋나므로 비운다.
            if (tr.docChanged && !meta?.keep) return DecorationSet.empty;
            return old.map(tr.mapping, tr.doc);
          },
        },

        props: {
          decorations(state) {
            return suggestionKey.getState(state);
          },

          // 제안(고스트 텍스트)이 표시 중이면 에디터 루트에 클래스를 달아,
          // 빈 문단의 플레이스홀더가 고스트 텍스트와 겹치지 않도록 CSS로 숨긴다.
          attributes(state): Record<string, string> {
            const deco = suggestionKey.getState(state);
            const active = !!deco && deco.find().length > 0;
            return { class: active ? "has-inline-suggestion" : "" };
          },

          handleKeyDown(view, event) {
            // Tab: 제안 수락
            if (event.key === "Tab" && current?.text) {
              event.preventDefault();
              const { text, pos } = current;
              current = null;
              view.dispatch(
                view.state.tr
                  .insertText(text, pos)
                  .setMeta(suggestionKey, { clear: true })
              );
              return true;
            }
            // Esc: 제안 취소
            if (event.key === "Escape" && current?.text) {
              event.preventDefault();
              clearSuggestion(view);
              return true;
            }
            return false;
          },
        },

        view(view) {
          const schedule = () => {
            if (timer) clearTimeout(timer);
            // 입력 중에는 기존 제안을 즉시 숨긴다.
            if (current) clearSuggestion(view);

            timer = setTimeout(async () => {
              const { state } = view;
              const { selection } = state;
              // 선택 영역이 있거나 비포커스면 제안하지 않는다.
              if (!selection.empty || !view.hasFocus()) return;

              const pos = selection.from;
              const before = state.doc.textBetween(
                Math.max(0, pos - 2000),
                pos,
                "\n",
                " "
              );
              const after = state.doc.textBetween(
                pos,
                Math.min(state.doc.content.size, pos + 1000),
                "\n",
                " "
              );

              const myReq = ++reqId;
              let suggestion = "";
              try {
                suggestion = await options.fetchSuggestion({ before, after });
              } catch {
                return;
              }
              // 요청 사이에 새 입력이 있었으면 버린다.
              if (myReq !== reqId) return;
              if (!suggestion) return;
              // 커서가 그새 움직였으면 버린다.
              if (view.state.selection.from !== pos) return;

              current = { text: suggestion, pos };
              view.dispatch(
                view.state.tr.setMeta(suggestionKey, {
                  show: true,
                  text: suggestion,
                  pos,
                })
              );
            }, options.debounce);
          };

          return {
            update(_v, prevState) {
              // 문서나 선택이 바뀌었을 때만 재스케줄
              if (
                !prevState.doc.eq(view.state.doc) ||
                !prevState.selection.eq(view.state.selection)
              ) {
                schedule();
              }
            },
            destroy() {
              if (timer) clearTimeout(timer);
              current = null;
            },
          };
        },
      }),
    ];
  },
});
