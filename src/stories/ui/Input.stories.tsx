import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Mail, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "tel", "url"],
    },
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
    placeholder: "Type hier...",
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Uitgeschakeld",
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: "john@example.com",
    type: "email",
  },
};

export const File: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="file">Bestand uploaden</Label>
      <Input id="file" type="file" />
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input className="pl-10" placeholder="Zoeken..." />
    </div>
  ),
};

export const Password: Story = {
  render: function PasswordInput() {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <div className="relative w-full max-w-sm">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Wachtwoord"
          defaultValue="secret123"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    );
  },
};

export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <div className="grid gap-1.5">
        <Label>Text</Label>
        <Input type="text" placeholder="Text input" />
      </div>
      <div className="grid gap-1.5">
        <Label>Email</Label>
        <Input type="email" placeholder="email@example.com" />
      </div>
      <div className="grid gap-1.5">
        <Label>Password</Label>
        <Input type="password" placeholder="********" />
      </div>
      <div className="grid gap-1.5">
        <Label>Number</Label>
        <Input type="number" placeholder="0" />
      </div>
      <div className="grid gap-1.5">
        <Label>Search</Label>
        <Input type="search" placeholder="Zoeken..." />
      </div>
    </div>
  ),
};
