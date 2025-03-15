import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LanguageContext } from "@/i18n/language-context";
import useAxios from "@/lib/axios/useAxios";
import { ScanSearch } from "lucide-react";
import React, { useContext, useState } from "react";
import { PostOTPCode, PostOTPToken } from "../core/authentication.service";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Loader } from "@/components/common/loader";
import { AxiosStatusCode } from "@/lib/axios/helpers";
import { useToast } from "@/components/ui/use-toast";
import { FRONT_END_BASE_URL } from "@/lib/axios/consts";
import { PagesURL } from "../utils/consts";
import { idTokenAtom, isDemoAtom } from "../utils/authentication.recoil";
import { useRecoilState } from "recoil";

export const OTPForm = () => {
  const { dictionary } = useContext(LanguageContext);
  const [email, setEmail] = useState<string>("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [otp, setOTP] = useState<string>("");
  const { toast } = useToast();
  const [, setIdToken] = useRecoilState(idTokenAtom);
  const [, setIsDemo] = useRecoilState(isDemoAtom);

  const {
    loadData: loadCode,
    isLoading: isCodeLoading,
    dataCode: codeDataCode,
    error: codeError,
  } = useAxios({
    fetchFn: PostOTPCode,
    paramsOfFetch: {
      email: email,
    },
  });

  const {
    data: tokenData,
    loadData: loadToken,
    isLoading: isTokenLoading,
    dataCode: tokenDataCode,
    error: tokenError,
  } = useAxios({
    fetchFn: PostOTPToken,
    paramsOfFetch: {
      email: email,
      code: otp,
    },
  });

  React.useEffect(() => {
    if (codeDataCode === AxiosStatusCode.CODE_201_CREATED) {
      toast({ title: dictionary.OTPSentSuccesfully, variant: "success" });
      setStep("otp");
    } else if (codeError) {
      toast({ title: dictionary.OTPError, variant: "destructive" });
      setEmail("");
    }
  }, [codeDataCode, codeError]);

  React.useEffect(() => {
    if (tokenDataCode === AxiosStatusCode.CODE_404_NOT_FOUND) {
      toast({
        title: dictionary.OTPTokenIncorrectOrExpired,
        variant: "destructive",
      });
      setStep("email");
      setOTP("");
      setEmail("");
    } else if (tokenDataCode === AxiosStatusCode.CODE_200_OK) {
      toast({ title: dictionary.OTPTokenSuccesfully, variant: "success" });
      setIdToken(tokenData);
      setIsDemo(true);
      location.href = `${FRONT_END_BASE_URL}${PagesURL.DASHBOARD}`;
    } else if (tokenError) {
      toast({ title: dictionary.OTPTokenError, variant: "destructive" });
    }
  }, [tokenDataCode, tokenError]);

  const validateEmail = (val: string) => {
    return val.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" type="button" className="gap-2 justify-end">
          <ScanSearch />
          {dictionary.TryDemo}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] min-h-[250px]">
        <DialogHeader>
          <DialogTitle>{dictionary.OTPTitle}</DialogTitle>
          <DialogDescription>
            {step === "email"
              ? dictionary.OTPDescription
              : step === "otp"
              ? dictionary.OTPDescription2
              : ""}
          </DialogDescription>
        </DialogHeader>
        {step === "email" ? (
          <div className="flex items-start flex-col gap-4">
            <Label htmlFor="name">{dictionary.Email}</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="pl-2"
              required={true}
            />
          </div>
        ) : step === "otp" ? (
          <div className="flex flex-col items-center gap-4">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOTP(value)}
              className="w-full"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot index={1} />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot index={3} />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot index={4} />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        ) : null}
        <DialogFooter>
          {step === "email" ? (
            <Button
              onClick={loadCode}
              type="button"
              disabled={isCodeLoading || !validateEmail(email)}
            >
              {isCodeLoading ? (
                <div className="flex gap-2 items-center">
                  <Loader />
                  {dictionary.Loading}
                </div>
              ) : (
                dictionary.Send
              )}
            </Button>
          ) : step === "otp" ? (
            <>
              <Button
                onClick={() => {
                  setStep("email");
                  setOTP("");
                }}
                variant="ghost"
                disabled={isTokenLoading}
              >
                {dictionary.Back}
              </Button>
              <Button
                disabled={isTokenLoading || otp.length < 6}
                onClick={loadToken}
              >
                {isTokenLoading ? (
                  <>
                    <Loader />
                    {dictionary.Loading}
                  </>
                ) : (
                  dictionary.Send
                )}
              </Button>
            </>
          ) : null}
        </DialogFooter>
      </DialogContent>
      {/* step === "otp" &&
        !isTokenLoading &&
        !isLoading && (
          <DialogContent className="sm:max-w-[425px] min-h-[250px]">
            <DialogHeader>
              <DialogTitle>{dictionary.OTPTitle}</DialogTitle>
              <DialogDescription>
                {dictionary.OTPDescription2}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="name">{dictionary.OTPTitle}</Label>
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOTP(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <DialogFooter className="gap-2">
              <Button
                onClick={() => {
                  setStep("email");
                  setOTP("");
                }}
              >
                {dictionary.Back}
              </Button>
              <Button onClick={() => loadToken()}>{dictionary.Send}</Button>
            </DialogFooter>
          </DialogContent>
        )
      )} */}
    </Dialog>
  );
};
