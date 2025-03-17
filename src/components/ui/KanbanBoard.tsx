
import { useState } from "react";
import { 
  DndContext, 
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import KanbanColumn from "./KanbanColumn";
import KanbanItem from "./KanbanItem";

export interface KanbanItemType {
  id: string;
  title: string;
  description?: string;
  assignee?: string;
  assigneeAvatar?: string;
  dueDate?: string;
  priority?: "low" | "medium" | "high";
  status: string;
  tags?: string[];
}

export interface KanbanColumnType {
  id: string;
  title: string;
  itemIds: string[];
  color?: string;
}

interface KanbanBoardProps {
  items: KanbanItemType[];
  columns: KanbanColumnType[];
  onChangeItemColumn: (itemId: string, columnId: string) => void;
  onItemClick: (itemId: string) => void;
}

const KanbanBoard = ({
  items,
  columns,
  onChangeItemColumn,
  onItemClick,
}: KanbanBoardProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const activeItem = items.find((item) => item.id === active.id);
      const overColumn = columns.find((column) => column.id === over.id);
      
      if (activeItem && overColumn) {
        onChangeItemColumn(activeItem.id, overColumn.id);
      }
    }
    
    setActiveId(null);
  };

  const getActiveItem = () => {
    if (!activeId) return null;
    return items.find((item) => item.id === activeId);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {columns.map((column) => {
          const columnItems = items.filter((item) => 
            column.itemIds.includes(item.id)
          );
          
          return (
            <SortableContext
              key={column.id}
              items={columnItems.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              <KanbanColumn
                id={column.id}
                title={column.title}
                color={column.color}
                items={columnItems}
                onItemClick={onItemClick}
              />
            </SortableContext>
          );
        })}
      </div>
      
      <DragOverlay>
        {activeId && getActiveItem() ? (
          <Card className="w-full opacity-80 shadow-md">
            <CardContent className="p-4">
              <KanbanItem 
                item={getActiveItem()!} 
                onClick={() => {}} 
              />
            </CardContent>
          </Card>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;
