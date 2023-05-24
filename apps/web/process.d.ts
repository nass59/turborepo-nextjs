declare namespace NodeJS {
  export interface ProcessEnv {
    PREVIEW_URL_SECRET: string
    NEXT_PUBLIC_APP_URL: string
    NEXTAUTH_URL: string
    NEXTAUTH_SECRET: string
    GITHUB_ID: string
    GITHUB_SECRET: string
    GITHUB_ACCESS_TOKEN: string
    FACEBOOK_ID: string
    FACEBOOK_SECRET: string
    TWITTER_ID: string
    TWITTER_SECRET: string
    GOOGLE_ID: string
    GOOGLE_SECRET: string
    AUTH0_ID: string
    AUTH0_SECRET: string
    MONGODB_URI: string
    SMTP_HOST: string
    SMTP_PORT: string
    SMTP_USER: string
    SMTP_PASSWORD: string
    EMAIL_FROM: string
  }
}

export {}
