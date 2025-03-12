import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

function PrivacyPolicy() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center text-primary hover:underline mb-6 block">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Nazad na početnu
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Politika privatnosti</h1>
          
          <div className="prose prose-lg max-w-none">
            <p>
              Poslednje ažuriranje: 1. jun 2023.
            </p>
            
            <h2>1. Uvod</h2>
            <p>
              Građanski Front ("mi", "nas" ili "naš") upravlja platformom gradjanskifront.rs ("Platforma"). Ova stranica vas obaveštava o našim politikama u vezi sa prikupljanjem, korišćenjem i otkrivanjem ličnih podataka kada koristite našu Platformu.
            </p>
            
            <h2>2. Podaci koje prikupljamo</h2>
            <p>
              Prikupljamo nekoliko različitih tipova informacija u različite svrhe kako bismo vam pružili i unapredili našu Platformu.
            </p>
            
            <h3>2.1 Lični podaci</h3>
            <p>
              Dok koristite našu Platformu, možemo od vas tražiti da nam pružite određene lične podatke koji se mogu koristiti za kontaktiranje ili identifikaciju vas ("Lični podaci"). Lični podaci mogu uključivati, ali nisu ograničeni na:
            </p>
            <ul>
              <li>Email adresu</li>
              <li>Ime i prezime</li>
              <li>Lokaciju (mesnu zajednicu)</li>
              <li>Broj telefona (opciono)</li>
            </ul>
            
            <h3>2.2 Podaci o korišćenju</h3>
            <p>
              Takođe prikupljamo informacije o tome kako se pristupa i koristi Platforma ("Podaci o korišćenju"). Ovi Podaci o korišćenju mogu uključivati informacije kao što su IP adresa vašeg računara, tip pretraživača, verzija pretraživača, stranice naše Platforme koje posećujete, vreme i datum vaše posete, vreme provedeno na tim stranicama i druge dijagnostičke podatke.
            </p>
            
            <h2>3. Kako koristimo prikupljene podatke</h2>
            <p>
              Građanski Front koristi prikupljene podatke za različite svrhe:
            </p>
            <ul>
              <li>Za pružanje i održavanje Platforme</li>
              <li>Za obaveštavanje o promenama na našoj Platformi</li>
              <li>Za omogućavanje učešća u interaktivnim funkcijama naše Platforme</li>
              <li>Za pružanje korisničke podrške</li>
              <li>Za prikupljanje analiza ili vrednih informacija kako bismo unapredili našu Platformu</li>
              <li>Za praćenje korišćenja Platforme</li>
              <li>Za otkrivanje, sprečavanje i rešavanje tehničkih problema</li>
              <li>Za obaveštavanje o događajima, zborovima i aktivnostima u vašoj lokalnoj zajednici</li>
            </ul>
            
            <h2>4. Čuvanje podataka</h2>
            <p>
              Građanski Front će čuvati vaše lične podatke samo onoliko dugo koliko je potrebno za svrhe navedene u ovoj Politici privatnosti. Čuvaćemo i koristiti vaše lične podatke u meri potrebnoj za ispunjavanje naših zakonskih obaveza, rešavanje sporova i sprovođenje naših politika.
            </p>
            
            <h2>5. Prenos podataka</h2>
            <p>
              Vaše informacije, uključujući lične podatke, mogu biti prenete na — i održavane na — računarima koji se nalaze van vaše države, pokrajine, zemlje ili druge vladine jurisdikcije gde se zakoni o zaštiti podataka mogu razlikovati od onih u vašoj jurisdikciji.
            </p>
            <p>
              Vaš pristanak na ovu Politiku privatnosti praćen vašim podnošenjem takvih informacija predstavlja vašu saglasnost za taj prenos.
            </p>
            
            <h2>6. Otkrivanje podataka</h2>
            <p>
              Građanski Front može otkriti vaše lične podatke u dobroj veri da je takva akcija neophodna za:
            </p>
            <ul>
              <li>Ispunjavanje zakonske obaveze</li>
              <li>Zaštitu i odbranu prava ili imovine Građanskog Fronta</li>
              <li>Sprečavanje ili istraživanje mogućih zloupotreba u vezi sa Platformom</li>
              <li>Zaštitu lične sigurnosti korisnika Platforme ili javnosti</li>
              <li>Zaštitu od pravne odgovornosti</li>
            </ul>
            
            <h2>7. Sigurnost podataka</h2>
            <p>
              Sigurnost vaših podataka nam je važna, ali imajte na umu da nijedan metod prenosa preko interneta ili metod elektronskog skladištenja nije 100% siguran. Dok se trudimo da koristimo komercijalno prihvatljiva sredstva za zaštitu vaših ličnih podataka, ne možemo garantovati njihovu apsolutnu sigurnost.
            </p>
            
            <h2>8. Vaša prava na zaštitu podataka</h2>
            <p>
              Građanski Front ima za cilj da preduzme razumne korake kako bi vam omogućio da ispravite, izmenite, izbrišete ili ograničite korišćenje vaših ličnih podataka.
            </p>
            <p>
              Ako želite da budete informisani o ličnim podacima koje imamo o vama i ako želite da budu uklonjeni iz naših sistema, molimo vas da nas kontaktirate.
            </p>
            
            <h2>9. Promene ove politike privatnosti</h2>
            <p>
              Možemo ažurirati našu Politiku privatnosti s vremena na vreme. Obavestićemo vas o svim promenama objavljivanjem nove Politike privatnosti na ovoj stranici.
            </p>
            <p>
              Savetujemo vam da povremeno pregledate ovu Politiku privatnosti za bilo kakve promene. Promene ove Politike privatnosti stupaju na snagu kada se objave na ovoj stranici.
            </p>
            
            <h2>10. Kontaktirajte nas</h2>
            <p>
              Ako imate bilo kakvih pitanja o ovoj Politici privatnosti, molimo vas da nas kontaktirate:
            </p>
            <ul>
              <li>Putem email-a: info@gradjanskifront.rs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy 