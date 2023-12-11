import Navigation from "./navigation";

const Page = ({ children }: any) => {
  return (
    <div className="flex h-[100vh]">
      <Navigation />
      <div className="w-full h-screen bg-[#F4F4F5]">{children}</div>
    </div>
  );
};

export default Page;
