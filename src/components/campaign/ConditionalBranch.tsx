import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ReactNode } from "react";

interface ConditionalBranchProps {
  onAddYesStep: () => void;
  onAddNoStep: () => void;
  hasYesSteps?: boolean;
  hasNoSteps?: boolean;
  children: ReactNode;
}

export const ConditionalBranch = ({
  onAddYesStep,
  onAddNoStep,
  hasYesSteps,
  hasNoSteps,
  children,
}: ConditionalBranchProps) => {
  return (
    <div className="relative flex items-start justify-center gap-2">
      {/* Left (Yes) branch */}
      <div className="flex flex-col items-center pt-8">
        {/* Yes label */}
        <div className="text-xs font-medium text-[#36b39a] mb-1">Yes</div>

        {/* Horizontal line with rounded corner going down */}
        <svg width="100" height="60" className="overflow-visible">
          <path
            d="M 100 20 L 60 20 Q 50 20, 50 30 L 50 60"
            fill="none"
            stroke="#36b39a"
            strokeWidth="2"
          />
        </svg>

        {/* Add button */}
        <Button
          onClick={onAddYesStep}
          variant="ghost"
          size="icon"
          className="h-7 w-7 rounded-full border-2 border-dashed border-[#36b39a]/50 hover:border-[#36b39a] hover:bg-[#36b39a]/5 transition-colors"
        >
          <Plus className="h-3.5 w-3.5 text-[#36b39a]" />
        </Button>

        {/* Extension line if has steps */}
        {hasYesSteps && (
          <div className="h-4 w-0.5 bg-[#36b39a] mt-1" />
        )}
      </div>

      {/* Center card */}
      <div className="flex-shrink-0 w-[320px]">
        {children}
      </div>

      {/* Right (No) branch */}
      <div className="flex flex-col items-center pt-8">
        {/* No label */}
        <div className="text-xs font-medium text-[#f49854] mb-1">No</div>

        {/* Horizontal line with rounded corner going down */}
        <svg width="100" height="60" className="overflow-visible">
          <path
            d="M 0 20 L 40 20 Q 50 20, 50 30 L 50 60"
            fill="none"
            stroke="#f49854"
            strokeWidth="2"
          />
        </svg>

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
        {hasNoSteps && (
          <div className="h-4 w-0.5 bg-[#f49854]/30 mt-1" />
        )}
      </div>
    </div>
  );
};
