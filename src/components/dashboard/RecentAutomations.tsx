import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Play, Pause, Edit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Automation {
  id: string;
  name: string;
  status: "active" | "paused" | "draft";
  lastRun: string;
  runs: number;
  template?: string;
}

const mockAutomations: Automation[] = [
  {
    id: "1",
    name: "Lead Scoring & Nurturing",
    status: "active",
    lastRun: "2 hours ago",
    runs: 145,
    template: "Marketing"
  },
  {
    id: "2", 
    name: "Weekly Report Generator",
    status: "active",
    lastRun: "1 day ago", 
    runs: 28,
    template: "Reporting"
  },
  {
    id: "3",
    name: "Social Media Scheduler", 
    status: "paused",
    lastRun: "3 days ago",
    runs: 67,
    template: "Social"
  },
  {
    id: "4",
    name: "Customer Onboarding Flow",
    status: "draft", 
    lastRun: "Never",
    runs: 0,
    template: "Customer Success"
  },
];

export function RecentAutomations() {
  const getStatusColor = (status: Automation["status"]) => {
    switch (status) {
      case "active":
        return "bg-success text-success-foreground";
      case "paused":
        return "bg-warning text-warning-foreground";
      case "draft":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: Automation["status"]) => {
    switch (status) {
      case "active":
        return <Play className="h-3 w-3" />;
      case "paused":
        return <Pause className="h-3 w-3" />;
      case "draft":
        return <Edit className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Recent Automations
          <Button variant="outline" size="sm">
            View All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockAutomations.map((automation) => (
          <div
            key={automation.id}
            className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-sm">{automation.name}</h4>
                <Badge variant="secondary" className={`${getStatusColor(automation.status)} text-xs`}>
                  <span className="flex items-center gap-1">
                    {getStatusIcon(automation.status)}
                    {automation.status}
                  </span>
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>Last run: {automation.lastRun}</span>
                <span>•</span>
                <span>{automation.runs} runs</span>
                {automation.template && (
                  <>
                    <span>•</span>
                    <span>{automation.template}</span>
                  </>
                )}
              </div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover border-border">
                <DropdownMenuItem>Edit Automation</DropdownMenuItem>
                <DropdownMenuItem>View Runs</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}