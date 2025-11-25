import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  MoreVertical,
  X,
  Share2,
  FileText,
  Copy,
  Archive,
  Trash2,
  ChevronRight
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { CampaignIconDisplay, ICON_LIST } from "./CampaignIconPicker";
import type { CampaignIcon } from "@/types/campaigns";

interface CampaignHeaderProps {
  campaignName: string;
  activeTab: 'sequence' | 'leadlist' | 'launch';
  onTabChange: (tab: 'sequence' | 'leadlist' | 'launch') => void;
  onNextStep: () => void;
  onBackToCampaigns?: () => void;
  onCampaignNameChange?: (name: string) => void;
  campaignActive?: boolean;
  onToggleCampaign?: (active: boolean) => void;
  campaignIcon?: CampaignIcon;
  onIconChange?: (icon: CampaignIcon) => void;
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
  campaignIcon = "mail",
  onIconChange
}: CampaignHeaderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(campaignName);
  const [iconPickerOpen, setIconPickerOpen] = useState(false);
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
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onBackToCampaigns}>
          <X className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-2">
          <Popover open={iconPickerOpen} onOpenChange={setIconPickerOpen}>
            <PopoverTrigger asChild>
              <button className="h-8 w-8 bg-primary/10 rounded flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                <CampaignIconDisplay icon={campaignIcon} className="text-primary" size={16} />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-3" align="start">
              <div className="space-y-2">
                <p className="text-sm font-medium">Choose an icon</p>
                <div className="grid grid-cols-6 gap-2">
                  {ICON_LIST.map((icon) => (
                    <button
                      key={icon}
                      onClick={() => {
                        if (onIconChange) {
                          onIconChange(icon);
                        }
                        setIconPickerOpen(false);
                      }}
                      className={`h-8 w-8 flex items-center justify-center hover:bg-muted rounded transition-colors ${campaignIcon === icon ? 'bg-primary/10 text-primary' : ''}`}
                    >
                      <CampaignIconDisplay icon={icon} size={16} />
                    </button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
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
        </div>

        <Switch
          checked={campaignActive}
          onCheckedChange={onToggleCampaign}
        />

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
        <nav className="flex items-center gap-2 mr-4">
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

        <Button onClick={onNextStep} className="gap-2">
          Next step
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
