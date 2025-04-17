
import { useState } from "react";
import { Upload, FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const FileImport = () => {
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
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Import Data</CardTitle>
        <CardDescription>
          Upload contact or account information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center ${
            isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20"
          } transition-colors`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <FileUp className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
          <p className="mb-2 text-sm font-medium">
            Drag & drop files here or click to browse
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            Supported formats: CSV, Excel (.xlsx, .xls)
          </p>
          <div className="relative">
            <Input
              id="file-upload"
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileImport}
              accept=".csv,.xlsx,.xls"
            />
            <Button variant="secondary" size="sm" className="relative pointer-events-none">
              <Upload className="h-4 w-4 mr-2" />
              Browse Files
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Files will be securely processed and mapped to your contacts or accounts
      </CardFooter>
    </Card>
  );
};

export default FileImport;
