import AuthGuard from "@/guards/auth-guard";
import Navigation from "@/components/common/navigation/navigation";

const Page = ({ children }: any) => {
  return (
    <AuthGuard>
      {/* <DisclaimerGuard> */}
      <div className="flex h-[100vh]">
        <Navigation />
        <div className="w-full h-screen">{children}</div>
      </div>
      {/* <DisclaimerGuard> */}
    </AuthGuard>
  );
};

export default Page;
