import AuthGuard from "@/guards/auth-guard";
import Navigation from "@/components/common/navigation/navigation";
import { NAVBAR_WIDTH } from "./navigation/utils/consts";

const Page = ({ children }: any) => {
  return (
    <AuthGuard>
      <div className="flex h-[100vh] ">
        <Navigation />
        <div
          className={`bg-background w-full h-full z-0 ml-[${NAVBAR_WIDTH}px]`}
        >
          {children}
        </div>
      </div>
    </AuthGuard>
  );
};

export default Page;
