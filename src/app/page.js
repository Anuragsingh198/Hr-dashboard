'use client';
import Spinner from '@/components/ui/Spinner';
import UserCard from '@/components/UserCard';
import { useUsers } from '@/context/UserContext';
export default function DashboardPage() {
  const { users, loading } = useUsers();
  const {theme} = useUsers();
  if (loading) return <> <Spinner/> <p className=''>Loading users</p></>

  return (
    <div className={`mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} ` }>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
   