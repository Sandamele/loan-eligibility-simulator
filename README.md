# Loan Eligibility Simulator
The **Loan Eligibility Simulator** is a streamlined full-stack application designed to help users determine their loan qualification status instantly based on their financial profile.

## Project Description
The **Loan Eligibility Simulator** is a customer-facing tool that provides instant feedback on loan applications. The goal is to create a high-conversion, responsive UI that simplifies complex financial calculations into a user-friendly experience.

## Folder Structure
The project is organized into a decoupled architecture, separating the client-side interface from the server-side logic.

```bash
loan-eligibility-simulator/
├── backend/            # API services and business logic
├── frontend/           # User interface and client-side state
├── .gitignore          # Version control exclusion rules
├── docker-compose.yml  # Container orchestration
└── README.md           # Project documentation
```
## Getting Started
The easiest way to get the simulator up and running is using Docker, which ensures the environment is consistent across all machines.

### Prerequisites
- Docker
- Docker Compose

### Installation & Deployment
#### Clone the repository:
```bash 
git clone https://github.com/Sandamele/loan-eligibility-simulator
cd loan-eligibility-simulator
cd backend
cp .env.example .env
cd ../frontend
cp .env.example .env
cd ../
```

#### Run docker 
```bash
VITE_API_URL=http://localhost:1337 docker-compose up --build -d
```
## Access & Endpoints
| Service   | URL                                 | Port Mapping |
|-----------|-------------------------------------|-------------|
| Frontend  | [http://localhost:5173](http://localhost:5173) | 5173:80     |
| Backend   | [http://localhost:1337](http://localhost:1337) | 1337:1337   |

## Technology Stack
- Frontend: Vite, React, Typescript, Jest
- Backend: Node.js, Typescript, Jest
- Infrastructure: Docker, Docker Compose
