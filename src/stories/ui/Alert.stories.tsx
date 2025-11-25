import type { Meta, StoryObj } from "@storybook/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";

const meta: Meta<typeof Alert> = {
  title: "UI/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Alert className="w-[400px]">
      <Info className="h-4 w-4" />
      <AlertTitle>Let op</AlertTitle>
      <AlertDescription>
        Dit is een informatief bericht voor de gebruiker.
      </AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="w-[400px]">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Fout</AlertTitle>
      <AlertDescription>
        Er is iets misgegaan. Probeer het opnieuw.
      </AlertDescription>
    </Alert>
  ),
};

export const Success: Story = {
  render: () => (
    <Alert className="w-[400px] border-green-500/50 text-green-600 [&>svg]:text-green-600">
      <CheckCircle className="h-4 w-4" />
      <AlertTitle>Gelukt!</AlertTitle>
      <AlertDescription>
        Je wijzigingen zijn succesvol opgeslagen.
      </AlertDescription>
    </Alert>
  ),
};

export const Warning: Story = {
  render: () => (
    <Alert className="w-[400px] border-amber-500/50 text-amber-600 [&>svg]:text-amber-600">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Waarschuwing</AlertTitle>
      <AlertDescription>
        Je bericht bevat mogelijk gevoelige informatie.
      </AlertDescription>
    </Alert>
  ),
};

export const WithoutTitle: Story = {
  render: () => (
    <Alert className="w-[400px]">
      <Info className="h-4 w-4" />
      <AlertDescription>
        Een simpele alert zonder titel.
      </AlertDescription>
    </Alert>
  ),
};

export const CampaignAlerts: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-[400px]">
      <Alert className="border-amber-500/50 bg-amber-50 text-amber-700 [&>svg]:text-amber-600">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Bericht content is verplicht
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          LinkedIn connectie limiet bereikt
        </AlertDescription>
      </Alert>
      <Alert className="border-green-500/50 bg-green-50 text-green-700 [&>svg]:text-green-600">
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          Campagne succesvol gestart
        </AlertDescription>
      </Alert>
    </div>
  ),
};
