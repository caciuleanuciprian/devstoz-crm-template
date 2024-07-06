import { DoorOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { PagesURL } from "@/components/authentication/utils/consts";
import {
  idTokenAtom,
  userDetailsAtom,
} from "@/components/authentication/utils/authentication.recoil";

const Logout = () => {
  const navigate = useNavigate();
  const [, setIdToken] = useRecoilState(idTokenAtom);
  const [, setUserDetails] = useRecoilState(userDetailsAtom);
  const logoutAndRedirect = () => {
    setIdToken(null);
    setUserDetails(null);
    localStorage.removeItem("idToken");
    navigate(PagesURL.AUTHENTICATION);
  };
  return (
    <>
      <Button variant="outline" size="icon" onClick={logoutAndRedirect}>
        <DoorOpen className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Logout</span>
      </Button>
    </>
  );
};

export default Logout;
