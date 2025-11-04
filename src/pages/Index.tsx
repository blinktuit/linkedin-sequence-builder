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
    steps: [{
      id: 'start',
      type: 'start',
      title: 'Sequence start'
    }],
    activeStepId: undefined,
    activeVersion: 'A'
  });
  const [insertAfterStepId, setInsertAfterStepId] = useState<string | null>(null);
  const [insertBranch, setInsertBranch] = useState<'yes' | 'no' | null>(null);
  const handleAddStep = (type: string) => {
    const newStep: CampaignStep = {
      id: Date.now().toString(),
      type: type as any,
      title: getStepTitle(type),
      subtitle: getStepSubtitle(type),
      isConditional: type.startsWith('condition')
    };

    // Check if insertAfterStepId is in a branch
    const afterStep = insertAfterStepId ? campaign.steps.find(s => s.id === insertAfterStepId) : null;
    const effectiveBranch = insertBranch || afterStep?.parentBranch;
    const effectiveParentStepId = afterStep?.parentStepId || (effectiveBranch ? insertAfterStepId : null);
    if (effectiveBranch && (effectiveParentStepId || insertAfterStepId)) {
      // Adding to a branch
      newStep.parentBranch = effectiveBranch;

      // Find the root parent of the branch
      const rootParentId = effectiveParentStepId || insertAfterStepId;
      let rootParent = campaign.steps.find(s => s.id === rootParentId);

      // If the step we're inserting after is in a branch, find its root parent
      if (rootParent?.parentStepId) {
        rootParent = campaign.steps.find(s => s.id === rootParent!.parentStepId);
      }
      newStep.parentStepId = rootParent?.id;
      if (rootParent) {
        const updatedParentStep = {
          ...rootParent,
          branches: rootParent.branches || {
            yes: [],
            no: []
          }
        };

        // Insert after the specified step in the branch
        const branchArray = effectiveBranch === 'yes' ? updatedParentStep.branches.yes : updatedParentStep.branches.no;
        const insertIndex = insertAfterStepId ? branchArray.indexOf(insertAfterStepId) : -1;
        if (insertIndex >= 0) {
          branchArray.splice(insertIndex + 1, 0, newStep.id);
        } else {
          branchArray.push(newStep.id);
        }
        setCampaign({
          ...campaign,
          steps: [...campaign.steps.map(s => s.id === rootParent!.id ? updatedParentStep : s), newStep],
          activeStepId: newStep.id
        });
      }
    } else if (insertAfterStepId) {
      // Insert after specific step
      const stepIndex = campaign.steps.findIndex(s => s.id === insertAfterStepId);
      const newSteps = [...campaign.steps];
      newSteps.splice(stepIndex + 1, 0, newStep);
      setCampaign({
        ...campaign,
        steps: newSteps,
        activeStepId: newStep.id
      });
    } else {
      // Add to end
      setCampaign({
        ...campaign,
        steps: [...campaign.steps, newStep],
        activeStepId: newStep.id
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
      'condition-accepted-invite': 'Accepted invite',
      'condition-lead-info': 'Has email address',
      'condition-linkedin-url': 'Has LinkedIn URL',
      'condition-custom': 'Custom condition',
      'condition-opened-email': 'Opened email',
      'condition-clicked-link': 'Clicked on link in email'
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
      'condition-accepted-invite': 'LinkedIn'
    };
    return subtitles[type] || '';
  };
  const activeStep = campaign.steps.find(s => s.id === campaign.activeStepId) || null;
  return <div className="h-screen flex flex-col bg-canvas-bg">
      <CampaignHeader campaignName={campaign.name} activeTab={activeTab} onTabChange={setActiveTab} onNextStep={() => {}} />

      <div className="flex-1 flex overflow-hidden">
        {/* Main canvas */}
        <div className="flex-1 relative overflow-auto bg-canvas-bg" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px'
      }}>
          {/* Toolbar */}
          <div className="absolute top-4 left-4 flex gap-2 z-10">
            
            <Button variant="secondary" size="icon" className="h-9 w-9">
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon" className="h-9 w-9">
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon" className="h-9 w-9">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="2" />
              </svg>
            </Button>
          </div>

          {/* Steps container */}
          <div className="flex items-start justify-center min-h-full p-12">
            <div className="w-full max-w-4xl">
              {campaign.steps.filter(s => !s.parentStepId).map((step, index) => <div key={step.id}>
                  {step.isConditional ? <div className="flex justify-center items-start">
                      <ConditionalBranch onAddYesStep={() => handleOpenStepLibrary(step.id, 'yes')} onAddNoStep={() => handleOpenStepLibrary(step.id, 'no')} hasYesSteps={step.branches?.yes && step.branches.yes.length > 0} hasNoSteps={step.branches?.no && step.branches.no.length > 0}>
                        <div className="w-full">
                          <StepCard step={step} isActive={step.id === campaign.activeStepId} onClick={() => setCampaign({
                      ...campaign,
                      activeStepId: step.id
                    })} activeVersion={step.id === campaign.activeStepId ? campaign.activeVersion : 'A'} onVersionClick={version => {
                      setCampaign({
                        ...campaign,
                        activeStepId: step.id,
                        activeVersion: version
                      });
                    }} onDuplicate={() => {
                      const duplicatedStep: CampaignStep = {
                        ...step,
                        id: Date.now().toString()
                      };
                      const stepIndex = campaign.steps.findIndex(s => s.id === step.id);
                      const newSteps = [...campaign.steps];
                      newSteps.splice(stepIndex + 1, 0, duplicatedStep);
                      setCampaign({
                        ...campaign,
                        steps: newSteps
                      });
                    }} onABTest={() => {
                      // Convert step to A/B test
                      const updatedStep: CampaignStep = {
                        ...step,
                        type: 'ab-test',
                        versionA: {
                          config: step.config || {}
                        },
                        versionB: {
                          config: {}
                        }
                      };
                      setCampaign({
                        ...campaign,
                        steps: campaign.steps.map(s => s.id === step.id ? updatedStep : s),
                        activeStepId: step.id,
                        activeVersion: 'A'
                      });
                    }} onDelete={() => {
                      if (step.type !== 'start') {
                        setCampaign({
                          ...campaign,
                          steps: campaign.steps.filter(s => s.id !== step.id),
                          activeStepId: campaign.activeStepId === step.id ? undefined : campaign.activeStepId
                        });
                      }
                    }} />
                        </div>
                      </ConditionalBranch>
                    </div> : <div className="flex justify-center">
                      <div className="w-full max-w-[460px]">
                        <StepCard step={step} isActive={step.id === campaign.activeStepId} onClick={() => setCampaign({
                    ...campaign,
                    activeStepId: step.id
                  })} activeVersion={step.id === campaign.activeStepId ? campaign.activeVersion : 'A'} onVersionClick={version => {
                    setCampaign({
                      ...campaign,
                      activeStepId: step.id,
                      activeVersion: version
                    });
                  }} onDuplicate={() => {
                    const duplicatedStep: CampaignStep = {
                      ...step,
                      id: Date.now().toString()
                    };
                    const stepIndex = campaign.steps.findIndex(s => s.id === step.id);
                    const newSteps = [...campaign.steps];
                    newSteps.splice(stepIndex + 1, 0, duplicatedStep);
                    setCampaign({
                      ...campaign,
                      steps: newSteps
                    });
                  }} onABTest={() => {
                    // Convert step to A/B test
                    const updatedStep: CampaignStep = {
                      ...step,
                      type: 'ab-test',
                      versionA: {
                        config: step.config || {}
                      },
                      versionB: {
                        config: {}
                      }
                    };
                    setCampaign({
                      ...campaign,
                      steps: campaign.steps.map(s => s.id === step.id ? updatedStep : s),
                      activeStepId: step.id,
                      activeVersion: 'A'
                    });
                  }} onDelete={() => {
                    if (step.type !== 'start') {
                      setCampaign({
                        ...campaign,
                        steps: campaign.steps.filter(s => s.id !== step.id),
                        activeStepId: campaign.activeStepId === step.id ? undefined : campaign.activeStepId
                      });
                    }
                  }} />
                      </div>
                    </div>}
                  
                  {/* Connection and add button after each step */}
                  {step.isConditional ? <>
                      
                      {/* Render branched steps side by side */}
                      {step.branches?.yes.length || step.branches?.no.length ? <div className="flex gap-8 justify-center items-start">
                          {/* Yes branch */}
                          <div className="w-full max-w-[460px] flex flex-col items-center">
                            {step.branches?.yes.map(yesStepId => {
                      const yesStep = campaign.steps.find(s => s.id === yesStepId);
                      if (!yesStep) return null;
                      return <div key={yesStep.id} className="w-full">
                                  <StepCard step={yesStep} isActive={yesStep.id === campaign.activeStepId} onClick={() => setCampaign({
                          ...campaign,
                          activeStepId: yesStep.id
                        })} activeVersion={yesStep.id === campaign.activeStepId ? campaign.activeVersion : 'A'} onVersionClick={version => {
                          setCampaign({
                            ...campaign,
                            activeStepId: yesStep.id,
                            activeVersion: version
                          });
                        }} onDuplicate={() => {
                          const duplicatedStep: CampaignStep = {
                            ...yesStep,
                            id: Date.now().toString()
                          };
                          const stepIndex = campaign.steps.findIndex(s => s.id === yesStep.id);
                          const newSteps = [...campaign.steps];
                          newSteps.splice(stepIndex + 1, 0, duplicatedStep);
                          setCampaign({
                            ...campaign,
                            steps: newSteps
                          });
                        }} onABTest={() => {
                          const updatedStep: CampaignStep = {
                            ...yesStep,
                            type: 'ab-test',
                            versionA: {
                              config: yesStep.config || {}
                            },
                            versionB: {
                              config: {}
                            }
                          };
                          setCampaign({
                            ...campaign,
                            steps: campaign.steps.map(s => s.id === yesStep.id ? updatedStep : s),
                            activeStepId: yesStep.id,
                            activeVersion: 'A'
                          });
                        }} onDelete={() => {
                          setCampaign({
                            ...campaign,
                            steps: campaign.steps.filter(s => s.id !== yesStep.id),
                            activeStepId: campaign.activeStepId === yesStep.id ? undefined : campaign.activeStepId
                          });
                        }} />
                                  
                                  {/* Connector after branch step */}
                                  <div className="flex flex-col items-center py-0.5">
                                    <div className="h-2 w-0.5 bg-green-600/30" />
                                    <div className="my-0.5">
                                      <Button onClick={() => handleOpenStepLibrary(yesStep.id, 'yes')} variant="ghost" size="icon" className="h-7 w-7 rounded-full border-2 border-dashed border-green-600/50 hover:border-green-600 hover:bg-green-600/5 transition-colors">
                                        <Plus className="h-3.5 w-3.5 text-green-600" />
                                      </Button>
                                    </div>
                                    
                                  </div>
                                </div>;
                    })}
                          </div>
                          
                          {/* No branch */}
                          <div className="w-full max-w-[460px] flex flex-col items-center">
                            {step.branches?.no.map(noStepId => {
                      const noStep = campaign.steps.find(s => s.id === noStepId);
                      if (!noStep) return null;
                      return <div key={noStep.id} className="w-full">
                                  <StepCard step={noStep} isActive={noStep.id === campaign.activeStepId} onClick={() => setCampaign({
                          ...campaign,
                          activeStepId: noStep.id
                        })} activeVersion={noStep.id === campaign.activeStepId ? campaign.activeVersion : 'A'} onVersionClick={version => {
                          setCampaign({
                            ...campaign,
                            activeStepId: noStep.id,
                            activeVersion: version
                          });
                        }} onDuplicate={() => {
                          const duplicatedStep: CampaignStep = {
                            ...noStep,
                            id: Date.now().toString()
                          };
                          const stepIndex = campaign.steps.findIndex(s => s.id === noStep.id);
                          const newSteps = [...campaign.steps];
                          newSteps.splice(stepIndex + 1, 0, duplicatedStep);
                          setCampaign({
                            ...campaign,
                            steps: newSteps
                          });
                        }} onABTest={() => {
                          const updatedStep: CampaignStep = {
                            ...noStep,
                            type: 'ab-test',
                            versionA: {
                              config: noStep.config || {}
                            },
                            versionB: {
                              config: {}
                            }
                          };
                          setCampaign({
                            ...campaign,
                            steps: campaign.steps.map(s => s.id === noStep.id ? updatedStep : s),
                            activeStepId: noStep.id,
                            activeVersion: 'A'
                          });
                        }} onDelete={() => {
                          setCampaign({
                            ...campaign,
                            steps: campaign.steps.filter(s => s.id !== noStep.id),
                            activeStepId: campaign.activeStepId === noStep.id ? undefined : campaign.activeStepId
                          });
                        }} />
                                  
                                  {/* Connector after branch step */}
                                  <div className="flex flex-col items-center py-0.5">
                                    <div className="h-2 w-0.5 bg-[#f49854]/30" />
                                    <div className="my-0.5">
                                      <Button onClick={() => handleOpenStepLibrary(noStep.id, 'no')} variant="ghost" size="icon" className="h-7 w-7 rounded-full border-2 border-dashed border-[#f49854]/50 hover:border-[#f49854] hover:bg-[#f49854]/5 transition-colors">
                                        <Plus className="h-3.5 w-3.5 text-[#f49854]" />
                                      </Button>
                                    </div>
                                    
                                  </div>
                                </div>;
                    })}
                          </div>
                        </div> : null}
                      
                      {/* Merge point */}
                      {step.branches?.yes.length || step.branches?.no.length ? <div className="flex justify-center">
                          <div className="h-4 w-0.5 bg-border" />
                        </div> : null}
                    </> : <div className="relative flex flex-col items-center py-0.5">
                      {/* Straight connector line with circle */}
                      <div className="flex flex-col items-center">
                        <div className="h-2 w-0.5 bg-border" />
                        <div className="my-0.5">
                          <Button onClick={() => handleOpenStepLibrary(step.id)} variant="ghost" size="icon" className="h-7 w-7 rounded-full border-2 border-dashed border-primary/50 hover:border-primary hover:bg-primary/5 transition-colors">
                            <Plus className="h-3.5 w-3.5 text-primary" />
                          </Button>
                        </div>
                        
                      </div>
                    </div>}
                </div>)}
            </div>
          </div>
        </div>

        {/* Config panel */}
        <ConfigPanel step={activeStep} activeVersion={campaign.activeVersion} onConfigChange={config => {
        if (activeStep) {
          setCampaign({
            ...campaign,
            steps: campaign.steps.map(s => s.id === activeStep.id ? {
              ...s,
              config
            } : s)
          });
        }
      }} />
      </div>

      <StepLibrary open={isStepLibraryOpen} onClose={() => setIsStepLibraryOpen(false)} onSelectStep={handleAddStep} />
    </div>;
};
export default Index;