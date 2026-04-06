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
  rightOnClick?: () => void;
  leftOnClick: () => void;
}

export default function ConfirmDialog({ rightOnClick, leftOnClick }: ConfirmDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="px-6">削除</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>レビューを削除しますか？</DialogTitle>
          <DialogDescription>
            この操作は取り消せません。削除するとレビューは完全に消去されます。
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
