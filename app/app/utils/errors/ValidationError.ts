class ValidationError extends Error {
  status: number;

  message: string;

  constructor(message: string, status: number = 400) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export default ValidationError;
