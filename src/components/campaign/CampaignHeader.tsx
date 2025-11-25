import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  MoreVertical,
  ArrowLeft,
  Share2,
  FileText,
  Copy,
  Archive,
  Trash2,
  ChevronRight,
  User
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

interface CampaignHeaderProps {
  campaignName: string;
  activeTab: 'sequence' | 'leadlist' | 'launch';
  onTabChange: (tab: 'sequence' | 'leadlist' | 'launch') => void;
  onNextStep: () => void;
  onBackToCampaigns?: () => void;
  onCampaignNameChange?: (name: string) => void;
  campaignActive?: boolean;
  onToggleCampaign?: (active: boolean) => void;
  campaignSource?: string;
}

export const CampaignHeader = ({
  campaignName,
  activeTab,
  onTabChange,
  onNextStep,
  onBackToCampaigns,
  onCampaignNameChange,
  campaignActive = true,
  onToggleCampaign,
  campaignSource
}: CampaignHeaderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(campaignName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editedName.trim() && onCampaignNameChange) {
      onCampaignNameChange(editedName.trim());
    } else {
      setEditedName(campaignName);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditedName(campaignName);
      setIsEditing(false);
    }
  };
  return (
    <div className="h-16 bg-card border-b border-border flex items-center justify-between px-4">
      {/* Left: Back button */}
      <div className="flex items-center">
        <button
          onClick={onBackToCampaigns}
          className="flex items-center gap-2 h-10 pl-3 pr-4 rounded-full border border-border bg-white hover:bg-slate-50 transition-colors shadow-sm"
        >
          <ArrowLeft className="h-4 w-4 text-muted-foreground" />
          <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center">
            <User className="h-4 w-4 text-slate-400" />
          </div>
          <span className="text-sm font-medium text-foreground">George van Bohemen</span>
        </button>
      </div>

      {/* Center: Navigation tabs */}
      <nav className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
        <button
          onClick={() => onTabChange('sequence')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === 'sequence'
            ? 'bg-primary/10 text-primary'
            : 'text-muted-foreground hover:text-foreground'
            }`}
        >
          <span className={`flex items-center justify-center w-5 h-5 rounded-full text-xs border ${activeTab === 'sequence'
            ? 'border-primary bg-primary text-primary-foreground'
            : 'border-muted-foreground/30'
            }`}>1</span>
          Sequence
        </button>

        <div className="h-px w-4 bg-border" />

        <button
          onClick={() => onTabChange('leadlist')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === 'leadlist'
            ? 'bg-primary/10 text-primary'
            : 'text-muted-foreground hover:text-foreground'
            }`}
        >
          <span className={`flex items-center justify-center w-5 h-5 rounded-full text-xs border ${activeTab === 'leadlist'
            ? 'border-primary bg-primary text-primary-foreground'
            : 'border-muted-foreground/30'
            }`}>2</span>
          Lead list
        </button>

        <div className="h-px w-4 bg-border" />

        <button
          onClick={() => onTabChange('launch')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === 'launch'
            ? 'bg-primary/10 text-primary'
            : 'text-muted-foreground hover:text-foreground'
            }`}
        >
          <span className={`flex items-center justify-center w-5 h-5 rounded-full text-xs border ${activeTab === 'launch'
            ? 'border-primary bg-primary text-primary-foreground'
            : 'border-muted-foreground/30'
            }`}>3</span>
          Launch
        </button>
      </nav>

      {/* Right: Campaign info + Next step + Menu */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {isEditing ? (
            <Input
              ref={inputRef}
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              className="h-8 w-64 font-medium"
            />
          ) : (
            <span
              className="font-medium cursor-pointer hover:text-primary transition-colors"
              onClick={() => setIsEditing(true)}
            >
              {campaignName}
            </span>
          )}
          {campaignSource === 'event-inviter' && (
            <Badge variant="secondary" className="ml-2 text-xs">
              Event Inviter
            </Badge>
          )}
          {campaignSource === 'company-page' && (
            <Badge variant="secondary" className="ml-2 text-xs">
              Company Follow
            </Badge>
          )}
        </div>

        <Switch
          checked={campaignActive}
          onCheckedChange={onToggleCampaign}
        />

        <Button onClick={onNextStep} className="gap-2">
          Next step
          <ChevronRight className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
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
    </div>
  );
};
