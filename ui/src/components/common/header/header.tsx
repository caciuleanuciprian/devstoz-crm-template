import { HeaderAvatar } from "./dropdown-avatar";

interface HeaderProps {
  title: string;
  shouldDisplayAvatar?: boolean;
}

export const Header = ({ title, shouldDisplayAvatar = true }: HeaderProps) => {
  return (
    <div className="flex justify-between bg-secondary p-4 mt-4 rounded-md items-center pointer-events-none">
      <p className="text-3xl font-semibold">{title}</p>
      {shouldDisplayAvatar && <HeaderAvatar />}
    </div>
  );
};
