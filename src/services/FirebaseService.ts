import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { 
  getFirestore, 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  query, 
  where, 
  Timestamp,
  setDoc,
  DocumentData
} from 'firebase/firestore';

// Firebase konfiguracija
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Inicijalizuj Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Definiši tipove
export interface Registration {
  email: string;
  name: string;
  communityName: string;
  date: Timestamp | Date;
  type: 'initiator' | 'attendee';
}

export interface Assembly {
  id: string;
  localCommunityId: string;
  localCommunityName: string;
  date: string;
  time: string;
  address: string;
  description: string;
  status: 'never-scheduled' | 'scheduled' | 'confirmed';
  signatureCount: number;
  contactPhone?: string;
  initiatorEmail?: string;
  initiatorName?: string;
}

// Mock podaci za lokalne zajednice u Beogradu
export const localCommunities = [
  {
    id: '4-juli',
    name: 'Mesna zajednica 4. juli',
    address: 'Milenka Vesnića 3',
    postalCode: '11040 Beograd (Savski Venac)',
    coordinates: { lat: 44.7872, lng: 20.4673 }
  },
  {
    id: 'akademija',
    name: 'Mesna zajednica Akademija',
    address: 'Bulevar umetnosti 27',
    postalCode: '11070 Beograd (Novi Beograd)',
    coordinates: { lat: 44.8175, lng: 20.4147 }
  },
  {
    id: 'autokomanda',
    name: 'Mesna zajednica Autokomanda',
    address: 'Limska 15',
    postalCode: '11010 Beograd (Voždovac)',
    coordinates: { lat: 44.7872, lng: 20.4673 }
  },
  {
    id: 'avala-grad',
    name: 'Mesna zajednica Avala grad',
    address: 'Milene Pavlović Barili 6V',
    postalCode: '11231 Beograd (Rakovica)',
    coordinates: { lat: 44.7469, lng: 20.4425 }
  },
  {
    id: 'banjica',
    name: 'Mesna zajednica Banjica',
    address: 'Bulevar oslobođenja 96',
    postalCode: '11042 Beograd (Voždovac)',
    coordinates: { lat: 44.7667, lng: 20.4831 }
  },
  {
    id: 'bara-reva',
    name: 'Mesna zajednica Bara Reva',
    address: 'Pančevački put 91',
    postalCode: '11210 Beograd (Palilula)',
    coordinates: { lat: 44.8141, lng: 20.4969 }
  },
  {
    id: 'bele-vode',
    name: 'Mesna zajednica Bele vode',
    address: 'Belo vrelo 1',
    postalCode: '11147 Beograd (Čukarica)',
    coordinates: { lat: 44.7808, lng: 20.4143 }
  },
  {
    id: 'beli-potok',
    name: 'Mesna zajednica Beli Potok',
    address: 'Vase Čarapića 48',
    postalCode: '11223 Beli Potok',
    coordinates: { lat: 44.7067, lng: 20.5167 }
  },
  {
    id: 'bezanija',
    name: 'Mesna zajednica Bežanija',
    address: 'Pere Segedinca 13',
    postalCode: '11073 Beograd (Novi Beograd)',
    coordinates: { lat: 44.8125, lng: 20.4273 }
  },
  {
    id: 'bezanijska-kosa',
    name: 'Mesna zajednica Bežanijska kosa',
    address: 'Partizanske avijacije 25',
    postalCode: '11077 Beograd (Novi Beograd)',
    coordinates: { lat: 44.8217, lng: 20.3873 }
  },
  {
    id: 'zvezdara',
    name: 'Mesna zajednica Zvezdara',
    address: 'Bulevar kralja Aleksandra 243',
    postalCode: '11160 Beograd (Zvezdara)',
    coordinates: { lat: 44.7983, lng: 20.4919 }
  },
  {
    id: 'blok-21',
    name: 'Mesna zajednica Blok 21',
    address: 'Bulevar Zorana Đinđića 76',
    postalCode: '11070 Beograd (Novi Beograd)',
    coordinates: { lat: 44.8153, lng: 20.4283 }
  },
  {
    id: 'blok-28',
    name: 'Mesna zajednica Blok 28',
    address: 'Bulevar Arsenija Čarnojevića 81',
    postalCode: '11070 Beograd (Novi Beograd)',
    coordinates: { lat: 44.8183, lng: 20.4133 }
  },
  {
    id: 'blok-29',
    name: 'Mesna zajednica Blok 29',
    address: 'Španskih boraca 2',
    postalCode: '11070 Beograd (Novi Beograd)',
    coordinates: { lat: 44.8167, lng: 20.4217 }
  },
  {
    id: 'blok-30',
    name: 'Mesna zajednica Blok 30',
    address: 'Bulevar Mihajla Pupina 167',
    postalCode: '11070 Beograd (Novi Beograd)',
    coordinates: { lat: 44.8233, lng: 20.4183 }
  },
  {
    id: 'blok-45',
    name: 'Mesna zajednica Blok 45',
    address: 'Jurija Gagarina 221',
    postalCode: '11070 Beograd (Novi Beograd)',
    coordinates: { lat: 44.7983, lng: 20.3867 }
  },
  {
    id: 'blok-61',
    name: 'Mesna zajednica Blok 61',
    address: 'Dr Ivana Ribara 91',
    postalCode: '11070 Beograd (Novi Beograd)',
    coordinates: { lat: 44.8033, lng: 20.3733 }
  },
  {
    id: 'blok-62',
    name: 'Mesna zajednica Blok 62',
    address: 'Nehruova 82',
    postalCode: '11070 Beograd (Novi Beograd)',
    coordinates: { lat: 44.8017, lng: 20.3783 }
  },
  {
    id: 'blok-63',
    name: 'Mesna zajednica Blok 63',
    address: 'Gandijeva 114',
    postalCode: '11070 Beograd (Novi Beograd)',
    coordinates: { lat: 44.8050, lng: 20.3800 }
  },
  {
    id: 'borca-3',
    name: 'Mesna zajednica Borča 3',
    address: 'Valjevskog odreda 70',
    postalCode: '11211 Beograd (Palilula)',
    coordinates: { lat: 44.8733, lng: 20.4583 }
  },
  {
    id: 'braće-jerković',
    name: 'Mesna zajednica Braće Jerković',
    address: 'Meštrovićeva 34',
    postalCode: '11010 Beograd (Voždovac)',
    coordinates: { lat: 44.7683, lng: 20.4933 }
  },
  {
    id: 'cerak',
    name: 'Mesna zajednica Cerak',
    address: 'Jablanička 12',
    postalCode: '11090 Beograd (Čukarica)',
    coordinates: { lat: 44.7517, lng: 20.4217 }
  },
  {
    id: 'cerak-vinogradi',
    name: 'Mesna zajednica Cerak Vinogradi',
    address: 'Kedrova 2',
    postalCode: '11090 Beograd (Čukarica)',
    coordinates: { lat: 44.7483, lng: 20.4183 }
  },
  {
    id: 'cukarica',
    name: 'Mesna zajednica Čukarica',
    address: 'Turgenjevljeva 5',
    postalCode: '11030 Beograd (Čukarica)',
    coordinates: { lat: 44.7867, lng: 20.4150 }
  },
  {
    id: 'dedinje',
    name: 'Mesna zajednica Dedinje',
    address: 'Bulevar kneza Aleksandra Karađorđevića 10b',
    postalCode: '11040 Beograd (Savski Venac)',
    coordinates: { lat: 44.7783, lng: 20.4567 }
  },
  {
    id: 'dorcol',
    name: 'Mesna zajednica Dorćol',
    address: 'Cara Dušana 82',
    postalCode: '11000 Beograd (Stari Grad)',
    coordinates: { lat: 44.8217, lng: 20.4617 }
  },
  {
    id: 'dunav',
    name: 'Mesna zajednica Dunav',
    address: 'Cara Dušana 15a',
    postalCode: '11000 Beograd (Stari Grad)',
    coordinates: { lat: 44.8233, lng: 20.4583 }
  },
  {
    id: 'fontana',
    name: 'Mesna zajednica Fontana',
    address: 'Pariske komune 13',
    postalCode: '11070 Beograd (Novi Beograd)',
    coordinates: { lat: 44.8217, lng: 20.4133 }
  },
  {
    id: 'galovica',
    name: 'Mesna zajednica Galovica',
    address: 'Džona Kenedija 9',
    postalCode: '11070 Beograd (Novi Beograd)',
    coordinates: { lat: 44.8083, lng: 20.3917 }
  },
  {
    id: 'gorica',
    name: 'Mesna zajednica Gorica',
    address: 'Učiteljska 60',
    postalCode: '11050 Beograd (Zvezdara)',
    coordinates: { lat: 44.7933, lng: 20.4917 }
  },
  {
    id: 'jajinci',
    name: 'Mesna zajednica Jajinci',
    address: 'Save Maškovića 3',
    postalCode: '11223 Beograd (Voždovac)',
    coordinates: { lat: 44.7367, lng: 20.4867 }
  },
  {
    id: 'kaludjerica',
    name: 'Mesna zajednica Kaluđerica',
    address: 'Kralja Petra Prvog 7g',
    postalCode: '11130 Beograd (Grocka)',
    coordinates: { lat: 44.7583, lng: 20.5367 }
  },
  {
    id: 'kanarevo-brdo',
    name: 'Mesna zajednica Kanarevo Brdo',
    address: 'Bogdana Žerajića 24a',
    postalCode: '11010 Beograd (Rakovica)',
    coordinates: { lat: 44.7617, lng: 20.4567 }
  },
  {
    id: 'karaburma',
    name: 'Mesna zajednica Karaburma',
    address: 'Uralska 11',
    postalCode: '11060 Beograd (Palilula)',
    coordinates: { lat: 44.8150, lng: 20.4933 }
  },
  {
    id: 'kosutnjak',
    name: 'Mesna zajednica Košutnjak',
    address: 'Pionirska 4',
    postalCode: '11030 Beograd (Rakovica)',
    coordinates: { lat: 44.7633, lng: 20.4367 }
  },
  {
    id: 'kotez',
    name: 'Mesna zajednica Kotež',
    address: 'Jovana Isailovića 31',
    postalCode: '11211 Beograd (Palilula)',
    coordinates: { lat: 44.8517, lng: 20.4683 }
  },
  {
    id: 'krunski-venac',
    name: 'Mesna zajednica Krunski venac',
    address: 'Prote Mateje 36',
    postalCode: '11000 Beograd (Vračar)',
    coordinates: { lat: 44.8033, lng: 20.4733 }
  },
  {
    id: 'kumodraz',
    name: 'Mesna zajednica Kumodraž',
    address: 'Mokroluška 4',
    postalCode: '11221 Beograd (Voždovac)',
    coordinates: { lat: 44.7433, lng: 20.5067 }
  },
  {
    id: 'ledine',
    name: 'Mesna zajednica Ledine',
    address: 'Obrenovačka bb',
    postalCode: '11070 Beograd (Novi Beograd)',
    coordinates: { lat: 44.8067, lng: 20.3567 }
  },
  {
    id: 'lion',
    name: 'Mesna zajednica Lion',
    address: 'Janka Lisjaka 4',
    postalCode: '11030 Beograd (Čukarica)',
    coordinates: { lat: 44.7783, lng: 20.4150 }
  },
  {
    id: 'miljakovac',
    name: 'Mesna zajednica Miljakovac',
    address: 'Varešska 5',
    postalCode: '11010 Beograd (Rakovica)',
    coordinates: { lat: 44.7483, lng: 20.4567 }
  }
];

// Mock podaci za zborove
const mockAssemblies: Assembly[] = [
  {
    id: 'assembly1',
    localCommunityId: 'vracar',
    localCommunityName: 'Vračar',
    date: '2023-07-15',
    time: '18:00',
    address: 'Beogradska 1, Beograd',
    description: 'Zbor građana o uređenju parka u naselju',
    status: 'confirmed',
    signatureCount: 15,
    contactPhone: '011 123 4567',
    initiatorEmail: 'marko@example.com',
    initiatorName: 'Marko Petrović'
  },
  {
    id: 'assembly2',
    localCommunityId: 'savski_venac',
    localCommunityName: 'Savski Venac',
    date: '2023-07-20',
    time: '19:00',
    address: 'Kneza Miloša 10, Beograd',
    description: 'Zbor građana o saobraćajnim problemima',
    status: 'scheduled',
    signatureCount: 7,
    contactPhone: '011 234 5678',
    initiatorEmail: 'jana@example.com',
    initiatorName: 'Jana Jovanović'
  }
];

// Mock podaci za registracije
const mockRegistrations: Registration[] = [
  {
    email: 'marko@example.com',
    name: 'Marko Petrović',
    communityName: 'Vračar',
    date: new Date('2023-06-10'),
    type: 'initiator'
  },
  {
    email: 'jana@example.com',
    name: 'Jana Jovanović',
    communityName: 'Savski Venac',
    date: new Date('2023-06-12'),
    type: 'initiator'
  },
  {
    email: 'petar@example.com',
    name: 'Petar Petrović',
    communityName: 'Vračar',
    date: new Date('2023-06-11'),
    type: 'attendee'
  }
];

// Prag za potvrđeni status
export const SIGNATURE_THRESHOLD = 10;

// Convert Firestore document to Assembly
const convertDocToAssembly = (doc: DocumentData): Assembly => {
  const data = doc.data();
  return {
    id: doc.id,
    localCommunityId: data.localCommunityId,
    localCommunityName: data.localCommunityName,
    date: data.date,
    time: data.time,
    address: data.address,
    description: data.description,
    status: data.status,
    signatureCount: data.signatureCount,
    contactPhone: data.contactPhone,
    initiatorEmail: data.initiatorEmail,
    initiatorName: data.initiatorName
  };
};

class FirebaseService {
  private assemblies: Assembly[] = [...mockAssemblies];
  private registrations: Registration[] = [...mockRegistrations];
  private initialized = false;
  private useLocalData = false;

  constructor() {
    this.init();
  }

  // Inicijalizuj konekciju
  async init() {
    if (this.initialized) return;
    
    try {
      // Proveri da li postoji kolekcija 'assemblies', ako ne, kreiraj je
      const assembliesRef = collection(db, 'assemblies');
      const assembliesSnapshot = await getDocs(assembliesRef);
      
      if (assembliesSnapshot.empty) {
        console.log('No assemblies found in Firestore, adding mock data');
        
        // Dodaj mock podatke u Firestore
        for (const assembly of mockAssemblies) {
          await setDoc(doc(assembliesRef, assembly.id), assembly);
        }
        
        // Dodaj mock registracije u Firestore
        const registrationsRef = collection(db, 'registrations');
        for (const registration of mockRegistrations) {
          await addDoc(registrationsRef, {
            ...registration,
            date: Timestamp.fromDate(registration.date as Date)
          });
        }
      }
      
      this.initialized = true;
    } catch (error) {
      console.error('Error initializing Firebase:', error);
      this.useLocalData = true; // Fall back to local data
    }
  }

  // Dobavi sve zborove
  async getAssemblies(): Promise<Assembly[]> {
    await this.init();
    
    // If using local data, return mock assemblies
    if (this.useLocalData) {
      return [...this.assemblies];
    }
    
    try {
      const assembliesRef = collection(db, 'assemblies');
      const assembliesSnapshot = await getDocs(assembliesRef);
      
      if (assembliesSnapshot.empty) {
        return [...this.assemblies]; // Return mock data if no assemblies found
      }
      
      const assemblies: Assembly[] = [];
      assembliesSnapshot.forEach(doc => {
        assemblies.push(convertDocToAssembly(doc));
      });
      
      // Update local cache
      this.assemblies = assemblies;
      return assemblies;
    } catch (error) {
      console.error('Error getting assemblies:', error);
      return [...this.assemblies]; // Return mock data on error
    }
  }

  // Dobavi zbor po ID-u
  async getAssemblyById(id: string): Promise<Assembly | undefined> {
    await this.init();
    
    // If using local data, return from mock assemblies
    if (this.useLocalData) {
      return this.assemblies.find(a => a.id === id);
    }
    
    try {
      const assemblyDoc = doc(db, 'assemblies', id);
      const assemblySnapshot = await getDoc(assemblyDoc);
      
      if (!assemblySnapshot.exists()) {
        return this.assemblies.find(a => a.id === id); // Return from mock if not found
      }
      
      return convertDocToAssembly(assemblySnapshot);
    } catch (error) {
      console.error('Error getting assembly by ID:', error);
      return this.assemblies.find(a => a.id === id); // Return from mock on error
    }
  }

  // Dobavi zbor po ID-u lokalne zajednice
  async getAssemblyByLocalCommunityId(localCommunityId: string): Promise<Assembly | undefined> {
    await this.init();
    
    // If using local data, return from mock assemblies
    if (this.useLocalData) {
      return this.assemblies.find(a => a.localCommunityId === localCommunityId);
    }
    
    try {
      const assembliesRef = collection(db, 'assemblies');
      const q = query(assembliesRef, where('localCommunityId', '==', localCommunityId));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return this.assemblies.find(a => a.localCommunityId === localCommunityId); // Return from mock if not found
      }
      
      return convertDocToAssembly(querySnapshot.docs[0]);
    } catch (error) {
      console.error('Error getting assembly by local community ID:', error);
      return this.assemblies.find(a => a.localCommunityId === localCommunityId); // Return from mock on error
    }
  }

  // Zakaži zbor
  async scheduleAssembly(
    localCommunityId: string, 
    date: string, 
    time: string, 
    initiatorEmail: string,
    initiatorName: string,
    contactPhone: string,
    address: string = '',
    description: string = ''
  ): Promise<Assembly> {
    await this.init();
    
    try {
      // Check if assembly already exists for this community
      let existingAssembly;
      
      if (!this.useLocalData) {
        try {
          const assembliesRef = collection(db, 'assemblies');
          const q = query(assembliesRef, where('localCommunityId', '==', localCommunityId));
          const querySnapshot = await getDocs(q);
          
          if (!querySnapshot.empty) {
            existingAssembly = convertDocToAssembly(querySnapshot.docs[0]);
          }
        } catch (error) {
          console.error('Error checking if assembly exists:', error);
          // Fall back to local check
          existingAssembly = this.assemblies.find(a => a.localCommunityId === localCommunityId);
        }
      } else {
        existingAssembly = this.assemblies.find(a => a.localCommunityId === localCommunityId);
      }
      
      if (existingAssembly) {
        throw new Error(`Zbor je već zakazan za ovu mesnu zajednicu.`);
      }
      
      // Check if email is already used for scheduling
      const isEmailUsed = await this.isEmailUsedForScheduling(initiatorEmail);
      if (isEmailUsed) {
        throw new Error(`Email ${initiatorEmail} je već korišćen za zakazivanje zbora.`);
      }
      
      // Find community name
      const community = localCommunities.find(c => c.id === localCommunityId);
      if (!community) {
        throw new Error('Mesna zajednica nije pronađena.');
      }
      
      // Create new assembly
      const newAssembly: Assembly = {
        id: `assembly_${Date.now()}`,
        localCommunityId,
        localCommunityName: community.name,
        date,
        time,
        address: address || `${community.name}, Beograd`,
        description: description || `Zbor građana u mesnoj zajednici ${community.name}`,
        status: 'scheduled',
        signatureCount: 1, // Initiator is the first attendee
        contactPhone,
        initiatorEmail: initiatorEmail.toLowerCase(),
        initiatorName
      };
      
      // Save to Firestore if not using local data
      if (!this.useLocalData) {
        try {
          const assembliesRef = collection(db, 'assemblies');
          await setDoc(doc(assembliesRef, newAssembly.id), newAssembly);
          
          // Register initiator as first attendee
          const registrationsRef = collection(db, 'registrations');
          await addDoc(registrationsRef, {
            email: initiatorEmail.toLowerCase(),
            name: initiatorName,
            communityName: community.name,
            date: Timestamp.now(),
            type: 'initiator'
          });
        } catch (error) {
          console.error('Error scheduling assembly:', error);
          // Continue with local data if Firestore fails
          this.useLocalData = true;
        }
      }
      
      // Update local cache
      this.assemblies.push(newAssembly);
      
      // Add to local registrations
      this.registrations.push({
        email: initiatorEmail.toLowerCase(),
        name: initiatorName,
        communityName: community.name,
        date: new Date(),
        type: 'initiator'
      });
      
      return newAssembly;
    } catch (error) {
      console.error('Error scheduling assembly:', error);
      throw error;
    }
  }

  // Ažuriraj zbor
  async updateAssembly(id: string, data: Partial<Assembly>): Promise<Assembly | undefined> {
    await this.init();
    
    // Find assembly in local cache
    const assemblyIndex = this.assemblies.findIndex(a => a.id === id);
    if (assemblyIndex === -1) {
      return undefined;
    }
    
    // Update local cache
    const updatedAssembly = {
      ...this.assemblies[assemblyIndex],
      ...data
    };
    this.assemblies[assemblyIndex] = updatedAssembly;
    
    // Update in Firestore if not using local data
    if (!this.useLocalData) {
      try {
        const assemblyDoc = doc(db, 'assemblies', id);
        await updateDoc(assemblyDoc, data);
      } catch (error) {
        console.error('Error updating assembly:', error);
        // Continue with local data if Firestore fails
        this.useLocalData = true;
      }
    }
    
    return updatedAssembly;
  }

  // Proveri da li je email već registrovan za zajednicu
  async isEmailRegistered(email: string, communityName: string): Promise<boolean> {
    await this.init();
    
    const lowerEmail = email.toLowerCase();
    
    // If using local data, check local registrations
    if (this.useLocalData) {
      return this.registrations.some(r => 
        r.email.toLowerCase() === lowerEmail && r.communityName === communityName
      );
    }
    
    try {
      const registrationsRef = collection(db, 'registrations');
      const q = query(
        registrationsRef, 
        where('email', '==', lowerEmail),
        where('communityName', '==', communityName)
      );
      
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error('Error checking if email is registered:', error);
      // Fall back to local check
      return this.registrations.some(r => 
        r.email.toLowerCase() === lowerEmail && r.communityName === communityName
      );
    }
  }

  // Proveri da li je email već korišćen za zakazivanje bilo kog zbora
  async isEmailUsedForScheduling(email: string): Promise<boolean> {
    await this.init();
    
    const lowerEmail = email.toLowerCase();
    
    // If using local data, check local assemblies
    if (this.useLocalData) {
      return this.assemblies.some(a => 
        a.initiatorEmail && a.initiatorEmail.toLowerCase() === lowerEmail
      );
    }
    
    try {
      const assembliesRef = collection(db, 'assemblies');
      const q = query(assembliesRef, where('initiatorEmail', '==', lowerEmail));
      const querySnapshot = await getDocs(q);
      
      return !querySnapshot.empty;
    } catch (error) {
      console.error('Error checking if email is used for scheduling:', error);
      // Fall back to local check
      return this.assemblies.some(a => 
        a.initiatorEmail && a.initiatorEmail.toLowerCase() === lowerEmail
      );
    }
  }

  // Registruj korisnika za zbor (potpiši peticiju)
  async registerAttendee(email: string, name: string, assemblyId: string): Promise<void> {
    await this.init();
    
    const lowerEmail = email.toLowerCase();
    
    // Find assembly
    const assembly = await this.getAssemblyById(assemblyId);
    if (!assembly) {
      throw new Error('Zbor nije pronađen.');
    }
    
    // Check if email is already registered
    const isRegistered = await this.isEmailRegistered(lowerEmail, assembly.localCommunityName);
    if (isRegistered) {
      throw new Error(`Email ${email} je već registrovan za ovaj zbor.`);
    }
    
    // Register attendee
    if (!this.useLocalData) {
      try {
        // Add registration to Firestore
        const registrationsRef = collection(db, 'registrations');
        await addDoc(registrationsRef, {
          email: lowerEmail,
          name,
          communityName: assembly.localCommunityName,
          date: Timestamp.now(),
          type: 'attendee'
        });
        
        // Update assembly signature count
        const newSignatureCount = assembly.signatureCount + 1;
        await this.updateAssembly(assemblyId, { 
          signatureCount: newSignatureCount,
          status: newSignatureCount >= SIGNATURE_THRESHOLD ? 'confirmed' : assembly.status
        });
        
        // Send confirmation emails if threshold reached
        if (newSignatureCount >= SIGNATURE_THRESHOLD && assembly.status !== 'confirmed') {
          await this.sendConfirmationEmails(assembly.localCommunityName);
        }
      } catch (error) {
        console.error('Error registering attendee:', error);
        // Continue with local data if Firestore fails
        this.useLocalData = true;
      }
    }
    
    // Add to local registrations
    this.registrations.push({
      email: lowerEmail,
      name,
      communityName: assembly.localCommunityName,
      date: new Date(),
      type: 'attendee'
    });
    
    // Update local assembly data
    const assemblyIndex = this.assemblies.findIndex(a => a.id === assemblyId);
    if (assemblyIndex !== -1) {
      const newSignatureCount = this.assemblies[assemblyIndex].signatureCount + 1;
      this.assemblies[assemblyIndex] = {
        ...this.assemblies[assemblyIndex],
        signatureCount: newSignatureCount,
        status: newSignatureCount >= SIGNATURE_THRESHOLD ? 'confirmed' : this.assemblies[assemblyIndex].status
      };
      
      // Send confirmation emails if threshold reached (local mock)
      if (newSignatureCount >= SIGNATURE_THRESHOLD && this.assemblies[assemblyIndex].status !== 'confirmed') {
        await this.sendConfirmationEmails(this.assemblies[assemblyIndex].localCommunityName);
      }
    }
  }

  // Pošalji email-ove za potvrdu kada je dostignut prag
  private async sendConfirmationEmails(communityName: string): Promise<void> {
    // U pravoj aplikaciji, ovo bi slalo stvarne email-ove
    // Za sada samo logujemo
    console.log(`Sending confirmation emails to attendees of ${communityName}`);
    
    // Example implementation with EmailJS:
    /*
    import emailjs from 'emailjs-com';
    
    // Get all registrations for this community
    const registrationsRef = collection(db, 'registrations');
    const q = query(registrationsRef, where('communityName', '==', communityName));
    const querySnapshot = await getDocs(q);
    
    // Get assembly details
    const assembly = this.assemblies.find(a => a.localCommunityName === communityName);
    
    if (!assembly) return;
    
    // Send email to each attendee
    querySnapshot.forEach(doc => {
      const registration = doc.data();
      
      emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          to_email: registration.email,
          to_name: registration.name,
          assembly_date: assembly.date,
          assembly_time: assembly.time,
          assembly_location: assembly.address,
          contact_phone: assembly.contactPhone
        },
        'YOUR_USER_ID'
      )
      .then(response => {
        console.log('Email sent successfully:', response);
      })
      .catch(error => {
        console.error('Error sending email:', error);
      });
    });
    */
  }
}

export default new FirebaseService(); 