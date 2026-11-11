import type { Project } from '@/lib/site';

/**
 * A client's logo on its own brand background, filling whatever tile it is placed in.
 * Projects without a logo file get the client name set in type instead.
 */
export default function ProjectLogo({ project, className = '' }: { project: Project; className?: string }) {
  const { logo } = project;

  if (!logo) {
    return (
      <span className={`grid h-full w-full place-items-center bg-ink-2 p-[10%] text-center ${className}`}>
        <span className="font-display text-[clamp(1.1rem,2.2vw,1.9rem)] font-bold uppercase leading-[0.95] tracking-tight text-paper">
          {project.client}
        </span>
      </span>
    );
  }

  // Wide wordmarks are limited by the tile's width, tall marks by its height
  const wide = logo.width / logo.height > 1.6;

  return (
    <span className={`relative block h-full w-full ${className}`} style={{ background: logo.bg }}>
      {/* Absolutely placed so the logo is always contained by the tile, whatever its proportions */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo.src}
        alt={logo.alt}
        loading="lazy"
        draggable={false}
        className={`absolute inset-0 h-full w-full object-contain ${wide ? 'px-[13%] py-[10%]' : 'px-[10%] py-[13%]'}`}
      />
    </span>
  );
}
