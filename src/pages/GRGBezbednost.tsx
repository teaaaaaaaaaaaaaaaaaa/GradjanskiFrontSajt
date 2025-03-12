import { Link } from 'react-router-dom'
import { ArrowLeft, Shield, Users, FileText, Building, BookOpen, HeartPulse } from 'lucide-react'

function GRGBezbednost() {
  return (
    <div className="pt-16">
      {/* Hero Image */}
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <img 
          src="/bezbednost.jpg" 
          alt="GRG za bezbednost" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
          <div className="container mx-auto">
            <div className="flex items-center gap-4">
              <div className="bg-primary p-3 rounded-full">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-anton text-white">GRG ZA BEZBEDNOST (GRGB)</h1>
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
            <span className="text-gray-600">38 članova</span>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl leading-relaxed mb-8">
              Organizuje redarske službe, pruža podršku učesnicima protesta i sprečava provokacije.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-red-600 mb-10">
              <p className="text-lg">
                Građanska radna grupa za bezbednost brine o zaštiti svih učesnika tokom protesta, zbora građana i drugih javnih okupljanja. 
                Ova grupa je odgovorna za razvijanje i implementaciju sigurnosnih protokola, koordinaciju sa lokalnim vlastima, 
                kao i obezbeđivanje da se svi događaji odvijaju u skladu sa zakonima i bez opasnosti po fizičku i psihološku dobrobit učesnika. 
                Pored fizičke bezbednosti, ova grupa radi i na zaštiti prava građana, obezbeđujući da svi imaju sigurno i podržavajuće okruženje 
                u kojem mogu slobodno izražavati svoje stavove.
              </p>
            </div>
            
            <h2 className="text-2xl font-bold mb-6">Šta radimo?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <FileText className="h-6 w-6 text-red-600 mr-3" />
                  <h3 className="text-xl font-semibold">Planiranje i implementacija bezbednosnih protokola</h3>
                </div>
                <p>
                  Razvijanje strategija za upravljanje bezbednošću na terenu, uključujući organizaciju volontera koji će pratiti i obezbeđivati 
                  sigurno kretanje učesnika, kao i odgovornost za eventualnu reakciju u hitnim situacijama.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <Building className="h-6 w-6 text-red-600 mr-3" />
                  <h3 className="text-xl font-semibold">Koordinacija sa policijom i lokalnim vlastima</h3>
                </div>
                <p>
                  Saradnja sa lokalnim organima reda kako bi se osigurala bezbednost tokom protesta, kao i izbegli bilo kakvi nesporazumi 
                  ili nasilje između demonstranata i vlasti.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <BookOpen className="h-6 w-6 text-red-600 mr-3" />
                  <h3 className="text-xl font-semibold">Edukovanje učesnika o ličnoj bezbednosti</h3>
                </div>
                <p>
                  Organizovanje informativnih sesija za učesnike o tome kako da ostanu sigurni tokom protesta, šta treba da rade u slučaju opasnosti 
                  i kako da izbegnu sukobe sa vlastima ili protivnicima protesta.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <HeartPulse className="h-6 w-6 text-red-600 mr-3" />
                  <h3 className="text-xl font-semibold">Psihološka podrška</h3>
                </div>
                <p>
                  Obezbeđivanje prostora za mentalnu podršku učesnicima protesta, u saradnji sa organizacijama koje pružaju psihološku pomoć, 
                  posebno u stresnim situacijama.
                </p>
              </div>
            </div>
            
            <div className="bg-red-50 p-6 rounded-lg border border-red-200 mb-10">
              <h3 className="text-xl font-bold mb-4 text-red-700">Kako se uključiti?</h3>
              <p className="mb-4">
                Ako imate iskustva u oblasti bezbednosti, upravljanju kriznim situacijama, pružanju prve pomoći ili ste jednostavno posvećeni 
                očuvanju mira i sigurnosti, pridružite se našoj radnoj grupi za bezbednost.
              </p>
              <p>
                Popunite formular za prijavu na glavnoj stranici radnih grupa ili nas kontaktirajte direktno putem 
                Telegram grupe za bezbednost.
              </p>
            </div>
            
            <div className="flex justify-center">
              <Link 
                to="/radne-grupe#cta-section" 
                className="px-8 py-4 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition-colors inline-flex items-center"
              >
                Pridruži se GRGB
                <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GRGBezbednost 