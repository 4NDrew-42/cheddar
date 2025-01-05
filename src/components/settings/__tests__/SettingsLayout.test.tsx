import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SettingsLayout from "../SettingsLayout";

// Mock child components
jest.mock("../ProfileSection", () => ({
  __esModule: true,
  default: () => <div data-testid="profile-section">Profile Section</div>,
}));

jest.mock("../NotificationSection", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="notification-section">Notification Section</div>
  ),
}));

jest.mock("../PlatformSection", () => ({
  __esModule: true,
  default: () => <div data-testid="platform-section">Platform Section</div>,
}));

jest.mock("../AppearanceSection", () => ({
  __esModule: true,
  default: () => <div data-testid="appearance-section">Appearance Section</div>,
}));

describe("SettingsLayout", () => {
  const mockInitialData = {
    profile: {
      name: "Test User",
      email: "test@example.com",
      timezone: "America/New_York",
      language: "en",
    },
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
    appearance: {
      theme: "light" as const,
      density: "comfortable" as const,
      timezone: "America/New_York",
    },
    platforms: {},
  };

  it("renders all section tabs", () => {
    render(<SettingsLayout initialData={mockInitialData} />);

    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Notifications")).toBeInTheDocument();
    expect(screen.getByText("Platforms")).toBeInTheDocument();
    expect(screen.getByText("Appearance")).toBeInTheDocument();
  });

  it("shows profile section by default", () => {
    render(<SettingsLayout initialData={mockInitialData} />);

    expect(screen.getByTestId("profile-section")).toBeInTheDocument();
    expect(
      screen.queryByTestId("notification-section"),
    ).not.toBeInTheDocument();
  });

  it("switches between sections when tabs are clicked", async () => {
    render(<SettingsLayout initialData={mockInitialData} />);

    // Click notifications tab
    await userEvent.click(screen.getByText("Notifications"));
    expect(screen.getByTestId("notification-section")).toBeInTheDocument();
    expect(screen.queryByTestId("profile-section")).not.toBeInTheDocument();

    // Click platforms tab
    await userEvent.click(screen.getByText("Platforms"));
    expect(screen.getByTestId("platform-section")).toBeInTheDocument();
    expect(
      screen.queryByTestId("notification-section"),
    ).not.toBeInTheDocument();

    // Click appearance tab
    await userEvent.click(screen.getByText("Appearance"));
    expect(screen.getByTestId("appearance-section")).toBeInTheDocument();
    expect(screen.queryByTestId("platform-section")).not.toBeInTheDocument();
  });

  it("shows success message when settings are saved", async () => {
    render(<SettingsLayout initialData={mockInitialData} />);

    // Trigger a save (this would typically be done by a child component)
    const profileSection = screen.getByTestId("profile-section");
    fireEvent(
      profileSection,
      new CustomEvent("update", { detail: { name: "New Name" } }),
    );

    // Wait for success message
    await waitFor(() => {
      expect(
        screen.getByText("Settings saved successfully"),
      ).toBeInTheDocument();
    });

    // Message should disappear after 3 seconds
    await waitFor(
      () => {
        expect(
          screen.queryByText("Settings saved successfully"),
        ).not.toBeInTheDocument();
      },
      { timeout: 4000 },
    );
  });

  it("maintains active tab state when switching sections", async () => {
    render(<SettingsLayout initialData={mockInitialData} />);

    // Click notifications tab
    const notificationsTab = screen.getByText("Notifications");
    await userEvent.click(notificationsTab);

    // Check if notifications tab has active styles
    expect(notificationsTab.closest("button")).toHaveClass(
      "bg-white",
      "text-blue-700",
    );

    // Other tabs should not have active styles
    expect(screen.getByText("Profile").closest("button")).not.toHaveClass(
      "bg-white",
      "text-blue-700",
    );
  });

  it("passes correct props to section components", () => {
    const { container } = render(
      <SettingsLayout initialData={mockInitialData} />,
    );

    // Check if Tab.Panel components receive the correct props
    const panels = container.querySelectorAll('[role="tabpanel"]');
    expect(panels.length).toBe(1); // Only the active panel should be in the DOM
    expect(panels[0]).toHaveClass("rounded-xl", "bg-white", "p-6");
  });
});
