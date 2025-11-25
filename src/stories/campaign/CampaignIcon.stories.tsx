import type { Meta, StoryObj } from "@storybook/react";
import { CampaignIconDisplay, ICON_LIST } from "@/components/campaign/CampaignIconPicker";
import type { CampaignIcon } from "@/types/campaigns";

const meta: Meta<typeof CampaignIconDisplay> = {
  title: "Campaign/CampaignIcon",
  component: CampaignIconDisplay,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    icon: {
      control: "select",
      options: ICON_LIST,
      description: "Het icoon type",
    },
    size: {
      control: { type: "number", min: 12, max: 48 },
      description: "Grootte van het icoon",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: "rocket",
    size: 24,
  },
};

export const Small: Story = {
  args: {
    icon: "rocket",
    size: 16,
  },
};

export const Large: Story = {
  args: {
    icon: "rocket",
    size: 32,
  },
};

export const AllIcons: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-4">
      {ICON_LIST.map((icon) => (
        <div
          key={icon}
          className="flex flex-col items-center gap-2 p-3 rounded-lg border hover:bg-muted transition-colors"
        >
          <CampaignIconDisplay icon={icon} size={24} className="text-primary" />
          <span className="text-xs text-muted-foreground">{icon}</span>
        </div>
      ))}
    </div>
  ),
};

export const IconPicker: Story = {
  render: () => (
    <div className="p-4 border rounded-lg bg-card">
      <p className="text-sm font-medium mb-3">Kies een icoon:</p>
      <div className="grid grid-cols-6 gap-2">
        {ICON_LIST.map((icon) => (
          <button
            key={icon}
            className="p-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <CampaignIconDisplay icon={icon} size={20} />
          </button>
        ))}
      </div>
    </div>
  ),
};

export const WithBackground: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
        <CampaignIconDisplay icon="rocket" size={20} className="text-primary-foreground" />
      </div>
      <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
        <CampaignIconDisplay icon="target" size={20} className="text-primary" />
      </div>
      <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
        <CampaignIconDisplay icon="users" size={20} className="text-muted-foreground" />
      </div>
      <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
        <CampaignIconDisplay icon="flame" size={20} className="text-destructive" />
      </div>
    </div>
  ),
};

export const CampaignListExample: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-[300px]">
      {[
        { icon: "rocket" as CampaignIcon, name: "Q4 Outreach", status: "active" },
        { icon: "target" as CampaignIcon, name: "Sales Pipeline", status: "active" },
        { icon: "users" as CampaignIcon, name: "Hiring Campaign", status: "paused" },
        { icon: "handshake" as CampaignIcon, name: "Partner Outreach", status: "draft" },
      ].map((campaign, i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
        >
          <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
            <CampaignIconDisplay icon={campaign.icon} size={16} className="text-primary" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">{campaign.name}</div>
            <div className="text-xs text-muted-foreground capitalize">{campaign.status}</div>
          </div>
        </div>
      ))}
    </div>
  ),
};
