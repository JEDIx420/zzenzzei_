
import React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

const PageHeader = ({ 
  title, 
  description, 
  children, 
  className 
}: PageHeaderProps) => {
  return (
    <div className={cn("mb-8 flex flex-col gap-1 md:flex-row md:items-center md:justify-between", className)}>
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      {children && <div className="mt-4 flex items-center gap-2 md:mt-0">{children}</div>}
    </div>
  );
};

export default PageHeader;
