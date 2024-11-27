//create endpoints class to put all the api endpoints here

export class Endpoints {
  private static readonly BASE_URL = "https://rezyt-backend.vercel.app/api/v1";
  public static readonly LOGIN = "/auth/login";
  public static readonly REGISTER = "/auth/signup";
  public static readonly FORGOT_PASSWORD = "/auth/forgotPassword";
  public static readonly OTP = "/auth/otp";
  public static readonly OTP_REGISTER = "/auth/send-phone-otp";
  public static readonly OTP_VERIFY = "/auth/verify-phone-otp";
  public static readonly VERIFY_FORGOT_OTP = "/auth/verify-forgot-otp";
  public static readonly RESET_PASSWORD = "/auth/resetPassword";

  public static getBaseUrl(): string {
    return Endpoints.BASE_URL;
  }
}
