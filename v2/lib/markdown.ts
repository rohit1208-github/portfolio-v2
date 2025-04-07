import { remark } from 'remark';
import html from 'remark-html';
import matter from 'gray-matter';
import { promises as fs } from 'fs';

const notionClasses = {
  h1: 'text-3xl font-bold text-notion-dark my-4',
  h2: 'text-2xl font-semibold text-notion-dark my-3',
  h3: 'text-xl font-medium text-notion-dark my-2',
  p: 'text-base text-notion my-2',
  a: 'text-notion-blue hover:underline',
  ul: 'list-disc pl-6 my-2',
  ol: 'list-decimal pl-6 my-2',
  li: 'text-notion my-1',
  blockquote: 'border-l-4 border-notion-gray pl-4 italic text-notion-gray my-2',
  code: 'bg-notion-sidebar text-notion-dark px-1 py-0.5 rounded text-sm font-mono',
  pre: 'bg-notion-sidebar p-4 rounded my-2 overflow-x-auto',
};

export async function processMarkdown(filePath: string) {
  // Read markdown file
  const fileContent = await fs.readFile(filePath, 'utf-8');

  // Parse frontmatter
  const { data, content } = matter(fileContent);

  // Convert markdown to HTML
  const processedContent = await remark()
    .use(html, {
      sanitize: false,
      handlers: {
        // Custom handlers to add Notion classes
      }
    })
    .process(content);

  return {
    metadata: data,
    content: processedContent.toString()
  };
}
