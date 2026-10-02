import TestimonialCard from '../TestimonialCard';
import { TESTIMONIALS } from '@/lib/site';

export default function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section id="testimonials" aria-labelledby="testimonials-h" className="bg-ink px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-10 flex items-center justify-between gap-4">
          <h2 id="testimonials-h" className="label text-lime">( Kind words ) — From our clients</h2>
          <span className="note text-mute">( {String(TESTIMONIALS.length).padStart(2, '0')} )</span>
        </div>
        <div className="grid gap-6 lg:grid-cols-2 [&>*:only-child]:lg:col-span-2">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.author} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
