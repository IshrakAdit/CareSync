const API_BASE_URL = "http://localhost:8081";

import { Appointment, Rating } from "@/types";

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  token?: string;
  message?: string;
  error?: {
    code: string;
    message: string;
  };
}

interface FullAddress {
  address: string;
  thana: string;
  po: string;
  city: string;
  postalCode: string;
}

interface UserRegistration {
  userId: string;
  accessToken: string;
  name: string;
  email: string;
  password: string;
  fullAddress: FullAddress;
}

interface Hospital {
  id: number;
  name: string;
  address: string;
  phone_number: string;
  website?: string;
  location: string;
  type: "public" | "private";
  icus: number;
  rating: number;
}

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  phone_number: string;
  email: string;
}

interface Department {
  id: number;
  name: string;
  description: string;
  head_doctor_name: string;
  contact_number: string;
  beds: number;
  available_days: string[];
}

interface DiagnosticTest {
  id: number;
  name: string;
  description: string;
  cost: number;
  availability: string;
}

interface HospitalListItem {
  id: number;
  name: string;
  phoneNumber: string;
  website?: string;
  types: string[];
  icus: number;
  location: string | null;
}

class ApiClient {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem("auth_token");
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem("auth_token", token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem("auth_token");
  }

  async register(data: {
    name: string;
    email: string;
    password: string;
    location: string;
  }) {
    return this.request<{ success: boolean; message: string }>(
      "/auth/register",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  }

  async verifyOtp(data: { email: string; otp: string }) {
    return this.request<{ success: boolean; message: string }>(
      "/auth/verify-otp",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  }

  async login(data: { email: string; password: string }) {
    return this.request<{ success: boolean; token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async searchHospitals(filters: any) {
    const params = new URLSearchParams(filters).toString();
    return this.request(`/hospitals?${params}`);
  }

  async getHospital(id: string) {
    return this.request<Hospital>(`/hospitals/${id}`);
  }

  async getHospitalDoctors(id: string) {
    return this.request<Doctor[]>(`/hospitals/${id}/doctors`);
  }

  async getHospitalDepartments(id: string) {
    return this.request<Department[]>(`/hospitals/${id}/departments`);
  }

  async getHospitalTests(id: string) {
    return this.request<DiagnosticTest[]>(`/hospitals/${id}/tests`);
  }

  async getHospitalRatings(id: string) {
    return this.request<Rating[]>(`/hospitals/${id}/ratings`);
  }

  async addHospitalRating(
    id: string,
    data: { rating: number; review_text: string }
  ) {
    return this.request(`/hospitals/${id}/ratings`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateRating(
    id: string,
    data: { rating: number; review_text: string }
  ) {
    return this.request(`/ratings/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteRating(id: string) {
    return this.request(`/ratings/${id}`, {
      method: "DELETE",
    });
  }

  async getDoctor(id: string) {
    return this.request<Doctor>(`/doctors/${id}`);
  }

  async getDoctorHospitals(id: string) {
    return this.request(`/doctors/${id}/hospitals`);
  }

  async getAppointments() {
    return this.request<Appointment[]>("/appointments");
  }

  async bookAppointment(data: {
    doctor_hospital_id: number;
    appointment_time: string;
  }) {
    return this.request("/appointments", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async cancelAppointment(id: string) {
    return this.request(`/appointments/${id}`, {
      method: "DELETE",
    });
  }

  async adminLogin(data: { email: string; password: string }) {
    return this.request("/hospital-admin/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Admin API Methods
  async updateHospital(id: string, data: Partial<Hospital>) {
    return this.request(`/hospital-admin/hospitals/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async addDoctorToHospital(
    hospitalId: string,
    data: {
      doctor_id: number;
      appointment_time: string;
      weekly_schedule: string[];
      appointment_fee: number;
    }
  ) {
    return this.request(`/hospital-admin/hospitals/${hospitalId}/doctors`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async requestNewDoctor(
    hospitalId: string,
    data: {
      name: string;
      specialty: string;
      phone_number: string;
      email: string;
      location: string;
    }
  ) {
    return this.request(
      `/hospital-admin/hospitals/${hospitalId}/doctors/request`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  }

  async addTestToHospital(
    hospitalId: string,
    data: {
      test_id: number;
      cost: number;
      availability: string;
    }
  ) {
    return this.request(`/hospital-admin/hospitals/${hospitalId}/tests`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async requestNewTest(
    hospitalId: string,
    data: { name: string; description: string }
  ) {
    return this.request(
      `/hospital-admin/hospitals/${hospitalId}/tests/request`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  }

  async updateTest(
    hospitalId: string,
    testId: string,
    data: { cost: number; availability: string }
  ) {
    return this.request(
      `/hospital-admin/hospitals/${hospitalId}/tests/${testId}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );
  }

  async addDepartmentToHospital(
    hospitalId: string,
    data: {
      department_id: number;
      head_doctor_id: number;
      contact_number: string;
      beds: number;
      available_days: string[];
    }
  ) {
    return this.request(`/hospital-admin/hospitals/${hospitalId}/departments`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async requestNewDepartment(
    hospitalId: string,
    data: { name: string; description: string }
  ) {
    return this.request(
      `/hospital-admin/hospitals/${hospitalId}/departments/request`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  }

  async updateDepartmentHead(
    hospitalId: string,
    departmentId: string,
    data: { head_doctor_id: number }
  ) {
    return this.request(
      `/hospital-admin/hospitals/${hospitalId}/departments/${departmentId}/head`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );
  }

  async registerUser(data: UserRegistration) {
    console.log("registerUser");
    console.log(data);
    return this.request<{ success: boolean; message: string }>(
      "/user/v1/register",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  }

  async getAllHospitals() {
    return this.request<HospitalListItem[]>("/hospital/v1/all");
  }
}

export const apiClient = new ApiClient();
