# Loan Project Setup
## Required
- Nodejs v22+
- Docker
- npm

## Setup env
```bash
cp .env.example .env
```
- Open .env and fill in all required values (like database URL, API keys, PORT, etc.).
- Make sure the values are correct for your local environment.

## Run in dev
```bash
npm install
npm run dev
```
- Starts a local development server.
- Uses PORT from .env (default: 1337).
- Hot-reloading is enabled so code changes are reflected immediately.

## Run with docker
```bash
docker build -t loan-backend:0.0.1 .
docker run -p 1337:1337 --env-file .env loan-backend:0.0.1
```
- The application inside the container will use the same .env variables.
- Port 1337 on your machine maps to the container.

## API Endpoints
| API Name            | Method | Route                                            |
| ------------------- | ------ | ------------------------------------------------ |
| Loan Eligibility    | POST   | `http://localhost:1337/api/loans/eligibility`    |
| Loan Products       | GET    | `http://localhost:1337/api/loans/products`       |
| Calculate Loan Rate | POST   | `http://localhost:1337/api/loans/calculate-rate` |

## Run Unit Test (Jest)
```bash
  npm run test
```
