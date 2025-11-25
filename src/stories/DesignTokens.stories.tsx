import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Design System/Design Tokens",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

const ColorSwatch = ({
  name,
  variable,
  description,
}: {
  name: string;
  variable: string;
  description?: string;
}) => (
  <div className="flex items-center gap-4 p-3 rounded-lg border">
    <div
      className="h-12 w-12 rounded-md border shadow-sm flex-shrink-0"
      style={{ backgroundColor: `hsl(var(${variable}))` }}
    />
    <div>
      <div className="font-medium text-sm">{name}</div>
      <code className="text-xs text-muted-foreground">{variable}</code>
      {description && (
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      )}
    </div>
  </div>
);

export const Colors: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-4">Brand Kleuren</h2>
        <div className="grid grid-cols-2 gap-3">
          <ColorSwatch
            name="Primary"
            variable="--primary"
            description="Teal - Hoofdkleur voor CTAs en accenten"
          />
          <ColorSwatch
            name="Primary Foreground"
            variable="--primary-foreground"
            description="Tekst op primary achtergrond"
          />
          <ColorSwatch
            name="Secondary"
            variable="--secondary"
            description="Lichte teal - Secundaire acties"
          />
          <ColorSwatch
            name="Secondary Foreground"
            variable="--secondary-foreground"
            description="Tekst op secondary achtergrond"
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Achtergronden</h2>
        <div className="grid grid-cols-2 gap-3">
          <ColorSwatch
            name="Background"
            variable="--background"
            description="Pagina achtergrond"
          />
          <ColorSwatch
            name="Card"
            variable="--card"
            description="Kaart achtergrond"
          />
          <ColorSwatch
            name="Popover"
            variable="--popover"
            description="Dropdown/popover achtergrond"
          />
          <ColorSwatch
            name="Muted"
            variable="--muted"
            description="Subtiele achtergrond"
          />
          <ColorSwatch
            name="Accent"
            variable="--accent"
            description="Hover states"
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Tekst</h2>
        <div className="grid grid-cols-2 gap-3">
          <ColorSwatch
            name="Foreground"
            variable="--foreground"
            description="Primaire tekst"
          />
          <ColorSwatch
            name="Muted Foreground"
            variable="--muted-foreground"
            description="Secundaire tekst"
          />
          <ColorSwatch
            name="Card Foreground"
            variable="--card-foreground"
            description="Tekst in kaarten"
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Feedback Kleuren</h2>
        <div className="grid grid-cols-2 gap-3">
          <ColorSwatch
            name="Success"
            variable="--success"
            description="Succes berichten"
          />
          <ColorSwatch
            name="Warning"
            variable="--warning"
            description="Waarschuwingen"
          />
          <ColorSwatch
            name="Destructive"
            variable="--destructive"
            description="Fouten en verwijder acties"
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Borders & Input</h2>
        <div className="grid grid-cols-2 gap-3">
          <ColorSwatch
            name="Border"
            variable="--border"
            description="Standaard border kleur"
          />
          <ColorSwatch
            name="Input"
            variable="--input"
            description="Input border kleur"
          />
          <ColorSwatch
            name="Ring"
            variable="--ring"
            description="Focus ring kleur"
          />
        </div>
      </div>
    </div>
  ),
};

export const Typography: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-4">Font Family</h2>
        <p className="text-muted-foreground mb-4">
          Figtree (fallback: system-ui, sans-serif)
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Font Sizes</h2>
        <div className="space-y-4">
          <div>
            <span className="text-xs">text-xs (12px)</span>
            <p className="text-xs">The quick brown fox jumps over the lazy dog.</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">text-sm (14px)</span>
            <p className="text-sm">The quick brown fox jumps over the lazy dog.</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">text-base (16px)</span>
            <p className="text-base">The quick brown fox jumps over the lazy dog.</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">text-lg (18px)</span>
            <p className="text-lg">The quick brown fox jumps over the lazy dog.</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">text-xl (20px)</span>
            <p className="text-xl">The quick brown fox jumps over the lazy dog.</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">text-2xl (24px)</span>
            <p className="text-2xl">The quick brown fox jumps over the lazy dog.</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Font Weights</h2>
        <div className="space-y-2">
          <p className="font-normal">font-normal (400) - Regular text</p>
          <p className="font-medium">font-medium (500) - Medium emphasis</p>
          <p className="font-semibold">font-semibold (600) - Headings</p>
          <p className="font-bold">font-bold (700) - Strong emphasis</p>
        </div>
      </div>
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-4">Spacing Scale (Tailwind)</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Gebaseerd op 4px (0.25rem) base unit
        </p>
        <div className="space-y-2">
          {[
            { name: "0.5", value: "2px" },
            { name: "1", value: "4px" },
            { name: "2", value: "8px" },
            { name: "3", value: "12px" },
            { name: "4", value: "16px" },
            { name: "5", value: "20px" },
            { name: "6", value: "24px" },
            { name: "8", value: "32px" },
            { name: "10", value: "40px" },
            { name: "12", value: "48px" },
          ].map((item) => (
            <div key={item.name} className="flex items-center gap-4">
              <code className="text-xs w-12">{item.name}</code>
              <div
                className="bg-primary h-4"
                style={{ width: item.value }}
              />
              <span className="text-xs text-muted-foreground">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const BorderRadius: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-4">Border Radius</h2>
        <div className="flex flex-wrap gap-6">
          <div className="text-center">
            <div className="h-16 w-16 bg-primary rounded-none mx-auto mb-2" />
            <code className="text-xs">rounded-none</code>
          </div>
          <div className="text-center">
            <div className="h-16 w-16 bg-primary rounded-sm mx-auto mb-2" />
            <code className="text-xs">rounded-sm</code>
          </div>
          <div className="text-center">
            <div className="h-16 w-16 bg-primary rounded mx-auto mb-2" />
            <code className="text-xs">rounded</code>
          </div>
          <div className="text-center">
            <div className="h-16 w-16 bg-primary rounded-md mx-auto mb-2" />
            <code className="text-xs">rounded-md</code>
          </div>
          <div className="text-center">
            <div className="h-16 w-16 bg-primary rounded-lg mx-auto mb-2" />
            <code className="text-xs">rounded-lg</code>
          </div>
          <div className="text-center">
            <div className="h-16 w-16 bg-primary rounded-xl mx-auto mb-2" />
            <code className="text-xs">rounded-xl</code>
          </div>
          <div className="text-center">
            <div className="h-16 w-16 bg-primary rounded-full mx-auto mb-2" />
            <code className="text-xs">rounded-full</code>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Shadows: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-4">Box Shadows</h2>
        <div className="flex flex-wrap gap-8">
          <div className="text-center">
            <div className="h-16 w-24 bg-card shadow-sm rounded-lg mx-auto mb-2" />
            <code className="text-xs">shadow-sm</code>
          </div>
          <div className="text-center">
            <div className="h-16 w-24 bg-card shadow rounded-lg mx-auto mb-2" />
            <code className="text-xs">shadow</code>
          </div>
          <div className="text-center">
            <div className="h-16 w-24 bg-card shadow-md rounded-lg mx-auto mb-2" />
            <code className="text-xs">shadow-md</code>
          </div>
          <div className="text-center">
            <div className="h-16 w-24 bg-card shadow-lg rounded-lg mx-auto mb-2" />
            <code className="text-xs">shadow-lg</code>
          </div>
          <div className="text-center">
            <div className="h-16 w-24 bg-card shadow-xl rounded-lg mx-auto mb-2" />
            <code className="text-xs">shadow-xl</code>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const StatusColors: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-4">Lead Status Kleuren</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Gebruikt in badges en status indicators
        </p>
        <div className="flex flex-wrap gap-3">
          <div className="px-3 py-1.5 rounded-full bg-amber-100 text-amber-800 text-sm font-medium">
            Pending
          </div>
          <div className="px-3 py-1.5 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
            Contacted
          </div>
          <div className="px-3 py-1.5 rounded-full bg-green-100 text-green-800 text-sm font-medium">
            Accepted
          </div>
          <div className="px-3 py-1.5 rounded-full bg-purple-100 text-purple-800 text-sm font-medium">
            Replied
          </div>
          <div className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-800 text-sm font-medium">
            Excluded
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Campaign Status</h2>
        <div className="flex flex-wrap gap-3">
          <div className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm font-medium">
            Draft
          </div>
          <div className="px-3 py-1.5 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
            In Progress
          </div>
          <div className="px-3 py-1.5 rounded-full bg-amber-100 text-amber-600 text-sm font-medium">
            Paused
          </div>
          <div className="px-3 py-1.5 rounded-full bg-green-100 text-green-600 text-sm font-medium">
            Completed
          </div>
          <div className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 text-sm font-medium">
            Archived
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">A/B Test Variant Kleuren</h2>
        <div className="flex flex-wrap gap-3">
          <div className="px-3 py-1.5 rounded-lg text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg, #48ade8, #3a9ad4)' }}>
            Version A
          </div>
          <div className="px-3 py-1.5 rounded-lg text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg, #ea5154, #d4453f)' }}>
            Version B
          </div>
          <div className="px-3 py-1.5 rounded-lg text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg, #36b39a, #2a9a84)' }}>
            Version C
          </div>
          <div className="px-3 py-1.5 rounded-lg text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
            Version D
          </div>
          <div className="px-3 py-1.5 rounded-lg text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}>
            Version E
          </div>
        </div>
      </div>
    </div>
  ),
};
