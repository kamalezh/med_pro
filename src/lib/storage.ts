import {
  Patient,
  Doctor,
  Appointment,
  Camp,
  Prescription,
  LabReport,
  MedHistoryEntry,
  NotificationItem,
  ActivityLog,
  MockUser,
} from "@/mock/data";

const KEYS = {
  PATIENTS: "mcm_patients_data",
  DOCTORS: "mcm_doctors_data",
  CAMPS: "mcm_camps_data",
  APPOINTMENTS: "mcm_appointments_data",
  PRESCRIPTIONS: "mcm_prescriptions_data",
  LAB_REPORTS: "mcm_lab_reports_data",
  MED_HISTORY: "mcm_med_history_data",
  NOTIFICATIONS: "mcm_notifications_data",
  ACTIVITY_LOGS: "mcm_activity_logs_data",
  USERS: "mcm_users_data",
};

// Generic helper to get data from localStorage
function getStoredData<T>(key: string, defaultValue: T[] = []): T[] {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return defaultValue;
  }
}

// Generic helper to save data to localStorage and dispatch custom event
function setStoredData<T>(key: string, data: T[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent("mcm_data_change", { detail: { key, data } }));
  } catch (e) {
    console.error(`Error writing ${key} to localStorage`, e);
  }
}

// PATIENTS
export const getPatients = (): Patient[] => getStoredData<Patient>(KEYS.PATIENTS, []);
export const savePatients = (data: Patient[]): void => setStoredData(KEYS.PATIENTS, data);
export const addPatient = (patient: Omit<Patient, "id"> & { id?: string }): Patient => {
  const current = getPatients();
  const newPatient: Patient = {
    ...patient,
    id: patient.id || `P${1000 + current.length + 1}`,
  };
  const updated = [newPatient, ...current];
  savePatients(updated);
  addActivityLog("Registered patient", newPatient.name);
  return newPatient;
};
export const deletePatient = (id: string): void => {
  const updated = getPatients().filter((p) => p.id !== id);
  savePatients(updated);
};

// DOCTORS
export const getDoctors = (): Doctor[] => getStoredData<Doctor>(KEYS.DOCTORS, []);
export const saveDoctors = (data: Doctor[]): void => setStoredData(KEYS.DOCTORS, data);
export const addDoctor = (doctor: Omit<Doctor, "id"> & { id?: string }): Doctor => {
  const current = getDoctors();
  const newDoctor: Doctor = {
    ...doctor,
    id: doctor.id || `D${100 + current.length + 1}`,
  };
  const updated = [newDoctor, ...current];
  saveDoctors(updated);
  addActivityLog("Added doctor", newDoctor.name);
  return newDoctor;
};
export const deleteDoctor = (id: string): void => {
  const updated = getDoctors().filter((d) => d.id !== id);
  saveDoctors(updated);
};

// CAMPS
export const getCamps = (): Camp[] => getStoredData<Camp>(KEYS.CAMPS, []);
export const saveCamps = (data: Camp[]): void => setStoredData(KEYS.CAMPS, data);
export const addCamp = (camp: Omit<Camp, "id" | "registered"> & { id?: string; registered?: number }): Camp => {
  const current = getCamps();
  const newCamp: Camp = {
    registered: 0,
    doctorsAssigned: [],
    volunteersAssigned: [],
    services: ["General checkup", "Consultation"],
    ...camp,
    id: camp.id || `C${300 + current.length + 1}`,
  };
  const updated = [newCamp, ...current];
  saveCamps(updated);
  addActivityLog("Created medical camp", newCamp.name);
  return newCamp;
};

// APPOINTMENTS
export const getAppointments = (): Appointment[] => getStoredData<Appointment>(KEYS.APPOINTMENTS, []);
export const saveAppointments = (data: Appointment[]): void => setStoredData(KEYS.APPOINTMENTS, data);
export const addAppointment = (appt: Omit<Appointment, "id" | "token"> & { id?: string; token?: number }): Appointment => {
  const current = getAppointments();
  const newAppt: Appointment = {
    ...appt,
    id: appt.id || `A${5000 + current.length + 1}`,
    token: appt.token || current.length + 1,
  };
  const updated = [newAppt, ...current];
  saveAppointments(updated);
  addActivityLog("Booked appointment", `${newAppt.patientName} with ${newAppt.doctorName}`);
  return newAppt;
};

// PRESCRIPTIONS
export const getPrescriptions = (): Prescription[] => getStoredData<Prescription>(KEYS.PRESCRIPTIONS, []);
export const savePrescriptions = (data: Prescription[]): void => setStoredData(KEYS.PRESCRIPTIONS, data);
export const addPrescription = (rx: Omit<Prescription, "id"> & { id?: string }): Prescription => {
  const current = getPrescriptions();
  const newRx: Prescription = {
    ...rx,
    id: rx.id || `RX${700 + current.length + 1}`,
  };
  const updated = [newRx, ...current];
  savePrescriptions(updated);
  addActivityLog("Created prescription", newRx.patientId);
  return newRx;
};

// LAB REPORTS
export const getLabReports = (): LabReport[] => getStoredData<LabReport>(KEYS.LAB_REPORTS, []);
export const saveLabReports = (data: LabReport[]): void => setStoredData(KEYS.LAB_REPORTS, data);
export const addLabReport = (lab: Omit<LabReport, "id"> & { id?: string }): LabReport => {
  const current = getLabReports();
  const newLab: LabReport = {
    ...lab,
    id: lab.id || `L${800 + current.length + 1}`,
  };
  const updated = [newLab, ...current];
  saveLabReports(updated);
  addActivityLog("Created lab report", `${newLab.test} for ${newLab.patientId}`);
  return newLab;
};

// MEDICAL HISTORY
export const getMedicalHistory = (): MedHistoryEntry[] => getStoredData<MedHistoryEntry>(KEYS.MED_HISTORY, []);
export const saveMedicalHistory = (data: MedHistoryEntry[]): void => setStoredData(KEYS.MED_HISTORY, data);
export const addMedicalHistory = (entry: Omit<MedHistoryEntry, "id"> & { id?: string }): MedHistoryEntry => {
  const current = getMedicalHistory();
  const newEntry: MedHistoryEntry = {
    ...entry,
    id: entry.id || `MH${current.length + 1}`,
  };
  const updated = [newEntry, ...current];
  saveMedicalHistory(updated);
  return newEntry;
};

// NOTIFICATIONS
export const getNotifications = (): NotificationItem[] => getStoredData<NotificationItem>(KEYS.NOTIFICATIONS, []);
export const saveNotifications = (data: NotificationItem[]): void => setStoredData(KEYS.NOTIFICATIONS, data);

// ACTIVITY LOGS
export const getActivityLogs = (): ActivityLog[] => getStoredData<ActivityLog>(KEYS.ACTIVITY_LOGS, []);
export const addActivityLog = (action: string, target: string, user = "System User"): void => {
  const current = getActivityLogs();
  const newLog: ActivityLog = {
    id: `LOG${current.length + 1}`,
    user,
    action,
    target,
    time: new Date().toISOString().replace("T", " ").substring(0, 16),
    ip: "127.0.0.1",
  };
  setStoredData(KEYS.ACTIVITY_LOGS, [newLog, ...current]);
};

// USERS
export const getUsers = (): MockUser[] => getStoredData<MockUser>(KEYS.USERS, []);
export const saveUsers = (data: MockUser[]): void => setStoredData(KEYS.USERS, data);
export const addUser = (user: MockUser): void => {
  const current = getUsers();
  const updated = [...current.filter(u => u.email !== user.email), user];
  saveUsers(updated);
};

// React hook for auto-subscribing to storage updates
import { useEffect, useState } from "react";

export function useStorageData<T>(getter: () => T[]) {
  const [data, setData] = useState<T[]>(() => getter());

  useEffect(() => {
    setData(getter());
    const handleStorageChange = () => {
      setData(getter());
    };
    window.addEventListener("mcm_data_change", handleStorageChange);
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("mcm_data_change", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [getter]);

  return [data, setData] as const;
}

