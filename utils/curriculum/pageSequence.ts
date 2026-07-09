import { SideBarTreeItem } from "@/components/commons/SideBarItems";

export interface LessonPage {
  url: string;
  label: string;
}

const stripHash = (url: string) => url.split("#")[0].replace(/\/$/, "");

/** Depth-first collect every file (recursing into nested folders) in order. */
function collectFiles(
  items: SideBarTreeItem[],
  out: { url: string; name: string }[]
) {
  for (const item of items) {
    if (item.kind === "folder") collectFiles(item.files, out);
    else out.push({ url: stripHash(item.url), name: item.name });
  }
}

/**
 * Flatten a sidebar curriculum into an ordered list of the distinct lesson
 * pages it contains. Sidebar entries often point at in-page anchors
 * (e.g. `/tourOfPython/if#why`); this collapses those to one entry per page so
 * prev/next navigation moves between pages, not anchors. When a top-level
 * folder spans several pages (e.g. Level 1/2/3) the file name is appended to
 * keep labels distinct. `intro` is prepended as the first entry.
 *
 * Shared by every curriculum so all sections get identical pager behavior.
 */
export function buildLessonPages(
  curriculum: SideBarTreeItem[],
  intro: LessonPage
): LessonPage[] {
  const pages: LessonPage[] = [intro];
  const seen = new Set<string>(pages.map((p) => p.url));

  for (const folder of curriculum) {
    if (folder.kind !== "folder") continue;

    // Distinct page urls within this folder (recursing into sub-folders).
    const collected: { url: string; name: string }[] = [];
    collectFiles(folder.files, collected);

    const folderPages: { url: string; fileName: string }[] = [];
    const folderSeen = new Set<string>();
    for (const file of collected) {
      if (folderSeen.has(file.url)) continue;
      folderSeen.add(file.url);
      folderPages.push({ url: file.url, fileName: file.name });
    }

    const multiPage = folderPages.length > 1;
    for (const page of folderPages) {
      if (seen.has(page.url)) continue;
      seen.add(page.url);
      pages.push({
        url: page.url,
        label: multiPage ? `${folder.name} · ${page.fileName}` : folder.name,
      });
    }
  }

  return pages;
}
