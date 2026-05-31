export default function SkeletonCard() {
  return (
    <div className="flex animate-pulse flex-col items-center gap-3 rounded-xl border border-neutral-200 bg-white p-5">
      <div className="h-20 w-20 rounded-full bg-neutral-200" />
      <div className="h-3 w-2/3 rounded bg-neutral-200" />
      <div className="h-2 w-1/2 rounded bg-neutral-200" />
      <div className="h-4 w-3/4 rounded-full bg-neutral-200" />
    </div>
  );
}
