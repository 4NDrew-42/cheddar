'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CalendarHeader from './CalendarHeader';
import CalendarControls from './CalendarControls';
import { Post, CalendarProps } from '../../types/models';
import { startOfWeek, endOfWeek, eachDayOfInterval, startOfMonth, endOfMonth, isSameDay, format } from 'date-fns';
import PostPreview from './PostPreview';
import { useDrop } from 'react-dnd';

interface DayProps {
  date: Date;
  posts: Post[];
  isCurrentMonth?: boolean;
  onDrop: (item: { post: Post }, date: Date) => void;
}

const Day = ({ date, posts, isCurrentMonth = true, onDrop }: DayProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'POST',
    drop: (item: { post: Post }) => onDrop(item, date),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // Connect the drop ref to our element ref
  drop(ref);

  return (
    <div
      ref={ref}
      className={`min-h-[120px] p-2 border border-gray-200 ${
        isCurrentMonth ? 'bg-white' : 'bg-gray-50'
      } ${isOver ? 'bg-blue-50' : ''}`}
    >
      <div className="text-sm text-gray-500 mb-2">
        {format(date, 'd')}
      </div>
      <div className="space-y-1">
        {posts
          .filter(post => isSameDay(new Date(post.scheduledAt), date))
          .map(post => (
            <PostPreview
              key={post._id}
              post={post}
              isCompact={true}
            />
          ))}
      </div>
    </div>
  );
};

const MonthView = ({ currentDate, posts, onPostDrop }: {
  currentDate: Date;
  posts: Post[];
  onPostDrop: (post: Post, date: Date) => void;
}) => {
  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });

  // Add padding days at start
  const startDay = start.getDay();
  const paddingStart = Array(startDay).fill(null).map((_, i) => {
    const date = new Date(start);
    date.setDate(date.getDate() - (startDay - i));
    return date;
  });

  // Add padding days at end
  const endDay = end.getDay();
  const paddingEnd = Array(6 - endDay).fill(null).map((_, i) => {
    const date = new Date(end);
    date.setDate(date.getDate() + (i + 1));
    return date;
  });

  const allDays = [...paddingStart, ...days, ...paddingEnd];

  return (
    <div className="grid grid-cols-7 gap-px bg-gray-200">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <div key={day} className="bg-gray-50 py-2 text-center text-sm font-semibold text-gray-700">
          {day}
        </div>
      ))}
      {allDays.map((date, i) => (
        <Day
          key={i}
          date={date}
          posts={posts}
          isCurrentMonth={date.getMonth() === currentDate.getMonth()}
          onDrop={(item, date) => onPostDrop(item.post, date)}
        />
      ))}
    </div>
  );
};

const WeekView = ({ currentDate, posts, onPostDrop }: {
  currentDate: Date;
  posts: Post[];
  onPostDrop: (post: Post, date: Date) => void;
}) => {
  const start = startOfWeek(currentDate);
  const end = endOfWeek(currentDate);
  const days = eachDayOfInterval({ start, end });

  return (
    <div className="grid grid-cols-7 gap-px bg-gray-200 h-screen">
      {days.map(date => (
        <div key={date.toISOString()} className="flex flex-col">
          <div className="bg-gray-50 py-2 text-center text-sm font-semibold text-gray-700">
            {format(date, 'EEE d')}
          </div>
          <Day
            date={date}
            posts={posts}
            onDrop={(item, date) => onPostDrop(item.post, date)}
          />
        </div>
      ))}
    </div>
  );
};

export default function CalendarContainer({
  posts,
  onPostUpdate,
  onDateChange,
  onViewChange,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week'>('month');

  const handlePrevMonth = useCallback(() => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  }, []);

  const handleNextMonth = useCallback(() => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  }, []);

  const handleTodayClick = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  const handlePostDrop = useCallback(async (post: Post, date: Date) => {
    try {
      const updatedPost = {
        ...post,
        scheduledAt: date.toISOString(),
      };
      await onPostUpdate(updatedPost);
    } catch (error) {
      console.error('Failed to update post:', error);
      // TODO: Add error handling UI
    }
  }, [onPostUpdate]);

  useEffect(() => {
    onDateChange(currentDate);
  }, [currentDate, onDateChange]);

  useEffect(() => {
    onViewChange(view);
  }, [view, onViewChange]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <CalendarControls
          view={view}
          currentDate={currentDate}
          onViewChange={setView}
          onDateChange={setCurrentDate}
        />
        <CalendarHeader
          currentDate={currentDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onTodayClick={handleTodayClick}
        />
        {view === 'month' ? (
          <MonthView
            currentDate={currentDate}
            posts={posts}
            onPostDrop={handlePostDrop}
          />
        ) : (
          <WeekView
            currentDate={currentDate}
            posts={posts}
            onPostDrop={handlePostDrop}
          />
        )}
      </div>
    </DndProvider>
  );
}