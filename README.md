# CareSync

## CSE408 Software Development Project

**April, 2025 - July, 2025**

CareSync is a smart healthcare support platform that streamlines interactions between patients and hospitals. It delivers fast, reliable, and up-to-date information on doctors and hospital services, and supports access to charitable assistance through trusted organization — all within a user-friendly application.

---

## Collaborators

CareSync is built in collaboration with [**Helping Hand For Needy**](https://hhfn.org.bd), a non-profit organization dedicated to supporting individuals in hospitals who struggle to afford treatment.

---

## Features

- Search hospitals by need, cost, and location
- Discover doctors by specialty, condition and cost
- Find doctor schedules' across hospitals
- Submit and view hospital reviews and ratings
- Access charity and support options

---

## Architecture

- CareSync is built using a **microservices architecture**. Each core service is independently built using **Spring Boot**. All services communicate over REST APIs and are containerized with **Docker** and orchestrated using **Kubernetes (K8s)**. Services and the **PostgreSql** database are deployed on **Azure**

### Microservices

- **User Service** – Handles user registration, authentication, and profiles
- **Hospital Service** – Manages general hospital information
- **Doctor Service** – Manages doctor profiles, specialties, and hospital mappings
- **Review Service** – Stores and retrieves user reviews and ratings
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
- Kubernetes (Production Deployment)
- Helm (K8s management)
- Azure (Cloud Hosting)

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
   git clone --recurse-submodules https://github.com/Ishrak-Adit07/CareSync.git
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
├── client/                    # React frontend
├── services/                  # Spring Boot microservice
│   ├── user-service/
│   ├── hospital-service/
│   ├── doctor-service/
│   ├── review-service/
│   ├── charity-service/
|   └── docker-compose.yml
├── k8s/                       # Kubernetes manifests
└── docs/
```

---

## Contributors

- [**H M Shadman Tabib**](https://github.com/shadmantabib)
- [**Mohammad Ishrak Adit**](https://github.com/Ishrak-Adit07)
- [**Hasnain Adil**](https://github.com/hasnainadil)

---

## License

This project is licensed under the MIT License.

---

## External Resources

- Collaborator Organization — [**Helping Hand For Needy**](https://hhfn.org.bd)
