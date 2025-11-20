import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
    Search,
    Filter,
    ArrowUpDown,
    Share2,
    Plus,
    Minus,
    Linkedin,
    Briefcase
} from "lucide-react";

interface TargetListFilterModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    listName: string;
}

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
    excluded: boolean;
}

const MOCK_LEADS: Lead[] = [
    {
        id: '1',
        name: 'Anwar Shamim',
        linkedinUrl: '#',
        jobTitle: 'Procurement Lead Officer',
        company: 'West Midlands',
        companyUrl: '#',
        hqLocation: 'Birmingham, England, UK',
        personalLocation: 'Birmingham, England, UK',
        industry: 'Government Administration',
        score: 3,
        certainty: 8,
        excluded: false
    },
    {
        id: '2',
        name: 'Michael Dunphy',
        linkedinUrl: '#',
        jobTitle: 'Head of Procurement & Supply Chain',
        company: 'Rexel UK Ltd',
        companyUrl: '#',
        hqLocation: 'Birmingham, England, UK',
        personalLocation: 'West Midlands, England',
        industry: 'Wholesale',
        score: 3,
        certainty: 5,
        excluded: false
    },
    {
        id: '3',
        name: 'Jordan Bourne CIPS',
        linkedinUrl: '#',
        jobTitle: 'Head of Strategic Procurement',
        company: 'MV Kelly',
        companyUrl: '#',
        hqLocation: 'Solihull, England, United Kingdom',
        personalLocation: 'Birmingham, England, UK',
        industry: 'Civil Engineering',
        score: 4,
        certainty: 8,
        excluded: false
    },
    {
        id: '4',
        name: 'Martin Allen',
        linkedinUrl: '#',
        jobTitle: 'Procurement Manager',
        company: 'BCS Group',
        companyUrl: '#',
        hqLocation: 'Walsall, England, United Kingdom',
        personalLocation: 'Birmingham, England, UK',
        industry: 'Construction',
        score: 3,
        certainty: 7,
        excluded: false
    },
    {
        id: '5',
        name: 'Luke Earl',
        linkedinUrl: '#',
        jobTitle: 'Operations & Procurement Manager',
        company: 'College of Medicine',
        companyUrl: '#',
        hqLocation: 'Birmingham, England, UK',
        personalLocation: 'Birmingham, England, UK',
        industry: 'Education Administration',
        score: 2,
        certainty: 8,
        excluded: false
    },
    {
        id: '6',
        name: 'Rachael Hewitt',
        linkedinUrl: '#',
        jobTitle: 'Procurement Director',
        company: 'Caudwell Marine',
        companyUrl: '#',
        hqLocation: 'Coventry, England, United Kingdom',
        personalLocation: 'Birmingham, England, UK',
        industry: 'Maritime Transportation',
        score: 4,
        certainty: 8,
        excluded: false
    },
    {
        id: '7',
        name: 'Nick Turner',
        linkedinUrl: '#',
        jobTitle: 'Indirect Procurement Manager',
        company: 'Norton Motorcycles',
        companyUrl: '#',
        hqLocation: 'Solihull, England, United Kingdom',
        personalLocation: 'Birmingham, England, UK',
        industry: 'Motor Vehicle Manufacturing',
        score: 4,
        certainty: 8,
        excluded: false
    },
    {
        id: '8',
        name: 'James Daly',
        linkedinUrl: '#',
        jobTitle: 'Procurement Manager',
        company: 'Headlam Group plc',
        companyUrl: '#',
        hqLocation: 'Coleshill, England, United Kingdom',
        personalLocation: 'West Midlands, England',
        industry: 'Wholesale',
        score: 4,
        certainty: 8,
        excluded: false
    },
    {
        id: '9',
        name: 'Max Butler',
        linkedinUrl: '#',
        jobTitle: 'Group Purchasing Manager',
        company: 'Mayflex',
        companyUrl: '#',
        hqLocation: 'Birmingham, England, UK',
        personalLocation: 'Birmingham, England, UK',
        industry: 'Information Technology',
        score: 5,
        certainty: 10,
        excluded: false
    },
    {
        id: '10',
        name: 'Ian Evans',
        linkedinUrl: '#',
        jobTitle: 'Sales Director',
        company: 'Aston & Fincher Ltd',
        companyUrl: '#',
        hqLocation: 'Birmingham, England, UK',
        personalLocation: 'Birmingham, England, UK',
        industry: 'Wholesale',
        score: 3,
        certainty: 6,
        excluded: false
    }
];

export const TargetListFilterModal = ({
    open,
    onOpenChange,
    listName
}: TargetListFilterModalProps) => {
    const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLeads, setSelectedLeads] = useState<string[]>([]);

    const filteredLeads = leads.filter(lead =>
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const includedCount = leads.filter(l => !l.excluded).length;
    const totalCount = leads.length;

    const toggleExclude = (id: string) => {
        setLeads(prev => prev.map(lead =>
            lead.id === id ? { ...lead, excluded: !lead.excluded } : lead
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

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[95vw] h-[90vh] flex flex-col p-0 gap-0">
                {/* Header */}
                <div className="px-6 py-4 border-b flex items-center justify-between bg-background">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="rounded-full px-4 h-8 border-primary text-primary hover:text-primary hover:bg-primary/5">
                                All
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Filter className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <ArrowUpDown className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 h-9 bg-muted/50 border-none"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-xs text-muted-foreground">
                                <span>contains</span>
                                <Search className="h-3 w-3" />
                                <Filter className="h-3 w-3" />
                            </div>
                        </div>

                        <Badge variant="outline" className="gap-1 text-primary border-primary/30 bg-primary/5 font-normal py-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            Lead Grader
                        </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/5 gap-2 font-medium">
                            Doorzetten naar klant
                            <Share2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Table Content */}
                <div className="flex-1 overflow-auto">
                    <Table>
                        <TableHeader className="sticky top-0 bg-background z-10 shadow-sm">
                            <TableRow className="hover:bg-transparent border-b-2">
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
                                <TableHead className="font-bold text-foreground">Personal location</TableHead>
                                <TableHead className="font-bold text-foreground">Industry</TableHead>
                                <TableHead className="font-bold text-foreground text-center w-[60px]">Score</TableHead>
                                <TableHead className="font-bold text-foreground text-center w-[80px]">Zekerheid</TableHead>
                                <TableHead className="w-[100px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredLeads.map((lead) => (
                                <TableRow key={lead.id} className={`group ${lead.excluded ? 'opacity-50 bg-muted/30' : ''}`}>
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
                                    <TableCell className="max-w-[150px] truncate" title={lead.personalLocation}>
                                        {lead.personalLocation}
                                    </TableCell>
                                    <TableCell className="max-w-[150px] truncate" title={lead.industry}>
                                        {lead.industry}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full border-2 font-bold text-sm ${getScoreColor(lead.score)}`}>
                                            {lead.score}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center text-muted-foreground">
                                        {lead.certainty}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => toggleExclude(lead.id)}
                                            className={`gap-1.5 h-8 ${lead.excluded ? 'text-muted-foreground' : 'text-foreground'}`}
                                        >
                                            {lead.excluded ? (
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
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t bg-background flex items-center justify-between">
                    <div className="text-sm font-medium">
                        Included: <span className="text-foreground">{includedCount}</span> <span className="text-muted-foreground">/ {totalCount}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#36b39a] text-sm font-medium">
                        All changes are saved
                        <div className="h-2 w-2 rounded-full bg-[#36b39a]" />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
