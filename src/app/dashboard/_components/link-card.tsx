"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  GripVertical,
  Pencil,
  Trash2,
  Globe,
  ExternalLink,
} from "lucide-react";
import { Switch } from "~/components/ui/switch";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import { api } from "~/trpc/react";
import { toast } from "react-hot-toast";

interface LinkCardProps {
  link: {
    id: string;
    title: string;
    url: string;
    visible: boolean;
    icon: string | null;
  };
}

/**
 * individual link card component with edit/delete/toggle functionality
 */
export function LinkCard({ link }: LinkCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(link.title);
  const [editUrl, setEditUrl] = useState(link.url);
  const [isUpdating, setIsUpdating] = useState(false);

  const utils = api.useUtils();

  const updateMutation = api.link.update.useMutation({
    onSuccess: () => {
      void utils.link.getAll.invalidate();
      toast.success("link updated");
      setIsEditing(false);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const deleteMutation = api.link.delete.useMutation({
    onSuccess: () => {
      void utils.link.getAll.invalidate();
      toast.success("link deleted");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 0,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleUpdate = () => {
    setIsUpdating(true);
    void updateMutation.mutate({
      id: link.id,
      title: editTitle,
      url: editUrl,
    });
    setIsUpdating(false);
  };

  const handleToggleVisibility = (checked: boolean) => {
    void updateMutation.mutate({
      id: link.id,
      visible: checked,
    });
  };

  const handleDelete = () => {
    if (window.confirm("are you sure you want to delete this link?")) {
      void deleteMutation.mutate({ id: link.id });
    }
  };

  return (
    <div ref={setNodeRef} style={style} className="mb-4">
      <Card className="hover:border-primary/50 transition-colors">
        <CardContent className="flex items-center gap-3 p-3 md:gap-4 md:p-4">
          {/* Drag handle */}
          <div
            {...attributes}
            {...listeners}
            className="text-muted-foreground hover:text-foreground shrink-0 cursor-grab transition-colors active:cursor-grabbing"
          >
            <GripVertical size={18} className="md:h-5 md:w-5" />
          </div>

          {/* Details and Actions container */}
          <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              {/* Icon placeholder */}
              <div className="bg-primary/10 text-primary flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full md:h-10 md:w-10">
                {link.icon ? (
                  <Image
                    src={link.icon}
                    alt={link.title}
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain md:h-6 md:w-6"
                  />
                ) : (
                  <Globe size={18} className="md:h-5 md:w-5" />
                )}
              </div>

              {/* Link text details */}
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-semibold md:text-base">
                  {link.title}
                </h3>
                <p className="text-muted-foreground flex items-center gap-1 truncate text-[10px] md:text-sm">
                  {link.url}
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary shrink-0"
                  >
                    <ExternalLink size={10} className="md:h-3 md:w-3" />
                  </a>
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-1 md:gap-2">
              <Switch
                checked={link.visible}
                onCheckedChange={handleToggleVisibility}
                aria-label="Toggle link visibility"
                className="scale-75 md:scale-100"
              />

              <div className="flex items-center">
                <Dialog open={isEditing} onOpenChange={setIsEditing}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 md:h-8 md:w-8"
                    >
                      <Pencil size={14} className="md:h-4 md:w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[90vw] rounded-2xl md:max-w-md">
                    <DialogHeader>
                      <DialogTitle>edit link</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="edit-title">title</Label>
                        <Input
                          id="edit-title"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="edit-url">url</Label>
                        <Input
                          id="edit-url"
                          value={editUrl}
                          onChange={(e) => setEditUrl(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter className="gap-2 sm:gap-0">
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        cancel
                      </Button>
                      <Button onClick={handleUpdate} disabled={isUpdating}>
                        {isUpdating ? "saving..." : "save changes"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 h-7 w-7 md:h-8 md:w-8"
                  onClick={handleDelete}
                >
                  <Trash2 size={14} className="md:h-4 md:w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
