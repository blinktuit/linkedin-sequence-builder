import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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
  FileText
} from "lucide-react";

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

  // Mock recent templates
  const recentTemplates = [
    { id: '1', name: 'Cold Outreach Sequence', emoji: '🚀', lastUsed: '2 days ago', steps: 5 },
    { id: '2', name: 'Follow-up Campaign', emoji: '📧', lastUsed: '1 week ago', steps: 3 },
    { id: '3', name: 'Event Attendee Outreach', emoji: '🎉', lastUsed: '2 weeks ago', steps: 4 },
  ];

  const filteredTemplates = templateSearch
    ? recentTemplates.filter(t => t.name.toLowerCase().includes(templateSearch.toLowerCase()))
    : recentTemplates;

  const specialCampaigns = [
    {
      id: 'event-inviter' as LeadSource,
      title: 'LinkedIn event inviter',
      description: 'Target event attendees',
      icon: <Calendar className="h-5 w-5" />
    },
    {
      id: 'company-page' as LeadSource,
      title: 'Invite to follow company page',
      description: 'Get company page followers',
      icon: <Building2 className="h-5 w-5" />
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

  const handleComplete = () => {
    const data = {
      source: selectedSource,
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

  const renderSourceOptions = () => {
    if (!selectedSource) return null;

    switch (selectedSource) {
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle>Create Campaign</DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              <div className="space-y-1">
                <h3 className="text-sm font-normal text-foreground">Choose type of campaign</h3>
              </div>

              {/* Multi-step campaign option */}
              <div className="space-y-3">
                <button
                  onClick={() => setIsMultiStep(!isMultiStep)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    isMultiStep
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-card hover:border-border'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`${isMultiStep ? 'text-primary' : 'text-muted-foreground'}`}>
                        <FileText className="h-5 w-5" />
                      </div>
                      <span className="font-medium text-sm">Multi step campaign</span>
                    </div>
                    <Switch
                      checked={isMultiStep}
                      onCheckedChange={setIsMultiStep}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </button>
              </div>

              {/* Special single step campaigns */}
              <div className="space-y-3">
                <h4 className="text-sm font-normal text-foreground">Special single step campaigns</h4>
                <div className="space-y-2">
                  {specialCampaigns.map((campaign) => (
                    <button
                      key={campaign.id}
                      onClick={() => handleCampaignTypeSelect(campaign.id)}
                      className={`w-full p-4 rounded-lg border transition-all text-left ${
                        !isMultiStep && selectedSource === campaign.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border bg-card hover:border-border'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 ${!isMultiStep && selectedSource === campaign.id ? 'text-primary' : 'text-muted-foreground'}`}>
                          {campaign.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-sm mb-0.5">{campaign.title}</h3>
                          <p className="text-xs text-muted-foreground">{campaign.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 px-6 py-4 border-t bg-background">
              <Button variant="outline" onClick={() => onOpenChange(false)} className="shadow-sm">
                Cancel
              </Button>
              <Button onClick={handleNext} disabled={!isMultiStep && !selectedSource} className="shadow-sm">
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Choose how to start</h3>

                <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleComplete}
                  className="p-6 rounded-lg border-2 border-border bg-card hover:border-primary/50 transition-all text-left shadow-sm hover:shadow-md"
                >
                  <div className="text-primary mb-3">
                    <Zap className="h-8 w-8" />
                  </div>
                  <h3 className="font-medium mb-2">Start from scratch</h3>
                  <p className="text-sm text-muted-foreground">
                    Build your campaign step by step
                  </p>
                </button>

                <div className="p-6 rounded-lg border-2 border-border bg-card shadow-sm">
                  <div className="text-muted-foreground mb-3">
                    <Search className="h-8 w-8" />
                  </div>
                  <h3 className="font-medium mb-2">Use recent templates</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Start with a pre-built template
                  </p>
                  <Input
                    placeholder="Search templates..."
                    className="mt-2"
                    value={templateSearch}
                    onChange={(e) => setTemplateSearch(e.target.value)}
                  />
                </div>
              </div>
              </div>

              {/* Recent Templates List */}
              {!templateSearch && (
                <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">Recent templates</h4>
                <div className="space-y-2">
                  {recentTemplates.map((template) => (
                    <button
                      key={template.id}
                      onClick={handleComplete}
                      className="w-full p-4 rounded-lg border-2 border-border bg-card hover:border-primary/50 transition-all text-left shadow-sm hover:shadow-md flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{template.emoji}</span>
                        <div>
                          <h4 className="font-medium text-sm">{template.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {template.steps} steps
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {template.lastUsed}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </button>
                  ))}
                </div>
                </div>
              )}

              {/* Search Results */}
              {templateSearch && filteredTemplates.length > 0 && (
                <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">Search results</h4>
                <div className="space-y-2">
                  {filteredTemplates.map((template) => (
                    <button
                      key={template.id}
                      onClick={handleComplete}
                      className="w-full p-4 rounded-lg border-2 border-border bg-card hover:border-primary/50 transition-all text-left shadow-sm hover:shadow-md flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{template.emoji}</span>
                        <div>
                          <h4 className="font-medium text-sm">{template.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {template.steps} steps
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {template.lastUsed}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </button>
                  ))}
                </div>
                </div>
              )}

              {templateSearch && filteredTemplates.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="text-sm">No templates found</p>
                </div>
              )}
            </div>

            <div className="flex justify-between px-6 py-4 border-t bg-background">
              <Button variant="outline" onClick={() => setStep(1)} className="shadow-sm">
                Back
              </Button>
              <Button variant="outline" onClick={() => onOpenChange(false)} className="shadow-sm">
                Cancel
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
