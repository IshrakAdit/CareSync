# CareSync

## CSE408 Software Development Project

**April, 2025 - July, 2025**

CareSync is a smart healthcare support platform that streamlines interactions between patients and hospitals. It delivers fast, reliable, and up-to-date information on doctors and hospital services, and supports access to charitable assistance through trusted organization — all within a user-friendly application.

---

## Core Features

- Search hospitals by need, cost, and location
- Discover doctors by specialty, condition and cost
- Find doctor schedules' across hospitals
- Submit and view hospital reviews and ratings
- Access charity and support options

---

## Development Team

- Backend & DevOps: [**Ishrak Adit**](https://github.com/Ishrak-Adit07)
- Backend & AI: [**H M Shadman Tabib**](https://github.com/shadmantabib)
- Frontend: [**Hasnain Adil**](https://github.com/hasnainadil)

---

## Collaborators

CareSync is built in collaboration with [**Helping Hand For Needy**](https://hhfn.org.bd), a non-profit organization dedicated to supporting individuals in hospitals who struggle to afford treatment.

---

## Architecture

- CareSync is built using a **microservices architecture**. Each core service is independently built using **Spring Boot**. All services communicate over REST APIs and are containerized with **Docker** and orchestrated using **Kubernetes (K8s)**. Services and the **PostgreSql** database are deployed on **Azure**

### Microservices

- **Auth Service** – Handles registration, authentication, and profile information
- **Data Service** – Manages and provides general hospital and doctor information
- **Location Service** – Manages and provides location information of users, hospitals or doctors
- **Feedback Service** – Stores and retrieves user reviews and ratings
- **Charity Service** – Connects users to our collaborator organization

---

## Tech Stack

### Backend

- Java 21
- Spring Boot (3.4.5)

### Database

- PostgreSQL (16.8)

### Frontend

- ReactJS (User Interface)

### DevOps & Cloud

- Docker Compose (Local Development)
- Remote VM (Production Deployment)
- Google Cloud (Cloud Hosting)

---

## Database Schema

The system supports a normalized relational schema for managing users, hospital and doctor information, reviews and ratings and supporting charity. See [`database schema`](./docs/database_docs/db_schema/db_schema.md) for full schema details.

---

## How to Run

### Prerequisites

- Docker
- env files

### Steps

1. **Clone the repository recursively**:

   ```bash
   git clone --recurse-submodules https://github.com/IshrakAdit/CareSync.git
   cd CareSync
   ```

2. **Start Development Environment**:

   ```bash
   docker-compose up --build -d
   ```

---

## Project Structure

```
caresync/
├── .github/workflows
│   ├── deploy.yaml       
├── clients/                   # Frontends
│   ├── web-app/               # ReactJS Web App
├── services/                  # Spring Boot microservice
│   ├── auth-service/
│   ├── data-service/
│   ├── location-service/
│   ├── feedback-service/
│   ├── charity-service/
|   └── init-db/
├── docker-compose.yaml
├── docker-compose.prod.yaml
└── docs/
```

---

## License

This project is licensed under the MIT License.

---

## External Resources

- Collaborator Organization — [**Helping Hand For Needy**](https://hhfn.org.bd)
