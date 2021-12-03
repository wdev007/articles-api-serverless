class AppError extends Error {
  private body: any;
  constructor(private status: number, public message: any) {
    super();
  }

  getStatus() {
    return this.status;
  }

  getBody() {
    return this.body;
  }
}

export default AppError;