import { useState, useEffect } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";

import type { WatchlistItem } from "@/types/watchlist";
import WatchlistEditDialog from "@/components/dialog/WatchlistEditDialog";

interface Props {
  item: WatchlistItem;
}

function WatchlistCard({ item }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [checked, setChecked] = useState(!!item.isWatched);
  const [formValues, setFormValues] = useState({
    jaTitle: item.jaTitle,
    priority: item.priority,
    note: item.note,
  });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const POSTER_BASE_URL = import.meta.env.VITE_POSTER_BASE_URL;

  const handleChange = async (value: boolean) => {
    setChecked(value);
    await fetch(`${API_BASE_URL}/watchlist`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ watchlistId: item.watchlistId, isWatched: value }),
      credentials: "include",
    });
  };

  const payload: Partial<WatchlistItem> = { watchlistId: item.watchlistId };

  if (formValues.jaTitle !== item.jaTitle) payload.jaTitle = formValues.jaTitle;
  if (formValues.priority !== item.priority) payload.priority = formValues.priority;
  if (formValues.note !== item.note) payload.note = formValues.note;

  useEffect(() => {
    setChecked(!!item.isWatched);
  }, [item.isWatched]);

  return (
    <div className="w-[450px] mx-auto gap-4 p-1 border rounded-md">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="h-14 flex items-center justify-between px-4 hover:no-underline">
            <div className="flex items-center gap-4 flex-1 + min-w-0">
              <Checkbox
                checked={checked}
                onCheckedChange={(v) => handleChange(!!v)}
                onClick={(e) => e.stopPropagation()}
              />
              <span className={`truncate ${checked ? "line-through text-muted-foreground" : ""}`}>
                {item.jaTitle}
              </span>
            </div>

            <div className="flex items-center gap-6 mr-4">
              <span className="w-16 text-right text-sm text-muted-foreground">
                {item.priority}%
              </span>
              <div onClick={(e) => e.stopPropagation()}>
                <Button
                  onClick={() => setIsOpen(true)}
                  disabled={checked}
                  className="my-auto"
                >
                  編集
                </Button>
                <WatchlistEditDialog
                  buttonText="編集"
                  isOpen={isOpen}
                  onOpenChange={setIsOpen}
                />
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent className="px-4 pt-2 pb-4">
            <div className="flex gap-4">
              <img
                src={POSTER_BASE_URL + item.posterPath}
                alt="poster"
                className="w-[100px] aspect-[2/3] object-cover rounded-md bg-black"
              />
              <div className="flex-1 text-sm text-muted-foreground">
                {item.note}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default WatchlistCard;