type Props = { kind: "error" | "success"; text: string };

export default function Message({ kind, text }: Props) {
  const base = "border px-3 py-2 text-sm";
  const style =
    kind === "error"
      ? "border-black bg-neutral-100 text-black"
      : "border-black bg-black text-white";
  return <div className={`${base} ${style}`}>{text}</div>;
}
