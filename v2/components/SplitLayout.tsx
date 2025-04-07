import { ReactNode } from 'react';

export default function SplitLayout({
  leftContent,
  rightContent,
}: {
  leftContent: ReactNode;
  rightContent: ReactNode;
}) {
  return (
    <main className="flex min-h-screen">
      {/* Left side - Scrollable content */}
      <div className="w-1/2 overflow-y-auto">
        {leftContent}
      </div>

      {/* Right side - Fixed chat */}
      <div className="w-1/2 fixed right-0 h-screen overflow-hidden bg-notion-sidebar border-l border-notion-gray/10">
        <div className="h-full overflow-y-auto">
          {rightContent}
        </div>
      </div>
    </main>
  );
}
