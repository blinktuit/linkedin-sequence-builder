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
  versionA?: {
    config?: any;
    error?: string;
  };
  versionB?: {
    config?: any;
    error?: string;
  };
  branches?: {
    yes?: string[]; // IDs of steps in the Yes branch
    no?: string[]; // IDs of steps in the No branch
  };
  parentBranch?: 'yes' | 'no'; // Which branch this step belongs to
  parentStepId?: string; // ID of the parent conditional step
  isConditional?: boolean; // Whether this step has conditional branches
}

export interface Campaign {
  id: string;
  name: string;
  steps: CampaignStep[];
  activeStepId?: string;
  activeVersion?: 'A' | 'B';
}
