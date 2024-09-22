import { forwardRef, ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type CustomTooltipProps = {
  children: ReactNode;
  content: string;
};

export const CustomTooltip = forwardRef(
  ({ children, content }: CustomTooltipProps, _ref) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent className="pointer-events-none">
            <p className="text-sm font-normal">{content}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);
