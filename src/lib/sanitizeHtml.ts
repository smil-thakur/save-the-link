import DOMPurify from "dompurify";

const ALLOWED_TAGS = [
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "ol",
  "ul",
  "li",
  "a",
  "blockquote",
];
const ALLOWED_ATTR = ["href", "target", "rel"];

/** Sanitizes rich-text HTML (e.g. from Quill) before it's ever rendered via dangerouslySetInnerHTML. */
export const sanitizeHtml = (html: string): string =>
  DOMPurify.sanitize(html, { ALLOWED_TAGS, ALLOWED_ATTR });

/** contenteditable commonly serializes interior spaces as non-breaking spaces, which
 * silently blocks word-wrap; normalize them back to regular spaces before display. */
export const normalizeNbsp = (html: string): string => html.split(" ").join(" ");
