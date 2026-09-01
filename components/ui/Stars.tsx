import { Star } from "./Icons";

/** Five burnt-orange stars. Used on testimonial cards. */
export default function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5 text-primary" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4" />
      ))}
    </div>
  );
}
