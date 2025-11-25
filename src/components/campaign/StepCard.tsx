import { useState } from "react";
import { Clock, Edit2, MoreVertical, AlertCircle, AlertTriangle, Copy, TestTube2, Trash2, Plus, Minus, Eye, Code, Send, Phone, Sparkles, Brain, Tags, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
const StepIcon = ({
  type,
  isActive = false
}: {
  type: string;
  isActive?: boolean;
}) => {
  const iconClass = "h-4 w-4";

  // Check if it's a condition type
  if (type.startsWith('condition-')) {
    return <svg className={iconClass} viewBox="0 0 24 24" fill="none">
      <path d="M12 3v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 11l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 11l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="6" cy="17" r="1.5" fill="currentColor" />
      <circle cx="18" cy="17" r="1.5" fill="currentColor" />
    </svg>;
  }

  switch (type) {
    case 'start':
      return <div className="text-muted-foreground text-xs">🏁</div>;
    case 'linkedin-invitation':
      return <svg className={iconClass} viewBox="0 0 24 24" fill="none">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" fill="currentColor" />
          <circle cx="4" cy="4" r="2" fill="currentColor" />
        </svg>;
    case 'linkedin-chat':
      return <svg className={iconClass} viewBox="0 0 24 24" fill="none">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="4" cy="4" r="1" fill="#0077B5" />
        </svg>;
    case 'linkedin-profile-visit':
      return <Eye className={iconClass} />;
    case 'linkedin-voice':
      return <Phone className={iconClass} />;
    case 'linkedin-like-post':
      return <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
        </svg>;
    case 'wait':
      return <Clock className={iconClass} />;
    case 'condition':
      return <svg className={iconClass} viewBox="0 0 24 24" fill="none">
          <path d="M12 2l9 5v6c0 5.5-3.8 10.7-9 12-5.2-1.3-9-6.5-9-12V7l9-5z" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>;
    case 'api-call':
      return <Code className={iconClass} />;
    case 'send-to-campaign':
      return <Send className={iconClass} />;
    case 'ai-perplexity':
      return <Sparkles className={iconClass} />;
    case 'ai-generate':
      return <Sparkles className={iconClass} />;
    case 'ai-classify':
      return <Tags className={iconClass} />;
    case 'ai-analyze':
      return <BarChart className={iconClass} />;
    default:
      return <div className="h-4 w-4 rounded bg-muted" />;
  }
};
export const StepCard = ({
  step,
  isActive,
  onClick,
  onDuplicate,
  onABTest,
  onDelete,
  onVersionClick,
  activeVersion = 'A'
}: StepCardProps) => {
  const hasError = !!step.error;
  const hasWarning = !!step.warning;
  const [delayOpen, setDelayOpen] = useState(false);
  const [waitAmount, setWaitAmount] = useState(1);
  const [waitUnit, setWaitUnit] = useState('day');

  // For condition-accepted-invite, get the display text
  const getConditionWaitText = () => {
    if (step.type === 'condition-accepted-invite') {
      const waitMode = step.config?.waitMode || 'wait-until';
      if (waitMode === 'wait-until') {
        return { label: 'Wait until', value: 'Accepted invite' };
      } else {
        const timeLimit = step.config?.timeLimit || 1;
        const timeUnit = step.config?.timeUnit || 'day';
        return { label: 'If accepted within', value: `${timeLimit} ${timeUnit}${timeLimit > 1 ? 's' : ''}` };
      }
    }
    return null;
  };

  const conditionWaitText = getConditionWaitText();

  return <div onClick={step.type === 'start' ? undefined : onClick} className={cn(
    "relative bg-card border rounded-xl p-4 transition-all group",
    step.type === 'start' ? "cursor-default" : "cursor-pointer hover:shadow-md hover:border-border",
    isActive && step.type !== 'start'
      ? "border-primary shadow-lg shadow-primary/10 ring-1 ring-primary/20"
      : "border-border/60",
    hasError && "border-destructive ring-2 ring-destructive/20"
  )}>
      {step.type === 'start' ? <div className="text-center text-xs text-muted-foreground py-2">Start campaign 🚀</div> : <>
          <div className="flex items-center justify-between mb-2">
            <Popover open={delayOpen} onOpenChange={setDelayOpen}>
              <PopoverTrigger asChild>
                <button onClick={e => {
              e.stopPropagation();
              setDelayOpen(true);
            }} className="text-[10px] font-medium uppercase tracking-wide hover:opacity-80 transition-opacity text-left">
                  {conditionWaitText ? (
                    <>
                      <span className="text-muted-foreground">{conditionWaitText.label} </span>
                      <span className="text-primary cursor-pointer">{conditionWaitText.value}</span>
                    </>
                  ) : (
                    <>
                      <span className="text-muted-foreground">
                        {step.type === 'wait' ? 'Wait for ' : waitAmount === 0 ? 'Send ' : 'Wait '}
                      </span>
                      <span className="text-primary cursor-pointer">
                        {step.type === 'wait' ? `${waitAmount} ${waitUnit}${waitAmount > 1 ? 's' : ''}` : waitAmount === 0 ? 'immediately' : `${waitAmount} ${waitUnit}${waitAmount > 1 ? 's' : ''}`}
                      </span>
                    </>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-3" align="start" onClick={e => e.stopPropagation()}>
                {step.type === 'condition-accepted-invite' ? (
                  <div className="space-y-3">
                    <div className="text-xs font-medium text-muted-foreground mb-2">Lead action</div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="waitMode"
                          value="wait-until"
                          checked={(step.config?.waitMode || 'wait-until') === 'wait-until'}
                          onChange={(e) => {
                            const event = new CustomEvent('updateStepConfig', {
                              detail: { ...step.config, waitMode: 'wait-until' }
                            });
                            window.dispatchEvent(event);
                          }}
                          className="h-4 w-4 accent-[#36b39a]"
                        />
                        <span className="text-sm">Wait until Accepted invite</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="waitMode"
                          value="within"
                          checked={step.config?.waitMode === 'within'}
                          onChange={(e) => {
                            const event = new CustomEvent('updateStepConfig', {
                              detail: { ...step.config, waitMode: 'within' }
                            });
                            window.dispatchEvent(event);
                          }}
                          className="h-4 w-4 accent-[#36b39a]"
                        />
                        <span className="text-sm">If Accepted within</span>
                      </label>
                    </div>

                    {step.config?.waitMode === 'within' && (
                      <div className="flex items-center gap-2 pt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 flex-shrink-0"
                          onClick={() => {
                            const event = new CustomEvent('updateStepConfig', {
                              detail: {
                                ...step.config,
                                timeLimit: Math.max(0, (step.config?.timeLimit || 1) - 1)
                              }
                            });
                            window.dispatchEvent(event);
                          }}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>

                        <div className="flex items-center justify-center border rounded-md h-7 w-12 flex-shrink-0">
                          <span className="text-sm font-medium">{step.config?.timeLimit || 1}</span>
                        </div>

                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 flex-shrink-0"
                          onClick={() => {
                            const event = new CustomEvent('updateStepConfig', {
                              detail: {
                                ...step.config,
                                timeLimit: (step.config?.timeLimit || 1) + 1
                              }
                            });
                            window.dispatchEvent(event);
                          }}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>

                        <Select
                          value={step.config?.timeUnit || 'day'}
                          onValueChange={(value) => {
                            const event = new CustomEvent('updateStepConfig', {
                              detail: { ...step.config, timeUnit: value }
                            });
                            window.dispatchEvent(event);
                          }}
                        >
                          <SelectTrigger className="w-20 h-7 text-xs flex-shrink-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="day">day</SelectItem>
                            <SelectItem value="week">week</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground">Wait</span>
                    <Button variant="outline" size="icon" className="h-7 w-7 flex-shrink-0" onClick={() => setWaitAmount(Math.max(0, waitAmount - 1))}>
                      <Minus className="h-3 w-3" />
                    </Button>

                    <div className="flex items-center justify-center border rounded-md h-7 w-12 flex-shrink-0">
                      <span className="text-sm font-medium">{waitAmount}</span>
                    </div>

                    <Button variant="outline" size="icon" className="h-7 w-7 flex-shrink-0" onClick={() => setWaitAmount(waitAmount + 1)}>
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

                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive flex-shrink-0 ml-auto" onClick={() => {
                  setDelayOpen(false);
                  setWaitAmount(0);
                }}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                )}
              </PopoverContent>
            </Popover>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md hover:bg-destructive/10 hover:text-destructive" onClick={e => {
            e.stopPropagation();
            onDelete?.();
          }}>
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className={cn(
                "h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors",
                isActive
                  ? "bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-sm shadow-primary/25"
                  : "bg-muted/50 text-primary group-hover:bg-primary/10"
              )}>
                <StepIcon type={step.type} isActive={isActive} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm leading-tight">{step.title}</div>
                {step.type === 'send-to-campaign' && step.config?.targetCampaign ? (
                  <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                    {step.config.targetCampaign === 'ai-lookalike' && (
                      <>
                        <span>👤</span>
                        <span>AI - Lookalike - Saleshacking...</span>
                      </>
                    )}
                    {step.config.targetCampaign === 'outbound-campaign' && (
                      <>
                        <span>📤</span>
                        <span>Outbound Campaign</span>
                      </>
                    )}
                    {step.config.targetCampaign === 'follow-up' && (
                      <>
                        <span>🔄</span>
                        <span>Follow-up Campaign</span>
                      </>
                    )}
                  </div>
                ) : step.subtitle && (
                  <div className="text-xs text-muted-foreground mt-0.5">{step.subtitle}</div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              {hasError && <AlertCircle className="h-3.5 w-3.5 text-destructive opacity-100" />}
              {hasWarning && <AlertTriangle className="h-3.5 w-3.5 text-warning opacity-100" />}
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}>
                  <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md hover:bg-muted">
                    <MoreVertical className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={e => {
                e.stopPropagation();
                onDuplicate?.();
              }}>
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={e => {
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

          {hasError && <div className="mt-1.5 text-[11px] text-destructive">{step.error}</div>}

          {step.type === 'ab-test' && (() => {
            const variantColors: Record<string, { from: string; to: string }> = {
              'A': { from: '#48ade8', to: '#3a9ad4' },
              'B': { from: '#ea5154', to: '#d4453f' },
              'C': { from: '#36b39a', to: '#2a9a84' },
              'D': { from: '#f59e0b', to: '#d97706' },
              'E': { from: '#8b5cf6', to: '#7c3aed' },
            };
            const variants = step.versions || ['A', 'B'];

            return (
              <div className="mt-3 space-y-1.5">
                {variants.map((variant: string) => {
                  const color = variantColors[variant] || variantColors['A'];
                  const isActive = activeVersion === variant;
                  const versionData = (step as any)[`version${variant}`];

                  return (
                    <button
                      key={variant}
                      onClick={e => {
                        e.stopPropagation();
                        onVersionClick?.(variant as 'A' | 'B');
                      }}
                      className="w-full flex items-center justify-between gap-2 p-2.5 rounded-lg bg-background transition-all text-left border-2"
                      style={{
                        borderColor: isActive ? color.from : 'transparent',
                        backgroundColor: isActive ? `${color.from}08` : undefined,
                        boxShadow: isActive ? `0 1px 3px ${color.from}15` : undefined
                      }}
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div
                          className="h-7 w-7 rounded-md flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-sm"
                          style={{
                            background: isActive
                              ? `linear-gradient(135deg, ${color.from}, ${color.to})`
                              : undefined,
                            color: isActive ? 'white' : undefined
                          }}
                        >
                          <span className={cn(!isActive && "text-muted-foreground bg-muted rounded-md h-7 w-7 flex items-center justify-center")}>
                            {variant}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div
                            className="text-xs font-medium"
                            style={{ color: isActive ? color.from : undefined }}
                          >
                            Version {variant}
                          </div>
                          <div className="text-[10px] text-muted-foreground">
                            {variant === 'A' ? 'Control' : 'Test variant'}
                          </div>
                          {versionData?.error && (
                            <div className="text-[10px] text-destructive truncate">{versionData.error}</div>
                          )}
                        </div>
                      </div>
                      <MoreVertical className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    </button>
                  );
                })}
              </div>
            );
          })()}
        </>}

    </div>;
};