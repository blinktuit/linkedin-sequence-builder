import type { Meta, StoryObj } from "@storybook/react";
import { ConditionalBranch } from "@/components/campaign/ConditionalBranch";
import { StepCard } from "@/components/campaign/StepCard";

const meta: Meta<typeof ConditionalBranch> = {
  title: "Campaign/ConditionalBranch",
  component: ConditionalBranch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="p-8 bg-background">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onAddYesStep: () => console.log("Add Yes step"),
    onAddNoStep: () => console.log("Add No step"),
    hasYesSteps: false,
    hasNoSteps: false,
    children: (
      <StepCard
        step={{
          id: "condition-1",
          type: "condition-accepted-invite",
          title: "Accepted Invite",
          subtitle: "Check if invitation was accepted",
        }}
        isActive={false}
        onClick={() => {}}
      />
    ),
  },
};

export const WithYesSteps: Story = {
  args: {
    ...Default.args,
    hasYesSteps: true,
  },
};

export const WithNoSteps: Story = {
  args: {
    ...Default.args,
    hasNoSteps: true,
  },
};

export const WithBothBranches: Story = {
  args: {
    ...Default.args,
    hasYesSteps: true,
    hasNoSteps: true,
  },
};

export const ActiveCondition: Story = {
  args: {
    onAddYesStep: () => console.log("Add Yes step"),
    onAddNoStep: () => console.log("Add No step"),
    hasYesSteps: false,
    hasNoSteps: false,
    children: (
      <StepCard
        step={{
          id: "condition-2",
          type: "condition-accepted-invite",
          title: "Accepted Invite",
          subtitle: "Wait for response",
        }}
        isActive={true}
        onClick={() => {}}
      />
    ),
  },
};

export const CustomCondition: Story = {
  args: {
    onAddYesStep: () => console.log("Add Yes step"),
    onAddNoStep: () => console.log("Add No step"),
    hasYesSteps: true,
    hasNoSteps: false,
    children: (
      <StepCard
        step={{
          id: "condition-3",
          type: "condition",
          title: "Custom Condition",
          subtitle: "Lead replied within 7 days",
        }}
        isActive={false}
        onClick={() => {}}
      />
    ),
  },
};
