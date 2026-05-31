export default function SkeletonCard() {
  return (
    <div className="flex animate-pulse flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white">
      <div className="aspect-square w-full bg-neutral-200" />
      <div className="space-y-2 p-3">
        <div className="h-2 w-1/3 rounded bg-neutral-200" />
        <div className="h-3 w-3/4 rounded bg-neutral-200" />
        <div className="h-2 w-full rounded bg-neutral-200" />
        <div className="h-4 w-1/2 rounded bg-neutral-200" />
      </div>
    </div>
  );
}
