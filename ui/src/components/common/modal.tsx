import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Loader } from "./loader";

interface ModalProps {
  trigger: any;
  title: string;
  description: string;
  component?: any;
  confirmTxt?: string;
  cancelTxt?: string;
  onConfirm?: (params?: any) => Promise<void>;
  onCancel?: (params?: any) => void;
  isDelete?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  customFooter?: boolean;
}

export const Modal = ({
  trigger = "Open",
  title = "Save changes",
  description = "Your changes will be lost if you don't save them.",
  component,
  confirmTxt = "Save",
  cancelTxt = "Cancel",
  onConfirm = async () => {},
  onCancel = () => {},
  isDelete,
  isDisabled = false,
  isLoading = false,
}: ModalProps) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = async () => {
    await onConfirm();
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          {component && component}
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant={"outline"}
              onClick={onCancel}
              type="button"
              className="text-xs flex items-center px-8"
            >
              {cancelTxt}
            </Button>
          </DialogClose>
          <Button
            variant={isDelete ? "destructive" : "default"}
            onClick={handleConfirm}
            type="button"
            disabled={isLoading || isDisabled}
            className="text-xs flex items-center px-8"
          >
            {isLoading ? <Loader /> : confirmTxt}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
