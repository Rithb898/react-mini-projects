type Props = {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

export default function Field({ label, type = "text", value, onChange, placeholder }: Props) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-neutral-500">
        {label}
      </span>
      <input
        type={type}
        value={value}
        required
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-neutral-300 bg-white px-3 py-2 text-sm text-black outline-none transition focus:border-black"
      />
    </label>
  );
}
