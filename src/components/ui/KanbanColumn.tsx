
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KanbanItemType } from "./KanbanBoard";
import KanbanItem from "./KanbanItem";

interface KanbanColumnProps {
  id: string;
  title: string;
  color?: string;
  items: KanbanItemType[];
  onItemClick: (id: string) => void;
}

const KanbanColumn = ({
  id,
  title,
  color = "bg-gray-200",
  items,
  onItemClick,
}: KanbanColumnProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
    data: {
      type: "column",
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex h-full flex-col"
      {...attributes}
      {...listeners}
    >
      <Card className="flex h-full flex-col bg-muted/40">
        <CardHeader className="pb-2 pt-4 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`h-3 w-3 rounded-full ${color}`} />
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </div>
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary text-xs font-medium">
              {items.length}
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto p-2">
          <div className="grid gap-2">
            {items.map((item) => (
              <KanbanItem 
                key={item.id} 
                item={item} 
                onClick={() => onItemClick(item.id)} 
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KanbanColumn;
