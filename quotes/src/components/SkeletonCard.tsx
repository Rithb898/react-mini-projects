export default function SkeletonCard() {
  return (
    <div className="flex animate-pulse flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-5">
      <div className="h-3 w-full rounded bg-neutral-200" />
      <div className="h-3 w-5/6 rounded bg-neutral-200" />
      <div className="h-3 w-2/3 rounded bg-neutral-200" />
      <div className="mt-3 h-3 w-1/3 rounded bg-neutral-200" />
    </div>
  );
}
