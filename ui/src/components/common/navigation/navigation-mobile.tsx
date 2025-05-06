import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/common/navigation/atoms/mode-toggle";
import { useRecoilState } from "recoil";
import { activeNavTabAtom } from "@/components/common/navigation/utils/navigation.recoil";
import Logout from "@/components/common/navigation/atoms/logout";
import { useContext } from "react";
import { LanguageContext } from "@/i18n/language-context";
import { allOrganizationsAtom } from "@/components/authentication/utils/authentication.recoil";
import { linksToLabel } from "./utils/consts";
import { Button } from "@/components/ui/button";
import LanguageSelector from "@/components/settings/atoms/language-selector";
import { CustomTooltip } from "../tooltip";
import { PagesURL } from "@/components/authentication/utils/consts";
import { Building } from "lucide-react";

const NavigationMobile = () => {
	const { dictionary } = useContext(LanguageContext);
	const [isActive] = useRecoilState(activeNavTabAtom);
	const [allOrganizations] = useRecoilState(allOrganizationsAtom);
	const navigate = useNavigate();

	const navigateToOrganizationSelection = () => {
		navigate(`${PagesURL.ORGANIZATION_SELECTION}`);
	};

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
					{allOrganizations?.length && allOrganizations.length > 1 && (
						<Button
							variant="outlineSecondary"
							size="icon"
							onClick={navigateToOrganizationSelection}
						>
							<CustomTooltip content={dictionary.OrganizationSelection}>
								<Building className="h-[1.2rem] w-[1.2rem]" />
							</CustomTooltip>
						</Button>
					)}
					<Logout />
				</div>
			</div>
		</div>
	);
};

export default NavigationMobile;
