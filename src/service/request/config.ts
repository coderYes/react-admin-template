let BASE_URL = ''
const TIME_OUT = 10000

if (import.meta.env.MODE === 'development') {
  BASE_URL = 'http://localhost:3000'
} else if (import.meta.env.MODE === 'production') {
  BASE_URL = 'http://localhost:3000'
} else {
  BASE_URL = 'http://localhost:3000'
}

const OSS_PATH = 'http://localhost:3000'
export { BASE_URL, TIME_OUT, OSS_PATH }
