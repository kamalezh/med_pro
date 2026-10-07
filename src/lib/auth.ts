// src/lib/auth.ts
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

export type UserRole = "patient" | "doctor" | "admin";

interface RegisterUserParams {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  extraData?: Record<string, any>; // eg: doctor specialization, patient phone
}

// 1. User Registration Function
export const registerUserWithRole = async ({
  email,
  password,
  name,
  role,
  extraData = {},
}: RegisterUserParams) => {
  // Firebase Auth-la user create pannuvom
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Firestore Database-la 'users' collection-la UID vechi document save pannuvom
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name,
    email,
    role,
    createdAt: new Date().toISOString(),
    ...extraData,
  });

  return user;
};

// 2. User Login Function with Role Verification
export const loginUserWithRole = async (
  email: string,
  pass: string,
  expectedRole: UserRole
) => {
  // Firebase Auth-la Login verification
  const userCredential = await signInWithEmailAndPassword(auth, email, pass);
  const user = userCredential.user;

  // Firestore-la 'users' collection-la role check panrom
  const userDoc = await getDoc(doc(db, "users", user.uid));

  if (!userDoc.exists()) {
    throw new Error("User record not found in database.");
  }

  const userData = userDoc.data();

  // User Role match aaga villai endral error throw pannuvom
  if (userData.role !== expectedRole) {
    throw new Error(`This account is registered as a ${userData.role}, not a ${expectedRole}.`);
  }

  return { user, userData };
};