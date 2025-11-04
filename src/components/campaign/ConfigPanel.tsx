import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AlertCircle, ChevronDown, Eye, Image, MoreVertical, Plus, Search, Sparkles, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CampaignStep } from "@/types/campaign";

interface ConfigPanelProps {
  step: CampaignStep | null;
  onConfigChange: (config: any) => void;
  activeVersion?: 'A' | 'B';
}

export const ConfigPanel = ({ step, onConfigChange, activeVersion = 'A' }: ConfigPanelProps) => {
  const [personalizationOpen, setPersonalizationOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("liquid");

  if (!step || step.type === 'start') {
    return (
      <div className="w-96 border-l border-border bg-card p-6 flex items-center justify-center text-muted-foreground text-sm">
        Select a step to configure
      </div>
    );
  }

  const liquidSyntaxOptions = [
    { label: "Hello | Hi | Hey", icon: "👋" },
    { label: "Mister / Miss", icon: "👤" },
    { label: "If text contains...", icon: "🔍" },
    { label: "Format the date to month/day/year", icon: "📅" },
    { label: "Format the date to day/month/year", icon: "📅" },
    { label: "Translate the day", icon: "🌍" },
  ];

  const customVariablesSimple = [
    { label: "First Lastname", icon: "👤" },
    { label: "Default value", icon: "💡" },
    { label: "Today", icon: "📅" },
    { label: "Good morning/afternoon", icon: "👋" },
    { label: "In ... days", icon: "⏰" },
  ];

  const customVariablesFull = [
    { label: "First name", value: "{{firstName}}", icon: "👤" },
    { label: "Last name", value: "{{lastName}}", icon: "👤" },
    { label: "Company name", value: "{{companyName}}", icon: "🏢" },
    { label: "Icebreaker", value: "{{icebreaker}}", icon: "🎯" },
    { label: "School", value: "{{school}}", icon: "🎓" },
  ];

  return (
    <div className="w-96 border-l border-border bg-card overflow-y-auto">
      <div className="p-6 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="text-primary">
              {step.type === 'linkedin-invitation' && (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div className="font-medium">{step.title}</div>
                {step.type === 'ab-test' && (
                  <Badge 
                    variant={activeVersion === 'B' ? 'default' : 'outline'} 
                    className={cn(
                      "text-[11px] px-2 py-0.5 font-semibold",
                      activeVersion === 'B' && "bg-primary text-primary-foreground"
                    )}
                  >
                    Version {activeVersion}
                  </Badge>
                )}
              </div>
              <div className="text-xs text-muted-foreground">{step.subtitle}</div>
            </div>
          </div>

          {step.error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive rounded-lg flex items-center gap-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              <span className="text-destructive underline cursor-pointer">Show errors</span>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {step.type === 'send-to-campaign' ? (
            <>
              <div>
                <Label className="text-sm mb-2 block">Campaign to send to</Label>
                <Select 
                  value={step.config?.targetCampaign || ""} 
                  onValueChange={(value) => onConfigChange({ ...step.config, targetCampaign: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a campaign" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ai-lookalike">
                      <div className="flex items-center gap-2">
                        <span>👤</span>
                        <span>AI - Lookalike - Saleshacking...</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="outbound-campaign">
                      <div className="flex items-center gap-2">
                        <span>📤</span>
                        <span>Outbound Campaign</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="follow-up">
                      <div className="flex items-center gap-2">
                        <span>🔄</span>
                        <span>Follow-up Campaign</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          ) : step.type === 'api-call' ? (
            <>
              <div>
                <Label className="text-sm mb-2 block">API Endpoint</Label>
                <Input 
                  placeholder="https://api.example.com/endpoint"
                  value={step.config?.endpoint || ""}
                  onChange={(e) => onConfigChange({ ...step.config, endpoint: e.target.value })}
                />
              </div>
              <div>
                <Label className="text-sm mb-2 block">Method</Label>
                <Select 
                  value={step.config?.method || "GET"} 
                  onValueChange={(value) => onConfigChange({ ...step.config, method: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="DELETE">DELETE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          ) : step.type === 'condition' ? (
            <>
              <div>
                <Label className="text-sm mb-2 block">Condition type</Label>
                <Select 
                  value={step.config?.conditionType || ""} 
                  onValueChange={(value) => onConfigChange({ ...step.config, conditionType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="accepted-invite">Accepted invite</SelectItem>
                    <SelectItem value="custom">Custom condition</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          ) : (
            <>
              <div>
                <Label className="text-sm mb-2 block">Message</Label>
                <div className="relative">
                  <Textarea
                    placeholder="What message do you want to send?"
                    className="min-h-[200px] resize-none"
                    value={step.config?.message || ""}
                    onChange={(e) => onConfigChange({ ...step.config, message: e.target.value })}
                  />
                  <div className="text-right text-xs text-muted-foreground mt-1">
                    {step.config?.message?.length || 0}/8000
                  </div>
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <Popover open={personalizationOpen} onOpenChange={setPersonalizationOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1">
                      Add personalization
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[360px] p-0" align="start" side="top">
                    <div className="p-3 border-b">
                      <div className="text-sm font-medium mb-2">LinkedIn account used to send message</div>
                      <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="liquid" className="text-xs">Liquid syntax</TabsTrigger>
                          <TabsTrigger value="custom" className="text-xs">Custom variables</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="liquid" className="mt-3 space-y-2">
                          <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search" className="pl-8 h-9" />
                          </div>
                          <div className="max-h-[300px] overflow-y-auto space-y-1">
                            {liquidSyntaxOptions.map((option, idx) => (
                              <button
                                key={idx}
                                className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-muted/50 rounded-md transition-colors"
                                onClick={() => {
                                  // TODO: Insert personalization
                                  console.log('Insert:', option.label);
                                }}
                              >
                                <span>{option.label}</span>
                                <Info className="h-4 w-4 text-muted-foreground" />
                              </button>
                            ))}
                          </div>
                        </TabsContent>

                        <TabsContent value="custom" className="mt-3 space-y-2">
                          <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search" className="pl-8 h-9" />
                          </div>
                          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-primary hover:bg-muted/50 rounded-md transition-colors">
                            <Plus className="h-4 w-4" />
                            Create a new one
                          </button>
                          <div className="max-h-[300px] overflow-y-auto space-y-1">
                            {customVariablesFull.map((option, idx) => (
                              <button
                                key={idx}
                                className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-muted/50 rounded-md transition-colors group"
                                onClick={() => {
                                  // TODO: Insert variable
                                  console.log('Insert:', option.value);
                                }}
                              >
                                <div className="flex items-center gap-2">
                                  <span>{option.icon}</span>
                                  <span>{option.label}</span>
                                </div>
                                <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                  {option.value}
                                </span>
                              </button>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </PopoverContent>
                </Popover>

                <Button variant="outline" size="sm" className="gap-1">
                  <Sparkles className="h-3.5 w-3.5" />
                  Ask AI
                </Button>
                <Button variant="outline" size="sm" className="px-2">
                  <Image className="h-3.5 w-3.5" />
                </Button>
                <Button variant="outline" size="sm" className="px-2">
                  <MoreVertical className="h-3.5 w-3.5" />
                </Button>
              </div>

              <Button variant="outline" size="sm" className="w-full gap-2">
                <Eye className="h-4 w-4" />
                Preview
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
