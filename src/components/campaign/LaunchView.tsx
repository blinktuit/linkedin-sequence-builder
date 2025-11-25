import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
        <div className="h-full flex flex-col bg-canvas-bg">
            <div className="flex-1 overflow-auto p-8">
                <div className="max-w-xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
                            <Sparkles className="h-3.5 w-3.5" />
                            Ready to launch
                        </div>
                        <h1 className="text-xl font-semibold text-gray-900">{campaignName}</h1>
                        <p className="text-sm text-gray-500 mt-1">Review your campaign before going live</p>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-4 gap-3">
                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-4 text-center">
                                <Users className="h-4 w-4 text-primary mx-auto mb-2" />
                                <p className="text-lg font-bold text-gray-900">{mockAudienceData.validLeads.toLocaleString()}</p>
                                <p className="text-xs text-gray-500">Leads</p>
                            </CardContent>
                        </Card>
                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-4 text-center">
                                <MessageSquare className="h-4 w-4 text-blue-500 mx-auto mb-2" />
                                <p className="text-lg font-bold text-gray-900">{sequenceSteps.length || 1}</p>
                                <p className="text-xs text-gray-500">{isSingleStep ? 'Step' : 'Steps'}</p>
                            </CardContent>
                        </Card>
                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-4 text-center">
                                <Clock className="h-4 w-4 text-gray-500 mx-auto mb-2" />
                                <p className="text-lg font-bold text-gray-900">{estimatedDuration}</p>
                                <p className="text-xs text-gray-500">Duration</p>
                            </CardContent>
                        </Card>
                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-4 text-center">
                                <Zap className="h-4 w-4 text-[#f49854] mx-auto mb-2" />
                                <p className="text-lg font-bold text-gray-900">{mockAudienceData.dailyLimit}</p>
                                <p className="text-xs text-gray-500">Per day</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sequence Preview */}
                    <Card className="border-0 shadow-sm">
                        <CardContent className="p-4">
                            <h3 className="text-sm font-medium text-gray-900 mb-3">Sequence</h3>
                            {sequenceSteps.length > 0 ? (
                                <div className="flex items-center gap-2 flex-wrap">
                                    {sequenceSteps.map((step, index) => (
                                        <div key={step.id} className="flex items-center gap-2">
                                            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg text-sm">
                                                <span className="h-5 w-5 rounded bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                                                    {index + 1}
                                                </span>
                                                <span className="text-gray-700">{step.title}</span>
                                            </div>
                                            {index < sequenceSteps.length - 1 && (
                                                <ArrowRight className="h-3 w-3 text-gray-300" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">No steps configured</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Audience Insights */}
                    <Card className="border-0 shadow-sm">
                        <CardContent className="p-4">
                            <h3 className="text-sm font-medium text-gray-900 mb-3">Top industries</h3>
                            <div className="space-y-2">
                                {mockAudienceData.topIndustries.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <Building2 className="h-3.5 w-3.5 text-gray-400" />
                                        <span className="text-sm text-gray-700 flex-1">{item.name}</span>
                                        <span className="text-sm text-gray-400">{item.count}</span>
                                        <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary rounded-full"
                                                style={{ width: `${(item.count / maxIndustryCount) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* AI Prediction */}
                    <Card className="border-0 shadow-sm bg-gradient-to-br from-indigo-50 to-purple-50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <Sparkles className="h-4 w-4 text-indigo-500" />
                                <h3 className="text-sm font-medium text-gray-900">AI Prediction</h3>
                            </div>
                            <div className="flex items-center justify-around">
                                <div className="text-center">
                                    <p className="text-xl font-bold text-indigo-600">~35%</p>
                                    <p className="text-xs text-gray-500">Accept rate</p>
                                </div>
                                {!isSingleStep && (
                                    <>
                                        <Separator orientation="vertical" className="h-8" />
                                        <div className="text-center">
                                            <p className="text-xl font-bold text-purple-600">~12%</p>
                                            <p className="text-xs text-gray-500">Reply rate</p>
                                        </div>
                                    </>
                                )}
                                <Separator orientation="vertical" className="h-8" />
                                <div className="text-center">
                                    <p className="text-xl font-bold text-pink-600">~{isSingleStep ? '416' : '142'}</p>
                                    <p className="text-xs text-gray-500">{isSingleStep ? 'Accepts' : 'Replies'}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Excluded Warning */}
                    {mockAudienceData.excludedLeads > 0 && (
                        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-amber-50 border border-amber-100">
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                            <p className="text-sm text-amber-800">
                                {mockAudienceData.excludedLeads} leads excluded ({mockAudienceData.duplicates} duplicates)
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Fixed Footer */}
            <div className="border-t bg-white px-6 py-4">
                <div className="max-w-xl mx-auto">
                    {/* What you can change */}
                    <div className="flex items-center justify-center gap-4 mb-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3 text-green-500" />
                            <span>Edit messages</span>
                        </div>
                        {!isSingleStep && (
                            <div className="flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                <span>Adjust delays</span>
                            </div>
                        )}
                        <div className="flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3 text-green-500" />
                            <span>Add/remove leads</span>
                        </div>
                        {!isSingleStep && (
                            <div className="flex items-center gap-1">
                                <AlertTriangle className="h-3 w-3 text-amber-500" />
                                <span>No step changes</span>
                            </div>
                        )}
                    </div>

                    <Button
                        size="lg"
                        onClick={onLaunch}
                        className="w-full gap-2 h-11 bg-primary hover:bg-primary/90"
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
