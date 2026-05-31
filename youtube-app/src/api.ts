const BASE = "https://api.freeapi.app/api/v1/public/youtube/videos";

export type Thumbnail = { url: string; width: number; height: number };

export type Video = {
  id: string;
  snippet: {
    title: string;
    description: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: Partial<Record<"default" | "medium" | "high" | "standard" | "maxres", Thumbnail>>;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    commentCount: string;
  };
  contentDetails: {
    duration: string;
  };
};

export type VideosPage = {
  data: { items: Video }[];
  page: number;
  totalPages: number;
  totalItems: number;
  nextPage: boolean;
  previousPage: boolean;
};

export async function fetchVideos(params: { page?: number; query?: string } = {}): Promise<VideosPage> {
  const url = new URL(BASE);
  url.searchParams.set("page", String(params.page ?? 1));
  url.searchParams.set("limit", "12");
  if (params.query) url.searchParams.set("query", params.query);

  const res = await fetch(url);
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message || `Request failed (${res.status})`);
  return json.data as VideosPage;
}
