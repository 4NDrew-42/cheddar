import { useEffect, useState } from 'react';
import { IPost } from '../../models/Post';
import CalendarHeader from './CalendarHeader';
import DateCell from './DateCell';

interface CalendarViewProps {
	initialDate?: Date;
}

export const CalendarView = ({ initialDate = new Date() }: CalendarViewProps) => {
	const [posts, setPosts] = useState<IPost[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const [currentDate, setCurrentDate] = useState(initialDate);

	const fetchPostsForMonth = async (date: Date) => {
		setIsLoading(true);
		setError(null);

		try {
			const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
			const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

			const response = await fetch(`/api/posts?start=${startOfMonth.toISOString()}&end=${endOfMonth.toISOString()}`);

			if (!response.ok) {
				throw new Error('Failed to fetch posts');
			}

			const data = await response.json();
			setPosts(data.posts);
		} catch (err) {
			setError(err instanceof Error ? err : new Error('An error occurred'));
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchPostsForMonth(currentDate);
	}, [currentDate]);

	const handlePrevMonth = () => {
		setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
	};

	const handleNextMonth = () => {
		setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
	};

	const handleTodayClick = () => {
		setCurrentDate(new Date());
	};

	const getPostsForDate = (date: Date): IPost[] => {
		return posts.filter((post) => {
			const postDate = new Date(post.scheduledAt);
			return postDate.getFullYear() === date.getFullYear() && postDate.getMonth() === date.getMonth() && postDate.getDate() === date.getDate();
		});
	};

	const renderCalendarGrid = () => {
		const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
		const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
		const startDay = startOfMonth.getDay();

		const days = [];
		// Add empty cells for days before the first of the month
		for (let i = 0; i < startDay; i++) {
			days.push(<div key={`empty-${i}`} className="empty-cell" />);
		}

		// Add cells for each day of the month
		for (let day = 1; day <= daysInMonth; day++) {
			const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
			const dayPosts = getPostsForDate(date);

			days.push(<DateCell key={date.toISOString()} date={date} posts={dayPosts} isCurrentMonth={true} />);
		}

		return days;
	};

	return (
		<div className="calendar-container">
			<CalendarHeader currentDate={currentDate} onPrevMonth={handlePrevMonth} onNextMonth={handleNextMonth} onTodayClick={handleTodayClick} />

			{error && <div className="error-message p-4 text-red-500">Error: {error.message}</div>}

			{isLoading ? <div className="loading-indicator p-4">Loading...</div> : <div className="calendar-grid grid grid-cols-7 gap-2 p-4">{renderCalendarGrid()}</div>}
		</div>
	);
};
