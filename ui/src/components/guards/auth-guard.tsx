import { isAuthenticatedAtom } from "@/lib/recoil/authentication.recoil";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

const AuthGuard = ({ children }: any) => {
  const navigate = useNavigate();
  const [isAuthenticated] = useRecoilState<boolean>(isAuthenticatedAtom);

  const checkIfOnAuthPage = () => {
    return location.pathname === "/";
  };

  console.log(!isAuthenticated && checkIfOnAuthPage());
  return (
    <>
      {!isAuthenticated
        ? !checkIfOnAuthPage()
          ? navigate("/")
          : null
        : children}
    </>
  );
};

export default AuthGuard;
