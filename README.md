# linkCompressor
Generate shorter links

## Location of the app

## Prerequisites
- Node.js (tested with Node 22)
- npm
- Docker (used to run MongoDB locally)

## Setup

### 1. Install dependencies
```bash
npm install
npm run client:install
```

### 2. Configure the app
This project uses [`config`](https://www.npmjs.com/package/config), which reads
`config/default.json`. This file is gitignored (it holds secrets) and must be
created manually.

Create `config/default.json` in the project root:
```json
{
  "port": 5000,
  "mongoURL": "mongodb://localhost:27017/linkCompressor",
  "jwtSecret": "change_this_secret_in_production",
  "baseURL": "http://localhost:5000"
}
```

### 3. Start MongoDB (via Docker)
```bash
docker run -d --name linkcompressor-mongo -p 27017:27017 -v linkcompressor-mongo-data:/data/db mongo:5
```

Next time, if the container was stopped, just start it again instead of recreating it:
```bash
docker start linkcompressor-mongo
```

Useful commands:
```bash
docker ps                            # check it's running
docker logs linkcompressor-mongo     # view MongoDB logs
docker stop linkcompressor-mongo     # stop it
docker rm linkcompressor-mongo       # remove the container (data volume persists)
```

## Running the project

### Development (backend + client together, with hot reload)
```bash
npm run dev
```
- Backend (Express + nodemon): http://localhost:5000
- Frontend (React dev server): http://localhost:3000

### Backend only
```bash
npm run server
```

### Client only
```bash
npm run client
```

### Production
Build the client, then start the server in production mode (it will serve the
built client from `client/build`):
```bash
npm run client:build
npm start
```

## Tech stack
- Backend: Node.js, Express 5, Mongoose 9, JWT auth, bcryptjs.
- Frontend: React 19, react-router-dom 7, built with Vite (migrated from
  Create React App).

## Notes
- The client uses Vite instead of `react-scripts`/webpack, so there are no
  OpenSSL legacy-provider issues on modern Node versions.
- If port 3000 is already in use, Vite automatically falls back to the next
  free port (3001, 3002, ...) and prints the actual URL in the console.
- `config/default.json` and `client/node_modules` are intentionally not
  committed to git; follow the setup steps above after cloning.
