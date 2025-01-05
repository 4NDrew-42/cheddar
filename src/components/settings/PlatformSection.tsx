"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsFormProps, platformSchema } from "../../types/settings";
import { cn } from "../../lib/utils";

type PlatformData = {
  connected: boolean;
  username?: string;
  lastSync?: Date;
  preferences: {
    autoPost: boolean;
    requireApproval: boolean;
  };
};

type PlatformFormData = {
  [key: string]: PlatformData;
};

type PlatformErrors = {
  [key: string]: {
    message: string;
    type: string;
  };
};

const SUPPORTED_PLATFORMS = [
  {
    id: "twitter",
    name: "Twitter",
    icon: "𝕏", // You might want to use a proper icon library
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "in",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: "f",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: "📸",
  },
];

export default function PlatformSection({
  initialData,
  onUpdate,
}: SettingsFormProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [connectingPlatform, setConnectingPlatform] = useState<string | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<PlatformFormData>({
    resolver: zodResolver(platformSchema),
    defaultValues: initialData.platforms ?? {},
  });

  const watchedPlatforms = watch();

  const handleConnect = async (platformId: string) => {
    try {
      setConnectingPlatform(platformId);
      // In a real app, this would initiate OAuth flow
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Simulate successful connection
      const updatedPlatforms = {
        ...watchedPlatforms,
        [platformId]: {
          connected: true,
          username: `user@${platformId}`,
          lastSync: new Date(),
          preferences: {
            autoPost: false,
            requireApproval: true,
          },
        },
      };
      await onUpdate({ platforms: updatedPlatforms });
      reset(updatedPlatforms);
    } catch (error) {
      console.error(`Failed to connect to ${platformId}:`, error);
    } finally {
      setConnectingPlatform(null);
    }
  };

  const handleDisconnect = async (platformId: string) => {
    try {
      setConnectingPlatform(platformId);
      // In a real app, this would revoke OAuth tokens
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const updatedPlatforms = {
        ...watchedPlatforms,
        [platformId]: {
          connected: false,
          preferences: {
            autoPost: false,
            requireApproval: true,
          },
        },
      };
      await onUpdate({ platforms: updatedPlatforms });
      reset(updatedPlatforms);
    } catch (error) {
      console.error(`Failed to disconnect from ${platformId}:`, error);
    } finally {
      setConnectingPlatform(null);
    }
  };

  const onSubmit = async (data: PlatformFormData) => {
    try {
      setIsSaving(true);
      await onUpdate({ platforms: data });
      reset(data);
    } catch (error) {
      console.error("Failed to update platform settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">
          Connected Platforms
        </h3>
        <p className="text-sm text-gray-500">
          Manage your connected social media accounts and posting preferences.
        </p>
      </div>

      <div className="space-y-6">
        {SUPPORTED_PLATFORMS.map(({ id, name, icon }) => {
          const isConnected = watchedPlatforms[id]?.connected;
          const platformErrors = errors[id] as PlatformErrors | undefined;

          return (
            <div key={id} className="bg-white shadow rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg text-xl">
                    {icon}
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-gray-900">
                      {name}
                    </h4>
                    {isConnected && watchedPlatforms[id]?.username && (
                      <p className="text-sm text-gray-500">
                        {watchedPlatforms[id].username}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    isConnected ? handleDisconnect(id) : handleConnect(id)
                  }
                  disabled={connectingPlatform === id}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-md",
                    isConnected
                      ? "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                      : "text-white bg-blue-600 hover:bg-blue-700",
                    connectingPlatform === id
                      ? "opacity-50 cursor-not-allowed"
                      : "",
                  )}
                >
                  {connectingPlatform === id
                    ? "Processing..."
                    : isConnected
                      ? "Disconnect"
                      : "Connect"}
                </button>
              </div>

              {isConnected && (
                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <label
                        htmlFor={`${id}.preferences.autoPost`}
                        className="text-sm font-medium text-gray-700"
                      >
                        Auto-post
                      </label>
                      <p className="text-sm text-gray-500">
                        Automatically post content to this platform
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      id={`${id}.preferences.autoPost`}
                      {...register(`${id}.preferences.autoPost`)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label
                        htmlFor={`${id}.preferences.requireApproval`}
                        className="text-sm font-medium text-gray-700"
                      >
                        Require approval
                      </label>
                      <p className="text-sm text-gray-500">
                        Review posts before they are published
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      id={`${id}.preferences.requireApproval`}
                      {...register(`${id}.preferences.requireApproval`)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>

                  {platformErrors && (
                    <div className="text-sm text-red-600">
                      {Object.values(platformErrors).map((error, index) => (
                        <p key={index}>{error.message}</p>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
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
