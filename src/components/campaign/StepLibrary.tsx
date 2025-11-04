import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer";
import { MessageSquare, Phone, UserPlus, Eye, ThumbsUp, Sparkles, Lock, X } from "lucide-react";

interface StepLibraryProps {
  open: boolean;
  onClose: () => void;
  onSelectStep: (type: string) => void;
}

const allSteps = [
  // LinkedIn Actions
  { icon: <UserPlus className="h-4 w-4" />, label: "Invitation", subtitle: "Send on LinkedIn", locked: false, type: 'linkedin-invitation' },
  { icon: <Eye className="h-4 w-4" />, label: "Visit profile", subtitle: "Visit profile", locked: false, type: 'linkedin-profile-visit' },
  { icon: <MessageSquare className="h-4 w-4" />, label: "Chat message", subtitle: "Send on LinkedIn", locked: false, type: 'linkedin-chat' },
  { icon: <ThumbsUp className="h-4 w-4" />, label: "Like a post", subtitle: "Like on LinkedIn", locked: false, type: 'linkedin-like-post' },
  { icon: <Phone className="h-4 w-4" />, label: "Voice message", subtitle: "Send on LinkedIn", locked: false, type: 'linkedin-voice', warning: true },
  
  // Integration
  { icon: "🔗", label: "Call an API", subtitle: "Call an API", locked: false, type: 'api-call' },
  { icon: "📤", label: "Send to another campaign", subtitle: "", locked: false, type: 'send-to-campaign' },
  
  // AI
  { icon: <Sparkles className="h-4 w-4" />, label: "AI variable", subtitle: "Automatically fill a variable", locked: false, type: 'ai-generate' },
];

const conditionSteps = [
  { label: "Custom condition", type: 'condition-custom' },
  { label: "Accepted invite", subtitle: "LinkedIn", type: 'condition-accepted-invite' },
];

export const StepLibrary = ({ open, onClose, onSelectStep }: StepLibraryProps) => {
  return (
    <Drawer open={open} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="max-h-[50vh]">
        <DrawerHeader className="relative border-b">
          <DrawerTitle>Add a step</DrawerTitle>
          <DrawerDescription className="sr-only">
            Select a step type to add to your campaign workflow
          </DrawerDescription>
          <DrawerClose className="absolute right-4 top-4">
            <X className="h-4 w-4" />
          </DrawerClose>
        </DrawerHeader>

        <div className="overflow-auto p-4">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* All Steps */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground">Steps</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {allSteps.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (!step.locked && step.type) {
                        onSelectStep(step.type);
                        onClose();
                      }
                    }}
                    disabled={step.locked}
                    className="relative flex flex-col items-start gap-1.5 p-3 bg-white border border-border rounded-lg hover:bg-muted/50 hover:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left"
                  >
                    {step.warning && (
                      <div className="absolute top-2 right-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#f59e0b" strokeWidth="2"/>
                        </svg>
                      </div>
                    )}
                    {step.locked && (
                      <div className="absolute top-2 right-2">
                        <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                    )}
                    <div className="text-primary">
                      {typeof step.icon === 'string' ? step.icon : step.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{step.label}</div>
                      {step.subtitle && <div className="text-xs text-muted-foreground">{step.subtitle}</div>}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Conditions */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground">Conditions</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {conditionSteps.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onSelectStep(step.type);
                      onClose();
                    }}
                    className="flex flex-col items-start gap-1.5 p-3 bg-white border border-border rounded-lg hover:bg-muted/50 hover:border-primary transition-colors text-left"
                  >
                    <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2l9 5v6c0 5.5-3.8 10.7-9 12-5.2-1.3-9-6.5-9-12V7l9-5z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{step.label}</div>
                      {step.subtitle && <div className="text-xs text-muted-foreground">{step.subtitle}</div>}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
