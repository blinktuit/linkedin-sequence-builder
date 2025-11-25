import type { Meta, StoryObj } from "@storybook/react";
import { StepLibrary } from "@/components/campaign/StepLibrary";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Plus } from "lucide-react";

const meta: Meta<typeof StepLibrary> = {
  title: "Campaign/StepLibrary",
  component: StepLibrary,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function StepLibraryStory() {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Step
        </Button>
        <StepLibrary
          open={open}
          onClose={() => setOpen(false)}
          onSelectStep={(type) => {
            console.log("Selected step type:", type);
            setOpen(false);
          }}
        />
      </div>
    );
  },
};

export const Open: Story = {
  args: {
    open: true,
    onClose: () => console.log("Closed"),
    onSelectStep: (type) => console.log("Selected:", type),
  },
};

export const InteractiveDemo: Story = {
  render: function InteractiveStepLibrary() {
    const [open, setOpen] = useState(false);
    const [selectedSteps, setSelectedSteps] = useState<string[]>([]);

    return (
      <div className="space-y-4">
        <Button onClick={() => setOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Step to Sequence
        </Button>

        {selectedSteps.length > 0 && (
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">Selected Steps:</h4>
            <ul className="list-disc list-inside text-sm text-muted-foreground">
              {selectedSteps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>
        )}

        <StepLibrary
          open={open}
          onClose={() => setOpen(false)}
          onSelectStep={(type) => {
            setSelectedSteps([...selectedSteps, type]);
            setOpen(false);
          }}
        />
      </div>
    );
  },
};
