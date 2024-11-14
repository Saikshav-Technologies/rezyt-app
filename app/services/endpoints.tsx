//create endpoints class to put all the api endpoints here

export class Endpoints {
  private static readonly BASE_URL = "https://rezyt-backend.vercel.app/api/v1";
  public static readonly LOGIN = "/auth/login";
  public static readonly REGISTER = "/auth/signup";
  public static readonly FORGOT_PASSWORD = "/auth/forgotPassword";

  public static getBaseUrl(): string {
    return Endpoints.BASE_URL;
  }
}
