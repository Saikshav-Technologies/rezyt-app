interface LoginResponse {
  status: string;
  data: {
    refreshToken: string;
    token: string;
  };
  message: string;
}

export default LoginResponse;
