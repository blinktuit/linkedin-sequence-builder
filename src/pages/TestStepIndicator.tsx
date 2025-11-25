import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, FileText, Zap, Search } from "lucide-react";

const TestStepIndicator = () => {
  const [activeStep, setActiveStep] = useState(1);
  const totalSteps = 2;
  const steps = [
    { number: 1, label: "Campaign type" },
    { number: 2, label: "Template" }
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Step Indicator Options - In Modal Context</h1>
          <p className="text-muted-foreground">Kies een subtiele step indicator stijl voor de campaign modal</p>

          {/* Step toggle */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <span className="text-sm text-muted-foreground">Preview step:</span>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={activeStep === 1 ? "default" : "outline"}
                onClick={() => setActiveStep(1)}
              >
                Step 1
              </Button>
              <Button
                size="sm"
                variant={activeStep === 2 ? "default" : "outline"}
                onClick={() => setActiveStep(2)}
              >
                Step 2
              </Button>
            </div>
          </div>
        </div>

        {/* Option 1: Indicator bar at top of modal content */}
        <div className="border rounded-xl overflow-hidden bg-card">
          <div className="p-4 border-b bg-muted/30">
            <h2 className="text-lg font-semibold">Option 1: Top Progress Bar</h2>
            <p className="text-sm text-muted-foreground">Subtiele balk bovenaan de modal content</p>
          </div>
          <div className="bg-background">
            {/* Step indicator bar */}
            <div className="px-6 pt-6 pb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300 rounded-full"
                    style={{ width: `${(activeStep / totalSteps) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  Step {activeStep} of {totalSteps}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {activeStep === 1 ? "Choose your campaign type" : "Select a template or start from scratch"}
              </p>
            </div>
            {/* Mock content */}
            <div className="px-6 pb-6">
              <div className="h-48 border-2 border-dashed border-muted rounded-xl flex items-center justify-center text-muted-foreground">
                {activeStep === 1 ? "Campaign type selection" : "Template selection"}
              </div>
            </div>
          </div>
        </div>

        {/* Option 2: Breadcrumb style above content */}
        <div className="border rounded-xl overflow-hidden bg-card">
          <div className="p-4 border-b bg-muted/30">
            <h2 className="text-lg font-semibold">Option 2: Breadcrumb Steps</h2>
            <p className="text-sm text-muted-foreground">Klikbare stappen boven de content</p>
          </div>
          <div className="bg-background">
            {/* Breadcrumb steps */}
            <div className="px-6 pt-6 pb-4">
              <div className="flex items-center gap-3">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center gap-3">
                    <button
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                        step.number === activeStep
                          ? 'bg-primary/10 text-primary'
                          : step.number < activeStep
                            ? 'text-primary'
                            : 'text-muted-foreground'
                      }`}
                    >
                      <span className={`flex items-center justify-center w-5 h-5 rounded-full text-xs font-medium ${
                        step.number < activeStep
                          ? 'bg-primary text-primary-foreground'
                          : step.number === activeStep
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                      }`}>
                        {step.number < activeStep ? <Check className="h-3 w-3" /> : step.number}
                      </span>
                      <span className="text-sm font-medium">{step.label}</span>
                    </button>
                    {index < steps.length - 1 && (
                      <div className={`h-px w-8 ${step.number < activeStep ? 'bg-primary' : 'bg-muted'}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* Mock content */}
            <div className="px-6 pb-6">
              <div className="h-48 border-2 border-dashed border-muted rounded-xl flex items-center justify-center text-muted-foreground">
                {activeStep === 1 ? "Campaign type selection" : "Template selection"}
              </div>
            </div>
          </div>
        </div>

        {/* Option 3: Floating pill indicator */}
        <div className="border rounded-xl overflow-hidden bg-card">
          <div className="p-4 border-b bg-muted/30">
            <h2 className="text-lg font-semibold">Option 3: Centered Pill</h2>
            <p className="text-sm text-muted-foreground">Gecentreerde pill indicator</p>
          </div>
          <div className="bg-background">
            {/* Centered pill */}
            <div className="px-6 pt-6 pb-4 flex justify-center">
              <div className="inline-flex items-center bg-muted rounded-full p-1 gap-1">
                {steps.map((step) => (
                  <div
                    key={step.number}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                      step.number === activeStep
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : step.number < activeStep
                          ? 'text-primary'
                          : 'text-muted-foreground'
                    }`}
                  >
                    {step.number < activeStep ? (
                      <span className="flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5" />
                        {step.label}
                      </span>
                    ) : (
                      step.label
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* Mock content */}
            <div className="px-6 pb-6">
              <div className="h-48 border-2 border-dashed border-muted rounded-xl flex items-center justify-center text-muted-foreground">
                {activeStep === 1 ? "Campaign type selection" : "Template selection"}
              </div>
            </div>
          </div>
        </div>

        {/* Option 4: Minimal dots with label */}
        <div className="border rounded-xl overflow-hidden bg-card">
          <div className="p-4 border-b bg-muted/30">
            <h2 className="text-lg font-semibold">Option 4: Dots with Current Step Label</h2>
            <p className="text-sm text-muted-foreground">Minimalistische dots met huidige stap tekst</p>
          </div>
          <div className="bg-background">
            {/* Dots with label */}
            <div className="px-6 pt-6 pb-4 flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center">
                    <div
                      className={`h-2.5 w-2.5 rounded-full transition-colors ${
                        step.number <= activeStep ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                    {index < steps.length - 1 && (
                      <div className={`h-px w-10 mx-1.5 ${step.number < activeStep ? 'bg-primary' : 'bg-muted'}`} />
                    )}
                  </div>
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">
                {steps.find(s => s.number === activeStep)?.label}
              </span>
            </div>
            {/* Mock content */}
            <div className="px-6 pb-6">
              <div className="h-48 border-2 border-dashed border-muted rounded-xl flex items-center justify-center text-muted-foreground">
                {activeStep === 1 ? "Campaign type selection" : "Template selection"}
              </div>
            </div>
          </div>
        </div>

        {/* Option 5: Side vertical stepper */}
        <div className="border rounded-xl overflow-hidden bg-card">
          <div className="p-4 border-b bg-muted/30">
            <h2 className="text-lg font-semibold">Option 5: Compact Header with Context</h2>
            <p className="text-sm text-muted-foreground">Header met stap info en beschrijving</p>
          </div>
          <div className="bg-background">
            {/* Header with step info */}
            <div className="px-6 pt-6 pb-4 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <span>Step {activeStep} of {totalSteps}</span>
                    <span>•</span>
                    <span>{steps.find(s => s.number === activeStep)?.label}</span>
                  </div>
                  <h3 className="text-xl font-semibold">
                    {activeStep === 1 ? "What type of campaign do you want to create?" : "How do you want to start?"}
                  </h3>
                </div>
                <div className="flex items-center gap-1">
                  {steps.map((step) => (
                    <div
                      key={step.number}
                      className={`h-1.5 w-8 rounded-full transition-colors ${
                        step.number <= activeStep ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* Mock content */}
            <div className="p-6">
              <div className="h-48 border-2 border-dashed border-muted rounded-xl flex items-center justify-center text-muted-foreground">
                {activeStep === 1 ? "Campaign type selection" : "Template selection"}
              </div>
            </div>
          </div>
        </div>

        {/* Full modal preview */}
        <div className="border-2 border-dashed border-primary/30 rounded-xl p-6 bg-primary/5 space-y-6">
          <h2 className="text-xl font-semibold text-center">Full Modal Preview - Option 2 (Breadcrumb)</h2>
          <p className="text-sm text-muted-foreground text-center">Hoe het eruit zou zien in de echte modal</p>

          {/* Mock full modal */}
          <div className="max-w-4xl mx-auto border rounded-2xl bg-card shadow-2xl overflow-hidden">
            {/* Modal content */}
            <div className="flex h-[500px]">
              {/* Left side - Multi step */}
              <div className="w-1/2 p-6 border-r bg-muted/5 flex flex-col">
                {/* Step indicator at top */}
                <div className="mb-6">
                  <div className="flex items-center gap-3">
                    {steps.map((step, index) => (
                      <div key={step.number} className="flex items-center gap-3">
                        <div
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                            step.number === activeStep
                              ? 'bg-primary/10 text-primary'
                              : step.number < activeStep
                                ? 'text-primary'
                                : 'text-muted-foreground'
                          }`}
                        >
                          <span className={`flex items-center justify-center w-5 h-5 rounded-full text-xs font-medium ${
                            step.number < activeStep
                              ? 'bg-primary text-primary-foreground'
                              : step.number === activeStep
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground'
                          }`}>
                            {step.number < activeStep ? <Check className="h-3 w-3" /> : step.number}
                          </span>
                          <span className="text-sm font-medium">{step.label}</span>
                        </div>
                        {index < steps.length - 1 && (
                          <div className={`h-px w-6 ${step.number < activeStep ? 'bg-primary' : 'bg-muted'}`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex items-center justify-center">
                  {activeStep === 1 ? (
                    <div className="text-center p-8 border-2 border-dashed border-primary/30 rounded-2xl w-full max-w-sm">
                      <div className="mb-4 p-6 rounded-full bg-primary/5 inline-block">
                        <FileText className="h-12 w-12 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Multi step campaign</h3>
                      <p className="text-muted-foreground text-sm">Complex sequences with multiple steps</p>
                    </div>
                  ) : (
                    <div className="text-center p-8 border-2 border-dashed border-primary/30 rounded-2xl w-full max-w-sm">
                      <div className="mb-4 p-6 rounded-full bg-primary/5 inline-block">
                        <Zap className="h-12 w-12 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Start from scratch</h3>
                      <p className="text-muted-foreground text-sm">Build your campaign step by step</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right side */}
              <div className="w-1/2 p-6 flex flex-col">
                <h3 className="text-xl font-semibold mb-4">
                  {activeStep === 1 ? "Single step campaigns" : "Pick a template"}
                </h3>
                {activeStep === 1 ? (
                  <div className="space-y-3">
                    <div className="p-4 border rounded-xl hover:border-primary/50 cursor-pointer">
                      <div className="font-medium">LinkedIn event inviter</div>
                      <div className="text-sm text-muted-foreground">Target event attendees</div>
                    </div>
                    <div className="p-4 border rounded-xl hover:border-primary/50 cursor-pointer">
                      <div className="font-medium">Invite to follow company page</div>
                      <div className="text-sm text-muted-foreground">Get company page followers</div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input className="w-full pl-9 pr-4 py-2 border rounded-lg" placeholder="Search templates..." />
                    </div>
                    <div className="p-4 border rounded-xl hover:border-primary/50 cursor-pointer">
                      <div className="font-medium">Cold Outreach Sequence</div>
                      <div className="text-sm text-muted-foreground">5 steps • 2 days ago</div>
                    </div>
                    <div className="p-4 border rounded-xl hover:border-primary/50 cursor-pointer">
                      <div className="font-medium">Follow-up Campaign</div>
                      <div className="text-sm text-muted-foreground">3 steps • 1 week ago</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal footer */}
            <div className="border-t px-6 py-4 flex justify-between bg-background">
              <Button variant="outline" disabled={activeStep === 1}>Back</Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestStepIndicator;
