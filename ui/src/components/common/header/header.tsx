import { HeaderAvatar } from "./dropdown-avatar";

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <div className="flex justify-between bg-secondary p-4 mt-4 rounded-md items-center">
      <p className="text-3xl font-semibold">{title}</p>
      <HeaderAvatar />
    </div>
  );
};
