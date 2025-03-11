/**
 * DEPRECATED: This file is no longer used and should be removed.
 * The application now uses FirebaseService.ts instead.
 */

// This file is kept for reference but is no longer used in the application.
// Please use FirebaseService.ts for all data operations.

export {};

import { GoogleSpreadsheet } from 'google-spreadsheet';

// Define simplified types
export interface Registration {
  email: string;
  name: string;
  communityName: string;
  date: string;
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

// Mock data for local communities in Belgrade
export const localCommunities = [
  { id: 'vracar-1', name: 'Vracar - Crveni Krst', coordinates: { lat: 44.798, lng: 20.485 } },
  { id: 'vracar-2', name: 'Vracar - Neimar', coordinates: { lat: 44.796, lng: 20.476 } },
  { id: 'vracar-3', name: 'Vracar - Slavija', coordinates: { lat: 44.802, lng: 20.466 } },
  { id: 'nbg-1', name: 'Novi Beograd - Blok 21', coordinates: { lat: 44.815, lng: 20.435 } },
  { id: 'nbg-2', name: 'Novi Beograd - Blok 45', coordinates: { lat: 44.795, lng: 20.375 } },
  { id: 'nbg-3', name: 'Novi Beograd - Fontana', coordinates: { lat: 44.825, lng: 20.405 } },
  { id: 'nbg-4', name: 'Novi Beograd - Arena', coordinates: { lat: 44.815, lng: 20.421 } },
  { id: 'nbg-5', name: 'Novi Beograd - Bezanija', coordinates: { lat: 44.820, lng: 20.380 } },
  { id: 'palilula-1', name: 'Palilula - Karaburma', coordinates: { lat: 44.814, lng: 20.498 } },
  { id: 'palilula-2', name: 'Palilula - Borča', coordinates: { lat: 44.873, lng: 20.458 } },
  { id: 'palilula-3', name: 'Palilula - Kotež', coordinates: { lat: 44.856, lng: 20.482 } },
  { id: 'zvezdara-1', name: 'Zvezdara - Cvetkova pijaca', coordinates: { lat: 44.793, lng: 20.504 } },
  { id: 'zvezdara-2', name: 'Zvezdara - Lion', coordinates: { lat: 44.783, lng: 20.518 } },
  { id: 'zvezdara-3', name: 'Zvezdara - Mirijevo', coordinates: { lat: 44.795, lng: 20.535 } },
  { id: 'zemun-1', name: 'Zemun - Centar', coordinates: { lat: 44.843, lng: 20.411 } },
  { id: 'zemun-2', name: 'Zemun - Altina', coordinates: { lat: 44.856, lng: 20.387 } },
  { id: 'zemun-3', name: 'Zemun - Batajnica', coordinates: { lat: 44.918, lng: 20.269 } },
  { id: 'cukarica-1', name: 'Čukarica - Banovo brdo', coordinates: { lat: 44.773, lng: 20.419 } },
  { id: 'cukarica-2', name: 'Čukarica - Žarkovo', coordinates: { lat: 44.760, lng: 20.414 } },
  { id: 'cukarica-3', name: 'Čukarica - Cerak', coordinates: { lat: 44.753, lng: 20.421 } },
  { id: 'rakovica-1', name: 'Rakovica - Centar', coordinates: { lat: 44.747, lng: 20.451 } },
  { id: 'rakovica-2', name: 'Rakovica - Vidikovac', coordinates: { lat: 44.738, lng: 20.427 } },
  { id: 'rakovica-3', name: 'Rakovica - Resnik', coordinates: { lat: 44.715, lng: 20.464 } },
  { id: 'vozdovac-1', name: 'Voždovac - Autokomanda', coordinates: { lat: 44.786, lng: 20.472 } },
  { id: 'vozdovac-2', name: 'Voždovac - Banjica', coordinates: { lat: 44.763, lng: 20.483 } },
  { id: 'vozdovac-3', name: 'Voždovac - Kumodraž', coordinates: { lat: 44.752, lng: 20.513 } },
  { id: 'savski-venac-1', name: 'Savski venac - Klinički centar', coordinates: { lat: 44.797, lng: 20.458 } },
  { id: 'savski-venac-2', name: 'Savski venac - Dedinje', coordinates: { lat: 44.786, lng: 20.452 } },
  { id: 'stari-grad-1', name: 'Stari grad - Dorćol', coordinates: { lat: 44.825, lng: 20.462 } },
  { id: 'stari-grad-2', name: 'Stari grad - Kalemegdan', coordinates: { lat: 44.823, lng: 20.452 } },
];

// Mock data for assemblies
const mockAssemblies: Assembly[] = [
  {
    id: '1',
    localCommunityId: 'vracar-1',
    localCommunityName: 'Vracar - Crveni Krst',
    date: '2023-06-15',
    time: '18:00',
    address: 'Ulica Slobode 1, Beograd',
    description: 'Zbor građana mesne zajednice Crveni Krst o problemima saobraćaja i parkinga.',
    status: 'never-scheduled',
    signatureCount: 0,
    contactPhone: '+381 11 123 4567',
    initiatorEmail: 'organizator@example.com',
    initiatorName: 'Petar Petrović'
  },
  {
    id: '2',
    localCommunityId: 'nbg-1',
    localCommunityName: 'Novi Beograd - Blok 21',
    date: '2023-06-18',
    time: '19:00',
    address: 'Bulevar Mihajla Pupina 15, Beograd',
    description: 'Zbor građana o uređenju zelenih površina u bloku 21.',
    status: 'never-scheduled',
    signatureCount: 0,
    contactPhone: '+381 11 234 5678',
    initiatorEmail: 'organizator2@example.com',
    initiatorName: 'Marija Marković'
  },
  {
    id: '3',
    localCommunityId: 'zemun-1',
    localCommunityName: 'Zemun - Centar',
    date: '',
    time: '',
    address: 'Glavna ulica 10, Zemun',
    description: 'Još uvek nije sazvan zbor za ovu mesnu zajednicu.',
    status: 'never-scheduled',
    signatureCount: 0,
    contactPhone: '+381 11 345 6789'
  },
];

// Mock data for registrations
const mockRegistrations: Registration[] = [
  {
    email: 'user1@example.com',
    name: 'Petar Petrović',
    communityName: 'Vracar - Crveni Krst',
    date: '2023-06-10',
    type: 'attendee'
  },
  {
    email: 'user2@example.com',
    name: 'Marija Marković',
    communityName: 'Vracar - Crveni Krst',
    date: '2023-06-11',
    type: 'attendee'
  },
  {
    email: 'organizator@example.com',
    name: 'Jovan Jovanović',
    communityName: 'Novi Beograd - Blok 21',
    date: '2023-06-12',
    type: 'initiator'
  },
];

// In a real application, you would use environment variables for these values
const SPREADSHEET_ID = 'your-spreadsheet-id';
const CLIENT_EMAIL = 'your-client-email';
const PRIVATE_KEY = 'your-private-key';

// Threshold for confirmed status
export const SIGNATURE_THRESHOLD = 1000;

class SheetService {
  private doc: GoogleSpreadsheet;
  private assemblies: Assembly[] = [...mockAssemblies];
  private registrations: Registration[] = [...mockRegistrations];
  private initialized = false;

  constructor() {
    // In a real app, this would connect to an actual Google Sheet
    this.doc = new GoogleSpreadsheet(SPREADSHEET_ID);
    
    // For demo purposes, we'll use the mock data instead of actual Google Sheets
    console.log('Using mock data instead of actual Google Sheets');
  }

  // Initialize the connection to Google Sheets
  async init() {
    if (this.initialized) return;
    
    try {
      // In a real app, you would authenticate with Google Sheets here
      // Uncomment these lines when you have your service account credentials
      /*
      await this.doc.useServiceAccountAuth({
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY,
      });
      await this.doc.loadInfo();
      */
      
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize Google Sheets:', error);
      throw error;
    }
  }

  // Get all assemblies
  async getAssemblies(): Promise<Assembly[]> {
    await this.init();
    return this.assemblies;
  }

  // Get assembly by ID
  async getAssemblyById(id: string): Promise<Assembly | undefined> {
    await this.init();
    return this.assemblies.find(a => a.id === id);
  }

  // Get assemblies by local community ID
  async getAssemblyByLocalCommunityId(localCommunityId: string): Promise<Assembly | undefined> {
    await this.init();
    return this.assemblies.find(a => a.localCommunityId === localCommunityId);
  }

  // Schedule an assembly
  async scheduleAssembly(
    localCommunityId: string, 
    date: string, 
    time: string, 
    initiatorEmail: string,
    initiatorName: string,
    contactPhone: string
  ): Promise<Assembly> {
    await this.init();
    
    // Check if assembly already exists
    let assembly = this.assemblies.find(a => a.localCommunityId === localCommunityId);
    const community = localCommunities.find(c => c.id === localCommunityId);
    
    if (!community) {
      throw new Error('Mesna zajednica nije pronađena.');
    }
    
    // Check if email already used for scheduling
    const isEmailUsed = await this.isEmailUsedForScheduling(initiatorEmail);
    if (isEmailUsed) {
      throw new Error('Već ste zakazali zbor sa ovom email adresom.');
    }
    
    if (assembly) {
      // Update existing assembly
      assembly.date = date;
      assembly.time = time;
      assembly.status = 'scheduled';
      assembly.initiatorEmail = initiatorEmail;
      assembly.initiatorName = initiatorName;
      assembly.contactPhone = contactPhone;
      assembly.signatureCount = 1; // Initiator counts as first signature
    } else {
      // Create new assembly
      assembly = {
        id: Math.random().toString(36).substring(2, 9),
        localCommunityId,
        localCommunityName: community.name,
        date,
        time,
        address: `${community.name}, Beograd`,
        description: `Zbor građana mesne zajednice ${community.name}`,
        status: 'scheduled',
        signatureCount: 1, // Initiator counts as first signature
        initiatorEmail,
        initiatorName,
        contactPhone
      };
      
      this.assemblies.push(assembly);
    }
    
    // Add initiator to registrations
    this.registrations.push({
      email: initiatorEmail,
      name: initiatorName,
      communityName: community.name,
      date: new Date().toISOString().split('T')[0],
      type: 'initiator'
    });
    
    // In a real app, this would save to Google Sheets
    // await this.saveRegistrationsToSheet();
    
    return assembly;
  }

  // Update an assembly
  async updateAssembly(id: string, data: Partial<Assembly>): Promise<Assembly | undefined> {
    await this.init();
    
    const index = this.assemblies.findIndex(a => a.id === id);
    if (index === -1) return undefined;
    
    this.assemblies[index] = { ...this.assemblies[index], ...data };
    
    // Check if we need to update status based on signature count
    if (this.assemblies[index].signatureCount >= SIGNATURE_THRESHOLD && 
        this.assemblies[index].status !== 'confirmed') {
      this.assemblies[index].status = 'confirmed';
      
      // In a real app, this is where you would send emails to all attendees
      console.log(`Assembly ${id} has reached ${SIGNATURE_THRESHOLD} signatures! Sending emails to attendees.`);
      this.sendConfirmationEmails(this.assemblies[index].localCommunityName);
    }
    
    return this.assemblies[index];
  }

  // Check if an email is already registered for a community
  async isEmailRegistered(email: string, communityName: string): Promise<boolean> {
    await this.init();
    return this.registrations.some(r => 
      r.email === email && 
      r.communityName === communityName
    );
  }

  // Check if an email is already used for scheduling any assembly
  async isEmailUsedForScheduling(email: string): Promise<boolean> {
    await this.init();
    return this.registrations.some(r => r.email === email && r.type === 'initiator');
  }

  // Register a user for an assembly (sign the petition)
  async registerAttendee(email: string, name: string, assemblyId: string): Promise<void> {
    await this.init();
    
    const assembly = await this.getAssemblyById(assemblyId);
    if (!assembly) {
      throw new Error('Zbor nije pronađen.');
    }
    
    // Check if already registered
    const isRegistered = await this.isEmailRegistered(email, assembly.localCommunityName);
    if (isRegistered) {
      throw new Error('Već ste potpisali peticiju za ovaj zbor sa ovom email adresom.');
    }
    
    // Add to registrations
    this.registrations.push({
      email,
      name,
      communityName: assembly.localCommunityName,
      date: new Date().toISOString().split('T')[0],
      type: 'attendee'
    });
    
    // Increment signature count
    await this.updateAssembly(assemblyId, {
      signatureCount: assembly.signatureCount + 1
    });
    
    // In a real app, this would save to Google Sheets
    // await this.saveRegistrationsToSheet();
  }

  // Get count of registrations for a community
  async getRegistrationCount(communityName: string): Promise<number> {
    await this.init();
    return this.registrations.filter(r => r.communityName === communityName).length;
  }

  // Send confirmation emails when threshold is reached
  private async sendConfirmationEmails(communityName: string): Promise<void> {
    const registrations = this.registrations.filter(r => r.communityName === communityName);
    const initiator = registrations.find(r => r.type === 'initiator');
    
    if (!initiator) return;
    
    const assembly = this.assemblies.find(a => a.localCommunityName === communityName);
    if (!assembly) return;
    
    // In a real app, this would send actual emails
    console.log(`Sending confirmation emails to ${registrations.length} people for community ${communityName}`);
    console.log(`Contact phone for this assembly: ${assembly.contactPhone}`);
    
    // For demo purposes, we'll just log the emails
    registrations.forEach(registration => {
      console.log(`Sending email to ${registration.email}`);
      // In a real app:
      // await sendEmail({
      //   to: registration.email,
      //   subject: `Zbor u ${communityName} je potvrđen!`,
      //   body: `Poštovani/a ${registration.name},\n\nZbor u mesnoj zajednici ${communityName} je potvrđen za ${assembly.date} u ${assembly.time}.\nZa više informacija možete kontaktirati organizatore na broj: ${assembly.contactPhone}\n\nHvala na učešću!`
      // });
    });
  }

  // In a real app, this method would save registrations to Google Sheets
  private async saveRegistrationsToSheet(): Promise<void> {
    // This is where you would implement the actual Google Sheets integration
    // For example:
    /*
    await this.init();
    
    const sheet = this.doc.sheetsByIndex[0]; // First sheet
    await sheet.clear();
    
    // Add headers
    await sheet.setHeaderRow(['Email', 'Name', 'CommunityName', 'Date', 'Type']);
    
    // Add rows
    await sheet.addRows(this.registrations);
    */
  }

  // In a real app, this method would load registrations from Google Sheets
  private async loadRegistrationsFromSheet(): Promise<void> {
    // This is where you would implement the actual Google Sheets integration
    // For example:
    /*
    await this.init();
    
    const sheet = this.doc.sheetsByIndex[0]; // First sheet
    const rows = await sheet.getRows();
    
    this.registrations = rows.map(row => ({
      email: row.Email,
      name: row.Name,
      communityName: row.CommunityName,
      date: row.Date,
      type: row.Type as 'initiator' | 'attendee'
    }));
    */
  }
}

export default new SheetService(); 