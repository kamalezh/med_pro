import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Camp } from "@/mock/data";
import {
  getPatients,
  getDoctors,
  getAppointments,
  getPrescriptions,
  getLabReports,
} from "@/lib/storage";

const delay = <T,>(data: T, ms = 150) => new Promise<T>((r) => setTimeout(() => r(data), ms));

export const patientService = {
  list: () => delay(getPatients()),
  get: (id: string) => delay(getPatients().find((p) => p.id === id) ?? null),
};
export const doctorService = {
  list: () => delay(getDoctors()),
  get: (id: string) => delay(getDoctors().find((d) => d.id === id) ?? null),
};
export const appointmentService = {
  list: () => delay(getAppointments()),
  create: (data: unknown) => delay({ ok: true, data }),
};

export const campService = {
  list: async () => {
    const snap = await getDocs(collection(db, "campRegistrations"));
    return snap.docs.map(d => ({ ...d.data(), id: d.id } as Camp));
  },
  get: async (id: string) => {
    const d = await getDoc(doc(db, "campRegistrations", id));
    return d.exists() ? ({ ...d.data(), id: d.id } as Camp) : null;
  },
};
export const prescriptionService = { list: () => delay(getPrescriptions()) };
export const labService = { list: () => delay(getLabReports()) };
