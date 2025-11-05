import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, Plus, Search, Info, Sparkles, Eye, Image, MoreVertical, User, Building2, GraduationCap, Flame, MessageCircle, Calendar, Globe, AlertCircle, X, InfoIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CampaignStep } from "@/types/campaign";
interface ConfigPanelProps {
  step: CampaignStep | null;
  onConfigChange: (config: any) => void;
  activeVersion?: 'A' | 'B';
}
export const ConfigPanel = ({
  step,
  onConfigChange,
  activeVersion = 'A'
}: ConfigPanelProps) => {
  const [personalizationOpen, setPersonalizationOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("liquid");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<Array<{
    id: string;
    url: string;
    file: File;
  }>>(step?.config?.images || []);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newImages = Array.from(files).map(file => ({
      id: Math.random().toString(36).substring(7),
      url: URL.createObjectURL(file),
      file
    }));
    const updatedImages = [...uploadedImages, ...newImages];
    setUploadedImages(updatedImages);
    onConfigChange({
      ...step?.config,
      images: updatedImages
    });
  };
  const removeImage = (id: string) => {
    const updatedImages = uploadedImages.filter(img => img.id !== id);
    setUploadedImages(updatedImages);
    onConfigChange({
      ...step?.config,
      images: updatedImages
    });
  };
  if (!step || step.type === 'start') {
    return <div className="w-[480px] border-l border-border bg-card p-6 flex items-center justify-center text-muted-foreground text-sm">
        Select a step to configure
      </div>;
  }
  const liquidSyntaxOptions = [{
    label: "Hello | Hi | Hey",
    syntax: "{{ 'Hello' | 'Hi' | 'Hey' }}",
    icon: <MessageCircle className="h-4 w-4" />
  }, {
    label: "Mister / Miss",
    syntax: "{{ contact.title }}",
    icon: <User className="h-4 w-4" />
  }, {
    label: "If text contains...",
    syntax: "{% if text contains 'keyword' %}...{% endif %}",
    icon: <Search className="h-4 w-4" />
  }, {
    label: "Format the date to month/day/year",
    syntax: "{{ date | date: '%m/%d/%Y' }}",
    icon: <Calendar className="h-4 w-4" />
  }, {
    label: "Format the date to day/month/year",
    syntax: "{{ date | date: '%d/%m/%Y' }}",
    icon: <Calendar className="h-4 w-4" />
  }, {
    label: "Translate the day",
    syntax: "{{ date | date: '%A' }}",
    icon: <Globe className="h-4 w-4" />
  }];
  const customVariablesFull = [{
    icon: <User className="h-4 w-4" />,
    label: 'First name',
    value: '{{firstName}}'
  }, {
    icon: <User className="h-4 w-4" />,
    label: 'Last name',
    value: '{{lastName}}'
  }, {
    icon: <Building2 className="h-4 w-4" />,
    label: 'Company name',
    value: '{{companyName}}'
  }, {
    icon: <Flame className="h-4 w-4" />,
    label: 'Icebreaker',
    value: '{{icebreaker}}'
  }, {
    icon: <GraduationCap className="h-4 w-4" />,
    label: 'School',
    value: '{{school}}'
  }];
  return <div className="w-[480px] border-l border-border bg-card overflow-y-auto">
      <div className="p-6 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="text-primary">
              {step.type === 'linkedin-invitation' && <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div className="font-medium">{step.title}</div>
                {step.type === 'ab-test' && <Badge variant={activeVersion === 'B' ? 'default' : 'outline'} className={cn("text-[11px] px-2 py-0.5 font-semibold", activeVersion === 'B' && "bg-primary text-primary-foreground")}>
                    Version {activeVersion}
                  </Badge>}
              </div>
              <div className="text-xs text-muted-foreground">{step.subtitle}</div>
            </div>
          </div>

          {step.error && <div className="mb-4 p-3 bg-destructive/10 border border-destructive rounded-lg flex items-center gap-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              <span className="text-destructive underline cursor-pointer">Show errors</span>
            </div>}
        </div>

        <div className="space-y-4">
          {step.type === 'send-to-campaign' ? <>
              <div>
                <Label className="text-sm mb-2 block">Campaign to send to</Label>
                <Select value={step.config?.targetCampaign || ""} onValueChange={value => onConfigChange({
              ...step.config,
              targetCampaign: value
            })}>
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
            </> : step.type === 'api-call' ? <>
              <div>
                <Label className="text-sm mb-2 block">API Endpoint</Label>
                <Input placeholder="https://api.example.com/endpoint" value={step.config?.endpoint || ""} onChange={e => onConfigChange({
              ...step.config,
              endpoint: e.target.value
            })} />
              </div>
              <div>
                <Label className="text-sm mb-2 block">Method</Label>
                <Select value={step.config?.method || "GET"} onValueChange={value => onConfigChange({
              ...step.config,
              method: value
            })}>
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
            </> : step.type === 'condition' ? <>
              <div>
                <Label className="text-sm mb-2 block">Condition type</Label>
                <Select value={step.config?.conditionType || ""} onValueChange={value => onConfigChange({
              ...step.config,
              conditionType: value
            })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="accepted-invite">Accepted invite</SelectItem>
                    <SelectItem value="custom">Custom condition</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </> : step.type === 'ai-generate' ? <>
              <Alert className="bg-blue-50 border-blue-200">
                <InfoIcon className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-sm text-blue-900">If the lead variable is already filled the step will be skipped.</AlertDescription>
              </Alert>

              <div>
                <Label className="text-sm mb-2 block">Select AI variable</Label>
                <Select value={step.config?.aiVariable || ""} onValueChange={value => onConfigChange({
              ...step.config,
              aiVariable: value
            })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a variable" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="isASaaSCompany">isASaaSCompany</SelectItem>
                    <SelectItem value="companySize">companySize</SelectItem>
                    <SelectItem value="industry">industry</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm">Use template</Label>
                </div>
                {step.config?.template && <Badge variant="secondary" className="gap-1">
                    {step.config.template}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => onConfigChange({
                ...step.config,
                template: null
              })} />
                  </Badge>}
              </div>

              <div>
                <div className="flex items-center gap-1 mb-2">
                  <Label className="text-sm">Prompt</Label>
                  
                </div>
                <Textarea id="ai-prompt-textarea" placeholder="Enter your AI prompt..." className="min-h-[300px] resize-none font-mono text-xs" value={step.config?.prompt || "You are an expert in identifying Software as a Service (SaaS) companies.\nYour task is to determine if the following company is a SaaS (Software as a Service) business based on its description.\nReturn \"True\" if it is a SaaS company, \"False\" otherwise.\nInvalid inputs that should return an empty string include:\n- Empty text\n- Single characters or punctuation marks\n- Random letters or gibberish\n- Whitespace\n- Any text that doesn't describe a company\nAlways return only \"True\" or \"False\" without any explanation or additional text.\nDo not return anything if it couldn't be determined. Never return explanatory text.\nCompany description: {{companyDescription}}"} onChange={e => onConfigChange({
              ...step.config,
              prompt: e.target.value
            })} />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1" onClick={() => setPersonalizationOpen(true)}>
                  Add personalization
                  <ChevronDown className="h-3 w-3" />
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Sparkles className="h-3.5 w-3.5" />
                  Ask AI
                </Button>
              </div>

              <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-full justify-between px-0">
                    <span className="font-semibold">Advanced settings</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">openai</Badge>
                      <ChevronDown className={cn("h-4 w-4 transition-transform", advancedOpen && "rotate-180")} />
                    </div>
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm mb-2 block">Consumption mode</Label>
                      <Select value={step.config?.consumptionMode || "lemlist"}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lemlist">linqed credits</SelectItem>
                          <SelectItem value="own">Own API key</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm mb-2 block">Cost</Label>
                      <Badge variant="outline" className="w-full justify-center">
                        1 / request
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm">Temperature</Label>
                      <span className="text-sm text-muted-foreground">
                        {step.config?.temperature || 0.2}
                      </span>
                    </div>
                    <Slider value={[step.config?.temperature || 0.2]} onValueChange={([value]) => onConfigChange({
                  ...step.config,
                  temperature: value
                })} min={0.2} max={2} step={0.1} className="w-full" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm mb-2 block">AI to use</Label>
                      <Select value={step.config?.aiProvider || "openai"}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="openai">OpenAI (GPT)</SelectItem>
                          <SelectItem value="anthropic">Anthropic (Claude)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm mb-2 block">AI model</Label>
                      <Select value={step.config?.aiModel || "gpt-4o"}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gpt-4o">GPT 4o</SelectItem>
                          <SelectItem value="gpt-4">GPT 4</SelectItem>
                          <SelectItem value="gpt-3.5">GPT 3.5</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </> : <>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm">Message</Label>
                  <Button variant="ghost" size="sm" className="h-auto p-0 gap-1.5 text-primary hover:text-primary hover:bg-transparent font-normal">
                    <Sparkles className="h-4 w-4" />
                    AI
                  </Button>
                </div>
                <div className="relative">
                  <Textarea id="message-textarea" placeholder="What message do you want to send?" className="min-h-[200px] resize-none pr-10" value={step.config?.message || ""} onChange={e => onConfigChange({
                ...step.config,
                message: e.target.value
              })} />
                  <div className="absolute bottom-3 left-3 flex gap-2">
                    <input type="file" id="image-upload" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
                    <label htmlFor="image-upload">
                      <Button type="button" variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted" asChild>
                        <span className="cursor-pointer">
                          <Image className="h-4 w-4 text-muted-foreground" />
                        </span>
                      </Button>
                    </label>
                  </div>
                  <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                    {step.config?.message?.length || 0}/8000
                  </div>
                </div>

                {uploadedImages.length > 0 && <div className="mt-3 flex flex-wrap gap-2">
                    {uploadedImages.map(image => <div key={image.id} className="relative group">
                        <img src={image.url} alt="Uploaded" className="h-16 w-16 object-cover rounded-md border border-border" />
                        <button onClick={() => removeImage(image.id)} className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <X className="h-3 w-3" />
                        </button>
                      </div>)}
                  </div>}
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
                            {liquidSyntaxOptions.map((option, idx) => <button key={idx} className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-muted/50 rounded-md transition-colors" onClick={() => {
                          const textarea = document.getElementById('message-textarea') as HTMLTextAreaElement;
                          if (textarea) {
                            const start = textarea.selectionStart;
                            const end = textarea.selectionEnd;
                            const currentMessage = step.config?.message || "";
                            const newMessage = currentMessage.substring(0, start) + option.syntax + currentMessage.substring(end);
                            onConfigChange({
                              ...step.config,
                              message: newMessage
                            });
                            setTimeout(() => {
                              textarea.focus();
                              textarea.setSelectionRange(start + option.syntax.length, start + option.syntax.length);
                            }, 0);
                          }
                          setPersonalizationOpen(false);
                        }}>
                                <div className="flex items-center gap-2">
                                  {option.icon}
                                  <span>{option.label}</span>
                                </div>
                                <Info className="h-4 w-4 text-muted-foreground" />
                              </button>)}
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
                            {customVariablesFull.map((option, idx) => <button key={idx} className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-muted/50 rounded-md transition-colors group" onClick={() => {
                          const textarea = document.getElementById('message-textarea') as HTMLTextAreaElement;
                          if (textarea) {
                            const start = textarea.selectionStart;
                            const end = textarea.selectionEnd;
                            const currentMessage = step.config?.message || "";
                            const newMessage = currentMessage.substring(0, start) + option.value + currentMessage.substring(end);
                            onConfigChange({
                              ...step.config,
                              message: newMessage
                            });
                            setTimeout(() => {
                              textarea.focus();
                              textarea.setSelectionRange(start + option.value.length, start + option.value.length);
                            }, 0);
                          }
                          setPersonalizationOpen(false);
                        }}>
                                <div className="flex items-center gap-2">
                                  {option.icon}
                                  <span>{option.label}</span>
                                </div>
                                <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                  {option.value}
                                </span>
                              </button>)}
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
                {step.type !== 'linkedin-invitation'}
                <Button variant="outline" size="sm" className="px-2">
                  <MoreVertical className="h-3.5 w-3.5" />
                </Button>
              </div>

              
            </>}
        </div>
      </div>
    </div>;
};