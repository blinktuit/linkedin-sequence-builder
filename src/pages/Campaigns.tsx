import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Search, Send, MoreVertical, BarChart3, Copy, Archive, Trash2, Share2, Edit, X, ArrowUpDown, MessageSquare, UserCheck, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Campaign } from "@/types/campaigns";
import { CreateCampaignModal } from "@/components/campaign/CreateCampaignModal";

// Mock data - replace with API call
const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: "Saleshacking's campaign (5)",
    emoji: '🙏',
    status: 'in progress',
    connectionRequests: { sent: 0, total: 1 },
    leads: 45,
    acceptanceRatio: { percentage: 0, count: 0 },
    replyRatio: { percentage: 0, count: 0 },
    issues: { duplicates: 0, notSent: 0 },
    tag: undefined,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: '2',
    name: "Saleshacking's campaign (4)",
    emoji: '🚀',
    status: 'paused',
    connectionRequests: { sent: 0, total: 2 },
    leads: 32,
    acceptanceRatio: { percentage: 0, count: 0 },
    replyRatio: { percentage: 0, count: 0 },
    issues: { duplicates: 0, notSent: 0 },
    tag: undefined,
    createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000), // 20 hours ago
  },
  {
    id: '3',
    name: "Saleshacking's campaign (2)",
    emoji: '📧',
    status: 'draft',
    connectionRequests: { sent: 0, total: 0 },
    leads: 15,
    acceptanceRatio: { percentage: 0, count: 0 },
    replyRatio: { percentage: 0, count: 0 },
    issues: { duplicates: 0, notSent: 0 },
    tag: undefined,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: '4',
    name: "AI - Lookalike - Saleshacking's Campaign",
    emoji: '🤖',
    status: 'completed',
    connectionRequests: { sent: 0, total: 50 },
    leads: 127,
    acceptanceRatio: { percentage: 0, count: 0 },
    replyRatio: { percentage: 0, count: 0 },
    issues: { duplicates: 0, notSent: 0 },
    tag: undefined,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
  },
];

const getRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours} hr. ago`;
  if (diffInDays === 1) return '1 day ago';
  return `${diffInDays} days ago`;
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'in progress':
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">In Progress</Badge>;
    case 'paused':
      return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Paused</Badge>;
    case 'completed':
      return <Badge className="bg-[#36b39a]/20 text-[#36b39a] hover:bg-[#36b39a]/20">Completed</Badge>;
    case 'archived':
      return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">Archived</Badge>;
    case 'draft':
      return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">Draft</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

export default function Campaigns() {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tagsFilter, setTagsFilter] = useState('all');
  const [selectedCampaigns, setSelectedCampaigns] = useState<Set<string>>(new Set());
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState<string | null>(null);
  const [showAIBanner, setShowAIBanner] = useState(true);
  const [sortColumn, setSortColumn] = useState<'active' | 'name' | 'status' | 'invites' | 'leads' | 'accepted' | 'replied' | 'createdAt'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const handleSort = (column: typeof sortColumn) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('desc');
    }
  };

  const filteredCampaigns = campaigns
    .filter(campaign => {
      const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let comparison = 0;

      switch (sortColumn) {
        case 'active':
          comparison = (a.isActive === b.isActive) ? 0 : a.isActive ? -1 : 1;
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        case 'invites':
          comparison = a.connectionRequests.sent - b.connectionRequests.sent;
          break;
        case 'leads':
          comparison = a.leads - b.leads;
          break;
        case 'accepted':
          comparison = a.acceptanceRatio.percentage - b.acceptanceRatio.percentage;
          break;
        case 'replied':
          comparison = a.replyRatio.percentage - b.replyRatio.percentage;
          break;
        case 'createdAt':
          comparison = a.createdAt.getTime() - b.createdAt.getTime();
          break;
      }

      return sortOrder === 'desc' ? -comparison : comparison;
    });

  const toggleCampaignSelection = (id: string) => {
    const newSelected = new Set(selectedCampaigns);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedCampaigns(newSelected);
  };

  const toggleAllCampaigns = () => {
    if (selectedCampaigns.size === filteredCampaigns.length) {
      setSelectedCampaigns(new Set());
    } else {
      setSelectedCampaigns(new Set(filteredCampaigns.map(c => c.id)));
    }
  };

  const toggleCampaignStatus = (id: string) => {
    setCampaigns(campaigns.map(c => {
      if (c.id === id) {
        return {
          ...c,
          status: c.status === 'paused' ? 'in progress' : 'paused'
        };
      }
      return c;
    }));
  };

  const handleDeleteCampaign = (id: string) => {
    setCampaignToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (campaignToDelete) {
      setCampaigns(campaigns.filter(c => c.id !== campaignToDelete));
      setCampaignToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const handleDuplicateCampaign = (campaign: Campaign) => {
    const newCampaign: Campaign = {
      ...campaign,
      id: Date.now().toString(),
      name: `${campaign.name} (Copy)`,
      createdAt: new Date(),
    };
    setCampaigns([newCampaign, ...campaigns]);
  };

  const handleBulkDelete = () => {
    setCampaigns(campaigns.filter(c => !selectedCampaigns.has(c.id)));
    setSelectedCampaigns(new Set());
  };

  const handleBulkArchive = () => {
    setCampaigns(campaigns.map(c => {
      if (selectedCampaigns.has(c.id)) {
        return { ...c, status: 'archived' as const };
      }
      return c;
    }));
    setSelectedCampaigns(new Set());
  };

  const handleBulkPause = () => {
    setCampaigns(campaigns.map(c => {
      if (selectedCampaigns.has(c.id)) {
        return { ...c, status: 'paused' as const };
      }
      return c;
    }));
    setSelectedCampaigns(new Set());
  };

  const handleCreateCampaign = (data: any) => {
    // Create a new campaign with the data from the modal
    // In a real app, this would make an API call
    console.log('Creating campaign with data:', data);
    // For now, just navigate to the campaign builder with a new ID
    const newCampaignId = Date.now().toString();
    navigate(`/campaign/${newCampaignId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold">Campaigns</h1>
          <Button
            onClick={() => setCreateModalOpen(true)}
            className="gap-2"
          >
            <Send className="h-4 w-4" />
            Create campaign
          </Button>
        </div>

        {/* Bulk Actions Bar */}
        {selectedCampaigns.size > 0 && (
          <div className="mb-4 p-4 bg-[#36b39a]/10 border border-[#36b39a]/30 rounded-lg flex items-center justify-between">
            <span className="text-sm font-medium text-[#36b39a]">
              {selectedCampaigns.size} campaign{selectedCampaigns.size > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleBulkPause}>
                Pause selected
              </Button>
              <Button variant="outline" size="sm" onClick={handleBulkArchive}>
                <Archive className="h-4 w-4 mr-2" />
                Archive selected
              </Button>
              <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete selected
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setSelectedCampaigns(new Set())}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search a campaign..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="in progress">In Progress</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* LinkedIn Account Warning */}
        {showAIBanner && (
          <div className="mb-6 p-4 bg-[#36b39a]/10 border border-[#36b39a]/30 rounded-lg flex items-start gap-3">
            <div className="h-6 w-6 rounded-full bg-[#36b39a] flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm font-bold">!</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[#36b39a]">
                Your LinkedIn account is not properly connected.
              </p>
              <p className="text-sm text-[#36b39a]/80">
                Please reconnect your account to continue using your campaigns.
              </p>
            </div>
            <Button variant="ghost" size="sm" className="text-[#36b39a] hover:text-[#36b39a]/80 hover:bg-[#36b39a]/10">
              Click here to fix
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-[#36b39a] hover:text-[#36b39a]/80 hover:bg-[#36b39a]/10"
              onClick={() => setShowAIBanner(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Table */}
        <div className="border rounded-lg bg-card">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="w-12 px-4 py-3 text-left">
                  <Checkbox
                    checked={selectedCampaigns.size === filteredCampaigns.length && filteredCampaigns.length > 0}
                    onCheckedChange={toggleAllCampaigns}
                  />
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-normal text-muted-foreground cursor-pointer hover:text-foreground"
                  onClick={() => handleSort('active')}
                >
                  <div className="flex items-center gap-1.5">
                    Active
                    <ChevronDown className={`h-3 w-3 transition-transform ${sortColumn === 'active' && sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-normal text-muted-foreground cursor-pointer hover:text-foreground"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-1.5">
                    Campaign Name
                    <ChevronDown className={`h-3 w-3 transition-transform ${sortColumn === 'name' && sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-normal text-muted-foreground cursor-pointer hover:text-foreground"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center gap-1.5">
                    Status
                    <ChevronDown className={`h-3 w-3 transition-transform ${sortColumn === 'status' && sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-normal text-muted-foreground cursor-pointer hover:text-foreground"
                  onClick={() => handleSort('invites')}
                >
                  <div className="flex items-center gap-1.5">
                    Invites sent
                    <ChevronDown className={`h-3 w-3 transition-transform ${sortColumn === 'invites' && sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-normal text-muted-foreground cursor-pointer hover:text-foreground"
                  onClick={() => handleSort('leads')}
                >
                  <div className="flex items-center gap-1.5">
                    Active leads
                    <ChevronDown className={`h-3 w-3 transition-transform ${sortColumn === 'leads' && sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-normal text-muted-foreground cursor-pointer hover:text-foreground"
                  onClick={() => handleSort('accepted')}
                >
                  <div className="flex items-center gap-1.5">
                    Accepted
                    <ChevronDown className={`h-3 w-3 transition-transform ${sortColumn === 'accepted' && sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-normal text-muted-foreground cursor-pointer hover:text-foreground"
                  onClick={() => handleSort('replied')}
                >
                  <div className="flex items-center gap-1.5">
                    Replied
                    <ChevronDown className={`h-3 w-3 transition-transform ${sortColumn === 'replied' && sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-normal text-muted-foreground cursor-pointer hover:text-foreground"
                  onClick={() => handleSort('createdAt')}
                >
                  <div className="flex items-center gap-1.5">
                    Created at
                    <ChevronDown className={`h-3 w-3 transition-transform ${sortColumn === 'createdAt' && sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                  </div>
                </th>
                <th className="w-12 px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredCampaigns.map((campaign) => (
                <tr key={campaign.id} className="border-b hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <Checkbox
                      checked={selectedCampaigns.has(campaign.id)}
                      onCheckedChange={() => toggleCampaignSelection(campaign.id)}
                    />
                  </td>
                  <td className="p-4">
                    <Switch
                      checked={campaign.status !== 'paused'}
                      onCheckedChange={() => toggleCampaignStatus(campaign.id)}
                    />
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => navigate(`/campaign/${campaign.id}`)}
                      className="flex items-center gap-2 text-left hover:text-primary transition-colors"
                    >
                      <span className="text-lg">{campaign.emoji}</span>
                      <span className="font-medium">{campaign.name}</span>
                    </button>
                  </td>
                  <td className="p-4">
                    {getStatusBadge(campaign.status)}
                  </td>
                  <td className="p-4">
                    <span className="text-sm">
                      {campaign.connectionRequests.sent}/{campaign.connectionRequests.total}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm">{campaign.leads}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-sm">
                      <span>{campaign.acceptanceRatio.percentage}%</span>
                      <span>{campaign.acceptanceRatio.count}</span>
                      <UserCheck className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-sm">
                      <span>{campaign.replyRatio.percentage}%</span>
                      <span>{campaign.replyRatio.count}</span>
                      <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">
                      {getRelativeTime(campaign.createdAt)}
                    </span>
                  </td>
                  <td className="p-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <BarChart3 className="h-4 w-4 mr-2" />
                          View analytics
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="h-4 w-4 mr-2" />
                          Share campaign
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit settings
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
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDeleteCampaign(campaign.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete campaign
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCampaigns.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-muted-foreground">No campaigns found</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this campaign.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Create Campaign Modal */}
      <CreateCampaignModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onComplete={handleCreateCampaign}
      />
    </div>
  );
}
