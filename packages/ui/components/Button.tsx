interface Props {
  primary?: boolean;
  size?: "small" | "large";
  label?: string;
}

export const Button = ({
  primary = false,
  label = "Boop",
  size = "small",
}: Props) => {
  return <button className="font-sans text-lg text-blue-500">{label}</button>;
};
