# Uputstvo za push na Git

## Priprema projekta

1. Kreirajte `.gitignore` datoteku sa sledećim sadržajem:

```
# Dependencies
/node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Production
/dist
/build

# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

## Inicijalizacija Git repozitorijuma

1. Otvorite terminal u glavnom direktorijumu projekta
2. Izvršite sledeće komande:

```bash
# Inicijalizacija Git repozitorijuma
git init

# Dodavanje svih datoteka u staging
git add .

# Kreiranje inicijalnog commit-a
git commit -m "Inicijalni commit - Građanski Front sajt"
```

## Push na GitHub

1. Kreirajte novi repozitorijum na GitHub-u (bez README, .gitignore ili licence)
2. Pratite uputstva sa GitHub-a za push postojećeg repozitorijuma:

```bash
# Dodavanje remote repozitorijuma (zamenite URL sa vašim)
git remote add origin https://github.com/vaše-korisničko-ime/gradjanski-front-sajt.git

# Push na GitHub
git push -u origin main
```

Ako je vaša glavna grana `master` umesto `main`, koristite:

```bash
git push -u origin master
```

## Dodatne informacije

- Fontovi: Implementirani su Work Sans i Merriweather sa Google Fonts
- Tailwind CSS: Konfigurisan da koristi ove fontove
- Struktura projekta: React + TypeScript + Vite 