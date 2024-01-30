import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/common/icons/mode-toggle";
import Logo from "./atoms/logo";
import { useRecoilState } from "recoil";
import { activeNavTabAtom } from "@/components/common/navigation/utils/navigation.recoil";
import Logout from "@/components/common/icons/logout";
import { useContext } from "react";
import { LanguageContext } from "@/i18n/language-context";

const Navigation = () => {
  const { dictionary } = useContext(LanguageContext);
  const LINKS = [
    { id: 0, name: dictionary.Dashboard, href: "/dashboard" },
    { id: 1, name: dictionary.Clients, href: "/clients" },
    { id: 2, name: dictionary.Reports, href: "/reports" },
    { id: 3, name: dictionary.Settings, href: "/settings" },
  ];

  const [isActive] = useRecoilState(activeNavTabAtom);

  return (
    <div className="flex h-[100vh] w-[256px] flex-col bg-secondary">
      <div className="flex  h-[5vh] w-full mb-4 pt-4 items-center px-2 py-2">
        <Logo />
      </div>
      <div className="flex flex-col h-[90vh] w-full justify-between">
        <div className="flex flex-col w-full ">
          <NavigationMenu className="block max-w-full w-full justify-start">
            <NavigationMenuList className="flex flex-col w-full items-start gap-1.5 py-2 px-2">
              {LINKS.map((link, index) => (
                <NavigationMenuItem
                  key={index}
                  className={
                    isActive === index
                      ? " bg-accent-links w-full !m-0 rounded"
                      : "!m-0 cursor-pointer ease-in-out w-full rounded hover:bg-accent-links"
                  }
                >
                  <Link
                    key={`${link.id}-${link.name}`}
                    to={link.href}
                    className="w-full flex justify-start items-center px-2 py-1"
                  >
                    {link.name}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex flex-row items-center justify-start gap-2 px-4 ">
          <ModeToggle />
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default Navigation;