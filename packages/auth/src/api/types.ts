export interface TokenResponse {
  access_token: string
  expires_in: number
  token_type: string
  refresh_token: string
  error?: string
}

export interface AuthorizationResponse {
  device_code: string
  verification_uri: string
  verification_uri_complete: string
  user_code: string
  expires_in: number
  interval: number
}

export interface FailedAuthorizationResponse {
  message: string
  error_id: string
}
