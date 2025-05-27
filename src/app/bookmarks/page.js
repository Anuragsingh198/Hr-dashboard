'use client';
import { useBookmarks } from '../../context/BookmarkContext';
import UserCard from '../../components/UserCard';

export default function BookmarksPage() {
  const { bookmarks } = useBookmarks();

  return (
    <div className="mt-6">
      <h1 className="text-2xl font-semibold mb-4">Bookmarked Employees</h1>
      {bookmarks.length === 0 ? (
        <p>No bookmarks yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}
