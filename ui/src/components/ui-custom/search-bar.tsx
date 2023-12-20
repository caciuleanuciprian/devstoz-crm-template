import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useState } from "react";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  return (
    <Command>
      <CommandInput
        value={searchValue}
        onValueChange={(value: string) => setSearchValue(value)}
        placeholder="Type a command or search..."
      />
      {/* {searchValue && (
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandSeparator />
        </CommandList>
      )} */}
    </Command>
  );
};

export default SearchBar;
