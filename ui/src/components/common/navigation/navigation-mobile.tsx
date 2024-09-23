import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/common/navigation/atoms/mode-toggle";
import Logo from "./atoms/logo";
import { useRecoilState } from "recoil";
import {
  activeNavTabAtom,
  expandedNavBarAtom,
} from "@/components/common/navigation/utils/navigation.recoil";
import Logout from "@/components/common/navigation/atoms/logout";
import { useContext } from "react";
import { LanguageContext } from "@/i18n/language-context";
import { selectedOrganizationAtom } from "@/components/authentication/utils/authentication.recoil";
import { linksToLabel } from "./utils/consts";
import { Button } from "@/components/ui/button";
import { Maximize2 } from "lucide-react";
import LanguageSelector from "@/components/settings/atoms/language-selector";
import { CustomTooltip } from "../tooltip";

const NavigationMobile = () => {
  const { dictionary } = useContext(LanguageContext);
  const [isActive] = useRecoilState(activeNavTabAtom);

  return (
    <div className={`flex bg-secondary fixed z-10 top-0 w-full overflow-auto`}>
      <div className="flex w-full justify-between">
        <div className="flex w-full">
          <NavigationMenu className="block max-w-full w-full justify-start">
            <NavigationMenuList className="flex w-full items-start gap-1.5 py-2 px-4">
              {linksToLabel(dictionary)?.map((link, index) => (
                <CustomTooltip content={link.tooltipContent} key={index}>
                  <NavigationMenuItem
                    className={
                      isActive === index
                        ? "bg-accent-links w-full !m-0 rounded"
                        : "!m-0 cursor-pointer ease-in-out w-full rounded hover:bg-accent-links"
                    }
                  >
                    <Link
                      key={`${link.id}-${link.name}`}
                      to={link.href}
                      className={`w-full flex justify-center items-center px-2 py-2 h-[40px]`}
                    >
                      {link.icon}
                    </Link>
                  </NavigationMenuItem>
                </CustomTooltip>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex flex-row items-center justify-between gap-2 px-4">
          <LanguageSelector />
          <ModeToggle />
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default NavigationMobile;
