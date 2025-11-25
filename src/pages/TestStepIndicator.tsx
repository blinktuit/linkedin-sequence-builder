import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const TestStepIndicator = () => {
  const [activeStep, setActiveStep] = useState(1);
  const totalSteps = 2;
  const steps = [
    { number: 1, label: "Campaign type" },
    { number: 2, label: "Template" }
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Step Indicator Options</h1>
          <p className="text-muted-foreground">Choose a subtle step indicator style for the campaign modal</p>

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

        {/* Option 1: Minimal dots */}
        <div className="border rounded-xl p-6 bg-card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Option 1: Minimal Dots</h2>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">Subtle</span>
          </div>
          <div className="border rounded-lg p-4 bg-background">
            <div className="flex items-center justify-center gap-2">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`h-2 w-2 rounded-full transition-colors ${
                      step.number < activeStep
                        ? 'bg-primary'
                        : step.number === activeStep
                          ? 'bg-primary'
                          : 'bg-muted-foreground/30'
                    }`}
                  />
                  {index < steps.length - 1 && (
                    <div className={`h-px w-8 mx-1 ${step.number < activeStep ? 'bg-primary' : 'bg-muted-foreground/20'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Simple dots connected by lines. Very minimal and unobtrusive.</p>
        </div>

        {/* Option 2: Progress bar with step count */}
        <div className="border rounded-xl p-6 bg-card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Option 2: Progress Bar with Text</h2>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">Clean</span>
          </div>
          <div className="border rounded-lg p-4 bg-background">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300 rounded-full"
                  style={{ width: `${(activeStep / totalSteps) * 100}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {activeStep} of {totalSteps}
              </span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Simple progress bar with step counter. Shows progress clearly.</p>
        </div>

        {/* Option 3: Numbered steps inline */}
        <div className="border rounded-xl p-6 bg-card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Option 3: Numbered Steps</h2>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">Informative</span>
          </div>
          <div className="border rounded-lg p-4 bg-background">
            <div className="flex items-center justify-center gap-6">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                        step.number < activeStep
                          ? 'bg-primary text-primary-foreground'
                          : step.number === activeStep
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {step.number < activeStep ? <Check className="h-3 w-3" /> : step.number}
                    </div>
                    <span className={`text-sm ${step.number === activeStep ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-px w-12 ${step.number < activeStep ? 'bg-primary' : 'bg-muted-foreground/20'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Shows step numbers with labels and connecting lines.</p>
        </div>

        {/* Option 4: Pills/tabs style */}
        <div className="border rounded-xl p-6 bg-card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Option 4: Pill Steps</h2>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">Modern</span>
          </div>
          <div className="border rounded-lg p-4 bg-background">
            <div className="flex items-center justify-center">
              <div className="inline-flex items-center bg-muted rounded-full p-1 gap-1">
                {steps.map((step) => (
                  <div
                    key={step.number}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                      step.number === activeStep
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : step.number < activeStep
                          ? 'text-primary'
                          : 'text-muted-foreground'
                    }`}
                  >
                    {step.number < activeStep ? (
                      <span className="flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        {step.label}
                      </span>
                    ) : (
                      step.label
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Tab-style pills that highlight the current step.</p>
        </div>

        {/* Option 5: Breadcrumb style */}
        <div className="border rounded-xl p-6 bg-card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Option 5: Breadcrumb Style</h2>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">Compact</span>
          </div>
          <div className="border rounded-lg p-4 bg-background">
            <div className="flex items-center justify-center gap-2 text-sm">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center gap-2">
                  <span
                    className={`${
                      step.number === activeStep
                        ? 'text-foreground font-medium'
                        : step.number < activeStep
                          ? 'text-primary'
                          : 'text-muted-foreground'
                    }`}
                  >
                    {step.number < activeStep && <Check className="h-3 w-3 inline mr-1" />}
                    {step.label}
                  </span>
                  {index < steps.length - 1 && (
                    <span className="text-muted-foreground/40">/</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Breadcrumb-style navigation, very compact and familiar.</p>
        </div>

        {/* How it would look in context */}
        <div className="border-2 border-dashed border-primary/30 rounded-xl p-6 bg-primary/5 space-y-4">
          <h2 className="text-lg font-semibold text-center">Preview: How it looks in modal header</h2>
          <p className="text-sm text-muted-foreground text-center mb-6">Each option shown in context of a modal header</p>

          <div className="space-y-4">
            {/* Mock modal header with Option 1 */}
            <div className="border rounded-lg bg-card overflow-hidden">
              <div className="border-b px-6 py-4 flex items-center justify-between">
                <h3 className="font-semibold">Create Campaign</h3>
                <div className="flex items-center gap-2">
                  {steps.map((step, index) => (
                    <div key={step.number} className="flex items-center">
                      <div
                        className={`h-2 w-2 rounded-full transition-colors ${
                          step.number <= activeStep ? 'bg-primary' : 'bg-muted-foreground/30'
                        }`}
                      />
                      {index < steps.length - 1 && (
                        <div className={`h-px w-6 mx-1 ${step.number < activeStep ? 'bg-primary' : 'bg-muted-foreground/20'}`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 h-24 flex items-center justify-center text-muted-foreground text-sm">
                Option 1: Minimal Dots (in header)
              </div>
            </div>

            {/* Mock modal header with Option 2 */}
            <div className="border rounded-lg bg-card overflow-hidden">
              <div className="border-b px-6 py-4 flex items-center justify-between">
                <h3 className="font-semibold">Create Campaign</h3>
                <div className="flex items-center gap-3 w-32">
                  <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300 rounded-full"
                      style={{ width: `${(activeStep / totalSteps) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {activeStep}/{totalSteps}
                  </span>
                </div>
              </div>
              <div className="p-6 h-24 flex items-center justify-center text-muted-foreground text-sm">
                Option 2: Progress Bar (in header)
              </div>
            </div>

            {/* Mock modal header with Option 4 */}
            <div className="border rounded-lg bg-card overflow-hidden">
              <div className="border-b px-6 py-4 flex items-center justify-between">
                <h3 className="font-semibold">Create Campaign</h3>
                <div className="inline-flex items-center bg-muted rounded-full p-0.5 gap-0.5">
                  {steps.map((step) => (
                    <div
                      key={step.number}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                        step.number === activeStep
                          ? 'bg-primary text-primary-foreground'
                          : step.number < activeStep
                            ? 'text-primary'
                            : 'text-muted-foreground'
                      }`}
                    >
                      {step.number < activeStep ? <Check className="h-3 w-3" /> : step.number}
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 h-24 flex items-center justify-center text-muted-foreground text-sm">
                Option 4: Pill Steps (in header, numbers only)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestStepIndicator;
