# CareSync Database Schema

## Users

| Column        | Data Type    | Constraints      |
| ------------- | ------------ | ---------------- |
| id            | SERIAL       | PRIMARY KEY      |
| name          | VARCHAR(100) |                  |
| email         | VARCHAR(100) | UNIQUE, NOT NULL |
| password_hash | VARCHAR(255) | NOT NULL         |
| location      | VARCHAR(100) |                  |

## Hospitals

| Column       | Data Type    | Constraints |
| ------------ | ------------ | ----------- |
| id           | SERIAL       | PRIMARY KEY |
| name         | VARCHAR(150) |             |
| address      | TEXT         |             |
| phone_number | VARCHAR(20)  |             |
| website      | VARCHAR(255) |             |
| location     | VARCHAR(100) |             |
| type         | VARCHAR(50)  |             |
| icus         | INTEGER      |             |

## Ratings

| Column      | Data Type | Constraints                                |
| ----------- | --------- | ------------------------------------------ |
| id          | SERIAL    | PRIMARY KEY                                |
| user_id     | INTEGER   | REFERENCES Users(id) ON DELETE CASCADE     |
| hospital_id | INTEGER   | REFERENCES Hospitals(id) ON DELETE CASCADE |
| rating      | INTEGER   | CHECK (rating BETWEEN 1 AND 5)             |
| review_text | TEXT      |                                            |
| created_at  | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP                  |
| updated_at  | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP                  |

## Departments

| Column      | Data Type    | Constraints |
| ----------- | ------------ | ----------- |
| id          | SERIAL       | PRIMARY KEY |
| name        | VARCHAR(100) |             |
| description | TEXT         |             |

## Doctors

| Column        | Data Type    | Constraints                |
| ------------- | ------------ | -------------------------- |
| id            | SERIAL       | PRIMARY KEY                |
| name          | VARCHAR(100) |                            |
| specialty     | VARCHAR(100) |                            |
| phone_number  | VARCHAR(20)  |                            |
| email         | VARCHAR(100) |                            |
| location      | VARCHAR(100) |                            |
| department_id | INTEGER      | REFERENCES Departments(id) |

## Doctor_Hospital

| Column           | Data Type     | Constraints              |
| ---------------- | ------------- | ------------------------ |
| id               | SERIAL        | PRIMARY KEY              |
| doctor_id        | INTEGER       | REFERENCES Doctors(id)   |
| hospital_id      | INTEGER       | REFERENCES Hospitals(id) |
| appointment_time | TIMESTAMP     |                          |
| weekly_schedule  | TEXT          |                          |
| appointment_fee  | DECIMAL(10,2) |                          |

## Diagnostic_Tests

| Column      | Data Type    | Constraints |
| ----------- | ------------ | ----------- |
| id          | SERIAL       | PRIMARY KEY |
| name        | VARCHAR(100) |             |
| description | TEXT         |             |

## Hospital_Diagnostic_Tests

| Column       | Data Type     | Constraints                     |
| ------------ | ------------- | ------------------------------- |
| id           | SERIAL        | PRIMARY KEY                     |
| hospital_id  | INTEGER       | REFERENCES Hospitals(id)        |
| test_id      | INTEGER       | REFERENCES Diagnostic_Tests(id) |
| cost         | DECIMAL(10,2) |                                 |
| availability | VARCHAR(50)   |                                 |

## Hospital_Departments

| Column         | Data Type   | Constraints                |
| -------------- | ----------- | -------------------------- |
| id             | SERIAL      | PRIMARY KEY                |
| hospital_id    | INTEGER     | REFERENCES Hospitals(id)   |
| department_id  | INTEGER     | REFERENCES Departments(id) |
| head_doctor_id | INTEGER     | REFERENCES Doctors(id)     |
| contact_number | VARCHAR(20) |                            |
| beds           | INTEGER     |                            |
| available_days | TEXT        |                            |

## User_Appointment

| Column             | Data Type   | Constraints                                            |
| ------------------ | ----------- | ------------------------------------------------------ |
| id                 | SERIAL      | PRIMARY KEY                                            |
| user_id            | INTEGER     | REFERENCES Users(id)                                   |
| doctor_hospital_id | INTEGER     | REFERENCES Doctor_Hospital(id)                         |
| appointment_time   | TIMESTAMP   |                                                        |
| status             | VARCHAR(20) | CHECK (status IN ('booked', 'cancelled', 'completed')) |
| created_at         | TIMESTAMP   | DEFAULT CURRENT_TIMESTAMP                              |

## Hospital_Admin

| Column        | Data Type    | Constraints              |
| ------------- | ------------ | ------------------------ |
| id            | SERIAL       | PRIMARY KEY              |
| email         | VARCHAR(100) | UNIQUE, NOT NULL         |
| password_hash | VARCHAR(255) | NOT NULL                 |
| hospital_id   | INTEGER      | REFERENCES Hospitals(id) |
