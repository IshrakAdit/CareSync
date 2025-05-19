CREATE TABLE user_Locations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    address TEXT,
    thana VARCHAR(100),
    po VARCHAR(100),
    city VARCHAR(100),
    postal_code VARCHAR(20)
);

CREATE TABLE hospital_Locations (
    id SERIAL PRIMARY KEY,
    hospital_id INTEGER UNIQUE REFERENCES hospitals(id) ON DELETE CASCADE,
    address TEXT,
    thana VARCHAR(100),
    po VARCHAR(100),
    city VARCHAR(100),
    postal_code VARCHAR(20)
);

CREATE TABLE doctor_Locations (
    id SERIAL PRIMARY KEY,
    doctor_id INTEGER UNIQUE REFERENCES doctors(id) ON DELETE CASCADE,
    address TEXT,
    thana VARCHAR(100),
    po VARCHAR(100),
    city VARCHAR(100),
    postal_code VARCHAR(20)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    location_id INTEGER UNIQUE REFERENCES user_Locations(id) ON DELETE SET NULL
);

CREATE TYPE hospital_type_enum AS ENUM ('public', 'private', 'specialized', 'clinic', 'other');

CREATE TABLE hospitals (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    phone_number VARCHAR(20),
    website VARCHAR(255),
    location_id INTEGER UNIQUE REFERENCES hospital_Locations(id) ON DELETE SET NULL,
    types hospital_type_enum[] NOT NULL,
    icus SMALLINT
);

CREATE TABLE ratings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(id) ON DELETE CASCADE,
    hospital_id INTEGER REFERENCES Hospitals(id) ON DELETE CASCADE,
    rating SMALLINT CHECK (rating BETWEEN 1 AND 5),
    review_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    specialties TEXT[] NOT NULL,
    phone_number VARCHAR(20),
    email VARCHAR(100),
    location_id INTEGER UNIQUE REFERENCES Doctor_Locations(id) ON DELETE SET NULL,
    department_id INTEGER REFERENCES Departments(id)
);

CREATE TABLE doctor_Hospital (
    id SERIAL PRIMARY KEY,
    doctor_id INTEGER REFERENCES Doctors(id) ON DELETE CASCADE,
    hospital_id INTEGER REFERENCES Hospitals(id) ON DELETE CASCADE,
    appointment_times TIMESTAMP[],
    weekly_schedule TEXT[], -- e.g., ["Monday 9:00-12:00", "Wednesday 14:00-17:00"]
    appointment_fee NUMERIC(10, 2)
);

CREATE TABLE diagnostic_Tests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE hospital_diagnostic_tests (
    id SERIAL PRIMARY KEY,
    hospital_id INTEGER REFERENCES Hospitals(id) ON DELETE CASCADE,
    test_id INTEGER REFERENCES Diagnostic_Tests(id) ON DELETE CASCADE,
    cost NUMERIC(10, 2),
    availability VARCHAR(50)
);

CREATE TABLE hospital_departments (
    id SERIAL PRIMARY KEY,
    hospital_id INTEGER REFERENCES Hospitals(id) ON DELETE CASCADE,
    department_id INTEGER REFERENCES Departments(id),
    head_doctor_id INTEGER REFERENCES Doctors(id),
    contact_number VARCHAR(20),
    beds SMALLINT,
    available_days TEXT[] -- e.g., ['Monday', 'Tuesday']
);

CREATE TABLE hospital_admin (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    hospital_id INTEGER REFERENCES Hospitals(id) ON DELETE CASCADE
);


