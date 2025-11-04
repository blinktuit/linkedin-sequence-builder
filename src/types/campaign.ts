export type StepType = 
  | 'start'
  | 'linkedin-chat'
  | 'linkedin-voice'
  | 'linkedin-invitation'
  | 'linkedin-profile-visit'
  | 'linkedin-like-post'
  | 'wait'
  | 'condition'
  | 'ai-perplexity'
  | 'ai-generate'
  | 'ai-classify'
  | 'ai-analyze'
  | 'api-call'
  | 'send-to-campaign'
  | 'ab-test';

export interface CampaignStep {
  id: string;
  type: StepType;
  title: string;
  subtitle?: string;
  config?: any;
  error?: string;
  warning?: string;
  nextSteps?: string[];
  position?: { x: number; y: number };
}

export interface Campaign {
  id: string;
  name: string;
  steps: CampaignStep[];
  activeStepId?: string;
}
