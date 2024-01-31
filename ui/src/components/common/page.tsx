import AuthGuard from "@/guards/auth-guard";
import Navigation from "@/components/common/navigation/navigation";

const Page = ({ children }: any) => {
  return (
    <AuthGuard>
      <div className="flex h-[100vh] ">
        <Navigation />
        <div className="bg-background w-full h-full">{children}</div>
      </div>
    </AuthGuard>
  );
};

export default Page;
