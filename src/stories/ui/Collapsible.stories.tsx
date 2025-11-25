import type { Meta, StoryObj } from "@storybook/react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Settings } from "lucide-react";
import { useState } from "react";

const meta: Meta<typeof Collapsible> = {
  title: "UI/Collapsible",
  component: Collapsible,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultCollapsible() {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-[350px]">
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">Extra opties</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              {isOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2 px-4 pt-2">
          <div className="rounded-md border px-4 py-3 text-sm">
            Optie 1: Extra functionaliteit
          </div>
          <div className="rounded-md border px-4 py-3 text-sm">
            Optie 2: Geavanceerde instellingen
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};

export const AdvancedOptions: Story = {
  render: function AdvancedOptionsCollapsible() {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-[350px]">
        <CollapsibleTrigger asChild>
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full">
            <Settings className="h-4 w-4" />
            <span>Geavanceerde opties</span>
            <ChevronDown
              className={`h-4 w-4 ml-auto transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Max berichten per dag</label>
            <input
              type="number"
              className="w-full h-9 px-3 rounded-md border text-sm"
              defaultValue={25}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Wachttijd (seconden)</label>
            <input
              type="number"
              className="w-full h-9 px-3 rounded-md border text-sm"
              defaultValue={30}
            />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="randomize" />
            <label htmlFor="randomize" className="text-sm">
              Randomize timing
            </label>
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};

export const ConfigPanelStyle: Story = {
  render: function ConfigPanelCollapsible() {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div className="w-[350px] border rounded-lg p-4 bg-card">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <span className="font-medium text-sm">Message Settings</span>
            <ChevronDown
              className={`h-4 w-4 text-muted-foreground transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Subject line
              </label>
              <input
                type="text"
                className="w-full h-8 px-3 rounded-md border text-sm"
                placeholder="Enter subject..."
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Signature
              </label>
              <select className="w-full h-8 px-3 rounded-md border text-sm">
                <option>Default signature</option>
                <option>Custom signature</option>
                <option>No signature</option>
              </select>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  },
};

export const Multiple: Story = {
  render: function MultipleCollapsibles() {
    const [openItems, setOpenItems] = useState<string[]>(["item-1"]);

    const toggleItem = (item: string) => {
      setOpenItems((prev) =>
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
      );
    };

    return (
      <div className="w-[350px] space-y-2">
        {["Bericht instellingen", "Timing opties", "Tracking"].map(
          (title, index) => (
            <Collapsible
              key={index}
              open={openItems.includes(`item-${index}`)}
              onOpenChange={() => toggleItem(`item-${index}`)}
              className="border rounded-lg"
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3">
                <span className="font-medium text-sm">{title}</span>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform ${
                    openItems.includes(`item-${index}`) ? "rotate-180" : ""
                  }`}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-3 pb-3">
                <div className="text-sm text-muted-foreground">
                  Content voor {title.toLowerCase()}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )
        )}
      </div>
    );
  },
};
