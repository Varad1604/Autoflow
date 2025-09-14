import { AppLayout } from "@/components/layout/AppLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentAutomations } from "@/components/dashboard/RecentAutomations";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Zap, 
  Clock, 
  Users, 
  TrendingUp, 
  Plus,
  ArrowRight,
  CheckCircle2,
  Target
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
// import { generateAutomationWithGemini } from "../lib/gemini";

const Index = () => {
  // ...existing code...

  return (
    <AppLayout>
      <div className="p-6 space-y-8">
        {/* Welcome Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-hero p-8 text-white">
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-3xl font-bold mb-3">
              Welcome to AutoFlow
            </h1>
            <p className="text-lg text-white/90 mb-6">
              Transform your complex workflows into simple, automated processes. 
              Describe what you need in plain English, and we'll guide you through creating powerful automations.
            </p>
            <div className="flex items-center gap-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <NavLink to="/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Automation
                </NavLink>
              </Button>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Active Automations"
            value={12}
            description="Running workflows"
            icon={Zap}
            trend={{ value: 20, isPositive: true }}
          />
          <StatsCard
            title="Total Runs"
            value="1,247"
            description="This month"
            icon={TrendingUp}
            trend={{ value: 15, isPositive: true }}
          />
          <StatsCard
            title="Time Saved"
            value="124h"
            description="Estimated monthly"
            icon={Clock}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Team Members"
            value={8}
            description="Active collaborators"
            icon={Users}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <QuickActions />
          </div>

          {/* Recent Automations */}
          <div className="lg:col-span-2">
            <RecentAutomations />
          </div>
        </div>

        {/* Getting Started Guide */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Getting Started
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                1
              </div>
              <div>
                <h4 className="font-medium mb-1">Describe Your Workflow</h4>
                <p className="text-sm text-muted-foreground">
                  Tell us what you want to automate in plain English. No technical jargon needed.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                2
              </div>
              <div>
                <h4 className="font-medium mb-1">Guided Configuration</h4>
                <p className="text-sm text-muted-foreground">
                  Answer simple questions about your apps and processes. We'll handle the technical setup.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-8 w-8 bg-success rounded-full flex items-center justify-center text-white">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Deploy & Monitor</h4>
                <p className="text-sm text-muted-foreground">
                  Preview your automation, test it, and deploy. Monitor performance from your dashboard.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Index;
