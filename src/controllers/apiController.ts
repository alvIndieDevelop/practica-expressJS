interface PingResponse {
  message: string;
}

export default class ApiController {
  public async ping(): Promise<PingResponse> {
    return {
      message: "pong",
    };
  }
}
