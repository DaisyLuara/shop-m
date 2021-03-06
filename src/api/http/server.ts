const devEnv = {
  SERVER_URL: 'http://mapi.xingstation.net',
}
const testEnv = {
  SERVER_URL: 'http://mapi.xingstation.net',
}
const prodEnv = {
  SERVER_URL: 'http://mapi.xingstation.com',
}
const baseENV =
  process.env.NODE_ENV === 'production' && !process.env.REACT_APP_TEST_ENV
    ? prodEnv
    : process.env.NODE_ENV === 'development'
    ? devEnv
    : testEnv

export default baseENV
