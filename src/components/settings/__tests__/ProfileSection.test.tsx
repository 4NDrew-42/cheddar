import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProfileSection from "../ProfileSection";

describe("ProfileSection", () => {
  const mockInitialData = {
    profile: {
      name: "Test User",
      email: "test@example.com",
      timezone: "America/New_York",
      language: "en",
    },
  };

  const mockOnUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with initial data", () => {
    render(
      <ProfileSection
        section="profile"
        initialData={mockInitialData}
        onUpdate={mockOnUpdate}
      />,
    );

    expect(screen.getByDisplayValue("Test User")).toBeInTheDocument();
    expect(screen.getByDisplayValue("test@example.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("America/New_York")).toBeInTheDocument();
    expect(screen.getByDisplayValue("en")).toBeInTheDocument();
  });

  it("validates required fields", async () => {
    render(
      <ProfileSection
        section="profile"
        initialData={{}}
        onUpdate={mockOnUpdate}
      />,
    );

    const submitButton = screen.getByRole("button", { name: /save changes/i });
    await userEvent.click(submitButton);

    expect(await screen.findByText("Name is required")).toBeInTheDocument();
    expect(mockOnUpdate).not.toHaveBeenCalled();
  });

  it("validates email format", async () => {
    render(
      <ProfileSection
        section="profile"
        initialData={{}}
        onUpdate={mockOnUpdate}
      />,
    );

    const emailInput = screen.getByLabelText(/email/i);
    await userEvent.type(emailInput, "invalid-email");

    const submitButton = screen.getByRole("button", { name: /save changes/i });
    await userEvent.click(submitButton);

    expect(await screen.findByText("Invalid email format")).toBeInTheDocument();
    expect(mockOnUpdate).not.toHaveBeenCalled();
  });

  it("submits form with valid data", async () => {
    render(
      <ProfileSection
        section="profile"
        initialData={{}}
        onUpdate={mockOnUpdate}
      />,
    );

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const timezoneSelect = screen.getByLabelText(/timezone/i);
    const languageSelect = screen.getByLabelText(/language/i);

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "john@example.com");
    await userEvent.selectOptions(timezoneSelect, "America/New_York");
    await userEvent.selectOptions(languageSelect, "en");

    const submitButton = screen.getByRole("button", { name: /save changes/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith({
        profile: {
          name: "John Doe",
          email: "john@example.com",
          timezone: "America/New_York",
          language: "en",
        },
      });
    });
  });

  it("shows loading state during submission", async () => {
    mockOnUpdate.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100)),
    );

    render(
      <ProfileSection
        section="profile"
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

  it("handles avatar URL input", async () => {
    render(
      <ProfileSection
        section="profile"
        initialData={mockInitialData}
        onUpdate={mockOnUpdate}
      />,
    );

    const avatarInput = screen.getByLabelText(/avatar url/i);
    await userEvent.type(avatarInput, "https://example.com/avatar.jpg");

    const submitButton = screen.getByRole("button", { name: /save changes/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith(
        expect.objectContaining({
          profile: expect.objectContaining({
            avatar: "https://example.com/avatar.jpg",
          }),
        }),
      );
    });
  });

  it("preserves unmodified fields on submission", async () => {
    render(
      <ProfileSection
        section="profile"
        initialData={mockInitialData}
        onUpdate={mockOnUpdate}
      />,
    );

    const nameInput = screen.getByLabelText(/name/i);
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, "New Name");

    const submitButton = screen.getByRole("button", { name: /save changes/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith({
        profile: {
          ...mockInitialData.profile,
          name: "New Name",
        },
      });
    });
  });
});
