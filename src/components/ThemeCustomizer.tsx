import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Palette, RotateCcw } from "lucide-react";

interface ColorConfig {
  primary: string;
  secondary: string;
  destructive: string;
  background: string;
  foreground: string;
  muted: string;
  card: string;
  border: string;
}

const defaultColors: ColorConfig = {
  primary: "#36b39a",
  secondary: "#d1f5f0",
  destructive: "#f49854",
  background: "#f9faf9",
  foreground: "#1e293b",
  muted: "#e4e7eb",
  card: "#ffffff",
  border: "#e4e7eb",
};

// Convert hex to HSL
function hexToHSL(hex: string): { h: number; s: number; l: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { h: 0, s: 0, l: 0 };

  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

// Convert HSL to hex
function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }

  const toHex = (n: number) => {
    const hex = Math.round((n + m) * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Get CSS variable value as HSL string
function getHSLString(h: number, s: number, l: number): string {
  return `${h} ${s}% ${l}%`;
}

// Parse HSL CSS variable to hex
function hslCssToHex(hslString: string): string {
  const parts = hslString.trim().split(/\s+/);
  if (parts.length < 3) return "#000000";
  const h = parseFloat(parts[0]);
  const s = parseFloat(parts[1].replace("%", ""));
  const l = parseFloat(parts[2].replace("%", ""));
  return hslToHex(h, s, l);
}

const STORAGE_KEY = "whitelabel-theme-colors";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Label className="text-sm font-medium min-w-[100px]">{label}</Label>
      <div className="flex items-center gap-2">
        <label
          className="w-8 h-8 rounded-md border border-border shadow-sm cursor-pointer overflow-hidden relative"
          style={{ backgroundColor: value }}
        >
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </label>
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-24 h-8 text-xs font-mono"
        />
      </div>
    </div>
  );
}

export function ThemeCustomizer() {
  const [open, setOpen] = useState(false);
  const [colors, setColors] = useState<ColorConfig>(defaultColors);

  // Load saved colors on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const savedColors = JSON.parse(saved);
        setColors(savedColors);
        applyColors(savedColors);
      } catch (e) {
        console.error("Failed to parse saved theme colors");
      }
    }
  }, []);

  const applyColors = (colorConfig: ColorConfig) => {
    const root = document.documentElement;

    // Primary
    const primaryHSL = hexToHSL(colorConfig.primary);
    root.style.setProperty("--primary", getHSLString(primaryHSL.h, primaryHSL.s, primaryHSL.l));
    root.style.setProperty("--ring", getHSLString(primaryHSL.h, primaryHSL.s, primaryHSL.l));
    root.style.setProperty("--success", getHSLString(primaryHSL.h, primaryHSL.s, primaryHSL.l));

    // Secondary
    const secondaryHSL = hexToHSL(colorConfig.secondary);
    root.style.setProperty("--secondary", getHSLString(secondaryHSL.h, secondaryHSL.s, secondaryHSL.l));
    root.style.setProperty("--secondary-foreground", getHSLString(secondaryHSL.h, secondaryHSL.s, 30));

    // Destructive/Warning
    const destructiveHSL = hexToHSL(colorConfig.destructive);
    root.style.setProperty("--destructive", getHSLString(destructiveHSL.h, destructiveHSL.s, destructiveHSL.l));

    // Background
    const backgroundHSL = hexToHSL(colorConfig.background);
    root.style.setProperty("--background", getHSLString(backgroundHSL.h, backgroundHSL.s, backgroundHSL.l));
    root.style.setProperty("--canvas-bg", getHSLString(backgroundHSL.h, backgroundHSL.s, backgroundHSL.l));
    root.style.setProperty("--sidebar-background", getHSLString(backgroundHSL.h, backgroundHSL.s, backgroundHSL.l));

    // Foreground
    const foregroundHSL = hexToHSL(colorConfig.foreground);
    root.style.setProperty("--foreground", getHSLString(foregroundHSL.h, foregroundHSL.s, foregroundHSL.l));
    root.style.setProperty("--card-foreground", getHSLString(foregroundHSL.h, foregroundHSL.s, foregroundHSL.l));
    root.style.setProperty("--popover-foreground", getHSLString(foregroundHSL.h, foregroundHSL.s, foregroundHSL.l));

    // Muted
    const mutedHSL = hexToHSL(colorConfig.muted);
    root.style.setProperty("--muted", getHSLString(mutedHSL.h, mutedHSL.s, mutedHSL.l));
    root.style.setProperty("--muted-foreground", getHSLString(mutedHSL.h, mutedHSL.s, 46));
    root.style.setProperty("--accent", getHSLString(mutedHSL.h, mutedHSL.s, 96));

    // Card
    const cardHSL = hexToHSL(colorConfig.card);
    root.style.setProperty("--card", getHSLString(cardHSL.h, cardHSL.s, cardHSL.l));
    root.style.setProperty("--popover", getHSLString(cardHSL.h, cardHSL.s, cardHSL.l));
    root.style.setProperty("--step-card", getHSLString(cardHSL.h, cardHSL.s, cardHSL.l));

    // Border
    const borderHSL = hexToHSL(colorConfig.border);
    root.style.setProperty("--border", getHSLString(borderHSL.h, borderHSL.s, borderHSL.l));
    root.style.setProperty("--input", getHSLString(borderHSL.h, borderHSL.s, borderHSL.l));
    root.style.setProperty("--step-border", getHSLString(borderHSL.h, borderHSL.s, borderHSL.l));
    root.style.setProperty("--sidebar-border", getHSLString(borderHSL.h, borderHSL.s, borderHSL.l));

    // Hexagon background pattern - encode the primary color in the SVG
    const hexagonColor = colorConfig.primary.replace("#", "%23");
    const hexagonSvg = `url("data:image/svg+xml,%3Csvg width='60' height='52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L45 13 L45 39 L30 52 L15 39 L15 13 Z' fill='none' stroke='${hexagonColor}' stroke-width='1' opacity='0.08'/%3E%3C/svg%3E")`;
    root.style.setProperty("--hexagon-svg", hexagonSvg);
  };

  const handleColorChange = (key: keyof ColorConfig, value: string) => {
    const newColors = { ...colors, [key]: value };
    setColors(newColors);
    applyColors(newColors);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newColors));
  };

  const resetColors = () => {
    setColors(defaultColors);
    applyColors(defaultColors);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Palette className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Theme Customizer
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <ColorPicker
            label="Primary"
            value={colors.primary}
            onChange={(v) => handleColorChange("primary", v)}
          />
          <ColorPicker
            label="Secondary"
            value={colors.secondary}
            onChange={(v) => handleColorChange("secondary", v)}
          />
          <ColorPicker
            label="Destructive"
            value={colors.destructive}
            onChange={(v) => handleColorChange("destructive", v)}
          />
          <ColorPicker
            label="Background"
            value={colors.background}
            onChange={(v) => handleColorChange("background", v)}
          />
          <ColorPicker
            label="Foreground"
            value={colors.foreground}
            onChange={(v) => handleColorChange("foreground", v)}
          />
          <ColorPicker
            label="Muted"
            value={colors.muted}
            onChange={(v) => handleColorChange("muted", v)}
          />
          <ColorPicker
            label="Card"
            value={colors.card}
            onChange={(v) => handleColorChange("card", v)}
          />
          <ColorPicker
            label="Border"
            value={colors.border}
            onChange={(v) => handleColorChange("border", v)}
          />
        </div>
        <div className="flex justify-end">
          <Button variant="outline" onClick={resetColors} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Reset to defaults
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
