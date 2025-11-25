import {
  Mail,
  Rocket,
  Handshake,
  Bot,
  Briefcase,
  BarChart3,
  Target,
  Lightbulb,
  Star,
  Flame,
  Zap,
  Trophy,
  Users,
  TrendingUp,
  Megaphone,
  Globe,
  Link,
  Sparkles,
  type LucideIcon
} from "lucide-react";
import type { CampaignIcon } from "@/types/campaigns";

export const CAMPAIGN_ICONS: Record<CampaignIcon, LucideIcon> = {
  'mail': Mail,
  'rocket': Rocket,
  'handshake': Handshake,
  'bot': Bot,
  'briefcase': Briefcase,
  'chart': BarChart3,
  'target': Target,
  'lightbulb': Lightbulb,
  'star': Star,
  'flame': Flame,
  'zap': Zap,
  'trophy': Trophy,
  'users': Users,
  'trending-up': TrendingUp,
  'megaphone': Megaphone,
  'globe': Globe,
  'link': Link,
  'sparkles': Sparkles,
};

export const ICON_LIST: CampaignIcon[] = [
  'mail', 'rocket', 'handshake', 'bot', 'briefcase', 'chart', 'target', 'lightbulb',
  'star', 'flame', 'zap', 'trophy', 'users', 'trending-up', 'megaphone', 'globe', 'link', 'sparkles'
];

interface CampaignIconDisplayProps {
  icon: CampaignIcon;
  className?: string;
  size?: number;
}

export const CampaignIconDisplay = ({ icon, className = "", size = 16 }: CampaignIconDisplayProps) => {
  const IconComponent = CAMPAIGN_ICONS[icon] || Mail;
  return <IconComponent className={className} size={size} />;
};
