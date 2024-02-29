import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { ListFilter } from "lucide-react";
import {
  selectClientTypeOptions,
  iconToLabelClientType,
  valueToLabelClientType,
} from "../utils/consts";
import { LanguageContext } from "@/i18n/language-context";
import { useContext } from "react";
import { useRecoilState } from "recoil";
import { filterTableByAtom } from "../utils/clients.recoil";

export const FilterableTableHeader = () => {
  const { dictionary } = useContext(LanguageContext);

  const [filterBy, setFilterBy] = useRecoilState(filterTableByAtom);

  const handleFilterChange = (option: string | null) => {
    setFilterBy(option);
  };

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
        <DropdownMenuLabel>{dictionary.FilterBy}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {selectClientTypeOptions.map((option: string, index: number) => (
          <DropdownMenuCheckboxItem
            key={`${option}-${index}`}
            checked={filterBy === option}
            onCheckedChange={() => handleFilterChange(option)}
          >
            {iconToLabelClientType(option)}
            {valueToLabelClientType(option, dictionary)}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={filterBy === null}
          onCheckedChange={() => handleFilterChange(null)}
        >
          {dictionary.NoFilters}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
