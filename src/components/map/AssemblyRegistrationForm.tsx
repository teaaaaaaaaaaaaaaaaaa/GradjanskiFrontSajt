import React, { useState } from 'react';
import { Assembly } from '../../services/FirebaseService';

interface AssemblyRegistrationFormProps {
  assembly: Partial<Assembly>;
  onRegister: (email: string, name: string) => Promise<void>;
  isRegistered: boolean;
  formError?: string | null;
}

const AssemblyRegistrationForm: React.FC<AssemblyRegistrationFormProps> = ({
  assembly,
  onRegister,
  isRegistered,
  formError
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
    <div className="assembly-registration-form">
      <h2>Potpiši peticiju za zbor</h2>
      
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
      
      {success ? (
        <div className="success-message">
          <p>Uspešno ste se prijavili za zbor!</p>
        </div>
      ) : isRegistered ? (
        <div className="info-message">
          <p>Već ste registrovani za ovaj zbor.</p>
        </div>
      ) : (
        <>
          <div className="assembly-details">
            <p>
              <strong>Lokacija:</strong> {communityName}
            </p>
            {assembly.address && (
              <p>
                <strong>Adresa:</strong> {assembly.address}
              </p>
            )}
            {assembly.date && assembly.time && (
              <p>
                <strong>Termin:</strong> {assembly.date} u {assembly.time}h
              </p>
            )}
            <p>
              <strong>Trenutni broj potpisa:</strong> {assembly.signatureCount || 0}
            </p>
            <p>
              <strong>Potrebno potpisa:</strong> 10
            </p>
          </div>

          <form onSubmit={handleSubmit} className="registration-form">
            <div className="form-group">
              <label htmlFor="name">
                Ime i prezime <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Unesite vaše ime i prezime"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">
                Email adresa <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Unesite vašu email adresu"
              />
              <small>Vaša email adresa će biti korišćena samo za obaveštenja o zboru.</small>
            </div>

            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Slanje...' : 'Potpiši peticiju'}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default AssemblyRegistrationForm; 