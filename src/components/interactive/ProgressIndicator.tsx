'use client';

import React, { useMemo } from 'react';

interface ProgressIndicatorProps {
  current: number;
  total: number;
  label?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  current,
  total,
  label = 'Question',
}) => {
  const percentage = useMemo(() => {
    return Math.round((current / total) * 100);
  }, [current, total]);

  return (
    <div className="w-full space-y-3">
      {/* Label and percentage */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-300">
          {label} {current} of {total}
        </span>
        <span className="text-sm font-semibold text-violet-300">
          {percentage}% complete
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;
