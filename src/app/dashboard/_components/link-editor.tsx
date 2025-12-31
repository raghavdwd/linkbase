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
import { Plus, Loader2, AlertCircle, Sparkles } from "lucide-react";
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
import Link from "next/link";

type LinkType = RouterOutputs["link"]["getAll"][number];

/**
 * core link editor component with dnd-kit sorting
 */
export function LinkEditor() {
  const [links, setLinks] = useState<LinkType[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const { data: serverLinks, isLoading } = api.link.getAll.useQuery();
  const { data: linkLimits } = api.subscription.getLinkLimits.useQuery();
  const utils = api.useUtils();

  const createMutation = api.link.create.useMutation({
    onSuccess: () => {
      void utils.link.getAll.invalidate();
      void utils.subscription.getLinkLimits.invalidate();
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

  const canCreateMore = linkLimits?.canCreateMore ?? true;
  const currentCount = linkLimits?.currentCount ?? 0;
  const limit = linkLimits?.limit ?? 5;
  const isUnlimited = linkLimits?.isUnlimited ?? false;

  return (
    <div className="space-y-6">
      {/* Link Limit Warning */}
      {!canCreateMore && (
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-orange-200 bg-orange-50 p-4 dark:border-orange-900 dark:bg-orange-950">
          <div className="flex items-center gap-3">
            <AlertCircle className="text-orange-500" size={24} />
            <div>
              <p className="font-semibold text-orange-800 dark:text-orange-200">
                Link limit reached ({currentCount}/{limit})
              </p>
              <p className="text-sm text-orange-600 dark:text-orange-400">
                Upgrade to Pro for unlimited links
              </p>
            </div>
          </div>
          <Link href="/pricing">
            <Button className="rounded-full" size="sm">
              <Sparkles className="mr-2" size={14} />
              Upgrade
            </Button>
          </Link>
        </div>
      )}

      <div className="bg-muted/30 flex flex-col items-start justify-between gap-4 rounded-2xl p-4 sm:flex-row sm:items-center md:p-6">
        <div>
          <h2 className="text-xl font-bold md:text-2xl">manage links</h2>
          <p className="text-muted-foreground text-sm">
            add, edit or reorder your links
            {!isUnlimited && (
              <span className="bg-primary/10 text-primary ml-2 rounded-full px-2 py-0.5 text-xs font-medium">
                {currentCount}/{limit} used
              </span>
            )}
          </p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="h-11 w-full rounded-full px-6 shadow-lg transition-all hover:shadow-xl sm:w-auto"
              disabled={!canCreateMore}
            >
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
