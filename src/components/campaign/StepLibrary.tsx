import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Phone, UserPlus, Eye, ThumbsUp, Sparkles, Lock } from "lucide-react";

interface StepLibraryProps {
  open: boolean;
  onClose: () => void;
  onSelectStep: (type: string) => void;
}

const stepCategories = {
  automatic: [
    { icon: "📧", label: "Email", subtitle: "Send automatic email", locked: false },
    { icon: "💬", label: "WhatsApp", subtitle: "Send WhatsApp message", locked: true },
    { icon: <MessageSquare className="h-4 w-4" />, label: "Chat message", subtitle: "Send on LinkedIn", locked: false, type: 'linkedin-chat' },
    { icon: <Phone className="h-4 w-4" />, label: "Voice message", subtitle: "Send on LinkedIn", locked: false, type: 'linkedin-voice', warning: true },
    { icon: <Phone className="h-4 w-4 text-purple-500" />, label: "AI Voice message", subtitle: "Send on LinkedIn", locked: false, warning: true },
    { icon: <UserPlus className="h-4 w-4" />, label: "Invitation", subtitle: "Send on LinkedIn", locked: false, type: 'linkedin-invitation' },
    { icon: <Eye className="h-4 w-4" />, label: "Visit profile", subtitle: "Visit profile", locked: false, type: 'linkedin-profile-visit' },
  ],
  manual: [
    { icon: "📞", label: "Call", subtitle: "Create a task", locked: false },
    { icon: "📋", label: "Manual task", subtitle: "Create a task", locked: false },
  ],
  other: [
    { icon: "🔗", label: "Call an API", subtitle: "Call an API", locked: false, type: 'api-call' },
    { icon: "📤", label: "Send to another campaign", subtitle: "", locked: false, type: 'send-to-campaign' },
  ],
  ai: [
    { icon: <Sparkles className="h-4 w-4" />, label: "AI variable", subtitle: "Automatically fill a variable", locked: false, type: 'ai-generate' },
  ],
};

export const StepLibrary = ({ open, onClose, onSelectStep }: StepLibraryProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="sr-only">Add Step</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="steps" className="flex-1 flex flex-col">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="steps">Steps</TabsTrigger>
            <TabsTrigger value="conditions">Conditions</TabsTrigger>
          </TabsList>

          <TabsContent value="steps" className="flex-1 overflow-auto mt-4">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Automatic Steps</h3>
                <div className="grid grid-cols-3 gap-3">
                  {stepCategories.automatic.map((step, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (!step.locked && step.type) {
                          onSelectStep(step.type);
                          onClose();
                        }
                      }}
                      disabled={step.locked}
                      className="relative flex flex-col items-center gap-2 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left"
                    >
                      {step.warning && (
                        <div className="absolute top-2 right-2">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#f59e0b" strokeWidth="2"/>
                          </svg>
                        </div>
                      )}
                      {step.locked && (
                        <div className="absolute top-2 right-2">
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                      <div className="text-primary text-xl">
                        {typeof step.icon === 'string' ? step.icon : step.icon}
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-sm">{step.label}</div>
                        <div className="text-xs text-muted-foreground">{step.subtitle}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Manual execution</h3>
                <div className="grid grid-cols-3 gap-3">
                  {stepCategories.manual.map((step, idx) => (
                    <button
                      key={idx}
                      disabled
                      className="flex flex-col items-center gap-2 p-4 border border-border rounded-lg opacity-50 cursor-not-allowed text-left"
                    >
                      <div className="text-xl">{step.icon}</div>
                      <div className="text-center">
                        <div className="font-medium text-sm">{step.label}</div>
                        <div className="text-xs text-muted-foreground">{step.subtitle}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Other steps</h3>
                <div className="grid grid-cols-3 gap-3">
                  {stepCategories.other.map((step, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (!step.locked && step.type) {
                          onSelectStep(step.type);
                          onClose();
                        }
                      }}
                      className="flex flex-col items-center gap-2 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors text-left"
                    >
                      <div className="text-xl">{step.icon}</div>
                      <div className="text-center">
                        <div className="font-medium text-sm">{step.label}</div>
                        <div className="text-xs text-muted-foreground">{step.subtitle}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">AI step</h3>
                <div className="grid grid-cols-3 gap-3">
                  {stepCategories.ai.map((step, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if ('type' in step && step.type) {
                          onSelectStep(step.type);
                          onClose();
                        }
                      }}
                      className="flex flex-col items-center gap-2 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors text-left"
                    >
                      <div className="text-primary">{step.icon}</div>
                      <div className="text-center">
                        <div className="font-medium text-sm">{step.label}</div>
                        <div className="text-xs text-muted-foreground">{step.subtitle}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="conditions" className="flex-1 overflow-auto mt-4">
            <p className="text-sm text-muted-foreground mb-4">
              Add conditions to your sequence and create decision branches to get the best results possible
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Lead information</h3>
                <div className="grid grid-cols-3 gap-3">
                  <button className="flex flex-col items-center gap-2 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2l9 5v6c0 5.5-3.8 10.7-9 12-5.2-1.3-9-6.5-9-12V7l9-5z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <div className="text-center">
                      <div className="font-medium text-sm">Has email address</div>
                    </div>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
                    </svg>
                    <div className="text-center">
                      <div className="font-medium text-sm">Has LinkedIn URL</div>
                      <div className="text-xs text-muted-foreground">LinkedIn</div>
                    </div>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2l9 5v6c0 5.5-3.8 10.7-9 12-5.2-1.3-9-6.5-9-12V7l9-5z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <div className="text-center">
                      <div className="font-medium text-sm">Custom condition</div>
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Lead actions</h3>
                <div className="grid grid-cols-3 gap-3">
                  <button className="flex flex-col items-center gap-2 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2l9 5v6c0 5.5-3.8 10.7-9 12-5.2-1.3-9-6.5-9-12V7l9-5z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <div className="text-center">
                      <div className="font-medium text-sm">Opened email</div>
                    </div>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2l9 5v6c0 5.5-3.8 10.7-9 12-5.2-1.3-9-6.5-9-12V7l9-5z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <div className="text-center">
                      <div className="font-medium text-sm">Clicked on link in email</div>
                    </div>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
                    </svg>
                    <div className="text-center">
                      <div className="font-medium text-sm">Accepted invite</div>
                      <div className="text-xs text-muted-foreground">LinkedIn</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
