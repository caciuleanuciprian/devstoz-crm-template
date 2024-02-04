import { Command, CommandInput } from "@/components/ui/command";
import { useState } from "react";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  return (
    <Command>
      <CommandInput
        value={searchValue}
        onValueChange={(value: string) => setSearchValue(value)}
        placeholder="Search for a client..."
      />
    </Command>
  );
};

export default SearchBar;
