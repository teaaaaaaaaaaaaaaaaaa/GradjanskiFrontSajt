import { useState } from 'react';
import FirebaseService, { localCommunities } from '../../services/FirebaseService';
import { X } from 'lucide-react';

interface InitiativeFormData {
  localCommunityId: string;
  localCommunityName: string;
  address: string;
  description: string;
  contactPhone: string;
  scheduleNow: boolean;
  date: string;
  time: string;
  email: string;
  name: string;
  isResident: boolean;
}

interface InitiativeFormProps {
  localCommunityId: string;
  onSubmit: (data: InitiativeFormData) => Promise<void>;
  onClose?: () => void;
  formError?: string | null;
}

const InitiativeForm = ({ localCommunityId, onSubmit, onClose, formError: externalError }: InitiativeFormProps) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isResident, setIsResident] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [internalError, setInternalError] = useState<string | null>(null);

  // Use either internal or external error
  const error = internalError || externalError;

  const community = localCommunities.find(c => c.id === localCommunityId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!community) {
      setInternalError('Mesna zajednica nije pronađena.');
      return;
    }
    
    if (!isResident) {
      setInternalError('Morate potvrditi da ste stanovnik ove mesne zajednice.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setInternalError('Molimo unesite ispravnu email adresu.');
      return;
    }
    
    setIsSubmitting(true);
    setInternalError(null);
    
    try {
      const isDuplicateEmail = await FirebaseService.isEmailRegistered(email, community.name);
      if (isDuplicateEmail) {
        setInternalError('Već ste registrovani sa ovom email adresom.');
        setIsSubmitting(false);
        return;
      }

      await onSubmit({
        localCommunityId,
        localCommunityName: community.name,
        address: community.address,
        description: '',
        contactPhone: '',
        scheduleNow: false,
        date: '',
        time: '',
        email,
        name,
        isResident
      });
      
      // Form will be closed by parent component on success
      
    } catch (err) {
      setInternalError(err instanceof Error ? err.message : 'Došlo je do greške prilikom prijave.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-auto p-6" style={{ maxHeight: '100vh' }}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Zakaži zbor</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
      </div>

      {error && (
        <div className="mb-6 p-3 rounded-md text-sm bg-red-50 border border-red-200 text-red-700">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          <strong>Mesna zajednica:</strong> {community?.name}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Adresa:</strong> {community?.address}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Ime i prezime <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email adresa <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Na ovu adresu ćete dobiti obaveštenje kada zbor bude potvrđen.
          </p>
        </div>
        
        <div className="flex items-start">
          <input
            type="checkbox"
            id="isResident"
            className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            checked={isResident}
            onChange={(e) => setIsResident(e.target.checked)}
            required
          />
          <label htmlFor="isResident" className="ml-2 block text-sm text-gray-600">
            Potvrđujem da sam stanovnik ove mesne zajednice <span className="text-red-500">*</span>
          </label>
        </div>
        
        <button
          type="submit"
          className="w-full px-4 py-3 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <span className="mr-2">Prijava u toku...</span>
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            'Zakaži zbor'
          )}
        </button>
      </form>
    </div>
  );
};

export default InitiativeForm; 