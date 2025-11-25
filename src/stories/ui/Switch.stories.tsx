import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const meta: Meta<typeof Switch> = {
  title: "UI/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
    checked: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Vliegtuigmodus</Label>
    </div>
  ),
};

export const Controlled: Story = {
  render: function ControlledSwitch() {
    const [enabled, setEnabled] = useState(false);
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="controlled"
            checked={enabled}
            onCheckedChange={setEnabled}
          />
          <Label htmlFor="controlled">
            Campagne {enabled ? "Actief" : "Gepauzeerd"}
          </Label>
        </div>
        <p className="text-sm text-muted-foreground">
          Status: {enabled ? "Aan" : "Uit"}
        </p>
      </div>
    );
  },
};

export const SettingsExample: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[300px]">
      <div className="flex items-center justify-between">
        <div>
          <Label>Email notificaties</Label>
          <p className="text-sm text-muted-foreground">
            Ontvang email updates
          </p>
        </div>
        <Switch defaultChecked />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <Label>Push notificaties</Label>
          <p className="text-sm text-muted-foreground">
            Ontvang push berichten
          </p>
        </div>
        <Switch />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <Label>Marketing</Label>
          <p className="text-sm text-muted-foreground">
            Ontvang promoties
          </p>
        </div>
        <Switch disabled />
      </div>
    </div>
  ),
};
