'use client';

import Link from 'next/link';
import { ControlProps } from '../../types/models';

export default function CalendarControls({ view, onViewChange }: ControlProps) {
  return (
    <div className="flex justify-between items-center mb-6 p-4">
      <h1 className="text-2xl font-semibold text-gray-900">Content Calendar</h1>
      <div className="flex items-center space-x-4">
        <div className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            onClick={() => onViewChange('month')}
            className={`relative inline-flex items-center rounded-l-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 ${
              view === 'month'
                ? 'bg-blue-50 text-blue-600'
                : 'bg-white text-gray-900'
            }`}
            aria-label="Switch to month view"
          >
            Month
          </button>
          <button
            type="button"
            onClick={() => onViewChange('week')}
            className={`relative -ml-px inline-flex items-center rounded-r-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 ${
              view === 'week'
                ? 'bg-blue-50 text-blue-600'
                : 'bg-white text-gray-900'
            }`}
            aria-label="Switch to week view"
          >
            Week
          </button>
        </div>
        <Link
          href="/dashboard/posts/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Schedule Post
        </Link>
      </div>
    </div>
  );
}