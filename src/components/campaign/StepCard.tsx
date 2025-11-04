import { useState } from "react";
import { Clock, Edit2, MoreVertical, AlertCircle, AlertTriangle, Copy, TestTube2, Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { CampaignStep } from "@/types/campaign";

interface StepCardProps {
  step: CampaignStep;
  isActive: boolean;
  onClick: () => void;
  onDuplicate?: () => void;
  onABTest?: () => void;
  onDelete?: () => void;
  onVersionClick?: (version: 'A' | 'B') => void;
  activeVersion?: 'A' | 'B';
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

export const StepCard = ({ step, isActive, onClick, onDuplicate, onABTest, onDelete, onVersionClick, activeVersion = 'A' }: StepCardProps) => {
  const hasError = !!step.error;
  const hasWarning = !!step.warning;
  const [delayOpen, setDelayOpen] = useState(false);
  const [waitAmount, setWaitAmount] = useState(1);
  const [waitUnit, setWaitUnit] = useState('day');
  
  return (
    <div
      onClick={step.type === 'start' ? undefined : onClick}
      className={cn(
        "relative bg-card border rounded-lg p-3 transition-all",
        step.type === 'start' 
          ? "cursor-default" 
          : "cursor-pointer hover:shadow-md hover:scale-[1.01]",
        isActive && step.type !== 'start' ? "border-primary shadow-md ring-2 ring-primary/20" : "border-border",
        hasError && "border-destructive ring-2 ring-destructive/20"
      )}
    >
      {step.type === 'start' ? (
        <div className="text-center text-xs text-muted-foreground py-2">
          Start
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-2">
            <Popover open={delayOpen} onOpenChange={setDelayOpen}>
              <PopoverTrigger asChild>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setDelayOpen(true);
                  }}
                  className="text-[10px] font-medium uppercase tracking-wide hover:opacity-80 transition-opacity text-left"
                >
                  <span className="text-muted-foreground">
                    {step.type === 'wait' ? 'Wait for ' : 'Send '}
                  </span>
                  <span className="text-primary cursor-pointer">
                    {step.type === 'wait' ? `${waitAmount} ${waitUnit}${waitAmount > 1 ? 's' : ''}` : 'immediately'}
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-3" align="start" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground">Wait</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 flex-shrink-0"
                    onClick={() => setWaitAmount(Math.max(1, waitAmount - 1))}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  
                  <div className="flex items-center justify-center border rounded-md h-7 w-12 flex-shrink-0">
                    <span className="text-sm font-medium">{waitAmount}</span>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 flex-shrink-0"
                    onClick={() => setWaitAmount(waitAmount + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                  
                  <Select value={waitUnit} onValueChange={setWaitUnit}>
                    <SelectTrigger className="w-20 h-7 text-xs flex-shrink-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minute">min</SelectItem>
                      <SelectItem value="hour">hour</SelectItem>
                      <SelectItem value="day">day</SelectItem>
                      <SelectItem value="week">week</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive hover:text-destructive flex-shrink-0 ml-auto"
                    onClick={() => {
                      setDelayOpen(false);
                      setWaitAmount(0);
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            
            <div className="flex items-center gap-0.5">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 hover:bg-muted/50"
                onClick={(e) => {
                  e.stopPropagation();
                  // TODO: Implement edit functionality
                }}
              >
                <Edit2 className="h-3 w-3" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 hover:bg-destructive/10 hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.();
                }}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="text-primary flex-shrink-0">
                <StepIcon type={step.type} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm leading-tight mb-0.5">{step.title}</div>
                {step.subtitle && (
                  <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <svg className="h-2.5 w-2.5 flex-shrink-0" viewBox="0 0 24 24" fill="#0077B5">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span className="truncate">{step.subtitle}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1 flex-shrink-0">
              {hasError && <AlertCircle className="h-3.5 w-3.5 text-destructive" />}
              {hasWarning && <AlertTriangle className="h-3.5 w-3.5 text-warning" />}
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-muted/50">
                    <MoreVertical className="h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    onDuplicate?.();
                  }}>
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    onABTest?.();
                  }}>
                    <TestTube2 className="h-4 w-4 mr-2" />
                    A/B test this step
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {hasError && (
            <div className="mt-1.5 text-[11px] text-destructive">{step.error}</div>
          )}

          {step.type === 'ab-test' && (
            <div className="mt-2 space-y-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onVersionClick?.('A');
                }}
                className={cn(
                  "w-full flex items-center justify-between gap-1.5 p-2 border rounded bg-background transition-colors text-left",
                  activeVersion === 'A' 
                    ? "border-primary bg-primary/5 hover:bg-primary/10" 
                    : "border-border hover:bg-muted/50"
                )}
              >
                <div className="flex items-center gap-1.5 flex-1 min-w-0">
                  <div className={cn(
                    "h-5 w-5 rounded border flex items-center justify-center bg-card flex-shrink-0",
                    activeVersion === 'A' ? "border-primary" : "border-border"
                  )}>
                    <span className={cn(
                      "text-[10px] font-medium",
                      activeVersion === 'A' && "text-primary"
                    )}>A</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={cn(
                      "text-[11px] font-medium",
                      activeVersion === 'A' && "text-primary"
                    )}>Version A</div>
                    {step.versionA?.error && (
                      <div className="text-[10px] text-destructive truncate">{step.versionA.error}</div>
                    )}
                  </div>
                </div>
                <MoreVertical className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onVersionClick?.('B');
                }}
                className={cn(
                  "w-full flex items-center justify-between gap-1.5 p-2 border rounded bg-background transition-colors text-left",
                  activeVersion === 'B' 
                    ? "border-primary bg-primary/5 hover:bg-primary/10" 
                    : "border-border hover:bg-muted/50"
                )}
              >
                <div className="flex items-center gap-1.5 flex-1 min-w-0">
                  <div className={cn(
                    "h-5 w-5 rounded border flex items-center justify-center bg-card flex-shrink-0",
                    activeVersion === 'B' ? "border-primary" : "border-border"
                  )}>
                    <span className={cn(
                      "text-[10px] font-medium",
                      activeVersion === 'B' && "text-primary"
                    )}>B</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={cn(
                      "text-[11px] font-medium",
                      activeVersion === 'B' && "text-primary"
                    )}>Version B</div>
                    {step.versionB?.error && (
                      <div className="text-[10px] text-destructive truncate">{step.versionB.error}</div>
                    )}
                  </div>
                </div>
                <MoreVertical className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
              </button>
            </div>
          )}
        </>
      )}

    </div>
  );
};
