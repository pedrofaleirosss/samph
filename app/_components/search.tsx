import { SearchIcon } from "lucide-react";
import { Form, FormField } from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Search = () => {
  return (
    <form className="flex items-center gap-2">
      <Input placeholder="Buscar piscina" />

      <Button type="submit">
        <SearchIcon />
      </Button>
    </form>
  );
};

export default Search;
