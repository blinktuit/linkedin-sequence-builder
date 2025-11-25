import type { Meta, StoryObj } from "@storybook/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Selecteer optie" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="optie1">Optie 1</SelectItem>
        <SelectItem value="optie2">Optie 2</SelectItem>
        <SelectItem value="optie3">Optie 3</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label htmlFor="status">Status</Label>
      <Select>
        <SelectTrigger id="status" className="w-[180px]">
          <SelectValue placeholder="Selecteer status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Actief</SelectItem>
          <SelectItem value="paused">Gepauzeerd</SelectItem>
          <SelectItem value="archived">Gearchiveerd</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Selecteer een actie" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>LinkedIn Acties</SelectLabel>
          <SelectItem value="invite">Uitnodiging versturen</SelectItem>
          <SelectItem value="visit">Profiel bezoeken</SelectItem>
          <SelectItem value="message">Bericht sturen</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Integraties</SelectLabel>
          <SelectItem value="api">API call</SelectItem>
          <SelectItem value="webhook">Webhook</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Condities</SelectLabel>
          <SelectItem value="accepted">Uitnodiging geaccepteerd</SelectItem>
          <SelectItem value="replied">Bericht beantwoord</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Uitgeschakeld" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">Optie 1</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithDisabledItems: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Kies plan" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="free">Gratis</SelectItem>
        <SelectItem value="pro">Pro</SelectItem>
        <SelectItem value="enterprise" disabled>
          Enterprise (binnenkort)
        </SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const LeadStatus: Story = {
  render: () => (
    <Select defaultValue="pending">
      <SelectTrigger className="w-[150px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="contacted">Contacted</SelectItem>
        <SelectItem value="accepted">Accepted</SelectItem>
        <SelectItem value="replied">Replied</SelectItem>
        <SelectItem value="excluded">Excluded</SelectItem>
      </SelectContent>
    </Select>
  ),
};
