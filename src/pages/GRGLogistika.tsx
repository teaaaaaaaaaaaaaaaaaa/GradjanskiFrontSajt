import { Link } from 'react-router-dom'
import { ArrowLeft, Briefcase, Users } from 'lucide-react'

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
            <Users className="h-5 w-5 text-primary mr-2" />
            <span className="text-gray-600">42 članova</span>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl leading-relaxed">
              Brine o nabavci hrane, vode, medicinske pomoći i ostalih resursa potrebnih za proteste i blokade.
            </p>
            
            {/* Placeholder for future content */}
            <div className="h-[400px] flex items-center justify-center border border-dashed border-gray-300 rounded-lg mt-8">
              <p className="text-gray-500">Sadržaj stranice je u pripremi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GRGLogistika 