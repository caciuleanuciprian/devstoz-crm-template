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
  confirmTxt: string;
  cancelTxt: string;
  onConfirm: (params?: any) => void;
  onCancel: (params?: any) => void;
  isDelete?: boolean;
}

export const Modal = ({
  trigger = "Open",
  title = "Save changes",
  description = "Your changes will be lost if you don't save them.",
  confirmTxt = "Save",
  cancelTxt = "Cancel",
  onConfirm = () => {},
  onCancel = () => {},
  isDelete,
}: ModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant={isDelete ? "destructive" : "default"}
              onClick={onConfirm}
              type="button"
            >
              {confirmTxt}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant={"ghost"} onClick={onCancel} type="button">
              {cancelTxt}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
