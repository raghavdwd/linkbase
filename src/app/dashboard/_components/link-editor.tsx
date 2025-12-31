"use client";

import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { LinkCard } from "./link-card";
import { api, type RouterOutputs } from "~/trpc/react";
import { toast } from "react-hot-toast";
import { Skeleton } from "~/components/ui/skeleton";

type Link = RouterOutputs["link"]["getAll"][number];

/**
 * core link editor component with dnd-kit sorting
 */
export function LinkEditor() {
  const [links, setLinks] = useState<Link[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const { data: serverLinks, isLoading } = api.link.getAll.useQuery();
  const utils = api.useUtils();

  const createMutation = api.link.create.useMutation({
    onSuccess: () => {
      void utils.link.getAll.invalidate();
      toast.success("link added");
      setIsAddDialogOpen(false);
      setNewTitle("");
      setNewUrl("");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const reorderMutation = api.link.reorder.useMutation({
    onError: (_err) => {
      toast.error("failed to save new order");
      void utils.link.getAll.invalidate(); // rollback
    },
  });

  // syncing local state with server data
  useEffect(() => {
    if (serverLinks) {
      setLinks(serverLinks);
    }
  }, [serverLinks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // allowing minor movement before drag starts
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setLinks((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);

        const newArray = arrayMove(items, oldIndex, newIndex);

        // preparing data for batch update
        const reorderData = newArray.map((link, index) => ({
          id: link.id,
          order: index,
        }));

        void reorderMutation.mutate(reorderData);

        return newArray;
      });
    }
  };

  const handleAddLink = () => {
    if (!newTitle || !newUrl) return;
    setIsAdding(true);
    void createMutation.mutate({ title: newTitle, url: newUrl });
    setIsAdding(false);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-20 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-muted/30 flex flex-col items-start justify-between gap-4 rounded-2xl p-4 sm:flex-row sm:items-center md:p-6">
        <div>
          <h2 className="text-xl font-bold md:text-2xl">manage links</h2>
          <p className="text-muted-foreground text-sm">
            add, edit or reorder your links
          </p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="h-11 w-full rounded-full px-6 shadow-lg transition-all hover:shadow-xl sm:w-auto">
              <Plus className="mr-2 h-4 w-4" /> add link
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[90vw] rounded-2xl md:max-w-md">
            <DialogHeader>
              <DialogTitle>add new link</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="new-title">title</Label>
                <Input
                  id="new-title"
                  placeholder="e.g. My Website"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-url">url</Label>
                <Input
                  id="new-url"
                  placeholder="https://example.com"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                cancel
              </Button>
              <Button
                onClick={handleAddLink}
                disabled={isAdding || !newTitle || !newUrl}
              >
                {isAdding ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                add link
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext
          items={links.map((l) => l.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid gap-1">
            {links.length > 0 ? (
              links.map((link) => <LinkCard key={link.id} link={link} />)
            ) : (
              <div className="bg-muted/10 rounded-2xl border-2 border-dashed py-20 text-center">
                <p className="text-muted-foreground">
                  no links yet. add your first one!
                </p>
              </div>
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
