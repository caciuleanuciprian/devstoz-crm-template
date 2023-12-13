import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import Logo from "./logo";
import { useRecoilState } from "recoil";
import { activeNavTabAtom } from "@/lib/recoil/navigation.recoil";
import { LINKS } from "@/constants/navigation/consts";

const Navigation = () => {
  const [isActive] = useRecoilState(activeNavTabAtom);

  return (
    <div className="flex h-[100vh] w-[256px] flex-col bg-secondary">
      <div className="flex justify-center h-[5vh] mb-8 pt-4 items-center">
        <Logo />
      </div>
      <div className="flex flex-col px-4 h-[90vh] justify-between">
        <div className="flex flex-col px-4">
          <NavigationMenu>
            <NavigationMenuList className="flex flex-col items-start gap-1.5">
              {LINKS.map((link, index) => (
                <NavigationMenuItem
                  key={index}
                  className={
                    isActive === index
                      ? "bg-slate-300  dark:bg-background px-2 py-1 rounded"
                      : "px-2 py-1 rounded"
                  }
                >
                  <Link key={`${link.id}-${link.name}`} to={link.href}>
                    {link.name}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex flex-col px-4 pb-4">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
