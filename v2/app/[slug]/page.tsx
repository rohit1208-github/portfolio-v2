import { processMarkdown } from '@/lib/markdown';
import { getMarkdownFiles } from '@/lib/files';
import path from 'path';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all markdown files
export async function generateStaticParams() {
  const files = await getMarkdownFiles();
  return files.map((file: string) => ({
    slug: path.parse(file).name,
  }));
}

// Validate params
async function validateSlug(slug: string): Promise<boolean> {
  const files = await getMarkdownFiles();
  return files.some((file: string) => path.parse(file).name === slug);
}

export default async function Page({ params }: PageProps) {
  // Wait for params to be available
  const { slug } = await params;
  
  // Validate slug before using it
  const isValid = await validateSlug(slug);
  if (!isValid) {
    notFound();
  }

  try {
    const contentPath = path.join(process.cwd(), 'content', `${slug}.md`);
    const { content } = await processMarkdown(contentPath);

    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  } catch (error) {
    notFound();
  }
}
