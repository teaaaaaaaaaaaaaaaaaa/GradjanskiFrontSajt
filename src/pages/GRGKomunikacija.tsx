import { Link } from 'react-router-dom'
import { ArrowLeft, MessageCircle, Users, UserCheck, Globe, TrendingUp, Radio } from 'lucide-react'

function GRGKomunikacija() {
  return (
    <div className="pt-16">
      {/* Hero Image */}
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <img 
          src="/komunikacije.jpg" 
          alt="GRG za komunikaciju" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
          <div className="container mx-auto">
            <div className="flex items-center gap-4">
              <div className="bg-primary p-3 rounded-full">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-anton text-white">GRG ZA KOMUNIKACIJU (GRGK)</h1>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <Link to="/radne-grupe" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Nazad na sve radne grupe
          </Link>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Users className="h-5 w-5 text-red-600 mr-2" />
            <span className="text-gray-600">56 članova</span>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl leading-relaxed mb-8">
              Obezbeđuje pravovremene informacije za sve učesnike protesta, održava Telegram grupe i pomaže u koordinaciji akcija.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-red-600 mb-10">
              <p className="text-lg">
                Građanska radna grupa za komunikaciju sa studentima i javnošću ima ključnu ulogu u održavanju informacija i transparentnosti 
                tokom organizacije protesta i zbora građana. Ova grupa je odgovorna za prenošenje poruka, ažuriranje učesnika o najnovijim 
                dešavanjima i osiguravanje da informacije dođu do svih relevantnih ciljanih grupa. Fokus ove radne grupe je usmeren na studente, 
                ali i širu javnost, kako bi osigurali da svi koji žele da se uključe budu obavešteni i motivisani za aktivno učešće.
              </p>
            </div>
            
            <h2 className="text-2xl font-bold mb-6">Šta radimo?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <UserCheck className="h-6 w-6 text-red-600 mr-3" />
                  <h3 className="text-xl font-semibold">Koordinacija sa studentima i mladima</h3>
                </div>
                <p>
                  Razvijanje strategije za komunikaciju sa studentima, uključujući kreiranje i distribuciju informacija putem društvenih mreža, 
                  emaila i drugih digitalnih kanala. Organizovanje online i offline sastanaka kako bi motivisali studente na aktivno učešće.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <Globe className="h-6 w-6 text-red-600 mr-3" />
                  <h3 className="text-xl font-semibold">Obaveštavanje i edukacija javnosti</h3>
                </div>
                <p>
                  Aktivnosti usmerene na informisanje šire javnosti o ciljevima protesta, izazovima sa kojima se suočavaju građani, 
                  kao i o značaju svakog pojedinca u procesu. To uključuje pripremu i distribuciju saopštenja za medije, blog postova, 
                  video sadržaja i drugih materijala.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-6 w-6 text-red-600 mr-3" />
                  <h3 className="text-xl font-semibold">Kreiranje kampanja za podizanje svesti</h3>
                </div>
                <p>
                  Planiranje i realizacija kampanja na društvenim mrežama, u saradnji sa influenserima i studentima, koje će uključivati 
                  edukativne i informativne sadržaje o tome kako građani mogu učestvovati u organizaciji i kako protesti utiču na društvo.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <Radio className="h-6 w-6 text-red-600 mr-3" />
                  <h3 className="text-xl font-semibold">Povezivanje sa medijima</h3>
                </div>
                <p>
                  Komunikacija sa novinarima i medijskim kućama, obezbeđivanje intervjua, pisanje i distribucija saopštenja za štampu 
                  i drugih materijala koji će osigurati da događaji budu prepoznati i vidljivo predstavljeni javnosti.
                </p>
              </div>
            </div>
            
            <div className="bg-red-50 p-6 rounded-lg border border-red-200 mb-10">
              <h3 className="text-xl font-bold mb-4 text-red-700">Kako se uključiti?</h3>
              <p className="mb-4">
                Ako imate iskustva u komunikacijama, društvenim mrežama, novinarstvu, odnosima s javnošću ili jednostavno imate dobre 
                komunikacijske veštine, pridružite se našoj radnoj grupi za komunikaciju.
              </p>
              <p>
                Popunite formular za prijavu na glavnoj stranici radnih grupa ili nas kontaktirajte direktno putem 
                Telegram grupe za komunikaciju.
              </p>
            </div>
            
            <div className="flex justify-center">
              <Link 
                to="/radne-grupe#cta-section" 
                className="px-8 py-4 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition-colors inline-flex items-center"
              >
                Pridruži se GRGK
                <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GRGKomunikacija 