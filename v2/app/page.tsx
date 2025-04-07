// app/page.tsx
import { processMarkdown } from '@/lib/markdown';
import path from 'path';

export default async function Home() {
  const contentPath = path.join(process.cwd(), 'content', 'home.md');
  const { content } = await processMarkdown(contentPath);

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

// This route will also be accessible at /home due to the dynamic [slug] route
