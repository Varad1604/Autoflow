import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter,
  Star,
  Download,
  Eye,
  Clock,
  Users,
  Zap
} from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  usageCount: number;
  rating: number;
  tags: string[];
}

const mockTemplates: Template[] = [
  {
    id: "1",
    name: "Lead Nurturing Sequence",
    description: "Automatically nurture new leads with a series of personalized emails based on their interests and behavior.",
    category: "Marketing",
    difficulty: "Beginner",
    estimatedTime: "10 min",
    usageCount: 2847,
    rating: 4.8,
    tags: ["Email", "CRM", "Lead Generation"]
  },
  {
    id: "2", 
    name: "Weekly Sales Report Generator",
    description: "Compile sales data from multiple sources and automatically generate and distribute weekly performance reports.",
    category: "Reporting",
    difficulty: "Intermediate", 
    estimatedTime: "15 min",
    usageCount: 1532,
    rating: 4.6,
    tags: ["Sales", "Reports", "Analytics"]
  },
  {
    id: "3",
    name: "Social Media Brand Monitoring",
    description: "Monitor mentions of your brand across social platforms and automatically notify your team of important conversations.",
    category: "Social Media",
    difficulty: "Intermediate",
    estimatedTime: "20 min", 
    usageCount: 943,
    rating: 4.7,
    tags: ["Social Media", "Monitoring", "Notifications"]
  },
  {
    id: "4",
    name: "Customer Support Ticket Routing",
    description: "Automatically categorize and route support tickets to the right team members based on urgency and topic.",
    category: "Customer Support",
    difficulty: "Advanced",
    estimatedTime: "25 min",
    usageCount: 756,
    rating: 4.9,
    tags: ["Support", "Ticketing", "Automation"]
  },
  {
    id: "5",
    name: "Invoice Follow-up Automation",
    description: "Automatically send payment reminders and follow-ups for overdue invoices to improve cash flow.",
    category: "Finance", 
    difficulty: "Beginner",
    estimatedTime: "8 min",
    usageCount: 1284,
    rating: 4.5,
    tags: ["Finance", "Invoicing", "Payments"]
  },
  {
    id: "6",
    name: "Content Publishing Workflow",
    description: "Streamline your content creation process from drafting to publishing across multiple channels.",
    category: "Content",
    difficulty: "Intermediate",
    estimatedTime: "18 min",
    usageCount: 623,
    rating: 4.4,
    tags: ["Content", "Publishing", "Workflow"]
  }
];

const categories = ["All", "Marketing", "Reporting", "Social Media", "Customer Support", "Finance", "Content"];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

const Templates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  const filteredTemplates = mockTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All" || template.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: Template["difficulty"]) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-success/10 text-success border-success/20";
      case "Intermediate": 
        return "bg-warning/10 text-warning border-warning/20";
      case "Advanced":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <AppLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Automation Templates</h1>
          <p className="text-muted-foreground">
            Get started quickly with pre-built automation templates for common business workflows.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search templates, descriptions, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-3">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficulties.map((difficulty) => (
                      <SelectItem key={difficulty} value={difficulty}>
                        {difficulty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Info */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredTemplates.length} of {mockTemplates.length} templates
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="hover:shadow-lg transition-shadow duration-300 border-border">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{template.name}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {template.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="h-3 w-3 fill-current text-warning" />
                    {template.rating}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {template.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {template.estimatedTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {template.usageCount.toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getDifficultyColor(template.difficulty)}`}
                  >
                    {template.difficulty}
                  </Badge>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-3 w-3 mr-1" />
                      Preview
                    </Button>
                    <Button size="sm" className="bg-gradient-primary hover:bg-primary-dark">
                      <Zap className="h-3 w-3 mr-1" />
                      Use Template
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredTemplates.length === 0 && (
          <Card className="py-12">
            <CardContent className="text-center">
              <Filter className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No templates found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or browse all available templates.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setSelectedDifficulty("All");
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
};

export default Templates;