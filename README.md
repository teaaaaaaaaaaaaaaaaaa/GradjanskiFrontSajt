# Građanski Front Sajt

Web aplikacija za organizovanje građanskih zborova i inicijativa po mesnim zajednicama.

## Funkcionalnosti

- Interaktivna mapa mesnih zajednica
- Zakazivanje zborova građana
- Potpisivanje peticija
- Automatsko slanje email obaveštenja kada se dostigne dovoljan broj potpisa
- Pregled zakazanih zborova

## Tehnologije

- React
- TypeScript
- Vite
- Firebase (Firestore)
- Brevo API za slanje mejlova
- Tailwind CSS

## Instalacija

1. Klonirajte repozitorijum:

   ```
   git clone [url-repozitorijuma]
   cd GradjanskiFrontSajt
   ```

2. Instalirajte zavisnosti:

   ```
   npm install
   ```

3. Kopirajte `.env.example` u `.env` i postavite stvarne vrednosti:

   ```
   cp .env.example .env
   ```

4. Pokrenite razvojni server:
   ```
   npm run dev
   ```

## Konfiguracija

Za slanje mejlova potrebno je:

1. Kreirati nalog na [Brevo](https://www.brevo.com/)
2. Verifikovati email adresu pošiljaoca
3. Generisati API ključ i postaviti ga u `.env` fajl

## Deployment

Za produkcijsko okruženje:

```
npm run build
```

## Licenca

[MIT](https://choosealicense.com/licenses/mit/)
