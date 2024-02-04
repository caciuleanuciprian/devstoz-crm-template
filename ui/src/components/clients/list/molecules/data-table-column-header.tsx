import { Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListFilter } from "lucide-react";
import {
  iconToLabelClientType,
  valueToLabelClientType,
} from "../../utils/consts";
import { LanguageContext } from "@/i18n/language-context";
import { useContext } from "react";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  options?: string[];
}
//TODO: Delete this
export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  options,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const { dictionary } = useContext(LanguageContext);
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            <ListFilter className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {options?.map((option: string, index: number) => (
            <DropdownMenuItem key={`${option}-${index}`} onClick={() => {}}>
              {iconToLabelClientType(option)}
              {valueToLabelClientType(option, dictionary)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
