import React, { useState } from 'react';
import { Assembly } from '../../services/FirebaseService';

interface AssemblyRegistrationFormProps {
  assembly: Partial<Assembly>;
  onRegister: (email: string, name: string) => Promise<void>;
  isRegistered: boolean;
  formError?: string | null;
  hideHeader?: boolean;
}

const AssemblyRegistrationForm: React.FC<AssemblyRegistrationFormProps> = ({
  assembly,
  onRegister,
  isRegistered,
  formError,
  hideHeader = false
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(formError || null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Validacija email adrese
      if (!email.includes('@')) {
        setError('Molimo vas unesite validnu email adresu.');
        setIsSubmitting(false);
        return;
      }

      await onRegister(email, name);
      setSuccess(true);
      setEmail('');
      setName('');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Došlo je do greške prilikom registracije.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Prikaži informacije o zboru i formu za prijavu
  const communityName = assembly.localCommunityName || 'ovoj mesnoj zajednici';
  
  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      {!hideHeader && (
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-bold mb-2">Potpiši peticiju</h2>
          <div className="bg-gray-100 p-3 rounded-md">
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium">Mesna zajednica:</span>
              <span>{assembly.localCommunityName}</span>
            </div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium">Adresa:</span>
              <span>{assembly.address}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Broj potpisa:</span>
              <span className="font-bold">{assembly.signatureCount || 0}</span>
            </div>
          </div>
        </div>
      )}
      
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-200 text-red-700 rounded-md flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p>{error}</p>
        </div>
      )}
      
      {success ? (
        <div className="mb-6 p-4 bg-green-100 border border-green-200 text-green-700 rounded-md flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <p>Uspešno ste se prijavili za zbor!</p>
        </div>
      ) : isRegistered ? (
        <div className="mb-6 p-4 bg-blue-100 border border-blue-200 text-blue-700 rounded-md flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p>Već ste registrovani za ovaj zbor.</p>
        </div>
      ) : (
        <>
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Lokacija:</span>
                <span className="text-gray-800">{communityName}</span>
              </div>
              
              {assembly.address && (
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Adresa:</span>
                  <span className="text-gray-800">{assembly.address}</span>
                </div>
              )}
              
              {assembly.date && assembly.time && (
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Termin:</span>
                  <span className="text-gray-800">{assembly.date} u {assembly.time}h</span>
                </div>
              )}
              
              <div className="flex justify-between text-gray-800">
                <span className="font-medium text-gray-700">Trenutni broj potpisa:</span>
                <span className="font-bold">{assembly.signatureCount || 0}</span>
              </div>
              
              <div className="flex justify-between text-gray-800">
                <span className="font-medium text-gray-700">Potrebno potpisa:</span>
                <span className="font-bold">10</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                Ime i prezime <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Unesite vaše ime i prezime"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                Email adresa <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Unesite vašu email adresu"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <p className="mt-2 text-xs text-gray-500">
                Vaša email adresa će biti korišćena samo za obaveštenja o zboru.
              </p>
            </div>

            <button 
              type="submit" 
              className="w-full px-6 py-3 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-colors flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  Slanje...
                </>
              ) : 'Potpiši peticiju'}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default AssemblyRegistrationForm; 