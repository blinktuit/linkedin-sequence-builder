import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@/components/ui/badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline"],
      description: "De visuele stijl van de badge",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Badge",
    variant: "default",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const Destructive: Story = {
  args: {
    children: "Destructive",
    variant: "destructive",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
  },
};

// Status badges zoals gebruikt in LeadListView
export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pending</Badge>
      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Contacted</Badge>
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Accepted</Badge>
      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Replied</Badge>
      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Excluded</Badge>
    </div>
  ),
};

// Alle varianten overzicht
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};
