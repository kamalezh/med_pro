import {
  getPatients,
  getDoctors,
  getAppointments,
  getCamps,
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
  list: () => delay(getCamps()),
  get: (id: string) => delay(getCamps().find((c) => c.id === id) ?? null),
};
export const prescriptionService = { list: () => delay(getPrescriptions()) };
export const labService = { list: () => delay(getLabReports()) };
