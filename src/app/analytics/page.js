"use client";

import { useUsers } from "@/context/UserContext";
import { useBookmarks } from "@/context/BookmarkContext";
import DepartmentChart from "@/components/ui/DepartmentChart";
import MonthlyTrendChart from "@/components/ui/MonthlyChart";

export default function AnalyticsPage() {
  const { users } = useUsers();
  const { bookmarks } = useBookmarks();

  const totalEmployees = users.length;
  const totalBookmarks = bookmarks.length;
const avgPerformance =
  users.length > 0
    ? users.reduce(
        (sum, user) =>
          sum +
          (typeof user.performanceRating === "number"
            ? user.performanceRating
            : Math.floor(Math.random() * 5) + 1),
        0
      ) / users.length
    : 0;

  const promotedCount = users.filter((user) => user.promoted).length;

const departmentPerformance = users.reduce((acc, user) => {
  const dept = user.company?.department;
  if (!dept) return acc;
  const rating = typeof user.performanceRating === "number"
    ? user.performanceRating
    : Math.floor(Math.random() * 5) + 1; 
  if (!acc[dept]) {
    acc[dept] = { count: 0, total: 0 };
  }

  acc[dept].count++;
  acc[dept].total += rating;

  return acc;
}, {});


  const topDepartments = Object.entries(departmentPerformance)
    .map(([dept, stats]) => ({
      department: dept,
      avgRating: stats.total / stats.count,
    }))
    .sort((a, b) => b.avgRating - a.avgRating)
    .slice(0, 3);

  const statCards = [
    {
      title: "Total Employees",
      value: totalEmployees,
      change: "+12% from last month",
      positive: true,
    },
    {
      title: "Bookmarked Employees",
      value: totalBookmarks,
      change: `${Math.round(
        (totalBookmarks / totalEmployees) * 100
      )}% of total`,
      positive: totalBookmarks > 0,
    },
    {
      title: "Average Performance",
      value: avgPerformance.toFixed(1),
      change: "+0.3 from last quarter",
      positive: true,
    },
    {
      title: "Recently Promoted",
      value: promotedCount,
      change: `${Math.round(
        (promotedCount / totalEmployees) * 100
      )}% promotion rate`,
      positive: true,
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Performance Analytics
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Track department performance and employee trends
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
          >
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {stat.title}
            </p>
            <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
              {stat.value}
            </p>
            <div
              className={`mt-2 flex items-center text-sm ${
                stat.positive
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              <span>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Top Performing Departments */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Top Performing Departments
        </h3>
        <div className="space-y-4">
          {topDepartments.map((dept, index) => (
            <div key={index} className="flex items-center">
              <div className="w-8 flex items-center justify-center">
                <span
                  className={`flex items-center justify-center w-6 h-6 rounded-full text-white text-xs bg-${
                    index === 0 ? "amber" : index === 1 ? "gray" : "orange"
                  }-${index === 0 ? "500" : index === 1 ? "400" : "600"}`}
                >
                  {index + 1}
                </span>
              </div>
              <div className="flex-1 ml-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {dept.department}
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {dept.avgRating.toFixed(1)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                  <div
                    className={`h-2 rounded-full ${
                      index === 0
                        ? "bg-amber-500"
                        : index === 1
                        ? "bg-gray-400"
                        : "bg-orange-600"
                    }`}
                    style={{ width: `${(dept.avgRating / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DepartmentChart />
        <MonthlyTrendChart />
      </div>
    </div>
  );
}
