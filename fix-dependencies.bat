@echo off
echo Fixing dependencies for Gradjanski Front website...

echo Removing node_modules folder and package-lock.json...
rmdir /s /q node_modules
del /f /q package-lock.json

echo Installing core dependencies...
npm install react react-dom

echo Installing routing dependencies...
npm install react-router-dom

echo Installing UI dependencies...
npm install lucide-react

echo Installing Tailwind CSS and related packages...
npm install -D tailwindcss postcss autoprefixer
npm install tailwindcss-animate

echo Installing development dependencies...
npm install -D @types/react @types/react-dom @types/node
npm install -D @vitejs/plugin-react
npm install -D typescript
npm install -D vite

echo Setup complete! Now run 'npm run dev' to start the development server.
pause 