import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const Logout = () => {
  return (
    <>
      <Button variant="outline" size="icon">
        <LogOut className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Logout</span>
      </Button>
    </>
  );
};

export default Logout;
