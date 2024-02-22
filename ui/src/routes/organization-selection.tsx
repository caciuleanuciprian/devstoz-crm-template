import { OrganizationSelection } from "@/components/common/organization-selection/organization-selection";
import AuthGuard from "@/guards/auth-guard";
import { UserInfoGuard } from "@/guards/user-info-guard";

export const OrganizationSelectionPage = () => {
  return (
    <AuthGuard>
      <UserInfoGuard>
        <OrganizationSelection />
      </UserInfoGuard>
    </AuthGuard>
  );
};
