import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar, Building2, Check, X, Info, ChevronLeft, ExternalLink, Sparkles } from "lucide-react";

const TestSingleStepConfig = () => {
  const [eventUrl, setEventUrl] = useState("https://linkedin.com/events/event-name-123456789/");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const isValidUrl = eventUrl.includes("linkedin.com/events/");

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Single Step Config Design Options</h1>
          <p className="text-muted-foreground">Kies een design voor de event inviter / company page configuratie</p>
        </div>

        {/* Option 1: Clean Card Layout */}
        <div className="border rounded-xl overflow-hidden bg-card">
          <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Option 1: Clean Card Layout</h2>
              <p className="text-sm text-muted-foreground">Alles in een nette card met subtiele achtergrond</p>
            </div>
            <Button
              variant={selectedOption === 1 ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedOption(1)}
            >
              {selectedOption === 1 ? <Check className="h-4 w-4 mr-1" /> : null}
              Selecteer
            </Button>
          </div>
          <div className="p-6 bg-background">
            <div className="max-w-lg mx-auto space-y-6">
              {/* Back button */}
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ChevronLeft className="h-4 w-4" />
                Back to campaign types
              </button>

              {/* Main card */}
              <div className="bg-card border rounded-2xl p-6 space-y-6 shadow-sm">
                {/* Header */}
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">LinkedIn Event Inviter</h3>
                    <p className="text-sm text-muted-foreground">Target event attendees</p>
                  </div>
                </div>

                {/* Input */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Event URL</Label>
                  <Input
                    placeholder="https://linkedin.com/events/..."
                    value={eventUrl}
                    className="h-11"
                  />
                  {isValidUrl && (
                    <p className="text-xs text-primary flex items-center gap-1">
                      <Check className="h-3 w-3" />
                      Valid event URL
                    </p>
                  )}
                </div>

                {/* Info box */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <div className="flex gap-3">
                    <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-900 space-y-2">
                      <p>Je kan deze campagne als laatste stap in je multi step campaign zetten</p>
                      <p>Er geldt een limiet van maximaal 1000 uitnodigingen per week</p>
                      <p>Alleen 1e-graads connecties kunnen worden uitgenodigd</p>
                    </div>
                  </div>
                </div>

                {/* Button */}
                <Button className="w-full h-11" disabled={!isValidUrl}>
                  Create Campaign
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Option 2: Split Layout */}
        <div className="border rounded-xl overflow-hidden bg-card">
          <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Option 2: Split Layout met Preview</h2>
              <p className="text-sm text-muted-foreground">Links configuratie, rechts info/preview</p>
            </div>
            <Button
              variant={selectedOption === 2 ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedOption(2)}
            >
              {selectedOption === 2 ? <Check className="h-4 w-4 mr-1" /> : null}
              Selecteer
            </Button>
          </div>
          <div className="p-6 bg-background">
            <div className="max-w-3xl mx-auto">
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>

              <div className="flex gap-6">
                {/* Left: Config */}
                <div className="flex-1 space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Event Inviter</h3>
                      <p className="text-xs text-muted-foreground">Single step campaign</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">LinkedIn Event URL</Label>
                    <div className="relative">
                      <Input
                        placeholder="Paste your event URL..."
                        value={eventUrl}
                        className="pr-10"
                      />
                      <ExternalLink className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                    {isValidUrl && (
                      <p className="text-xs text-primary flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        Valid URL detected
                      </p>
                    )}
                  </div>

                  <Button className="w-full" disabled={!isValidUrl}>
                    Create Campaign
                  </Button>
                </div>

                {/* Right: Info Panel */}
                <div className="w-64 bg-muted/30 rounded-xl p-4 space-y-4">
                  <h4 className="font-medium text-sm">Important Info</h4>
                  <div className="space-y-3 text-xs text-muted-foreground">
                    <div className="flex gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] font-bold text-primary">1</span>
                      </div>
                      <p>Max 1000 invites per week per user</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] font-bold text-primary">2</span>
                      </div>
                      <p>Only 1st degree connections can be invited</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] font-bold text-primary">3</span>
                      </div>
                      <p>Campaign pauses when limit reached</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Option 3: Minimal with Collapsible Info */}
        <div className="border rounded-xl overflow-hidden bg-card">
          <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Option 3: Minimaal met Expandable Info</h2>
              <p className="text-sm text-muted-foreground">Strak en minimalistisch</p>
            </div>
            <Button
              variant={selectedOption === 3 ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedOption(3)}
            >
              {selectedOption === 3 ? <Check className="h-4 w-4 mr-1" /> : null}
              Selecteer
            </Button>
          </div>
          <div className="p-6 bg-background">
            <div className="max-w-md mx-auto space-y-6">
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>

              <div className="text-center space-y-2">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Event Inviter</h3>
                <p className="text-sm text-muted-foreground">Invite your connections to a LinkedIn event</p>
              </div>

              <div className="space-y-3">
                <Input
                  placeholder="Paste LinkedIn event URL"
                  value={eventUrl}
                  className="h-12 text-center"
                />
                {isValidUrl && (
                  <div className="flex items-center justify-center gap-1 text-sm text-primary">
                    <Check className="h-4 w-4" />
                    URL validated
                  </div>
                )}
              </div>

              <details className="group">
                <summary className="flex items-center justify-center gap-2 text-sm text-muted-foreground cursor-pointer hover:text-foreground">
                  <Info className="h-4 w-4" />
                  View limitations & tips
                </summary>
                <div className="mt-3 p-4 bg-muted/50 rounded-lg text-xs text-muted-foreground space-y-2">
                  <p>• Maximum 1000 invitations per week</p>
                  <p>• Only 1st degree connections can be invited</p>
                  <p>• Can be combined with multi-step campaigns</p>
                  <p>• Campaign auto-pauses when limit is reached</p>
                </div>
              </details>

              <Button className="w-full h-12" disabled={!isValidUrl}>
                Create Campaign
              </Button>
            </div>
          </div>
        </div>

        {/* Option 4: Wizard Style with Steps Feel */}
        <div className="border rounded-xl overflow-hidden bg-card">
          <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Option 4: Wizard Style</h2>
              <p className="text-sm text-muted-foreground">Stapsgewijze uitstraling</p>
            </div>
            <Button
              variant={selectedOption === 4 ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedOption(4)}
            >
              {selectedOption === 4 ? <Check className="h-4 w-4 mr-1" /> : null}
              Selecteer
            </Button>
          </div>
          <div className="p-6 bg-gradient-to-b from-muted/30 to-background">
            <div className="max-w-lg mx-auto space-y-6">
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ChevronLeft className="h-4 w-4" />
                Change campaign type
              </button>

              {/* Progress indicator */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <div className="h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold">
                    <Check className="h-3 w-3" />
                  </div>
                  Type
                </span>
                <div className="flex-1 h-px bg-primary" />
                <span className="flex items-center gap-1.5">
                  <div className="h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold">2</div>
                  Configure
                </span>
                <div className="flex-1 h-px bg-muted" />
                <span className="flex items-center gap-1.5 text-muted-foreground/60">
                  <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">3</div>
                  Launch
                </span>
              </div>

              {/* Config card */}
              <div className="bg-card border rounded-xl p-6 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Configure Event Inviter</h3>
                    <p className="text-sm text-muted-foreground">Enter your LinkedIn event URL to get started</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Event URL</Label>
                  <Input
                    placeholder="https://linkedin.com/events/your-event"
                    value={eventUrl}
                    className="h-11"
                  />
                  {isValidUrl ? (
                    <p className="text-xs text-primary flex items-center gap-1">
                      <Check className="h-3 w-3" />
                      Event URL validated
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground">Paste a valid LinkedIn event URL</p>
                  )}
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-xs text-amber-800 flex items-start gap-2">
                    <Sparkles className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <span>Pro tip: You can add this as the final step of a multi-step campaign to maximize engagement!</span>
                  </p>
                </div>
              </div>

              {/* Limits info */}
              <div className="flex gap-4 text-center">
                <div className="flex-1 p-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-bold text-primary">1,000</div>
                  <div className="text-xs text-muted-foreground">Weekly limit</div>
                </div>
                <div className="flex-1 p-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-bold text-primary">1st°</div>
                  <div className="text-xs text-muted-foreground">Connections only</div>
                </div>
                <div className="flex-1 p-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-bold text-primary">Auto</div>
                  <div className="text-xs text-muted-foreground">Pause on limit</div>
                </div>
              </div>

              <Button className="w-full h-11" disabled={!isValidUrl}>
                Continue to Launch
              </Button>
            </div>
          </div>
        </div>

        {/* Option 5: Modern Floating Card */}
        <div className="border rounded-xl overflow-hidden bg-card">
          <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Option 5: Modern Floating Style</h2>
              <p className="text-sm text-muted-foreground">Elevated card met shadow en gradient</p>
            </div>
            <Button
              variant={selectedOption === 5 ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedOption(5)}
            >
              {selectedOption === 5 ? <Check className="h-4 w-4 mr-1" /> : null}
              Selecteer
            </Button>
          </div>
          <div className="p-8 bg-gradient-to-br from-primary/5 via-background to-background min-h-[500px] flex items-center justify-center">
            <div className="w-full max-w-md">
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
                <ChevronLeft className="h-4 w-4" />
                Back to options
              </button>

              <div className="bg-card rounded-2xl shadow-xl border p-8 space-y-6">
                {/* Gradient header */}
                <div className="flex items-center gap-4 pb-6 border-b">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/25">
                    <Calendar className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Event Inviter</h3>
                    <p className="text-sm text-muted-foreground">Single step campaign</p>
                  </div>
                </div>

                {/* Input section */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">LinkedIn Event URL</Label>
                  <div className="relative">
                    <Input
                      placeholder="https://linkedin.com/events/..."
                      value={eventUrl}
                      className="h-12 pr-12 text-base"
                    />
                    {isValidUrl && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="h-3.5 w-3.5 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Info pills */}
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    1000/week limit
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    1st connections
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Auto-pause
                  </span>
                </div>

                {/* CTA */}
                <Button className="w-full h-12 text-base font-medium shadow-lg shadow-primary/25" disabled={!isValidUrl}>
                  Create Campaign
                </Button>
              </div>
            </div>
          </div>
        </div>

        {selectedOption && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-card border rounded-full px-6 py-3 shadow-lg flex items-center gap-4">
            <span className="text-sm">
              <strong>Option {selectedOption}</strong> geselecteerd
            </span>
            <Button size="sm">Toepassen</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestSingleStepConfig;
