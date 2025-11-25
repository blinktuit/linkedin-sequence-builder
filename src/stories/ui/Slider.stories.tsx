import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const meta: Meta<typeof Slider> = {
  title: "UI/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[300px]">
      <Slider defaultValue={[50]} max={100} step={1} />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-[300px] space-y-2">
      <Label>Volume</Label>
      <Slider defaultValue={[75]} max={100} step={1} />
    </div>
  ),
};

export const WithValue: Story = {
  render: function SliderWithValue() {
    const [value, setValue] = useState([50]);
    return (
      <div className="w-[300px] space-y-2">
        <div className="flex justify-between">
          <Label>Percentage</Label>
          <span className="text-sm text-muted-foreground">{value[0]}%</span>
        </div>
        <Slider
          value={value}
          onValueChange={setValue}
          max={100}
          step={1}
        />
      </div>
    );
  },
};

export const ABTestSplit: Story = {
  render: function ABTestSlider() {
    const [value, setValue] = useState([50]);
    return (
      <div className="w-[300px] space-y-3">
        <Label>A/B Test Verdeling</Label>
        <Slider
          value={value}
          onValueChange={setValue}
          max={100}
          step={5}
        />
        <div className="flex justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded" style={{ background: '#48ade8' }} />
            <span>Version A: {value[0]}%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded" style={{ background: '#ea5154' }} />
            <span>Version B: {100 - value[0]}%</span>
          </div>
        </div>
      </div>
    );
  },
};

export const MessageDelay: Story = {
  render: function DelaySlider() {
    const [value, setValue] = useState([3]);
    return (
      <div className="w-[300px] space-y-2">
        <div className="flex justify-between">
          <Label>Wachttijd tussen berichten</Label>
          <span className="text-sm text-muted-foreground">{value[0]} dagen</span>
        </div>
        <Slider
          value={value}
          onValueChange={setValue}
          max={14}
          min={1}
          step={1}
        />
        <p className="text-xs text-muted-foreground">
          Aanbevolen: 2-5 dagen tussen berichten
        </p>
      </div>
    );
  },
};

export const Range: Story = {
  render: function RangeSlider() {
    const [value, setValue] = useState([25, 75]);
    return (
      <div className="w-[300px] space-y-2">
        <div className="flex justify-between">
          <Label>Prijs range</Label>
          <span className="text-sm text-muted-foreground">
            €{value[0]} - €{value[1]}
          </span>
        </div>
        <Slider
          value={value}
          onValueChange={setValue}
          max={100}
          step={5}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[300px] space-y-2">
      <Label className="text-muted-foreground">Uitgeschakeld</Label>
      <Slider defaultValue={[50]} max={100} step={1} disabled />
    </div>
  ),
};
