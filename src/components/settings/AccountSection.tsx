"use client";

import React, { useState } from "react";

export default function AccountSection() {
  const [settings, setSettings] = useState({
    timezone: "America/Chicago",
    emailNotifications: false,
  });

  const handleTimezoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings((prev) => ({
      ...prev,
      timezone: e.target.value,
    }));
  };

  const toggleNotifications = () => {
    setSettings((prev) => ({
      ...prev,
      emailNotifications: !prev.emailNotifications,
    }));
  };

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-medium text-gray-900">Account</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center py-4 border-b border-gray-200">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Time Zone</h3>
            <p className="text-sm text-gray-500">
              Set your default time zone for scheduling
            </p>
          </div>
          <select
            id="timezone"
            name="timezone"
            value={settings.timezone}
            onChange={handleTimezoneChange}
            className="mt-1 block w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="America/Chicago">Central Time</option>
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
            <option value="America/Denver">Mountain Time</option>
          </select>
        </div>

        <div className="flex justify-between items-center py-4 border-b border-gray-200">
          <div>
            <h3 className="text-sm font-medium text-gray-900">
              Email Notifications
            </h3>
            <p className="text-sm text-gray-500">
              Receive email notifications for post status updates
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={settings.emailNotifications}
            aria-label="Toggle email notifications"
            onClick={toggleNotifications}
            className={`${
              settings.emailNotifications ? "bg-blue-600" : "bg-gray-200"
            } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          >
            <span
              className={`${
                settings.emailNotifications ? "translate-x-5" : "translate-x-0"
              } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
            >
              <span
                className={`${
                  settings.emailNotifications
                    ? "opacity-0 duration-100 ease-out"
                    : "opacity-100 duration-200 ease-in"
                } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
                aria-hidden="true"
              >
                <svg
                  className="h-3 w-3 text-gray-400"
                  fill="none"
                  viewBox="0 0 12 12"
                >
                  <path
                    d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span
                className={`${
                  settings.emailNotifications
                    ? "opacity-100 duration-200 ease-in"
                    : "opacity-0 duration-100 ease-out"
                } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
                aria-hidden="true"
              >
                <svg
                  className="h-3 w-3 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 12 12"
                >
                  <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                </svg>
              </span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
