
import { useState } from "react";
import { PlusCircle, BarChart3, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import PageHeader from "@/components/ui/PageHeader";
import KanbanBoard, { KanbanItemType, KanbanColumnType } from "@/components/ui/KanbanBoard";

// Sample data for the pipeline
const initialColumns: KanbanColumnType[] = [
  { 
    id: "leads", 
    title: "Leads", 
    itemIds: ["deal-1", "deal-4", "deal-6"],
    color: "bg-blue-500"
  },
  { 
    id: "discovery", 
    title: "Discovery", 
    itemIds: ["deal-2", "deal-7"], 
    color: "bg-indigo-500"
  },
  { 
    id: "proposal", 
    title: "Proposal", 
    itemIds: ["deal-3", "deal-8"],
    color: "bg-violet-500"
  },
  { 
    id: "negotiation", 
    title: "Negotiation", 
    itemIds: ["deal-5"],
    color: "bg-purple-500"
  },
  { 
    id: "closed", 
    title: "Closed Won", 
    itemIds: ["deal-9"],
    color: "bg-green-500"
  },
];

const initialItems: KanbanItemType[] = [
  {
    id: "deal-1",
    title: "Acme Corp - New Software",
    description: "Potential new software implementation",
    assignee: "John Doe",
    dueDate: "2023-12-15",
    priority: "medium",
    status: "leads",
    tags: ["Software"],
  },
  {
    id: "deal-2",
    title: "TechStart - Consulting",
    description: "Strategic consulting project",
    assignee: "Jane Smith",
    dueDate: "2023-12-20",
    priority: "high",
    status: "discovery",
    tags: ["Consulting", "Priority"],
  },
  {
    id: "deal-3",
    title: "Johnson Inc - Expansion",
    description: "Office expansion project",
    assignee: "Robert Johnson",
    dueDate: "2024-01-10",
    priority: "medium",
    status: "proposal",
    tags: ["Expansion"],
  },
  {
    id: "deal-4",
    title: "Global Solutions - Support",
    description: "Annual support contract",
    assignee: "Emily Davis",
    dueDate: "2023-12-30",
    priority: "low",
    status: "leads",
    tags: ["Support", "Renewal"],
  },
  {
    id: "deal-5",
    title: "EcoFriendly - Partnership",
    description: "Strategic partnership deal",
    assignee: "Michael Wilson",
    dueDate: "2024-01-15",
    priority: "high",
    status: "negotiation",
    tags: ["Partnership"],
  },
  {
    id: "deal-6",
    title: "Local Shop - Website",
    description: "E-commerce website development",
    assignee: "Sarah Miller",
    dueDate: "2024-01-05",
    priority: "medium",
    status: "leads",
    tags: ["Website", "Development"],
  },
  {
    id: "deal-7",
    title: "Health Services - Integration",
    description: "System integration project",
    assignee: "John Doe",
    dueDate: "2024-02-01",
    priority: "medium",
    status: "discovery",
    tags: ["Healthcare", "Integration"],
  },
  {
    id: "deal-8",
    title: "Finance Corp - Security",
    description: "Security upgrade project",
    assignee: "Emily Davis",
    dueDate: "2024-01-25",
    priority: "high",
    status: "proposal",
    tags: ["Security", "Finance"],
  },
  {
    id: "deal-9",
    title: "Tech Enterprise - License",
    description: "Enterprise license agreement",
    assignee: "Sarah Miller",
    dueDate: "2023-12-10",
    priority: "high",
    status: "closed",
    tags: ["License", "Enterprise"],
  },
];

const Pipeline = () => {
  const [columns, setColumns] = useState<KanbanColumnType[]>(initialColumns);
  const [items, setItems] = useState<KanbanItemType[]>(initialItems);
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [assigneeFilter, setAssigneeFilter] = useState<string>("all");

  const handleChangeItemColumn = (itemId: string, columnId: string) => {
    // Update the item's status
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, status: columnId } : item
      )
    );

    // Update column item ids
    setColumns((prevColumns) => {
      // Remove item from any column that contains it
      const updatedColumns = prevColumns.map((column) => ({
        ...column,
        itemIds: column.itemIds.filter((id) => id !== itemId),
      }));

      // Add item to the target column
      return updatedColumns.map((column) =>
        column.id === columnId
          ? { ...column, itemIds: [...column.itemIds, itemId] }
          : column
      );
    });

    toast.success(`Deal moved to ${columnId.charAt(0).toUpperCase() + columnId.slice(1)}`);
  };

  const handleItemClick = (itemId: string) => {
    toast.info(`Viewing deal ${itemId}`);
    // In a real app, open a modal or navigate to deal details
  };

  const filteredItems = items.filter((item) => {
    const matchesPriority = priorityFilter === "all" || item.priority === priorityFilter;
    const matchesAssignee = assigneeFilter === "all" || item.assignee === assigneeFilter;
    return matchesPriority && matchesAssignee;
  });

  const uniqueAssignees = Array.from(new Set(items.map((item) => item.assignee)));

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Sales Pipeline" 
        description="Track and manage your deals through your sales stages."
      >
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Deal
        </Button>
      </PageHeader>

      <Tabs defaultValue="kanban" className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <TabsList>
            <TabsTrigger value="kanban">Kanban</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="forecast">Forecast</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Select
              value={priorityFilter}
              onValueChange={setPriorityFilter}
            >
              <SelectTrigger className="w-[160px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
            
            <Select
              value={assigneeFilter}
              onValueChange={setAssigneeFilter}
            >
              <SelectTrigger className="w-[160px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by assignee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Assignees</SelectItem>
                {uniqueAssignees.map((assignee) => (
                  <SelectItem key={assignee} value={assignee as string}>
                    {assignee}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <TabsContent value="kanban" className="pt-4">
          <KanbanBoard
            items={filteredItems}
            columns={columns}
            onChangeItemColumn={handleChangeItemColumn}
            onItemClick={handleItemClick}
          />
        </TabsContent>
        
        <TabsContent value="list" className="rounded-md border h-[600px] flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
            <h3 className="mt-4 text-lg font-medium">List View Coming Soon</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              This feature is under development and will be available soon.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="forecast" className="rounded-md border h-[600px] flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
            <h3 className="mt-4 text-lg font-medium">Forecast View Coming Soon</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              This feature is under development and will be available soon.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Pipeline;
