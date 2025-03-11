import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Users, MapPin, Calendar, ChevronDown, CheckCircle, AlertCircle } from 'lucide-react'

function ZboroviPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  const faqs = [
    {
      question: 'Koliko ljudi je potrebno za zbor?',
      answer: 'Ne postoji minimalan broj ljudi za zbor. Možeš početi i sa 5-10 ljudi iz tvog komšiluka ili zgrade. Važno je da počneš i da se glas širi!'
    },
    {
      question: 'Gde mogu organizovati zbor?',
      answer: 'Zbor možeš organizovati bilo gde: u parku, na trgu, u mesnoj zajednici, u dvorištu zgrade. Važno je da mesto bude pristupačno i da ima dovoljno prostora za sve učesnike.'
    },
    {
      question: 'Kako da vodim zapisnik sa zbora?',
      answer: 'Zapisnik treba da sadrži datum, vreme i mesto održavanja zbora, broj prisutnih, teme o kojima se razgovaralo i donete odluke. Možeš koristiti naš obrazac za zapisnik koji je dostupan na sajtu.'
    },
    {
      question: 'Šta ako neko pokušava da ometa zbor?',
      answer: 'Važno je unapred postaviti pravila diskusije. Ako neko ometa zbor, moderator treba ljubazno da ga podseti na pravila. Ako ometanje nastavi, možete zatražiti da napusti zbor. Uvek je dobro imati nekoliko ljudi zaduženih za održavanje reda.'
    },
    {
      question: 'Da li odluke zbora moraju biti jednoglasne?',
      answer: 'Idealno je težiti konsenzusu, ali to nije uvek moguće. Možete unapred dogovoriti način donošenja odluka - na primer, dvotrećinska većina za važne odluke. Važno je da proces bude transparentan i da svi učesnici razumeju kako se odluke donose.'
    }
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-primary py-16 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-anton mb-6">
              ZBOR JE OTVORENI SASTANAK GRAĐANA NA KOME SE KOLEKTIVNO DONOSE ODLUKE!
            </h1>
            <p className="text-xl mb-8 opacity-90">
              <strong>Svako može sazvati Zbor</strong> – bez lidera, bez hijerarhije, bez skrivenih interesa. 
              <strong> Mi sami odlučujemo o svojoj budućnosti!</strong>
            </p>
            <Link
              to="#sazovi"
              className="px-8 py-4 bg-white text-primary font-bold text-lg uppercase tracking-wider rounded-md hover:bg-white/90 transition-colors inline-flex items-center justify-center"
            >
              Sazovi Zbor SADA
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* What is Zbor Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-anton mb-8 text-center">
              ŠTA JE ZBOR I ZAŠTO JE VAŽAN?
            </h2>
            
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 mb-12">
              <p className="text-lg mb-6">
                <strong>Zborovi su ključni jer vraćaju moć narodu!</strong> Umesto da čekamo na institucije koje nas ignorišu, 
                <strong> mi sami donosimo odluke i preuzimamo odgovornost za promene.</strong>
              </p>
              <p className="text-lg mb-6">
                Zbor je demokratski alat koji omogućava građanima da se organizuju, diskutuju o problemima i zajedno donose odluke. 
                To je prostor gde svaki glas ima jednaku težinu i gde se poštuje mišljenje svakog učesnika.
              </p>
              <p className="text-lg font-bold">
                Kroz zborove gradimo zajednicu, solidarnost i snagu potrebnu za stvarne promene!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-secondary text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">✅ DIREKTNA DEMOKRATIJA</h3>
                <p>
                  Na zborovima građani direktno učestvuju u donošenju odluka, bez posrednika i političara.
                </p>
              </div>
              <div className="bg-secondary text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">✅ TRANSPARENTNOST</h3>
                <p>
                  Sve odluke se donose javno, uz učešće svih prisutnih. Nema tajnih dogovora.
                </p>
              </div>
              <div className="bg-secondary text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">✅ GRAĐANSKA ODGOVORNOST</h3>
                <p>
                  Kroz zborove preuzimamo odgovornost za rešavanje problema u našoj zajednici.
                </p>
              </div>
              <div className="bg-secondary text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">✅ SOLIDARNOST</h3>
                <p>
                  Zborovi jačaju veze među građanima i grade osećaj zajedništva i međusobne podrške.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Organize Zbor Section */}
      <section id="sazovi" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-anton mb-8 text-center">
            KAKO SAZVATI ZBOR?
          </h2>
          
          <div className="max-w-4xl mx-auto mb-12">
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-6 text-primary">1. ODREDI TEMU I CILJ ZBORA</h3>
                  <p className="text-lg mb-4">
                    Da li je to organizacija protesta, rešavanje lokalnog problema ili planiranje sledeće akcije?
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1" />
                      <span>Definiši jasan cilj zbora</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1" />
                      <span>Pripremi konkretna pitanja za diskusiju</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1" />
                      <span>Razmisli o mogućim rešenjima i predlozima</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-6 text-primary">2. OBAVESTI ZAJEDNICU</h3>
                  <p className="text-lg mb-4">
                    Objavi termin i mesto na društvenim mrežama i Telegram grupama.
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1" />
                      <span>Koristi društvene mreže, Telegram grupe i lokalne oglasne table</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1" />
                      <span>Jasno navedi datum, vreme i mesto održavanja</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1" />
                      <span>Objasni temu i zašto je važno da ljudi prisustvuju</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-6 text-primary">3. POSTAVI PRAVILA DISKUSIJE</h3>
                  <p className="text-lg mb-4">
                    Svako ima pravo da govori, odluke se donose konsenzusom.
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1" />
                      <span>Ograniči vreme izlaganja (npr. 2-3 minuta po osobi)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1" />
                      <span>Dogovori način donošenja odluka (konsenzus ili glasanje)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1" />
                      <span>Insistiraj na međusobnom poštovanju i konstruktivnoj diskusiji</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-6 text-primary">4. OBEZBEDI MODERACIJU</h3>
                  <p className="text-lg mb-4">
                    Kako bi se rasprava vodila konstruktivno i bez ometanja.
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1" />
                      <span>Odredi moderatora koji će voditi diskusiju</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1" />
                      <span>Zaduži nekoga da vodi zapisnik</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1" />
                      <span>Obezbedi da se donete odluke jasno formulišu i zapišu</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-anton mb-8">
              NE ČEKAJ! SAZOVI ZBOR I POKRENI PROMENU!
            </h2>
            
            <div className="bg-secondary p-8 rounded-lg mb-12">
              <h3 className="text-2xl font-bold mb-4">AKO VIDIŠ PROBLEM U SVOJOJ ZAJEDNICI, PREUZMI INICIJATIVU!</h3>
              <p className="text-lg mb-6">
                <strong>Mi sami moramo biti promena koju želimo da vidimo.</strong> Kroz zborove gradimo snagu i solidarnost potrebnu za stvarne promene!
              </p>
              <button className="px-8 py-4 bg-white text-primary font-bold text-lg uppercase tracking-wider rounded-md hover:bg-white/90 transition-colors inline-flex items-center justify-center">
                Sazovi Zbor SADA
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-anton mb-8 text-center">
              ČESTO POSTAVLJANA PITANJA O ZBOROVIMA
            </h2>

            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-gray-100 last:border-0 py-5"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex justify-between items-center w-full text-left"
                  >
                    <h3 className="text-lg font-bold">{faq.question}</h3>
                    <ChevronDown
                      className={`h-5 w-5 text-foreground/60 transition-transform ${
                        expandedFaq === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {expandedFaq === index && (
                    <div className="mt-4 text-foreground/80">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ZboroviPage 