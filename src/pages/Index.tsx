import { useState } from "react";
import { CampaignHeader } from "@/components/campaign/CampaignHeader";
import { StepCard } from "@/components/campaign/StepCard";
import { ConfigPanel } from "@/components/campaign/ConfigPanel";
import { StepLibrary } from "@/components/campaign/StepLibrary";
import { ConditionalBranch } from "@/components/campaign/ConditionalBranch";
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
    ],
    activeStepId: undefined,
    activeVersion: 'A',
  });

  const [insertAfterStepId, setInsertAfterStepId] = useState<string | null>(null);
  const [insertBranch, setInsertBranch] = useState<'yes' | 'no' | null>(null);

  const handleAddStep = (type: string) => {
    const isConditional = type.includes('condition') || type === 'linkedin-invitation';
    
    const newStep: CampaignStep = {
      id: Date.now().toString(),
      type: type as any,
      title: getStepTitle(type),
      subtitle: getStepSubtitle(type),
      isConditional,
      branches: isConditional ? { yes: [], no: [] } : undefined,
    };
    
    if (insertAfterStepId && insertBranch) {
      // Insert into a specific branch
      const parentStep = campaign.steps.find(s => s.id === insertAfterStepId);
      if (parentStep?.branches) {
        newStep.parentBranch = insertBranch;
        newStep.parentStepId = insertAfterStepId;
        
        const branchSteps = insertBranch === 'yes' ? parentStep.branches.yes : parentStep.branches.no;
        const newSteps = [...campaign.steps];
        const parentIndex = newSteps.findIndex(s => s.id === insertAfterStepId);
        
        // Add to branch array
        if (insertBranch === 'yes') {
          parentStep.branches.yes = [...(parentStep.branches.yes || []), newStep.id];
        } else {
          parentStep.branches.no = [...(parentStep.branches.no || []), newStep.id];
        }
        
        newSteps.splice(parentIndex + 1, 0, newStep);
        
        setCampaign({
          ...campaign,
          steps: newSteps,
          activeStepId: newStep.id,
        });
      }
    } else if (insertAfterStepId) {
      // Insert after specific step (non-branch)
      const stepIndex = campaign.steps.findIndex(s => s.id === insertAfterStepId);
      const newSteps = [...campaign.steps];
      newSteps.splice(stepIndex + 1, 0, newStep);
      setCampaign({
        ...campaign,
        steps: newSteps,
        activeStepId: newStep.id,
      });
    } else {
      // Add to end
      setCampaign({
        ...campaign,
        steps: [...campaign.steps, newStep],
        activeStepId: newStep.id,
      });
    }
    
    setInsertAfterStepId(null);
    setInsertBranch(null);
  };

  const handleOpenStepLibrary = (afterStepId?: string, branch?: 'yes' | 'no') => {
    setInsertAfterStepId(afterStepId || null);
    setInsertBranch(branch || null);
    setIsStepLibraryOpen(true);
  };

  const getStepTitle = (type: string): string => {
    const titles: Record<string, string> = {
      'linkedin-chat': 'Chat message',
      'linkedin-voice': 'Voice message',
      'linkedin-invitation': 'Invitation',
      'linkedin-profile-visit': 'Visit profile',
      'linkedin-like-post': 'Like a post',
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
      'linkedin-like-post': 'Like on LinkedIn',
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
        <div className="flex-1 relative overflow-auto bg-canvas-bg" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}>
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
          <div className="flex items-start justify-center min-h-full p-12">
            <div className="w-full max-w-2xl">
              {campaign.steps
                .filter(step => !step.parentBranch) // Only show top-level steps
                .map((step, index) => (
                <div key={step.id}>
                  <StepCard
                    step={step}
                    isActive={step.id === campaign.activeStepId}
                    onClick={() => setCampaign({ ...campaign, activeStepId: step.id })}
                    activeVersion={step.id === campaign.activeStepId ? campaign.activeVersion : 'A'}
                    onVersionClick={(version) => {
                      setCampaign({ 
                        ...campaign, 
                        activeStepId: step.id,
                        activeVersion: version 
                      });
                    }}
                    onDuplicate={() => {
                      const duplicatedStep: CampaignStep = {
                        ...step,
                        id: Date.now().toString(),
                      };
                      const stepIndex = campaign.steps.findIndex(s => s.id === step.id);
                      const newSteps = [...campaign.steps];
                      newSteps.splice(stepIndex + 1, 0, duplicatedStep);
                      setCampaign({
                        ...campaign,
                        steps: newSteps,
                      });
                    }}
                    onABTest={() => {
                      // Convert step to A/B test
                      const updatedStep: CampaignStep = {
                        ...step,
                        type: 'ab-test',
                        versionA: {
                          config: step.config || {},
                        },
                        versionB: {
                          config: {},
                        },
                      };
                      
                      setCampaign({
                        ...campaign,
                        steps: campaign.steps.map(s => s.id === step.id ? updatedStep : s),
                        activeStepId: step.id,
                        activeVersion: 'A',
                      });
                    }}
                    onDelete={() => {
                      if (step.type !== 'start') {
                        setCampaign({
                          ...campaign,
                          steps: campaign.steps.filter(s => s.id !== step.id),
                          activeStepId: campaign.activeStepId === step.id ? undefined : campaign.activeStepId,
                        });
                      }
                    }}
                  />
                  
                  {/* Conditional branching for invitation/condition steps */}
                  {step.isConditional && step.branches ? (
                    <ConditionalBranch
                      onAddToYes={() => handleOpenStepLibrary(step.id, 'yes')}
                      onAddToNo={() => handleOpenStepLibrary(step.id, 'no')}
                      yesStepsCount={step.branches.yes?.length || 0}
                      noStepsCount={step.branches.no?.length || 0}
                    />
                  ) : (
                    /* Regular connection and add button */
                    <div className="relative flex flex-col items-center py-1">
                      <div className="flex flex-col items-center">
                        <div className="h-4 w-0.5 bg-border" />
                        <div className="my-0.5">
                          <Button
                            onClick={() => handleOpenStepLibrary(step.id)}
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded-full border-2 border-dashed border-primary/50 hover:border-primary hover:bg-primary/5 transition-colors"
                          >
                            <Plus className="h-3.5 w-3.5 text-primary" />
                          </Button>
                        </div>
                        <div className="h-4 w-0.5 bg-border" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Config panel */}
        <ConfigPanel
          step={activeStep}
          activeVersion={campaign.activeVersion}
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
