import { Header } from "@/components/common/header/header";
import Logo from "@/components/common/navigation/atoms/logo";
import { InitialSettings } from "@/components/initial-settings/initial-settings";
import AuthGuard from "@/guards/auth-guard";
import { UserInfoGuard } from "@/guards/user-info-guard";
import { LanguageContext } from "@/i18n/language-context";
import { useContext } from "react";

export const InitialSettingsPage = () => {
  const { dictionary } = useContext(LanguageContext);
  return (
    <AuthGuard>
      <UserInfoGuard>
        <div className="px-8 pb-4">
          <div className="pt-4">
            <Logo size="medium" isInitialSettings={true} />
            <Header
              shouldDisplayAvatar={false}
              title={dictionary.InitialSettings}
            />
          </div>
          <InitialSettings />
        </div>
      </UserInfoGuard>
    </AuthGuard>
  );
};
