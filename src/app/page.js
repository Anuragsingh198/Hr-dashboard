'use client';

import Spinner from '@/components/ui/Spinner';
import UserCard from '@/components/UserCard';
import { useUsers } from '@/context/UserContext';
import SearchBar from '@/components/SearchBar';
import FilterDropdown from '@/components/FilterDropdown';
import useSearch from '@/hooks/useSearch';

export default function DashboardPage() {
  const { users, loading, theme } = useUsers();

  const {
    searchTerm,
    filters,
    filteredUsers,
    updateSearchTerm,
    updateFilters,
    clearFilters,
  } = useSearch(users);

  if (loading) return (
    <>
      <Spinner />
      <p>Loading users</p>
    </>
  );

  // Set container classes based on theme global variable, no dark: classes here
  const containerClasses = `mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full ${
    theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
  }`;

  return (
    <>
      <div className='flex  justify-between mt-3'>
        <div className="mb-4">
          <h1 className="text-2xl font-bold">
            User Dashboard
          </h1>
          <p className="mt-1 text-sm">
            List of all employees
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <SearchBar
            searchTerm={searchTerm}
            onChange={updateSearchTerm}
          />
          <FilterDropdown
            selectedDepartments={filters.departments}
            selectedRatings={filters.ratings}
            onDepartmentChange={(departments) => updateFilters({ departments })}
            onRatingChange={(ratings) => updateFilters({ ratings })}
            onClearAll={clearFilters}
          />
        </div>
      </div>

<div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
  {filteredUsers.length > 0 ? (
    filteredUsers.map((user) => (
      <UserCard key={user.id} user={user} />
    ))
  ) : (
    <div className="py-12 flex items-center justify-center col-span-full">
      <div className="text-center">
        <p className="text-lg font-medium">No employees found</p>
        <p className="mt-1 text-gray-500">Try adjusting your search or filters</p>
        {(searchTerm || filters.departments || filters.ratings) && (
          <button
            onClick={clearFilters}
            className="mt-4 text-sm text-blue-600 hover:text-blue-800"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  )}
</div>

    </>
  );
}
