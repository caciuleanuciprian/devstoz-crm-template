import logo from "@/assets/logo.svg";
import { useRecoilState } from "recoil";
import { expandedNavBarAtom } from "../utils/navigation.recoil";
import { CustomTooltip } from "../../tooltip";

interface LogoProps {
  title?: string;
  img?: string;
  size?: "small" | "medium";
  isInitialSettings?: boolean;
}

const Logo = ({
  title = "CRM Software",
  img = logo,
  size = "small",
  isInitialSettings = false,
}: LogoProps) => {
  const [expandedNavBar] = useRecoilState(expandedNavBarAtom);
  return (
    <div
      className={`flex ${
        !isInitialSettings
          ? expandedNavBar
            ? "justify-start"
            : "justify-center"
          : "justify-start"
      } items-center gap-4 pointer-events-none w-full`}
    >
      <img
        src={img}
        alt={logo}
        className={size === "small" ? "w-[30px] h-[30px]" : "w-[60px] h-[60px]"}
      />
      <CustomTooltip content={title}>
        {expandedNavBar && (
          <p className="font-semibold text-md overflow-hidden text-ellipsis max-w-full pointer-events-auto cursor-default">
            {title}
          </p>
        )}
      </CustomTooltip>
    </div>
  );
};
export default Logo;
