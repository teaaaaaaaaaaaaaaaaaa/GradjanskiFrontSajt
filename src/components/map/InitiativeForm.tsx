import { useState } from 'react';
import { localCommunities } from '../../services/FirebaseService';

interface InitiativeFormProps {
  localCommunityId: string;
  onSubmit: (data: {
    localCommunityId: string;
    localCommunityName: string;
    address: string;
    description: string;
    contactPhone: string;
    scheduleNow: boolean;
    date: string;
    time: string;
  }) => Promise<void>;
}

const InitiativeForm = ({ localCommunityId, onSubmit }: InitiativeFormProps) => {
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [scheduleNow, setScheduleNow] = useState(false);

  const community = localCommunities.find(c => c.id === localCommunityId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!community) {
      setError('Mesna zajednica nije pronađena.');
      return;
    }
    
    if (!address.trim()) {
      setError('Unesite adresu održavanja zbora.');
      return;
    }
    
    if (!description.trim()) {
      setError('Unesite opis inicijative.');
      return;
    }
    
    if (!contactPhone.trim()) {
      setError('Unesite kontakt telefon.');
      return;
    }
    
    if (scheduleNow) {
      if (!date.trim()) {
        setError('Unesite datum održavanja zbora.');
        return;
      }
      
      if (!time.trim()) {
        setError('Unesite vreme održavanja zbora.');
        return;
      }
    }
    
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);
    
    try {
      await onSubmit({
        localCommunityId,
        localCommunityName: community.name,
        address,
        description,
        contactPhone,
        scheduleNow,
        date,
        time,
      });
      
      setSuccess('Uspešno ste pokrenuli inicijativu za sazivanje zbora!');
      
      // Reset form
      setAddress('');
      setDescription('');
      setContactPhone('');
      setDate('');
      setTime('');
      setScheduleNow(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Došlo je do greške prilikom pokretanja inicijative.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 border border-border rounded-lg bg-card">
      <h3 className="text-lg font-medium mb-2">Inicijativa za sazivanje zbora</h3>
      
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          <strong>Mesna zajednica:</strong> {community?.name || 'Nepoznata mesna zajednica'}
        </p>
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
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="address" className="block text-sm font-medium mb-1">
              Adresa održavanja zbora
            </label>
            <input
              type="text"
              id="address"
              className="w-full px-3 py-2 rounded-md border border-input bg-background"
              placeholder="Npr. Ulica Slobode 1, Beograd"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Opis inicijative
            </label>
            <textarea
              id="description"
              className="w-full px-3 py-2 rounded-md border border-input bg-background min-h-[100px]"
              placeholder="Opišite razlog za sazivanje zbora..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="contactPhone" className="block text-sm font-medium mb-1">
              Kontakt telefon
            </label>
            <input
              type="tel"
              id="contactPhone"
              className="w-full px-3 py-2 rounded-md border border-input bg-background"
              placeholder="Npr. +381 11 123 4567"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Ovaj broj će biti dostupan zainteresovanim građanima.
            </p>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="scheduleNow"
              className="mr-2"
              checked={scheduleNow}
              onChange={(e) => setScheduleNow(e.target.checked)}
            />
            <label htmlFor="scheduleNow" className="text-sm font-medium">
              Odmah zakaži zbor
            </label>
          </div>
          
          {scheduleNow && (
            <div className="space-y-4 p-3 bg-muted rounded-md">
              <div>
                <label htmlFor="date" className="block text-sm font-medium mb-1">
                  Datum zbora
                </label>
                <input
                  type="date"
                  id="date"
                  className="w-full px-3 py-2 rounded-md border border-input bg-background"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required={scheduleNow}
                />
              </div>
              
              <div>
                <label htmlFor="time" className="block text-sm font-medium mb-1">
                  Vreme zbora
                </label>
                <input
                  type="time"
                  id="time"
                  className="w-full px-3 py-2 rounded-md border border-input bg-background"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required={scheduleNow}
                />
              </div>
            </div>
          )}
          
          <button
            type="submit"
            className="w-full px-4 py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-colors flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="mr-2">Slanje inicijative...</span>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </>
            ) : (
              scheduleNow ? 'Zakaži zbor' : 'Pokreni inicijativu'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InitiativeForm; 