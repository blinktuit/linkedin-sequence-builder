export interface Campaign {
  id: string;
  name: string;
  emoji: string;
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
