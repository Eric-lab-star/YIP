// Indent.ts
import { Extension } from "@tiptap/core";

type Options = {
  types: string[];        // 어떤 노드에 적용할지
  min: number;
  max: number;
  step: number;           // px 단위
};

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    indent: {
      indent: () => ReturnType;
      outdent: () => ReturnType;
    };
  }
}

export const Indent = Extension.create<Options>({
  name: "indent",

  addOptions() {
    return {
      types: ["paragraph", "heading"],
      min: 0,
      max: 8,
      step: 24,
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          indent: {
            default: 0,
            parseHTML: (el) => Number(el.getAttribute("data-indent") || 0),
            renderHTML: (attrs) =>
              attrs.indent
                ? { "data-indent": attrs.indent }
                : {},
          },
        },
      },
    ];
  },

  addCommands() {
    const clamp = (n: number) =>
      Math.max(this.options.min, Math.min(this.options.max, n));

    return {
      indent:
        () =>
        ({ state, dispatch }) => {
          const { tr, selection } = state;
          const { from, to } = selection;

          state.doc.nodesBetween(from, to, (node, pos) => {
            if (!this.options.types.includes(node.type.name)) return;

            const current = (node.attrs.indent as number) || 0;
            const next = clamp(current + 1);

            tr.setNodeMarkup(pos, undefined, { ...node.attrs, indent: next });
          });

          if (tr.docChanged && dispatch) dispatch(tr);
          return true;
        },

      outdent:
        () =>
        ({ state, dispatch }) => {
          const { tr, selection } = state;
          const { from, to } = selection;

          state.doc.nodesBetween(from, to, (node, pos) => {
            if (!this.options.types.includes(node.type.name)) return;

            const current = (node.attrs.indent as number) || 0;
            const next = clamp(current - 1);

            tr.setNodeMarkup(pos, undefined, { ...node.attrs, indent: next });
          });

          if (tr.docChanged && dispatch) dispatch(tr);
          return true;
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      Tab: () => this.editor.commands.indent(),
      "Shift-Tab": () => this.editor.commands.outdent(),
    };
  },
});
