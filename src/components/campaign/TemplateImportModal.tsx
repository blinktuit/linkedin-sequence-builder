import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Clock, FileText } from "lucide-react";

interface TemplateImportModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSelectTemplate: (template: Template) => void;
}

interface Template {
    id: string;
    name: string;
    emoji: string;
    steps: number;
    timeAgo: string;
    type: 'custom' | 'premade';
}

const MOCK_TEMPLATES: Template[] = [
    { id: '1', name: 'Cold Outreach Sequence', emoji: '🚀', steps: 5, timeAgo: '2 days ago', type: 'custom' },
    { id: '2', name: 'Follow-up Campaign', emoji: '📧', steps: 3, timeAgo: '1 week ago', type: 'premade' },
    { id: '3', name: 'Event Attendee Outreach', emoji: '🎉', steps: 4, timeAgo: '2 weeks ago', type: 'premade' },
    { id: '4', name: 'Recruiter Outreach', emoji: '🤝', steps: 4, timeAgo: '3 days ago', type: 'custom' },
    { id: '5', name: 'Webinar Invite', emoji: '📹', steps: 3, timeAgo: '1 month ago', type: 'premade' }
];

export const TemplateImportModal = ({ open, onOpenChange, onSelectTemplate }: TemplateImportModalProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState<'all' | 'custom' | 'premade'>('all');

    const filteredTemplates = MOCK_TEMPLATES.filter(template => {
        const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === 'all' || template.type === filterType;
        return matchesSearch && matchesType;
    });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col p-0 gap-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle className="text-xl font-semibold">Pick a template</DialogTitle>
                </DialogHeader>

                <div className="px-6 pb-4 space-y-4">
                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search templates..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                        />
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex gap-2">
                        <Button
                            variant={filterType === 'all' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilterType('all')}
                            className={filterType === 'all' ? 'bg-[#10b981] hover:bg-[#059669]' : ''}
                        >
                            All
                        </Button>
                        <Button
                            variant={filterType === 'custom' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilterType('custom')}
                            className={filterType === 'custom' ? 'bg-[#10b981] hover:bg-[#059669]' : ''}
                        >
                            Custom
                        </Button>
                        <Button
                            variant={filterType === 'premade' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilterType('premade')}
                            className={filterType === 'premade' ? 'bg-[#10b981] hover:bg-[#059669]' : ''}
                        >
                            Premade
                        </Button>
                    </div>
                </div>

                {/* Templates List */}
                <div className="flex-1 overflow-y-auto px-6 pb-6">
                    <div className="space-y-3">
                        {filteredTemplates.map((template) => (
                            <button
                                key={template.id}
                                onClick={() => {
                                    onSelectTemplate(template);
                                    onOpenChange(false);
                                }}
                                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all text-left group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="text-3xl">{template.emoji}</div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-gray-900 group-hover:text-gray-950">
                                                {template.name}
                                            </h3>
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                                                template.type === 'custom'
                                                    ? 'bg-emerald-100 text-emerald-700'
                                                    : 'bg-blue-100 text-blue-700'
                                            }`}>
                                                {template.type}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <FileText className="h-3.5 w-3.5" />
                                                <span>{template.steps} steps</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-3.5 w-3.5" />
                                                <span>{template.timeAgo}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
