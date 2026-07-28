export default function ProductThumb({
  hue,
  icon,
  className = "",
}: {
  hue: string;
  icon: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl bg-gradient-to-br ${hue} ${className}`}
    >
      <span className="select-none" style={{ fontSize: "2.25rem" }}>
        {icon}
      </span>
    </div>
  );
}
