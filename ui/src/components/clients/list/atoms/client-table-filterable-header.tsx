import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListFilter } from "lucide-react";
import {
  selectClientTypeOptions,
  iconToLabelClientType,
  valueToLabelClientType,
} from "../../utils/consts";
import { LanguageContext } from "@/i18n/language-context";
import { useContext } from "react";

export const FilterableTableHeader = () => {
  const { dictionary } = useContext(LanguageContext);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="-ml-3 h-8 data-[state=open]:bg-accent"
        >
          <span>{dictionary.Type}</span>
          <ListFilter className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {selectClientTypeOptions.map((option: string, index: number) => (
          <DropdownMenuItem key={`${option}-${index}`} onClick={() => {}}>
            {iconToLabelClientType(option)}
            {valueToLabelClientType(option, dictionary)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
