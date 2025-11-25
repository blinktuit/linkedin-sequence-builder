import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Variant 1: Current design (baseline)
const Variant1Card = ({ isActive }: { isActive: boolean }) => (
  <div className={`relative bg-card border rounded-lg p-3 transition-all cursor-pointer hover:shadow-md ${isActive ? "border-primary shadow-md ring-2 ring-primary/20" : "border-border"}`}>
    <div className="flex items-center justify-between mb-2">
      <button className="text-[10px] font-medium uppercase tracking-wide">
        <span className="text-muted-foreground">Wait </span>
        <span className="text-primary">1 day</span>
      </button>
      <div className="flex items-center gap-1">
        <div className="h-6 w-6 rounded hover:bg-destructive/10 flex items-center justify-center">
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
          </svg>
        </div>
      </div>
    </div>
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <div className="text-primary flex-shrink-0">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        <div className="font-semibold text-sm">Chat message</div>
      </div>
      <div className="h-6 w-6 rounded hover:bg-muted/50 flex items-center justify-center">
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="6" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="12" cy="18" r="1.5" />
        </svg>
      </div>
    </div>
  </div>
);

// Variant 2: More compact with left accent
const Variant2Card = ({ isActive }: { isActive: boolean }) => (
  <div className={`relative bg-card border rounded-lg overflow-hidden transition-all cursor-pointer hover:shadow-md ${isActive ? "border-primary shadow-md" : "border-border"}`}>
    <div className="flex">
      <div className={`w-1 ${isActive ? 'bg-primary' : 'bg-border'}`} />
      <div className="flex-1 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <div>
              <div className="font-medium text-sm">Chat message</div>
              <div className="text-xs text-muted-foreground">After 1 day</div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-7 w-7 rounded-md hover:bg-muted flex items-center justify-center">
              <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="6" r="1.5" />
                <circle cx="12" cy="12" r="1.5" />
                <circle cx="12" cy="18" r="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Variant 3: Pill-based delay badge
const Variant3Card = ({ isActive }: { isActive: boolean }) => (
  <div className={`relative bg-card border rounded-xl p-4 transition-all cursor-pointer hover:shadow-lg ${isActive ? "border-primary shadow-lg ring-1 ring-primary/10" : "border-border"}`}>
    <div className="flex items-start gap-3">
      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-sm">Chat message</div>
          <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-muted text-[10px] font-medium text-muted-foreground">
            <svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            1 day
          </div>
        </div>
        <div className="text-xs text-muted-foreground mt-0.5">Send on LinkedIn</div>
      </div>
    </div>
    <div className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity">
      <div className="h-6 w-6 rounded hover:bg-destructive/10 flex items-center justify-center text-muted-foreground hover:text-destructive">
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
        </svg>
      </div>
    </div>
  </div>
);

// Variant 4: Minimal flat design
const Variant4Card = ({ isActive }: { isActive: boolean }) => (
  <div className={`relative bg-card rounded-lg p-4 transition-all cursor-pointer ${isActive ? "bg-primary/5 ring-1 ring-primary" : "hover:bg-muted/50"}`}>
    <div className="flex items-center gap-4">
      <div className="text-primary">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      <div className="flex-1">
        <div className="font-medium text-sm">Chat message</div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground">+1d</span>
        <div className="h-1 w-1 rounded-full bg-muted-foreground/30" />
        <svg className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="6" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="12" cy="18" r="1.5" />
        </svg>
      </div>
    </div>
  </div>
);

// Variant 5: Card with subtle shadow and hover effect
const Variant5Card = ({ isActive }: { isActive: boolean }) => (
  <div className={`relative bg-card border rounded-lg transition-all cursor-pointer group ${isActive ? "border-primary shadow-[0_0_0_1px] shadow-primary/20" : "border-border/50 hover:border-border hover:shadow-md"}`}>
    <div className="absolute -top-2.5 left-4">
      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-background border border-border text-[10px] font-medium text-muted-foreground shadow-sm">
        <svg className="h-3 w-3 mr-1 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
        Wait 1 day
      </span>
    </div>
    <div className="p-4 pt-5">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg border border-border bg-muted/30 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        <div className="flex-1">
          <div className="font-medium text-sm">Chat message</div>
          <div className="text-xs text-muted-foreground">Send on LinkedIn</div>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="h-7 w-7 rounded-md hover:bg-muted flex items-center justify-center">
            <svg className="h-3.5 w-3.5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
          </button>
          <button className="h-7 w-7 rounded-md hover:bg-destructive/10 flex items-center justify-center">
            <svg className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Config Panel Variants
const ConfigPanel1 = () => (
  <div className="w-full border-l border-border bg-card p-6 space-y-6">
    <div className="flex items-center gap-2 mb-4">
      <div className="text-primary">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      <div>
        <div className="font-medium">Chat message</div>
        <div className="text-xs text-muted-foreground">Send on LinkedIn</div>
      </div>
    </div>
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium">Message</label>
        <button className="text-primary text-sm flex items-center gap-1">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3v18M3 12h18" />
          </svg>
          AI
        </button>
      </div>
      <div className="relative">
        <textarea className="w-full min-h-[200px] p-3 border rounded-lg resize-none text-sm" placeholder="What message do you want to send?" />
        <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">0/8000</div>
      </div>
    </div>
    <div className="flex gap-2">
      <button className="text-sm text-muted-foreground hover:text-foreground">+ First name</button>
      <button className="text-sm text-muted-foreground hover:text-foreground">+ Company name</button>
      <button className="text-sm px-3 py-1 border rounded-md">More...</button>
      <button className="text-sm px-3 py-1 border rounded-md">Templates</button>
    </div>
  </div>
);

const ConfigPanel2 = () => (
  <div className="w-full border-l border-border bg-muted/30 p-6 space-y-6">
    <div className="bg-card rounded-xl p-4 border shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        <div>
          <div className="font-semibold">Chat message</div>
          <div className="text-xs text-muted-foreground">Send on LinkedIn</div>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Message</label>
            <button className="h-8 px-3 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 text-primary text-sm flex items-center gap-1.5 hover:from-primary/20 hover:to-primary/10 transition-colors">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3v18M3 12h18" />
              </svg>
              Generate with AI
            </button>
          </div>
          <div className="relative bg-background rounded-xl border">
            <textarea className="w-full min-h-[180px] p-4 resize-none text-sm bg-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="What message do you want to send?" />
            <div className="absolute bottom-3 right-3 text-xs text-muted-foreground bg-background/80 px-2 py-0.5 rounded">0/8000</div>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button className="h-8 px-3 rounded-full bg-muted text-sm hover:bg-muted/80 transition-colors">+ First name</button>
          <button className="h-8 px-3 rounded-full bg-muted text-sm hover:bg-muted/80 transition-colors">+ Company</button>
          <button className="h-8 px-3 rounded-full border text-sm hover:bg-muted transition-colors">More...</button>
          <button className="h-8 px-3 rounded-full border text-sm hover:bg-muted transition-colors">Templates</button>
        </div>
      </div>
    </div>
  </div>
);

const ConfigPanel3 = () => (
  <div className="w-full border-l border-border bg-card p-6 space-y-6">
    <div className="flex items-center justify-between pb-4 border-b">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2.5" />
          </svg>
        </div>
        <div>
          <div className="font-semibold text-sm">Chat message</div>
          <div className="text-[11px] text-muted-foreground uppercase tracking-wide">LinkedIn</div>
        </div>
      </div>
      <button className="h-8 w-8 rounded-lg hover:bg-muted flex items-center justify-center">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">Compose your message</span>
        <div className="flex-1 h-px bg-border" />
        <button className="text-primary flex items-center gap-1 text-xs font-medium">
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3v18M3 12h18" />
          </svg>
          AI Assist
        </button>
      </div>
      <div className="relative">
        <textarea className="w-full min-h-[220px] p-4 border-2 border-dashed rounded-xl resize-none text-sm focus:border-primary focus:border-solid transition-colors" placeholder="What message do you want to send?" />
        <div className="absolute bottom-3 left-4 flex gap-2">
          <button className="h-7 w-7 rounded-md bg-muted hover:bg-muted/80 flex items-center justify-center">
            <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </button>
        </div>
        <div className="absolute bottom-3 right-4 text-xs text-muted-foreground">0/8000</div>
      </div>
      <div className="flex gap-2">
        <button className="flex-1 h-9 rounded-lg border text-sm hover:bg-muted transition-colors">+ First name</button>
        <button className="flex-1 h-9 rounded-lg border text-sm hover:bg-muted transition-colors">+ Company</button>
        <button className="h-9 w-9 rounded-lg border hover:bg-muted transition-colors flex items-center justify-center">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="6" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="18" r="1.5" />
          </svg>
        </button>
      </div>
    </div>
  </div>
);

const ConfigPanel4 = () => (
  <div className="w-full bg-background p-6 space-y-6">
    <div className="space-y-4">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" />
        </svg>
        Chat message
      </div>
      <div>
        <div className="relative">
          <textarea className="w-full min-h-[240px] p-4 bg-muted/50 rounded-2xl resize-none text-sm focus:bg-muted focus:outline-none transition-colors" placeholder="Type your message here..." />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="flex gap-1">
              <button className="h-8 w-8 rounded-full bg-background shadow-sm hover:shadow flex items-center justify-center transition-shadow">
                <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </button>
              <button className="h-8 w-8 rounded-full bg-background shadow-sm hover:shadow flex items-center justify-center transition-shadow">
                <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3v18M3 12h18" />
                </svg>
              </button>
            </div>
            <span className="text-xs text-muted-foreground">0/8000</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        <button className="px-4 py-2 rounded-xl bg-muted/50 text-sm hover:bg-muted transition-colors">First name</button>
        <button className="px-4 py-2 rounded-xl bg-muted/50 text-sm hover:bg-muted transition-colors">Company</button>
        <button className="px-4 py-2 rounded-xl bg-muted/50 text-sm hover:bg-muted transition-colors">Icebreaker</button>
        <button className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm">AI Generate</button>
      </div>
    </div>
  </div>
);

const ConfigPanel5 = () => (
  <div className="w-full border-l bg-gradient-to-b from-muted/30 to-background p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/25">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-background" />
        </div>
        <div>
          <div className="font-semibold">Chat message</div>
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Active step
          </div>
        </div>
      </div>
    </div>
    <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
      <div className="p-4 border-b bg-muted/30">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Message</span>
          <div className="flex items-center gap-2">
            <button className="h-7 px-2.5 rounded-md bg-gradient-to-r from-violet-500 to-purple-500 text-white text-xs font-medium flex items-center gap-1 shadow-sm">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3v18M3 12h18" />
              </svg>
              AI
            </button>
            <button className="h-7 w-7 rounded-md hover:bg-muted flex items-center justify-center">
              <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <textarea className="w-full min-h-[180px] resize-none text-sm focus:outline-none" placeholder="What message do you want to send?" />
      </div>
      <div className="p-4 border-t bg-muted/30 flex items-center justify-between">
        <div className="flex gap-1.5">
          <button className="h-8 px-3 rounded-lg bg-background border text-xs hover:bg-muted transition-colors">{{firstName}}</button>
          <button className="h-8 px-3 rounded-lg bg-background border text-xs hover:bg-muted transition-colors">{{company}}</button>
          <button className="h-8 w-8 rounded-lg bg-background border hover:bg-muted transition-colors flex items-center justify-center">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </div>
        <span className="text-xs text-muted-foreground">0/8000</span>
      </div>
    </div>
  </div>
);

const variants = [
  { id: 1, name: "Huidige stijl", description: "Compacte kaart met delay bovenaan", Card: Variant1Card, Panel: ConfigPanel1 },
  { id: 2, name: "Links accent", description: "Verticale accent lijn met icon in container", Card: Variant2Card, Panel: ConfigPanel2 },
  { id: 3, name: "Rounded modern", description: "Grote ronde icon, pill badges", Card: Variant3Card, Panel: ConfigPanel3 },
  { id: 4, name: "Minimalistisch", description: "Vlak design zonder borders", Card: Variant4Card, Panel: ConfigPanel4 },
  { id: 5, name: "Elevated cards", description: "Floating delay badge, hover actions", Card: Variant5Card, Panel: ConfigPanel5 },
];

const DesignVariants = () => {
  const [currentVariant, setCurrentVariant] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
  const navigate = useNavigate();

  const nextVariant = () => {
    setCurrentVariant((prev) => (prev + 1) % variants.length);
  };

  const prevVariant = () => {
    setCurrentVariant((prev) => (prev - 1 + variants.length) % variants.length);
  };

  const CurrentCard = variants[currentVariant].Card;
  const CurrentPanel = variants[currentVariant].Panel;

  const handleSelect = () => {
    setSelectedVariant(currentVariant);
    // Could navigate back or save preference
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b bg-card px-6 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div>
            <h1 className="text-xl font-semibold">Design Varianten</h1>
            <p className="text-sm text-muted-foreground">Kies een stijl voor de sequence builder kaartjes en configuratie panel</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Annuleren
            </Button>
            <Button onClick={handleSelect} disabled={selectedVariant === currentVariant}>
              <Check className="h-4 w-4 mr-2" />
              Kies variant {currentVariant + 1}
            </Button>
          </div>
        </div>
      </div>

      {/* Variant Toggle */}
      <div className="border-b bg-muted/30 px-6 py-3">
        <div className="flex items-center justify-center gap-4 max-w-6xl mx-auto">
          <Button variant="ghost" size="icon" onClick={prevVariant}>
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2">
            {variants.map((variant, index) => (
              <button
                key={variant.id}
                onClick={() => setCurrentVariant(index)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  index === currentVariant
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "hover:bg-muted"
                }`}
              >
                <span className="text-sm font-medium">Variant {variant.id}</span>
                {selectedVariant === index && <Check className="h-4 w-4" />}
              </button>
            ))}
          </div>

          <Button variant="ghost" size="icon" onClick={nextVariant}>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Variant Info */}
      <div className="px-6 py-4 text-center bg-card/50">
        <h2 className="text-lg font-semibold">{variants[currentVariant].name}</h2>
        <p className="text-sm text-muted-foreground">{variants[currentVariant].description}</p>
      </div>

      {/* Preview Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Canvas area */}
        <div
          className="flex-1 relative overflow-auto p-12"
          style={{
            background: '#ffffff',
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L45 13 L45 39 L30 52 L15 39 L15 13 Z' fill='none' stroke='%23d1fae5' stroke-width='1' opacity='0.3'/%3E%3C/svg%3E"), linear-gradient(135deg, rgba(16, 185, 129, 0.03) 0%, rgba(52, 211, 153, 0.05) 100%)`,
            backgroundSize: '90px 78px, 100% 100%',
          }}
        >
          <div className="flex justify-center">
            <div className="w-full max-w-[360px] space-y-4">
              {/* Start */}
              <div className="bg-card border rounded-lg p-3 text-center text-xs text-muted-foreground">
                Start campaign
              </div>

              {/* Connector */}
              <div className="flex flex-col items-center">
                <div className="h-4 w-0.5 bg-border" />
                <div className="h-7 w-7 rounded-full border-2 border-dashed border-primary/50 flex items-center justify-center">
                  <svg className="h-3.5 w-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </div>
              </div>

              {/* Visit profile card */}
              <CurrentCard isActive={false} />

              {/* Connector */}
              <div className="flex flex-col items-center">
                <div className="h-4 w-0.5 bg-border" />
                <div className="h-7 w-7 rounded-full border-2 border-dashed border-primary/50 flex items-center justify-center">
                  <svg className="h-3.5 w-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </div>
              </div>

              {/* Active card */}
              <CurrentCard isActive={true} />

              {/* Connector */}
              <div className="flex flex-col items-center">
                <div className="h-4 w-0.5 bg-border" />
                <div className="h-7 w-7 rounded-full border-2 border-dashed border-primary/50 flex items-center justify-center">
                  <svg className="h-3.5 w-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Config Panel Preview */}
        <div className="w-[480px] border-l">
          <CurrentPanel />
        </div>
      </div>
    </div>
  );
};

export default DesignVariants;
