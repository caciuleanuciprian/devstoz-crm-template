import { Loader2 } from "lucide-react";

export const Loader = ({ className = "" }: any) => {
  return (
    <div className="flex w-full justify-center">
      <Loader2 className={`${className} animate-spin`} />
    </div>
  );
};
