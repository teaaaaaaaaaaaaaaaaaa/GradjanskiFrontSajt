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
import axios from 'axios';
import { getFunctions, httpsCallable } from 'firebase/functions';

// Add a flag to handle development mode
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Firebase konfiguracija
const firebaseConfig = {
  apiKey: "AIzaSyBCTkM9QrnYcpbgx3VrwunN0__oX7XD6Uc",
  authDomain: "gradjanskifront.firebaseapp.com",
  projectId: "gradjanskifront",
  storageBucket: "gradjanskifront.firebasestorage.app",
  messagingSenderId: "124296576459",
  appId: "1:124296576459:web:352ce05be6ab7ad40a4a4e"
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

export interface Member {
  firstName: string;
  lastName: string;
  email: string;
  workingGroup: string;
  phone?: string;
  localCommunity?: string;
  joinedAt: string;
}

export interface EmailData {
  to: string;
  subject: string;
  template: string;
  templateData: Record<string, any>;
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
    console.log(`Pokušaj registracije: ${name} (${lowerEmail}) za zbor ID: ${assemblyId}`);
    
    // Find assembly or related community
    let assembly = await this.getAssemblyById(assemblyId);
    let communityName = '';
    let communityId = '';
    
    // Ako zbor nije pronađen, pokušaćemo da kreiramo virtuelni zbor na osnovu ID-a zajednice
    if (!assembly) {
      // Pretpostavimo da je assemblyId zapravo ID zajednice ili sadrži ID zajednice
      const possibleCommunityId = assemblyId.replace('assembly_', '');
      const community = localCommunities.find(c => c.id === possibleCommunityId);
      
      if (community) {
        communityName = community.name;
        communityId = community.id;
        
        // Kreiraj virtuelni assembly objekat
        assembly = {
          id: `assembly_${Date.now()}`,
          localCommunityId: communityId,
          localCommunityName: communityName,
          date: '',
          time: '',
          address: community.address,
          description: `Zbor građana u mesnoj zajednici ${communityName}`,
          status: 'never-scheduled',
          signatureCount: 0
        };
        
        // Dodaj ga u lokalnu listu i Firestore ako je moguće
        this.assemblies.push(assembly);
        
        if (!this.useLocalData) {
          try {
            const assembliesRef = collection(db, 'assemblies');
            await setDoc(doc(assembliesRef, assembly.id), assembly);
          } catch (error) {
            console.error('Error creating virtual assembly:', error);
            this.useLocalData = true;
          }
        }
      } else {
        // Ako ne možemo naći zajednicu, pokušaj direktno locirati zajednicu iz ID-a
        for (const community of localCommunities) {
          if (assemblyId.includes(community.id)) {
            communityName = community.name;
            communityId = community.id;
            
            // Kreiraj virtuelni assembly
            assembly = {
              id: `assembly_${Date.now()}`,
              localCommunityId: communityId,
              localCommunityName: communityName,
              date: '',
              time: '',
              address: community.address,
              description: `Zbor građana u mesnoj zajednici ${communityName}`,
              status: 'never-scheduled',
              signatureCount: 0
            };
            
            this.assemblies.push(assembly);
            
            if (!this.useLocalData) {
              try {
                const assembliesRef = collection(db, 'assemblies');
                await setDoc(doc(assembliesRef, assembly.id), assembly);
              } catch (error) {
                console.error('Error creating virtual assembly:', error);
                this.useLocalData = true;
              }
            }
            break;
          }
        }
      }
    }
    
    // Ako je assembly i dalje undefined, koristi default vrednost
    if (!assembly) {
      const defaultCommunity = localCommunities[0];
      communityName = defaultCommunity.name;
      communityId = defaultCommunity.id;
      
      assembly = {
        id: `assembly_${Date.now()}`,
        localCommunityId: communityId,
        localCommunityName: communityName,
        date: '',
        time: '',
        address: defaultCommunity.address,
        description: `Zbor građana u mesnoj zajednici ${communityName}`,
        status: 'never-scheduled',
        signatureCount: 0
      };
      
      console.log('Kreiran podrazumevani zbor jer nije pronađen nijedan postojeći.');
      
      this.assemblies.push(assembly);
      
      if (!this.useLocalData) {
        try {
          const assembliesRef = collection(db, 'assemblies');
          await setDoc(doc(assembliesRef, assembly.id), assembly);
        } catch (error) {
          console.error('Error creating default assembly:', error);
          this.useLocalData = true;
        }
      }
    }
    
    console.log(`Zbor pronađen/kreiran: ${assembly.localCommunityName}, trenutni broj potpisa: ${assembly.signatureCount}`);
    
    // Check if email is already registered
    const isRegistered = await this.isEmailRegistered(lowerEmail, assembly.localCommunityName);
    if (isRegistered) {
      console.log(`Email ${lowerEmail} je već registrovan za ovaj zbor.`);
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
        console.log(`Povećan broj potpisa na: ${newSignatureCount}`);
        
        const newStatus = newSignatureCount >= SIGNATURE_THRESHOLD ? 'confirmed' : assembly.status;
        await this.updateAssembly(assembly.id, { 
          signatureCount: newSignatureCount,
          status: newStatus
        });
        
        // Send confirmation emails if threshold reached
        if (newSignatureCount >= SIGNATURE_THRESHOLD && assembly.status !== 'confirmed') {
          console.log(`🎉 DOSTIGNUTO ${SIGNATURE_THRESHOLD} POTPISA! Pokrećem slanje mejlova svim potpisnicima...`);
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
    const assemblyIndex = this.assemblies.findIndex(a => a.id === assembly.id);
    if (assemblyIndex !== -1) {
      const newSignatureCount = this.assemblies[assemblyIndex].signatureCount + 1;
      console.log(`Lokalno: Povećan broj potpisa na: ${newSignatureCount}`);
      
      const oldStatus = this.assemblies[assemblyIndex].status;
      const newStatus = newSignatureCount >= SIGNATURE_THRESHOLD ? 'confirmed' : oldStatus;
      
      this.assemblies[assemblyIndex] = {
        ...this.assemblies[assemblyIndex],
        signatureCount: newSignatureCount,
        status: newStatus
      };
      
      // Send confirmation emails if threshold reached (local mock)
      if (newSignatureCount >= SIGNATURE_THRESHOLD && oldStatus !== 'confirmed') {
        console.log(`🎉 LOKALNO: DOSTIGNUTO ${SIGNATURE_THRESHOLD} POTPISA! Pokrećem slanje mejlova svim potpisnicima...`);
        await this.sendConfirmationEmails(this.assemblies[assemblyIndex].localCommunityName);
      }
    }
    
    console.log(`Registracija uspešna za: ${name} (${lowerEmail})`);
  }

  // Nova metoda za testiranje slanja mejla
  async testSendEmail(toEmail: string, toName: string): Promise<boolean> {
    console.log(`Testiranje slanja mejla na: ${toEmail}`);
    
    try {
      const apiKey = import.meta.env.VITE_BREVO_API_KEY;
      
      if (!apiKey) {
        console.error('Brevo API ključ nije pronađen u .env fajlu!');
        return false;
      }
      
      console.log('Brevo API ključ je pronađen, pokušavam slanje...');
      
      // Definišemo adresu pošiljaoca - ovo mora biti verifikovana adresa u Brevo sistemu
      const senderEmail = 'noreply.gradjanskifront@gmail.com'; // Verifikovana adresa u Brevo
      const senderName = 'Građanski Front';
      
      const response = await axios.post(
        'https://api.brevo.com/v3/smtp/email',
        {
          sender: {
            name: senderName,
            email: senderEmail
          },
          to: [
            {
              email: toEmail,
              name: toName || toEmail
            }
          ],
          subject: 'Test email od Građanskog Fronta',
          htmlContent: `
            <html>
              <head></head>
              <body>
                <h1>Zdravo ${toName || 'korisniče'}!</h1>
                <p>Ovo je testni email za proveru funkcionisanja sistema za slanje mejlova.</p>
                <p>Ako vidite ovaj mejl, znači da je sistem uspešno podešen.</p>
                <p><strong>Građanski Front</strong></p>
              </body>
            </html>
          `
        },
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'api-key': apiKey
          }
        }
      );
      
      console.log('Odgovor servera:', response.status, response.statusText);
      console.log('Mejl uspešno poslat!', response.data);
      return true;
    } catch (error) {
      console.error('Greška pri slanju mejla:');
      if (axios.isAxiosError(error)) {
        console.error('Status:', error.response?.status);
        console.error('Poruka:', error.response?.data);
        console.error('Detalji:', error.message);
      } else {
        console.error(error);
      }
      return false;
    }
  }

  // Poboljšana metoda za slanje potvrda
  private async sendConfirmationEmails(communityName: string): Promise<void> {
    try {
      console.log(`📧 SLANJE MEJLOVA: Priprema za slanje mejlova potpisnicima za zajednicu: ${communityName}`);
      
      // Učitaj sve registracije za ovu zajednicu
      const registrationsSnapshot = await getDocs(
        query(
          collection(db, 'registrations'), 
          where('communityName', '==', communityName)
        )
      );
      
      // Ako nema registracija, prekini
      if (registrationsSnapshot.empty) {
        console.log('Nema registracija za slanje mejlova');
        return;
      }
      
      const registrations = registrationsSnapshot.docs.map(doc => doc.data() as Registration);
      const emails = registrations.map(reg => ({
        email: reg.email,
        name: reg.name
      }));
      
      console.log(`Pronađeno ${emails.length} email adresa za slanje obaveštenja`);
      
      // Pronađi assembly za ovu zajednicu da bismo dobili detalje
      const assembly = await this.getAssemblyByLocalCommunityName(communityName);
      
      if (!assembly) {
        console.log('Ne mogu pronaći zbor za ovu zajednicu');
        return;
      }

      const apiKey = import.meta.env.VITE_BREVO_API_KEY;
      
      if (!apiKey) {
        console.error('Brevo API ključ nije pronađen u .env fajlu!');
        return;
      }
      
      // Verifikovana adresa pošiljaoca iz Brevo sistema
      const senderEmail = 'noreply.gradjanskifront@gmail.com'; // Verifikovana adresa u Brevo
      const senderName = 'Građanski Front';
      
      // Kreiraj sadržaj mejla sa relevantnim informacijama
      const subject = `Potvrđen zbor građana u zajednici ${communityName}`;
      const htmlContent = `
        <html>
          <head></head>
          <body>
            <h1>Potvrđen zbor građana u zajednici ${communityName}</h1>
            <p>Poštovani/a,</p>
            <p>Obaveštavamo vas da je zbor građana u mesnoj zajednici <strong>${communityName}</strong> potvrđen!</p>
            <p><strong>Detalji zbora:</strong></p>
            <ul>
              <li>Datum: ${assembly.date}</li>
              <li>Vreme: ${assembly.time}</li>
              <li>Adresa: ${assembly.address}</li>
              <li>Opis: ${assembly.description || 'Razgovor o lokalnim problemima i inicijativama'}</li>
            </ul>
            <p>Vaše prisustvo je važno za rešavanje problema naše lokalne zajednice.</p>
            <p>Hvala na podršci!</p>
            <p><strong>Građanski Front</strong></p>
          </body>
        </html>
      `;
      
      console.log('Šaljem mejlove na adrese:', emails.map(e => e.email).join(', '));
      
      // Grupišemo primatelje u bulkove od po 20 adresa (Brevo ograničenje)
      const emailChunks = [];
      for (let i = 0; i < emails.length; i += 20) {
        emailChunks.push(emails.slice(i, i + 20));
      }
      
      let successCount = 0;
      
      for (const chunk of emailChunks) {
        try {
          const response = await axios.post(
            'https://api.brevo.com/v3/smtp/email',
            {
              sender: {
                name: senderName,
                email: senderEmail
              },
              to: chunk.map(recipient => ({
                email: recipient.email,
                name: recipient.name || recipient.email
              })),
              subject: subject,
              htmlContent: htmlContent
            },
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'api-key': apiKey
              }
            }
          );
          
          console.log(`Paket mejlova uspešno poslat (${chunk.length} adresa), status:`, response.status);
          successCount += chunk.length;
        } catch (error) {
          console.error('Greška pri slanju paketa mejlova:');
          if (axios.isAxiosError(error)) {
            console.error('Status:', error.response?.status);
            console.error('Poruka:', error.response?.data);
          } else {
            console.error(error);
          }
        }
      }
      
      console.log(`Uspešno poslato ${successCount} od ${emails.length} mejlova.`);

    } catch (error) {
      console.error('Greška pri slanju mejlova:', error);
    }
  }

  // Dodajemo pomoćnu metodu za dohvatanje assembly po imenu zajednice
  async getAssemblyByLocalCommunityName(localCommunityName: string): Promise<Assembly | undefined> {
    try {
      const assembliesSnapshot = await getDocs(
        query(
          collection(db, 'assemblies'),
          where('localCommunityName', '==', localCommunityName)
        )
      );
      
      if (assembliesSnapshot.empty) {
        return undefined;
      }
      
      return convertDocToAssembly(assembliesSnapshot.docs[0]);
    } catch (error) {
      console.error('Greška pri dohvatanju zbora po imenu zajednice:', error);
      return undefined;
    }
  }

  /**
   * Adds a new member to the database
   * @param memberData The member data to add
   * @returns Promise that resolves when the member is added
   */
  async addNewMember(memberData: Member): Promise<string> {
    try {
      // For development environment, just log the data and return success
      if (isDevelopment) {
        console.log('Development mode: Simulating adding member:', memberData);
        return 'dev-member-id-' + Date.now();
      }

      // Initialize Firebase if not already initialized
      if (!this.initialized) {
        await this.init();
      }

      // Add member to Firestore
      const db = getFirestore();
      const membersCollection = collection(db, 'members');
      
      // Check if email already exists
      const emailQuery = query(membersCollection, where('email', '==', memberData.email));
      const existingMembers = await getDocs(emailQuery);
      
      if (!existingMembers.empty) {
        // Update existing member instead of creating a new one
        const existingMember = existingMembers.docs[0];
        await updateDoc(doc(db, 'members', existingMember.id), {
          ...memberData,
          updatedAt: new Date().toISOString(),
        });
        return existingMember.id;
      }
      
      // Add new member
      const docRef = await addDoc(membersCollection, {
        ...memberData,
        createdAt: new Date().toISOString(),
      });
      
      return docRef.id;
    } catch (error) {
      console.error('Error adding member:', error);
      if (isDevelopment) {
        // In development, simulate success
        console.log('Development mode: Simulating successful member addition despite error');
        return 'dev-member-id-' + Date.now();
      }
      throw new Error('Failed to add member');
    }
  }

  /**
   * Sends an email using Firebase Cloud Functions
   * @param emailData The email data to send
   * @returns Promise that resolves when the email is sent
   */
  async sendEmail(emailData: EmailData): Promise<boolean> {
    try {
      // For development environment, just log the data and return success
      if (isDevelopment) {
        console.log('Development mode: Simulating email sending:', emailData);
        return true;
      }

      // Initialize Firebase if not already initialized
      if (!this.initialized) {
        await this.init();
      }

      // Call the sendEmail Cloud Function
      const functions = getFunctions();
      const sendEmailFunction = httpsCallable(functions, 'sendEmail');
      
      const result = await sendEmailFunction(emailData);
      return result.data as boolean;
    } catch (error) {
      console.error('Error sending email:', error);
      if (isDevelopment) {
        // In development, simulate success
        console.log('Development mode: Simulating successful email sending despite error');
        return true;
      }
      throw new Error('Failed to send email');
    }
  }

  /**
   * Sends a welcome email to a new member with zbor information
   * @param email The email address to send to
   * @param firstName The member's first name
   * @param localCommunity The member's local community
   * @returns Promise that resolves when the email is sent
   */
  async sendWelcomeEmail(email: string, firstName: string, localCommunity: string): Promise<boolean> {
    const emailData: EmailData = {
      to: email,
      subject: 'Dobrodošli u Građanski Front',
      template: 'welcome-member',
      templateData: {
        firstName,
        localCommunity,
        telegramLink: 'https://t.me/+xVyPlEJOyX4xODY0', // This could be dynamic based on local community
        zborAgenda: [
          'Usvajanje zapisnika prethodne sednice Zbora',
          'Usvajanje dnevnog reda',
          'Formiranje predloženih radnih grupa na nivou mesne zajednice',
          'Odabir moderatora i zapisničara za sledeći Zbor',
          'Razno'
        ]
      }
    };

    return this.sendEmail(emailData);
  }

  /**
   * Sends a test email to verify the email sending functionality
   * @param email The email address to send the test to
   * @returns Promise that resolves when the email is sent
   */
  async sendTestEmail(email: string): Promise<boolean> {
    try {
      // For development environment, just log the data and return success
      if (isDevelopment) {
        console.log('Development mode: Simulating test email sending to:', email);
        
        // In development, we'll make a direct HTTP request to the test endpoint
        try {
          const response = await fetch(`https://us-central1-gradjanskifront.cloudfunctions.net/testEmail?email=${encodeURIComponent(email)}`);
          const data = await response.json();
          console.log('Test email response:', data);
          return data.success;
        } catch (httpError) {
          console.error('Error making HTTP request to test endpoint:', httpError);
          return true; // Still return true in development mode
        }
      }

      // Initialize Firebase if not already initialized
      if (!this.initialized) {
        await this.init();
      }

      // Call the testEmail Cloud Function
      const response = await fetch(`https://us-central1-gradjanskifront.cloudfunctions.net/testEmail?email=${encodeURIComponent(email)}`);
      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('Error sending test email:', error);
      if (isDevelopment) {
        // In development, simulate success
        console.log('Development mode: Simulating successful test email sending despite error');
        return true;
      }
      throw new Error('Failed to send test email');
    }
  }
}

// Export a singleton instance
const firebaseService = new FirebaseService();
export default firebaseService; 