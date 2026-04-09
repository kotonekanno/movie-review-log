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

interface ConfirmDialogProps {
  title: string;
  text: string;
  buttonText: string;
  rightOnClick?: () => void;
  leftOnClick: () => void;
}

export default function ConfirmDialog({ title, text, buttonText, rightOnClick, leftOnClick }: ConfirmDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className="px-6"
        >
          {buttonText}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {text}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-2">
          <DialogClose asChild>
            <Button
              onClick={leftOnClick}
              className="flex-1"
            >
              削除する
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button
              onClick={() => rightOnClick?.()}
              variant="outline"
              className="flex-1"
            >
              キャンセル
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
