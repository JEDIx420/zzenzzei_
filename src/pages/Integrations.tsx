
import { useState } from "react";
import { Link2, Zap, CheckCircle, AlertCircle, Book, ExternalLink, Webhook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageHeader from "@/components/ui/PageHeader";
import { toast } from "sonner";

interface IntegrationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: "connected" | "disconnected" | "pending";
  onConnect: () => void;
}

const IntegrationCard = ({
  title,
  description,
  icon,
  status,
  onConnect,
}: IntegrationCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
              {icon}
            </div>
            <div>
              <CardTitle>{title}</CardTitle>
              <CardDescription className="mt-1">
                {description}
              </CardDescription>
            </div>
          </div>
          {status === "connected" ? (
            <div className="flex items-center text-sm font-medium text-green-600">
              <CheckCircle className="mr-1 h-4 w-4" />
              Connected
            </div>
          ) : status === "pending" ? (
            <div className="flex items-center text-sm font-medium text-yellow-600">
              <AlertCircle className="mr-1 h-4 w-4" />
              Pending
            </div>
          ) : null}
        </div>
      </CardHeader>
      <CardFooter className="pt-0">
        <Button
          variant={status === "connected" ? "outline" : "default"}
          onClick={onConnect}
          className="w-full"
        >
          {status === "connected"
            ? "Manage Integration"
            : status === "pending"
            ? "Complete Setup"
            : "Connect"}
        </Button>
      </CardFooter>
    </Card>
  );
};

const Integrations = () => {
  const [n8nWebhookUrl, setN8nWebhookUrl] = useState("");
  const [n8nTriggerEndpoint, setN8nTriggerEndpoint] = useState("https://your-crm-domain.com/api/n8n/webhook");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoEnrichment, setAutoEnrichment] = useState(false);
  const [eventType, setEventType] = useState("lead.created");

  const handleConnectN8n = () => {
    if (!n8nWebhookUrl) {
      toast.error("Please enter a valid n8n webhook URL");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      toast.success("n8n integration configured successfully");
      setIsSubmitting(false);
    }, 1500);
  };

  const handleTestWebhook = () => {
    toast.info("Testing webhook...");
    
    // Simulate webhook test
    setTimeout(() => {
      toast.success("Webhook test successful! n8n received the test payload");
    }, 2000);
  };

  const availableIntegrations = [
    {
      title: "n8n",
      description: "Automate your workflow and connect with third-party services",
      icon: <Webhook className="h-6 w-6 text-primary" />,
      status: "pending" as const,
      onConnect: () => window.location.hash = "#webhook-setup",
    },
    {
      title: "Zapier",
      description: "Connect your CRM to thousands of apps without code",
      icon: <Zap className="h-6 w-6 text-primary" />,
      status: "disconnected" as const,
      onConnect: () => toast.info("Zapier integration coming soon"),
    },
    {
      title: "HubSpot",
      description: "Sync contacts, companies, and deals with HubSpot",
      icon: <Link2 className="h-6 w-6 text-primary" />,
      status: "disconnected" as const,
      onConnect: () => toast.info("HubSpot integration coming soon"),
    },
    {
      title: "Slack",
      description: "Get notifications and updates in your Slack workspace",
      icon: <Link2 className="h-6 w-6 text-primary" />,
      status: "disconnected" as const,
      onConnect: () => toast.info("Slack integration coming soon"),
    },
    {
      title: "Gmail",
      description: "Sync emails and track conversations with customers",
      icon: <Link2 className="h-6 w-6 text-primary" />,
      status: "disconnected" as const,
      onConnect: () => toast.info("Gmail integration coming soon"),
    },
    {
      title: "Google Calendar",
      description: "Schedule and manage meetings with prospects and clients",
      icon: <Link2 className="h-6 w-6 text-primary" />,
      status: "disconnected" as const,
      onConnect: () => toast.info("Google Calendar integration coming soon"),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Integrations" 
        description="Connect your CRM with external tools and services."
      />

      <Tabs defaultValue="available" className="space-y-6">
        <TabsList>
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="connected">Connected</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
        </TabsList>
        
        <TabsContent value="available" className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {availableIntegrations.map((integration) => (
              <IntegrationCard
                key={integration.title}
                {...integration}
              />
            ))}
          </div>
          
          <div id="webhook-setup" className="mt-8 rounded-lg border bg-card p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">n8n Webhook Configuration</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Configure your n8n webhook to track status of campaigns running on third-party platforms.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">n8n Webhook URL</Label>
                  <Input
                    id="webhook-url"
                    placeholder="https://your-n8n-instance.com/webhook/..."
                    value={n8nWebhookUrl}
                    onChange={(e) => setN8nWebhookUrl(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    You can find this URL in your n8n workflow, in the webhook node.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="event-type">Event Type</Label>
                  <Select
                    value={eventType}
                    onValueChange={setEventType}
                  >
                    <SelectTrigger id="event-type">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Lead Events</SelectLabel>
                        <SelectItem value="lead.created">Lead Created</SelectItem>
                        <SelectItem value="lead.updated">Lead Updated</SelectItem>
                        <SelectItem value="lead.converted">Lead Converted</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Deal Events</SelectLabel>
                        <SelectItem value="deal.created">Deal Created</SelectItem>
                        <SelectItem value="deal.stage_changed">Deal Stage Changed</SelectItem>
                        <SelectItem value="deal.closed_won">Deal Closed Won</SelectItem>
                        <SelectItem value="deal.closed_lost">Deal Closed Lost</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Contact Events</SelectLabel>
                        <SelectItem value="contact.created">Contact Created</SelectItem>
                        <SelectItem value="contact.email_added">Contact Email Added</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="auto-enrichment"
                    checked={autoEnrichment}
                    onCheckedChange={setAutoEnrichment}
                  />
                  <Label htmlFor="auto-enrichment">
                    Enable auto data enrichment on new leads
                  </Label>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="trigger-endpoint">Your CRM Webhook Endpoint</Label>
                  <div className="flex gap-2">
                    <Input
                      id="trigger-endpoint"
                      value={n8nTriggerEndpoint}
                      readOnly
                      onClick={(e) => (e.target as HTMLInputElement).select()}
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        navigator.clipboard.writeText(n8nTriggerEndpoint);
                        toast.success("Endpoint URL copied to clipboard");
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Use this URL as the target for your n8n HTTP Request node to send data back to the CRM.
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleConnectN8n}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Configuring..." : "Configure Webhook"}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleTestWebhook}
                    disabled={!n8nWebhookUrl || isSubmitting}
                  >
                    Test Webhook
                  </Button>
                  <Button variant="outline" className="gap-2" asChild>
                    <a href="https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/" target="_blank" rel="noreferrer">
                      <Book className="h-4 w-4" />
                      Documentation
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>
              
              <div className="rounded-md bg-muted p-4">
                <h4 className="font-medium">How it works</h4>
                <ol className="mt-2 space-y-2 text-sm text-muted-foreground">
                  <li>1. Create a workflow in n8n that starts with a webhook node</li>
                  <li>2. Copy the webhook URL from n8n and paste it here</li>
                  <li>3. Add nodes in n8n to connect to your third-party platforms</li>
                  <li>4. Configure the workflow to update your CRM when campaign status changes</li>
                  <li>5. Use the CRM Webhook Endpoint in your n8n workflow to send data back to the CRM</li>
                  <li>6. Activate your n8n workflow and test the integration</li>
                </ol>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="connected">
          <div className="flex h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Link2 className="h-10 w-10 text-primary" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">No connected integrations</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              You haven't connected any integrations yet. Connect your first integration to get started.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="marketplace">
          <div className="flex h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Link2 className="h-10 w-10 text-primary" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">Integration marketplace coming soon</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              We're working on adding more integrations to our marketplace. Check back soon!
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Integrations;
