import { Command, CommandInput } from "@/components/ui/command";
import { useRecoilState } from "recoil";
import {
  searchValueAtom,
  totalClientsAtom,
} from "../clients/list/utils/clients.recoil";
import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { LanguageContext } from "@/i18n/language-context";
import useDebounce from "@/lib/hooks/useDebounce";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useRecoilState(searchValueAtom);
  const [totalClients] = useRecoilState(totalClientsAtom);
  const [searchText, setSearchText] = useState<string | null>(null);
  const { dictionary } = useContext(LanguageContext);

  const resetSearchBar = () => {
    if ((searchValue !== null && searchValue !== "") || searchText !== "") {
      setSearchText(null);
      setSearchValue(null);
    }
  };

  useDebounce(
    () => {
      if (searchText === null) return;
      setSearchValue(searchText);
    },
    [searchText],
    800
  );

  return (
    <div className="flex items-center relative">
      <Command className="flex">
        <CommandInput
          value={searchText ?? ""}
          onValueChange={(e) => setSearchText(e)}
          placeholder={`${dictionary.SearchFromAList} ${totalClients} ${dictionary.ClientsDots}`}
        />
      </Command>
      <Button
        className="absolute right-0 top-[50%] h-fit-content -translate-x-1/2 -translate-y-1/2"
        variant="ghost"
        size="xs"
        onClick={resetSearchBar}
      >
        <X />
      </Button>
    </div>
  );
};

export default SearchBar;
