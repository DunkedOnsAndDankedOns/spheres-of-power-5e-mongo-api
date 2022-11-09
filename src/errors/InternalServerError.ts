export default class NotFoundError extends Error {
  status = 500

  constructor(message: string) {
    super(message)
  }
}
