import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/icons/mode-toggle";
import Logo from "./logo";
import { useRecoilState } from "recoil";
import { activeNavTabAtom } from "@/lib/recoil/navigation.recoil";
import { LINKS } from "@/constants/navigation/consts";
import Logout from "@/components/icons/logout";

const Navigation = () => {
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
                      ? " bg-accent-links w-full px-2 py-1 !m-0 rounded"
                      : "!m-0 cursor-pointer ease-in-out w-full px-2 py-1  rounded hover:bg-accent-links"
                  }
                >
                  <Link
                    key={`${link.id}-${link.name}`}
                    to={link.href}
                    className="w-full flex justify-start items-center"
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
