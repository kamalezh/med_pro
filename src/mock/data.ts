// Health schema types and options — mock data arrays removed.
export type Role = "patient" | "doctor" | "admin";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  phone?: string;
  department?: string;
  specialization?: string;
  experience?: number;
  bio?: string;
  address?: string;
  emergencyContact?: string;
  dob?: string;
  bloodGroup?: string;
}

export const users: MockUser[] = [];

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  phone: string;
  email: string;
  bloodGroup: string;
  address: string;
  lastVisit: string;
  status: "Active" | "Inactive" | "Critical";
  condition?: string;
}

export const firstNames = ["Sarah","John","Emma","Michael","Olivia","James","Sophia","Liam","Ava","Noah"];
export const lastNames = ["Johnson","Smith","Williams","Brown","Jones","Garcia","Miller","Davis","Martinez","Hernandez"];
export const conditions = ["Hypertension","Diabetes","Asthma","Migraine","Arthritis","Anemia","Allergies","Healthy","Cardiac follow-up","Post-surgery"];
export const cities = ["New York","Boston","Chicago","Seattle","Austin","Denver","Miami","Portland"];

export const patients: Patient[] = [];

export interface Doctor {
  id: string;
  name: string;
  department: string;
  specialization: string;
  experience: number;
  rating: number;
  patients: number;
  availability: "Available" | "In Surgery" | "On Leave";
  email: string;
  phone: string;
  image?: string;
}

export const departments = ["Cardiology","Neurology","Orthopedics","Pediatrics","Dermatology","General Medicine","Ophthalmology","Dentistry"];
export const specs = ["Interventional","Surgical","Preventive","Diagnostic","Emergency","Chronic Care","Pediatric","Geriatric"];

export const doctors: Doctor[] = [];

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientEmail?: string;
  doctorId: string;
  doctorName: string;
  department: string;
  date: string;
  time: string;
  token: number;
  status: "Pending" | "Approved" | "Completed" | "Cancelled" | "Rejected";
  type: "Consultation" | "Follow-up" | "Emergency" | "Check-up";
  reason?: string;
}

export const appointments: Appointment[] = [];

export interface Camp {
  id: string;
  name: string;
  description: string;
  date: string;
  endDate: string;
  location: string;
  status: "Upcoming" | "Ongoing" | "Completed";
  registered: number;
  capacity: number;
  doctorsAssigned: string[];
  volunteersAssigned: string[];
  services: string[];
  image?: string;
}

export const campNames = ["Community Heart Health","Rural Vision Care","Diabetes Awareness","Free Dental Check-up","Child Immunization","Women's Wellness","Senior Care Camp","Mental Health Support","Cancer Screening","Blood Donation Drive"];
export const locations = ["Central Park","City Hall Plaza","Riverside Community Center","Downtown Convention Hall","Sunrise School","Green Valley Village","North Bay Hospital Grounds","West Side Community"];

export const camps: Camp[] = [];

export interface Prescription {
  id: string;
  patientId: string;
  patientName?: string;
  patientEmail?: string;
  doctorName: string;
  date: string;
  diagnosis: string;
  medicines: { name: string; dosage: string; frequency: string; duration: string }[];
  notes: string;
}

export const prescriptions: Prescription[] = [];

export interface LabReport {
  id: string;
  patientId: string;
  test: string;
  date: string;
  status: "Pending" | "Completed" | "In Progress";
  result?: string;
  doctorName: string;
}

export const tests = ["Complete Blood Count","Lipid Profile","Blood Sugar (Fasting)","Thyroid (TSH)","Liver Function","Kidney Function","Urine Analysis","ECG","X-Ray Chest","MRI Brain"];
export const labReports: LabReport[] = [];

export interface MedHistoryEntry {
  id: string;
  date: string;
  type: string;
  description: string;
  doctor: string;
}
export const medicalHistory: MedHistoryEntry[] = [];

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
}
export const notifications: NotificationItem[] = [];

export interface ActivityLog {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  ip: string;
}
export const activityLogs: ActivityLog[] = [];

// Dynamic Chart data empty structures
export const appointmentsByMonth: { month: string; appointments: number; completed: number }[] = [];
export const patientsByDept: { name: string; value: number }[] = [];
export const campParticipation: { camp: string; registered: number; attended: number }[] = [];
export const revenueTrend: { month: string; revenue: number }[] = [];

export const testimonials = [
  { name: "MediCamp Platform", role: "Healthcare Network", text: "Streamlined medical camps, patient registrations and hospital appointments.", rating: 5 },
];

export const faqs = [
  { q: "How do I register for a medical camp?", a: "Sign in as a Patient, go to Medical Camps and click Register on any upcoming camp. You will receive a QR code confirmation." },
  { q: "Are the camps free?", a: "Yes. All screenings, basic diagnostics and medication distributed at camps are provided free of charge." },
  { q: "Can I book a regular hospital appointment here?", a: "Save time by using the Book Appointment feature to select a doctor, date and time." },
  { q: "How is patient medical data protected?", a: "We follow enterprise-grade encryption at rest and in transit. Role-based access ensures only authorized staff access records." },
];

export const departmentsList = departments;
