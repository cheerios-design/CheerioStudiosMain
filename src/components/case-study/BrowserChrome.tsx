/** Browser bar shown above screenshots */
export default function BrowserChrome({ host, path, children }: { host: string; path?: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 border-b border-ink-3 px-4 py-3">
      <span className="flex gap-1.5" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-2.5 w-2.5 rounded-full bg-ink-3" />
        ))}
      </span>
      <span className="note min-w-0 flex-1 truncate text-mute">
        {host}
        {path !== undefined && '/'}
        {path && <span className="text-paper">{path}</span>}
      </span>
      {children}
    </div>
  );
}

export const hostOf = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');
