import type { Meta, StoryObj } from "@storybook/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Plus, Minus } from "lucide-react";

const meta: Meta<typeof Popover> = {
  title: "UI/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensies</h4>
            <p className="text-sm text-muted-foreground">
              Stel de dimensies in voor de laag.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Breedte</Label>
              <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Hoogte</Label>
              <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WaitTimeConfig: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <button className="text-[10px] font-medium uppercase tracking-wide">
          <span className="text-muted-foreground">Wait </span>
          <span className="text-primary cursor-pointer">1 day</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-3" align="start">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Wait</span>
          <Button variant="outline" size="icon" className="h-7 w-7">
            <Minus className="h-3 w-3" />
          </Button>
          <div className="flex items-center justify-center border rounded-md h-7 w-12">
            <span className="text-sm font-medium">1</span>
          </div>
          <Button variant="outline" size="icon" className="h-7 w-7">
            <Plus className="h-3 w-3" />
          </Button>
          <select className="h-7 px-2 text-xs border rounded-md">
            <option>day</option>
            <option>hour</option>
            <option>week</option>
          </select>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const SettingsPopover: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <div className="grid gap-4">
          <h4 className="font-medium leading-none">Instellingen</h4>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications" className="text-sm">
                Notificaties
              </Label>
              <input type="checkbox" id="notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sounds" className="text-sm">
                Geluiden
              </Label>
              <input type="checkbox" id="sounds" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const VariablesPicker: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          + Variabele
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2">
        <div className="grid gap-1">
          <p className="text-xs font-medium text-muted-foreground px-2 py-1">
            Beschikbare variabelen
          </p>
          <button className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-muted">
            {"{{voornaam}}"}
          </button>
          <button className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-muted">
            {"{{achternaam}}"}
          </button>
          <button className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-muted">
            {"{{bedrijf}}"}
          </button>
          <button className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-muted">
            {"{{functie}}"}
          </button>
          <button className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-muted">
            {"{{industrie}}"}
          </button>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
