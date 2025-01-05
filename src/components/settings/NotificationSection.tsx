"use client";

import React, { useState } from "react";
import { useForm, FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsFormProps, notificationSchema } from "../../types/settings";
import { cn } from "../../lib/utils";

type NotificationFormData = {
  email: boolean;
  push: boolean;
  digest: "daily" | "weekly" | "none";
  types: {
    posts: boolean;
    mentions: boolean;
    analytics: boolean;
  };
};

export default function NotificationSection({
  initialData,
  onUpdate,
}: SettingsFormProps) {
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NotificationFormData>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      email: initialData.notifications?.email ?? false,
      push: initialData.notifications?.push ?? false,
      digest: initialData.notifications?.digest ?? "none",
      types: {
        posts: initialData.notifications?.types.posts ?? false,
        mentions: initialData.notifications?.types.mentions ?? false,
        analytics: initialData.notifications?.types.analytics ?? false,
      },
    },
  });

  const onSubmit = async (data: NotificationFormData) => {
    try {
      setIsSaving(true);
      await onUpdate({ notifications: data });
      reset(data);
    } catch (error) {
      console.error("Failed to update notifications:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">
          Notification Preferences
        </h3>
        <p className="text-sm text-gray-500">
          Customize how and when you want to receive notifications.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email Notifications
            </label>
            <p className="text-sm text-gray-500">
              Receive notifications via email
            </p>
          </div>
          <input
            type="checkbox"
            id="email"
            {...register("email")}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label htmlFor="push" className="text-sm font-medium text-gray-700">
              Push Notifications
            </label>
            <p className="text-sm text-gray-500">
              Receive push notifications in your browser
            </p>
          </div>
          <input
            type="checkbox"
            id="push"
            {...register("push")}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Digest Frequency
          </label>
          <select
            {...register("digest")}
            className={cn(
              "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
              errors.digest &&
                "border-red-300 focus:border-red-500 focus:ring-red-500",
            )}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="none">None</option>
          </select>
          {errors.digest && (
            <p className="mt-1 text-sm text-red-600">{errors.digest.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Notification Types
          </label>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="types.posts" className="text-sm text-gray-600">
                New Posts
              </label>
              <input
                type="checkbox"
                id="types.posts"
                {...register("types.posts")}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="types.mentions" className="text-sm text-gray-600">
                Mentions
              </label>
              <input
                type="checkbox"
                id="types.mentions"
                {...register("types.mentions")}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="types.analytics"
                className="text-sm text-gray-600"
              >
                Analytics Updates
              </label>
              <input
                type="checkbox"
                id="types.analytics"
                {...register("types.analytics")}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className={cn(
            "inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
            isSaving ? "opacity-50 cursor-not-allowed" : "",
          )}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
