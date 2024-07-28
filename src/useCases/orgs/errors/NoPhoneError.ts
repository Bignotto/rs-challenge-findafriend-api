export class NoPhoneError extends Error {
  constructor() {
    super("Phone number required");
  }
}
