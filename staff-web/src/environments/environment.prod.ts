
const serverUrl = ''

export const environment = {
  production: true,
  restEndpointUrl: serverUrl + '/api',
  serverPubKey: `-----BEGIN PUBLIC KEY-----
  MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA2VO6BGTgz0tkrDYEABUN
  syxLLOfE0yrly8F5usSFp3240qzqOHugOPgAYD0wTlv+WMiu4u8JEs3F3tQjE/c4
  KFIDPzngNXNzaP2UeREHTIf8pHyoGkTFgzXESzG/gr/js3uRC+xcIAFWXrLLAZoE
  Gsc/FtmhaR6jrmesGcxzi5Y78cbH8s9gxWZK+95C3iEWU1MMMV2ahjLfxRgGVJ/w
  ZnJoi3QMrk4KRsl3bEEp+gTrriU+3NGXTxZdHhKlBQl9U6E10YWL47vI7EL52grc
  jM4DCx7HzgmAAnm1dAtYL30zBHSASHBCi9Stz1WDxogwX4CKoks3FSJx5yc4G1WP
  tjTyPUvL6IDCdbtxFU2WC2GjSFDtKX0uPxVImrrZ2/F/dImGaD48TMUw94J0g4/+
  2cUuceK3KR32nsBqwO7EuOAW62O2a0OpzNciHWajeKXeqgnWwdRGdtXD2DcLhGcq
  umKTwf/TvwuwH7rgs/0xtETtQv7WB14grcKciCVD/VIq9yAr+XjnomkEk29HOPoQ
  1L8plGZdFYeCCnfRBBry1S/nNFWRQah7/FPClaIstrHbXY9RE7iqd2s5C4S4dQ9s
  ul77EzaGpsmVO4MvbZtms4LgJzVe/7l0LHmRHlHpAdw8O8PplA9XQ08+F4mJZlVL
  dJGPZLG7oP+zLZKANd5WyRkCAwEAAQ==
  -----END PUBLIC KEY-----
  `,
  apiEndpointUrl: serverUrl + '/api',
  loginEndpointUrl: serverUrl + '/api/login',
  loginValidateEndpointUrl: serverUrl + '/api/validate',
}
