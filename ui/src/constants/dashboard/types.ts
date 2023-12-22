export interface DropdownMenuItemProps {
  name?: any;
  icon?: any;
  separator?: boolean;
  fn?: (params?: any) => void;
  component?: any;
}

export interface DropdownMenuProps {
  label?: string;
  items: DropdownMenuItemProps[];
  fn?: (params?: any) => void;
}
