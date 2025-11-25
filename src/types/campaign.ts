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
    yes: string[];
    no: string[];
  };
  parentBranch?: 'yes' | 'no';
  parentStepId?: string;
  isConditional?: boolean;
}

export type CampaignIconType =
  | 'mail'
  | 'rocket'
  | 'handshake'
  | 'bot'
  | 'briefcase'
  | 'chart'
  | 'target'
  | 'lightbulb'
  | 'star'
  | 'flame'
  | 'zap'
  | 'trophy'
  | 'users'
  | 'trending-up'
  | 'megaphone'
  | 'globe'
  | 'link'
  | 'sparkles';

export interface Campaign {
  id: string;
  name: string;
  steps: CampaignStep[];
  activeStepId?: string;
  activeVersion?: 'A' | 'B';
  isActive?: boolean;
  icon?: CampaignIconType;
}
