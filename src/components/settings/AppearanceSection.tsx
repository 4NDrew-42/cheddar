"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsFormProps, appearanceSchema } from "../../types/settings";
import { cn } from "../../lib/utils";

type AppearanceFormData = {
  theme: "light" | "dark" | "system";
  density: "comfortable" | "compact";
  timezone: string;
};

export default function AppearanceSection({
  initialData,
  onUpdate,
}: SettingsFormProps) {
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AppearanceFormData>({
    resolver: zodResolver(appearanceSchema),
    defaultValues: {
      theme: initialData.appearance?.theme ?? "system",
      density: initialData.appearance?.density ?? "comfortable",
      timezone:
        initialData.appearance?.timezone ??
        Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  });

  const onSubmit = async (data: AppearanceFormData) => {
    try {
      setIsSaving(true);
      await onUpdate({ appearance: data });
      reset(data);
    } catch (error) {
      console.error("Failed to update appearance settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">
          Appearance Settings
        </h3>
        <p className="text-sm text-gray-500">
          Customize how the application looks and feels.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="theme"
            className="block text-sm font-medium text-gray-700"
          >
            Theme
          </label>
          <select
            id="theme"
            {...register("theme")}
            className={cn(
              "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
              errors.theme &&
                "border-red-300 focus:border-red-500 focus:ring-red-500",
            )}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
          {errors.theme && (
            <p className="mt-1 text-sm text-red-600">{errors.theme.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="density"
            className="block text-sm font-medium text-gray-700"
          >
            Display Density
          </label>
          <select
            id="density"
            {...register("density")}
            className={cn(
              "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
              errors.density &&
                "border-red-300 focus:border-red-500 focus:ring-red-500",
            )}
          >
            <option value="comfortable">Comfortable</option>
            <option value="compact">Compact</option>
          </select>
          {errors.density && (
            <p className="mt-1 text-sm text-red-600">
              {errors.density.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="timezone"
            className="block text-sm font-medium text-gray-700"
          >
            Timezone
          </label>
          <select
            id="timezone"
            {...register("timezone")}
            className={cn(
              "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
              errors.timezone &&
                "border-red-300 focus:border-red-500 focus:ring-red-500",
            )}
          >
            {Intl.supportedValuesOf("timeZone").map((tz) => (
              <option key={tz} value={tz}>
                {tz.replace(/_/g, " ")}
              </option>
            ))}
          </select>
          {errors.timezone && (
            <p className="mt-1 text-sm text-red-600">
              {errors.timezone.message}
            </p>
          )}
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
