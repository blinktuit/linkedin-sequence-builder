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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronDown, Plus, Search, Info, Sparkles, Eye, Image, MoreVertical, User, Building2, GraduationCap, Flame, MessageCircle, Calendar, Globe, AlertCircle, X, InfoIcon, Minus, Edit2, Trash2 } from "lucide-react";
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
  const [templatesOpen, setTemplatesOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("custom");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<{id: string, name: string, content: string} | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [saveTemplateDialogOpen, setSaveTemplateDialogOpen] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState("");
  const [templates, setTemplates] = useState([
    {
      id: '1',
      name: 'Introduction Template',
      content: "Hi {{firstName}},\n\nI noticed you work at {{companyName}}. I'd love to connect and discuss potential collaboration opportunities.\n\nBest regards"
    },
    {
      id: '2',
      name: 'Follow-up Template',
      content: "Hey {{firstName}}! 👋\n\nThanks for connecting! I see we share an interest in {{industry}}. Would love to learn more about what you're working on at {{companyName}}."
    },
    {
      id: '3',
      name: 'Personalized Outreach',
      content: "Hi {{firstName}},\n\nI hope this message finds you well. I wanted to reach out regarding {{icebreaker}}.\n\nLooking forward to your thoughts!"
    }
  ]);

  const handleEditTemplate = (template: typeof templates[0]) => {
    setEditingTemplate({
      id: template.id,
      name: template.name,
      content: template.content
    });
    setEditDialogOpen(true);
    setTemplatesOpen(false);
  };

  const handleSaveEditedTemplate = () => {
    if (editingTemplate) {
      setTemplates(templates.map(t =>
        t.id === editingTemplate.id
          ? { ...t, name: editingTemplate.name, content: editingTemplate.content }
          : t
      ));
      setEditDialogOpen(false);
      setEditingTemplate(null);
    }
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
  };

  const handleSaveCurrentAsTemplate = () => {
    if (step.config?.message && newTemplateName.trim()) {
      const newTemplate = {
        id: Date.now().toString(),
        name: newTemplateName.trim(),
        content: step.config.message
      };
      setTemplates([...templates, newTemplate]);
      setSaveTemplateDialogOpen(false);
      setNewTemplateName("");
    }
  };

  const insertTagInTemplateEditor = (tag: string) => {
    if (editingTemplate) {
      const textarea = document.getElementById('template-editor-textarea') as HTMLTextAreaElement;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = editingTemplate.content;
        const before = text.substring(0, start);
        const after = text.substring(end);
        const newContent = before + tag + after;
        setEditingTemplate({
          ...editingTemplate,
          content: newContent
        });
        setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(start + tag.length, start + tag.length);
        }, 0);
      }
    }
  };
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
          {step.type === 'linkedin-profile-visit' ? <>
              <div className="space-y-3">
                <h3 className="text-sm font-semibold">What this does:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Visit the lead's profile, they will see you viewed their profile</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>We can check if the lead is a connection</span>
                  </li>
                </ul>
              </div>
            </> : step.type === 'linkedin-like-post' ? <>
              <div>
                <Label className="text-sm mb-2 block">Only like posts within the past:</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="1"
                    value={step.config?.postAgeLimit || 12}
                    onChange={e => onConfigChange({
                      ...step.config,
                      postAgeLimit: parseInt(e.target.value) || 12
                    })}
                    className="w-20"
                  />
                  <Select
                    value={step.config?.postAgeUnit || "months"}
                    onValueChange={value => onConfigChange({
                      ...step.config,
                      postAgeUnit: value
                    })}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="days">days</SelectItem>
                      <SelectItem value="weeks">weeks</SelectItem>
                      <SelectItem value="months">months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </> : step.type === 'send-to-campaign' ? <>
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
            </> : step.type === 'condition-accepted-invite' ? <>
              <div>
                <Label className="text-sm mb-3 block">Lead action</Label>
                <RadioGroup
                  value={step.config?.waitMode || "wait-until"}
                  onValueChange={value => onConfigChange({
                    ...step.config,
                    waitMode: value
                  })}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="wait-until" id="wait-until" />
                    <Label htmlFor="wait-until" className="font-normal cursor-pointer">
                      Wait until Accepted invite
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="within" id="within" />
                    <Label htmlFor="within" className="font-normal cursor-pointer">
                      If Accepted within
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {step.config?.waitMode === "within" && (
                <div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 flex-shrink-0"
                      onClick={() => onConfigChange({
                        ...step.config,
                        timeLimit: Math.max(0, (step.config?.timeLimit || 1) - 1)
                      })}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>

                    <Input
                      type="number"
                      min="0"
                      value={step.config?.timeLimit || 1}
                      onChange={e => onConfigChange({
                        ...step.config,
                        timeLimit: parseInt(e.target.value) || 0
                      })}
                      className="w-16 text-center"
                    />

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 flex-shrink-0"
                      onClick={() => onConfigChange({
                        ...step.config,
                        timeLimit: (step.config?.timeLimit || 1) + 1
                      })}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>

                    <Select
                      value={step.config?.timeUnit || "day"}
                      onValueChange={value => onConfigChange({
                        ...step.config,
                        timeUnit: value
                      })}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="day">day{(step.config?.timeLimit || 1) > 1 ? 's' : ''}</SelectItem>
                        <SelectItem value="week">week{(step.config?.timeLimit || 1) > 1 ? 's' : ''}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
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
                  </SelectContent>
                </Select>
              </div>
            </> : step.type === 'ai-generate' ? <>
              <Alert className="bg-[#36b39a]/10 border-[#36b39a]/30">
                <InfoIcon className="h-4 w-4 text-[#36b39a]" />
                <AlertDescription className="text-sm text-[#36b39a]">If the lead variable is already filled the step will be skipped.</AlertDescription>
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

              <div className="flex gap-2 items-center flex-wrap">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto px-0 hover:bg-transparent"
                  onClick={() => {
                    const textarea = document.getElementById('message-textarea') as HTMLTextAreaElement;
                    if (textarea) {
                      const start = textarea.selectionStart;
                      const end = textarea.selectionEnd;
                      const text = textarea.value;
                      const before = text.substring(0, start);
                      const after = text.substring(end);
                      const newValue = before + '{{firstName}}' + after;
                      onConfigChange({
                        ...step.config,
                        message: newValue
                      });
                      setTimeout(() => {
                        textarea.focus();
                        textarea.setSelectionRange(start + 13, start + 13);
                      }, 0);
                    }
                  }}
                >
                  + First name
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto px-0 hover:bg-transparent"
                  onClick={() => {
                    const textarea = document.getElementById('message-textarea') as HTMLTextAreaElement;
                    if (textarea) {
                      const start = textarea.selectionStart;
                      const end = textarea.selectionEnd;
                      const text = textarea.value;
                      const before = text.substring(0, start);
                      const after = text.substring(end);
                      const newValue = before + '{{companyName}}' + after;
                      onConfigChange({
                        ...step.config,
                        message: newValue
                      });
                      setTimeout(() => {
                        textarea.focus();
                        textarea.setSelectionRange(start + 15, start + 15);
                      }, 0);
                    }
                  }}
                >
                  + Company name
                </Button>
                <Popover open={personalizationOpen} onOpenChange={setPersonalizationOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1">
                      More...
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[360px] p-0" align="start" side="top">
                    <div className="p-3 border-b">
                      <div className="text-sm font-medium mb-2">Add dynamic, personal touches using lead data</div>
                      <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="custom" className="text-xs">Lead variables</TabsTrigger>
                          <TabsTrigger value="liquid" className="text-xs">Dynamic tags</TabsTrigger>
                        </TabsList>

                        <TabsContent value="liquid" className="mt-3 space-y-2">
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
                          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-primary hover:bg-muted/50 rounded-md transition-colors">
                            <Plus className="h-4 w-4" />
                            Create a new one
                          </button>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </PopoverContent>
                </Popover>

                <Popover open={templatesOpen} onOpenChange={setTemplatesOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      Templates
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[360px] p-0" align="start" side="top">
                    <div className="p-3 border-b">
                      <h3 className="font-medium text-sm">Message Templates</h3>
                      <p className="text-xs text-muted-foreground mt-1">Select a saved message template</p>
                    </div>
                    <div className="p-3 space-y-2">
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search templates..." className="pl-8 h-9" />
                      </div>
                      <div className="max-h-[300px] overflow-y-auto space-y-2">
                        {templates.map((template) => (
                          <div key={template.id} className="group relative">
                            <button
                              className="w-full text-left p-3 pr-20 border rounded-lg hover:bg-muted/50 transition-colors"
                              onClick={() => {
                                onConfigChange({
                                  ...step.config,
                                  message: template.content
                                });
                                setTemplatesOpen(false);
                              }}
                            >
                              <div className="font-medium text-sm">{template.name}</div>
                              <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {template.content.substring(0, 60)}...
                              </div>
                            </button>
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditTemplate(template);
                                }}
                              >
                                <Edit2 className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-destructive hover:text-destructive"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (confirm('Are you sure you want to delete this template?')) {
                                    handleDeleteTemplate(template.id);
                                  }
                                }}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-primary hover:bg-muted/50 rounded-md transition-colors"
                        onClick={() => {
                          setSaveTemplateDialogOpen(true);
                          setTemplatesOpen(false);
                        }}
                      >
                        <Plus className="h-4 w-4" />
                        Save current as template
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {step.type === 'linkedin-invitation' && step.config?.message?.includes('{{companyName}}') && (
                <div>
                  <Label className="text-sm mb-2 block">
                    Backup for {"{{companyName}}"}
                    <span className="text-xs text-muted-foreground ml-1">(required)</span>
                  </Label>
                  <Input
                    placeholder="Your company"
                    value={step.config?.companyNameBackup || ""}
                    onChange={e => onConfigChange({
                      ...step.config,
                      companyNameBackup: e.target.value
                    })}
                    className={cn(
                      step.config?.message?.includes('{{companyName}}') && !step.config?.companyNameBackup && "border-[#f49854] focus-visible:ring-[#f49854]"
                    )}
                  />
                  {step.config?.message?.includes('{{companyName}}') && !step.config?.companyNameBackup && (
                    <p className="text-xs text-[#f49854] mt-1">Replacement text if no company name is found</p>
                  )}
                </div>
              )}
            </>}
        </div>
      </div>

      {/* Edit Template Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Template</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-sm mb-2 block">Template Name</Label>
              <Input
                value={editingTemplate?.name || ""}
                onChange={(e) => setEditingTemplate(editingTemplate ? { ...editingTemplate, name: e.target.value } : null)}
                placeholder="Enter template name"
              />
            </div>
            <div>
              <Label className="text-sm mb-2 block">Message</Label>
              <Textarea
                id="template-editor-textarea"
                value={editingTemplate?.content || ""}
                onChange={(e) => setEditingTemplate(editingTemplate ? { ...editingTemplate, content: e.target.value } : null)}
                placeholder="Enter your message..."
                className="min-h-[200px] resize-none"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant="ghost"
                size="sm"
                className="h-auto px-0 hover:bg-transparent"
                onClick={() => insertTagInTemplateEditor('{{firstName}}')}
              >
                + First name
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto px-0 hover:bg-transparent"
                onClick={() => insertTagInTemplateEditor('{{companyName}}')}
              >
                + Company name
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1">
                    More...
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0" align="start">
                  <div className="p-3">
                    <div className="max-h-[200px] overflow-y-auto space-y-1">
                      {customVariablesFull.map((option, idx) => (
                        <button
                          key={idx}
                          className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-muted/50 rounded-md transition-colors group"
                          onClick={() => insertTagInTemplateEditor(option.value)}
                        >
                          <div className="flex items-center gap-2">
                            {option.icon}
                            <span>{option.label}</span>
                          </div>
                          <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                            {option.value}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEditedTemplate}>
              Save Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Save New Template Dialog */}
      <Dialog open={saveTemplateDialogOpen} onOpenChange={setSaveTemplateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save as Template</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-sm mb-2 block">Template Name</Label>
              <Input
                value={newTemplateName}
                onChange={(e) => setNewTemplateName(e.target.value)}
                placeholder="Enter template name"
              />
            </div>
            <div>
              <Label className="text-sm mb-2 block">Preview</Label>
              <div className="p-3 bg-muted rounded-lg text-sm">
                {step.config?.message || "No message to save"}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveTemplateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveCurrentAsTemplate} disabled={!newTemplateName.trim()}>
              Save Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>;
};