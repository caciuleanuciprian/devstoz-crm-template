import LoginForm from "../cells/login-form";
import AuthBackground from "../atoms/auth-background";
import { useEffect } from "react";
import { PagesURL } from "../utils/consts";
import { FRONT_END_BASE_URL, GOOGLE_AUTH_URL } from "@/lib/axios/consts";
import { useRecoilState } from "recoil";
import { idTokenAtom, isDemoAtom } from "../utils/authentication.recoil";
import React from "react";

const Login = () => {
  const [idToken] = useRecoilState(idTokenAtom);
  const [, setIsDemo] = useRecoilState(isDemoAtom);

  React.useEffect(() => {
    setIsDemo(false);
  }, []);

  const configs = {
    response_type: "code",
    client_id: import.meta.env.VITE_CLIENT_ID,
    scope: "email profile openid",
    redirect_uri: `${FRONT_END_BASE_URL}${PagesURL.OAUTH2_REDIRECT}`,
  };

  const handleGoogleAuth = () => {
    const params = new URLSearchParams({
      ...configs,
    });
    window.location.href = `${GOOGLE_AUTH_URL}?${params}`;
  };

  useEffect(() => {
    if (idToken) {
      location.href = `${FRONT_END_BASE_URL}${PagesURL.DASHBOARD}`;
    }
  }, []);

  return (
    <div className="grid animate-fade-in container relative h-[100vh] w-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <LoginForm onClick={handleGoogleAuth} />
      <AuthBackground />
    </div>
  );
};

export default Login;
