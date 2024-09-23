import AuthGuard from "@/guards/auth-guard";
import Navigation from "@/components/common/navigation/navigation";
import { UserInfoGuard } from "@/guards/user-info-guard";
import { InitialSettingsGuard } from "@/guards/initial-settings-guard";
import { useRecoilState } from "recoil";
import { expandedNavBarAtom } from "./navigation/utils/navigation.recoil";
import useWindowDimensions from "@/lib/hooks/useWindowDimensions";
import NavigationMobile from "./navigation/navigation-mobile";

const Page = ({ children }: any) => {
  const [expandedNavBar] = useRecoilState(expandedNavBarAtom);
  const windowDimensions = useWindowDimensions();
  return (
    <AuthGuard>
      <UserInfoGuard>
        <InitialSettingsGuard>
          <div className="flex h-[100vh] ">
            {windowDimensions.width >= 500 ? (
              <>
                <Navigation />
                <div
                  className={`bg-background w-full h-full z-0 ${
                    expandedNavBar ? "ml-[192px]" : "ml-[60px]"
                  }`}
                >
                  {children}
                </div>
              </>
            ) : (
              <>
                <NavigationMobile />
                <div className={`bg-background w-full h-full z-0 mt-14`}>
                  {children}
                </div>
              </>
            )}
          </div>
        </InitialSettingsGuard>
      </UserInfoGuard>
    </AuthGuard>
  );
};

export default Page;
