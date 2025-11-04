import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ConditionalBranchProps {
  onAddYesStep: () => void;
  onAddNoStep: () => void;
  hasYesSteps?: boolean;
  hasNoSteps?: boolean;
}

export const ConditionalBranch = ({
  onAddYesStep,
  onAddNoStep,
  hasYesSteps,
  hasNoSteps,
}: ConditionalBranchProps) => {
  return (
    <div className="relative w-full py-2">
      {/* Starting point */}
      <div className="flex justify-center">
        <div className="h-4 w-0.5 bg-border" />
      </div>

      {/* Branch container */}
      <div className="relative flex justify-center items-start gap-8 px-4">
        {/* Left (Yes) branch */}
        <div className="flex flex-col items-center flex-1 max-w-[160px]">
          {/* Curved connector from center to left */}
          <svg width="100%" height="40" className="overflow-visible">
            <path
              d="M 50% 0 Q 50% 20, 100% 40"
              fill="none"
              stroke="hsl(142, 76%, 36%)"
              strokeWidth="1.5"
            />
          </svg>
          
          {/* Yes label */}
          <div className="text-xs font-medium text-green-600 mb-2">Yes</div>
          
          {/* Add button */}
          <Button
            onClick={onAddYesStep}
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded-full border-2 border-dashed border-green-600/50 hover:border-green-600 hover:bg-green-600/5 transition-colors"
          >
            <Plus className="h-3.5 w-3.5 text-green-600" />
          </Button>
          
          {/* Extension line if has steps */}
          {hasYesSteps && <div className="h-8 w-0.5 bg-green-600/30 mt-2" />}
        </div>

        {/* Right (No) branch */}
        <div className="flex flex-col items-center flex-1 max-w-[160px]">
          {/* Curved connector from center to right */}
          <svg width="100%" height="40" className="overflow-visible">
            <path
              d="M 50% 0 Q 50% 20, 0% 40"
              fill="none"
              stroke="hsl(25, 88%, 63%)"
              strokeWidth="1.5"
            />
          </svg>
          
          {/* No label */}
          <div className="text-xs font-medium text-[#f49854] mb-2">No</div>
          
          {/* Add button */}
          <Button
            onClick={onAddNoStep}
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded-full border-2 border-dashed border-[#f49854]/50 hover:border-[#f49854] hover:bg-[#f49854]/5 transition-colors"
          >
            <Plus className="h-3.5 w-3.5 text-[#f49854]" />
          </Button>
          
          {/* Extension line if has steps */}
          {hasNoSteps && <div className="h-8 w-0.5 bg-[#f49854]/30 mt-2" />}
        </div>
      </div>
    </div>
  );
};
