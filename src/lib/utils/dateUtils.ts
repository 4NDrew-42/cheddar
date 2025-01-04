/**
 * Date utility functions for calendar operations
 */
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, isSameMonth, format } from 'date-fns';
import { toZonedTime, format as tzFormat } from 'date-fns-tz';

/**
 * Get user's current time zone
 * @returns string representing IANA time zone
 */
export function getUserTimeZone(): string {
	return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

/**
 * Convert date to user's time zone
 * @param date Date to convert
 * @param timeZone Target time zone
 * @returns Date in target time zone
 */
export function toUserTimeZone(date: Date, timeZone: string): Date {
	return toZonedTime(date, timeZone);
}

/**
 * Convert date to UTC
 * @param date Date to convert
 * @returns Date in UTC
 */
export function toUTC(date: Date): Date {
	return toZonedTime(date, 'UTC');
}

/**
 * Format date with time zone
 * @param date Date to format
 * @param formatStr Format string
 * @param timeZone Target time zone
 * @returns Formatted date string with time zone
 */
export function formatWithTimeZone(date: Date, formatStr: string, timeZone: string): string {
	return tzFormat(date, formatStr, { timeZone });
}

/**
 * Get all dates for current month view (including padding days)
 * @param date Base date to get month view for
 * @returns Array of dates for the month view
 */
export function getDatesForMonth(date: Date): Date[] {
	const monthStart = startOfMonth(date);
	const monthEnd = endOfMonth(date);
	const calendarStart = startOfWeek(monthStart);
	const calendarEnd = endOfWeek(monthEnd);

	return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
}

/**
 * Check if date is today
 * @param date Date to check
 * @returns boolean indicating if date is today
 */
export function isToday(date: Date): boolean {
	return isSameDay(date, new Date());
}

/**
 * Check if date is in current month
 * @param date Date to check
 * @param baseDate Base date to compare against
 * @returns boolean indicating if date is in the same month as baseDate
 */
export function isCurrentMonth(date: Date, baseDate: Date): boolean {
	return isSameMonth(date, baseDate);
}

/**
 * Format date for display
 * @param date Date to format
 * @param formatStr Format string (date-fns format)
 * @returns Formatted date string
 */
export function formatDate(date: Date, formatStr: string): string {
	return format(date, formatStr);
}

/**
 * Get weekday names
 * @returns Array of weekday names
 */
export function getWeekDays(): string[] {
	return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
}
