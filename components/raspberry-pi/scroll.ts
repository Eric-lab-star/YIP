/** Pick the last heading above the reading line, including on reverse/jump scrolls. */
export function getActivePart(
  sections: readonly { id: string; top: number }[],
  readingLine: number,
): string {
  let active = sections[0]?.id ?? "overview";
  for (const section of sections) {
    if (section.top > readingLine) break;
    active = section.id;
  }
  return active;
}
