import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Users,
    MessageSquare,
    Clock,
    Rocket,
    CheckCircle2,
    AlertTriangle,
    Zap,
    Building2,
    MapPin,
    Sparkles,
    ArrowRight
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
    const isSingleStep = sequenceSteps.length <= 1;

    // Calculate estimated duration based on steps
    const estimatedDuration = isSingleStep ? '24 days' : `${Math.ceil(mockAudienceData.validLeads / mockAudienceData.dailyLimit)} days`;

    const maxIndustryCount = Math.max(...mockAudienceData.topIndustries.map(i => i.count));

    return (
        <div className="h-full w-full flex flex-col bg-white">
            <div className="flex-1 overflow-auto px-6 py-6">
                <div className="max-w-5xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                                    <Sparkles className="h-3 w-3" />
                                    Ready to launch
                                </div>
                            </div>
                            <h1 className="text-lg font-semibold text-gray-900">{campaignName}</h1>
                            <p className="text-sm text-gray-500">Review your campaign before going live</p>
                        </div>
                    </div>

                    {/* Stats Row - Full Width */}
                    <div className="grid grid-cols-4 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                            <Users className="h-5 w-5 text-primary mx-auto mb-2" />
                            <p className="text-2xl font-bold text-gray-900">{mockAudienceData.validLeads.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">Leads</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                            <MessageSquare className="h-5 w-5 text-blue-500 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-gray-900">{sequenceSteps.length || 1}</p>
                            <p className="text-sm text-gray-500">{isSingleStep ? 'Step' : 'Steps'}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                            <Clock className="h-5 w-5 text-gray-500 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-gray-900">{estimatedDuration}</p>
                            <p className="text-sm text-gray-500">Duration</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                            <Zap className="h-5 w-5 text-[#f49854] mx-auto mb-2" />
                            <p className="text-2xl font-bold text-gray-900">{mockAudienceData.dailyLimit}</p>
                            <p className="text-sm text-gray-500">Per day</p>
                        </div>
                    </div>

                    {/* Two Column Layout */}
                    <div className="grid grid-cols-2 gap-6">
                        {/* Sequence Preview */}
                        <div className="border rounded-lg p-4">
                            <h3 className="text-sm font-medium text-gray-900 mb-3">Sequence</h3>
                            {sequenceSteps.length > 0 ? (
                                <div className="space-y-2">
                                    {sequenceSteps.map((step, index) => (
                                        <div key={step.id} className="flex items-center gap-2">
                                            <span className="h-6 w-6 rounded bg-primary/10 flex items-center justify-center text-xs font-medium text-primary flex-shrink-0">
                                                {index + 1}
                                            </span>
                                            <span className="text-sm text-gray-700">{step.title}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">No steps configured</p>
                            )}
                        </div>

                        {/* Audience Insights */}
                        <div className="border rounded-lg p-4">
                            <h3 className="text-sm font-medium text-gray-900 mb-3">Top industries</h3>
                            <div className="space-y-2">
                                {mockAudienceData.topIndustries.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <Building2 className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                                        <span className="text-sm text-gray-700 flex-1">{item.name}</span>
                                        <span className="text-sm text-gray-400">{item.count}</span>
                                        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary rounded-full"
                                                style={{ width: `${(item.count / maxIndustryCount) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row: AI Prediction + Warning */}
                    <div className="grid grid-cols-2 gap-6">
                        {/* AI Prediction */}
                        <div className="border rounded-lg p-4 bg-gradient-to-br from-indigo-50/50 to-purple-50/50">
                            <div className="flex items-center gap-2 mb-4">
                                <Sparkles className="h-4 w-4 text-indigo-500" />
                                <h3 className="text-sm font-medium text-gray-900">AI Prediction</h3>
                            </div>
                            <div className="flex items-center justify-around">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-indigo-600">~35%</p>
                                    <p className="text-xs text-gray-500">Accept rate</p>
                                </div>
                                {!isSingleStep && (
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-purple-600">~12%</p>
                                        <p className="text-xs text-gray-500">Reply rate</p>
                                    </div>
                                )}
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-pink-600">~{isSingleStep ? '416' : '142'}</p>
                                    <p className="text-xs text-gray-500">{isSingleStep ? 'Est. accepts' : 'Est. replies'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Excluded Warning */}
                        {mockAudienceData.excludedLeads > 0 && (
                            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-amber-50 border border-amber-100">
                                <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0" />
                                <p className="text-sm text-amber-800">
                                    {mockAudienceData.excludedLeads} leads excluded ({mockAudienceData.duplicates} duplicates)
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Fixed Footer */}
            <div className="border-t bg-white px-6 py-4">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    {/* After launch info */}
                    <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                            <span className="font-medium text-gray-700">After launch:</span>
                        </div>
                        <span className="text-gray-500">You cannot change, add or remove steps</span>
                        <span className="text-gray-400">|</span>
                        <span className="text-gray-500">You can change content{!isSingleStep && ' and delays'}</span>
                        <span className="text-gray-400">|</span>
                        <span className="text-gray-500">You can add or remove leads</span>
                    </div>
                    <Button
                        size="lg"
                        onClick={onLaunch}
                        className="gap-2 h-11 px-8 bg-primary hover:bg-primary/90"
                    >
                        <Rocket className="h-4 w-4" />
                        Launch Campaign
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LaunchView;
