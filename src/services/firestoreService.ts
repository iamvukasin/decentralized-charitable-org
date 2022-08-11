import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore/lite';
import { DonationTarget } from '../interfaces';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

class FirestoreService {
  static async getTargets(): Promise<DonationTarget[]> {
    const targetsCollection = collection(db, 'targets');
    const targetSnapshots = await getDocs(targetsCollection);

    return targetSnapshots.docs
      .map(doc => {
        const data = doc.data() as { title: string; description: string } | null;

        if (!data) {
          return null;
        }

        return { ...data, id: doc.id, collected: 0, goal: 0 } as unknown as DonationTarget;
      })
      .filter(target => target !== null) as DonationTarget[];
  }
}

export default FirestoreService;
