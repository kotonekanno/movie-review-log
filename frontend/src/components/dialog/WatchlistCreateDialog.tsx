import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Field,
  FieldGroup
} from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import MovieSearchDialog from "../MovieSearchDialog"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"

function WatchlistCreateDialog () {
  const [isOpen, setIsOpen] = useState(false);
  const [priority, setPriority] = useState<number>(50);
  const [note, setNote] = useState<string>("");

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>作成</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <MovieSearchDialog
                onSelectMovie={() => {}}
              />
            </Field>

            <Field>
              <Label>優先度</Label>
              <Slider
                value={[priority]}
                min={0}
                max={100}
                step={1}
                onValueChange={(val) => setPriority(val[0])}
                className="w-full max-w-xs"
              />
              <div className="mt-1 font-semibold text-center">{priority}%</div>
            </Field>

            <Field>
              <Label>メモ</Label>
              <Textarea
                value={note}
                onChange={e => setNote(e.target.value)}
              />
            </Field>

          </FieldGroup>
          <DialogFooter>
            <Button type="submit">保存</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default WatchlistCreateDialog;