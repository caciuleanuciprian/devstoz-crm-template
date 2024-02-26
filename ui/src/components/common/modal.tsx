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

interface ModalProps {
  trigger: any;
  title: string;
  description: string;
  component?: any;
  confirmTxt: string;
  cancelTxt: string;
  onConfirm?: (params?: any) => void;
  onCancel?: (params?: any) => void;
  isDelete?: boolean;
  isDisabled?: boolean;
}

export const Modal = ({
  trigger = "Open",
  title = "Save changes",
  description = "Your changes will be lost if you don't save them.",
  component,
  confirmTxt = "Save",
  cancelTxt = "Cancel",
  onConfirm = () => {},
  onCancel = () => {},
  isDelete,
  isDisabled = false,
}: ModalProps) => {
  return (
    <Dialog>
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
              disabled={isDisabled}
              variant={"outline"}
              onClick={onCancel}
              type="button"
              className="text-xs flex items-center px-8"
            >
              {cancelTxt}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant={isDelete ? "destructive" : "default"}
              onClick={onConfirm}
              type="button"
              disabled={isDisabled}
              className="text-xs flex items-center px-8"
            >
              {confirmTxt}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
