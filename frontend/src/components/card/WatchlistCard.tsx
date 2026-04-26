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
import { Trash } from "lucide-react";

import WatchlistEditDialog from "@/components/dialog/WatchlistEditDialog";
import ConfirmDialog from "@/components/dialog/ConfirmDialog";
import { toast } from "sonner";

import { deleteWatchlistItem, updateIsWatched } from "@/api/watchlist";
import { ApiError } from "@/errors/ApiError";
import IconButtonConfirmDialog from "../dialog/IconButtonConfirmDialog";

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
      await updateIsWatched(item.watchlistId, value);
    } catch (e) {
      if (e instanceof ApiError) {
        if (e.status === 409) {
          toast.error("この作品は既にウォッチリストにあります");
        } else {
          toast.error("更新できませんでした");
        }
      } else {
        toast.error("更新できませんでした");
      }
    }
  };

  useEffect(() => {
    setIsWatched(!!item.isWatched);
  }, [item]);

  const handleDelete = async () => {
    try {
      await deleteWatchlistItem(item.watchlistId);
      toast.success("アイテムを削除しました");

      onSuccess();
    } catch (e) {
      toast.error("削除できませんでした");
    }
  }

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

              <IconButtonConfirmDialog
                title="作品を削除しますか？"
                text="この操作は取り消せません。削除すると完全に消去されます。"
                buttonIcon={<Trash className="h-4 w-4" />}
                leftOnClick={() => handleDelete()}
              />
              
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
            <div className="pl-4 pr-10">
              <div className="flex gap-4">
                <img
                  src={POSTER_BASE_URL + item.movie.posterPath}
                  alt="poster"
                  className="w-[100px] aspect-[2/3] object-cover rounded-md bg-black"
                />

                <div className="flex flex-col flex-1">
                  <div className="text-sm text-muted-foreground">
                    {item.note}
                  </div>

                  <div className="mt-auto flex justify-end">
                    <Button
                      onClick={() => {
                        setPrevItem(item);
                        setIsOpen(true);
                      }}
                      disabled={isWatched}
                    >
                      編集
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>

        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default WatchlistCard;