# LinkedIn Sequence Builder - Style Guide

Complete style guide voor het LinkedIn Sequence Builder project. Deze guide documenteert alle design tokens, componenten styling, en best practices.

## Inhoudsopgave

1. [Design System Architectuur](#design-system-architectuur)
2. [Kleuren & Theming](#kleuren--theming)
3. [Typografie](#typografie)
4. [Spacing & Layout](#spacing--layout)
5. [Componenten](#componenten)
6. [Animaties & Transitions](#animaties--transitions)
7. [Dark Mode](#dark-mode)
8. [Best Practices](#best-practices)

---

## Design System Architectuur

### Basis Stack
- **CSS Framework**: Tailwind CSS
- **Component Variants**: CVA (Class Variance Authority)
- **UI Primitives**: Radix UI
- **Utility Library**: clsx + tailwind-merge (via `cn()`)

### Kleursysteem
HSL-gebaseerde CSS variabelen voor maximale flexibiliteit en dark mode ondersteuning.

---

## Kleuren & Theming

### Primary Colors

#### Background Colors
```css
--background: 0 0% 100%;           /* Wit */
--foreground: 222.2 84% 4.9%;      /* Bijna zwart */
```

#### Primary Color (Teal)
```css
--primary: 168 48% 46%;            /* #36b39a - Hoofdkleur */
--primary-foreground: 0 0% 100%;   /* Wit tekst op primary */
```
**Gebruik**: Hoofdknoppen, actieve states, belangrijke CTAs

#### Card Colors
```css
--card: 0 0% 100%;                 /* Wit */
--card-foreground: 222.2 84% 4.9%; /* Donkere tekst */
```

#### Popover Colors
```css
--popover: 0 0% 100%;
--popover-foreground: 222.2 84% 4.9%;
```

### Secondary & Accent Colors

#### Secondary (Grijs)
```css
--secondary: 210 40% 96.1%;        /* Lichtgrijs */
--secondary-foreground: 222.2 47.4% 11.2%;
```
**Gebruik**: Secundaire knoppen, minder belangrijke acties

#### Muted (Gedempte kleuren)
```css
--muted: 210 40% 96.1%;            /* Lichtgrijs achtergrond */
--muted-foreground: 215.4 16.3% 46.9%; /* Gedempte tekst */
```
**Gebruik**: Placeholders, disabled states, subtiele backgrounds

#### Accent (Blauw)
```css
--accent: 210 40% 96.1%;
--accent-foreground: 222.2 47.4% 11.2%;
```

### Feedback Colors

#### Destructive (Rood)
```css
--destructive: 0 84.2% 60.2%;      /* Rood voor errors/delete */
--destructive-foreground: 210 40% 98%;
```
**Gebruik**: Delete buttons, error messages, waarschuwingen

### UI Element Colors

#### Border & Input
```css
--border: 214.3 31.8% 91.4%;       /* Subtiele borders */
--input: 214.3 31.8% 91.4%;        /* Input borders */
--ring: 168 48% 46%;               /* Focus ring (primary color) */
```

#### Chart Colors (Analytics)
```css
--chart-1: 12 76% 61%;
--chart-2: 173 58% 39%;
--chart-3: 197 37% 24%;
--chart-4: 43 74% 66%;
--chart-5: 27 87% 67%;
```

### Sidebar Colors (Navigation)

```css
--sidebar-background: 0 0% 100%;
--sidebar-foreground: 240 5.3% 26.1%;
--sidebar-primary: 240 5.9% 10%;
--sidebar-primary-foreground: 0 0% 100%;
--sidebar-accent: 240 4.8% 95.9%;
--sidebar-accent-foreground: 240 5.9% 10%;
--sidebar-border: 220 13% 91%;
--sidebar-ring: 217.2 91.2% 59.8%;
```

### Custom Step Card Colors

Voor de campaign builder stappen:

```css
--step-background: 210 40% 98%;      /* Zeer licht blauwgrijs */
--step-border: 214.3 31.8% 91.4%;    /* Subtiele border */
--step-hover-background: 210 40% 96.1%; /* Hover state */
--step-active-border: 168 48% 46%;   /* Active state (primary) */
--step-active-background: 168 48% 96%; /* Lichte teal achtergrond */
```

---

## Typografie

### Font Family
```css
font-family: 'Figtree', system-ui, -apple-system, sans-serif;
```

### Font Sizes & Line Heights

```css
/* Headings */
.text-2xl { font-size: 1.5rem; line-height: 2rem; }    /* 24px */
.text-xl  { font-size: 1.25rem; line-height: 1.75rem; } /* 20px */
.text-lg  { font-size: 1.125rem; line-height: 1.75rem; } /* 18px */

/* Body */
.text-base { font-size: 1rem; line-height: 1.5rem; }   /* 16px */
.text-sm   { font-size: 0.875rem; line-height: 1.25rem; } /* 14px */
.text-xs   { font-size: 0.75rem; line-height: 1rem; }  /* 12px */
```

### Font Weights

```css
.font-normal { font-weight: 400; }   /* Regular tekst */
.font-medium { font-weight: 500; }   /* Medium emphasis */
.font-semibold { font-weight: 600; } /* Headings */
.font-bold { font-weight: 700; }     /* Strong emphasis */
```

### Typografie Patterns

#### Heading Pattern
```tsx
<h1 className="text-2xl font-semibold tracking-tight">
  Grote Titel
</h1>
```

#### Subtitle/Description Pattern
```tsx
<p className="text-sm text-muted-foreground">
  Beschrijving tekst
</p>
```

#### Label Pattern
```tsx
<label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
  Label Tekst
</label>
```

---

## Spacing & Layout

### Spacing Scale
```css
0: 0px
1: 0.25rem  /* 4px */
2: 0.5rem   /* 8px */
3: 0.75rem  /* 12px */
4: 1rem     /* 16px */
5: 1.25rem  /* 20px */
6: 1.5rem   /* 24px */
8: 2rem     /* 32px */
10: 2.5rem  /* 40px */
12: 3rem    /* 48px */
```

### Border Radius
```css
.rounded-none { border-radius: 0; }
.rounded-sm { border-radius: calc(var(--radius) - 4px); }
.rounded-md { border-radius: calc(var(--radius) - 2px); }
.rounded-lg { border-radius: var(--radius); }       /* 0.5rem = 8px */
.rounded-xl { border-radius: calc(var(--radius) + 4px); }
.rounded-full { border-radius: 9999px; }
```

**Default radius**: `--radius: 0.5rem` (8px)

### Container Patterns

#### Page Container
```tsx
<div className="flex-1 space-y-4 p-8 pt-6">
  {/* Page content */}
</div>
```

#### Content Container
```tsx
<div className="container mx-auto p-6">
  {/* Content */}
</div>
```

#### Flex Patterns
```tsx
/* Horizontal spacing */
<div className="flex items-center gap-2">
  {/* Items with 8px gap */}
</div>

/* Vertical spacing */
<div className="space-y-4">
  {/* Items with 16px vertical gap */}
</div>

/* Space between */
<div className="flex items-center justify-between">
  {/* Content on edges */}
</div>
```

---

## Componenten

### Button Component

#### Variants
```tsx
import { Button } from "@/components/ui/button"

// Default (Primary)
<Button>Click me</Button>

// Outline
<Button variant="outline">Click me</Button>

// Secondary
<Button variant="secondary">Click me</Button>

// Destructive
<Button variant="destructive">Delete</Button>

// Ghost (transparant)
<Button variant="ghost">Click me</Button>

// Link (geen achtergrond)
<Button variant="link">Click me</Button>
```

#### Sizes
```tsx
<Button size="default">Default</Button>  /* h-10 px-4 py-2 */
<Button size="sm">Small</Button>         /* h-9 px-3 */
<Button size="lg">Large</Button>         /* h-11 px-8 */
<Button size="icon">🔍</Button>         /* h-10 w-10 */
```

#### Button Styling
```css
/* Base button classes */
inline-flex items-center justify-center gap-2
whitespace-nowrap rounded-md text-sm font-medium
ring-offset-background transition-colors
focus-visible:outline-none focus-visible:ring-2
focus-visible:ring-ring focus-visible:ring-offset-2
disabled:pointer-events-none disabled:opacity-50

/* Default variant */
bg-primary text-primary-foreground
hover:bg-primary/90

/* Outline variant */
border border-input bg-background
hover:bg-accent hover:text-accent-foreground
```

### Input Component

#### Basic Input
```tsx
import { Input } from "@/components/ui/input"

<Input type="text" placeholder="Enter text..." />
<Input type="email" placeholder="Email..." />
```

#### Input Styling
```css
flex h-10 w-full rounded-md border border-input
bg-background px-3 py-2 text-base
ring-offset-background
file:border-0 file:bg-transparent file:text-sm file:font-medium
file:text-foreground
placeholder:text-muted-foreground
focus-visible:outline-none focus-visible:ring-2
focus-visible:ring-ring focus-visible:ring-offset-2
disabled:cursor-not-allowed disabled:opacity-50
```

### Textarea Component

```tsx
import { Textarea } from "@/components/ui/textarea"

<Textarea placeholder="Enter longer text..." rows={4} />
```

### Label Component

```tsx
import { Label } from "@/components/ui/label"

<Label htmlFor="email">Email</Label>
<Input id="email" type="email" />
```

### Card Component

#### Card Structure
```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

#### Card Styling
```css
/* Card */
rounded-lg border bg-card text-card-foreground shadow-sm

/* Card Header */
flex flex-col space-y-1.5 p-6

/* Card Title */
text-2xl font-semibold leading-none tracking-tight

/* Card Description */
text-sm text-muted-foreground

/* Card Content */
p-6 pt-0

/* Card Footer */
flex items-center p-6 pt-0
```

### Dialog (Modal) Component

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>
        Dialog description
      </DialogDescription>
    </DialogHeader>

    {/* Content */}

    <DialogFooter>
      <Button variant="outline" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button onClick={handleSubmit}>
        Confirm
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Select Component

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

<Select value={value} onValueChange={setValue}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </SelectContent>
</Select>
```

### Badge Component

```tsx
import { Badge } from "@/components/ui/badge"

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>
```

#### Badge Styling
```css
/* Default */
border-transparent bg-primary text-primary-foreground
hover:bg-primary/80

/* Secondary */
border-transparent bg-secondary text-secondary-foreground
hover:bg-secondary/80

/* Destructive */
border-transparent bg-destructive text-destructive-foreground
hover:bg-destructive/80

/* Outline */
text-foreground
```

### Checkbox Component

```tsx
import { Checkbox } from "@/components/ui/checkbox"

<div className="flex items-center space-x-2">
  <Checkbox id="terms" checked={checked} onCheckedChange={setChecked} />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>
```

### Radio Group Component

```tsx
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

<RadioGroup value={value} onValueChange={setValue}>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option1" id="option1" />
    <Label htmlFor="option1">Option 1</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option2" id="option2" />
    <Label htmlFor="option2">Option 2</Label>
  </div>
</RadioGroup>
```

### Switch (Toggle) Component

```tsx
import { Switch } from "@/components/ui/switch"

<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" checked={enabled} onCheckedChange={setEnabled} />
  <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>
```

### Tabs Component

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<Tabs defaultValue="tab1" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
    <TabsTrigger value="tab3">Tab 3</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    Content for tab 1
  </TabsContent>
  <TabsContent value="tab2">
    Content for tab 2
  </TabsContent>
  <TabsContent value="tab3">
    Content for tab 3
  </TabsContent>
</Tabs>
```

### Accordion Component

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it styled?</AccordionTrigger>
    <AccordionContent>
      Yes. It comes with default styles that match the design system.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

### Alert Component

```tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the cli.
  </AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Your session has expired. Please log in again.
  </AlertDescription>
</Alert>
```

### Toast Component

```tsx
import { useToast } from "@/hooks/use-toast"

const { toast } = useToast()

// Success toast
toast({
  title: "Success",
  description: "Your changes have been saved.",
})

// Error toast
toast({
  variant: "destructive",
  title: "Error",
  description: "Something went wrong.",
})
```

### Table Component

```tsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Progress Component

```tsx
import { Progress } from "@/components/ui/progress"

<Progress value={33} />
<Progress value={66} className="h-2" />
```

### Skeleton Component

```tsx
import { Skeleton } from "@/components/ui/skeleton"

<div className="space-y-2">
  <Skeleton className="h-4 w-[250px]" />
  <Skeleton className="h-4 w-[200px]" />
</div>
```

### Separator Component

```tsx
import { Separator } from "@/components/ui/separator"

<div>
  <div className="space-y-1">
    <h4 className="text-sm font-medium">Section 1</h4>
  </div>
  <Separator className="my-4" />
  <div className="space-y-1">
    <h4 className="text-sm font-medium">Section 2</h4>
  </div>
</div>
```

### ScrollArea Component

```tsx
import { ScrollArea } from "@/components/ui/scroll-area"

<ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
  {/* Long content */}
</ScrollArea>
```

### Avatar Component

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
```

---

## Animaties & Transitions

### Accordion Animations
```css
/* Expand/Collapse */
@keyframes accordion-down {
  from { height: 0; }
  to { height: var(--radix-accordion-content-height); }
}

@keyframes accordion-up {
  from { height: var(--radix-accordion-content-height); }
  to { height: 0; }
}

.animate-accordion-down { animation: accordion-down 0.2s ease-out; }
.animate-accordion-up { animation: accordion-up 0.2s ease-out; }
```

### Dialog/Modal Animations
```css
/* Overlay fade in/out */
data-[state=open]:animate-in data-[state=closed]:animate-out
data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0

/* Content zoom and slide in */
data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95
data-[state=open]:slide-in-from-left-1/2
data-[state=open]:slide-in-from-top-[48%]
data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
data-[state=closed]:slide-out-to-left-1/2
data-[state=closed]:slide-out-to-top-[48%]
```

### Dropdown/Select Animations
```css
/* Fade and zoom in */
data-[state=open]:animate-in data-[state=closed]:animate-out
data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95

/* Slide from position */
data-[side=bottom]:slide-in-from-top-2
data-[side=left]:slide-in-from-right-2
data-[side=right]:slide-in-from-left-2
data-[side=top]:slide-in-from-bottom-2
```

### Toast Animations
```css
/* Slide in from edge */
data-[state=open]:slide-in-from-top-full
data-[state=open]:sm:slide-in-from-bottom-full

data-[state=closed]:animate-out
data-[state=closed]:fade-out-80
data-[state=closed]:slide-out-to-right-full
```

### Hover Transitions
```css
/* Standard transition */
transition-colors

/* Custom duration */
transition-all duration-200 ease-in-out
```

### Button Hover States
```tsx
/* Primary button */
hover:bg-primary/90

/* Outline button */
hover:bg-accent hover:text-accent-foreground

/* Ghost button */
hover:bg-accent hover:text-accent-foreground

/* Destructive button */
hover:bg-destructive/90
```

---

## Dark Mode

### Implementatie
Dark mode gebruikt de `dark:` prefix in Tailwind CSS met class-based toggling.

### Dark Mode Colors

#### Backgrounds
```css
/* Light mode */
--background: 0 0% 100%;
--foreground: 222.2 84% 4.9%;

/* Dark mode */
--background: 222.2 84% 4.9%;
--foreground: 210 40% 98%;
```

#### Cards & Popovers
```css
/* Light */
--card: 0 0% 100%;
--popover: 0 0% 100%;

/* Dark */
--card: 222.2 84% 4.9%;
--popover: 222.2 84% 4.9%;
```

#### Primary (blijft hetzelfde)
```css
--primary: 168 48% 46%;
--primary-foreground: 0 0% 100%;
```

#### Secondary
```css
/* Light */
--secondary: 210 40% 96.1%;
--secondary-foreground: 222.2 47.4% 11.2%;

/* Dark */
--secondary: 217.2 32.6% 17.5%;
--secondary-foreground: 210 40% 98%;
```

#### Muted
```css
/* Light */
--muted: 210 40% 96.1%;
--muted-foreground: 215.4 16.3% 46.9%;

/* Dark */
--muted: 217.2 32.6% 17.5%;
--muted-foreground: 215 20.2% 65.1%;
```

#### Destructive
```css
/* Light */
--destructive: 0 84.2% 60.2%;
--destructive-foreground: 210 40% 98%;

/* Dark */
--destructive: 0 62.8% 30.6%;
--destructive-foreground: 210 40% 98%;
```

#### Borders
```css
/* Light */
--border: 214.3 31.8% 91.4%;
--input: 214.3 31.8% 91.4%;

/* Dark */
--border: 217.2 32.6% 17.5%;
--input: 217.2 32.6% 17.5%;
```

### Dark Mode Usage

```tsx
/* Background dat automatisch omkeert */
<div className="bg-background text-foreground">
  Content
</div>

/* Card in dark mode */
<Card className="bg-card text-card-foreground">
  Card content
</Card>

/* Custom dark mode styling */
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
  Content
</div>
```

---

## Best Practices

### 1. Class Merging met `cn()`

Gebruik altijd de `cn()` utility voor het samenvoegen van classNames:

```tsx
import { cn } from "@/lib/utils"

// ✅ Correct
<Button className={cn("w-full", isActive && "bg-primary")} />

// ❌ Incorrect
<Button className={`w-full ${isActive ? "bg-primary" : ""}`} />
```

### 2. Gebruik Semantic Color Tokens

```tsx
// ✅ Correct - Semantische tokens
<div className="bg-primary text-primary-foreground">
<div className="text-muted-foreground">

// ❌ Incorrect - Hardcoded colors
<div className="bg-teal-500 text-white">
<div className="text-gray-500">
```

### 3. Component Variants met CVA

```tsx
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input hover:bg-accent",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

### 4. Consistent Spacing

```tsx
// ✅ Gebruik space-y voor verticale spacing
<div className="space-y-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// ✅ Gebruik gap voor flex/grid spacing
<div className="flex gap-2">
  <span>Item 1</span>
  <span>Item 2</span>
</div>
```

### 5. Focus States

Zorg altijd voor toegankelijke focus states:

```tsx
// ✅ Correct
<button className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
  Click me
</button>
```

### 6. Responsive Design

```tsx
// Mobile-first approach
<div className="flex-col md:flex-row">
  {/* Vertical op mobile, horizontal op desktop */}
</div>

<div className="text-sm md:text-base lg:text-lg">
  {/* Responsive font sizes */}
</div>
```

### 7. Disabled States

```tsx
<Button disabled className="disabled:opacity-50 disabled:pointer-events-none">
  Disabled Button
</Button>

<Input disabled className="disabled:cursor-not-allowed disabled:opacity-50" />
```

### 8. Hover States

```tsx
// ✅ Subtiele hover effecten
<Card className="transition-colors hover:bg-accent/50">

// ✅ Transform hover
<button className="transition-transform hover:scale-105">
```

### 9. Loading States

```tsx
// Skeleton tijdens laden
{isLoading ? (
  <Skeleton className="h-4 w-[250px]" />
) : (
  <div>{content}</div>
)}

// Button met loading state
<Button disabled={isLoading}>
  {isLoading ? "Loading..." : "Submit"}
</Button>
```

### 10. Accessibility

```tsx
// ✅ Labels voor inputs
<Label htmlFor="email">Email</Label>
<Input id="email" type="email" />

// ✅ ARIA attributes
<Button aria-label="Close dialog" onClick={onClose}>
  <X className="h-4 w-4" />
</Button>

// ✅ Alt text voor images
<img src={src} alt="Description of image" />
```

### 11. Custom Step Card Pattern

Voor campaign builder stappen:

```tsx
<Card className="relative cursor-pointer transition-all hover:bg-step-hover-background border-step-border data-[active=true]:border-step-active-border data-[active=true]:bg-step-active-background">
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
        {stepNumber}
      </div>
      {title}
    </CardTitle>
  </CardHeader>
</Card>
```

### 12. Modal/Dialog Patterns

```tsx
// Multi-step modal met footer
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle>Step {currentStep} of {totalSteps}</DialogTitle>
    </DialogHeader>

    {/* Content */}

    <DialogFooter className="flex justify-between">
      <Button variant="outline" onClick={handleBack}>
        Back
      </Button>
      <Button onClick={handleNext}>
        Next
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### 13. Form Patterns

```tsx
<form onSubmit={handleSubmit} className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="name">Name</Label>
    <Input id="name" placeholder="Enter name..." />
  </div>

  <div className="space-y-2">
    <Label htmlFor="description">Description</Label>
    <Textarea id="description" placeholder="Enter description..." />
  </div>

  <div className="flex justify-end gap-2">
    <Button type="button" variant="outline">Cancel</Button>
    <Button type="submit">Submit</Button>
  </div>
</form>
```

### 14. Error Handling

```tsx
// Input met error state
<div className="space-y-2">
  <Label htmlFor="email" className={error ? "text-destructive" : ""}>
    Email
  </Label>
  <Input
    id="email"
    className={error ? "border-destructive" : ""}
  />
  {error && (
    <p className="text-sm text-destructive">{error}</p>
  )}
</div>
```

---

## Component Library Overzicht

Dit project bevat 40+ UI componenten:

### Layout & Structure
- Card (met Header, Title, Description, Content, Footer)
- Separator
- ScrollArea
- Sidebar (met Navigation, Header, Footer)

### Forms & Inputs
- Input
- Textarea
- Label
- Checkbox
- Radio Group
- Switch (Toggle)
- Select
- Combobox
- Date Picker (Calendar)
- Slider

### Buttons & Actions
- Button (6 variants)
- Toggle
- Toggle Group

### Feedback & Status
- Alert
- Badge (4 variants)
- Progress
- Toast
- Skeleton
- Spinner (via Loader2 icon)

### Navigation
- Tabs
- Breadcrumb
- Pagination
- Dropdown Menu
- Context Menu
- Navigation Menu

### Overlays & Modals
- Dialog (Modal)
- Sheet (Slide-out panel)
- Popover
- Tooltip
- Alert Dialog
- Hover Card

### Data Display
- Table
- Avatar
- Accordion
- Collapsible
- Aspect Ratio

### Custom Components
- Step Card (Campaign builder)
- Create Campaign Modal (Multi-step)

---

## Iconografie

Het project gebruikt **Lucide React** voor icons:

```tsx
import {
  Plus,
  Trash,
  Edit,
  Search,
  ChevronDown,
  X,
  Check,
  AlertCircle,
  Info
} from "lucide-react"

// Gebruik in buttons
<Button>
  <Plus className="h-4 w-4 mr-2" />
  Add Item
</Button>

// Icon-only button
<Button size="icon" variant="ghost">
  <Search className="h-4 w-4" />
</Button>
```

### Standaard Icon Sizes
```tsx
className="h-4 w-4"   /* 16px - Standaard voor buttons */
className="h-5 w-5"   /* 20px - Iets groter */
className="h-6 w-6"   /* 24px - Grote icons */
```

---

## Tailwind Config Highlights

```typescript
// tailwind.config.ts
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        // Semantic colors via CSS variables
      },
      keyframes: {
        "accordion-down": { /* ... */ },
        "accordion-up": { /* ... */ },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

---

## File Structure

```
src/
├── components/
│   ├── ui/                    # Alle basis UI componenten
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── layout/                # Layout componenten
│   └── features/              # Feature-specifieke componenten
├── lib/
│   └── utils.ts              # cn() utility
├── hooks/
│   └── use-toast.ts          # Toast hook
└── index.css                 # Global styles + CSS variables
```

---

## Dependencies

```json
{
  "@radix-ui/react-*": "Latest",  // UI primitives
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.3.0",
  "tailwindcss-animate": "^1.0.7",
  "lucide-react": "^0.390.0"
}
```

---

## Quick Start Checklist

Bij het starten van een nieuw project met deze style guide:

1. ✅ Installeer dependencies (Tailwind, Radix UI, CVA, etc.)
2. ✅ Kopieer `tailwind.config.ts`
3. ✅ Kopieer `src/index.css` met alle CSS variabelen
4. ✅ Kopieer `src/lib/utils.ts` voor de `cn()` utility
5. ✅ Kopieer alle UI componenten uit `src/components/ui/`
6. ✅ Installeer Lucide React voor icons
7. ✅ Implementeer dark mode toggling (indien gewenst)

---

## Veelvoorkomende Patronen

### Page Layout
```tsx
function Page() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Page Title</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map(item => (
          <Card key={item.id}>
            {/* Card content */}
          </Card>
        ))}
      </div>
    </div>
  )
}
```

### Form met Validatie
```tsx
function FormExample() {
  const [errors, setErrors] = useState({})

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className={errors.email ? "text-destructive" : ""}>
          Email *
        </Label>
        <Input
          id="email"
          type="email"
          className={errors.email ? "border-destructive" : ""}
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email}</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  )
}
```

### Data Table met Actions
```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map(row => (
      <TableRow key={row.id}>
        <TableCell className="font-medium">{row.name}</TableCell>
        <TableCell>
          <Badge variant={row.status === 'active' ? 'default' : 'secondary'}>
            {row.status}
          </Badge>
        </TableCell>
        <TableCell className="text-right">
          <div className="flex justify-end gap-2">
            <Button size="sm" variant="ghost">
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

---

## Conclusie

Deze style guide bevat alle styling patterns, componenten, en best practices die gebruikt worden in het LinkedIn Sequence Builder project.

**Key Takeaways:**
- 🎨 Consistente, semantische kleuren via CSS variabelen
- 🧩 40+ herbruikbare UI componenten
- ♿ Toegankelijkheid ingebouwd (focus states, ARIA)
- 🌙 Dark mode support out-of-the-box
- ⚡ Performance-optimized met Tailwind CSS
- 🔧 Flexible met CVA voor component variants

Voor vragen of toevoegingen, zie de bronbestanden in dit project.
