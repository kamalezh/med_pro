import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/storage-D8YOCuo1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var KEYS = {
	PATIENTS: "mcm_patients_data",
	DOCTORS: "mcm_doctors_data",
	CAMPS: "mcm_camps_data",
	APPOINTMENTS: "mcm_appointments_data",
	PRESCRIPTIONS: "mcm_prescriptions_data",
	LAB_REPORTS: "mcm_lab_reports_data",
	MED_HISTORY: "mcm_med_history_data",
	NOTIFICATIONS: "mcm_notifications_data",
	ACTIVITY_LOGS: "mcm_activity_logs_data",
	USERS: "mcm_users_data"
};
function getStoredData(key, defaultValue = []) {
	if (typeof window === "undefined") return defaultValue;
	try {
		const item = localStorage.getItem(key);
		return item ? JSON.parse(item) : defaultValue;
	} catch (e) {
		console.error(`Error reading ${key} from localStorage`, e);
		return defaultValue;
	}
}
function setStoredData(key, data) {
	if (typeof window === "undefined") return;
	try {
		localStorage.setItem(key, JSON.stringify(data));
		window.dispatchEvent(new CustomEvent("mcm_data_change", { detail: {
			key,
			data
		} }));
	} catch (e) {
		console.error(`Error writing ${key} to localStorage`, e);
	}
}
var getPatients = () => getStoredData(KEYS.PATIENTS, []);
var savePatients = (data) => setStoredData(KEYS.PATIENTS, data);
var addPatient = (patient) => {
	const current = getPatients();
	const newPatient = {
		...patient,
		id: patient.id || `P${1e3 + current.length + 1}`
	};
	savePatients([newPatient, ...current]);
	addActivityLog("Registered patient", newPatient.name);
	return newPatient;
};
var deletePatient = (id) => {
	savePatients(getPatients().filter((p) => p.id !== id));
};
var getDoctors = () => getStoredData(KEYS.DOCTORS, []);
var saveDoctors = (data) => setStoredData(KEYS.DOCTORS, data);
var addDoctor = (doctor) => {
	const current = getDoctors();
	const newDoctor = {
		...doctor,
		id: doctor.id || `D${100 + current.length + 1}`
	};
	saveDoctors([newDoctor, ...current]);
	addActivityLog("Added doctor", newDoctor.name);
	return newDoctor;
};
var deleteDoctor = (id) => {
	saveDoctors(getDoctors().filter((d) => d.id !== id));
};
var getCamps = () => getStoredData(KEYS.CAMPS, []);
var saveCamps = (data) => setStoredData(KEYS.CAMPS, data);
var getAppointments = () => getStoredData(KEYS.APPOINTMENTS, []);
var saveAppointments = (data) => setStoredData(KEYS.APPOINTMENTS, data);
var addAppointment = (appt) => {
	const current = getAppointments();
	const newAppt = {
		...appt,
		id: appt.id || `A${5e3 + current.length + 1}`,
		token: appt.token || current.length + 1
	};
	saveAppointments([newAppt, ...current]);
	addActivityLog("Booked appointment", `${newAppt.patientName} with ${newAppt.doctorName}`);
	return newAppt;
};
var getPrescriptions = () => getStoredData(KEYS.PRESCRIPTIONS, []);
var savePrescriptions = (data) => setStoredData(KEYS.PRESCRIPTIONS, data);
var addPrescription = (rx) => {
	const current = getPrescriptions();
	const newRx = {
		...rx,
		id: rx.id || `RX${700 + current.length + 1}`
	};
	savePrescriptions([newRx, ...current]);
	addActivityLog("Created prescription", newRx.patientId);
	return newRx;
};
var getLabReports = () => getStoredData(KEYS.LAB_REPORTS, []);
var saveLabReports = (data) => setStoredData(KEYS.LAB_REPORTS, data);
var addLabReport = (lab) => {
	const current = getLabReports();
	const newLab = {
		...lab,
		id: lab.id || `L${800 + current.length + 1}`
	};
	saveLabReports([newLab, ...current]);
	addActivityLog("Created lab report", `${newLab.test} for ${newLab.patientId}`);
	return newLab;
};
var getMedicalHistory = () => getStoredData(KEYS.MED_HISTORY, []);
var saveMedicalHistory = (data) => setStoredData(KEYS.MED_HISTORY, data);
var addMedicalHistory = (entry) => {
	const current = getMedicalHistory();
	const newEntry = {
		...entry,
		id: entry.id || `MH${current.length + 1}`
	};
	saveMedicalHistory([newEntry, ...current]);
	return newEntry;
};
var getActivityLogs = () => getStoredData(KEYS.ACTIVITY_LOGS, []);
var addActivityLog = (action, target, user = "System User") => {
	const current = getActivityLogs();
	const newLog = {
		id: `LOG${current.length + 1}`,
		user,
		action,
		target,
		time: (/* @__PURE__ */ new Date()).toISOString().replace("T", " ").substring(0, 16),
		ip: "127.0.0.1"
	};
	setStoredData(KEYS.ACTIVITY_LOGS, [newLog, ...current]);
};
var getUsers = () => getStoredData(KEYS.USERS, []);
function useStorageData(getter) {
	const [data, setData] = (0, import_react.useState)(() => getter());
	(0, import_react.useEffect)(() => {
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
	return [data, setData];
}
//#endregion
export { getUsers as _, addPatient as a, savePatients as b, deletePatient as c, getCamps as d, getDoctors as f, getPrescriptions as g, getPatients as h, addMedicalHistory as i, getActivityLogs as l, getMedicalHistory as m, addDoctor as n, addPrescription as o, getLabReports as p, addLabReport as r, deleteDoctor as s, addAppointment as t, getAppointments as u, saveAppointments as v, useStorageData as x, saveCamps as y };
