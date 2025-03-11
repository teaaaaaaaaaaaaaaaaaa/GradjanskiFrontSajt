import { useState } from 'react';
import FirebaseService, { Assembly, SIGNATURE_THRESHOLD } from '../../services/FirebaseService';

interface AssemblyRegistrationFormProps {
  assembly: Assembly;
  onRegister: (email: string, name: string) => Promise<void>;
  isRegistered: boolean;
}

const AssemblyRegistrationForm = ({ 
  assembly, 
  onRegister, 
  isRegistered
}: AssemblyRegistrationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isRegistered) {
      setError('Već ste registrovani za ovaj zbor.');
      return;
    }
    
    if (!email || !name) {
      setError('Molimo unesite vaše ime i email adresu.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Molimo unesite validnu email adresu.');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);
    
    try {
      await onRegister(email, name);
      setSuccess('Uspešno ste se registrovali za zbor!');
      // Reset form
      setEmail('');
      setName('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Došlo je do greške prilikom registracije.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Determine status class based on signature count
  const getStatusClass = () => {
    if (assembly.status === 'confirmed' || assembly.signatureCount >= SIGNATURE_THRESHOLD) {
      return 'bg-green-100 text-green-800';
    }
    return 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="p-4 border border-border rounded-lg bg-card">
      <h3 className="text-lg font-medium mb-2">Registracija za zbor</h3>
      
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          <strong>Lokacija:</strong> {assembly.localCommunityName}
        </p>
        <p className="text-sm text-muted-foreground">
          <strong>Datum i vreme:</strong> {new Date(assembly.date).toLocaleDateString('sr-RS')} u {assembly.time}
        </p>
        <p className="text-sm text-muted-foreground">
          <strong>Adresa:</strong> {assembly.address}
        </p>
        
        <div className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm ${getStatusClass()}`}>
          <span>
            {assembly.signatureCount} / {SIGNATURE_THRESHOLD} potpisa
            {assembly.status === 'confirmed' && ' (Potvrđeno)'}
          </span>
        </div>
        
        {assembly.status === 'confirmed' && (
          <div className="mt-3 p-3 bg-green-50 border border-green-100 rounded-md">
            <p className="text-sm text-green-800">
              <strong>Zbor je potvrđen!</strong> Za više informacija možete kontaktirati organizatora na broj: {assembly.contactPhone}
            </p>
          </div>
        )}
      </div>
      
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-md p-3 mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-200 text-green-800 rounded-md p-3 mb-4">
          {success}
        </div>
      )}
      
      {isRegistered ? (
        <div className="bg-primary/10 border border-primary/20 text-primary rounded-md p-3">
          Već ste registrovani za ovaj zbor.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="petition-form">
          <div className="petition-form-header">
            <h4 className="text-base font-medium">Potpišite peticiju za zbor</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Vaš potpis je važan za uspešno održavanje zbora. Kada zbor dostigne {SIGNATURE_THRESHOLD} potpisa, svi učesnici će dobiti email sa kontakt informacijama.
            </p>
          </div>
          
          <div className="petition-form-body space-y-4 my-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Ime i prezime <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 rounded-md border border-input bg-background"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email adresa <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 rounded-md border border-input bg-background"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Na ovu adresu ćete dobiti obaveštenje kada zbor bude potvrđen.
              </p>
            </div>
          </div>
          
          <div className="petition-form-footer">
            <button
              type="submit"
              className={`w-full px-4 py-2 text-white rounded-md font-medium transition-colors flex items-center justify-center ${
                assembly.status === 'confirmed' ? 'bg-green-600 hover:bg-green-700' : 'bg-yellow-500 hover:bg-yellow-600'
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="mr-2">Registracija u toku...</span>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </>
              ) : (
                'Potpišite peticiju'
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AssemblyRegistrationForm; 