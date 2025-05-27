// src/app/employee/[id]/page.js
'use client';

import { useParams } from 'next/navigation';
import { useUsers } from '@/context/UserContext';
import { useContext, useMemo, useState } from 'react';
import { ThemeContext } from '@/context/ThemeContext';
import Rating from '@/components/ui/rating';
import TabButton from '@/components/ui/TabButton';

const tabs = ['Overview', 'Projects', 'Feedback'];

const getRandomHistory = () => {
  const history = [];
  for (let i = 0; i < 5; i++) {
    history.push({
      year: 2019 + i,
      rating: Math.floor(Math.random() * 5) + 1
    });
  }
  return history;
};

export default function EmployeeDetailPage() {
  const { id } = useParams();
  const { users } = useUsers();
  const { theme } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState('Overview');

  const user = users.find(u => u.id === Number(id));
  const history = useMemo(() => getRandomHistory(), [id]);

  if (!user) return <p className="mt-10 text-center">User not found.</p>;

  const infoColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Employee Details</h1>

      <div className={`rounded-lg p-6 shadow-md border ${theme === 'dark' ? 'bg-gray-600 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <p className={`font-semibold ${infoColor}`}>Name:</p>
            <p className={infoColor}>{user.firstName} {user.lastName}</p>

            <p className={`font-semibold mt-2 ${infoColor}`}>Email:</p>
            <p className={infoColor}>{user.email}</p>

            <p className={`font-semibold mt-2 ${infoColor}`}>Phone:</p>
            <p className={infoColor}>{user.phone}</p>

            <p className={`font-semibold mt-2 ${infoColor}`}>Address:</p>
            <p className={infoColor}>{user.address?.address}, {user.address?.city}</p>
          </div>

          <div>
            <p className={`font-semibold ${infoColor}`}>Department:</p>
            <p className={infoColor}>{user.department}</p>

            <p className={`font-semibold mt-2 ${infoColor}`}>Performance Rating:</p>
            <Rating value={user.performanceRating} />

            <p className={`font-semibold mt-2 ${infoColor}`}>Status:</p>
            <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${user.performanceRating >= 4 ? 'bg-green-500 text-white' : user.performanceRating >= 3 ? 'bg-yellow-500 text-black' : 'bg-red-500 text-white'}`}>
              {user.performanceRating >= 4 ? 'Excellent' : user.performanceRating >= 3 ? 'Good' : 'Needs Improvement'}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6">
          <div className="flex space-x-4 border-b pb-2">
            {tabs.map(tab => (
              <TabButton key={tab} label={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)} />
            ))}
          </div>

          <div className="mt-4">
            {activeTab === 'Overview' && (
              <div>
                <h3 className="text-xl font-semibold mb-2">Bio</h3>
                <p className={infoColor}>
                  {user.firstName} is a valued member of the {user.department} department, contributing with excellent professionalism and work ethic.
                </p>

                <h3 className="text-xl font-semibold mt-4 mb-2">Past Performance</h3>
                <ul className="space-y-2">
                  {history.map((item, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span className={infoColor}>{item.year}</span>
                      <Rating value={item.rating} size="sm" />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'Projects' && (
              <div>
                <h3 className="text-xl font-semibold mb-2">Projects</h3>
                <ul className="list-disc ml-5 space-y-1">
                  <li className={infoColor}>Project Apollo – Frontend Revamp</li>
                  <li className={infoColor}>HR Automation – Phase 2</li>
                  <li className={infoColor}>Internal Dashboard UI Upgrade</li>
                </ul>
              </div>
            )}

            {activeTab === 'Feedback' && (
              <div>
                <h3 className="text-xl font-semibold mb-2">Feedback</h3>
                <p className={infoColor}>
                  "{user.firstName} is punctual, detail-oriented, and consistently exceeds expectations in all assigned tasks."
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
