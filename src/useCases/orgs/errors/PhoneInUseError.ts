export class PhoneInUseError extends Error {
  constructor() {
    super("Phone number already in use.");
  }
}
