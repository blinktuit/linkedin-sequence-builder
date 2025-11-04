import { Clock, Edit2, MoreVertical, AlertCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { CampaignStep } from "@/types/campaign";

interface StepCardProps {
  step: CampaignStep;
  isActive: boolean;
  onClick: () => void;
}

const StepIcon = ({ type }: { type: string }) => {
  const iconClass = "h-4 w-4";
  
  switch (type) {
    case 'start':
      return <div className="text-muted-foreground text-xs">🏁</div>;
    case 'linkedin-invitation':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" fill="currentColor"/>
          <circle cx="4" cy="4" r="2" fill="currentColor"/>
        </svg>
      );
    case 'linkedin-chat':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="4" cy="4" r="1" fill="#0077B5"/>
        </svg>
      );
    case 'linkedin-like-post':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
        </svg>
      );
    case 'wait':
      return <Clock className={iconClass} />;
    case 'condition':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none">
          <path d="M12 2l9 5v6c0 5.5-3.8 10.7-9 12-5.2-1.3-9-6.5-9-12V7l9-5z" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      );
    default:
      return <div className="h-4 w-4 rounded bg-muted" />;
  }
};

export const StepCard = ({ step, isActive, onClick }: StepCardProps) => {
  const hasError = !!step.error;
  const hasWarning = !!step.warning;
  
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative bg-card border rounded-xl p-4 cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]",
        isActive ? "border-primary shadow-md ring-2 ring-primary/20" : "border-border",
        hasError && "border-destructive ring-2 ring-destructive/20"
      )}
    >
      {step.type === 'start' ? (
        <div className="text-center text-sm text-muted-foreground py-3">
          Sequence start
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground">
              {step.type === 'wait' ? 'Wait for' : 'Send immediately'}
            </span>
            
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-muted/50">
                <Edit2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="text-primary flex-shrink-0">
                <StepIcon type={step.type} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm mb-0.5">{step.title}</div>
                {step.subtitle && (
                  <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <svg className="h-3 w-3 flex-shrink-0" viewBox="0 0 24 24" fill="#0077B5">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span className="truncate">{step.subtitle}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {hasError && <AlertCircle className="h-4 w-4 text-destructive" />}
              {hasWarning && <AlertTriangle className="h-4 w-4 text-warning" />}
              <div className="h-9 w-9 rounded-full bg-emerald-500 flex items-center justify-center shadow-sm">
                <span className="text-white text-xs font-semibold">SI</span>
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-muted/50">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {hasError && (
            <div className="mt-2 text-xs text-destructive">{step.error}</div>
          )}

          {step.type === 'ab-test' && (
            <div className="mt-3 space-y-1">
              <div className="flex items-center gap-2 p-2 border border-border rounded bg-background hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="h-6 w-6 rounded border border-border flex items-center justify-center bg-card">
                  <span className="text-xs font-medium">A</span>
                </div>
                <span className="text-xs">Version A</span>
              </div>
              <div className="flex items-center gap-2 p-2 border border-primary/50 rounded bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer">
                <div className="h-6 w-6 rounded border border-primary flex items-center justify-center bg-card">
                  <span className="text-xs font-medium text-primary">B</span>
                </div>
                <span className="text-xs text-primary">Version B</span>
              </div>
            </div>
          )}
        </>
      )}

    </div>
  );
};
