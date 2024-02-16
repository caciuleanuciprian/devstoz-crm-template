import { InitialSettings } from "@/components/initial-settings/initial-settings";
import AuthGuard from "@/guards/auth-guard";
import { UserInfoGuard } from "@/guards/user-info-guard";

export const InitialSettingsPage = () => {
  return (
    <AuthGuard>
      <UserInfoGuard>
        <InitialSettings />
      </UserInfoGuard>
    </AuthGuard>
  );
};
