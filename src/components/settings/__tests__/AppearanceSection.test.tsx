import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import AppearanceSection from "../AppearanceSection";

describe("AppearanceSection", () => {
  const mockInitialData = {
    appearance: {
      theme: "light" as const,
      density: "comfortable" as const,
      timezone: "America/New_York",
    },
  };

  const mockOnUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with initial data", () => {
    render(
      <AppearanceSection
        section="appearance"
        initialData={mockInitialData}
        onUpdate={mockOnUpdate}
      />,
    );

    // Check theme selection
    expect(screen.getByRole("combobox", { name: /theme/i })).toHaveValue(
      "light",
    );

    // Check density selection
    expect(screen.getByRole("combobox", { name: /density/i })).toHaveValue(
      "comfortable",
    );

    // Check timezone selection
    expect(screen.getByRole("combobox", { name: /timezone/i })).toHaveValue(
      "America/New_York",
    );
  });

  it("updates theme preference", async () => {
    render(
      <AppearanceSection
        section="appearance"
        initialData={{}}
        onUpdate={mockOnUpdate}
      />,
    );

    const themeSelect = screen.getByRole("combobox", { name: /theme/i });
    await userEvent.selectOptions(themeSelect, "dark");

    await userEvent.click(
      screen.getByRole("button", { name: /save changes/i }),
    );

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith({
        appearance: expect.objectContaining({
          theme: "dark",
        }),
      });
    });
  });

  it("updates density preference", async () => {
    render(
      <AppearanceSection
        section="appearance"
        initialData={{}}
        onUpdate={mockOnUpdate}
      />,
    );

    const densitySelect = screen.getByRole("combobox", { name: /density/i });
    await userEvent.selectOptions(densitySelect, "compact");

    await userEvent.click(
      screen.getByRole("button", { name: /save changes/i }),
    );

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith({
        appearance: expect.objectContaining({
          density: "compact",
        }),
      });
    });
  });

  it("updates timezone preference", async () => {
    render(
      <AppearanceSection
        section="appearance"
        initialData={{}}
        onUpdate={mockOnUpdate}
      />,
    );

    const timezoneSelect = screen.getByRole("combobox", { name: /timezone/i });
    await userEvent.selectOptions(timezoneSelect, "Europe/London");

    await userEvent.click(
      screen.getByRole("button", { name: /save changes/i }),
    );

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith({
        appearance: expect.objectContaining({
          timezone: "Europe/London",
        }),
      });
    });
  });

  it("validates theme values", async () => {
    render(
      <AppearanceSection
        section="appearance"
        initialData={{}}
        onUpdate={mockOnUpdate}
      />,
    );

    const themeSelect = screen.getByRole("combobox", { name: /theme/i });
    expect(themeSelect).toHaveValue("system"); // Default value

    // Verify only valid options are available
    const options = Array.from(themeSelect.getElementsByTagName("option")).map(
      (option: HTMLOptionElement) => option.value,
    );
    expect(options).toEqual(["light", "dark", "system"]);
  });

  it("validates density values", async () => {
    render(
      <AppearanceSection
        section="appearance"
        initialData={{}}
        onUpdate={mockOnUpdate}
      />,
    );

    const densitySelect = screen.getByRole("combobox", { name: /density/i });
    expect(densitySelect).toHaveValue("comfortable"); // Default value

    // Verify only valid options are available
    const options = Array.from(
      densitySelect.getElementsByTagName("option"),
    ).map((option: HTMLOptionElement) => option.value);
    expect(options).toEqual(["comfortable", "compact"]);
  });

  it("shows loading state during submission", async () => {
    mockOnUpdate.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100)),
    );

    render(
      <AppearanceSection
        section="appearance"
        initialData={mockInitialData}
        onUpdate={mockOnUpdate}
      />,
    );

    const submitButton = screen.getByRole("button", { name: /save changes/i });
    await userEvent.click(submitButton);

    expect(screen.getByText("Saving...")).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    await waitFor(() => {
      expect(screen.getByText("Save Changes")).toBeInTheDocument();
      expect(submitButton).not.toBeDisabled();
    });
  });

  it("preserves unmodified settings", async () => {
    render(
      <AppearanceSection
        section="appearance"
        initialData={mockInitialData}
        onUpdate={mockOnUpdate}
      />,
    );

    // Only change theme
    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: /theme/i }),
      "dark",
    );

    await userEvent.click(
      screen.getByRole("button", { name: /save changes/i }),
    );

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith({
        appearance: {
          ...mockInitialData.appearance,
          theme: "dark",
        },
      });
    });
  });

  it("handles system theme selection", async () => {
    render(
      <AppearanceSection
        section="appearance"
        initialData={{}}
        onUpdate={mockOnUpdate}
      />,
    );

    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: /theme/i }),
      "system",
    );

    await userEvent.click(
      screen.getByRole("button", { name: /save changes/i }),
    );

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith({
        appearance: expect.objectContaining({
          theme: "system",
        }),
      });
    });
  });
});
