export class EmailInUseError extends Error {
  constructor() {
    super("EMail already in use.");
  }
}
