import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ConditionalBranchProps {
  onAddToYes: () => void;
  onAddToNo: () => void;
  yesStepsCount: number;
  noStepsCount: number;
}

export const ConditionalBranch = ({ 
  onAddToYes, 
  onAddToNo,
  yesStepsCount,
  noStepsCount 
}: ConditionalBranchProps) => {
  return (
    <div className="relative w-full">
      {/* Branch split visualization */}
      <div className="flex items-start justify-center gap-8 py-2">
        {/* Yes branch */}
        <div className="flex flex-col items-center flex-1">
          <div className="relative w-full">
            {/* Connecting line from center */}
            <div className="absolute left-1/2 top-0 w-0.5 h-4 bg-border -translate-x-1/2" />
            
            {/* Curved line to yes */}
            <svg 
              className="absolute left-1/2 top-4 w-32 h-8 -translate-x-full" 
              viewBox="0 0 128 32" 
              fill="none"
            >
              <path 
                d="M 128 0 Q 64 0, 0 32" 
                stroke="hsl(var(--border))" 
                strokeWidth="2" 
                fill="none"
              />
            </svg>
            
            <div className="pt-12 flex flex-col items-center">
              <span className="text-xs font-medium text-success mb-2">Yes</span>
              <div className="w-0.5 h-4 bg-border" />
              <Button
                onClick={onAddToYes}
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full border-2 border-dashed border-primary/50 hover:border-primary hover:bg-primary/5 transition-colors my-1"
              >
                <Plus className="h-3.5 w-3.5 text-primary" />
              </Button>
              {yesStepsCount > 0 && (
                <div className="w-0.5 bg-border" style={{ height: `${yesStepsCount * 120}px` }} />
              )}
            </div>
          </div>
        </div>

        {/* No branch */}
        <div className="flex flex-col items-center flex-1">
          <div className="relative w-full">
            {/* Connecting line from center */}
            <div className="absolute left-1/2 top-0 w-0.5 h-4 bg-border -translate-x-1/2" />
            
            {/* Curved line to no */}
            <svg 
              className="absolute left-1/2 top-4 w-32 h-8" 
              viewBox="0 0 128 32" 
              fill="none"
            >
              <path 
                d="M 0 0 Q 64 0, 128 32" 
                stroke="hsl(var(--border))" 
                strokeWidth="2" 
                fill="none"
              />
            </svg>
            
            <div className="pt-12 flex flex-col items-center">
              <span className="text-xs font-medium text-destructive mb-2">No</span>
              <div className="w-0.5 h-4 bg-border" />
              <Button
                onClick={onAddToNo}
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full border-2 border-dashed border-primary/50 hover:border-primary hover:bg-primary/5 transition-colors my-1"
              >
                <Plus className="h-3.5 w-3.5 text-primary" />
              </Button>
              {noStepsCount > 0 && (
                <div className="w-0.5 bg-border" style={{ height: `${noStepsCount * 120}px` }} />
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Merge point */}
      {(yesStepsCount > 0 || noStepsCount > 0) && (
        <div className="flex justify-center mt-2">
          <div className="relative w-64">
            {/* Curved lines merging */}
            <svg 
              className="absolute left-0 top-0 w-32 h-8" 
              viewBox="0 0 128 32" 
              fill="none"
            >
              <path 
                d="M 0 0 Q 64 32, 128 32" 
                stroke="hsl(var(--border))" 
                strokeWidth="2" 
                fill="none"
              />
            </svg>
            <svg 
              className="absolute right-0 top-0 w-32 h-8" 
              viewBox="0 0 128 32" 
              fill="none"
            >
              <path 
                d="M 128 0 Q 64 32, 0 32" 
                stroke="hsl(var(--border))" 
                strokeWidth="2" 
                fill="none"
              />
            </svg>
            <div className="absolute left-1/2 top-8 w-0.5 h-8 bg-border -translate-x-1/2" />
          </div>
        </div>
      )}
    </div>
  );
};
