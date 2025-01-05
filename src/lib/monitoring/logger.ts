import { LogEntry } from './types';
import fs from 'fs';
import path from 'path';
import { format } from 'date-fns';

const LOG_DIR = path.join(process.cwd(), 'logs');
const MAX_LOG_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_LOG_FILES = 5;

class Logger {
	private logLevel: LogEntry['level'] = 'info';
	private logStream: fs.WriteStream | null = null;
	private currentLogPath: string = '';

	constructor() {
		this.ensureLogDirectory();
		this.createNewLogFile();
	}

	private ensureLogDirectory(): void {
		if (!fs.existsSync(LOG_DIR)) {
			fs.mkdirSync(LOG_DIR, { recursive: true });
		}
	}

	private createNewLogFile(): void {
		const timestamp = format(new Date(), 'yyyy-MM-dd_HH-mm-ss');
		this.currentLogPath = path.join(LOG_DIR, `app_${timestamp}.log`);
		this.logStream = fs.createWriteStream(this.currentLogPath, { flags: 'a' });
	}

	private rotateLogs(): void {
		if (this.logStream) {
			this.logStream.end();
		}

		const logFiles = fs
			.readdirSync(LOG_DIR)
			.filter((file) => file.endsWith('.log'))
			.sort()
			.reverse();

		// Remove oldest logs if we have too many
		while (logFiles.length >= MAX_LOG_FILES) {
			const fileToRemove = logFiles.pop();
			if (fileToRemove) {
				fs.unlinkSync(path.join(LOG_DIR, fileToRemove));
			}
		}

		this.createNewLogFile();
	}

	private shouldRotate(): boolean {
		if (!this.logStream) return false;
		const stats = fs.statSync(this.currentLogPath);
		return stats.size >= MAX_LOG_SIZE;
	}

	private formatLog(entry: LogEntry): string {
		const stack = new Error().stack?.split('\n').slice(3).join('\n');
		const logData = {
			timestamp: entry.timestamp || Date.now(),
			level: entry.level,
			message: entry.message,
			context: entry.context || {},
			stack: entry.level === 'error' ? stack : undefined,
		};
		return JSON.stringify(logData);
	}

	setLevel(level: LogEntry['level']): void {
		this.logLevel = level;
	}

	log(entry: LogEntry): void {
		if (this.shouldRotate()) {
			this.rotateLogs();
		}

		if (this.logLevel === 'error' && entry.level !== 'error') return;
		if (this.logLevel === 'warn' && ['debug', 'info'].includes(entry.level)) return;
		if (this.logLevel === 'info' && entry.level === 'debug') return;

		if (this.logStream) {
			this.logStream.write(this.formatLog(entry) + '\n');
		}
	}

	debug(message: string, context?: Record<string, unknown>): void {
		this.log({
			level: 'debug',
			message,
			context,
			timestamp: Date.now(),
		});
	}

	info(message: string, context?: Record<string, unknown>): void {
		this.log({
			level: 'info',
			message,
			context,
			timestamp: Date.now(),
		});
	}

	warn(message: string, context?: Record<string, unknown>): void {
		this.log({
			level: 'warn',
			message,
			context,
			timestamp: Date.now(),
		});
	}

	error(message: string, context?: Record<string, unknown>): void {
		this.log({
			level: 'error',
			message,
			context,
			timestamp: Date.now(),
		});
	}

	shutdown(): void {
		if (this.logStream) {
			this.logStream.end();
		}
	}
}

export const logger = new Logger();
