import { UserRoles } from "./types";

export const roleToLabel = (role: UserRoles, dictionary: any) => {
  switch (role) {
    case UserRoles.ADMIN:
      return dictionary.Administrator;
    case UserRoles.MEMBER:
      return dictionary.Member;
    case UserRoles.VIEWER:
      return dictionary.Viewer;
    case UserRoles.ANONYMOUS:
      return dictionary.Anonymous;
    default:
      return "";
  }
};
