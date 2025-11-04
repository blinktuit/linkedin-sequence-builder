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
    <div className="relative w-full flex items-start justify-center gap-4">
      {/* Left (Yes) branch */}
      <div className="flex flex-col items-end flex-1 max-w-[200px]">
        {/* Yes label */}
        <div className="text-xs font-medium text-green-600 mb-2 mr-4">Yes</div>
        
        {/* Horizontal line with rounded corner going down */}
        <div className="relative w-full h-16 flex justify-end">
          <svg width="100%" height="100%" className="absolute top-0 right-0" preserveAspectRatio="none">
            <path
              d="M 100% 0 L 80% 0 Q 70% 0, 70% 10 L 70% 100%"
              fill="none"
              stroke="hsl(142, 76%, 36%)"
              strokeWidth="2"
            />
          </svg>
        </div>
        
        {/* Add button aligned to the right */}
        <div className="flex justify-end w-full pr-[30%]">
          <Button
            onClick={onAddYesStep}
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded-full border-2 border-dashed border-green-600/50 hover:border-green-600 hover:bg-green-600/5 transition-colors"
          >
            <Plus className="h-3.5 w-3.5 text-green-600" />
          </Button>
        </div>
        
        {/* Extension line if has steps */}
        {hasYesSteps && (
          <div className="flex justify-end w-full pr-[30%]">
            <div className="h-4 w-0.5 bg-green-600/30 mt-1" />
          </div>
        )}
      </div>

      {/* Right (No) branch */}
      <div className="flex flex-col items-start flex-1 max-w-[200px]">
        {/* No label */}
        <div className="text-xs font-medium text-[#f49854] mb-2 ml-4">No</div>
        
        {/* Horizontal line with rounded corner going down */}
        <div className="relative w-full h-16">
          <svg width="100%" height="100%" className="absolute top-0 left-0" preserveAspectRatio="none">
            <path
              d="M 0% 0 L 20% 0 Q 30% 0, 30% 10 L 30% 100%"
              fill="none"
              stroke="hsl(25, 88%, 63%)"
              strokeWidth="2"
            />
          </svg>
        </div>
        
        {/* Add button aligned to the left */}
        <div className="flex justify-start w-full pl-[30%]">
          <Button
            onClick={onAddNoStep}
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded-full border-2 border-dashed border-[#f49854]/50 hover:border-[#f49854] hover:bg-[#f49854]/5 transition-colors"
          >
            <Plus className="h-3.5 w-3.5 text-[#f49854]" />
          </Button>
        </div>
        
        {/* Extension line if has steps */}
        {hasNoSteps && (
          <div className="flex justify-start w-full pl-[30%]">
            <div className="h-4 w-0.5 bg-[#f49854]/30 mt-1" />
          </div>
        )}
      </div>
    </div>
  );
};
