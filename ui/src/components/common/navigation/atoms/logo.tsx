import logo from "@/assets/logo.svg";

interface LogoProps {
  title?: string;
  img?: string;
}

const Logo = ({ title = "CRM Software", img = logo }: LogoProps) => {
  return (
    <div className="flex justify-start items-center gap-4 pointer-events-none">
      <img src={img} alt={logo} className="w-[40px] h-[40px]" />
      <p className="font-semibold text-md">{title}</p>
    </div>
  );
};
export default Logo;
