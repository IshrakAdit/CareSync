### user_Locations

| Column      | Data Type                                             |
| ----------- | ----------------------------------------------------- |
| id          | SERIAL PRIMARY KEY                                    |
| user_id     | INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE |
| address     | TEXT                                                  |
| thana       | VARCHAR(100)                                          |
| po          | VARCHAR(100)                                          |
| city        | VARCHAR(100)                                          |
| postal_code | VARCHAR(20)                                           |

### hospital_Locations

| Column      | Data Type                                                 |
| ----------- | --------------------------------------------------------- |
| id          | SERIAL PRIMARY KEY                                        |
| hospital_id | INTEGER UNIQUE REFERENCES hospitals(id) ON DELETE CASCADE |
| address     | TEXT                                                      |
| thana       | VARCHAR(100)                                              |
| po          | VARCHAR(100)                                              |
| city        | VARCHAR(100)                                              |
| postal_code | VARCHAR(20)                                               |

### doctor_Locations

| Column      | Data Type                                               |
| ----------- | ------------------------------------------------------- |
| id          | SERIAL PRIMARY KEY                                      |
| doctor_id   | INTEGER UNIQUE REFERENCES doctors(id) ON DELETE CASCADE |
| address     | TEXT                                                    |
| thana       | VARCHAR(100)                                            |
| po          | VARCHAR(100)                                            |
| city        | VARCHAR(100)                                            |
| postal_code | VARCHAR(20)                                             |

### users

| Column        | Data Type                                                       |
| ------------- | --------------------------------------------------------------- |
| id            | SERIAL PRIMARY KEY                                              |
| name          | VARCHAR(100)                                                    |
| email         | VARCHAR(100) UNIQUE NOT NULL                                    |
| password_hash | VARCHAR(255) NOT NULL                                           |
| location_id   | INTEGER UNIQUE REFERENCES user_Locations(id) ON DELETE SET NULL |

### hospitals

| Column       | Data Type                                                           |
| ------------ | ------------------------------------------------------------------- |
| id           | SERIAL PRIMARY KEY                                                  |
| name         | VARCHAR(150) NOT NULL                                               |
| phone_number | VARCHAR(20)                                                         |
| website      | VARCHAR(255)                                                        |
| location_id  | INTEGER UNIQUE REFERENCES hospital_Locations(id) ON DELETE SET NULL |
| types        | hospital_type_enum[] NOT NULL                                       |
| icus         | SMALLINT                                                            |

### ratings

| Column      | Data Type                                          |
| ----------- | -------------------------------------------------- |
| id          | SERIAL PRIMARY KEY                                 |
| user_id     | INTEGER REFERENCES Users(id) ON DELETE CASCADE     |
| hospital_id | INTEGER REFERENCES Hospitals(id) ON DELETE CASCADE |
| rating      | SMALLINT CHECK (rating BETWEEN 1 AND 5)            |
| review_text | TEXT                                               |
| created_at  | TIMESTAMP DEFAULT CURRENT_TIMESTAMP                |
| updated_at  | TIMESTAMP DEFAULT CURRENT_TIMESTAMP                |

### departments

| Column      | Data Type             |
| ----------- | --------------------- |
| id          | SERIAL PRIMARY KEY    |
| name        | VARCHAR(100) NOT NULL |
| description | TEXT                  |

### doctors

| Column        | Data Type                                                         |
| ------------- | ----------------------------------------------------------------- |
| id            | SERIAL PRIMARY KEY                                                |
| name          | VARCHAR(100) NOT NULL                                             |
| specialties   | TEXT[] NOT NULL                                                   |
| phone_number  | VARCHAR(20)                                                       |
| email         | VARCHAR(100)                                                      |
| location_id   | INTEGER UNIQUE REFERENCES Doctor_Locations(id) ON DELETE SET NULL |
| department_id | INTEGER REFERENCES Departments(id)                                |

### doctor_Hospital

| Column            | Data Type                                          |
| ----------------- | -------------------------------------------------- |
| id                | SERIAL PRIMARY KEY                                 |
| doctor_id         | INTEGER REFERENCES Doctors(id) ON DELETE CASCADE   |
| hospital_id       | INTEGER REFERENCES Hospitals(id) ON DELETE CASCADE |
| appointment_times | TIMESTAMP[]                                        |
| weekly_schedule   | TEXT[]                                             |
| appointment_fee   | NUMERIC(10, 2)                                     |

### diagnostic_Tests

| Column      | Data Type             |
| ----------- | --------------------- |
| id          | SERIAL PRIMARY KEY    |
| name        | VARCHAR(100) NOT NULL |
| description | TEXT                  |

### hospital_diagnostic_tests

| Column       | Data Type                                                 |
| ------------ | --------------------------------------------------------- |
| id           | SERIAL PRIMARY KEY                                        |
| hospital_id  | INTEGER REFERENCES Hospitals(id) ON DELETE CASCADE        |
| test_id      | INTEGER REFERENCES Diagnostic_Tests(id) ON DELETE CASCADE |
| cost         | NUMERIC(10, 2)                                            |
| availability | VARCHAR(50)                                               |

### hospital_departments

| Column         | Data Type                                          |
| -------------- | -------------------------------------------------- |
| id             | SERIAL PRIMARY KEY                                 |
| hospital_id    | INTEGER REFERENCES Hospitals(id) ON DELETE CASCADE |
| department_id  | INTEGER REFERENCES Departments(id)                 |
| head_doctor_id | INTEGER REFERENCES Doctors(id)                     |
| contact_number | VARCHAR(20)                                        |
| beds           | SMALLINT                                           |
| available_days | TEXT[]                                             |

### hospital_admin

| Column        | Data Type                                          |
| ------------- | -------------------------------------------------- |
| id            | SERIAL PRIMARY KEY                                 |
| email         | VARCHAR(100) UNIQUE NOT NULL                       |
| password_hash | VARCHAR(255) NOT NULL                              |
| hospital_id   | INTEGER REFERENCES Hospitals(id) ON DELETE CASCADE |
