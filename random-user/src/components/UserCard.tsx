import { fullName, type RandomUser } from "../api";

export default function UserCard({ user, onClick }: { user: RandomUser; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-3 rounded-xl border border-neutral-200 bg-white p-5 text-center transition hover:shadow-md"
    >
      <img
        src={user.picture.large}
        alt={fullName(user)}
        loading="lazy"
        className="h-20 w-20 rounded-full object-cover ring-2 ring-neutral-100"
      />
      <div>
        <h3 className="text-sm font-semibold text-neutral-900">{fullName(user)}</h3>
        <p className="text-xs text-neutral-500">@{user.login.username}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-1.5 text-xs">
        <span className="rounded-full bg-neutral-100 px-2 py-0.5 capitalize text-neutral-600">
          {user.gender}
        </span>
        <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-neutral-600">
          {user.location.country}
        </span>
      </div>
    </button>
  );
}
