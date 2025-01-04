/**
 * DateCell component for displaying a single day in the calendar
 */
'use client';

import { IPost } from '../../models/Post';
import { memo } from 'react';

interface DateCellProps {
	date: Date;
	posts: IPost[];
	isCurrentMonth: boolean;
}

const styles = {
	cell: {
		base: 'min-h-[120px] p-2 border-r border-b relative',
		current: 'bg-white',
		other: 'bg-gray-50 text-gray-400',
		today: 'bg-blue-50',
	},
	date: 'font-medium text-sm',
	postList: 'mt-2 space-y-1',
	post: 'text-xs p-1 rounded truncate',
};

const DateCell = memo(function DateCell({ date, posts, isCurrentMonth }: DateCellProps) {
	const isTodayDate = new Date().toDateString() === date.toDateString();
	const dateNumber = date.getDate();

	const cellClasses = [styles.cell.base, isCurrentMonth ? styles.cell.current : styles.cell.other, isTodayDate ? styles.cell.today : ''].join(' ');

	return (
		<div className={cellClasses}>
			<span className={styles.date}>{dateNumber}</span>

			{posts.length > 0 && (
				<div className={styles.postList}>
					{posts.map((post) => (
						<div key={post.id} className={`${styles.post} ${post.status === 'published' ? 'bg-green-100' : post.status === 'scheduled' ? 'bg-blue-100' : 'bg-gray-100'}`}>
							<span className="block truncate">{post.title}</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
});

export default DateCell;
