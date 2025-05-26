"use client";
import React, { createContext, useEffect, useState } from 'react';

export const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
    const [bookmarks, setBookmarks] = useState([]);
    const [selectedBookmark, setSelectedBookmark] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem('bookmarkedUsers');
        if (saved) {
            setBookmarks(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('bookmarkedUsers', JSON.stringify(bookmarks));
    }, [bookmarks]);

    const addBookmark = (userId) => {
        setBookmarks((prev) => [...prev, { id: userId }]);
    };

    const removeBookmark = (userId) => {
        setBookmarks((prev) => prev.filter((u) => u.id !== userId));
    };

    const isBookmarked = (userId) => {
        return bookmarks.some((u) => u.id === userId);
    };

    return (
        <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}>
            {children}
        </BookmarkContext.Provider>
    );
};
