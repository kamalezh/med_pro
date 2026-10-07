import { a as getApp, o as getApps, s as initializeApp } from "../_libs/@firebase/app+[...].mjs";
import { n as getAuth, r as signInWithEmailAndPassword, t as createUserWithEmailAndPassword } from "../_libs/firebase__auth.mjs";
import "../_libs/firebase.mjs";
import { i as getFirestore, n as setDoc, r as doc, t as getDoc } from "../_libs/@firebase/firestore+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-CplBjQL6.js
var app = !getApps().length ? initializeApp({
	apiKey: "AIzaSyDf-PKR7SNZCw7rQc9aALkesygKc9rF8vg",
	authDomain: "medical-camp-fe54b.firebaseapp.com",
	projectId: "medical-camp-fe54b",
	storageBucket: "medical-camp-fe54b.firebasestorage.app",
	messagingSenderId: "542379811871",
	appId: "1:542379811871:web:4fefa16bcb0a983af4612a"
}) : getApp();
var auth = getAuth(app);
var db = getFirestore(app);
var registerUserWithRole = async ({ email, password, name, role, extraData = {} }) => {
	const user = (await createUserWithEmailAndPassword(auth, email, password)).user;
	await setDoc(doc(db, "users", user.uid), {
		uid: user.uid,
		name,
		email,
		role,
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		...extraData
	});
	return user;
};
var loginUserWithRole = async (email, pass, expectedRole) => {
	const user = (await signInWithEmailAndPassword(auth, email, pass)).user;
	const userDoc = await getDoc(doc(db, "users", user.uid));
	if (!userDoc.exists()) throw new Error("User record not found in database.");
	const userData = userDoc.data();
	if (userData.role !== expectedRole) throw new Error(`This account is registered as a ${userData.role}, not a ${expectedRole}.`);
	return {
		user,
		userData
	};
};
//#endregion
export { registerUserWithRole as n, loginUserWithRole as t };
