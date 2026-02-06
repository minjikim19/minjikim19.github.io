type BadgeProps = {
  text: string;
};

export default function Badge({ text }: BadgeProps) {
  return <span className="badge">{text}</span>;
}
