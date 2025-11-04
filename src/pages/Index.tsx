import { useState } from "react";
import { CampaignHeader } from "@/components/campaign/CampaignHeader";
import { StepCard } from "@/components/campaign/StepCard";
import { ConfigPanel } from "@/components/campaign/ConfigPanel";
import { StepLibrary } from "@/components/campaign/StepLibrary";
import { Button } from "@/components/ui/button";
import { Plus, Search, ZoomIn, ZoomOut } from "lucide-react";
import type { Campaign, CampaignStep } from "@/types/campaign";

const Index = () => {
  const [activeTab, setActiveTab] = useState<'sequence' | 'leadlist' | 'launch'>('sequence');
  const [isStepLibraryOpen, setIsStepLibraryOpen] = useState(false);
  
  const [campaign, setCampaign] = useState<Campaign>({
    id: '1',
    name: "Saleshacking's campaign",
    steps: [
      {
        id: 'start',
        type: 'start',
        title: 'Sequence start',
      },
      {
        id: '1',
        type: 'linkedin-invitation',
        title: 'Invitation',
        subtitle: 'Send on LinkedIn',
        error: 'Error on sender(s)',
      },
      {
        id: '2',
        type: 'condition',
        title: 'Accepted invite within 1 day',
        subtitle: 'LinkedIn',
      },
      {
        id: '3',
        type: 'wait',
        title: 'Wait for 1 day',
      },
      {
        id: '4',
        type: 'linkedin-chat',
        title: 'Chat message',
        subtitle: 'Send on LinkedIn',
      },
      {
        id: '5',
        type: 'ab-test',
        title: 'Wait for 1 day',
      },
    ],
    activeStepId: '1',
  });

  const handleAddStep = (type: string) => {
    const newStep: CampaignStep = {
      id: Date.now().toString(),
      type: type as any,
      title: getStepTitle(type),
      subtitle: getStepSubtitle(type),
    };
    
    setCampaign({
      ...campaign,
      steps: [...campaign.steps, newStep],
    });
  };

  const getStepTitle = (type: string): string => {
    const titles: Record<string, string> = {
      'linkedin-chat': 'Chat message',
      'linkedin-voice': 'Voice message',
      'linkedin-invitation': 'Invitation',
      'linkedin-profile-visit': 'Visit profile',
      'api-call': 'API Call',
      'send-to-campaign': 'Send to campaign',
      'ai-generate': 'AI variable',
    };
    return titles[type] || 'New step';
  };

  const getStepSubtitle = (type: string): string => {
    const subtitles: Record<string, string> = {
      'linkedin-chat': 'Send on LinkedIn',
      'linkedin-voice': 'Send on LinkedIn',
      'linkedin-invitation': 'Send on LinkedIn',
      'linkedin-profile-visit': 'Visit profile',
      'api-call': 'Call an API',
    };
    return subtitles[type] || '';
  };

  const activeStep = campaign.steps.find(s => s.id === campaign.activeStepId) || null;

  return (
    <div className="h-screen flex flex-col bg-canvas-bg">
      <CampaignHeader
        campaignName={campaign.name}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onNextStep={() => {}}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Main canvas */}
        <div className="flex-1 relative overflow-auto">
          {/* Toolbar */}
          <div className="absolute top-4 left-4 flex gap-2 z-10">
            <Button variant="secondary" size="icon" className="h-9 w-9">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon" className="h-9 w-9">
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon" className="h-9 w-9">
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon" className="h-9 w-9">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </Button>
          </div>

          {/* Steps container */}
          <div className="flex items-start justify-center min-h-full p-20">
            <div className="w-full max-w-md space-y-8">
              {campaign.steps.map((step, index) => (
                <div key={step.id} className="relative">
                  <StepCard
                    step={step}
                    isActive={step.id === campaign.activeStepId}
                    onClick={() => setCampaign({ ...campaign, activeStepId: step.id })}
                  />
                  
                  {index < campaign.steps.length - 1 && (
                    <div className="h-16" />
                  )}
                </div>
              ))}

              {/* Add step button */}
              <div className="flex justify-center pt-6">
                <Button
                  onClick={() => setIsStepLibraryOpen(true)}
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full border-2 border-dashed border-border hover:border-primary hover:bg-primary/5"
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Config panel */}
        <ConfigPanel
          step={activeStep}
          onConfigChange={(config) => {
            if (activeStep) {
              setCampaign({
                ...campaign,
                steps: campaign.steps.map(s =>
                  s.id === activeStep.id ? { ...s, config } : s
                ),
              });
            }
          }}
        />
      </div>

      <StepLibrary
        open={isStepLibraryOpen}
        onClose={() => setIsStepLibraryOpen(false)}
        onSelectStep={handleAddStep}
      />
    </div>
  );
};

export default Index;
