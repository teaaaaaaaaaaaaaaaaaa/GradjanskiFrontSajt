@echo off
echo Fixing configuration files...

echo Removing old configuration files...
del /f /q postcss.config.js
del /f /q postcss.config.cjs
del /f /q tailwind.config.js
del /f /q tailwind.config.cjs
del /f /q vite.config.js
del /f /q vite.config.cjs

echo Creating new configuration files...

echo Creating postcss.config.cjs...
echo module.exports = { > postcss.config.cjs
echo   plugins: { >> postcss.config.cjs
echo     tailwindcss: {}, >> postcss.config.cjs
echo     autoprefixer: {}, >> postcss.config.cjs
echo   }, >> postcss.config.cjs
echo } >> postcss.config.cjs

echo Creating tailwind.config.cjs...
echo /** @type {import('tailwindcss').Config} */ > tailwind.config.cjs
echo module.exports = { >> tailwind.config.cjs
echo   content: [ >> tailwind.config.cjs
echo     "./index.html", >> tailwind.config.cjs
echo     "./src/**/*.{js,ts,jsx,tsx}", >> tailwind.config.cjs
echo   ], >> tailwind.config.cjs
echo   theme: { >> tailwind.config.cjs
echo     extend: { >> tailwind.config.cjs
echo       colors: { >> tailwind.config.cjs
echo         border: "hsl(var(--border))", >> tailwind.config.cjs
echo         input: "hsl(var(--input))", >> tailwind.config.cjs
echo         ring: "hsl(var(--ring))", >> tailwind.config.cjs
echo         background: "hsl(var(--background))", >> tailwind.config.cjs
echo         foreground: "hsl(var(--foreground))", >> tailwind.config.cjs
echo         primary: { >> tailwind.config.cjs
echo           DEFAULT: "hsl(var(--primary))", >> tailwind.config.cjs
echo           foreground: "hsl(var(--primary-foreground))", >> tailwind.config.cjs
echo         }, >> tailwind.config.cjs
echo         secondary: { >> tailwind.config.cjs
echo           DEFAULT: "hsl(var(--secondary))", >> tailwind.config.cjs
echo           foreground: "hsl(var(--secondary-foreground))", >> tailwind.config.cjs
echo         }, >> tailwind.config.cjs
echo       }, >> tailwind.config.cjs
echo     }, >> tailwind.config.cjs
echo   }, >> tailwind.config.cjs
echo   plugins: [require("tailwindcss-animate")], >> tailwind.config.cjs
echo } >> tailwind.config.cjs

echo Creating vite.config.js...
echo const { defineConfig } = require('vite') > vite.config.cjs
echo const react = require('@vitejs/plugin-react') >> vite.config.cjs
echo. >> vite.config.cjs
echo // https://vitejs.dev/config/ >> vite.config.cjs
echo module.exports = defineConfig({ >> vite.config.cjs
echo   plugins: [react()], >> vite.config.cjs
echo }) >> vite.config.cjs

echo Updating package.json...
powershell -Command "(Get-Content package.json) -replace '\"type\": \"module\",', '' | Set-Content package.json"

echo Configuration files fixed! Now run 'npm run dev' to start the development server.
pause 