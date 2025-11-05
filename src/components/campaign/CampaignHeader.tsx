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
import { Badge } from "@/components/ui/badge";
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
  campaignEmoji?: string;
  onEmojiChange?: (emoji: string) => void;
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
  campaignEmoji = "📧",
  onEmojiChange
}: CampaignHeaderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(campaignName);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const commonEmojis = [
    "📧", "🚀", "🙏", "🤖", "💼", "📊", "🎯", "💡",
    "⭐", "🔥", "💪", "🎉", "📈", "✨", "🌟", "💰",
    "🏆", "📱", "💻", "🎨", "🔔", "📢", "🌐", "🔗"
  ];

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
          <Popover open={emojiPickerOpen} onOpenChange={setEmojiPickerOpen}>
            <PopoverTrigger asChild>
              <button className="h-8 w-8 bg-primary/10 rounded flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                <span className="text-primary text-sm font-medium">{campaignEmoji}</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-3" align="start">
              <div className="space-y-2">
                <p className="text-sm font-medium">Choose an emoji</p>
                <div className="grid grid-cols-8 gap-2">
                  {commonEmojis.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => {
                        if (onEmojiChange) {
                          onEmojiChange(emoji);
                        }
                        setEmojiPickerOpen(false);
                      }}
                      className="h-8 w-8 flex items-center justify-center text-lg hover:bg-muted rounded transition-colors"
                    >
                      {emoji}
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
