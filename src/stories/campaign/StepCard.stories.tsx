import type { Meta, StoryObj } from "@storybook/react";
import { StepCard } from "@/components/campaign/StepCard";
import type { CampaignStep } from "@/types/campaign";

const meta: Meta<typeof StepCard> = {
  title: "Campaign/StepCard",
  component: StepCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    isActive: {
      control: "boolean",
      description: "Of de stap geselecteerd is",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const baseStep: CampaignStep = {
  id: "1",
  type: "linkedin-invitation",
  title: "Send Invitation",
  subtitle: "Personalized connection request",
};

export const Default: Story = {
  args: {
    step: baseStep,
    isActive: false,
    onClick: () => console.log("clicked"),
  },
};

export const Active: Story = {
  args: {
    step: baseStep,
    isActive: true,
    onClick: () => console.log("clicked"),
  },
};

export const WithError: Story = {
  args: {
    step: {
      ...baseStep,
      error: "Message content is required",
    },
    isActive: false,
    onClick: () => console.log("clicked"),
  },
};

export const WithWarning: Story = {
  args: {
    step: {
      ...baseStep,
      warning: "Message might be too long",
    },
    isActive: false,
    onClick: () => console.log("clicked"),
  },
};

export const LinkedInChat: Story = {
  args: {
    step: {
      id: "2",
      type: "linkedin-chat",
      title: "Send Message",
      subtitle: "Follow-up message",
    },
    isActive: false,
    onClick: () => console.log("clicked"),
  },
};

export const ProfileVisit: Story = {
  args: {
    step: {
      id: "3",
      type: "linkedin-profile-visit",
      title: "Visit Profile",
      subtitle: "View their profile",
    },
    isActive: false,
    onClick: () => console.log("clicked"),
  },
};

export const APICall: Story = {
  args: {
    step: {
      id: "4",
      type: "api-call",
      title: "API Call",
      subtitle: "Send data to webhook",
    },
    isActive: false,
    onClick: () => console.log("clicked"),
  },
};

export const AIGenerate: Story = {
  args: {
    step: {
      id: "5",
      type: "ai-generate",
      title: "Generate Variable",
      subtitle: "AI-powered personalization",
    },
    isActive: false,
    onClick: () => console.log("clicked"),
  },
};

export const SendToCampaign: Story = {
  args: {
    step: {
      id: "6",
      type: "send-to-campaign",
      title: "Move to Campaign",
      subtitle: "Transfer lead",
      config: {
        targetCampaign: "ai-lookalike",
      },
    },
    isActive: false,
    onClick: () => console.log("clicked"),
  },
};

export const ABTest: Story = {
  args: {
    step: {
      id: "7",
      type: "ab-test",
      title: "A/B Test",
      subtitle: "Test different messages",
      versions: ["A", "B"],
      versionA: { config: {} },
      versionB: { config: {} },
    },
    isActive: false,
    activeVersion: "A",
    onClick: () => console.log("clicked"),
    onVersionClick: (version) => console.log("version clicked:", version),
  },
};

export const ABTestWithError: Story = {
  args: {
    step: {
      id: "8",
      type: "ab-test",
      title: "A/B Test",
      subtitle: "Test different messages",
      versions: ["A", "B"],
      versionA: { config: {} },
      versionB: { config: {}, error: "Version B needs content" },
    },
    isActive: false,
    activeVersion: "A",
    onClick: () => console.log("clicked"),
    onVersionClick: (version) => console.log("version clicked:", version),
  },
};

export const StartStep: Story = {
  args: {
    step: {
      id: "start",
      type: "start",
      title: "Start",
    },
    isActive: false,
    onClick: () => console.log("clicked"),
  },
};

export const AllStepTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <StepCard
        step={{ id: "1", type: "linkedin-invitation", title: "Send Invitation", subtitle: "Connection request" }}
        isActive={false}
        onClick={() => {}}
      />
      <StepCard
        step={{ id: "2", type: "linkedin-chat", title: "Send Message", subtitle: "Follow-up" }}
        isActive={false}
        onClick={() => {}}
      />
      <StepCard
        step={{ id: "3", type: "linkedin-profile-visit", title: "Visit Profile" }}
        isActive={false}
        onClick={() => {}}
      />
      <StepCard
        step={{ id: "4", type: "linkedin-voice", title: "Voice Message" }}
        isActive={false}
        onClick={() => {}}
      />
      <StepCard
        step={{ id: "5", type: "linkedin-like-post", title: "Like Post" }}
        isActive={false}
        onClick={() => {}}
      />
      <StepCard
        step={{ id: "6", type: "api-call", title: "API Call", subtitle: "Webhook" }}
        isActive={false}
        onClick={() => {}}
      />
      <StepCard
        step={{ id: "7", type: "ai-generate", title: "AI Generate", subtitle: "Variable" }}
        isActive={true}
        onClick={() => {}}
      />
    </div>
  ),
  decorators: [
    (Story) => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
};
