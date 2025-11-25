import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

const meta: Meta<typeof Table> = {
  title: "UI/Table",
  component: Table,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>Een lijst van recente facturen.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Factuur</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Methode</TableHead>
          <TableHead className="text-right">Bedrag</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Betaald</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">€250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV002</TableCell>
          <TableCell>In afwachting</TableCell>
          <TableCell>PayPal</TableCell>
          <TableCell className="text-right">€150.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV003</TableCell>
          <TableCell>Betaald</TableCell>
          <TableCell>Bank Transfer</TableCell>
          <TableCell className="text-right">€350.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const LeadList: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40px]">
            <Checkbox />
          </TableHead>
          <TableHead>Naam</TableHead>
          <TableHead>Bedrijf</TableHead>
          <TableHead>Functie</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-[50px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <Checkbox />
          </TableCell>
          <TableCell className="font-medium">Jan van der Berg</TableCell>
          <TableCell>Acme Corp</TableCell>
          <TableCell>Sales Director</TableCell>
          <TableCell>
            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
              Pending
            </Badge>
          </TableCell>
          <TableCell>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Checkbox />
          </TableCell>
          <TableCell className="font-medium">Lisa de Vries</TableCell>
          <TableCell>TechStart BV</TableCell>
          <TableCell>CEO</TableCell>
          <TableCell>
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
              Contacted
            </Badge>
          </TableCell>
          <TableCell>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Checkbox />
          </TableCell>
          <TableCell className="font-medium">Pieter Jansen</TableCell>
          <TableCell>Global Solutions</TableCell>
          <TableCell>Marketing Manager</TableCell>
          <TableCell>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              Accepted
            </Badge>
          </TableCell>
          <TableCell>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Checkbox />
          </TableCell>
          <TableCell className="font-medium">Maria Bakker</TableCell>
          <TableCell>InnovateTech</TableCell>
          <TableCell>CTO</TableCell>
          <TableCell>
            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
              Replied
            </Badge>
          </TableCell>
          <TableCell>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const CampaignList: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40px]">
            <Checkbox />
          </TableHead>
          <TableHead>Campagne</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Leads</TableHead>
          <TableHead className="text-right">Accepted</TableHead>
          <TableHead className="text-right">Replied</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <Checkbox />
          </TableCell>
          <TableCell className="font-medium">Q4 Sales Outreach</TableCell>
          <TableCell>
            <Badge className="bg-green-100 text-green-600">Active</Badge>
          </TableCell>
          <TableCell className="text-right">245</TableCell>
          <TableCell className="text-right">42%</TableCell>
          <TableCell className="text-right">18%</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Checkbox />
          </TableCell>
          <TableCell className="font-medium">Partner Network</TableCell>
          <TableCell>
            <Badge className="bg-amber-100 text-amber-600">Paused</Badge>
          </TableCell>
          <TableCell className="text-right">89</TableCell>
          <TableCell className="text-right">38%</TableCell>
          <TableCell className="text-right">12%</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Checkbox />
          </TableCell>
          <TableCell className="font-medium">Hiring Campaign</TableCell>
          <TableCell>
            <Badge className="bg-slate-100 text-slate-600">Draft</Badge>
          </TableCell>
          <TableCell className="text-right">0</TableCell>
          <TableCell className="text-right">-</TableCell>
          <TableCell className="text-right">-</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const Simple: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Variabele</TableHead>
          <TableHead>Waarde</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-mono text-sm">{"{{voornaam}}"}</TableCell>
          <TableCell>Jan</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-mono text-sm">{"{{bedrijf}}"}</TableCell>
          <TableCell>Acme Corp</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-mono text-sm">{"{{functie}}"}</TableCell>
          <TableCell>Sales Director</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
