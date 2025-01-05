import { ConfigUpdatePayload } from '../../types/config';

type EventHandler<T> = (payload: T) => Promise<void> | void;

export class EventSystem<T = unknown> {
	private handlers: Map<string, Set<EventHandler<T>>> = new Map();

	/**
	 * Subscribe to an event type
	 * @param eventType Event type to subscribe to
	 * @param handler Function to handle the event
	 */
	subscribe(eventType: string, handler: EventHandler<T>): void {
		if (!this.handlers.has(eventType)) {
			this.handlers.set(eventType, new Set());
		}
		this.handlers.get(eventType)?.add(handler);
	}

	/**
	 * Unsubscribe from an event type
	 * @param eventType Event type to unsubscribe from
	 * @param handler Function to remove from handlers
	 */
	unsubscribe(eventType: string, handler: EventHandler<T>): void {
		this.handlers.get(eventType)?.delete(handler);
	}

	/**
	 * Publish an event to all subscribers
	 * @param eventType Event type to publish
	 * @param payload Event payload data
	 */
	async publish(eventType: string, payload: T): Promise<void> {
		const handlers = this.handlers.get(eventType);
		if (!handlers) return;

		await Promise.all(
			Array.from(handlers).map(async (handler) => {
				try {
					await handler(payload);
				} catch (error) {
					console.error(`Error handling event ${eventType}:`, error);
				}
			})
		);
	}

	/**
	 * Clear all event handlers
	 */
	clear(): void {
		this.handlers.clear();
	}
}

export const eventSystem = new EventSystem<ConfigUpdatePayload>();
