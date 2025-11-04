import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { MessageSquare, Phone, UserPlus, Eye, ThumbsUp, Sparkles, Lock, X } from "lucide-react";

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
    <Drawer open={open} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="relative border-b">
          <DrawerTitle>Add a step</DrawerTitle>
          <DrawerClose className="absolute right-4 top-4">
            <X className="h-4 w-4" />
          </DrawerClose>
        </DrawerHeader>

        <div className="overflow-auto p-6">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Automatic Steps */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground">Automatic Steps</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
                    className="relative flex flex-col items-start gap-2 p-4 border border-border rounded-lg hover:bg-accent hover:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left"
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
                    <div className="flex-1">
                      <div className="font-medium text-sm">{step.label}</div>
                      <div className="text-xs text-muted-foreground">{step.subtitle}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Manual execution */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground">Manual execution</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {stepCategories.manual.map((step, idx) => (
                  <button
                    key={idx}
                    disabled
                    className="flex flex-col items-start gap-2 p-4 border border-border rounded-lg opacity-50 cursor-not-allowed text-left"
                  >
                    <div className="text-xl">{step.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{step.label}</div>
                      <div className="text-xs text-muted-foreground">{step.subtitle}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Other Steps */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground">Other steps</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {stepCategories.other.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (!step.locked && step.type) {
                        onSelectStep(step.type);
                        onClose();
                      }
                    }}
                    className="flex flex-col items-start gap-2 p-4 border border-border rounded-lg hover:bg-accent hover:border-primary transition-colors text-left"
                  >
                    <div className="text-xl">{step.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{step.label}</div>
                      <div className="text-xs text-muted-foreground">{step.subtitle}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Steps */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground">AI step</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {stepCategories.ai.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if ('type' in step && step.type) {
                        onSelectStep(step.type);
                        onClose();
                      }
                    }}
                    className="flex flex-col items-start gap-2 p-4 border border-border rounded-lg hover:bg-accent hover:border-primary transition-colors text-left"
                  >
                    <div className="text-primary">{step.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{step.label}</div>
                      <div className="text-xs text-muted-foreground">{step.subtitle}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Conditions */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground">Conditions</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground mb-3">Lead information</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <button 
                      onClick={() => {
                        onSelectStep('condition-lead-info');
                        onClose();
                      }}
                      className="flex flex-col items-start gap-2 p-4 border border-border rounded-lg hover:bg-accent hover:border-primary transition-colors text-left"
                    >
                      <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2l9 5v6c0 5.5-3.8 10.7-9 12-5.2-1.3-9-6.5-9-12V7l9-5z" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <div className="flex-1">
                        <div className="font-medium text-sm">Has email address</div>
                      </div>
                    </button>
                    <button 
                      onClick={() => {
                        onSelectStep('condition-linkedin-url');
                        onClose();
                      }}
                      className="flex flex-col items-start gap-2 p-4 border border-border rounded-lg hover:bg-accent hover:border-primary transition-colors text-left"
                    >
                      <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
                      </svg>
                      <div className="flex-1">
                        <div className="font-medium text-sm">Has LinkedIn URL</div>
                        <div className="text-xs text-muted-foreground">LinkedIn</div>
                      </div>
                    </button>
                    <button 
                      onClick={() => {
                        onSelectStep('condition-custom');
                        onClose();
                      }}
                      className="flex flex-col items-start gap-2 p-4 border border-border rounded-lg hover:bg-accent hover:border-primary transition-colors text-left"
                    >
                      <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2l9 5v6c0 5.5-3.8 10.7-9 12-5.2-1.3-9-6.5-9-12V7l9-5z" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <div className="flex-1">
                        <div className="font-medium text-sm">Custom condition</div>
                      </div>
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-medium text-muted-foreground mb-3">Lead actions</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <button 
                      onClick={() => {
                        onSelectStep('condition-opened-email');
                        onClose();
                      }}
                      className="flex flex-col items-start gap-2 p-4 border border-border rounded-lg hover:bg-accent hover:border-primary transition-colors text-left"
                    >
                      <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2l9 5v6c0 5.5-3.8 10.7-9 12-5.2-1.3-9-6.5-9-12V7l9-5z" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <div className="flex-1">
                        <div className="font-medium text-sm">Opened email</div>
                      </div>
                    </button>
                    <button 
                      onClick={() => {
                        onSelectStep('condition-clicked-link');
                        onClose();
                      }}
                      className="flex flex-col items-start gap-2 p-4 border border-border rounded-lg hover:bg-accent hover:border-primary transition-colors text-left"
                    >
                      <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2l9 5v6c0 5.5-3.8 10.7-9 12-5.2-1.3-9-6.5-9-12V7l9-5z" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <div className="flex-1">
                        <div className="font-medium text-sm">Clicked on link in email</div>
                      </div>
                    </button>
                    <button 
                      onClick={() => {
                        onSelectStep('condition-accepted-invite');
                        onClose();
                      }}
                      className="flex flex-col items-start gap-2 p-4 border border-border rounded-lg hover:bg-accent hover:border-primary transition-colors text-left"
                    >
                      <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
                      </svg>
                      <div className="flex-1">
                        <div className="font-medium text-sm">Accepted invite</div>
                        <div className="text-xs text-muted-foreground">LinkedIn</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
