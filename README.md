# RizzStore

## An example store page with a bit of memeing


### Live Demo

<!-- An example server is hosted [here](). -->

### Tech Stack

- Next.js
- NextAuth.js
- Supabase
- Motion.dev
- Bootstrap Icons

### Getting Started

Install modules

```bash
npm install
```

Create a .env.local file and add the following:

```
NEXTAUTH_URL=<YOUR_APP_URL>
NEXTAUTH_SECRET=<YOUR_SECRET>
NEXTAUTH_CALLBACK_URL=<YOUR_APP_URL>/api/auth/callback/github

SUPABASE_URL=<YOUR_SUPABASE_URL>
SUPABASE_ANON_KEY=<YOUR_SUPABASE_ANON_KEY>

NEXT_GITHUB_ID=<YOUR_GITHUB_ID>
NEXT_GITHUB_SECRET=<YOUR_GITHUB_SECRET>
```

To run the development server:

```bash
npm run dev
```

To run host server locally

``` bash
npm run gyat
```


