export default {
  meEndpoint: '/user-email',
  loginEndpoint: '/auth/login',
  signUpEndpoint: '/auth/signUp',
  forgetPasswordEndpoint: '/auth/forgotMyPassword',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
