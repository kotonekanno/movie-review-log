/*import { useState } from "react"

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

interface Props {
  buttonText: string;
  disabled: boolean;
}

function WatchlistEditDialog ({ buttonText, disabled }: Props) {
  const [priority, setPriority] = useState<number>(50);
  const [note, setNote] = useState<string>("");

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            onClick={(e) => e.stopPropagation()}
            disabled={disabled}
          >
            {buttonText}
      </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>編集</DialogTitle>
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

export default WatchlistEditDialog;*/
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Field,
  FieldGroup
} from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import MovieSearchDialog from "../MovieSearchDialog"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"

interface Props {
  buttonText?: string;
  disabled?: boolean;
  isOpen: boolean;
  onOpenChange: (v: boolean) => void;
}

function WatchlistEditDialog ({ buttonText, disabled, isOpen, onOpenChange }: Props) {
  const [priority, setPriority] = useState<number>(50);
  const [note, setNote] = useState<string>("");

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{buttonText}</DialogTitle>
        </DialogHeader>

        <form className="flex flex-col gap-4">
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
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              閉じる
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default WatchlistEditDialog;