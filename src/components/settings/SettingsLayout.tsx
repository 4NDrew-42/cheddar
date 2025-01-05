"use client";

import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import { UserSettings } from "../../types/settings";
import ProfileSection from "./ProfileSection";
import NotificationSection from "./NotificationSection";
import PlatformSection from "./PlatformSection";
import AppearanceSection from "./AppearanceSection";
import { cn } from "../../lib/utils";

interface SettingsLayoutProps {
  initialData: Partial<UserSettings>;
}

interface SectionProps {
  section: "profile" | "notifications" | "platforms" | "appearance";
  initialData: Partial<UserSettings>;
  onUpdate: (data: Partial<UserSettings>) => Promise<void>;
}

type SettingSection = {
  name: "profile" | "notifications" | "platforms" | "appearance";
  component: React.ComponentType<SectionProps>;
  label: string;
  description: string;
};

const SECTIONS: SettingSection[] = [
  {
    name: "profile",
    component: ProfileSection,
    label: "Profile",
    description: "Manage your personal information",
  },
  {
    name: "notifications",
    component: NotificationSection,
    label: "Notifications",
    description: "Configure your notification preferences",
  },
  {
    name: "platforms",
    component: PlatformSection,
    label: "Platforms",
    description: "Manage your connected platforms",
  },
  {
    name: "appearance",
    component: AppearanceSection,
    label: "Appearance",
    description: "Customize your interface",
  },
];

export default function SettingsLayout({ initialData }: SettingsLayoutProps) {
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleUpdate = async (_data: Partial<UserSettings>) => {
    try {
      setSaveStatus("idle");
      setErrorMessage("");

      // TODO: Implement API call to update settings
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call

      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (error) {
      setSaveStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to save settings",
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1">
          {SECTIONS.map(({ name, label }) => (
            <Tab
              key={name}
              className={({ selected }) =>
                cn(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white text-blue-700 shadow"
                    : "text-gray-600 hover:bg-white/[0.12] hover:text-blue-600",
                )
              }
            >
              {label}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="mt-8">
          {SECTIONS.map(({ name, component: Component, description }) => (
            <Tab.Panel
              key={name}
              className={cn(
                "rounded-xl bg-white p-6",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
              )}
            >
              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-900">{name}</h2>
                <p className="mt-1 text-sm text-gray-500">{description}</p>
              </div>
              <Component
                section={name}
                initialData={initialData}
                onUpdate={handleUpdate}
              />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>

      {/* Save Status Indicator */}
      {saveStatus !== "idle" && (
        <div
          className={cn(
            "fixed bottom-4 right-4 p-4 rounded-lg shadow-lg",
            saveStatus === "success" ? "bg-green-100" : "bg-red-100",
          )}
        >
          <p
            className={cn(
              "text-sm font-medium",
              saveStatus === "success" ? "text-green-800" : "text-red-800",
            )}
          >
            {saveStatus === "success"
              ? "Settings saved successfully"
              : errorMessage || "Failed to save settings"}
          </p>
        </div>
      )}
    </div>
  );
}
