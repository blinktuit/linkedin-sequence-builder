import { RefreshCw, GitBranch, Calendar, Zap } from "lucide-react";
import { CampaignIconDisplay } from "@/components/campaign/CampaignIconPicker";
import { Badge } from "@/components/ui/badge";

// Demo campaigns for testing different indicator styles
const demoCampaigns = [
  { name: "Saleshacking's campaign", icon: 'handshake' as const, type: 'multi-step', autoRefresh: true, status: 'In Progress' },
  { name: "Tech Founders Outreach", icon: 'rocket' as const, type: 'multi-step', autoRefresh: false, status: 'Paused' },
  { name: "Event Attendees NYC", icon: 'calendar' as const, type: 'event-inviter', autoRefresh: false, status: 'Draft' },
  { name: "Company Page Followers", icon: 'users' as const, type: 'company-page', autoRefresh: true, status: 'In Progress' },
];

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'multi-step': return 'Multi-step';
    case 'event-inviter': return 'Event inviter';
    case 'company-page': return 'Company page';
    default: return type;
  }
};

export default function TestCampaignIndicator() {
  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold mb-8">Campaign Indicator Options</h1>

      {/* Option 1: Subtle text under name */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-primary">Optie 1: Subtiele tekst onder naam</h2>
        <div className="border rounded-xl bg-card p-4">
          <div className="space-y-4">
            {demoCampaigns.map((campaign, i) => (
              <div key={i} className="flex items-center gap-3 p-3 hover:bg-muted/50 rounded-lg">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <CampaignIconDisplay icon={campaign.icon} className="text-primary" size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">{campaign.name}</span>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{getTypeLabel(campaign.type)}</span>
                    {campaign.autoRefresh && (
                      <>
                        <span>·</span>
                        <span className="flex items-center gap-1 text-primary">
                          <RefreshCw className="h-3 w-3" />
                          Auto-refresh
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Option 2: Small badges */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-primary">Optie 2: Kleine badges naast naam</h2>
        <div className="border rounded-xl bg-card p-4">
          <div className="space-y-4">
            {demoCampaigns.map((campaign, i) => (
              <div key={i} className="flex items-center gap-3 p-3 hover:bg-muted/50 rounded-lg">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <CampaignIconDisplay icon={campaign.icon} className="text-primary" size={18} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{campaign.name}</span>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 font-normal text-muted-foreground">
                    {getTypeLabel(campaign.type)}
                  </Badge>
                  {campaign.autoRefresh && (
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 font-normal text-primary border-primary/30 bg-primary/5">
                      <RefreshCw className="h-2.5 w-2.5 mr-0.5" />
                      Auto
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Option 3: Icon indicators only */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-primary">Optie 3: Alleen iconen (minimalistisch)</h2>
        <div className="border rounded-xl bg-card p-4">
          <div className="space-y-4">
            {demoCampaigns.map((campaign, i) => (
              <div key={i} className="flex items-center gap-3 p-3 hover:bg-muted/50 rounded-lg">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center relative">
                  <CampaignIconDisplay icon={campaign.icon} className="text-primary" size={18} />
                  {campaign.autoRefresh && (
                    <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary flex items-center justify-center">
                      <RefreshCw className="h-2.5 w-2.5 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{campaign.name}</span>
                  {campaign.type === 'multi-step' && (
                    <GitBranch className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                  {campaign.type === 'event-inviter' && (
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                  {campaign.type === 'company-page' && (
                    <Zap className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Option 4: Integrated in icon box */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-primary">Optie 4: Geïntegreerd in icoon box</h2>
        <div className="border rounded-xl bg-card p-4">
          <div className="space-y-4">
            {demoCampaigns.map((campaign, i) => (
              <div key={i} className="flex items-center gap-3 p-3 hover:bg-muted/50 rounded-lg">
                <div className="relative">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                    campaign.type === 'multi-step'
                      ? 'bg-primary/10'
                      : campaign.type === 'event-inviter'
                      ? 'bg-orange-100'
                      : 'bg-blue-100'
                  }`}>
                    <CampaignIconDisplay
                      icon={campaign.icon}
                      className={
                        campaign.type === 'multi-step'
                          ? 'text-primary'
                          : campaign.type === 'event-inviter'
                          ? 'text-orange-600'
                          : 'text-blue-600'
                      }
                      size={18}
                    />
                  </div>
                  {campaign.autoRefresh && (
                    <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-primary border-2 border-white flex items-center justify-center">
                      <RefreshCw className="h-2 w-2 text-white" />
                    </div>
                  )}
                </div>
                <span className="font-medium">{campaign.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Option 5: Separate column style (like in table) */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-primary">Optie 5: Als aparte kolom in tabel</h2>
        <div className="border rounded-xl bg-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Campaign</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Type</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {demoCampaigns.map((campaign, i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-muted/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <CampaignIconDisplay icon={campaign.icon} className="text-primary" size={18} />
                      </div>
                      <span className="font-medium">{campaign.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{getTypeLabel(campaign.type)}</span>
                      {campaign.autoRefresh && (
                        <span className="flex items-center gap-1 text-xs text-primary">
                          <RefreshCw className="h-3 w-3" />
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={
                      campaign.status === 'In Progress' ? 'bg-green-100 text-green-700 hover:bg-green-100' :
                      campaign.status === 'Paused' ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100' :
                      'bg-gray-100 text-gray-700 hover:bg-gray-100'
                    }>
                      {campaign.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
