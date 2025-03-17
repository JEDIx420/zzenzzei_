
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Clock, Flag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { KanbanItemType } from "./KanbanBoard";
import { cn } from "@/lib/utils";

interface KanbanItemProps {
  item: KanbanItemType;
  onClick: () => void;
}

const priorityColors = {
  low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

const KanbanItem = ({ item, onClick }: KanbanItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    data: {
      type: "item",
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const formattedDueDate = item.dueDate
    ? new Date(item.dueDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        "cursor-pointer transition-all hover:shadow-md",
        isDragging ? "opacity-50" : "opacity-100"
      )}
      onClick={onClick}
      {...attributes}
      {...listeners}
    >
      <CardContent className="p-3">
        <div className="space-y-2">
          <div className="font-medium">{item.title}</div>
          {item.description && (
            <div className="text-xs text-muted-foreground line-clamp-2">
              {item.description}
            </div>
          )}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {item.priority && (
              <Badge
                variant="outline"
                className={cn("font-normal", priorityColors[item.priority])}
              >
                <Flag className="mr-1 h-3 w-3" />
                {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
              </Badge>
            )}
            {formattedDueDate && (
              <Badge variant="outline" className="font-normal">
                <Clock className="mr-1 h-3 w-3" />
                {formattedDueDate}
              </Badge>
            )}
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {item.tags.slice(0, 1).map((tag) => (
                  <Badge key={tag} variant="secondary" className="font-normal">
                    {tag}
                  </Badge>
                ))}
                {item.tags.length > 1 && (
                  <Badge variant="secondary" className="font-normal">
                    +{item.tags.length - 1}
                  </Badge>
                )}
              </div>
            )}
          </div>
          {item.assignee && (
            <div className="flex justify-end pt-1">
              <Avatar className="h-6 w-6">
                <AvatarImage src={item.assigneeAvatar} alt={item.assignee} />
                <AvatarFallback className="text-xs">
                  {item.assignee.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default KanbanItem;
