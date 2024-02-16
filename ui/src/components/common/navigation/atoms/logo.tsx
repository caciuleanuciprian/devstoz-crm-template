import logo from "@/assets/logo.svg";

const Logo = () => {
  return (
    <div className="flex justify-start items-center gap-4">
      <img src={logo} alt={logo} className="flex w-12 h-12" />
      <p>CRM Software</p>
    </div>
  );
};
export default Logo;
