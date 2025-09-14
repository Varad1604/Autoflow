// ...existing code...
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ArrowLeft, 
  ArrowRight, 
  Lightbulb, 
  Zap,
  MessageSquare,
  ChevronRight,
  Sparkles,
  Settings2,
  Eye,
  CheckCircle2,
  Download,
  Play,
  Globe,
  Mail,
  Database,
  Calendar,
  Slack,
  Users
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

interface App {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }> | null;
  category: string;
  description: string;
}

const availableApps: App[] = [
  { id: "gmail", name: "Gmail", icon: Mail, category: "Email", description: "Send and receive emails" },
  { id: "slack", name: "Slack", icon: Slack, category: "Communication", description: "Team messaging and notifications" },
  { id: "google-sheets", name: "Google Sheets", icon: Database, category: "Spreadsheets", description: "Manage and analyze data" },
  { id: "calendar", name: "Google Calendar", icon: Calendar, category: "Scheduling", description: "Schedule events and meetings" },
  { id: "webhook", name: "Webhooks", icon: Globe, category: "Integration", description: "HTTP requests and API calls" },
  { id: "hubspot", name: "HubSpot", icon: Users, category: "CRM", description: "Customer relationship management" },
];

const CreateAutomation = () => {
  const [rankedTriggers, setRankedTriggers] = useState<App[] | null>(null);
  const [rankedActions, setRankedActions] = useState<App[] | null>(null);
  const [loadingRanking, setLoadingRanking] = useState(false);
  const [rankingError, setRankingError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [description, setDescription] = useState("");
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [llmApps, setLlmApps] = useState<App[] | null>(null);
  const [loadingLlm, setLoadingLlm] = useState(false);
  const [llmError, setLlmError] = useState<string | null>(null);
  const [automationName, setAutomationName] = useState("");
  const [triggerApp, setTriggerApp] = useState("");
  const [actionApps, setActionApps] = useState<string[]>([]);
  
  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const examplePrompts = [
    "When a new lead fills out our contact form, send them a welcome email and add them to our CRM",
    "Every Monday, generate a weekly sales report and send it to the team",
    "When someone mentions our brand on social media, notify our marketing team",
    "Automatically follow up with customers 3 days after their purchase"
  ];

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return description.trim().length > 10;
      case 2:
        return selectedApps.length >= 2;
      case 3:
        return automationName.trim() && triggerApp && actionApps.length > 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleAppToggle = (appId: string) => {
    setSelectedApps(prev => 
      prev.includes(appId) 
        ? prev.filter(id => id !== appId)
        : [...prev, appId]
    );
  };

  const [blueprintJson, setBlueprintJson] = useState<string>("");
  const [loadingBlueprint, setLoadingBlueprint] = useState(false);
  const [blueprintError, setBlueprintError] = useState<string | null>(null);

  const handleNext = async () => {
    if (canProceed() && currentStep < totalSteps) {
      if (currentStep === 1) {
        setLoadingLlm(true);
        setLlmError(null);
        try {
          const { generateRecommendedApps } = await import("../lib/gemini");
          const result = await generateRecommendedApps(description);
          setLlmApps(result);
          setSelectedApps(result.map((app: App) => app.id));
        } catch (e) {
          setLlmError((e as Error)?.message || "Failed to get app recommendations from Gemini.");
        } finally {
          setLoadingLlm(false);
        }
      }
      if (currentStep === 2) {
        // Manually set triggers and actions from selected apps
        const selectedAppObjects = (llmApps || availableApps).filter(app => selectedApps.includes(app.id));
        setRankedTriggers(selectedAppObjects);
        setRankedActions(selectedAppObjects.filter(app => app.id !== triggerApp));
      }
      if (currentStep === 3) {
        setLoadingBlueprint(true);
        setBlueprintError(null);
        try {
          const { generateAutomationJson } = await import("../lib/gemini");
          // Compose a prompt for Gemini
          const selectedTrigger = (llmApps || availableApps).find(app => app.id === triggerApp);
          const selectedActions = (llmApps || availableApps).filter(app => actionApps.includes(app.id));
          const prompt = `Automation Name: ${automationName}\nDescription: ${description}\nTrigger: ${selectedTrigger?.name}\nActions: ${selectedActions.map(a => a.name).join(", ")}`;
          const result = await generateAutomationJson(prompt);
          setBlueprintJson(result);
        } catch (e) {
          setBlueprintError((e as Error)?.message || "Failed to generate make.com blueprint from Gemini.");
        } finally {
          setLoadingBlueprint(false);
        }
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Describe Your Automation
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Tell us what you want to automate. Be as detailed or as simple as you'd like - our AI will ask follow-up questions to get all the details.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label htmlFor="description" className="text-sm font-medium mb-2 block">
                  What do you want to automate?
                </label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Example: When someone fills out our contact form, I want to automatically send them a welcome email and add their information to our CRM system..."
                  className="min-h-32 resize-none"
                />
                <div className="text-xs text-muted-foreground mt-1">
                  {description.length}/500 characters
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Need inspiration?</span>
                </div>
                <div className="grid gap-3">
                  {examplePrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => setDescription(prompt)}
                      className="p-3 text-left border border-border rounded-lg hover:border-primary/50 hover:bg-secondary/50 transition-colors group"
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                          {prompt}
                        </span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors mt-0.5 flex-shrink-0 ml-2" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings2 className="h-5 w-5 text-primary" />
                Select Your Apps
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Choose the apps and services that will be part of this automation. You need at least 2 apps to create a workflow.
              </p>
            </CardHeader>
            <CardContent>
              {loadingLlm && <div className="text-primary mb-4">Loading app recommendations from AI...</div>}
              {llmError && <div className="text-destructive mb-4">{llmError}</div>}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(llmApps || availableApps).map((app) => (
                  <div
                    key={app.id}
                    onClick={() => handleAppToggle(app.id)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedApps.includes(app.id)
                        ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50 hover:bg-secondary/50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        selectedApps.includes(app.id) ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}>
                        {typeof app.icon === "function" ? <app.icon className="h-5 w-5" /> : null}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm truncate">{app.name}</h4>
                          <Checkbox 
                            checked={selectedApps.includes(app.id)}
                            onChange={() => {}}
                            className="ml-2 flex-shrink-0"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{app.description}</p>
                        <Badge variant="outline" className="text-xs mt-2">
                          {app.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add custom app section */}
              <div className="mt-8 border-t pt-6">
                <h4 className="font-medium mb-2">Add a Custom App</h4>
                <div className="flex flex-col sm:flex-row gap-3 mb-3">
                  <input type="text" placeholder="App Name" className="border rounded px-3 py-2 flex-1" id="custom-app-name" />
                  <input type="text" placeholder="Category" className="border rounded px-3 py-2 flex-1" id="custom-app-category" />
                  <input type="text" placeholder="Description" className="border rounded px-3 py-2 flex-2" id="custom-app-description" />
                  <Button
                    onClick={() => {
                      const name = (document.getElementById('custom-app-name') as HTMLInputElement)?.value.trim();
                      const category = (document.getElementById('custom-app-category') as HTMLInputElement)?.value.trim();
                      const description = (document.getElementById('custom-app-description') as HTMLInputElement)?.value.trim();
                      if (name && category && description) {
                        const id = name.toLowerCase().replace(/\s+/g, '-') + '-' + Math.random().toString(36).slice(2, 7);
                        const newApp: App = { id, name, category, description, icon: null };
                        setLlmApps(prev => prev ? [...prev, newApp] : [newApp]);
                        setSelectedApps(prev => [...prev, id]);
                        (document.getElementById('custom-app-name') as HTMLInputElement).value = '';
                        (document.getElementById('custom-app-category') as HTMLInputElement).value = '';
                        (document.getElementById('custom-app-description') as HTMLInputElement).value = '';
                      }
                    }}
                    className="bg-primary text-white"
                  >Add</Button>
                </div>
                <div className="text-xs text-muted-foreground">Add any app not listed above to integrate in your automation.</div>
              </div>

              {selectedApps.length > 0 && (
                <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Selected Apps ({selectedApps.length})</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedApps.map(appId => {
                      const app = (llmApps || availableApps).find(a => a.id === appId);
                      return app ? (
                        <Badge key={appId} variant="secondary" className="flex items-center gap-1">
                          {typeof app.icon === "function" ? <app.icon className="h-3 w-3" /> : null}
                          {app.name}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings2 className="h-5 w-5 text-primary" />
                Configure Your Automation
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Give your automation a name and specify which app will trigger the workflow.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label htmlFor="name" className="text-sm font-medium mb-2 block">
                  Automation Name
                </label>
                <Input
                  id="name"
                  value={automationName}
                  onChange={(e) => setAutomationName(e.target.value)}
                  placeholder="e.g., Lead Nurturing Sequence"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-3 block">
                  Trigger App (What starts this automation?)
                </label>
                {loadingRanking && <div className="text-primary mb-2">Loading ranked triggers from AI...</div>}
                {rankingError && <div className="text-destructive mb-2">{rankingError}</div>}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {((rankedTriggers && rankedTriggers.length > 0)
                    ? rankedTriggers
                    : (llmApps || availableApps).filter(app => selectedApps.includes(app.id))
                  ).length === 0 && (
                    <div className="text-destructive text-sm col-span-2">No ranked trigger apps found. Please try again or select manually.</div>
                  )}
                  {((rankedTriggers && rankedTriggers.length > 0)
                    ? rankedTriggers
                    : (llmApps || availableApps).filter(app => selectedApps.includes(app.id))
                  ).map((app, idx) => (
                    <div
                      key={app.id}
                      onClick={() => setTriggerApp(app.id)}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors flex flex-col gap-2 ${
                        triggerApp === app.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      } ${idx === 0 ? "ring-2 ring-primary" : ""}`}
                    >
                      <div className="flex items-center gap-3">
                        {typeof app.icon === "function" ? <app.icon className="h-5 w-5 text-primary" /> : null}
                        <div>
                          <div className="font-medium text-sm flex items-center gap-2">
                            {app.name}
                            {idx === 0 && (
                              <span className="px-2 py-0.5 bg-primary text-white text-xs rounded-full">Most Likely</span>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">{app.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-3 block">
                  Action Apps (What happens when triggered?)
                </label>
                {loadingRanking && <div className="text-primary mb-2">Loading ranked actions from AI...</div>}
                {rankingError && <div className="text-destructive mb-2">{rankingError}</div>}
                <div className="space-y-2">
                  {((rankedActions && rankedActions.length > 0)
                    ? rankedActions
                    : (llmApps || availableApps).filter(app => selectedApps.includes(app.id)).filter(app => app.id !== triggerApp)
                  ).length === 0 && (
                    <div className="text-destructive text-sm">No ranked action apps found. Please try again or select manually.</div>
                  )}
                  {((rankedActions && rankedActions.length > 0)
                    ? rankedActions
                    : (llmApps || availableApps).filter(app => selectedApps.includes(app.id)).filter(app => app.id !== triggerApp)
                  ).map((app, idx) => (
                    <div
                      key={app.id}
                      onClick={() => {
                        setActionApps(prev => 
                          prev.includes(app.id) 
                            ? prev.filter(id => id !== app.id)
                            : [...prev, app.id]
                        );
                      }}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors flex flex-col gap-2 ${
                        actionApps.includes(app.id)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      } ${idx === 0 ? "ring-2 ring-primary" : ""}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {typeof app.icon === "function" ? <app.icon className="h-5 w-5 text-primary" /> : null}
                          <div>
                            <div className="font-medium text-sm flex items-center gap-2">
                              {app.name}
                              {idx === 0 && (
                                <span className="px-2 py-0.5 bg-primary text-white text-xs rounded-full">Most Likely</span>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground">{app.description}</div>
                          </div>
                        </div>
                        <Checkbox checked={actionApps.includes(app.id)} onChange={() => {}} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                Review & Deploy
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Review your automation configuration and deploy when ready.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <h4 className="font-medium mb-2">Automation Summary</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium">Name: </span>
                      <span className="text-sm">{automationName || "Untitled Automation"}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Description: </span>
                      <span className="text-sm">{description.substring(0, 100)}...</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Trigger: </span>
                      <span className="text-sm">
                        {triggerApp ? availableApps.find(a => a.id === triggerApp)?.name : "Not selected"}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Actions: </span>
                      <span className="text-sm">
                        {actionApps.map(id => availableApps.find(a => a.id === id)?.name).join(", ")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">make.com Blueprint JSON</h4>
                  {loadingBlueprint && <div className="text-primary mb-2">Generating blueprint from AI...</div>}
                  {blueprintError && <div className="text-destructive mb-2">{blueprintError}</div>}
                  {blueprintJson && (
                    <pre className="bg-secondary rounded-lg p-4 text-xs overflow-x-auto whitespace-pre-wrap max-h-96 mb-2">{blueprintJson}</pre>
                  )}
                  <Button
                    variant="outline"
                    className="mt-2"
                    onClick={() => {
                      if (blueprintJson) {
                        navigator.clipboard.writeText(blueprintJson);
                      }
                    }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Copy JSON
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    className="flex-1 bg-gradient-primary hover:bg-primary-dark"
                    onClick={() => {
                      if (blueprintJson && automationName) {
                        // Download JSON
                        const blob = new Blob([blueprintJson], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `${automationName || 'automation'}.json`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                      }
                    }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download JSON
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-primary hover:bg-primary-dark"
                    onClick={() => {
                      if (automationName && blueprintJson) {
                        // Save automation to localStorage
                        const savedAutomations = JSON.parse(localStorage.getItem('automations') || '[]');
                        savedAutomations.push({
                          name: automationName,
                          description,
                          trigger: triggerApp,
                          actions: actionApps,
                          blueprint: blueprintJson,
                          created: new Date().toISOString()
                        });
                        localStorage.setItem('automations', JSON.stringify(savedAutomations));
                        alert('Automation saved!');
                        window.location.href = '/';
                      }
                    }}
                  >
                    Complete <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>

                <div className="flex items-center gap-2 p-3 bg-success/10 text-success rounded-lg">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-sm">Your automation is ready to deploy!</span>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
            <Button asChild variant="ghost" size="sm">
              <NavLink to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </NavLink>
            </Button>
            <div className="hidden sm:block h-4 border-l border-border" />
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 w-fit">
              <Sparkles className="h-3 w-3 mr-1" />
              AI-Powered Creation
            </Badge>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Create New Automation</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Describe your workflow in plain English, and we'll guide you through building the perfect automation.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Step {currentStep} of {totalSteps}</span>
            <span className="hidden sm:inline">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
          
          {/* Step indicators */}
          <div className="flex justify-between mt-3">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i + 1}
                className={`flex items-center gap-2 text-xs ${
                  currentStep > i + 1 ? "text-primary" : 
                  currentStep === i + 1 ? "text-primary font-medium" : "text-muted-foreground"
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${
                  currentStep > i + 1 ? "bg-primary" :
                  currentStep === i + 1 ? "bg-primary" : "bg-muted"
                }`} />
                <span className="hidden sm:inline">
                  {i === 0 ? "Describe" : i === 1 ? "Apps" : i === 2 ? "Configure" : "Review"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          {renderStepContent()}

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <Button 
              onClick={handleNext}
              disabled={!canProceed() || currentStep === totalSteps}
              className="bg-gradient-primary hover:bg-primary-dark w-full sm:w-auto"
            >
              {currentStep === totalSteps ? 'Complete' : 'Continue'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CreateAutomation;