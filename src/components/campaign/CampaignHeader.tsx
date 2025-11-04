import { Button } from "@/components/ui/button";
import { 
  MoreVertical, 
  X, 
  Share2, 
  FileText, 
  Copy, 
  Archive, 
  Trash2,
  ChevronRight,
  ToggleLeft
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface CampaignHeaderProps {
  campaignName: string;
  activeTab: 'sequence' | 'leadlist' | 'launch';
  onTabChange: (tab: 'sequence' | 'leadlist' | 'launch') => void;
  onNextStep: () => void;
}

export const CampaignHeader = ({ 
  campaignName, 
  activeTab, 
  onTabChange,
  onNextStep 
}: CampaignHeaderProps) => {
  return (
    <div className="h-16 bg-card border-b border-border flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
        
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary/10 rounded flex items-center justify-center">
            <span className="text-primary text-sm font-medium">📧</span>
          </div>
          <span className="font-medium">{campaignName}</span>
          <Badge variant="secondary" className="text-xs">2</Badge>
        </div>

        <ToggleLeft className="h-5 w-5 text-primary ml-2" />

        <Button variant="ghost" size="icon" className="h-8 w-8">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>
              <Share2 className="h-4 w-4 mr-2" />
              Share campaign publicly
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileText className="h-4 w-4 mr-2" />
              Save campaign as template
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy className="h-4 w-4 mr-2" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Archive className="h-4 w-4 mr-2" />
              Archive
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete campaign
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-3">
        <nav className="flex gap-1">
          <Button
            variant={activeTab === 'sequence' ? 'secondary' : 'ghost'}
            onClick={() => onTabChange('sequence')}
            className="gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" fill="currentColor"/>
              <path d="M12 5v2M12 17v2M5 12h2M17 12h2" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Sequence
          </Button>
          <Button
            variant={activeTab === 'leadlist' ? 'secondary' : 'ghost'}
            onClick={() => onTabChange('leadlist')}
            className="gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="9" cy="7" r="2" stroke="currentColor" strokeWidth="2"/>
              <circle cx="15" cy="17" r="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M9 9v6M15 9v6" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Lead list
          </Button>
          <Button
            variant={activeTab === 'launch' ? 'secondary' : 'ghost'}
            onClick={() => onTabChange('launch')}
            className="gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Launch
          </Button>
        </nav>

        <Button onClick={onNextStep} className="gap-2">
          Next step
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
