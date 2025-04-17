
import { useState } from "react";
import { Search, Loader2, Globe, Server, Users, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface ResearchResult {
  companyName: string;
  website?: string;
  recentNews?: string[];
  techStack?: string[];
  employees?: string;
  lastUpdated?: string;
}

interface ResearchAgentProps {
  initialQuery?: string;
  onResearchComplete?: (result: ResearchResult) => void;
}

const ResearchAgent = ({ initialQuery = "", onResearchComplete }: ResearchAgentProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ResearchResult | null>(null);

  const handleResearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!query.trim()) {
      toast.error("Please enter a company name to research");
      return;
    }

    setIsLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      // Mock data - in a real app, this would come from an API call
      const mockResult: ResearchResult = {
        companyName: query,
        website: `https://www.${query.toLowerCase().replace(/\s+/g, '')}.com`,
        recentNews: [
          `${query} announces new product line for Q3 2025`,
          `${query} partners with major industry player`,
          `${query} reports strong financial performance in recent quarter`
        ],
        techStack: ["React", "Node.js", "AWS", "MongoDB", "Kubernetes"],
        employees: "250-500",
        lastUpdated: new Date().toLocaleDateString()
      };

      setResult(mockResult);
      setIsLoading(false);
      
      toast.success(`Research completed for ${query}`);
      
      if (onResearchComplete) {
        onResearchComplete(mockResult);
      }
    }, 2500);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          AI Lead Research
        </CardTitle>
        <CardDescription>
          Research company information, latest news, and tech stack automatically
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleResearch} className="flex items-center gap-2">
          <Input
            placeholder="Enter company name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Researching...
              </>
            ) : (
              "Research"
            )}
          </Button>
        </form>

        {result && (
          <div className="mt-4 space-y-4">
            <div className="rounded-md bg-muted p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-medium">{result.companyName}</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="gap-1"
                  onClick={() => handleResearch()}
                >
                  <RefreshCcw className="h-3 w-3" />
                  Refresh
                </Button>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Website:</span>
                    <a 
                      href={result.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      {result.website}
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Tech Stack:</span>
                    <span className="text-sm">
                      {result.techStack?.join(", ")}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Employees:</span>
                    <span className="text-sm">{result.employees}</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="mb-1 text-sm font-medium">Recent News</h4>
                  <ul className="space-y-1 text-sm">
                    {result.recentNews?.map((news, index) => (
                      <li key={index} className="list-disc ml-4">
                        {news}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-3 border-t pt-2 text-xs text-muted-foreground">
                Last updated: {result.lastUpdated}
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Research data is gathered from public sources and may not always be accurate or up-to-date.
      </CardFooter>
    </Card>
  );
};

export default ResearchAgent;
