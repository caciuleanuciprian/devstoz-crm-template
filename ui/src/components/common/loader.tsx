import { Loader2 } from "lucide-react";

export const Loader = ({
  className = "",
  center = false,
}: {
  className?: any;
  center?: boolean;
}) => {
  return (
    <div
      className={`flex w-full justify-center ${center ? "items-center" : ""}`}
    >
      <Loader2 className={`${className} animate-spin`} />
    </div>
  );
};
