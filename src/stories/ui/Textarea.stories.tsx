import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const meta: Meta<typeof Textarea> = {
  title: "UI/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Type je bericht...",
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-[400px] gap-1.5">
      <Label htmlFor="message">Je bericht</Label>
      <Textarea placeholder="Type je bericht hier..." id="message" />
    </div>
  ),
};

export const WithText: Story = {
  render: () => (
    <div className="grid w-[400px] gap-1.5">
      <Label htmlFor="bio">Bio</Label>
      <Textarea placeholder="Vertel iets over jezelf" id="bio" />
      <p className="text-sm text-muted-foreground">
        Je bio wordt getoond op je profiel.
      </p>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    placeholder: "Uitgeschakeld",
    disabled: true,
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
};

export const WithValue: Story = {
  args: {
    defaultValue:
      "Hallo {{voornaam}},\n\nIk zag dat je werkzaam bent bij {{bedrijf}} en wilde graag connecten.\n\nMet vriendelijke groet,\nJan",
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
};

export const LinkedInMessage: Story = {
  render: () => (
    <div className="grid w-[400px] gap-1.5">
      <Label>LinkedIn Bericht</Label>
      <Textarea
        placeholder="Schrijf je connectieverzoek bericht..."
        defaultValue="Hallo {{voornaam}},

Leuk om te zien dat je ook in de {{industrie}} sector actief bent. Ik zou graag mijn netwerk uitbreiden met professionals zoals jij.

Groet,
{{mijn_naam}}"
        className="min-h-[150px]"
      />
      <p className="text-sm text-muted-foreground">
        Gebruik variabelen zoals {"{{voornaam}}"} voor personalisatie.
      </p>
    </div>
  ),
};
