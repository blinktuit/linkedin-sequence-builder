import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  ChevronRight,
  Check,
  X,
  Info,
  ChevronDown,
  FileText,
  Sparkles,
} from "lucide-react";

// Shared components and state
const useConfigState = () => {
  const [eventUrl, setEventUrl] = useState('');

  const validateUrl = (url: string): boolean => {
    if (!url) return false;
    return /linkedin\.com\/events\//.test(url);
  };

  return { eventUrl, setEventUrl, validateUrl };
};

// Option 1: Current Design (for reference)
const Option1CurrentDesign = () => {
  const { eventUrl, setEventUrl, validateUrl } = useConfigState();

  return (
    <div className="space-y-6">
      {/* Back button */}
      <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ChevronRight className="h-4 w-4 rotate-180" />
        Back to campaign types
      </button>

      {/* Selected campaign type header */}
      <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl border border-primary/20">
        <div className="p-3 rounded-full bg-primary/10 text-primary">
          <Calendar className="h-6 w-6" />
        </div>
        <div>
          <h4 className="font-semibold">LinkedIn event inviter</h4>
          <p className="text-sm text-muted-foreground">Target event attendees</p>
        </div>
      </div>

      {/* Configuration options */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">LinkedIn Event URL</Label>
          <Input
            placeholder="https://linkedin.com/events/event-name-123456789/"
            value={eventUrl}
            onChange={(e) => setEventUrl(e.target.value)}
          />
          {eventUrl && validateUrl(eventUrl) && (
            <p className="text-xs text-[#36b39a] flex items-center gap-1">
              <Check className="h-3 w-3" />
              Valid event URL
            </p>
          )}
          {eventUrl && !validateUrl(eventUrl) && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <X className="h-3 w-3" />
              Invalid event URL
            </p>
          )}
        </div>

        <Alert className="bg-blue-50 border-blue-200">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-xs text-blue-900 space-y-1 ml-2">
            <p>• Je kan deze campagne als laatste stap in je multi step campaign zetten</p>
            <p>• Er geldt een limiet van maximaal 1000 uitnodigingen per week per gebruiker</p>
            <p>• Alleen 1e-graads connecties kunnen worden uitgenodigd</p>
            <p>• Als je limiet bereikt is wacht de campagne tot de volgende week</p>
          </AlertDescription>
        </Alert>

        <Button
          className="w-full"
          disabled={!eventUrl || !validateUrl(eventUrl)}
        >
          Create Campaign
        </Button>
      </div>
    </div>
  );
};

// Option 2: Card-Based with Sections
const Option2CardBased = () => {
  const { eventUrl, setEventUrl, validateUrl } = useConfigState();

  return (
    <div className="space-y-6">
      {/* Back button */}
      <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ChevronRight className="h-4 w-4 rotate-180" />
        Back to campaign types
      </button>

      {/* Header Card */}
      <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/5 via-background to-background p-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative flex items-start gap-4">
          <div className="p-4 rounded-2xl bg-primary/10 text-primary shadow-sm">
            <Calendar className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-1">LinkedIn Event Inviter</h3>
            <p className="text-muted-foreground">Invite your connections to LinkedIn events automatically</p>
          </div>
        </div>
      </div>

      {/* Configuration Card */}
      <div className="rounded-xl border bg-card p-6 space-y-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-1 bg-primary rounded-full" />
          <h4 className="font-semibold text-lg">Configuration</h4>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium flex items-center gap-2">
            Event URL
            <Badge variant="secondary" className="text-[10px]">Required</Badge>
          </Label>
          <div className="relative">
            <Input
              placeholder="https://linkedin.com/events/event-name-123456789/"
              value={eventUrl}
              onChange={(e) => setEventUrl(e.target.value)}
              className="pr-10"
            />
            {eventUrl && validateUrl(eventUrl) && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Check className="h-4 w-4 text-[#36b39a]" />
              </div>
            )}
            {eventUrl && !validateUrl(eventUrl) && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="h-4 w-4 text-destructive" />
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Paste the full LinkedIn event URL
          </p>
        </div>
      </div>

      {/* Info Card */}
      <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-5">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-amber-100">
            <Info className="h-4 w-4 text-amber-600" />
          </div>
          <div className="space-y-2 text-sm text-amber-900">
            <p className="font-medium">Good to know</p>
            <ul className="space-y-1.5 text-xs">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">•</span>
                Maximum 1000 invitations per week per user
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">•</span>
                Only 1st-degree connections can be invited
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">•</span>
                Campaign pauses when limit is reached
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Button className="w-full h-12 text-base" disabled={!eventUrl || !validateUrl(eventUrl)}>
        Create Campaign
      </Button>
    </div>
  );
};

// Option 3: Minimal with Floating Elements
const Option3Minimal = () => {
  const { eventUrl, setEventUrl, validateUrl } = useConfigState();
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="space-y-8">
      {/* Back button */}
      <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ChevronRight className="h-4 w-4 rotate-180" />
        Back
      </button>

      {/* Minimal Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5">
          <Calendar className="h-10 w-10 text-primary" />
        </div>
        <div>
          <h3 className="text-2xl font-bold">Event Inviter</h3>
          <p className="text-muted-foreground mt-1">Invite connections to your LinkedIn event</p>
        </div>
      </div>

      {/* Simple Input */}
      <div className="space-y-4 max-w-md mx-auto">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Event URL</Label>
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <Info className="h-3 w-3" />
              {showInfo ? 'Hide' : 'Show'} limits
            </button>
          </div>
          <Input
            placeholder="Paste LinkedIn event URL..."
            value={eventUrl}
            onChange={(e) => setEventUrl(e.target.value)}
            className="h-12 text-base"
          />
          {eventUrl && (
            <p className={`text-xs flex items-center gap-1 ${validateUrl(eventUrl) ? 'text-[#36b39a]' : 'text-destructive'}`}>
              {validateUrl(eventUrl) ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
              {validateUrl(eventUrl) ? 'Valid event URL' : 'Invalid event URL'}
            </p>
          )}
        </div>

        {showInfo && (
          <div className="p-4 rounded-lg bg-muted/50 text-xs text-muted-foreground space-y-2 animate-in slide-in-from-top-2">
            <p>• Max 1000 invites/week per user</p>
            <p>• Only 1st-degree connections</p>
            <p>• Auto-pauses at limit</p>
          </div>
        )}

        <Button
          className="w-full h-12 text-base"
          disabled={!eventUrl || !validateUrl(eventUrl)}
        >
          Create Campaign
        </Button>
      </div>
    </div>
  );
};

// Option 4: Steps/Wizard Style
const Option4Wizard = () => {
  const { eventUrl, setEventUrl, validateUrl } = useConfigState();

  return (
    <div className="space-y-6">
      {/* Back button */}
      <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ChevronRight className="h-4 w-4 rotate-180" />
        Back to campaign types
      </button>

      {/* Progress indicator */}
      <div className="flex items-center gap-3 py-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-medium">
            <Check className="h-3 w-3" />
          </span>
          <span className="text-sm font-medium text-primary">Type</span>
        </div>
        <div className="h-px flex-1 bg-primary" />
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-medium">
            2
          </span>
          <span className="text-sm font-medium">Configure</span>
        </div>
        <div className="h-px flex-1 bg-muted" />
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-muted-foreground text-xs font-medium">
            3
          </span>
          <span className="text-sm text-muted-foreground">Review</span>
        </div>
      </div>

      {/* Selected type badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm">
        <Calendar className="h-4 w-4" />
        Event Inviter
      </div>

      {/* Configuration form */}
      <div className="space-y-6 pt-4">
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-medium shrink-0">
              1
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <h4 className="font-medium">Enter Event URL</h4>
                <p className="text-sm text-muted-foreground">Paste your LinkedIn event link below</p>
              </div>
              <Input
                placeholder="https://linkedin.com/events/..."
                value={eventUrl}
                onChange={(e) => setEventUrl(e.target.value)}
              />
              {eventUrl && (
                <p className={`text-xs flex items-center gap-1 ${validateUrl(eventUrl) ? 'text-[#36b39a]' : 'text-destructive'}`}>
                  {validateUrl(eventUrl) ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                  {validateUrl(eventUrl) ? 'Valid' : 'Invalid URL format'}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground text-sm font-medium shrink-0">
              2
            </div>
            <div className="flex-1 opacity-50">
              <h4 className="font-medium">Review Limits</h4>
              <p className="text-sm text-muted-foreground">1000 invites/week • 1st connections only</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <Button className="w-full" disabled={!eventUrl || !validateUrl(eventUrl)}>
            Continue to Review
          </Button>
        </div>
      </div>
    </div>
  );
};

// Option 5: Modern Split with Preview
const Option5ModernSplit = () => {
  const { eventUrl, setEventUrl, validateUrl } = useConfigState();

  return (
    <div className="space-y-6">
      {/* Back button */}
      <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ChevronRight className="h-4 w-4 rotate-180" />
        Back to campaign types
      </button>

      <div className="grid grid-cols-5 gap-6">
        {/* Left: Configuration */}
        <div className="col-span-3 space-y-6">
          {/* Type indicator */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-transparent border border-primary/20">
            <div className="p-2.5 rounded-xl bg-primary text-primary-foreground">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Campaign Type</p>
              <p className="font-semibold">LinkedIn Event Inviter</p>
            </div>
          </div>

          {/* Input section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Event URL</Label>
              <Input
                placeholder="https://linkedin.com/events/event-name-123456789/"
                value={eventUrl}
                onChange={(e) => setEventUrl(e.target.value)}
                className="h-11"
              />
              {eventUrl && (
                <div className={`flex items-center gap-2 text-xs ${validateUrl(eventUrl) ? 'text-[#36b39a]' : 'text-destructive'}`}>
                  {validateUrl(eventUrl) ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                  {validateUrl(eventUrl) ? 'Valid event URL detected' : 'Please enter a valid LinkedIn event URL'}
                </div>
              )}
            </div>
          </div>

          <Button className="w-full h-11" disabled={!eventUrl || !validateUrl(eventUrl)}>
            <Sparkles className="h-4 w-4 mr-2" />
            Create Campaign
          </Button>
        </div>

        {/* Right: Info Panel */}
        <div className="col-span-2 rounded-xl border bg-muted/30 p-5 space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <FileText className="h-4 w-4 text-muted-foreground" />
            Campaign Details
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-background border">
              <p className="text-xs text-muted-foreground mb-1">Weekly Limit</p>
              <p className="font-semibold">1,000 invitations</p>
            </div>
            <div className="p-3 rounded-lg bg-background border">
              <p className="text-xs text-muted-foreground mb-1">Target Audience</p>
              <p className="font-semibold">1st-degree connections</p>
            </div>
            <div className="p-3 rounded-lg bg-background border">
              <p className="text-xs text-muted-foreground mb-1">Auto-pause</p>
              <p className="font-semibold">When limit reached</p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground pt-2 border-t">
            Non-connections will be automatically skipped during the campaign.
          </p>
        </div>
      </div>
    </div>
  );
};


export default function TestSingleStepConfig2() {
  const [activeOption, setActiveOption] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const options = [
    { id: 1, name: "Current Design", component: Option1CurrentDesign },
    { id: 2, name: "Card-Based Sections", component: Option2CardBased },
    { id: 3, name: "Minimal Centered", component: Option3Minimal },
    { id: 4, name: "Wizard Steps", component: Option4Wizard },
    { id: 5, name: "Split with Info Panel", component: Option5ModernSplit },
  ];

  const ActiveComponent = options.find(o => o.id === activeOption)?.component || Option1CurrentDesign;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Single Step Config Design Options</h1>
          <p className="text-muted-foreground">Compare 5 different designs for the configuration section</p>
        </div>

        {/* Option selector */}
        <div className="flex justify-center gap-2 flex-wrap">
          {options.map((option) => (
            <Button
              key={option.id}
              variant={activeOption === option.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveOption(option.id)}
            >
              Option {option.id}: {option.name}
            </Button>
          ))}
        </div>

        {/* Preview in modal context */}
        <div className="border rounded-2xl overflow-hidden bg-card shadow-lg">
          <div className="bg-muted/50 px-6 py-3 border-b flex items-center justify-between">
            <span className="text-sm font-medium">Modal Preview - Option {activeOption}</span>
            <Button size="sm" variant="outline" onClick={() => setShowModal(true)}>
              View in Real Modal
            </Button>
          </div>

          {/* Simulated modal layout */}
          <div className="flex h-[600px]">
            {/* Left side - Multi step campaign (dimmed) */}
            <div className="w-1/2 p-8 border-r flex flex-col justify-center items-center bg-muted/5 opacity-30">
              <div className="w-full max-w-md aspect-square rounded-2xl border-2 border-dashed border-muted flex flex-col items-center justify-center text-center p-8">
                <div className="mb-6 p-8 rounded-full bg-muted/20">
                  <FileText className="h-16 w-16 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-muted-foreground">Multi step campaign</h3>
              </div>
            </div>

            {/* Right side - Active design option */}
            <div className="w-1/2 flex flex-col bg-background">
              <div className="p-6 border-b">
                <h3 className="text-2xl font-semibold">Single step campaigns</h3>
                <p className="text-muted-foreground mt-1">Quick actions for specific goals</p>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <ActiveComponent />
              </div>
            </div>
          </div>
        </div>

        {/* Full Modal View */}
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="max-w-[90vw] h-[85vh] flex flex-col p-0">
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
                <button className="group relative w-full max-w-md aspect-square rounded-2xl border-2 border-dashed border-primary/30 bg-card hover:border-primary hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center p-8 z-10 shadow-sm">
                  <div className="mb-6 p-8 rounded-full bg-primary/5 ring-1 ring-primary/20 shadow-sm">
                    <FileText className="h-16 w-16 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold mb-3 text-foreground">Multi step campaign</h3>
                  <p className="text-muted-foreground max-w-xs text-lg">
                    Complex sequences with multiple steps and conditions
                  </p>
                  <div className="mt-6">
                    <Badge variant="default" className="bg-primary text-primary-foreground px-4 py-1 text-sm">
                      Most Popular
                    </Badge>
                  </div>
                </button>
              </div>

              {/* Right Column: Single Step with selected design */}
              <div className="w-1/2 flex flex-col bg-background">
                <div className="p-6 border-b">
                  <h3 className="text-2xl font-semibold">Single step campaigns</h3>
                  <p className="text-muted-foreground mt-1">Quick actions for specific goals</p>
                </div>
                <div className="flex-1 overflow-y-auto p-6">
                  <ActiveComponent />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 px-6 py-4 border-t bg-background">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
