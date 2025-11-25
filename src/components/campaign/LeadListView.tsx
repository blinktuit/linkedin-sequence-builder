import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Search,
    Filter,
    ArrowUpDown,
    Upload,
    Download,
    Plus,
    Minus,
    Linkedin,
    Briefcase,
    MoreVertical,
    FileText,
    Users,
    Zap,
    MessageSquare,
    Heart,
    ThumbsUp,
    Repeat2,
    X,
    RefreshCw
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";

interface Lead {
    id: string;
    name: string;
    linkedinUrl: string;
    jobTitle: string;
    company: string;
    companyUrl: string;
    hqLocation: string;
    personalLocation: string;
    industry: string;
    score: number;
    certainty: number;
    status: 'pending' | 'contacted' | 'accepted' | 'replied' | 'excluded';
    addedDate: Date;
}

const MOCK_LEADS: Lead[] = [
    {
        id: '1',
        name: 'Anwar Shamim',
        linkedinUrl: 'https://linkedin.com/in/anwar-shamim',
        jobTitle: 'Procurement Lead Officer',
        company: 'West Midlands',
        companyUrl: 'https://linkedin.com/company/west-midlands',
        hqLocation: 'Birmingham, England, UK',
        personalLocation: 'Birmingham, England, UK',
        industry: 'Government Administration',
        score: 3,
        certainty: 8,
        status: 'contacted',
        addedDate: new Date('2024-01-15')
    },
    {
        id: '2',
        name: 'Michael Dunphy',
        linkedinUrl: 'https://linkedin.com/in/michael-dunphy',
        jobTitle: 'Head of Procurement & Supply Chain',
        company: 'Rexel UK Ltd',
        companyUrl: 'https://linkedin.com/company/rexel',
        hqLocation: 'Birmingham, England, UK',
        personalLocation: 'West Midlands, England',
        industry: 'Wholesale',
        score: 3,
        certainty: 5,
        status: 'pending',
        addedDate: new Date('2024-01-16')
    },
    {
        id: '3',
        name: 'Jordan Bourne CIPS',
        linkedinUrl: 'https://linkedin.com/in/jordan-bourne',
        jobTitle: 'Head of Strategic Procurement',
        company: 'MV Kelly',
        companyUrl: 'https://linkedin.com/company/mv-kelly',
        hqLocation: 'Solihull, England, United Kingdom',
        personalLocation: 'Birmingham, England, UK',
        industry: 'Civil Engineering',
        score: 4,
        certainty: 8,
        status: 'accepted',
        addedDate: new Date('2024-01-14')
    },
    {
        id: '4',
        name: 'Martin Allen',
        linkedinUrl: 'https://linkedin.com/in/martin-allen',
        jobTitle: 'Procurement Manager',
        company: 'BCS Group',
        companyUrl: 'https://linkedin.com/company/bcs-group',
        hqLocation: 'Walsall, England, United Kingdom',
        personalLocation: 'Birmingham, England, UK',
        industry: 'Construction',
        score: 3,
        certainty: 7,
        status: 'replied',
        addedDate: new Date('2024-01-13')
    },
    {
        id: '5',
        name: 'Luke Earl',
        linkedinUrl: 'https://linkedin.com/in/luke-earl',
        jobTitle: 'Operations & Procurement Manager',
        company: 'College of Medicine',
        companyUrl: 'https://linkedin.com/company/college-medicine',
        hqLocation: 'Birmingham, England, UK',
        personalLocation: 'Birmingham, England, UK',
        industry: 'Education Administration',
        score: 2,
        certainty: 8,
        status: 'pending',
        addedDate: new Date('2024-01-17')
    },
    {
        id: '6',
        name: 'Rachael Hewitt',
        linkedinUrl: 'https://linkedin.com/in/rachael-hewitt',
        jobTitle: 'Procurement Director',
        company: 'Caudwell Marine',
        companyUrl: 'https://linkedin.com/company/caudwell-marine',
        hqLocation: 'Coventry, England, United Kingdom',
        personalLocation: 'Birmingham, England, UK',
        industry: 'Maritime Transportation',
        score: 4,
        certainty: 8,
        status: 'contacted',
        addedDate: new Date('2024-01-12')
    },
    {
        id: '7',
        name: 'Nick Turner',
        linkedinUrl: 'https://linkedin.com/in/nick-turner',
        jobTitle: 'Indirect Procurement Manager',
        company: 'Norton Motorcycles',
        companyUrl: 'https://linkedin.com/company/norton-motorcycles',
        hqLocation: 'Solihull, England, United Kingdom',
        personalLocation: 'Birmingham, England, UK',
        industry: 'Motor Vehicle Manufacturing',
        score: 4,
        certainty: 8,
        status: 'accepted',
        addedDate: new Date('2024-01-11')
    },
    {
        id: '8',
        name: 'James Daly',
        linkedinUrl: 'https://linkedin.com/in/james-daly',
        jobTitle: 'Procurement Manager',
        company: 'Headlam Group plc',
        companyUrl: 'https://linkedin.com/company/headlam-group',
        hqLocation: 'Coleshill, England, United Kingdom',
        personalLocation: 'West Midlands, England',
        industry: 'Wholesale',
        score: 4,
        certainty: 8,
        status: 'pending',
        addedDate: new Date('2024-01-18')
    },
    {
        id: '9',
        name: 'Max Butler',
        linkedinUrl: 'https://linkedin.com/in/max-butler',
        jobTitle: 'Group Purchasing Manager',
        company: 'Mayflex',
        companyUrl: 'https://linkedin.com/company/mayflex',
        hqLocation: 'Birmingham, England, UK',
        personalLocation: 'Birmingham, England, UK',
        industry: 'Information Technology',
        score: 5,
        certainty: 10,
        status: 'replied',
        addedDate: new Date('2024-01-10')
    },
    {
        id: '10',
        name: 'Ian Evans',
        linkedinUrl: 'https://linkedin.com/in/ian-evans',
        jobTitle: 'Sales Director',
        company: 'Aston & Fincher Ltd',
        companyUrl: 'https://linkedin.com/company/aston-fincher',
        hqLocation: 'Birmingham, England, UK',
        personalLocation: 'Birmingham, England, UK',
        industry: 'Wholesale',
        score: 3,
        certainty: 6,
        status: 'excluded',
        addedDate: new Date('2024-01-19')
    }
];

interface PostUrl {
    id: string;
    url: string;
    likes: number;
    reactions: number;
    reposts: number;
    loading: boolean;
}

interface SearchUrl {
    id: string;
    url: string;
    leadCount: number;
    lastRefreshed: Date;
}

interface Campaign {
    id: string;
    name: string;
    emoji: string;
    status: string;
    leadCount: number;
}

const MOCK_CAMPAIGNS: Campaign[] = [
    { id: '1', name: "Saleshacking's campaign", emoji: '🚀', status: 'Draft', leadCount: 145 },
    { id: '2', name: "Saleshacking's campaign", emoji: '🔥', status: 'Draft', leadCount: 230 },
    { id: '3', name: "Saleshacking's campaign", emoji: '🌈', status: 'Draft', leadCount: 89 },
    { id: '4', name: "Saleshacking's campaign", emoji: '🎯', status: 'Draft', leadCount: 167 },
    { id: '5', name: "Saleshacking's campaign", emoji: '🚀', status: 'Draft', leadCount: 312 },
    { id: '6', name: "Saleshacking's campaign", emoji: '🎨', status: 'Draft', leadCount: 98 },
    { id: '7', name: "AI - Lookalike - Saleshacking's Campaign", emoji: '😎', status: 'Draft', leadCount: 456 }
];

const AI_SENTIMENTS = [
    'Wants appointment',
    'Left phone number',
    'Not interested',
    'Referral',
    'Interested',
    'Needs more info',
    'Budget concerns',
    'Wrong timing',
    'Already has solution',
    'Decision maker not available',
    'Wants demo',
    'Pricing inquiry',
    'Technical questions',
    'Competitor mention',
    'Positive response',
    'Negative response',
    'Neutral response',
    'Out of office'
];

interface TargetList {
    id: string;
    name: string;
    leadCount: number;
    date: string;
}

const TARGET_LISTS: TargetList[] = [
    { id: '1', name: 'Tech CEOs in SF', leadCount: 1240, date: 'Oct 24, 2024' },
    { id: '2', name: 'Marketing Directors NY', leadCount: 850, date: 'Nov 02, 2024' },
    { id: '3', name: 'SaaS Founders Europe', leadCount: 2100, date: 'Nov 10, 2024' },
    { id: '4', name: 'HR Managers London', leadCount: 560, date: 'Nov 15, 2024' },
    { id: '5', name: 'Sales VPs Austin', leadCount: 920, date: 'Nov 18, 2024' }
];

export const LeadListView = () => {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [selectedLeadSource, setSelectedLeadSource] = useState<string | null>(null);
    const [postUrls, setPostUrls] = useState<PostUrl[]>([]);
    const [newPostUrl, setNewPostUrl] = useState('');
    const [searchUrls, setSearchUrls] = useState<SearchUrl[]>([]);
    const [newSearchUrl, setNewSearchUrl] = useState('');
    const [refreshRate, setRefreshRate] = useState<'daily' | 'weekly' | 'monthly' | 'custom'>('daily');
    const [customRefreshDays, setCustomRefreshDays] = useState<number>(7);

    // Other campaign import states
    const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
    const [campaignSearchQuery, setCampaignSearchQuery] = useState('');
    const [selectedSentiments, setSelectedSentiments] = useState<string[]>([]);
    const [leadFilters, setLeadFilters] = useState({
        receivedEmail: false,
        notReceivedEmail: false,
        openedEmail: false,
        notOpenedEmail: false,
        clickedLink: false,
        notClickedLink: false,
        repliedEmail: false,
        notRepliedEmail: false,
        acceptedInvitation: false,
        openedLinkedinMessage: false,
        repliedLinkedinMessage: false,
        notRepliedLinkedinMessage: false
    });

    // CSV Upload states
    const [uploadedFiles, setUploadedFiles] = useState<Array<{
        id: string;
        name: string;
        leadsFound: number;
        headers: string[];
        progress: number;
    }>>([]);
    const [csvMappings, setCsvMappings] = useState<Record<string, string>>({});
    const [showMappingStep, setShowMappingStep] = useState(false);

    // Target list selection state
    const [selectedTargetLists, setSelectedTargetLists] = useState<string[]>([]);

    const toggleTargetList = (listId: string) => {
        setSelectedTargetLists(prev =>
            prev.includes(listId)
                ? prev.filter(id => id !== listId)
                : [...prev, listId]
        );
    };

    const filteredLeads = leads.filter(lead => {
        const matchesSearch =
            lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesFilter = filterStatus === 'all' || lead.status === filterStatus;

        return matchesSearch && matchesFilter;
    });

    const statusCounts = {
        all: leads.length,
        pending: leads.filter(l => l.status === 'pending').length,
        contacted: leads.filter(l => l.status === 'contacted').length,
        accepted: leads.filter(l => l.status === 'accepted').length,
        replied: leads.filter(l => l.status === 'replied').length,
        excluded: leads.filter(l => l.status === 'excluded').length,
    };

    const toggleExclude = (id: string) => {
        setLeads(prev => prev.map(lead =>
            lead.id === id
                ? { ...lead, status: lead.status === 'excluded' ? 'pending' : 'excluded' as Lead['status'] }
                : lead
        ));
    };

    const toggleSelectAll = () => {
        if (selectedLeads.length === filteredLeads.length) {
            setSelectedLeads([]);
        } else {
            setSelectedLeads(filteredLeads.map(l => l.id));
        }
    };

    const toggleSelect = (id: string) => {
        setSelectedLeads(prev =>
            prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]
        );
    };

    const getScoreColor = (score: number) => {
        if (score >= 5) return 'text-green-500 border-green-500';
        if (score >= 4) return 'text-green-400 border-green-400';
        if (score === 3) return 'text-yellow-500 border-yellow-500';
        return 'text-orange-500 border-orange-500';
    };

    const getStatusBadge = (status: Lead['status']) => {
        const statusConfig = {
            pending: { label: 'Pending', className: 'bg-gray-100 text-gray-700 border-gray-300' },
            contacted: { label: 'Contacted', className: 'bg-blue-100 text-blue-700 border-blue-300' },
            accepted: { label: 'Accepted', className: 'bg-green-100 text-green-700 border-green-300' },
            replied: { label: 'Replied', className: 'bg-purple-100 text-purple-700 border-purple-300' },
            excluded: { label: 'Excluded', className: 'bg-red-100 text-red-700 border-red-300' },
        };

        const config = statusConfig[status];
        return (
            <Badge variant="outline" className={`${config.className} font-normal`}>
                {config.label}
            </Badge>
        );
    };

    const handleAddPostUrl = () => {
        if (!newPostUrl.trim()) return;

        const newPost: PostUrl = {
            id: Date.now().toString(),
            url: newPostUrl,
            likes: Math.floor(Math.random() * 500) + 50, // Mock data
            reactions: Math.floor(Math.random() * 200) + 20,
            reposts: Math.floor(Math.random() * 100) + 10,
            loading: false
        };

        setPostUrls([...postUrls, newPost]);
        setNewPostUrl('');
    };

    const handleRemovePostUrl = (id: string) => {
        setPostUrls(postUrls.filter(post => post.id !== id));
    };

    const handleAddSearchUrl = () => {
        if (!newSearchUrl.trim()) return;

        const newSearch: SearchUrl = {
            id: Date.now().toString(),
            url: newSearchUrl,
            leadCount: Math.floor(Math.random() * 500) + 100, // Mock data
            lastRefreshed: new Date()
        };

        setSearchUrls([...searchUrls, newSearch]);
        setNewSearchUrl('');
    };

    const handleRemoveSearchUrl = (id: string) => {
        setSearchUrls(searchUrls.filter(search => search.id !== id));
    };

    return (
        <div className="flex flex-col h-full w-full bg-white">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white w-full">
                <div className="flex items-center gap-4 flex-1">
                    {/* Filter & Sort Buttons */}
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Filter className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ArrowUpDown className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Search Bar */}
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search leads by name, company, or job title..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 h-9 bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary"
                        />
                    </div>

                    <Badge variant="outline" className="gap-1 text-primary border-primary/30 bg-primary/5 font-normal py-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Lead Grader
                    </Badge>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        className="gap-2 h-9"
                        onClick={() => setIsImportModalOpen(true)}
                    >
                        <Upload className="h-4 w-4" />
                        Import
                    </Button>
                    <Button variant="outline" className="gap-2 h-9">
                        <Download className="h-4 w-4" />
                        Export
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Bulk exclude</DropdownMenuItem>
                            <DropdownMenuItem>Bulk include</DropdownMenuItem>
                            <DropdownMenuItem>Delete selected</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Table Content or Empty State */}
            <div className="flex-1 overflow-auto bg-white">
                {leads.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full py-20 relative overflow-hidden">
                        {/* SVG Background Pattern */}
                        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="hexagons" width="60" height="52" patternUnits="userSpaceOnUse" patternTransform="scale(1.5)">
                                    <path d="M30 0 L45 13 L45 39 L30 52 L15 39 L15 13 Z" fill="none" stroke="#d1fae5" strokeWidth="1" opacity="0.3"/>
                                </pattern>
                                <pattern id="diagonal-lines" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                                    <line x1="0" y1="0" x2="0" y2="8" stroke="#d1fae5" strokeWidth="0.5" opacity="0.2"/>
                                </pattern>
                                <linearGradient id="green-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{stopColor: '#10b981', stopOpacity: 0.03}} />
                                    <stop offset="100%" style={{stopColor: '#34d399', stopOpacity: 0.05}} />
                                </linearGradient>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#hexagons)" />
                            <rect width="100%" height="100%" fill="url(#green-gradient)" />
                            <circle cx="15%" cy="25%" r="100" fill="#d1fae5" opacity="0.15" />
                            <circle cx="85%" cy="70%" r="130" fill="#a7f3d0" opacity="0.12" />
                            <circle cx="70%" cy="20%" r="70" fill="#6ee7b7" opacity="0.1" />
                            <circle cx="25%" cy="75%" r="90" fill="#d1fae5" opacity="0.13" />
                        </svg>

                        <div className="text-center max-w-md relative z-10">
                            <div className="mb-6">
                                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center border-2 border-green-100/50 shadow-lg shadow-green-100/50">
                                    <Upload className="h-10 w-10 text-green-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No leads yet</h3>
                                <p className="text-gray-500 mb-8">
                                    Import your first leads to start your campaign
                                </p>
                            </div>
                            <Button
                                size="lg"
                                className="gap-2 h-12 px-8 text-base font-medium shadow-lg hover:shadow-xl transition-all"
                                onClick={() => setIsImportModalOpen(true)}
                            >
                                <Upload className="h-5 w-5" />
                                Import Leads
                            </Button>
                        </div>
                    </div>
                ) : (
                    <Table>
                        <TableHeader className="sticky top-0 bg-white z-10 shadow-sm">
                            <TableRow className="hover:bg-transparent border-b-2 border-gray-200">
                                <TableHead className="w-[40px]">
                                    <Checkbox
                                        checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                                        onCheckedChange={toggleSelectAll}
                                    />
                                </TableHead>
                                <TableHead className="font-bold text-foreground">Name</TableHead>
                                <TableHead className="font-bold text-foreground">Job title</TableHead>
                                <TableHead className="font-bold text-foreground">Company</TableHead>
                                <TableHead className="font-bold text-foreground">HQ Location</TableHead>
                                <TableHead className="font-bold text-foreground">Industry</TableHead>
                                <TableHead className="font-bold text-foreground text-center w-[60px]">Score</TableHead>
                                <TableHead className="font-bold text-foreground">Status</TableHead>
                                <TableHead className="font-bold text-foreground">Added</TableHead>
                                <TableHead className="w-[100px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredLeads.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                                        No leads found. Try adjusting your search or filters.
                                    </TableCell>
                                </TableRow>
                            ) : (
                            filteredLeads.map((lead) => (
                                <TableRow key={lead.id} className={`group ${lead.status === 'excluded' ? 'opacity-50 bg-muted/30' : ''}`}>
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedLeads.includes(lead.id)}
                                            onCheckedChange={() => toggleSelect(lead.id)}
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            {lead.name}
                                            <a href={lead.linkedinUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-[#0077b5]">
                                                <Linkedin className="h-3 w-3" />
                                            </a>
                                        </div>
                                    </TableCell>
                                    <TableCell className="max-w-[200px] truncate" title={lead.jobTitle}>
                                        {lead.jobTitle}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {lead.company}
                                            <a href={lead.companyUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
                                                <Briefcase className="h-3 w-3" />
                                            </a>
                                        </div>
                                    </TableCell>
                                    <TableCell className="max-w-[150px] truncate" title={lead.hqLocation}>
                                        {lead.hqLocation}
                                    </TableCell>
                                    <TableCell className="max-w-[150px] truncate" title={lead.industry}>
                                        {lead.industry}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full border-2 font-bold text-sm ${getScoreColor(lead.score)}`}>
                                            {lead.score}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {getStatusBadge(lead.status)}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm">
                                        {lead.addedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => toggleExclude(lead.id)}
                                            className={`gap-1.5 h-8 ${lead.status === 'excluded' ? 'text-muted-foreground' : 'text-foreground'}`}
                                        >
                                            {lead.status === 'excluded' ? (
                                                <>
                                                    <Plus className="h-3 w-3" />
                                                    Include
                                                </>
                                            ) : (
                                                <>
                                                    <Minus className="h-3 w-3" />
                                                    Exclude
                                                </>
                                            )}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                    </Table>
                )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-white flex items-center justify-between">
                <div className="text-sm font-medium">
                    Showing: <span className="text-foreground">{filteredLeads.length}</span> <span className="text-muted-foreground">/ {leads.length} total leads</span>
                    {selectedLeads.length > 0 && (
                        <span className="ml-4">
                            Selected: <span className="text-primary">{selectedLeads.length}</span>
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2 text-[#36b39a] text-sm font-medium">
                    All changes are saved
                    <div className="h-2 w-2 rounded-full bg-[#36b39a]" />
                </div>
            </div>

            {/* Import Leads Modal */}
            <Dialog open={isImportModalOpen} onOpenChange={(open) => {
                setIsImportModalOpen(open);
                if (!open) setSelectedLeadSource(null);
            }}>
                <DialogContent className="max-w-6xl max-h-[85vh] flex flex-col p-0 gap-0 bg-white">
                    <DialogHeader className="px-8 pt-8 pb-6 border-b border-gray-100">
                        <DialogTitle className="text-2xl font-semibold">Import Leads</DialogTitle>
                        <DialogDescription className="text-base text-gray-600 mt-2">
                            Select a lead source and configure your import settings
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-1 overflow-hidden min-h-0">
                        {/* Left Side - Lead Sources */}
                        <div className="w-[300px] border-r border-gray-100 bg-gradient-to-b from-white to-gray-50/30 p-6 overflow-y-auto">
                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Lead Source</h3>
                            <div className="space-y-2">
                                <button
                                    onClick={() => setSelectedLeadSource('target-search')}
                                    className={`w-full flex items-center gap-3 p-3.5 rounded-2xl transition-all text-left ${
                                        selectedLeadSource === 'target-search'
                                            ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/50 shadow-sm'
                                            : 'bg-white/50 hover:bg-white hover:shadow-sm border border-gray-100'
                                    }`}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                        selectedLeadSource === 'target-search' ? 'bg-gradient-to-br from-emerald-100 to-teal-100' : 'bg-gray-50'
                                    }`}>
                                        <Search className={`h-4 w-4 ${selectedLeadSource === 'target-search' ? 'text-emerald-600' : 'text-gray-500'}`} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-semibold text-sm mb-0.5 ${selectedLeadSource === 'target-search' ? 'text-emerald-900' : 'text-gray-700'}`}>
                                            Target search list
                                        </h3>
                                        <p className={`text-xs leading-tight ${selectedLeadSource === 'target-search' ? 'text-emerald-600' : 'text-gray-400'}`}>
                                            Use LinkedIn search results
                                        </p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => setSelectedLeadSource('upload')}
                                    className={`w-full flex items-center gap-3 p-3.5 rounded-2xl transition-all text-left ${
                                        selectedLeadSource === 'upload'
                                            ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/50 shadow-sm'
                                            : 'bg-white/50 hover:bg-white hover:shadow-sm border border-gray-100'
                                    }`}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                        selectedLeadSource === 'upload' ? 'bg-gradient-to-br from-emerald-100 to-teal-100' : 'bg-gray-50'
                                    }`}>
                                        <Upload className={`h-4 w-4 ${selectedLeadSource === 'upload' ? 'text-emerald-600' : 'text-gray-500'}`} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-semibold text-sm mb-0.5 ${selectedLeadSource === 'upload' ? 'text-emerald-900' : 'text-gray-700'}`}>
                                            Upload leads
                                        </h3>
                                        <p className={`text-xs leading-tight ${selectedLeadSource === 'upload' ? 'text-emerald-600' : 'text-gray-400'}`}>
                                            Import from CSV or paste URLs
                                        </p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => setSelectedLeadSource('other-campaign')}
                                    className={`w-full flex items-center gap-3 p-3.5 rounded-2xl transition-all text-left ${
                                        selectedLeadSource === 'other-campaign'
                                            ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/50 shadow-sm'
                                            : 'bg-white/50 hover:bg-white hover:shadow-sm border border-gray-100'
                                    }`}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                        selectedLeadSource === 'other-campaign' ? 'bg-gradient-to-br from-emerald-100 to-teal-100' : 'bg-gray-50'
                                    }`}>
                                        <Users className={`h-4 w-4 ${selectedLeadSource === 'other-campaign' ? 'text-emerald-600' : 'text-gray-500'}`} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-semibold text-sm mb-0.5 ${selectedLeadSource === 'other-campaign' ? 'text-emerald-900' : 'text-gray-700'}`}>
                                            Use from other campaign
                                        </h3>
                                        <p className={`text-xs leading-tight ${selectedLeadSource === 'other-campaign' ? 'text-emerald-600' : 'text-gray-400'}`}>
                                            Reuse leads from existing campaign
                                        </p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => setSelectedLeadSource('active-search')}
                                    className={`w-full flex items-center gap-3 p-3.5 rounded-2xl transition-all text-left ${
                                        selectedLeadSource === 'active-search'
                                            ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/50 shadow-sm'
                                            : 'bg-white/50 hover:bg-white hover:shadow-sm border border-gray-100'
                                    }`}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                        selectedLeadSource === 'active-search' ? 'bg-gradient-to-br from-emerald-100 to-teal-100' : 'bg-gray-50'
                                    }`}>
                                        <Zap className={`h-4 w-4 ${selectedLeadSource === 'active-search' ? 'text-emerald-600' : 'text-gray-500'}`} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-semibold text-sm mb-0.5 ${selectedLeadSource === 'active-search' ? 'text-emerald-900' : 'text-gray-700'}`}>
                                            Active search
                                        </h3>
                                        <p className={`text-xs leading-tight ${selectedLeadSource === 'active-search' ? 'text-emerald-600' : 'text-gray-400'}`}>
                                            Auto-refresh search results
                                        </p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => setSelectedLeadSource('post-engagers')}
                                    className={`w-full flex items-center gap-3 p-3.5 rounded-2xl transition-all text-left ${
                                        selectedLeadSource === 'post-engagers'
                                            ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/50 shadow-sm'
                                            : 'bg-white/50 hover:bg-white hover:shadow-sm border border-gray-100'
                                    }`}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                        selectedLeadSource === 'post-engagers' ? 'bg-gradient-to-br from-emerald-100 to-teal-100' : 'bg-gray-50'
                                    }`}>
                                        <MessageSquare className={`h-4 w-4 ${selectedLeadSource === 'post-engagers' ? 'text-emerald-600' : 'text-gray-500'}`} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-semibold text-sm mb-0.5 ${selectedLeadSource === 'post-engagers' ? 'text-emerald-900' : 'text-gray-700'}`}>
                                            Post engagers
                                        </h3>
                                        <p className={`text-xs leading-tight ${selectedLeadSource === 'post-engagers' ? 'text-emerald-600' : 'text-gray-400'}`}>
                                            Target post interactions
                                        </p>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Right Side - Settings/Options */}
                        <div className="flex-1 bg-white p-8 overflow-y-auto">
                            {!selectedLeadSource ? (
                                <div className="flex items-center justify-center h-full text-gray-400">
                                    <div className="text-center">
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-50 flex items-center justify-center">
                                            <Search className="h-8 w-8 text-gray-300" />
                                        </div>
                                        <p className="text-base font-medium text-gray-900 mb-1">Select a lead source</p>
                                        <p className="text-sm text-gray-500">Choose an option from the left to configure your import</p>
                                    </div>
                                </div>
                            ) : selectedLeadSource === 'target-search' ? (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-5">Select Target Lists</h3>
                                        <div className="space-y-3">
                                                <div className="space-y-2.5">
                                                    {TARGET_LISTS.map((list) => (
                                                        <div
                                                            key={list.id}
                                                            onClick={() => toggleTargetList(list.id)}
                                                            className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50/50 transition-colors cursor-pointer"
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <Checkbox
                                                                    checked={selectedTargetLists.includes(list.id)}
                                                                    onCheckedChange={() => toggleTargetList(list.id)}
                                                                    onClick={(e) => e.stopPropagation()}
                                                                />
                                                                <div>
                                                                    <div className="font-semibold text-sm text-gray-900">{list.name}</div>
                                                                    <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                                                                        <Users className="h-3.5 w-3.5" />
                                                                        {list.leadCount.toLocaleString()} leads
                                                                        <span className="text-gray-300">•</span>
                                                                        {list.date}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <p className="text-sm text-gray-500 mt-4 px-1">{selectedTargetLists.length} list{selectedTargetLists.length !== 1 ? 's' : ''} selected</p>
                                        </div>
                                    </div>
                                </div>
                            ) : selectedLeadSource === 'upload' ? (
                            /* Upload Leads Content */
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-gray-900">Upload CSV File</label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-emerald-300 transition-colors cursor-pointer h-[300px] flex flex-col items-center justify-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
                                                <FileText className="h-6 w-6 text-emerald-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    Click to upload or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    CSV file with columns: Name, LinkedIn URL, Job Title, Company
                                                </p>
                                            </div>
                                            <Button variant="outline" size="sm" className="mt-2">
                                                Choose File
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-gray-900">Paste LinkedIn URLs</label>
                                    <Textarea
                                        placeholder="https://linkedin.com/in/john-doe&#10;https://linkedin.com/in/jane-smith&#10;https://linkedin.com/in/sarah-wilson"
                                        className="min-h-[300px] font-mono text-sm resize-none"
                                    />
                                    <p className="text-xs text-gray-500">
                                        Paste one LinkedIn profile URL per line. We'll automatically extract the profile information.
                                    </p>
                                </div>
                            </div>
                        ) : selectedLeadSource === 'other-campaign' ? (
                            /* Use from Other Campaign Content */
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Import from Other Campaign</h3>
                                    <p className="text-sm text-gray-500 mb-5">
                                        Select a campaign to import leads from
                                    </p>

                                    {/* Campaign Selection Dropdown */}
                                    <div className="mb-6">
                                        <label className="text-sm font-medium text-gray-900 mb-3 block">Select a campaign to import leads from</label>
                                        <Select value={selectedCampaign || ''} onValueChange={(value) => setSelectedCampaign(value)}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Choose a campaign..." />
                                            </SelectTrigger>
                                            <SelectContent className="max-h-[300px]">
                                                {MOCK_CAMPAIGNS.map((campaign) => (
                                                    <SelectItem key={campaign.id} value={campaign.id}>
                                                        <div className="flex items-center gap-2">
                                                            <span>{campaign.emoji}</span>
                                                            <span>{campaign.name} ({campaign.leadCount})</span>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {selectedCampaign && (
                                        <div className="space-y-4 border-t border-gray-200 pt-6">
                                            <h4 className="text-sm font-semibold text-gray-900 mb-4">Import leads who...</h4>

                                            {/* AI Sentiment Filter */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Have this AI sentiment</label>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className="w-full justify-between font-normal"
                                                        >
                                                            {selectedSentiments.length === 0
                                                                ? "Select sentiments..."
                                                                : `${selectedSentiments.length} sentiment${selectedSentiments.length !== 1 ? 's' : ''} selected`}
                                                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-full p-0" align="start">
                                                        <div className="max-h-[300px] overflow-y-auto p-1">
                                                            {AI_SENTIMENTS.map((sentiment) => (
                                                                <label
                                                                    key={sentiment}
                                                                    className="flex items-center gap-2 px-2 py-2 cursor-pointer hover:bg-gray-100 rounded-sm"
                                                                >
                                                                    <Checkbox
                                                                        checked={selectedSentiments.includes(sentiment)}
                                                                        onCheckedChange={(checked) => {
                                                                            if (checked) {
                                                                                setSelectedSentiments([...selectedSentiments, sentiment]);
                                                                            } else {
                                                                                setSelectedSentiments(selectedSentiments.filter(s => s !== sentiment));
                                                                            }
                                                                        }}
                                                                    />
                                                                    <span className="text-sm">{sentiment}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                                {selectedSentiments.length > 0 && (
                                                    <div className="flex flex-wrap gap-1 mt-2">
                                                        {selectedSentiments.map((sentiment) => (
                                                            <Badge key={sentiment} variant="secondary" className="gap-1">
                                                                {sentiment}
                                                                <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedSentiments(selectedSentiments.filter(s => s !== sentiment))} />
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Email & LinkedIn Filters */}
                                            <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2">
                                                <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                                                    <Checkbox
                                                        checked={leadFilters.receivedEmail}
                                                        onCheckedChange={(checked) => setLeadFilters({...leadFilters, receivedEmail: !!checked})}
                                                    />
                                                    <span className="text-sm text-gray-700">Received an email</span>
                                                </label>

                                                <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                                                    <Checkbox
                                                        checked={leadFilters.notReceivedEmail}
                                                        onCheckedChange={(checked) => setLeadFilters({...leadFilters, notReceivedEmail: !!checked})}
                                                    />
                                                    <span className="text-sm text-gray-600">NOT received an email</span>
                                                </label>

                                                <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                                                    <Checkbox
                                                        checked={leadFilters.openedEmail}
                                                        onCheckedChange={(checked) => setLeadFilters({...leadFilters, openedEmail: !!checked})}
                                                    />
                                                    <span className="text-sm text-gray-700">Opened an email</span>
                                                </label>

                                                <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                                                    <Checkbox
                                                        checked={leadFilters.notOpenedEmail}
                                                        onCheckedChange={(checked) => setLeadFilters({...leadFilters, notOpenedEmail: !!checked})}
                                                    />
                                                    <span className="text-sm text-gray-600">NOT opened an email</span>
                                                </label>

                                                <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                                                    <Checkbox
                                                        checked={leadFilters.clickedLink}
                                                        onCheckedChange={(checked) => setLeadFilters({...leadFilters, clickedLink: !!checked})}
                                                    />
                                                    <span className="text-sm text-gray-700">Click on a link of an email</span>
                                                </label>

                                                <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                                                    <Checkbox
                                                        checked={leadFilters.notClickedLink}
                                                        onCheckedChange={(checked) => setLeadFilters({...leadFilters, notClickedLink: !!checked})}
                                                    />
                                                    <span className="text-sm text-gray-600">NOT clicked on a link of an email</span>
                                                </label>

                                                <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                                                    <Checkbox
                                                        checked={leadFilters.repliedEmail}
                                                        onCheckedChange={(checked) => setLeadFilters({...leadFilters, repliedEmail: !!checked})}
                                                    />
                                                    <span className="text-sm text-gray-700">Replied to an email</span>
                                                </label>

                                                <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                                                    <Checkbox
                                                        checked={leadFilters.notRepliedEmail}
                                                        onCheckedChange={(checked) => setLeadFilters({...leadFilters, notRepliedEmail: !!checked})}
                                                    />
                                                    <span className="text-sm text-gray-600">NOT replied to an email</span>
                                                </label>

                                                <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                                                    <Checkbox
                                                        checked={leadFilters.acceptedInvitation}
                                                        onCheckedChange={(checked) => setLeadFilters({...leadFilters, acceptedInvitation: !!checked})}
                                                    />
                                                    <span className="text-sm text-gray-700">Accepted invitation on LinkedIn</span>
                                                </label>

                                                <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                                                    <Checkbox
                                                        checked={leadFilters.openedLinkedinMessage}
                                                        onCheckedChange={(checked) => setLeadFilters({...leadFilters, openedLinkedinMessage: !!checked})}
                                                    />
                                                    <span className="text-sm text-gray-700">Opened a linkedin message</span>
                                                </label>

                                                <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                                                    <Checkbox
                                                        checked={leadFilters.repliedLinkedinMessage}
                                                        onCheckedChange={(checked) => setLeadFilters({...leadFilters, repliedLinkedinMessage: !!checked})}
                                                    />
                                                    <span className="text-sm text-gray-700">Replied to a linkedin message</span>
                                                </label>

                                                <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                                                    <Checkbox
                                                        checked={leadFilters.notRepliedLinkedinMessage}
                                                        onCheckedChange={(checked) => setLeadFilters({...leadFilters, notRepliedLinkedinMessage: !!checked})}
                                                    />
                                                    <span className="text-sm text-gray-600">NOT replied to a linkedin message</span>
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : selectedLeadSource === 'post-engagers' ? (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Post Engagers</h3>
                                        <p className="text-sm text-gray-500 mb-5">
                                            Add LinkedIn post URLs to target users who engaged with these posts
                                        </p>

                                        {/* Refresh Rate Selection */}
                                        <div className="mb-6 space-y-3">
                                            <label className="text-sm font-medium text-gray-900">Refresh Rate</label>
                                            <div className="flex gap-3 items-center">
                                                <Select value={refreshRate} onValueChange={(value: any) => setRefreshRate(value)}>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Select refresh rate" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="daily">Daily</SelectItem>
                                                        <SelectItem value="weekly">Weekly</SelectItem>
                                                        <SelectItem value="monthly">Monthly</SelectItem>
                                                        <SelectItem value="custom">Custom</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                {refreshRate === 'custom' && (
                                                    <div className="flex items-center gap-2">
                                                        <Input
                                                            type="number"
                                                            min="1"
                                                            value={customRefreshDays}
                                                            onChange={(e) => setCustomRefreshDays(parseInt(e.target.value) || 1)}
                                                            className="w-20"
                                                        />
                                                        <span className="text-sm text-gray-600">days</span>
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-1.5 text-xs text-emerald-600 ml-auto">
                                                    <RefreshCw className="h-3.5 w-3.5" />
                                                    <span>Auto-refresh enabled</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Add Post URL Input */}
                                        <div className="space-y-4">
                                            <div className="flex gap-2">
                                                <Input
                                                    placeholder="https://www.linkedin.com/posts/..."
                                                    value={newPostUrl}
                                                    onChange={(e) => setNewPostUrl(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            handleAddPostUrl();
                                                        }
                                                    }}
                                                    className="flex-1"
                                                />
                                                <Button
                                                    onClick={handleAddPostUrl}
                                                    disabled={!newPostUrl.trim()}
                                                    className="gap-2"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                    Add Post
                                                </Button>
                                            </div>

                                            {/* List of Added Posts */}
                                            {postUrls.length > 0 && (
                                                <div className="space-y-3 mt-6">
                                                    <h4 className="text-sm font-semibold text-gray-700">Added Posts ({postUrls.length})</h4>
                                                    <div className="space-y-2.5">
                                                        {postUrls.map((post) => (
                                                            <div
                                                                key={post.id}
                                                                className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white hover:border-gray-300 transition-colors"
                                                            >
                                                                <div className="flex-1 min-w-0 mr-4">
                                                                    <div className="flex items-center gap-2 mb-2">
                                                                        <MessageSquare className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                                                        <p className="text-sm text-gray-900 font-medium truncate" title={post.url}>
                                                                            {post.url}
                                                                        </p>
                                                                    </div>
                                                                    <div className="flex items-center gap-4 text-xs">
                                                                        <div className="flex items-center gap-1.5 text-gray-600">
                                                                            <ThumbsUp className="h-3.5 w-3.5 text-blue-500" />
                                                                            <span className="font-medium">{post.likes.toLocaleString()}</span>
                                                                            <span className="text-gray-400">likes</span>
                                                                        </div>
                                                                        <div className="flex items-center gap-1.5 text-gray-600">
                                                                            <Heart className="h-3.5 w-3.5 text-red-500" />
                                                                            <span className="font-medium">{post.reactions.toLocaleString()}</span>
                                                                            <span className="text-gray-400">reactions</span>
                                                                        </div>
                                                                        <div className="flex items-center gap-1.5 text-gray-600">
                                                                            <Repeat2 className="h-3.5 w-3.5 text-green-500" />
                                                                            <span className="font-medium">{post.reposts.toLocaleString()}</span>
                                                                            <span className="text-gray-400">reposts</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    onClick={() => handleRemovePostUrl(post.id)}
                                                                    className="flex-shrink-0 h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50"
                                                                >
                                                                    <X className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {postUrls.length === 0 && (
                                                <div className="text-center py-8 px-4 border border-dashed border-gray-300 rounded-xl bg-gray-50/30">
                                                    <MessageSquare className="h-10 w-10 mx-auto mb-3 text-gray-300" />
                                                    <p className="text-sm text-gray-500">
                                                        No posts added yet. Add LinkedIn post URLs to get started.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : selectedLeadSource === 'active-search' ? (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Search</h3>
                                        <p className="text-sm text-gray-500 mb-5">
                                            Add LinkedIn search URLs that will be automatically refreshed to find new leads
                                        </p>

                                        {/* Refresh Rate Selection */}
                                        <div className="mb-6 space-y-3">
                                            <label className="text-sm font-medium text-gray-900">Refresh Rate</label>
                                            <div className="flex gap-3 items-center">
                                                <Select value={refreshRate} onValueChange={(value: any) => setRefreshRate(value)}>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Select refresh rate" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="daily">Daily</SelectItem>
                                                        <SelectItem value="weekly">Weekly</SelectItem>
                                                        <SelectItem value="monthly">Monthly</SelectItem>
                                                        <SelectItem value="custom">Custom</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                {refreshRate === 'custom' && (
                                                    <div className="flex items-center gap-2">
                                                        <Input
                                                            type="number"
                                                            min="1"
                                                            value={customRefreshDays}
                                                            onChange={(e) => setCustomRefreshDays(parseInt(e.target.value) || 1)}
                                                            className="w-20"
                                                        />
                                                        <span className="text-sm text-gray-600">days</span>
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-1.5 text-xs text-emerald-600 ml-auto">
                                                    <RefreshCw className="h-3.5 w-3.5" />
                                                    <span>Auto-refresh enabled</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Add Search URL Input */}
                                        <div className="space-y-4">
                                            <div className="flex gap-2">
                                                <Input
                                                    placeholder="https://www.linkedin.com/search/results/people/?keywords=..."
                                                    value={newSearchUrl}
                                                    onChange={(e) => setNewSearchUrl(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            handleAddSearchUrl();
                                                        }
                                                    }}
                                                    className="flex-1"
                                                />
                                                <Button
                                                    onClick={handleAddSearchUrl}
                                                    disabled={!newSearchUrl.trim()}
                                                    className="gap-2"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                    Add Search
                                                </Button>
                                            </div>

                                            {/* List of Added Search URLs */}
                                            {searchUrls.length > 0 && (
                                                <div className="space-y-3 mt-6">
                                                    <h4 className="text-sm font-semibold text-gray-700">Active Searches ({searchUrls.length})</h4>
                                                    <div className="space-y-2.5">
                                                        {searchUrls.map((search) => (
                                                            <div
                                                                key={search.id}
                                                                className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white hover:border-gray-300 transition-colors"
                                                            >
                                                                <div className="flex-1 min-w-0 mr-4">
                                                                    <div className="flex items-center gap-2 mb-2">
                                                                        <Search className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                                                        <p className="text-sm text-gray-900 font-medium truncate" title={search.url}>
                                                                            {search.url}
                                                                        </p>
                                                                    </div>
                                                                    <div className="flex items-center gap-4 text-xs">
                                                                        <div className="flex items-center gap-1.5 text-gray-600">
                                                                            <Users className="h-3.5 w-3.5 text-emerald-500" />
                                                                            <span className="font-medium">{search.leadCount.toLocaleString()}</span>
                                                                            <span className="text-gray-400">leads found</span>
                                                                        </div>
                                                                        <div className="flex items-center gap-1.5 text-gray-600">
                                                                            <RefreshCw className="h-3.5 w-3.5 text-blue-500" />
                                                                            <span className="text-gray-400">Last refreshed:</span>
                                                                            <span className="font-medium">{search.lastRefreshed.toLocaleDateString()}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    onClick={() => handleRemoveSearchUrl(search.id)}
                                                                    className="flex-shrink-0 h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50"
                                                                >
                                                                    <X className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {searchUrls.length === 0 && (
                                                <div className="text-center py-8 px-4 border border-dashed border-gray-300 rounded-xl bg-gray-50/30">
                                                    <Search className="h-10 w-10 mx-auto mb-3 text-gray-300" />
                                                    <p className="text-sm text-gray-500">
                                                        No active searches yet. Add LinkedIn search URLs to get started.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">
                                    <div className="text-center">
                                        <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                        <p className="text-sm">This feature is coming soon</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between items-center gap-3 px-8 py-4 border-t border-gray-200 bg-white flex-shrink-0">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsImportModalOpen(false);
                                setSelectedLeadSource(null);
                            }}
                        >
                            Cancel
                        </Button>
                        {selectedLeadSource && (
                            <Button
                                onClick={() => {
                                    setLeads(MOCK_LEADS);
                                    setIsImportModalOpen(false);
                                    setSelectedLeadSource(null);
                                }}
                                className="bg-[#10b981] hover:bg-[#059669] text-white"
                            >
                                {selectedLeadSource === 'other-campaign' && selectedCampaign
                                    ? `Import ${MOCK_CAMPAIGNS.find(c => c.id === selectedCampaign)?.leadCount || 0} leads`
                                    : 'Import Leads'}
                            </Button>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};
