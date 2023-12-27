import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRecoilState } from "recoil";
import { isAuthenticatedAtom } from "@/components/authentication/utils/authentication.recoil";
import { useNavigate } from "react-router-dom";
import { PagesURL } from "@/components/authentication/utils/consts";

const Logout = () => {
  const navigate = useNavigate();
  const [, setIsAuthenticated] = useRecoilState(isAuthenticatedAtom);
  const logoutAndRedirect = () => {
    setIsAuthenticated(false);
    console.log("remove auth cookie");
    navigate(PagesURL.AUTHENTICATION);
  };
  return (
    <>
      <Button variant="outline" size="icon" onClick={logoutAndRedirect}>
        <LogOut className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Logout</span>
      </Button>
    </>
  );
};

export default Logout;
