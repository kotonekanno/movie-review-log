import { useState, useEffect } from "react";

import type { WatchlistItem } from "@/types/watchlist";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import WatchlistEditDialog from "@/components/dialog/WatchlistEditDialog";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const POSTER_BASE_URL = import.meta.env.VITE_POSTER_BASE_URL;

interface Props {
  item: WatchlistItem;
  onSuccess: () => void;
}

function WatchlistCard({ item, onSuccess }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isWatched, setIsWatched] = useState(!!item.isWatched);

  const [prevItem, setPrevItem] = useState<WatchlistItem>();

  const handleWatchedChange = async (value: boolean) => {
    setIsWatched(value);

    try {
      const res = await fetch(`${API_BASE_URL}/watchlist`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          watchlistId: item.watchlistId,
          isWatched: value,
        }),
        credentials: "include",
      });

      if (res.status === 204) {
        return;
      } else {
        toast.error("更新できませんでした");
      }
    } catch(e) {
      toast.error("更新できませんでした");
    }
  };

  useEffect(() => {
    setIsWatched(!!item.isWatched);
  }, [item]);

  return (
    <div className="w-[600px] mx-auto gap-4 p-1 border rounded-md">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <div className="flex items-center justify-between px-4 h-14">

            <div className="flex items-center gap-4 flex-1 min-w-0">
              <Checkbox
                checked={isWatched}
                onCheckedChange={(isWatched) => {
                  const value = !!isWatched;
                  handleWatchedChange(value);
                }}
              />

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span
                      className={`relative block max-w-full overflow-hidden whitespace-nowrap
                        ${isWatched ? "line-through text-muted-foreground" : ""}`}
                    >
                      <span className="pr-6">
                        {item.movie.jaTitle}
                      </span>
                      <span className="absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-background to-transparent" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    {item.movie.jaTitle}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="flex items-center gap-4 ml-4">
              <span className="w-16 text-right text-sm text-muted-foreground">
                {item.priority}%
              </span>

              <Button
                onClick={() => {
                  setPrevItem(item);
                  setIsOpen(true);
                }}
                disabled={isWatched}
                className="my-auto"
              >
                編集
              </Button>

              <WatchlistEditDialog
                mode="edit"
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                onSuccess={onSuccess}
                prevItem={prevItem!}
              />

              <AccordionTrigger className="px-2 hover:no-underline" />
            </div>
          </div>

          <AccordionContent className="px-4 pt-2 pb-4">
            <div className="flex gap-4">
              <img
                src={POSTER_BASE_URL + item.movie.posterPath}
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