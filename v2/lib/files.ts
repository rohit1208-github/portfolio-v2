import fs from 'fs/promises';
import path from 'path';

export async function getMarkdownFiles(): Promise<string[]> {
  const contentDir = path.join(process.cwd(), 'content');
  const files = await fs.readdir(contentDir);
  return files.filter((file: string) => file.endsWith('.md'));
}

export async function getMarkdownContent(slug: string): Promise<string | null> {
  const contentPath = path.join(process.cwd(), 'content', `${slug}.md`);
  try {
    const content = await fs.readFile(contentPath, 'utf8');
    return content;
  } catch (error) {
    return null;
  }
}
