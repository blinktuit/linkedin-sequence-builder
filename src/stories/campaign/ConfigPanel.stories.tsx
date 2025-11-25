import type { Meta, StoryObj } from "@storybook/react";
import { ConfigPanel } from "@/components/campaign/ConfigPanel";
import type { CampaignStep } from "@/types/campaign";

const meta: Meta<typeof ConfigPanel> = {
  title: "Campaign/ConfigPanel",
  component: ConfigPanel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="h-[600px] overflow-auto">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockLinkedInInvitation: CampaignStep = {
  id: "1",
  type: "linkedin-invitation",
  title: "Send Invitation",
  subtitle: "Personalized connection request",
  config: {
    message: "Hi {{firstName}},\n\nI noticed you work at {{companyName}}. I'd love to connect!",
  },
};

const mockChat: CampaignStep = {
  id: "2",
  type: "linkedin-chat",
  title: "Send Message",
  subtitle: "Follow-up message",
  config: {
    message: "",
  },
};

const mockAIGenerate: CampaignStep = {
  id: "3",
  type: "ai-generate",
  title: "Generate Variable",
  subtitle: "AI-powered personalization",
  config: {
    aiVariable: "isASaaSCompany",
    prompt: "You are an expert in identifying Software as a Service (SaaS) companies...",
    temperature: 0.2,
    aiProvider: "openai",
    aiModel: "gpt-4o",
  },
};

const mockAPICall: CampaignStep = {
  id: "4",
  type: "api-call",
  title: "API Call",
  subtitle: "Webhook trigger",
  config: {
    endpoint: "",
    method: "POST",
  },
};

const mockSendToCampaign: CampaignStep = {
  id: "5",
  type: "send-to-campaign",
  title: "Move to Campaign",
  subtitle: "Transfer lead",
  config: {
    targetCampaign: "ai-lookalike",
  },
};

const mockProfileVisit: CampaignStep = {
  id: "6",
  type: "linkedin-profile-visit",
  title: "Visit Profile",
  subtitle: "View their profile",
  config: {},
};

const mockLikePost: CampaignStep = {
  id: "7",
  type: "linkedin-like-post",
  title: "Like Post",
  subtitle: "Engage with content",
  config: {
    postAgeLimit: 12,
    postAgeUnit: "months",
  },
};

const mockABTest: CampaignStep = {
  id: "8",
  type: "ab-test",
  title: "A/B Test",
  subtitle: "Test different messages",
  versions: ["A", "B"],
  versionA: { config: { message: "Version A message" } },
  versionB: { config: { message: "Version B message" } },
};

const mockConditionAccepted: CampaignStep = {
  id: "9",
  type: "condition-accepted-invite",
  title: "Accepted Invite",
  subtitle: "Check if accepted",
  config: {
    waitMode: "wait-until",
  },
};

const mockWithError: CampaignStep = {
  id: "10",
  type: "linkedin-invitation",
  title: "Send Invitation",
  subtitle: "Missing required fields",
  error: "Message content is required",
  config: {},
};

export const LinkedInInvitation: Story = {
  args: {
    step: mockLinkedInInvitation,
    onConfigChange: (config) => console.log("Config changed:", config),
  },
};

export const LinkedInChat: Story = {
  args: {
    step: mockChat,
    onConfigChange: (config) => console.log("Config changed:", config),
  },
};

export const AIGenerate: Story = {
  args: {
    step: mockAIGenerate,
    onConfigChange: (config) => console.log("Config changed:", config),
  },
};

export const APICall: Story = {
  args: {
    step: mockAPICall,
    onConfigChange: (config) => console.log("Config changed:", config),
  },
};

export const SendToCampaign: Story = {
  args: {
    step: mockSendToCampaign,
    onConfigChange: (config) => console.log("Config changed:", config),
  },
};

export const ProfileVisit: Story = {
  args: {
    step: mockProfileVisit,
    onConfigChange: (config) => console.log("Config changed:", config),
  },
};

export const LikePost: Story = {
  args: {
    step: mockLikePost,
    onConfigChange: (config) => console.log("Config changed:", config),
  },
};

export const ABTest: Story = {
  args: {
    step: mockABTest,
    activeVersion: "A",
    onConfigChange: (config) => console.log("Config changed:", config),
  },
};

export const ConditionAccepted: Story = {
  args: {
    step: mockConditionAccepted,
    onConfigChange: (config) => console.log("Config changed:", config),
  },
};

export const WithError: Story = {
  args: {
    step: mockWithError,
    onConfigChange: (config) => console.log("Config changed:", config),
  },
};

export const Empty: Story = {
  args: {
    step: null,
    onConfigChange: (config) => console.log("Config changed:", config),
  },
};
