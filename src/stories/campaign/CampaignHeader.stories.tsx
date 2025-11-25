import type { Meta, StoryObj } from "@storybook/react";
import { CampaignHeader } from "@/components/campaign/CampaignHeader";

const meta: Meta<typeof CampaignHeader> = {
  title: "Campaign/CampaignHeader",
  component: CampaignHeader,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    activeTab: {
      control: "select",
      options: ["sequence", "leadlist", "launch"],
    },
    campaignActive: {
      control: "boolean",
    },
    campaignIcon: {
      control: "select",
      options: ["mail", "rocket", "handshake", "bot", "briefcase", "chart", "target", "lightbulb", "star", "flame", "zap", "trophy", "users", "trending-up", "megaphone", "globe", "link", "sparkles"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    campaignName: "Q4 Sales Outreach",
    activeTab: "sequence",
    campaignActive: true,
    campaignIcon: "rocket",
    onTabChange: (tab) => console.log("Tab changed:", tab),
    onNextStep: () => console.log("Next step clicked"),
    onBackToCampaigns: () => console.log("Back to campaigns"),
    onCampaignNameChange: (name) => console.log("Name changed:", name),
    onToggleCampaign: (active) => console.log("Campaign toggled:", active),
    onIconChange: (icon) => console.log("Icon changed:", icon),
  },
};

export const SequenceTab: Story = {
  args: {
    ...Default.args,
    activeTab: "sequence",
  },
};

export const LeadListTab: Story = {
  args: {
    ...Default.args,
    activeTab: "leadlist",
  },
};

export const LaunchTab: Story = {
  args: {
    ...Default.args,
    activeTab: "launch",
  },
};

export const Paused: Story = {
  args: {
    ...Default.args,
    campaignActive: false,
  },
};

export const EventInviter: Story = {
  args: {
    ...Default.args,
    campaignSource: "event-inviter",
  },
};

export const CompanyPage: Story = {
  args: {
    ...Default.args,
    campaignSource: "company-page",
  },
};

export const DifferentIcons: Story = {
  render: () => (
    <div className="flex flex-col">
      <CampaignHeader
        campaignName="Sales Campaign"
        activeTab="sequence"
        campaignIcon="target"
        onTabChange={() => {}}
        onNextStep={() => {}}
      />
      <CampaignHeader
        campaignName="Partner Outreach"
        activeTab="sequence"
        campaignIcon="handshake"
        onTabChange={() => {}}
        onNextStep={() => {}}
      />
      <CampaignHeader
        campaignName="AI Campaign"
        activeTab="sequence"
        campaignIcon="bot"
        onTabChange={() => {}}
        onNextStep={() => {}}
      />
    </div>
  ),
};
