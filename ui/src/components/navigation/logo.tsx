import logo from "@/assets/logo-example.svg";

const Logo = () => {
  return (
    <div className="flex justify-center items-center w-max h-max">
      <img src={logo} alt={logo} className="flex w-24 h-8" />
      <p>Logo</p>
    </div>
  );
};
export default Logo;
