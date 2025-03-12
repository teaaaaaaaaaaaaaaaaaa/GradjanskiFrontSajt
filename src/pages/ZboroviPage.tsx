import { useState, useEffect } from 'react'
import BelgradeMap from '../components/map/BelgradeMap'
import FirebaseService, { Assembly } from '../services/FirebaseService'
import { AlertCircle, Check, CheckCircle } from 'lucide-react'

function ZboroviPage() {
  const [assemblies, setAssemblies] = useState<Assembly[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const [testEmailInput, setTestEmailInput] = useState('');
  const [testEmailName, setTestEmailName] = useState('');
  const [testEmailResult, setTestEmailResult] = useState<string | null>(null);
  const isDev = import.meta.env.DEV;

  useEffect(() => {
    const fetchAssemblies = async () => {
      try {
        const data = await FirebaseService.getAssemblies();
        setAssemblies(data);
      } catch (err) {
        setError('Greška prilikom učitavanja podataka o zborovima.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssemblies();
  }, []);

  const handleMarkerClick = (localCommunityId: string) => {
    setSelectedCommunity(localCommunityId);
  };

  const handleRegisterAttendee = async (email: string, name: string, assemblyId: string) => {
    try {
      await FirebaseService.registerAttendee(email, name, assemblyId);
      const updatedAssemblies = await FirebaseService.getAssemblies();
      setAssemblies(updatedAssemblies);
      setFormSuccess('Uspešno ste se registrovali za zbor!');
      setTimeout(() => setFormSuccess(null), 5000);
    } catch (err) {
      throw err;
    }
  };

  const handleScheduleAssembly = async (
    localCommunityId: string,
    date: string,
    time: string,
    email: string,
    name: string,
    phone: string,
    address: string,
    description: string
  ) => {
    try {
      await FirebaseService.scheduleAssembly(
        localCommunityId,
        date,
        time,
        email,
        name,
        phone,
        address,
        description
      );
      const updatedAssemblies = await FirebaseService.getAssemblies();
      setAssemblies(updatedAssemblies);
      setFormSuccess('Uspešno ste zakazali zbor!');
      setTimeout(() => setFormSuccess(null), 5000);
    } catch (err) {
      throw err;
    }
  };

  const handleTestEmailSend = async () => {
    if (!testEmailInput.trim() || !testEmailName.trim()) {
      setTestEmailResult('Molimo vas da unesete email adresu i ime.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(testEmailInput)) {
      setTestEmailResult('Molimo vas da unesete validnu email adresu.');
      return;
    }

    try {
      setTestEmailResult('Slanje testnog email-a...');
      const result = await FirebaseService.testSendEmail(testEmailInput, testEmailName);
      if (result) {
        setTestEmailResult('Testni email je uspešno poslat! Proverite vaš inbox.');
      } else {
        setTestEmailResult('Neuspešno slanje email-a. Molimo vas da proverite vašu konfiguraciju.');
      }
    } catch (err) {
      setTestEmailResult(`Greška: ${err instanceof Error ? err.message : 'Nepoznata greška'}`);
    }
  };

  return (
    <div className="pt-16 bg-white">
      {/* Naslov i prvi deo - poravnat levo */}
      <section className="w-full px-4 py-12">
        <div className="text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-red-700">ZBOR GRAĐANA – TVOJ GLAS, TVOJA ZAJEDNICA!</h1>

          <p className="text-xl font-bold mb-6">
            Naša platforma omogućava građanima da se organizuju, povezuju i aktivno učestvuju u društvenim promenama
            kroz zborove građana.
          </p>

          <p className="mb-6 text-lg">
            Zbor građana je ključna prilika za tvoje aktivno učešće u rešavanju pitanja u tvojoj mesnoj zajednici. Kroz
            ove zborove građani mogu direktno komunicirati, donositi odluke i inicirati promene. Zbor je preduslov za
            formiranje građanskih radnih grupa, baš kao što je plenum preduslov za rad studentskih radnih grupa.
          </p>
        </div>

        {/* Drugi deo - poravnat desno */}
        <div className="text-right mt-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-red-700">KAKO FUNKCIONIŠE NAŠA MAPA?</h2>
          
          <p className="mb-6 text-lg">
            Na mapi su prikazane sve mesne zajednice, a svaki zbor označen je odgovarajućom bojom:
          </p>

          <ul className="mb-10 text-lg space-y-4 list-none">
            <li className="text-right">
              <span className="font-bold">Crveno dugme:</span> Ako zbor još uvek nije predložen, građanin može biti prvi
              koji će inicirati organizovanje budućeg zbora klikom na crveno dugme.
            </li>
            <li className="text-right">
              <span className="font-bold">Žuto dugme:</span> Ako je zbor već predložen, klikom na žuto dugme građanin se
              prijavljuje za učešće.
            </li>
            <li className="text-right">
              <span className="font-bold">Zeleno dugme:</span> Kada je zbor organizovan, klikom na zeleno dugme građanin
              dobija link za pristup Telegram grupi, koja je glavni kanal za dalju komunikaciju i organizaciju.
            </li>
          </ul>

          <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-red-700">KAKO KORISTITI STRANICU?</h2>
        </div>
      </section>

      {/* Sekcija sa koracima - centrirana */}
      <section className="bg-white py-12">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-10 md:mb-16 text-red-700">
          ŽELIŠ DA SE PRIKLJUČIŠ? POSTUPAK JE JEDNOSTAVAN!
        </h2>

        <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8 px-4">
          {/* Korak 1 */}
          <div className="border-2 border-red-700 bg-red-700 text-white rounded-none flex flex-col items-center w-full md:w-1/3 max-w-md">
            <div className="text-6xl md:text-8xl font-bold my-6 md:my-8">1</div>
            <div className="p-6 md:p-8 pt-0">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-center">Klikni na dugme "Pridruži se"</h3>
              <p className="text-center text-base md:text-lg">Odaberi radnu grupu koja odgovara tvojim interesima i veštinama</p>
            </div>
          </div>

          {/* Korak 2 */}
          <div className="border-2 border-red-700 bg-red-700 text-white rounded-none flex flex-col items-center w-full md:w-1/3 max-w-md">
            <div className="text-6xl md:text-8xl font-bold my-6 md:my-8">2</div>
            <div className="p-6 md:p-8 pt-0">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-center">Uđi u Telegram grupu izabrane GRG</h3>
              <p className="text-center text-base md:text-lg">Dobićeš link za pristup Telegram grupi gde se odvija komunikacija</p>
            </div>
          </div>

          {/* Korak 3 */}
          <div className="border-2 border-red-700 bg-red-700 text-white rounded-none flex flex-col items-center w-full md:w-1/3 max-w-md">
            <div className="text-6xl md:text-8xl font-bold my-6 md:my-8">3</div>
            <div className="p-6 md:p-8 pt-0">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-center">Prati uputstva i preuzmi ulogu u organizaciji</h3>
              <p className="text-center text-base md:text-lg">Uključi se u aktivnosti i doprinesi na svoj način</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dodatne informacije */}
      <section className="w-full px-4 py-8 mb-6 md:mb-12">
        <p className="text-center text-lg md:text-xl font-semibold">
          Telegram je glavni sredstvo komunikacije za organizovanje i dogovaranje svih detalja oko zborova i drugih
          aktivnosti u tvojoj mesnoj zajednici.
        </p>
      </section>

      {/* Postojeca mapa i funkcije */}
      <div className="container mx-auto px-4 md:px-6 pb-16">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Mapa beogradskih zborova</h2>
          <p className="text-base md:text-lg mb-4">
            Pronađite vašu mesnu zajednicu na mapi i saznajte status održavanja zbora građana.
            Možete se registrovati za učešće na zboru ili zakazati novi zbor.
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-md p-4 mb-8">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          </div>
        ) : (
          <>
            {formSuccess && (
              <div className="bg-green-100 border border-green-200 text-green-800 rounded-md p-4 mb-8 flex items-start">
                <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5 text-green-600" />
                <p>{formSuccess}</p>
              </div>
            )}
            
            <div className="h-[500px] md:h-[800px] rounded-lg overflow-hidden shadow-lg border border-gray-200">
              <BelgradeMap 
                assemblies={assemblies}
                onMarkerClick={handleMarkerClick}
                selectedCommunity={selectedCommunity}
                onScheduleAssembly={handleScheduleAssembly}
                onRegisterAttendee={handleRegisterAttendee}
              />
            </div>
            
            {isDev && (
              <div className="mt-8 p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Test slanja email-a (samo u razvojnom režimu)</h3>
                
                {isTestingEmail ? (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="testEmail" className="block text-sm font-medium mb-1">
                        Email adresa za test
                      </label>
                      <input
                        type="email"
                        id="testEmail"
                        className="w-full px-3 py-2 rounded-md border"
                        value={testEmailInput}
                        onChange={(e) => setTestEmailInput(e.target.value)}
                        placeholder="vasa.adresa@email.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="testName" className="block text-sm font-medium mb-1">
                        Ime i prezime za test
                      </label>
                      <input
                        type="text"
                        id="testName"
                        className="w-full px-3 py-2 rounded-md border"
                        value={testEmailName}
                        onChange={(e) => setTestEmailName(e.target.value)}
                        placeholder="Vaše Ime"
                      />
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={handleTestEmailSend}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Pošalji test email
                      </button>
                      
                      <button
                        onClick={() => setIsTestingEmail(false)}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                      >
                        Otkaži
                      </button>
                    </div>
                    
                    {testEmailResult && (
                      <div className="mt-2 p-3 bg-gray-100 rounded-md text-sm">
                        {testEmailResult}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => setIsTestingEmail(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Testiraj slanje mejla
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {/* Info Section */}
        {!loading && !error && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-red-700 flex items-center justify-center text-white mr-4">
                  <span className="font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold">Pronađite svoju mesnu zajednicu</h3>
              </div>
              <p className="text-gray-600">
                Koristite mapu da pronađete vašu mesnu zajednicu i saznate da li se u njoj organizuje zbor građana.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-red-700 flex items-center justify-center text-white mr-4">
                  <span className="font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold">Iniciranje zbora građana</h3>
              </div>
              <p className="text-gray-600">
                Ako u vašoj zajednici još uvek nije zakazan zbor, možete biti prvi koji će ga inicirati klikom na marker na mapi.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-red-700 flex items-center justify-center text-white mr-4">
                  <span className="font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold">Učestvovanje na zboru</h3>
              </div>
              <p className="text-gray-600">
                Ako je zbor već zakazan, možete se registrovati za učešće i dobijati obaveštenja o njemu.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ZboroviPage; 