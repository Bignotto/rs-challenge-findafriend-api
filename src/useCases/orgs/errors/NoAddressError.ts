export class NoAddressError extends Error {
  constructor() {
    super("Complete address required");
  }
}
