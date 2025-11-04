import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";
import type { CampaignStep } from "@/types/campaign";

interface ConfigPanelProps {
  step: CampaignStep | null;
  onConfigChange: (config: any) => void;
}

export const ConfigPanel = ({ step, onConfigChange }: ConfigPanelProps) => {
  if (!step || step.type === 'start') {
    return (
      <div className="w-96 border-l border-border bg-card p-6 flex items-center justify-center text-muted-foreground text-sm">
        Select a step to configure
      </div>
    );
  }

  return (
    <div className="w-96 border-l border-border bg-card overflow-y-auto">
      <div className="p-6 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="text-primary">
              {step.type === 'linkedin-invitation' && (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              )}
            </div>
            <div>
              <div className="font-medium">{step.title}</div>
              <div className="text-xs text-muted-foreground">{step.subtitle}</div>
            </div>
          </div>

          {step.error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive rounded-lg flex items-center gap-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              <span className="text-destructive underline cursor-pointer">Show errors</span>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-sm mb-2 block">
              Message attached to the invitation
            </Label>
            <Textarea
              placeholder="What message do you want to attach with your LinkedIn invitation"
              className="min-h-[200px] resize-none"
            />
            <div className="text-right text-xs text-muted-foreground mt-1">0/200</div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              Add personalization
            </Button>
            <Button variant="outline" size="sm">
              Ask AI
            </Button>
            <Button variant="ghost" size="sm">
              ⋯
            </Button>
          </div>

          <Button variant="outline" size="sm" className="w-full">
            👁 Preview
          </Button>
        </div>
      </div>
    </div>
  );
};
