class AppError {
  private body: any;
  constructor(private status: number, public message: any) {
    this.body = {
      message
    }
  }

  getStatus() {
    return this.status;
  }

  getBody() {
    return this.body;
  }
}

export default AppError;
