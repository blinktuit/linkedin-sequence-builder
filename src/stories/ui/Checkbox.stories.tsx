import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
  component: Checkbox,
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
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accepteer voorwaarden</Label>
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="items-top flex space-x-2">
      <Checkbox id="terms2" />
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor="terms2">Accepteer voorwaarden</Label>
        <p className="text-sm text-muted-foreground">
          Je gaat akkoord met onze algemene voorwaarden en privacybeleid.
        </p>
      </div>
    </div>
  ),
};

export const CheckboxList: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center space-x-2">
        <Checkbox id="lead-1" defaultChecked />
        <Label htmlFor="lead-1">Jan van der Berg</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="lead-2" defaultChecked />
        <Label htmlFor="lead-2">Lisa de Vries</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="lead-3" />
        <Label htmlFor="lead-3">Pieter Jansen</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="lead-4" disabled />
        <Label htmlFor="lead-4" className="text-muted-foreground">
          Excluded lead
        </Label>
      </div>
    </div>
  ),
};

export const SelectAll: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center space-x-2 border-b pb-2">
        <Checkbox id="select-all" />
        <Label htmlFor="select-all" className="font-semibold">
          Selecteer alles
        </Label>
      </div>
      <div className="flex flex-col gap-2 pl-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="item-1" />
          <Label htmlFor="item-1">Item 1</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="item-2" />
          <Label htmlFor="item-2">Item 2</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="item-3" />
          <Label htmlFor="item-3">Item 3</Label>
        </div>
      </div>
    </div>
  ),
};
