import AuthGuard from "@/guards/auth-guard";
import Navigation from "@/components/common/navigation/navigation";
import { UserInfoGuard } from "@/guards/user-info-guard";
import { InitialSettingsGuard } from "@/guards/initial-settings-guard";

const Page = ({ children }: any) => {
  return (
    // <AuthGuard>
    // <UserInfoGuard>
    // <InitialSettingsGuard>
    <div className="flex h-[100vh] ">
      <Navigation />
      <div className={`bg-background w-full h-full z-0 ml-[192px]`}>
        {children}
      </div>
    </div>
    // </InitialSettingsGuard>
    // </UserInfoGuard>
    // </AuthGuard>
  );
};

export default Page;
