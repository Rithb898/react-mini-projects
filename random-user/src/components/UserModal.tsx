import { fullName, type RandomUser } from "../api";

export default function UserModal({ user, onClose }: { user: RandomUser; onClose: () => void }) {
  const { location: loc } = user;
  const rows: [string, string][] = [
    ["Email", user.email],
    ["Phone", user.phone],
    ["Cell", user.cell],
    ["Age", `${user.dob.age} yrs`],
    ["Address", `${loc.street.number} ${loc.street.name}, ${loc.city}`],
    ["State", `${loc.state}, ${loc.country} ${loc.postcode}`],
    ["Nationality", user.nat],
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white"
      >
        <div className="relative flex flex-col items-center gap-2 bg-neutral-900 px-6 pb-6 pt-8 text-center text-white">
          <button
            onClick={onClose}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 hover:bg-white/30"
          >
            ✕
          </button>
          <img
            src={user.picture.large}
            alt={fullName(user)}
            className="h-24 w-24 rounded-full object-cover ring-4 ring-white/20"
          />
          <h2 className="text-lg font-bold">
            {user.name.title} {fullName(user)}
          </h2>
          <p className="text-xs text-neutral-300">@{user.login.username}</p>
        </div>

        <dl className="divide-y divide-neutral-100 px-6 py-2">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 py-2.5 text-sm">
              <dt className="text-neutral-400">{k}</dt>
              <dd className="text-right font-medium text-neutral-800">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
