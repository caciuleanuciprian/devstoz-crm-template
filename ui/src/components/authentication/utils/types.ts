export interface UserDetails {
  email: string;
  name: string;
  id: string;
  clients: string[];
  roles: any;
}

export interface UserOrganization {
  id: string;
  name: string;
  language: string;
  currency: string;
  logoName: string;
  logo: File;
  clients: Array<any>;
}
