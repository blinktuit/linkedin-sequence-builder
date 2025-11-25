import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const meta: Meta<typeof RadioGroup> = {
  title: "UI/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Optie een</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Optie twee</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-three" id="option-three" />
        <Label htmlFor="option-three">Optie drie</Label>
      </div>
    </RadioGroup>
  ),
};

export const ConditionWaitMode: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="text-xs font-medium text-muted-foreground">Lead actie</div>
      <RadioGroup defaultValue="wait-until">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="wait-until" id="wait-until" />
          <Label htmlFor="wait-until" className="text-sm">
            Wait until Accepted invite
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="within" id="within" />
          <Label htmlFor="within" className="text-sm">
            If Accepted within
          </Label>
        </div>
      </RadioGroup>
    </div>
  ),
};

export const TemplateType: Story = {
  render: () => (
    <div className="space-y-3">
      <Label>Template type</Label>
      <RadioGroup defaultValue="custom">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="custom" id="custom" />
          <Label htmlFor="custom">Custom template</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="premade" id="premade" />
          <Label htmlFor="premade">Premade template</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="ai" id="ai" />
          <Label htmlFor="ai">AI generated</Label>
        </div>
      </RadioGroup>
    </div>
  ),
};

export const LeadSource: Story = {
  render: () => (
    <div className="space-y-3 w-[280px]">
      <Label>Lead bron</Label>
      <RadioGroup defaultValue="csv">
        <div className="flex items-center space-x-2 p-2 rounded border hover:bg-muted/50">
          <RadioGroupItem value="csv" id="csv" />
          <div>
            <Label htmlFor="csv" className="cursor-pointer">
              CSV Upload
            </Label>
            <p className="text-xs text-muted-foreground">
              Upload een CSV bestand met leads
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 p-2 rounded border hover:bg-muted/50">
          <RadioGroupItem value="search" id="search" />
          <div>
            <Label htmlFor="search" className="cursor-pointer">
              LinkedIn Search
            </Label>
            <p className="text-xs text-muted-foreground">
              Importeer van Sales Navigator
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 p-2 rounded border hover:bg-muted/50">
          <RadioGroupItem value="campaign" id="campaign" />
          <div>
            <Label htmlFor="campaign" className="cursor-pointer">
              Andere campagne
            </Label>
            <p className="text-xs text-muted-foreground">
              Kopieer leads van bestaande campagne
            </p>
          </div>
        </div>
      </RadioGroup>
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <div className="space-y-2">
      <Label>Weergave</Label>
      <RadioGroup defaultValue="grid" className="flex gap-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="grid" id="grid" />
          <Label htmlFor="grid">Grid</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="list" id="list" />
          <Label htmlFor="list">Lijst</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="table" id="table" />
          <Label htmlFor="table">Tabel</Label>
        </div>
      </RadioGroup>
    </div>
  ),
};
