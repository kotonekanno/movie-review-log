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
import type { ReactElement } from "react";

interface ConfirmDialogProps {
  title: string;
  text: string;
  buttonIcon: ReactElement;
  rightOnClick?: () => void;
  leftOnClick: () => void;
}

export default function IconButtonConfirmDialog({ title, text, buttonIcon, rightOnClick, leftOnClick }: ConfirmDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className=""
        >
          {buttonIcon}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-lg">{title}</DialogTitle>
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
