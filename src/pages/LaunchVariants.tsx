import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    ChevronLeft,
    ChevronRight,
    Users,
    MessageSquare,
    UserCheck,
    Mail,
    Clock,
    Play,
    Rocket,
    CheckCircle2,
    AlertTriangle,
    Calendar,
    Target,
    TrendingUp,
    Settings,
    Eye,
    Send,
    Zap,
    BarChart3,
    ArrowRight,
    Info,
    Building2,
    MapPin,
    Briefcase,
    Timer,
    Sparkles
} from "lucide-react";

// Mock campaign data
const mockCampaignData = {
    name: "Procurement Leaders UK",
    totalLeads: 1247,
    validLeads: 1189,
    excludedLeads: 58,
    duplicates: 12,
    steps: [
        { type: 'linkedin-invitation', name: 'Connection request', count: 1189 },
        { type: 'wait', name: 'Wait 2 days', count: null },
        { type: 'linkedin-chat', name: 'Introduction message', count: null },
        { type: 'condition', name: 'Accepted invite?', count: null },
        { type: 'linkedin-chat', name: 'Follow-up message', count: null },
    ],
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
    topJobTitles: [
        { name: 'Procurement Manager', count: 423 },
        { name: 'Head of Procurement', count: 312 },
        { name: 'Purchasing Director', count: 189 },
    ],
    estimatedDuration: '14 days',
    dailyLimit: 50,
    scheduledStart: null,
};

// Variant 1: Clean Cards Grid
const Variant1 = () => {
    return (
        <div className="p-8 max-w-5xl mx-auto space-y-6">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Ready to Launch</h1>
                <p className="text-gray-500">Review your campaign before going live</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                                <Users className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{mockCampaignData.validLeads.toLocaleString()}</p>
                                <p className="text-sm text-gray-500">Active leads</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                <MessageSquare className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{mockCampaignData.steps.length}</p>
                                <p className="text-sm text-gray-500">Sequence steps</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                                <Clock className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{mockCampaignData.estimatedDuration}</p>
                                <p className="text-sm text-gray-500">Est. duration</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center">
                                <Zap className="h-5 w-5 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{mockCampaignData.dailyLimit}</p>
                                <p className="text-sm text-gray-500">Daily actions</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-2 gap-6">
                {/* Left Column - Sequence Overview */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                            <Target className="h-4 w-4 text-primary" />
                            Sequence Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {mockCampaignData.steps.map((step, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                                    {index + 1}
                                </div>
                                <span className="text-sm">{step.name}</span>
                                {step.count && (
                                    <Badge variant="secondary" className="ml-auto text-xs">
                                        {step.count.toLocaleString()} leads
                                    </Badge>
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Right Column - Audience Insights */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                            <BarChart3 className="h-4 w-4 text-primary" />
                            Audience Insights
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-xs font-medium text-gray-500 mb-2">Top Industries</p>
                            {mockCampaignData.topIndustries.map((item, i) => (
                                <div key={i} className="flex justify-between text-sm py-1">
                                    <span>{item.name}</span>
                                    <span className="text-gray-500">{item.count}</span>
                                </div>
                            ))}
                        </div>
                        <Separator />
                        <div>
                            <p className="text-xs font-medium text-gray-500 mb-2">Top Locations</p>
                            {mockCampaignData.topLocations.map((item, i) => (
                                <div key={i} className="flex justify-between text-sm py-1">
                                    <span>{item.name}</span>
                                    <span className="text-gray-500">{item.count}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Warnings */}
            {mockCampaignData.excludedLeads > 0 && (
                <Alert className="border-yellow-200 bg-yellow-50">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <AlertDescription className="text-yellow-800">
                        {mockCampaignData.excludedLeads} leads excluded • {mockCampaignData.duplicates} duplicates removed
                    </AlertDescription>
                </Alert>
            )}

            {/* Launch Button */}
            <div className="flex justify-center pt-4">
                <Button size="lg" className="gap-2 px-8">
                    <Rocket className="h-5 w-5" />
                    Launch Campaign
                </Button>
            </div>
        </div>
    );
};

// Variant 2: Single Column Summary with Progress
const Variant2 = () => {
    const readinessScore = 92;

    return (
        <div className="p-8 max-w-2xl mx-auto space-y-6">
            {/* Readiness Score */}
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                <CardContent className="pt-6">
                    <div className="text-center mb-4">
                        <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 mb-3">
                            <span className="text-3xl font-bold text-primary">{readinessScore}%</span>
                        </div>
                        <h2 className="text-lg font-semibold">Campaign Ready</h2>
                        <p className="text-sm text-gray-500">Your campaign is almost ready to launch</p>
                    </div>
                    <Progress value={readinessScore} className="h-2" />
                </CardContent>
            </Card>

            {/* Checklist */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Launch Checklist</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span className="text-sm">{mockCampaignData.validLeads.toLocaleString()} leads imported and validated</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span className="text-sm">{mockCampaignData.steps.length} sequence steps configured</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span className="text-sm">All messages personalized</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        <span className="text-sm text-yellow-700">Schedule not set (will start immediately)</span>
                    </div>
                </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <Users className="h-5 w-5 mx-auto mb-2 text-gray-400" />
                    <p className="text-xl font-bold">{mockCampaignData.validLeads.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Leads</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <Clock className="h-5 w-5 mx-auto mb-2 text-gray-400" />
                    <p className="text-xl font-bold">{mockCampaignData.estimatedDuration}</p>
                    <p className="text-xs text-gray-500">Duration</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <Send className="h-5 w-5 mx-auto mb-2 text-gray-400" />
                    <p className="text-xl font-bold">{mockCampaignData.dailyLimit}/day</p>
                    <p className="text-xs text-gray-500">Actions</p>
                </div>
            </div>

            {/* Settings */}
            <Card>
                <CardContent className="pt-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">Schedule for later</span>
                        </div>
                        <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Eye className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">Send test message first</span>
                        </div>
                        <Switch />
                    </div>
                </CardContent>
            </Card>

            {/* Launch Button */}
            <Button size="lg" className="w-full gap-2">
                <Play className="h-5 w-5" />
                Start Campaign Now
            </Button>
        </div>
    );
};

// Variant 3: Dashboard Style with Sidebar Summary
const Variant3 = () => {
    return (
        <div className="flex h-full">
            {/* Main Content */}
            <div className="flex-1 p-8 overflow-auto">
                <div className="max-w-3xl mx-auto space-y-6">
                    <div>
                        <h1 className="text-xl font-semibold mb-1">Campaign Summary</h1>
                        <p className="text-sm text-gray-500">Review all details before launching</p>
                    </div>

                    {/* Audience Overview */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                Target Audience
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-3 gap-6">
                                <div>
                                    <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                                        <Briefcase className="h-3 w-3" /> Top Job Titles
                                    </p>
                                    {mockCampaignData.topJobTitles.map((item, i) => (
                                        <div key={i} className="flex justify-between text-sm py-1.5 border-b border-gray-100 last:border-0">
                                            <span className="truncate pr-2">{item.name}</span>
                                            <span className="text-gray-400 font-medium">{item.count}</span>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                                        <Building2 className="h-3 w-3" /> Top Industries
                                    </p>
                                    {mockCampaignData.topIndustries.map((item, i) => (
                                        <div key={i} className="flex justify-between text-sm py-1.5 border-b border-gray-100 last:border-0">
                                            <span className="truncate pr-2">{item.name}</span>
                                            <span className="text-gray-400 font-medium">{item.count}</span>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                                        <MapPin className="h-3 w-3" /> Top Locations
                                    </p>
                                    {mockCampaignData.topLocations.map((item, i) => (
                                        <div key={i} className="flex justify-between text-sm py-1.5 border-b border-gray-100 last:border-0">
                                            <span className="truncate pr-2">{item.name}</span>
                                            <span className="text-gray-400 font-medium">{item.count}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Sequence Preview */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                                <ArrowRight className="h-4 w-4" />
                                Sequence Flow
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 overflow-x-auto pb-2">
                                {mockCampaignData.steps.map((step, i) => (
                                    <div key={i} className="flex items-center">
                                        <div className="px-3 py-2 bg-gray-50 rounded-lg text-sm whitespace-nowrap">
                                            {step.name}
                                        </div>
                                        {i < mockCampaignData.steps.length - 1 && (
                                            <ArrowRight className="h-4 w-4 text-gray-300 mx-1 flex-shrink-0" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Predictions */}
                    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium flex items-center gap-2 text-blue-900">
                                <Sparkles className="h-4 w-4" />
                                AI Predictions
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-blue-600">~35%</p>
                                    <p className="text-xs text-blue-700">Expected acceptance</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-blue-600">~12%</p>
                                    <p className="text-xs text-blue-700">Expected reply rate</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-blue-600">~142</p>
                                    <p className="text-xs text-blue-700">Estimated responses</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-80 border-l bg-gray-50/50 p-6 flex flex-col">
                <div className="space-y-6 flex-1">
                    {/* Quick Stats */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Total Leads</span>
                            <span className="font-semibold">{mockCampaignData.totalLeads.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Active Leads</span>
                            <span className="font-semibold text-green-600">{mockCampaignData.validLeads.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Excluded</span>
                            <span className="font-semibold text-gray-400">{mockCampaignData.excludedLeads}</span>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Daily Limit</span>
                            <span className="font-semibold">{mockCampaignData.dailyLimit}/day</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Est. Duration</span>
                            <span className="font-semibold">{mockCampaignData.estimatedDuration}</span>
                        </div>
                    </div>

                    {/* Settings */}
                    <div className="space-y-3">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Settings</h3>
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Schedule</span>
                            <Button variant="ghost" size="sm" className="h-7 text-xs">
                                <Calendar className="h-3 w-3 mr-1" />
                                Set time
                            </Button>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Limits</span>
                            <Button variant="ghost" size="sm" className="h-7 text-xs">
                                <Settings className="h-3 w-3 mr-1" />
                                Configure
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Launch Button */}
                <div className="pt-4 border-t mt-auto">
                    <Button size="lg" className="w-full gap-2">
                        <Rocket className="h-4 w-4" />
                        Launch Campaign
                    </Button>
                    <p className="text-xs text-gray-400 text-center mt-2">
                        Campaign will start immediately
                    </p>
                </div>
            </div>
        </div>
    );
};

// Variant 4: Minimal with Timeline
const Variant4 = () => {
    return (
        <div className="p-8 max-w-3xl mx-auto">
            {/* Header Stats */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b">
                <div>
                    <h1 className="text-xl font-semibold">{mockCampaignData.name}</h1>
                    <p className="text-sm text-gray-500 mt-1">Review and launch your campaign</p>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{mockCampaignData.validLeads.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">leads ready</p>
                    </div>
                    <Button size="lg" className="gap-2">
                        <Rocket className="h-4 w-4" />
                        Launch
                    </Button>
                </div>
            </div>

            {/* Timeline */}
            <div className="space-y-0">
                <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                            <Users className="h-4 w-4 text-white" />
                        </div>
                        <div className="w-0.5 h-full bg-gray-200 my-2" />
                    </div>
                    <div className="pb-8">
                        <h3 className="font-medium">Audience Selected</h3>
                        <p className="text-sm text-gray-500 mt-1">
                            {mockCampaignData.validLeads.toLocaleString()} leads from {mockCampaignData.topLocations.length}+ locations
                        </p>
                        <div className="flex gap-2 mt-3">
                            {mockCampaignData.topJobTitles.slice(0, 2).map((title, i) => (
                                <Badge key={i} variant="secondary" className="font-normal">
                                    {title.name}
                                </Badge>
                            ))}
                            <Badge variant="secondary" className="font-normal">+{mockCampaignData.topJobTitles.length - 2} more</Badge>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                            <MessageSquare className="h-4 w-4 text-white" />
                        </div>
                        <div className="w-0.5 h-full bg-gray-200 my-2" />
                    </div>
                    <div className="pb-8">
                        <h3 className="font-medium">Sequence Configured</h3>
                        <p className="text-sm text-gray-500 mt-1">
                            {mockCampaignData.steps.length} steps including connection requests and follow-ups
                        </p>
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2 text-sm">
                                {mockCampaignData.steps.slice(0, 3).map((step, i) => (
                                    <span key={i} className="flex items-center">
                                        {step.name}
                                        {i < 2 && <ArrowRight className="h-3 w-3 mx-2 text-gray-300" />}
                                    </span>
                                ))}
                                <span className="text-gray-400">...</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                            <Timer className="h-4 w-4 text-white" />
                        </div>
                        <div className="w-0.5 h-full bg-gray-200 my-2" />
                    </div>
                    <div className="pb-8">
                        <h3 className="font-medium">Timing & Limits</h3>
                        <p className="text-sm text-gray-500 mt-1">
                            {mockCampaignData.dailyLimit} actions per day • Estimated {mockCampaignData.estimatedDuration} to complete
                        </p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                        <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                            <CheckCircle2 className="h-4 w-4 text-white" />
                        </div>
                    </div>
                    <div>
                        <h3 className="font-medium text-green-700">Ready to Launch</h3>
                        <p className="text-sm text-gray-500 mt-1">
                            All checks passed. Your campaign is ready to go live.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Variant 5: Modern Split View
const Variant5 = () => {
    return (
        <div className="flex h-full bg-gray-50">
            {/* Left Side - Visual Summary */}
            <div className="w-1/2 p-8 flex flex-col justify-center items-center bg-gradient-to-br from-primary/5 via-primary/10 to-emerald-100/50">
                <div className="text-center max-w-sm">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-white shadow-lg mb-6">
                        <Rocket className="h-8 w-8 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Almost there!</h1>
                    <p className="text-gray-600 mb-8">Your campaign is configured and ready to reach {mockCampaignData.validLeads.toLocaleString()} prospects.</p>

                    {/* Visual Stats */}
                    <div className="grid grid-cols-2 gap-4 text-left">
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <Users className="h-4 w-4 text-primary" />
                                <span className="text-xs font-medium text-gray-500">LEADS</span>
                            </div>
                            <p className="text-2xl font-bold">{mockCampaignData.validLeads.toLocaleString()}</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <MessageSquare className="h-4 w-4 text-primary" />
                                <span className="text-xs font-medium text-gray-500">STEPS</span>
                            </div>
                            <p className="text-2xl font-bold">{mockCampaignData.steps.length}</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <Clock className="h-4 w-4 text-primary" />
                                <span className="text-xs font-medium text-gray-500">DURATION</span>
                            </div>
                            <p className="text-2xl font-bold">{mockCampaignData.estimatedDuration}</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <TrendingUp className="h-4 w-4 text-primary" />
                                <span className="text-xs font-medium text-gray-500">EST. REPLIES</span>
                            </div>
                            <p className="text-2xl font-bold">~142</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Details & Launch */}
            <div className="w-1/2 p-8 overflow-auto bg-white">
                <div className="max-w-md mx-auto space-y-6">
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Campaign Details</h2>

                        {/* Audience */}
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Target Audience</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between py-2 border-b">
                                        <span className="text-sm text-gray-600">Top Job Title</span>
                                        <span className="text-sm font-medium">{mockCampaignData.topJobTitles[0].name}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b">
                                        <span className="text-sm text-gray-600">Top Industry</span>
                                        <span className="text-sm font-medium">{mockCampaignData.topIndustries[0].name}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b">
                                        <span className="text-sm text-gray-600">Top Location</span>
                                        <span className="text-sm font-medium">{mockCampaignData.topLocations[0].name}</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Sequence</h3>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    {mockCampaignData.steps.map((step, i) => (
                                        <div key={i} className="flex items-center gap-3 py-2">
                                            <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                                                {i + 1}
                                            </div>
                                            <span className="text-sm">{step.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Settings</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Zap className="h-4 w-4 text-gray-400" />
                                            <span className="text-sm">Daily action limit</span>
                                        </div>
                                        <span className="text-sm font-medium">{mockCampaignData.dailyLimit}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-gray-400" />
                                            <span className="text-sm">Start time</span>
                                        </div>
                                        <span className="text-sm font-medium">Immediately</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Launch Section */}
                    <div className="pt-4 border-t">
                        <Button size="lg" className="w-full gap-2 h-12">
                            <Rocket className="h-5 w-5" />
                            Launch Campaign
                        </Button>
                        <p className="text-xs text-gray-400 text-center mt-3">
                            You can pause or stop the campaign at any time
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Main Page with Variant Switcher
export const LaunchVariants = () => {
    const [currentVariant, setCurrentVariant] = useState(1);
    const totalVariants = 5;

    const variants = [
        { id: 1, name: "Cards Grid", component: Variant1 },
        { id: 2, name: "Checklist", component: Variant2 },
        { id: 3, name: "Dashboard", component: Variant3 },
        { id: 4, name: "Timeline", component: Variant4 },
        { id: 5, name: "Split View", component: Variant5 },
    ];

    const CurrentVariantComponent = variants[currentVariant - 1].component;

    return (
        <div className="h-screen flex flex-col bg-white">
            {/* Variant Switcher Header */}
            <div className="border-b bg-white px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <h1 className="font-semibold">Launch Page Variants</h1>
                    <Badge variant="outline">Variant {currentVariant}: {variants[currentVariant - 1].name}</Badge>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentVariant(prev => prev > 1 ? prev - 1 : totalVariants)}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex gap-1">
                        {variants.map((v) => (
                            <button
                                key={v.id}
                                onClick={() => setCurrentVariant(v.id)}
                                className={`h-2 w-2 rounded-full transition-colors ${
                                    currentVariant === v.id ? 'bg-primary' : 'bg-gray-300'
                                }`}
                            />
                        ))}
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentVariant(prev => prev < totalVariants ? prev + 1 : 1)}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Variant Content */}
            <div className="flex-1 overflow-hidden">
                <CurrentVariantComponent />
            </div>
        </div>
    );
};

export default LaunchVariants;
