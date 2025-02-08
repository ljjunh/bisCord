export interface SignInDTO {
  email: string;
  password: string;
}

export interface SignInResponseDTO {
  accessToken: string;
}
export interface SignUpDTO {
  email: string;
  password: string;
  name: string;
}

export interface SocialSignInDTO {
  code: string;
}

export interface SocialSignInResponseDTO {
  accessToken: string;
}
