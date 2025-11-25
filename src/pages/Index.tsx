import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CampaignHeader } from "@/components/campaign/CampaignHeader";
import { StepCard } from "@/components/campaign/StepCard";
import { ConfigPanel } from "@/components/campaign/ConfigPanel";
import { StepLibrary } from "@/components/campaign/StepLibrary";
import { ConditionalBranch } from "@/components/campaign/ConditionalBranch";
import { LeadListView } from "@/components/campaign/LeadListView";
import { TemplateImportModal } from "@/components/campaign/TemplateImportModal";
import { Button } from "@/components/ui/button";
import { Plus, Search, ZoomIn, ZoomOut, FileText } from "lucide-react";
import type { Campaign, CampaignStep } from "@/types/campaign";
const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'sequence' | 'leadlist' | 'launch'>('sequence');
  const [isStepLibraryOpen, setIsStepLibraryOpen] = useState(false);
  const [isTemplateImportOpen, setIsTemplateImportOpen] = useState(false);

  // Get template steps from navigation state (if coming from campaign wizard)
  const templateStepsFromNav = (location.state as any)?.templateSteps || [];

  const [campaign, setCampaign] = useState<Campaign>({
    id: '1',
    name: "Saleshacking's campaign",
    steps: [{
      id: 'start',
      type: 'start',
      title: 'Sequence start'
    }, ...templateStepsFromNav],
    activeStepId: undefined,
    activeVersion: 'A',
    isActive: true,
    icon: "mail"
  });
  const [insertAfterStepId, setInsertAfterStepId] = useState<string | null>(null);
  const [insertBranch, setInsertBranch] = useState<'yes' | 'no' | null>(null);

  // Pan functionality state
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [scrollStart, setScrollStart] = useState({ x: 0, y: 0 });
  const canvasRef = useState<HTMLDivElement | null>(null)[0];

  // Zoom functionality state
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.5));
  };

  // Pan functionality handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 0 && e.target === e.currentTarget) { // Left mouse button and clicking on canvas directly
      setIsPanning(true);
      setPanStart({ x: e.clientX, y: e.clientY });
      const canvas = e.currentTarget;
      setScrollStart({ x: canvas.scrollLeft, y: canvas.scrollTop });
      canvas.style.cursor = 'grabbing';
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isPanning) {
      const canvas = e.currentTarget;
      const dx = e.clientX - panStart.x;
      const dy = e.clientY - panStart.y;
      canvas.scrollLeft = scrollStart.x - dx;
      canvas.scrollTop = scrollStart.y - dy;
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isPanning) {
      setIsPanning(false);
      e.currentTarget.style.cursor = 'grab';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isPanning) {
      setIsPanning(false);
      e.currentTarget.style.cursor = 'grab';
    }
  };

  // Listen for config updates from StepCard
  useEffect(() => {
    const handleConfigUpdate = (event: CustomEvent) => {
      if (campaign.activeStepId) {
        setCampaign({
          ...campaign,
          steps: campaign.steps.map(s =>
            s.id === campaign.activeStepId
              ? { ...s, config: event.detail }
              : s
          )
        });
      }
    };

    window.addEventListener('updateStepConfig', handleConfigUpdate as EventListener);
    return () => {
      window.removeEventListener('updateStepConfig', handleConfigUpdate as EventListener);
    };
  }, [campaign]);
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
      'send-to-campaign': 'Move to campaign',
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
    <CampaignHeader
      campaignName={campaign.name}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onNextStep={() => { }}
      onBackToCampaigns={() => navigate('/')}
      onCampaignNameChange={(newName) => {
        setCampaign({
          ...campaign,
          name: newName
        });
      }}
      campaignActive={campaign.isActive}
      onToggleCampaign={(active) => {
        setCampaign({
          ...campaign,
          isActive: active
        });
      }}
      campaignIcon={campaign.icon}
      onIconChange={(icon) => {
        setCampaign({
          ...campaign,
          icon: icon
        });
      }}
    />

    <div className="flex-1 flex overflow-hidden">
      {activeTab === 'leadlist' ? (
        <LeadListView />
      ) : (
        <div className="flex-1 relative flex overflow-hidden">
          {/* Toolbar */}
          <div className="absolute top-4 left-4 flex gap-2 z-10 pointer-events-none">
            <div className="pointer-events-auto flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="h-9 gap-2 shadow-sm border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
                onClick={() => setIsTemplateImportOpen(true)}
              >
                <FileText className="h-4 w-4" />
                Import Template
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="h-9 w-9 shadow-sm border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
                onClick={handleZoomIn}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="h-9 w-9 shadow-sm border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
                onClick={handleZoomOut}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div
            className="flex-1 relative overflow-auto select-none"
            style={{
              background: '#ffffff',
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L45 13 L45 39 L30 52 L15 39 L15 13 Z' fill='none' stroke='%23d1fae5' stroke-width='1' opacity='0.3'/%3E%3C/svg%3E"), linear-gradient(135deg, rgba(16, 185, 129, 0.03) 0%, rgba(52, 211, 153, 0.05) 100%)`,
              backgroundSize: '90px 78px, 100% 100%',
              cursor: isPanning ? 'grabbing' : 'grab'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >

            {/* Steps container */}
            <div
              className="flex items-start justify-center min-h-full p-12 transition-transform duration-200 ease-out origin-top"
              style={{ transform: `scale(${zoom})` }}
            >
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
                    <div className="w-full max-w-[320px]">
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
                      <div className="w-full max-w-[320px] flex flex-col items-center">
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
                              // Remove step from steps array and from parent's branches
                              const parentStep = campaign.steps.find(s => s.id === yesStep.parentStepId);
                              const updatedSteps = campaign.steps.filter(s => s.id !== yesStep.id).map(s => {
                                if (s.id === parentStep?.id && s.branches?.yes) {
                                  return {
                                    ...s,
                                    branches: {
                                      ...s.branches,
                                      yes: s.branches.yes.filter(id => id !== yesStep.id)
                                    }
                                  };
                                }
                                return s;
                              });
                              setCampaign({
                                ...campaign,
                                steps: updatedSteps,
                                activeStepId: campaign.activeStepId === yesStep.id ? undefined : campaign.activeStepId
                              });
                            }} />

                            {/* Connector after branch step */}
                            <div className="flex flex-col items-center py-0.5">
                              <div className="h-2 w-0.5 bg-[#36b39a]/30" />
                              <div className="my-0.5">
                                <Button onClick={() => handleOpenStepLibrary(yesStep.id, 'yes')} variant="ghost" size="icon" className="h-7 w-7 rounded-full border-2 border-dashed border-[#36b39a]/50 hover:border-[#36b39a] hover:bg-[#36b39a]/5 transition-colors">
                                  <Plus className="h-3.5 w-3.5 text-[#36b39a]" />
                                </Button>
                              </div>

                            </div>
                          </div>;
                        })}
                      </div>

                      {/* No branch */}
                      <div className="w-full max-w-[320px] flex flex-col items-center">
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
                              // Remove step from steps array and from parent's branches
                              const parentStep = campaign.steps.find(s => s.id === noStep.parentStepId);
                              const updatedSteps = campaign.steps.filter(s => s.id !== noStep.id).map(s => {
                                if (s.id === parentStep?.id && s.branches?.no) {
                                  return {
                                    ...s,
                                    branches: {
                                      ...s.branches,
                                      no: s.branches.no.filter(id => id !== noStep.id)
                                    }
                                  };
                                }
                                return s;
                              });
                              setCampaign({
                                ...campaign,
                                steps: updatedSteps,
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
        </div>
      )}

      {/* Config panel - only show for sequence tab */}
      {activeTab === 'sequence' && (
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
      )}
    </div>

    <StepLibrary open={isStepLibraryOpen} onClose={() => setIsStepLibraryOpen(false)} onSelectStep={handleAddStep} />
    <TemplateImportModal
      open={isTemplateImportOpen}
      onOpenChange={setIsTemplateImportOpen}
      onSelectTemplate={(_template, steps) => {
        // Add template steps after the start step
        setCampaign({
          ...campaign,
          steps: [...campaign.steps, ...steps],
          activeStepId: steps.length > 0 ? steps[0].id : campaign.activeStepId
        });
      }}
    />
  </div>;
};
export default Index;