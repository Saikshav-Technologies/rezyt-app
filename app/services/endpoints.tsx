//create endpoints class to put all the api endpoints here

export class Endpoints {
  private static readonly BASE_URL =
    "https://rezyt-backend.onrender.com/api/v1";
  public static readonly LOGIN = "/auth/login";

  public static getBaseUrl(): string {
    return Endpoints.BASE_URL;
  }
}
