import { registerAs } from '@nestjs/config';

import { FIREBASE_CONFIG } from '../constants/firebase.constants';

export const firebaseConfig = registerAs(FIREBASE_CONFIG, () => ({
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
}));
