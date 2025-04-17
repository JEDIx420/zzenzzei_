
import { useState } from "react";
import { Upload, FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const SidebarFileImport = () => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      // In a real app, we would process the file here
      toast.success(`File "${file.name}" uploaded successfully`);
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      toast.success(`File "${file.name}" uploaded successfully`);
    }
  };

  return (
    <div className="px-2 py-3">
      <div className="text-xs font-medium text-muted-foreground mb-2">Import Data</div>
      <div
        className={`border-2 border-dashed rounded-md p-3 text-center ${
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20"
        } transition-colors`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <FileUp className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
        <p className="mb-2 text-xs font-medium">
          Upload contact or account info
        </p>
        <div className="relative">
          <Input
            id="sidebar-file-upload"
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileImport}
            accept=".csv,.xlsx,.xls"
          />
          <Button variant="secondary" size="sm" className="relative pointer-events-none w-full text-xs">
            <Upload className="h-3 w-3 mr-1" />
            Browse Files
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SidebarFileImport;
