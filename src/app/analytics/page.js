"use client";

import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUsers } from "@/context/UserContext";
import { useBookmarks } from "@/context/BookmarkContext";
import { useTheme } from "@/context/ThemeContext";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const AnalyticsPage = () => {
  const { users, loading } = useUsers();
  const { bookmarks } = useBookmarks();
  const { theme } = useTheme();

  const [avgRatings, setAvgRatings] = useState({});
  const [bookmarkTrends, setBookmarkTrends] = useState([]);

  useEffect(() => {
    if (users.length > 0) {
      const ratingsMap = {};
      const counts = {};

      users.forEach((user) => {
        const dept = user.company.department;
        ratingsMap[dept] = (ratingsMap[dept] || 0) + user.performanceRating;
        counts[dept] = (counts[dept] || 0) + 1;
      });

      const averages = {};
      for (const dept in ratingsMap) {
        averages[dept] = parseFloat((ratingsMap[dept] / counts[dept]).toFixed(2));
      }
      setAvgRatings(averages);

      const bookmarkedCount = users.filter((user) => bookmarks.includes(user.id)).length;
      setBookmarkTrends([
        Math.round(bookmarkedCount * 0.3),
        Math.round(bookmarkedCount * 0.4),
        Math.round(bookmarkedCount * 0.5),
        Math.round(bookmarkedCount * 0.6),
        Math.round(bookmarkedCount * 0.8),
        bookmarkedCount - 2,
        bookmarkedCount,
      ]);
    }
  }, [users, bookmarks]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          color: theme === "dark" ? "#9CA3AF" : "#6B7280",
        },
        grid: {
          color: theme === "dark" ? "#374151" : "#E5E7EB",
        },
      },
      x: {
        ticks: {
          color: theme === "dark" ? "#9CA3AF" : "#6B7280",
        },
        grid: {
          color: theme === "dark" ? "#374151" : "#E5E7EB",
        },
      },
    },
  };

  const lineChartOptions = { ...chartOptions };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-1/3" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-4 space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-6 w-1/4" />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="space-y-4">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Employee Analytics Dashboard
      </h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{users.length}</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Bookmarked Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {users.filter((user) => bookmarks.includes(user.id)).length}
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Departments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {new Set(users.map((user) => user.company.department)).size}
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Avg Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {users.length > 0
                ? (users.reduce((a, b) => a + b.performanceRating, 0) / users.length).toFixed(2)
                : "0.00"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Department-wise chart */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Department-wise Avg Ratings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <Bar
              data={{
                labels: Object.keys(avgRatings),
                datasets: [
                  {
                    label: "Average Rating",
                    data: Object.values(avgRatings),
                    backgroundColor: theme === "dark" ? "#6366F1" : "#3B82F6",
                    borderColor: theme === "dark" ? "#818CF8" : "#2563EB",
                    borderWidth: 1,
                  },
                ],
              }}
              options={chartOptions}
            />
          </div>
        </CardContent>
      </Card>

      {/* Trends chart */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Bookmark Trends (Last 7 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <Line
              data={{
                labels: [
                  "6 days ago",
                  "5 days ago",
                  "4 days ago",
                  "3 days ago",
                  "2 days ago",
                  "Yesterday",
                  "Today",
                ],
                datasets: [
                  {
                    label: "Bookmarks",
                    data: bookmarkTrends,
                    fill: false,
                    borderColor: theme === "dark" ? "#F59E0B" : "#D97706",
                    backgroundColor: theme === "dark" ? "#FBBF24" : "#F59E0B",
                    tension: 0.1,
                    pointBackgroundColor: theme === "dark" ? "#FCD34D" : "#F59E0B",
                  },
                ],
              }}
              options={lineChartOptions}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
