export type CampaignIcon =
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
  | 'sparkles'
  | 'workflow'
  | 'calendar'
  | 'building';

export type CampaignType = 'multi-step' | 'event-inviter' | 'company-page';

// Fixed icon mapping per campaign type
export const CAMPAIGN_TYPE_ICONS: Record<CampaignType, CampaignIcon> = {
  'multi-step': 'workflow',
  'event-inviter': 'calendar',
  'company-page': 'building',
};

export interface Campaign {
  id: string;
  name: string;
  type: CampaignType;
  autoRefresh?: boolean;
  status: 'draft' | 'in progress' | 'paused' | 'completed' | 'archived';
  connectionRequests: { sent: number; total: number };
  leads: number;
  acceptanceRatio: { percentage: number; count: number };
  replyRatio: { percentage: number; count: number };
  issues: { duplicates: number; notSent: number };
  tag?: string;
  createdAt: Date;
}

export type CampaignStatus = Campaign['status'];

export interface CampaignFilters {
  status: 'all' | CampaignStatus;
  sender: string;
  tags: string;
  creators: string;
}
