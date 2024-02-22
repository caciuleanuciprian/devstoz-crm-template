import logo from "@/assets/logo.svg";

interface LogoProps {
  title?: string;
  img?: string;
}

const Logo = ({ title = "CRM Software", img = logo }: LogoProps) => {
  return (
    <div className="flex justify-start items-center gap-4">
      <img src={img} alt={logo} className="flex w-12 h-12" />
      <p className="font-semibold text-md">{title}</p>
    </div>
  );
};
export default Logo;
