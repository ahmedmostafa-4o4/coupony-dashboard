import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { StoreVerificationsFilters } from "./store-verifications-filters";
import type { StoreVerificationsDictionary } from "../utils/get-dictionary";

vi.mock("@/features/admin/stores/hooks/use-stores-list", () => ({
  useStoresList: vi.fn(() => ({ items: [], isLoading: false })),
}));

const mockDict = {
  list: { columns: { status: "Status" } },
  status: { pending: "Pending", approved: "Approved", rejected: "Rejected" },
} as StoreVerificationsDictionary;

describe("StoreVerificationsFilters", () => {
  const defaultValues = { search: "", status: "all" };

  it("renders correctly with default values", () => {
    const onChange = vi.fn();
    const onReset = vi.fn();

    render(
      <StoreVerificationsFilters
        values={defaultValues}
        onChange={onChange}
        onReset={onReset}
        dict={mockDict}
      />
    );

    // The search field should be rendered
    const searchInput = screen.getByPlaceholderText(/search verifications/i);
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveValue("");

    // The status select should be rendered with 'all' (usually represented by text like "All statuses" depending on AdminFilterBar implementation)
    // We can just verify the reset button exists
    const resetButton = screen.getByRole("button", { name: /reset/i });
    expect(resetButton).toBeInTheDocument();
  });

  it("calls onChange when search input changes", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onReset = vi.fn();

    render(
      <StoreVerificationsFilters
        values={defaultValues}
        onChange={onChange}
        onReset={onReset}
        dict={mockDict}
      />
    );

    const searchInput = screen.getByPlaceholderText(/search verifications/i);
    // Type a single character since the component is controlled and we aren't updating `values` prop in this simple test render
    await user.type(searchInput, "a");

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
      const lastCall = onChange.mock.lastCall?.[0];
      expect(lastCall).toMatchObject({ search: "a" });
    });
  });

  it("calls onReset when clear button is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onReset = vi.fn();

    render(
      <StoreVerificationsFilters
        values={{ search: "some search", status: "pending" }}
        onChange={onChange}
        onReset={onReset}
        dict={mockDict}
      />
    );

    const resetButton = screen.getByRole("button", { name: /reset/i });
    await user.click(resetButton);

    expect(onReset).toHaveBeenCalledOnce();
  });
});
