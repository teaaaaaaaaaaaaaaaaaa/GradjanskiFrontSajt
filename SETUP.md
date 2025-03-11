# Setup Guide for Građanski Front Website

## Fixing Dependency Issues

If you're encountering errors related to missing dependencies like `react-router-dom` or `lucide-react`, follow these steps:

### Option 1: Using the Batch File (Windows)

1. Run the `install-dependencies.bat` file by double-clicking it
2. Wait for the installation to complete
3. Start the development server with `npm run dev`

### Option 2: Manual Installation

Run the following commands in your terminal:

```bash
# Install main dependencies
npm install react-router-dom lucide-react tailwindcss-animate

# Install PostCSS plugins
npm install -D postcss-import
```

## Fixing PostCSS Configuration

If you encounter an error related to PostCSS and Tailwind CSS, make sure your `postcss.config.js` file has the correct configuration:

```javascript
export default {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

Alternatively, you can use the CommonJS format in `postcss.config.cjs`:

```javascript
module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### Additional Configuration

The following files have been updated/created to fix configuration issues:

- `tailwind.config.js` - Updated to properly define border colors
- `vite.config.ts` - Created to set up proper path aliases
- `postcss.config.js` - Created for Tailwind CSS integration
- `tsconfig.json` - Updated for proper TypeScript configuration

## Starting the Development Server

After installing the dependencies, start the development server:

```bash
npm run dev
```

The website should now be accessible at http://localhost:5173 (or another port if 5173 is in use). 