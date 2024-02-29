import { Header } from "@/components/common/header/header";
import Logo from "@/components/common/navigation/atoms/logo";
import { InitialSettings } from "@/components/initial-settings/initial-settings";
import AuthGuard from "@/guards/auth-guard";
import { UserInfoGuard } from "@/guards/user-info-guard";

export const InitialSettingsPage = () => {
  return (
    <AuthGuard>
      <UserInfoGuard>
        <div className="px-8 pb-4">
          <div className="pt-4">
            <Logo />
            <Header shouldDisplayAvatar={false} title={"Initial Settings"} />
          </div>
          <InitialSettings />
        </div>
      </UserInfoGuard>
    </AuthGuard>
  );
};
