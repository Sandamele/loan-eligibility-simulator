# Frontend Project

## Required
- Nodejs v22+
- Docker
- npm

## Setup env
```bash
cp .env.example .env
```
- Open .env and update any required values, such as VITE_API_URL.
- Make sure VITE_API_URL points to your backend API (default: http://localhost:1337).

## Run in dev
```bash
npm install
npm run dev
```
- Starts a development server on http://localhost:5173 by default.
- Hot-reloading enabled for instant feedback on code changes.

## Run with docker
```bash
docker build --build-arg VITE_API_URL=http://localhost:1337 -t loan-frontend:0.0.1 .
docker run -p 5173:80 -e VITE_API_URL=http://localhost:1337 loan-frontend:0.0.1
```
- The frontend will connect to the backend at the URL specified in VITE_API_URL.
- Port 5173 on your machine maps to port 80 in the container.

## Run Unit Test (Jest)
```bash
  npm run test
```
