import type { Meta, StoryObj } from "@storybook/react";
import { LeadListView } from "@/components/campaign/LeadListView";

const meta: Meta<typeof LeadListView> = {
  title: "Campaign/LeadListView",
  component: LeadListView,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="h-screen">
      <LeadListView />
    </div>
  ),
};

export const EmptyState: Story = {
  render: () => (
    <div className="h-screen">
      <LeadListView />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Shows the empty state when no leads have been imported yet. Users can click 'Import Leads' to add leads from various sources.",
      },
    },
  },
};
