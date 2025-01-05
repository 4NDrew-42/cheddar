import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PlatformSection from "../PlatformSection";

describe("PlatformSection", () => {
  const mockInitialData = {
    platforms: {
      twitter: {
        connected: true,
        username: "@testuser",
        lastSync: new Date("2024-01-01"),
        preferences: {
          autoPost: true,
          requireApproval: false,
        },
      },
      linkedin: {
        connected: false,
        preferences: {
          autoPost: false,
          requireApproval: true,
        },
      },
    },
  };

  const mockOnUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders platform list with connection status", () => {
    render(
      <PlatformSection
        section="platforms"
        initialData={mockInitialData}
        onUpdate={mockOnUpdate}
      />,
    );

    // Check Twitter (connected)
    expect(screen.getByText("Twitter")).toBeInTheDocument();
    expect(screen.getByText("@testuser")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /disconnect/i }),
    ).toBeInTheDocument();

    // Check LinkedIn (not connected)
    expect(screen.getByText("LinkedIn")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /connect/i }),
    ).toBeInTheDocument();
  });

  it("handles platform connection", async () => {
    render(
      <PlatformSection
        section="platforms"
        initialData={{}}
        onUpdate={mockOnUpdate}
      />,
    );

    // Find and click connect button for Twitter
    const connectButton = screen.getAllByRole("button", {
      name: /connect/i,
    })[0];
    await userEvent.click(connectButton);

    // Should show loading state
    expect(screen.getByText("Processing...")).toBeInTheDocument();
    expect(connectButton).toBeDisabled();

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith({
        platforms: expect.objectContaining({
          twitter: expect.objectContaining({
            connected: true,
          }),
        }),
      });
    });
  });

  it("handles platform disconnection", async () => {
    render(
      <PlatformSection
        section="platforms"
        initialData={mockInitialData}
        onUpdate={mockOnUpdate}
      />,
    );

    // Find and click disconnect button for Twitter
    const disconnectButton = screen.getByRole("button", {
      name: /disconnect/i,
    });
    await userEvent.click(disconnectButton);

    // Should show loading state
    expect(screen.getByText("Processing...")).toBeInTheDocument();
    expect(disconnectButton).toBeDisabled();

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith({
        platforms: expect.objectContaining({
          twitter: expect.objectContaining({
            connected: false,
          }),
        }),
      });
    });
  });

  it("updates platform preferences", async () => {
    render(
      <PlatformSection
        section="platforms"
        initialData={mockInitialData}
        onUpdate={mockOnUpdate}
      />,
    );

    // Toggle auto-post for Twitter
    const autoPostCheckbox = screen.getByLabelText(/auto-post/i);
    await userEvent.click(autoPostCheckbox);

    // Toggle require approval for Twitter
    const requireApprovalCheckbox = screen.getByLabelText(/require approval/i);
    await userEvent.click(requireApprovalCheckbox);

    await userEvent.click(
      screen.getByRole("button", { name: /save changes/i }),
    );

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith({
        platforms: expect.objectContaining({
          twitter: expect.objectContaining({
            preferences: {
              autoPost: false,
              requireApproval: true,
            },
          }),
        }),
      });
    });
  });

  it("shows platform-specific preferences only when connected", async () => {
    render(
      <PlatformSection
        section="platforms"
        initialData={mockInitialData}
        onUpdate={mockOnUpdate}
      />,
    );

    // Connected platform (Twitter) should show preferences
    expect(screen.getAllByLabelText(/auto-post/i)[0]).toBeInTheDocument();
    expect(
      screen.getAllByLabelText(/require approval/i)[0],
    ).toBeInTheDocument();

    // Unconnected platform (LinkedIn) should not show preferences
    const linkedInSection = screen.getByText("LinkedIn").closest("div");
    expect(linkedInSection).not.toHaveTextContent(/auto-post/i);
    expect(linkedInSection).not.toHaveTextContent(/require approval/i);
  });

  it("preserves other platform settings when updating one platform", async () => {
    render(
      <PlatformSection
        section="platforms"
        initialData={mockInitialData}
        onUpdate={mockOnUpdate}
      />,
    );

    // Update only Twitter's auto-post setting
    const autoPostCheckbox = screen.getByLabelText(/auto-post/i);
    await userEvent.click(autoPostCheckbox);

    await userEvent.click(
      screen.getByRole("button", { name: /save changes/i }),
    );

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith({
        platforms: {
          ...mockInitialData.platforms,
          twitter: {
            ...mockInitialData.platforms.twitter,
            preferences: {
              ...mockInitialData.platforms.twitter.preferences,
              autoPost: false,
            },
          },
        },
      });
    });
  });

  it("shows last sync time for connected platforms", () => {
    render(
      <PlatformSection
        section="platforms"
        initialData={mockInitialData}
        onUpdate={mockOnUpdate}
      />,
    );

    // Twitter should show last sync time
    expect(screen.getByText(/Jan 1, 2024/)).toBeInTheDocument();

    // LinkedIn should not show last sync time
    const linkedInSection = screen.getByText("LinkedIn").closest("div");
    expect(linkedInSection).not.toHaveTextContent(/Last synced/i);
  });

  it("handles loading state during preference updates", async () => {
    mockOnUpdate.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100)),
    );

    render(
      <PlatformSection
        section="platforms"
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
});
