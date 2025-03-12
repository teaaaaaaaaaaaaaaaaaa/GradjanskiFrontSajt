import { Link } from 'react-router-dom'
import { ArrowLeft, Briefcase, Users, Truck, Home, Coffee, UserPlus } from 'lucide-react'

function GRGLogistika() {
  return (
    <div className="pt-16">
      {/* Hero Image */}
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <img 
          src="/logistika.jpg" 
          alt="GRG za logistiku i donacije" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
          <div className="container mx-auto">
            <div className="flex items-center gap-4">
              <div className="bg-primary p-3 rounded-full">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-anton text-white">GRG ZA LOGISTIKU I DONACIJE (GRGL)</h1>
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
            <span className="text-gray-600">42 članova</span>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl leading-relaxed mb-8">
              Brine o nabavci hrane, vode, medicinske pomoći i ostalih resursa potrebnih za proteste i blokade.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-red-600 mb-10">
              <p className="text-lg">
                Građanska radna grupa za logistiku baviće se organizacijom svih praktičnih aspekata protestnih akcija i građanskih zbora. 
                Njihova glavna uloga biće da osiguraju da svaki događaj bude dobro isplaniran i da svi učesnici imaju potrebnu podršku za učešće, 
                bez obzira na to da li dolaze iz drugih delova grada ili zemlje. Ova grupa će, kao i studentska radna grupa za logistiku, 
                biti ključna za obezbeđivanje resursa i koordinaciju na terenu, ali sa fokusom na širu društvenu zajednicu.
              </p>
            </div>
            
            <h2 className="text-2xl font-bold mb-6">Šta radimo?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <Truck className="h-6 w-6 text-red-600 mr-3" />
                  <h3 className="text-xl font-semibold">Organizacija transporta</h3>
                </div>
                <p>
                  Koordinacija prevoza za sve građane koji dolaze iz drugih delova grada ili zemlje. 
                  To uključuje organizaciju autobusa, kombija ili carpool sistema.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <Home className="h-6 w-6 text-red-600 mr-3" />
                  <h3 className="text-xl font-semibold">Smeštaj i prostori</h3>
                </div>
                <p>
                  Obezbeđivanje privremenog smeštaja za učesnike protesta i zborova koji dolaze iz drugih gradova, 
                  kao i identifikacija sigurnih prostora za okupljanje pre i posle protesta.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <Coffee className="h-6 w-6 text-red-600 mr-3" />
                  <h3 className="text-xl font-semibold">Pomoć u organizaciji hrane i pića</h3>
                </div>
                <p>
                  U saradnji sa lokalnim restoranima i trgovinama, organizacija obroka za učesnike, 
                  kao i distribucija vode i hrane na mestima okupljanja.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <UserPlus className="h-6 w-6 text-red-600 mr-3" />
                  <h3 className="text-xl font-semibold">Koordinacija sa volonterima</h3>
                </div>
                <p>
                  Angažovanje volontera za razne funkcije tokom protesta, kao što su pomoć u distribuciji materijala, 
                  upravljanje punktovima i organizacija događaja.
                </p>
              </div>
            </div>
            
            <div className="bg-red-50 p-6 rounded-lg border border-red-200 mb-10">
              <h3 className="text-xl font-bold mb-4 text-red-700">Kako se uključiti?</h3>
              <p className="mb-4">
                Ako imate iskustva u organizaciji događaja, logistici, transportu ili jednostavno želite da pomognete, 
                pridružite se našoj radnoj grupi za logistiku. Vaše veštine i energija su nam potrebni!
              </p>
              <p>
                Popunite formular za prijavu na glavnoj stranici radnih grupa ili nas kontaktirajte direktno putem 
                Telegram grupe za logistiku.
              </p>
            </div>
            
            <div className="flex justify-center">
              <Link 
                to="/radne-grupe#cta-section" 
                className="px-8 py-4 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition-colors inline-flex items-center"
              >
                Pridruži se GRGL
                <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GRGLogistika 