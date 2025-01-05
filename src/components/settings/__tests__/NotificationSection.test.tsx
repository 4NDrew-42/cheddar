import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NotificationSection from "../NotificationSection";

describe("NotificationSection", () => {
  const mockInitialData = {
    notifications: {
      email: true,
      push: false,
      digest: "daily" as const,
      types: {
        posts: true,
        mentions: true,
        analytics: false,
      },
    },
  };

  const mockOnUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with initial data", () => {
    render(
      <NotificationSection
        section="notifications"
        initialData={mockInitialData}
        onUpdate={mockOnUpdate}
      />,
    );

    // Check email notifications
    expect(screen.getByLabelText(/email notifications/i)).toBeChecked();

    // Check push notifications
    expect(screen.getByLabelText(/push notifications/i)).not.toBeChecked();

    // Check digest frequency
    expect(screen.getByRole("combobox")).toHaveValue("daily");

    // Check notification types
    expect(screen.getByLabelText(/new posts/i)).toBeChecked();
    expect(screen.getByLabelText(/mentions/i)).toBeChecked();
    expect(screen.getByLabelText(/analytics updates/i)).not.toBeChecked();
  });

  it("updates notification preferences", async () => {
    render(
      <NotificationSection
        section="notifications"
        initialData={{}}
        onUpdate={mockOnUpdate}
      />,
    );

    // Toggle email notifications
    await userEvent.click(screen.getByLabelText(/email notifications/i));

    // Toggle push notifications
    await userEvent.click(screen.getByLabelText(/push notifications/i));

    // Change digest frequency
    await userEvent.selectOptions(screen.getByRole("combobox"), "weekly");

    // Toggle notification types
    await userEvent.click(screen.getByLabelText(/new posts/i));
    await userEvent.click(screen.getByLabelText(/mentions/i));
    await userEvent.click(screen.getByLabelText(/analytics updates/i));

    // Submit form
    await userEvent.click(
      screen.getByRole("button", { name: /save changes/i }),
    );

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith({
        notifications: {
          email: true,
          push: true,
          digest: "weekly",
          types: {
            posts: true,
            mentions: true,
            analytics: true,
          },
        },
      });
    });
  });

  it("validates digest frequency", async () => {
    render(
      <NotificationSection
        section="notifications"
        initialData={{}}
        onUpdate={mockOnUpdate}
      />,
    );

    const digestSelect = screen.getByRole("combobox");
    expect(digestSelect).toHaveValue("daily"); // Default value

    // Try to set an invalid value (this shouldn't be possible with select, but testing validation)
    await userEvent.selectOptions(digestSelect, "invalid");
    await userEvent.click(
      screen.getByRole("button", { name: /save changes/i }),
    );

    expect(mockOnUpdate).not.toHaveBeenCalled();
  });

  it("shows loading state during submission", async () => {
    mockOnUpdate.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100)),
    );

    render(
      <NotificationSection
        section="notifications"
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

  it("preserves unmodified notification types", async () => {
    render(
      <NotificationSection
        section="notifications"
        initialData={mockInitialData}
        onUpdate={mockOnUpdate}
      />,
    );

    // Only change one notification type
    await userEvent.click(screen.getByLabelText(/analytics updates/i));
    await userEvent.click(
      screen.getByRole("button", { name: /save changes/i }),
    );

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith({
        notifications: {
          ...mockInitialData.notifications,
          types: {
            ...mockInitialData.notifications.types,
            analytics: true,
          },
        },
      });
    });
  });

  it("handles form reset", async () => {
    render(
      <NotificationSection
        section="notifications"
        initialData={mockInitialData}
        onUpdate={mockOnUpdate}
      />,
    );

    // Change multiple settings
    await userEvent.click(screen.getByLabelText(/email notifications/i));
    await userEvent.click(screen.getByLabelText(/push notifications/i));
    await userEvent.selectOptions(screen.getByRole("combobox"), "weekly");

    // Submit form
    await userEvent.click(
      screen.getByRole("button", { name: /save changes/i }),
    );

    await waitFor(() => {
      // Check if form is reset to the new values after submission
      expect(screen.getByLabelText(/email notifications/i)).not.toBeChecked();
      expect(screen.getByLabelText(/push notifications/i)).toBeChecked();
      expect(screen.getByRole("combobox")).toHaveValue("weekly");
    });
  });
});
