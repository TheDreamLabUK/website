/**
 * Functions for handling markdown files
 */

/**
 * Extracts the headline and full details from a markdown text
 * @param markdown The markdown text to parse
 * @returns An object with headline and fullDetails properties
 */
export function parseTeamMarkdown(markdown: string) {
  // Extract headline
  const headlineMatch = markdown.match(/# (.*?)\n/);
  const headline = headlineMatch ? headlineMatch[1] : "";
  
  // Extract full details (everything after ## Full Details)
  const fullDetailsMatch = markdown.match(/## Full Details\n\n([\s\S]*)/);
  const fullDetails = fullDetailsMatch ? fullDetailsMatch[1] : "";
  
  return { headline, fullDetails };
}

/**
 * Fetches and parses a markdown file
 * @param path Path to the markdown file
 * @returns The parsed markdown content
 */
export async function fetchMarkdown(path: string) {
  try {
    const response = await fetch(path);
    const text = await response.text();
    return text;
  } catch (error) {
    console.error("Error fetching markdown:", error);
    return "";
  }
} 