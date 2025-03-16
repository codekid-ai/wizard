import { initializeApp, cert } from 'firebase-admin/app';
import { getHosting } from 'firebase-admin/hosting';
import { logger } from '../config/logger.js';

class FirebaseService {
  constructor() {
    initializeApp({
      credential: cert(process.env.GOOGLE_APPLICATION_CREDENTIALS),
      projectId: process.env.FIREBASE_PROJECT_ID
    });
  }

  async createHostingSite(siteName) {
    try {
      const hosting = getHosting();
      await hosting.sites.create(siteName, {
        appId: process.env.FIREBASE_PROJECT_ID
      });

      logger.info(`Created Firebase hosting site: ${siteName}`);
      return siteName;
    } catch (error) {
      logger.error(`Error creating Firebase hosting site: ${error.message}`);
      throw error;
    }
  }

  async generateFirebaseConfig(siteName) {
    return {
      hosting: {
        site: siteName,
        public: ".",
        ignore: [
          "firebase.json",
          "**/.*",
          "**/node_modules/**"
        ]
      }
    };
  }
}

export const firebaseService = new FirebaseService();
