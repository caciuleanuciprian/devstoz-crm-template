import { UserRoles } from "./types";

export const roleToLabel = (role: UserRoles, dictionary: any) => {
  switch (role) {
    case UserRoles.ORG_ADMIN:
      return dictionary.Administrator;
    case UserRoles.ORG_MEMBER:
      return dictionary.Member;
    case UserRoles.ORG_VIEWER:
      return dictionary.Viewer;
    case UserRoles.ANONYMOUS:
      return dictionary.Anonymous;
    default:
      return "";
  }
};
