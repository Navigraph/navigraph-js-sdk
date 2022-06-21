/* eslint-disable max-classes-per-file */
export class NotInitializedError extends Error {
  constructor(source?: string) {
    const message = source
      ? `[${source}] Navigraph app is not initialized.`
      : "Navigraph app is not initialized.";
    super(message);
    this.name = "NotInitializedError";
  }
}
