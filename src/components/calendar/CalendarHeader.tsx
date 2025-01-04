/**
 * CalendarHeader component for calendar navigation and controls
 */
'use client';

import { formatDate } from '../../lib/utils/dateUtils';
import { memo } from 'react';

interface CalendarHeaderProps {
	currentDate: Date;
	onPrevMonth: () => void;
	onNextMonth: () => void;
	onTodayClick: () => void;
}

const styles = {
	header: 'flex items-center justify-between p-4',
	nav: {
		button: 'p-2 hover:bg-gray-100 rounded-full transition-colors duration-200',
		text: 'text-lg font-semibold',
	},
	controls: 'flex items-center space-x-4',
	monthYear: 'text-xl font-semibold min-w-[200px] text-center',
	todayButton: 'px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200',
};

const CalendarHeader = memo(function CalendarHeader({ currentDate, onPrevMonth, onNextMonth, onTodayClick }: CalendarHeaderProps) {
	const monthYearDisplay = formatDate(currentDate, 'MMMM yyyy');

	return (
		<div className={styles.header}>
			<div className={styles.controls}>
				<button onClick={onPrevMonth} className={styles.nav.button} aria-label="Previous month">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
						<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
					</svg>
				</button>
				<div className={styles.monthYear}>{monthYearDisplay}</div>
				<button onClick={onNextMonth} className={styles.nav.button} aria-label="Next month">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
						<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
					</svg>
				</button>
			</div>

			<button onClick={onTodayClick} className={styles.todayButton} aria-label="Go to today">
				Today
			</button>
		</div>
	);
});

export default CalendarHeader;
