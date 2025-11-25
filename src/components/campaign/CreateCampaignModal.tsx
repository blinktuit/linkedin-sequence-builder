import { useState } from "react";
import { TargetListFilterModal } from "./TargetListFilterModal";
import { generateTemplateSteps } from "./TemplateImportModal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Upload,
  Search,
  Users,
  Calendar,
  Building2,
  Zap,
  MessageSquare,
  ChevronRight,
  X,
  Check,
  Clock,
  FileText,
  Info,
  Rocket,
  Mail,
  PartyPopper,
  Handshake,
  Video,
  LucideIcon
} from "lucide-react";

type TemplateIconType = 'rocket' | 'mail' | 'party-popper' | 'handshake' | 'video';

const TEMPLATE_ICONS: Record<TemplateIconType, LucideIcon> = {
  'rocket': Rocket,
  'mail': Mail,
  'party-popper': PartyPopper,
  'handshake': Handshake,
  'video': Video,
};

type LeadSource =
  | 'upload'
  | 'target-search'
  | 'other-campaign'
  | 'event-inviter'
  | 'company-page'
  | 'active-search'
  | 'post-engagers';

interface CreateCampaignModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete?: (data: any) => void;
}

export const CreateCampaignModal = ({
  open,
  onOpenChange,
  onComplete
}: CreateCampaignModalProps) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [isMultiStep, setIsMultiStep] = useState(true);
  const [selectedSource, setSelectedSource] = useState<LeadSource | null>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [pastedUrls, setPastedUrls] = useState('');
  const [searchUrl, setSearchUrl] = useState('');
  const [eventUrl, setEventUrl] = useState('');
  const [companyUrl, setCompanyUrl] = useState('');
  const [postUrl, setPostUrl] = useState('');
  const [refreshDaily, setRefreshDaily] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [templateSearch, setTemplateSearch] = useState('');
  const [filteringListId, setFilteringListId] = useState<string | null>(null);

  // Mock recent templates
  const recentTemplates: { id: string; name: string; icon: TemplateIconType; lastUsed: string; steps: number; type: 'custom' | 'premade' }[] = [
    { id: '1', name: 'Cold Outreach Sequence', icon: 'rocket', lastUsed: '2 days ago', steps: 5, type: 'custom' },
    { id: '2', name: 'Follow-up Campaign', icon: 'mail', lastUsed: '1 week ago', steps: 3, type: 'premade' },
    { id: '3', name: 'Event Attendee Outreach', icon: 'party-popper', lastUsed: '2 weeks ago', steps: 4, type: 'premade' },
    { id: '4', name: 'Recruiter Outreach', icon: 'handshake', lastUsed: '3 days ago', steps: 4, type: 'custom' },
    { id: '5', name: 'Webinar Invite', icon: 'video', lastUsed: '1 month ago', steps: 3, type: 'premade' },
  ];

  const [templateFilter, setTemplateFilter] = useState<'all' | 'custom' | 'premade'>('all');

  const filteredTemplates = recentTemplates.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(templateSearch.toLowerCase());
    const matchesFilter = templateFilter === 'all' || t.type === templateFilter;
    return matchesSearch && matchesFilter;
  });

  const leadSources = [
    {
      id: 'target-search' as LeadSource,
      title: 'Target search list',
      description: 'Use LinkedIn search results',
      icon: <Search className="h-6 w-6" />
    },
    {
      id: 'upload' as LeadSource,
      title: 'Upload leads',
      description: 'Import from CSV or paste URLs',
      icon: <Upload className="h-6 w-6" />
    },
    {
      id: 'other-campaign' as LeadSource,
      title: 'Use from other campaign',
      description: 'Reuse leads from existing campaign',
      icon: <Users className="h-6 w-6" />
    },
    {
      id: 'event-inviter' as LeadSource,
      title: 'LinkedIn event inviter',
      description: 'Target event attendees',
      icon: <Calendar className="h-6 w-6" />
    },
    {
      id: 'company-page' as LeadSource,
      title: 'Invite to follow company page',
      description: 'Get company page followers',
      icon: <Building2 className="h-6 w-6" />
    },
    {
      id: 'active-search' as LeadSource,
      title: 'Active search',
      description: 'Auto-refresh search results',
      icon: <Zap className="h-6 w-6" />
    },
    {
      id: 'post-engagers' as LeadSource,
      title: 'Post engagers',
      description: 'Target post interactions',
      icon: <MessageSquare className="h-6 w-6" />
    }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCsvFile(e.target.files[0]);
    }
  };

  const validateUrl = (url: string, type: string): boolean => {
    if (!url) return false;

    const patterns = {
      event: /linkedin\.com\/events\//,
      company: /linkedin\.com\/company\//,
      post: /linkedin\.com\/posts?\//,
      search: /linkedin\.com\/(search|sales\/search)/
    };

    return patterns[type as keyof typeof patterns]?.test(url) || false;
  };

  const handleNext = () => {
    if (step === 1 && (isMultiStep || selectedSource)) {
      setStep(2);
    }
  };

  const handleCampaignTypeSelect = (campaignId: LeadSource) => {
    setSelectedSource(campaignId);
    setIsMultiStep(false);
  };

  const handleComplete = (templateId?: string) => {
    const templateSteps = templateId ? generateTemplateSteps(templateId) : [];
    const data = {
      source: selectedSource,
      templateId,
      templateSteps,
      csvFile,
      pastedUrls,
      searchUrl,
      eventUrl,
      companyUrl,
      postUrl,
      refreshDaily
    };
    onComplete?.(data);
    onOpenChange(false);
  };

  const [selectedTargetLists, setSelectedTargetLists] = useState<string[]>([]);

  // Mock target lists
  const targetLists = [
    { id: '1', name: 'Tech CEOs in SF', leads: 1240, date: 'Oct 24, 2024' },
    { id: '2', name: 'Marketing Directors NY', leads: 850, date: 'Nov 02, 2024' },
    { id: '3', name: 'SaaS Founders Europe', leads: 2100, date: 'Nov 10, 2024' },
    { id: '4', name: 'HR Managers London', leads: 560, date: 'Nov 15, 2024' },
    { id: '5', name: 'Sales VPs Austin', leads: 920, date: 'Nov 18, 2024' },
  ];

  const toggleTargetList = (id: string) => {
    setSelectedTargetLists(prev =>
      prev.includes(id)
        ? prev.filter(listId => listId !== id)
        : [...prev, id]
    );
  };

  const renderSourceOptions = () => {
    if (!selectedSource) return null;

    switch (selectedSource) {
      case 'target-search':
        return (
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Select Target Lists</Label>
              <div className="border rounded-lg bg-background divide-y max-h-[400px] overflow-y-auto">
                {targetLists.map((list) => (
                  <div
                    key={list.id}
                    className="flex items-center p-4 hover:bg-accent/50 transition-colors cursor-pointer group"
                    onClick={() => toggleTargetList(list.id)}
                  >
                    <Checkbox
                      checked={selectedTargetLists.includes(list.id)}
                      onCheckedChange={() => toggleTargetList(list.id)}
                      className="mr-4"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium truncate">{list.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFilteringListId(list.id);
                          }}
                        >
                          Filter
                        </Button>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {list.leads.toLocaleString()} leads
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {list.date}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                {selectedTargetLists.length} list{selectedTargetLists.length !== 1 ? 's' : ''} selected
              </p>
            </div>

            {filteringListId && (
              <TargetListFilterModal
                open={!!filteringListId}
                onOpenChange={(open) => !open && setFilteringListId(null)}
                listName={targetLists.find(l => l.id === filteringListId)?.name || ''}
              />
            )}
          </div>
        );

      case 'upload':
        return (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg space-y-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Upload CSV file</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                  id="csv-upload"
                />
                <label htmlFor="csv-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm font-medium">
                    {csvFile ? csvFile.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    CSV file with LinkedIn profile URLs
                  </p>
                </label>
              </div>
              {csvFile && (
                <div className="space-y-2">
                  <Label className="text-sm">Select profileUrl column</Label>
                  <Input
                    placeholder="Column name (e.g., profileUrl, LinkedIn URL)"
                    value={selectedColumn}
                    onChange={(e) => setSelectedColumn(e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">or</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Paste LinkedIn URLs</Label>
              <Textarea
                placeholder="Paste LinkedIn profile URLs (one per line)&#10;https://linkedin.com/in/username&#10;https://linkedin.com/in/another-user"
                value={pastedUrls}
                onChange={(e) => setPastedUrls(e.target.value)}
                className="min-h-[120px] font-mono text-xs"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">or</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">LinkedIn/Sales Navigator search URL</Label>
              <Input
                placeholder="https://linkedin.com/search/results/people/?keywords=..."
                value={searchUrl}
                onChange={(e) => setSearchUrl(e.target.value)}
              />
              {searchUrl && validateUrl(searchUrl, 'search') && (
                <p className="text-xs text-[#36b39a] flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  Valid search URL
                </p>
              )}
            </div>
          </div>
        );

      case 'other-campaign':
        return (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Select Campaign</Label>
              <div className="grid gap-2">
                {recentTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="flex items-center p-3 border rounded-md bg-background hover:bg-accent cursor-pointer"
                    onClick={() => {
                      // In a real app, this would select the campaign
                      console.log('Selected campaign:', template.name);
                    }}
                  >
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mr-2">
                      {(() => {
                        const IconComponent = TEMPLATE_ICONS[template.icon];
                        return <IconComponent className="h-5 w-5 text-primary" />;
                      })()}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{template.name}</p>
                      <p className="text-xs text-muted-foreground">{template.steps} steps • Used {template.lastUsed}</p>
                    </div>
                    <div className="h-4 w-4 rounded-full border border-primary" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'event-inviter':
        return (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">LinkedIn Event URL</Label>
              <Input
                placeholder="https://linkedin.com/events/event-name-123456789/"
                value={eventUrl}
                onChange={(e) => setEventUrl(e.target.value)}
              />
              {eventUrl && validateUrl(eventUrl, 'event') && (
                <p className="text-xs text-[#36b39a] flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  Valid event URL
                </p>
              )}
              {eventUrl && !validateUrl(eventUrl, 'event') && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <X className="h-3 w-3" />
                  Invalid event URL
                </p>
              )}
            </div>
          </div>
        );

      case 'company-page':
        return (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Company Page URL</Label>
              <Input
                placeholder="https://linkedin.com/company/company-name/"
                value={companyUrl}
                onChange={(e) => setCompanyUrl(e.target.value)}
              />
              {companyUrl && validateUrl(companyUrl, 'company') && (
                <p className="text-xs text-[#36b39a] flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  Valid company URL
                </p>
              )}
              {companyUrl && !validateUrl(companyUrl, 'company') && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <X className="h-3 w-3" />
                  Invalid company URL
                </p>
              )}
            </div>
          </div>
        );

      case 'active-search':
        return (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">LinkedIn/Sales Navigator search URL</Label>
              <Input
                placeholder="https://linkedin.com/search/results/people/?keywords=..."
                value={searchUrl}
                onChange={(e) => setSearchUrl(e.target.value)}
              />
              {searchUrl && validateUrl(searchUrl, 'search') && (
                <p className="text-xs text-[#36b39a] flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  Valid search URL
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="refresh-daily"
                checked={refreshDaily}
                onCheckedChange={(checked) => setRefreshDaily(checked as boolean)}
              />
              <Label htmlFor="refresh-daily" className="text-sm font-normal cursor-pointer">
                Refresh daily
              </Label>
            </div>
          </div>
        );

      case 'post-engagers':
        return (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">LinkedIn Post URL</Label>
              <Input
                placeholder="https://linkedin.com/posts/username_post-id"
                value={postUrl}
                onChange={(e) => setPostUrl(e.target.value)}
              />
              {postUrl && validateUrl(postUrl, 'post') && (
                <p className="text-xs text-[#36b39a] flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  Valid post URL
                </p>
              )}
              {postUrl && !validateUrl(postUrl, 'post') && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <X className="h-3 w-3" />
                  Invalid post URL
                </p>
              )}
            </div>
          </div>
        );

      default:
        return (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Options for {leadSources.find(s => s.id === selectedSource)?.title} coming soon...
            </p>
          </div>
        );
    }
  };



  const stepLabels = [
    { number: 1, label: "Campaign type" },
    { number: 2, label: "Template" }
  ];

  const StepIndicator = () => (
    <div className="px-6 py-4 border-b bg-background">
      <div className="flex items-center gap-3">
        {stepLabels.map((s, index) => (
          <div key={s.number} className="flex items-center gap-3">
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                s.number === step
                  ? 'bg-primary/10 text-primary'
                  : s.number < step
                    ? 'text-primary'
                    : 'text-muted-foreground'
              }`}
            >
              <span className={`flex items-center justify-center w-5 h-5 rounded-full text-xs font-medium ${
                s.number < step
                  ? 'bg-primary text-primary-foreground'
                  : s.number === step
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
              }`}>
                {s.number < step ? <Check className="h-3 w-3" /> : s.number}
              </span>
              <span className="text-sm font-medium">{s.label}</span>
            </div>
            {index < stepLabels.length - 1 && (
              <div className={`h-px w-8 ${s.number < step ? 'bg-primary' : 'bg-muted'}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] h-[85vh] flex flex-col p-0">
        {step === 1 && (
          <>
            <StepIndicator />
            <div className="flex-1 overflow-hidden flex relative">
              {/* OR Divider */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center h-full pointer-events-none">
                <div className="h-full w-px bg-border/50 absolute top-0 bottom-0" />
                <div className="bg-background border rounded-full p-2 shadow-sm z-20 relative">
                  <span className="text-xs font-bold text-muted-foreground px-1">OR</span>
                </div>
              </div>

              {/* Left Column: Multi-step Campaign */}
              <div className="w-1/2 p-8 border-r flex flex-col justify-center items-center bg-muted/5 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
                <button
                  onClick={() => {
                    setIsMultiStep(true);
                    setSelectedSource(null);
                    setStep(2);
                  }}
                  className="group relative w-full max-w-md aspect-square rounded-2xl border-2 border-dashed border-primary/30 bg-card hover:border-primary hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center p-8 z-10 shadow-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                  <div className="mb-6 p-8 rounded-full bg-primary/5 ring-1 ring-primary/20 shadow-sm group-hover:scale-110 group-hover:shadow-md group-hover:bg-primary/10 transition-all duration-300 relative z-10">
                    <FileText className="h-16 w-16 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold mb-3 text-foreground relative z-10">Multi step campaign</h3>
                  <p className="text-muted-foreground max-w-xs text-lg relative z-10">
                    Complex sequences with multiple steps and conditions
                  </p>
                  <div className="mt-6 relative z-10">
                    <Badge variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm px-4 py-1 text-sm">
                      Most Popular
                    </Badge>
                  </div>
                </button>
              </div>

              {/* Right Column: Single Step Campaigns */}
              <div className="w-1/2 flex flex-col bg-background">
                <div className="p-6 border-b">
                  <h3 className="text-2xl font-semibold">Single step campaigns</h3>
                  <p className="text-muted-foreground mt-1">Quick actions for specific goals</p>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  {!selectedSource ? (
                    <div className="space-y-4">
                      {leadSources.filter(s => ['event-inviter', 'company-page'].includes(s.id)).map((source) => (
                        <button
                          key={source.id}
                          onClick={() => {
                            setIsMultiStep(false);
                            setSelectedSource(source.id);
                          }}
                          className="group w-full flex items-center justify-between p-6 rounded-xl border hover:border-primary/50 hover:bg-accent/50 transition-all cursor-pointer bg-card text-left"
                        >
                          <div className="flex items-center gap-5">
                            <div className="p-3 rounded-full bg-muted group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                              {source.icon}
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold mb-1">{source.title}</h4>
                              <p className="text-sm text-muted-foreground">{source.description}</p>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Back button */}
                      <button
                        onClick={() => setSelectedSource(null)}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ChevronRight className="h-4 w-4 rotate-180" />
                        Back to campaign types
                      </button>

                      {/* Selected campaign type header */}
                      <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl border">
                        <div className="p-3 rounded-full bg-muted text-muted-foreground">
                          {leadSources.find(s => s.id === selectedSource)?.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold">{leadSources.find(s => s.id === selectedSource)?.title}</h4>
                          <p className="text-sm text-muted-foreground">{leadSources.find(s => s.id === selectedSource)?.description}</p>
                        </div>
                      </div>

                      {/* Configuration options */}
                      {selectedSource === 'event-inviter' && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">LinkedIn Event URL</Label>
                            <Input
                              placeholder="https://linkedin.com/events/event-name-123456789/"
                              value={eventUrl}
                              onChange={(e) => setEventUrl(e.target.value)}
                            />
                            {eventUrl && validateUrl(eventUrl, 'event') && (
                              <p className="text-xs text-[#36b39a] flex items-center gap-1">
                                <Check className="h-3 w-3" />
                                Valid event URL
                              </p>
                            )}
                            {eventUrl && !validateUrl(eventUrl, 'event') && (
                              <p className="text-xs text-destructive flex items-center gap-1">
                                <X className="h-3 w-3" />
                                Invalid event URL
                              </p>
                            )}
                          </div>

                          <Alert className="bg-muted/50 border-border">
                            <Info className="h-4 w-4 text-muted-foreground" />
                            <AlertDescription className="text-xs text-muted-foreground space-y-1 ml-2">
                              <p>• Je kan deze campagne als laatste stap in je multi step campaign zetten</p>
                              <p>• Er geldt een limiet van maximaal 1000 uitnodigingen per week per gebruiker, dus niet per evenement</p>
                              <p>• Alleen 1e-graads connecties kunnen worden uitgenodigd voor een event, dus mensen waarmee je direct verbonden bent op LinkedIn. Mensen die geen connectie zijn worden overgeslagen</p>
                              <p>• Als je limiet bereikt is wacht de campagne tot je weer een volgende week krijgt</p>
                            </AlertDescription>
                          </Alert>

                          <Button
                            className="w-full"
                            disabled={!eventUrl || !validateUrl(eventUrl, 'event')}
                            onClick={() => handleComplete()}
                          >
                            Create Campaign
                          </Button>
                        </div>
                      )}

                      {selectedSource === 'company-page' && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Company Page URL</Label>
                            <Input
                              placeholder="https://linkedin.com/company/company-name/"
                              value={companyUrl}
                              onChange={(e) => setCompanyUrl(e.target.value)}
                            />
                            {companyUrl && validateUrl(companyUrl, 'company') && (
                              <p className="text-xs text-[#36b39a] flex items-center gap-1">
                                <Check className="h-3 w-3" />
                                Valid company URL
                              </p>
                            )}
                            {companyUrl && !validateUrl(companyUrl, 'company') && (
                              <p className="text-xs text-destructive flex items-center gap-1">
                                <X className="h-3 w-3" />
                                Invalid company URL
                              </p>
                            )}
                          </div>

                          <Alert className="bg-muted/50 border-border">
                            <Info className="h-4 w-4 text-muted-foreground" />
                            <AlertDescription className="text-xs text-muted-foreground space-y-1 ml-2">
                              <p>• Je kan deze campagne als laatste stap in je multi step campaign zetten</p>
                              <p>• Er geldt een limiet van maximaal 250 uitnodigingen per maand per bedrijfspagina</p>
                              <p>• Alleen 1e-graads connecties kunnen worden uitgenodigd voor een bedrijfspagina. Mensen die geen connectie zijn worden overgeslagen</p>
                              <p>• Als je limiet bereikt is wacht de campagne tot de volgende maand voordat deze verder gaat</p>
                            </AlertDescription>
                          </Alert>

                          <Button
                            className="w-full"
                            disabled={!companyUrl || !validateUrl(companyUrl, 'company')}
                            onClick={() => handleComplete()}
                          >
                            Create Campaign
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 px-6 py-4 border-t bg-background">
              <Button variant="outline" onClick={() => onOpenChange(false)} className="shadow-sm">
                Cancel
              </Button>
            </div>
          </>
        )}


        {
          step === 2 && (
            <>
              <StepIndicator />
              <div className="flex-1 overflow-hidden flex relative">
                {/* OR Divider */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center h-full pointer-events-none">
                  <div className="h-full w-px bg-border/50 absolute top-0 bottom-0" />
                  <div className="bg-background border rounded-full p-2 shadow-sm z-20 relative">
                    <span className="text-xs font-bold text-muted-foreground px-1">OR</span>
                  </div>
                </div>

                {/* Left Column: Start from Scratch */}
                <div className="w-1/2 p-8 border-r flex flex-col justify-center items-center bg-muted/5 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }} />
                  <button
                    onClick={() => handleComplete()}
                    className="group relative w-full max-w-md aspect-square rounded-2xl border-2 border-dashed border-primary/30 bg-card hover:border-primary hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center p-8 z-10 shadow-sm"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                    <div className="mb-6 p-8 rounded-full bg-primary/5 ring-1 ring-primary/20 shadow-sm group-hover:scale-110 group-hover:shadow-md group-hover:bg-primary/10 transition-all duration-300 relative z-10">
                      <Zap className="h-16 w-16 text-primary" />
                    </div>
                    <h3 className="text-3xl font-bold mb-3 text-foreground relative z-10">Start from scratch</h3>
                    <p className="text-muted-foreground max-w-xs text-lg relative z-10">
                      Build your campaign step by step with full control
                    </p>
                    <div className="mt-6 relative z-10">
                      <Badge variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm px-4 py-1 text-sm">
                        Most Flexible
                      </Badge>
                    </div>
                  </button>
                </div>

                {/* Right Column: Templates */}
                <div className="w-1/2 flex flex-col bg-background">
                  <div className="p-6 border-b space-y-4">
                    <h3 className="text-2xl font-semibold">Pick a template</h3>

                    <div className="space-y-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search templates..."
                          className="pl-9"
                          value={templateSearch}
                          onChange={(e) => setTemplateSearch(e.target.value)}
                        />
                      </div>

                      <div className="flex gap-2">
                        {(['all', 'custom', 'premade'] as const).map((filter) => (
                          <Button
                            key={filter}
                            variant={templateFilter === filter ? "default" : "outline"}
                            size="sm"
                            onClick={() => setTemplateFilter(filter)}
                            className="capitalize rounded-full px-4"
                          >
                            {filter}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6">
                    {filteredTemplates.length > 0 ? (
                      <div className="space-y-3">
                        {filteredTemplates.map((template) => (
                          <div
                            key={template.id}
                            onClick={() => handleComplete(template.id)}
                            className="group flex items-center justify-between p-4 rounded-xl border hover:border-primary/50 hover:bg-accent/50 transition-all cursor-pointer bg-card"
                          >
                            <div className="flex items-center gap-4">
                              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                {(() => {
                                  const IconComponent = TEMPLATE_ICONS[template.icon];
                                  return <IconComponent className="h-6 w-6 text-primary" />;
                                })()}
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-medium">{template.name}</h4>
                                  <Badge variant={template.type === 'custom' ? 'secondary' : 'outline'} className="text-[10px] h-5">
                                    {template.type}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <FileText className="h-3 w-3" />
                                    {template.steps} steps
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {template.lastUsed}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              Insert
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                        <Search className="h-8 w-8 mb-2 opacity-20" />
                        <p>No templates found</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between px-6 py-4 border-t bg-background">
                <Button variant="outline" onClick={() => setStep(1)} className="shadow-sm">
                  Back
                </Button>
              </div>
            </>
          )
        }
      </DialogContent >
    </Dialog >
  );
};
