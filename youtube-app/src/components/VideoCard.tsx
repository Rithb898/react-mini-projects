import { type Video } from "../api";
import { formatCount, formatDuration, timeAgo } from "../format";

export default function VideoCard({ video }: { video: Video }) {
  const { snippet, statistics, contentDetails, id } = video;
  const thumb =
    snippet.thumbnails.medium?.url ||
    snippet.thumbnails.high?.url ||
    snippet.thumbnails.default?.url;

  return (
    <a
      href={`https://www.youtube.com/watch?v=${id}`}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-200">
        {thumb && (
          <img
            src={thumb}
            alt={snippet.title}
            loading="lazy"
            className="h-full w-full object-cover transition group-hover:scale-105"
          />
        )}
        <span className="absolute bottom-1.5 right-1.5 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
          {formatDuration(contentDetails.duration)}
        </span>
      </div>

      <div className="mt-3 flex flex-col gap-1">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-neutral-900">
          {snippet.title}
        </h3>
        <p className="text-xs text-neutral-600">{snippet.channelTitle}</p>
        <p className="text-xs text-neutral-500">
          {formatCount(statistics.viewCount)} views · {timeAgo(snippet.publishedAt)}
        </p>
      </div>
    </a>
  );
}
