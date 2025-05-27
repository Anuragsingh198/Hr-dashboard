'use client';

import { useState } from 'react';
import { Check, ChevronDown, Filter } from 'lucide-react';
import { cn, departments } from '@/lib/utils';

export default function FilterDropdown({
  selectedDepartments,
  selectedRatings,
  onDepartmentChange,
  onRatingChange,
  onClearAll,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDepartment = (dept) => {
    if (!selectedDepartments) {
      onDepartmentChange([dept]);
      return;
    }

    if (selectedDepartments.includes(dept)) {
      const newDepts = selectedDepartments.filter((d) => d !== dept);
      onDepartmentChange(newDepts.length > 0 ? newDepts : null);
    } else {
      onDepartmentChange([...selectedDepartments, dept]);
    }
  };

const toggleRating = (rating) => {
    if (!selectedRatings) {
      onRatingChange([rating]);
      return;
    }

    if (selectedRatings.includes(rating)) {
      const newRatings = selectedRatings.filter((r) => r !== rating);
      onRatingChange(newRatings.length > 0 ? newRatings : null);
    } else {
      onRatingChange([...selectedRatings, rating]);
    }
  };

  const hasActiveFilters = Boolean(selectedDepartments || selectedRatings);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors",
          hasActiveFilters
            ? "border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30"
            : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
        )}
      >
        <Filter className={cn("h-4 w-4 mr-2", hasActiveFilters ? "text-blue-500" : "text-gray-400")} />
        Filters
        <ChevronDown className="h-4 w-4 ml-2" />
        {hasActiveFilters && (
          <span className="ml-1.5 inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-800 text-xs font-semibold text-blue-800 dark:text-blue-200">
            {(selectedDepartments?.length || 0) + (selectedRatings?.length || 0)}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 dark:divide-gray-700 z-10">
          {/* Departments */}
          <div className="py-3 px-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Department</h3>
            <div className="space-y-2 mt-1">
              {departments.map((dept) => (
                <div 
                  key={dept}
                  onClick={() => toggleDepartment(dept)}
                  className="flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-1.5 rounded-md"
                >
                  <div
                    className={cn(
                      "h-4 w-4 border rounded flex items-center justify-center mr-2 transition-colors",
                      selectedDepartments?.includes(dept)
                        ? "border-blue-500 bg-blue-500 text-white"
                        : "border-gray-300 dark:border-gray-600"
                    )}
                  >
                    {selectedDepartments?.includes(dept) && <Check className="h-3 w-3" />}
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{dept}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ratings */}
          <div className="py-3 px-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Performance Rating</h3>
            <div className="space-y-2 mt-1">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div 
                  key={rating}
                  onClick={() => toggleRating(rating)}
                  className="flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-1.5 rounded-md"
                >
                  <div
                    className={cn(
                      "h-4 w-4 border rounded flex items-center justify-center mr-2 transition-colors",
                      selectedRatings?.includes(rating)
                        ? "border-blue-500 bg-blue-500 text-white"
                        : "border-gray-300 dark:border-gray-600"
                    )}
                  >
                    {selectedRatings?.includes(rating) && <Check className="h-3 w-3" />}
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{rating} Star{rating !== 1 ? 's' : ''}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="py-2 px-4 flex justify-between">
            <button 
              onClick={onClearAll}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              disabled={!hasActiveFilters}
            >
              Clear all
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
