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
import { LINKS, NAV_WIDTH_PX } from "@/constants/navigation/consts";

const Navigation = () => {
  const [isActive] = useRecoilState(activeNavTabAtom);

  return (
    <div
      className={`flex h-[100vh] bg-[#F4F4F5] min-w-[${NAV_WIDTH_PX}px] flex-col gap-8`}
    >
      <div className="flex justify-center py-4 items-center">
        <Logo />
      </div>
      <div className="flex flex-col px-4">
        <NavigationMenu>
          <NavigationMenuList className="flex flex-col items-start gap-1.5">
            {LINKS.map((link, index) => (
              <NavigationMenuItem
                key={index}
                className={
                  isActive === index
                    ? "bg-slate-200  dark:bg-slate-800 px-2 py-1 rounded"
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
    </div>
  );
};

export default Navigation;
