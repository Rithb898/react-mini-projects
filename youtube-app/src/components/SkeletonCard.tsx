export default function SkeletonCard() {
  return (
    <div className="flex animate-pulse flex-col">
      <div className="aspect-video w-full rounded-xl bg-neutral-200" />
      <div className="mt-3 space-y-2">
        <div className="h-3 w-full rounded bg-neutral-200" />
        <div className="h-3 w-2/3 rounded bg-neutral-200" />
        <div className="h-2 w-1/3 rounded bg-neutral-200" />
      </div>
    </div>
  );
}
