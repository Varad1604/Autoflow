import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { 
  Plus, 
  FileText, 
  Users, 
  BarChart3, 
  Zap,
  ArrowRight
} from "lucide-react";

const quickActions = [
  {
    title: "Create New Automation",
    description: "Start building your workflow with our guided assistant",
    icon: Plus,
    href: "/create",
    primary: true
  },
  {
    title: "Browse Templates", 
    description: "Explore pre-built automations for common use cases",
    icon: FileText,
    href: "/templates",
    primary: false
  },
  {
    title: "Team Collaboration",
    description: "Invite team members and manage permissions",
    icon: Users,
    href: "/team", 
    primary: false
  },
  {
    title: "View Analytics",
    description: "Monitor automation performance and insights",
    icon: BarChart3,
    href: "/analytics",
    primary: false
  }
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-xl overflow-hidden divide-y divide-border bg-background">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              asChild
              variant={action.primary ? "default" : "ghost"}
              className={`h-auto px-4 py-4 justify-start w-full rounded-none shadow-none border-none text-wrap ${
                action.primary 
                  ? "bg-gradient-primary hover:bg-primary-dark text-white" 
                  : "hover:bg-secondary"
              }`}
              style={{ borderRadius: 0 }}
            >
              <NavLink to={action.href} className="flex items-center gap-3 w-full">
                <action.icon className={`h-5 w-5 flex-shrink-0 ${
                  action.primary ? "text-white" : "text-primary"
                }`} />
                <div className="flex-1 min-w-0 text-left">
                  <div className={`font-medium text-sm truncate ${
                    action.primary ? "text-white" : "text-foreground"
                  }`}>
                    {action.title}
                  </div>
                  <div className={`text-xs mt-0.5 truncate ${
                    action.primary ? "text-white/80" : "text-muted-foreground"
                  }`}>
                    {action.description}
                  </div>
                </div>
                <ArrowRight className={`h-4 w-4 flex-shrink-0 ${
                  action.primary ? "text-white" : "text-muted-foreground"
                }`} />
              </NavLink>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}