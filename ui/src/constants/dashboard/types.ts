export interface DropdownMenuItemProps {
  name: string;
  icon?: any;
  separator?: boolean;
}

export interface DropdownMenuProps {
  label?: string;
  items: DropdownMenuItemProps[];
  fn?: (params?: any) => void;
}
