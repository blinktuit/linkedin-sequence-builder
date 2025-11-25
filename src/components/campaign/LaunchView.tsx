import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Users,
    MessageSquare,
    Clock,
    Rocket,
    CheckCircle2,
    AlertTriangle,
    Target,
    Zap,
    BarChart3,
    Building2,
    MapPin,
    Sparkles,
    Settings
} from "lucide-react";
import type { CampaignStep } from "@/types/campaign";

interface LaunchViewProps {
    steps: CampaignStep[];
    campaignName: string;
    onLaunch?: () => void;
}

// Mock data for demo purposes
const mockAudienceData = {
    totalLeads: 1247,
    validLeads: 1189,
    excludedLeads: 58,
    duplicates: 12,
    topIndustries: [
        { name: 'Construction', count: 342 },
        { name: 'Manufacturing', count: 289 },
        { name: 'Wholesale', count: 198 },
    ],
    topLocations: [
        { name: 'Birmingham, UK', count: 412 },
        { name: 'London, UK', count: 287 },
        { name: 'Manchester, UK', count: 156 },
    ],
    dailyLimit: 50,
};

export const LaunchView = ({ steps, campaignName, onLaunch }: LaunchViewProps) => {
    // Filter out the start step for display
    const sequenceSteps = steps.filter(s => s.type !== 'start' && !s.parentStepId);
    const isSingleStep = sequenceSteps.length === 1;

    // Calculate estimated duration based on steps
    const estimatedDuration = isSingleStep ? '24 days' : `${Math.ceil(mockAudienceData.validLeads / mockAudienceData.dailyLimit)} days`;

    const maxIndustryCount = Math.max(...mockAudienceData.topIndustries.map(i => i.count));
    const maxLocationCount = Math.max(...mockAudienceData.topLocations.map(l => l.count));

    if (isSingleStep) {
        // Single step campaign - simpler view
        return (
            <div className="h-full flex flex-col bg-white">
                <div className="flex-1 p-6 max-w-4xl mx-auto w-full">
                    {/* Hero Header */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#36b39a] via-[#4ac4ad] to-[#5ed4be] p-6 text-white mb-6">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-1">
                                <Sparkles className="h-4 w-4" />
                                <span className="text-xs font-medium text-white/80">Single Action Campaign</span>
                            </div>
                            <h1 className="text-2xl font-bold mb-1">{campaignName}</h1>
                            <p className="text-white/80 text-sm">Send {sequenceSteps[0]?.title || 'action'} to your leads</p>
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-4 gap-4 mb-6">
                        <div className="rounded-xl bg-[#36b39a]/5 p-4 border border-[#36b39a]/20">
                            <Users className="h-5 w-5 text-[#36b39a] mb-1" />
                            <p className="text-2xl font-bold text-gray-900">{mockAudienceData.validLeads.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">Active leads</p>
                        </div>
                        <div className="rounded-xl bg-blue-50/50 p-4 border border-blue-100">
                            <MessageSquare className="h-5 w-5 text-blue-500 mb-1" />
                            <p className="text-2xl font-bold text-gray-900">1</p>
                            <p className="text-xs text-gray-500">Action</p>
                        </div>
                        <div className="rounded-xl bg-gray-50 p-4 border border-gray-200/50">
                            <Clock className="h-5 w-5 text-gray-500 mb-1" />
                            <p className="text-2xl font-bold text-gray-900">{estimatedDuration}</p>
                            <p className="text-xs text-gray-500">Est. duration</p>
                        </div>
                        <div className="rounded-xl bg-[#f49854]/5 p-4 border border-[#f49854]/20">
                            <Zap className="h-5 w-5 text-[#f49854] mb-1" />
                            <p className="text-2xl font-bold text-gray-900">{mockAudienceData.dailyLimit}</p>
                            <p className="text-xs text-gray-500">Daily actions</p>
                        </div>
                    </div>

                    {/* Two Column Layout */}
                    <div className="grid grid-cols-2 gap-5 mb-6">
                        {/* Action Preview */}
                        <div className="rounded-xl border bg-white p-5 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#36b39a] to-[#4ac4ad] flex items-center justify-center">
                                    <Target className="h-4 w-4 text-white" />
                                </div>
                                <h3 className="font-semibold text-sm">Your Action</h3>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <div className="h-10 w-10 rounded-lg bg-[#36b39a]/10 flex items-center justify-center">
                                    <MessageSquare className="h-5 w-5 text-[#36b39a]" />
                                </div>
                                <div>
                                    <p className="font-medium text-sm">{sequenceSteps[0]?.title || 'Connection Request'}</p>
                                    <p className="text-xs text-gray-500">{sequenceSteps[0]?.subtitle || 'Send to all leads'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Audience Overview */}
                        <div className="rounded-xl border bg-white p-5 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                                    <BarChart3 className="h-4 w-4 text-white" />
                                </div>
                                <h3 className="font-semibold text-sm">Top Industries</h3>
                            </div>
                            <div className="space-y-2">
                                {mockAudienceData.topIndustries.map((item, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between text-xs mb-0.5">
                                            <span>{item.name}</span>
                                            <span className="text-gray-400">{item.count}</span>
                                        </div>
                                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(item.count / maxIndustryCount) * 100}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* AI Prediction */}
                    <div className="rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[1px]">
                        <div className="rounded-xl bg-white p-4 h-full">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                                        <Sparkles className="h-4 w-4 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-sm">AI Prediction</h3>
                                        <p className="text-xs text-gray-500">Based on similar campaigns</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="text-center">
                                        <p className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">~35%</p>
                                        <p className="text-xs text-gray-500">Accept rate</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">~416</p>
                                        <p className="text-xs text-gray-500">Est. accepts</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fixed Footer with Launch Button and "What you can change" */}
                <div className="border-t bg-gray-50 px-6 py-4">
                    <div className="max-w-4xl mx-auto flex items-center justify-between">
                        {/* What you can change - compact horizontal layout */}
                        <div className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5 text-gray-600">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                                    <span>Edit message</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-600">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                                    <span>Add/remove leads</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-600">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                                    <span>Pause anytime</span>
                                </div>
                            </div>
                        </div>

                        <Button
                            size="lg"
                            onClick={onLaunch}
                            className="gap-3 px-10 h-12 text-base rounded-xl bg-gradient-to-r from-[#36b39a] to-[#4ac4ad] hover:from-[#2ea88f] hover:to-[#3fb9a2] shadow-lg shadow-[#36b39a]/20 hover:shadow-[#36b39a]/30 transition-all"
                        >
                            <Rocket className="h-5 w-5" />
                            Launch Campaign
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // Multi-step campaign - full view
    return (
        <div className="h-full flex flex-col bg-white">
            <div className="flex-1 p-6 max-w-6xl mx-auto w-full">
                {/* Top Section: Header + Stats */}
                <div className="flex gap-6 mb-6">
                    {/* Hero Header */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#36b39a] via-[#4ac4ad] to-[#5ed4be] p-6 text-white flex-1">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-1">
                                <Sparkles className="h-4 w-4" />
                                <span className="text-xs font-medium text-white/80">Campaign Ready</span>
                            </div>
                            <h1 className="text-2xl font-bold mb-1">{campaignName}</h1>
                            <p className="text-white/80 text-sm">Review your campaign summary before going live</p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 w-[320px]">
                        <div className="rounded-xl bg-[#36b39a]/5 p-4 border border-[#36b39a]/20">
                            <Users className="h-5 w-5 text-[#36b39a] mb-1" />
                            <p className="text-2xl font-bold text-gray-900">{mockAudienceData.validLeads.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">Active leads</p>
                        </div>
                        <div className="rounded-xl bg-blue-50/50 p-4 border border-blue-100">
                            <MessageSquare className="h-5 w-5 text-blue-500 mb-1" />
                            <p className="text-2xl font-bold text-gray-900">{sequenceSteps.length}</p>
                            <p className="text-xs text-gray-500">Sequence steps</p>
                        </div>
                        <div className="rounded-xl bg-gray-50 p-4 border border-gray-200/50">
                            <Clock className="h-5 w-5 text-gray-500 mb-1" />
                            <p className="text-2xl font-bold text-gray-900">{estimatedDuration}</p>
                            <p className="text-xs text-gray-500">Est. duration</p>
                        </div>
                        <div className="rounded-xl bg-[#f49854]/5 p-4 border border-[#f49854]/20">
                            <Zap className="h-5 w-5 text-[#f49854] mb-1" />
                            <p className="text-2xl font-bold text-gray-900">{mockAudienceData.dailyLimit}</p>
                            <p className="text-xs text-gray-500">Daily actions</p>
                        </div>
                    </div>
                </div>

                {/* Middle Section: 2 Columns */}
                <div className="grid grid-cols-2 gap-5 mb-6">
                    {/* Column 1 - Sequence Overview */}
                    <div className="rounded-xl border bg-white p-5 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#36b39a] to-[#4ac4ad] flex items-center justify-center">
                                <Target className="h-4 w-4 text-white" />
                            </div>
                            <h3 className="font-semibold text-sm">Sequence Flow</h3>
                        </div>
                        <div className="space-y-2">
                            {sequenceSteps.map((step, index) => (
                                <div key={step.id} className="flex items-center gap-2">
                                    <div className="h-6 w-6 rounded-md bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500">
                                        {index + 1}
                                    </div>
                                    <span className="text-sm text-gray-700 flex-1">{step.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Column 2 - Audience Insights */}
                    <div className="rounded-xl border bg-white p-5 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                                <BarChart3 className="h-4 w-4 text-white" />
                            </div>
                            <h3 className="font-semibold text-sm">Audience Insights</h3>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <div className="flex items-center gap-1.5 mb-2">
                                    <Building2 className="h-3 w-3 text-gray-400" />
                                    <span className="text-xs font-medium text-gray-500 uppercase">Industries</span>
                                </div>
                                {mockAudienceData.topIndustries.map((item, i) => (
                                    <div key={i} className="mb-1.5">
                                        <div className="flex justify-between text-xs mb-0.5">
                                            <span>{item.name}</span>
                                            <span className="text-gray-400">{item.count}</span>
                                        </div>
                                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(item.count / maxIndustryCount) * 100}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Separator />
                            <div>
                                <div className="flex items-center gap-1.5 mb-2">
                                    <MapPin className="h-3 w-3 text-gray-400" />
                                    <span className="text-xs font-medium text-gray-500 uppercase">Locations</span>
                                </div>
                                {mockAudienceData.topLocations.map((item, i) => (
                                    <div key={i} className="mb-1.5">
                                        <div className="flex justify-between text-xs mb-0.5">
                                            <span>{item.name}</span>
                                            <span className="text-gray-400">{item.count}</span>
                                        </div>
                                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-[#36b39a] rounded-full" style={{ width: `${(item.count / maxLocationCount) * 100}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: AI Predictions + Warning */}
                <div className="flex gap-5">
                    {/* AI Predictions */}
                    <div className="flex-1 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[1px]">
                        <div className="rounded-xl bg-white p-4 h-full">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                                        <Sparkles className="h-4 w-4 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-sm">AI Predictions</h3>
                                        <p className="text-xs text-gray-500">Based on similar campaigns</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="text-center">
                                        <p className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">~35%</p>
                                        <p className="text-xs text-gray-500">Accept rate</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">~12%</p>
                                        <p className="text-xs text-gray-500">Reply rate</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">~142</p>
                                        <p className="text-xs text-gray-500">Est. replies</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Warning */}
                    {mockAudienceData.excludedLeads > 0 && (
                        <div className="flex items-center gap-3 px-4 rounded-xl bg-amber-50 border border-amber-200 w-[280px]">
                            <div className="h-8 w-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                                <AlertTriangle className="h-4 w-4 text-amber-600" />
                            </div>
                            <p className="text-sm text-amber-800">
                                <span className="font-semibold">{mockAudienceData.excludedLeads} excluded</span><br />
                                <span className="text-xs">{mockAudienceData.duplicates} duplicates removed</span>
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Fixed Footer with Launch Button and "What you can change" */}
            <div className="border-t bg-gray-50 px-6 py-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    {/* What you can change - compact horizontal layout */}
                    <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5 text-gray-600">
                                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                                <span>Edit messages</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-600">
                                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                                <span>Adjust delays</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-600">
                                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                                <span>Add/remove leads</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-600">
                                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                                <span>Pause anytime</span>
                            </div>
                        </div>
                        <Separator orientation="vertical" className="h-4" />
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5 text-gray-400">
                                <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                                <span>No step changes</span>
                            </div>
                        </div>
                    </div>

                    <Button
                        size="lg"
                        onClick={onLaunch}
                        className="gap-3 px-10 h-12 text-base rounded-xl bg-gradient-to-r from-[#36b39a] to-[#4ac4ad] hover:from-[#2ea88f] hover:to-[#3fb9a2] shadow-lg shadow-[#36b39a]/20 hover:shadow-[#36b39a]/30 transition-all"
                    >
                        <Rocket className="h-5 w-5" />
                        Launch Campaign
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LaunchView;
