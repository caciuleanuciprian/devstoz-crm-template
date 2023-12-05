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
    <div className="flex justify-between items-center ml-3 mr-3">
      <div className="flex gap-3 items-center">
        <Logo />
        <ModeToggle />
      </div>

      <NavigationMenu>
        <NavigationMenuList className="flex gap-3">
          {LINKS.map((link, index) => (
            <NavigationMenuItem
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
  );
};

export default Navigation;
