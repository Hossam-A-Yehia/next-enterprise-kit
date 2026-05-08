/**
 * Shared utilities for Scale Kit workspaces.
 */

export const APP_NAME = "Scale Kit" as const;

export function assertDefined<T>(
  value: T | null | undefined,
  message = "Expected a defined value",
): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error(message);
  }
}
