import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

const meta: Meta<typeof Label> = {
  title: "UI/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Label tekst",
  },
};

export const WithInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="bio">Bio</Label>
      <Input type="text" id="bio" placeholder="Vertel iets over jezelf" />
      <p className="text-sm text-muted-foreground">
        Dit wordt getoond op je profiel.
      </p>
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="name">
        Naam <span className="text-destructive">*</span>
      </Label>
      <Input type="text" id="name" placeholder="Je naam" />
    </div>
  ),
};

export const WithCheckbox: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accepteer de algemene voorwaarden</Label>
    </div>
  ),
};

export const WithSwitch: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="active" />
      <Label htmlFor="active">Campagne actief</Label>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="disabled" className="text-muted-foreground">
        Uitgeschakeld veld
      </Label>
      <Input type="text" id="disabled" placeholder="Niet beschikbaar" disabled />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="campaign-name">
          Campagne naam <span className="text-destructive">*</span>
        </Label>
        <Input id="campaign-name" placeholder="Bijv. Q4 Sales Outreach" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="description">Beschrijving</Label>
        <Input id="description" placeholder="Optionele beschrijving" />
        <p className="text-xs text-muted-foreground">
          Maximaal 200 karakters
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="notifications">Email notificaties</Label>
          <p className="text-xs text-muted-foreground">
            Ontvang updates over deze campagne
          </p>
        </div>
        <Switch id="notifications" />
      </div>
    </div>
  ),
};
