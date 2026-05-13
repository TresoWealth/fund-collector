# Treso Fund Collector

**Version**: 0.1.0
**Status**: Development
**Tech Stack**: React 19 + TypeScript + CSV Processing
**Purpose**: Fund data collection and CSV upload interface

---

## Overview

React application for collecting and managing mutual fund data. Features drag-and-drop CSV file upload, data validation, and form management for fund information entry.

---

## Tech Stack

### Core Framework
- **React 19.2.0** - Latest React with improved performance
- **TypeScript 4.9.5** - Type safety and better DX
- **Create React App 5.0.1** - Build tooling

### Data Processing
- **PapaParse 5.5.3** - Robust CSV parsing
  - Handles large files efficiently
  - Supports various CSV formats
  - Error detection and recovery
  - Worker support for non-blocking parsing

### Form Management
- **React Hook Form 7.66.0** - Performant form handling
  - Minimal re-renders
  - Built-in validation
  - TypeScript support
- **Yup 1.7.1** - Schema validation
  - Declarative validation rules
  - Integration with React Hook Form

### File Upload
- **React Dropzone 14.3.8** - Drag-and-drop file uploads
  - Customizable dropzone UI
  - File type validation
  - Progress tracking
  - Preview support

### Validation
- **@hookform/resolvers 5.2.2** - Form validation integration
- **Yup schemas** - Data validation rules

---

## Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd "/Users/akshayrandeva/Treso/code/treso-fund-collector"

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

### Development

```bash
# Start development server (default: http://localhost:3000)
npm start

# Run tests in interactive watch mode
npm test

# Build for production
npm run build

# Eject (one-way operation)
npm run eject
```

---

## Features

### CSV File Upload
- **Drag & Drop**: Intuitive file upload interface
- **Multiple Formats**: Support for various CSV formats
- **Large Files**: Efficient parsing of large datasets
- **Error Handling**: Graceful error handling and user feedback
- **Preview**: Preview parsed data before submission

### Form Management
- **Validation**: Real-time form validation
- **Type Safety**: TypeScript for compile-time checks
- **User Experience**: Smooth form interactions with minimal re-renders

### Data Processing
- **CSV Parsing**: Robust CSV parsing with PapaParse
- **Schema Validation**: Validate fund data against schemas
- **Error Detection**: Identify and report data issues
- **Data Transformation**: Convert raw data to required format

---

## Project Structure

```
treso-fund-collector/
├── public/              # Static assets
├── src/                 # Source code
│   ├── components/     # React components
│   ├── App.tsx         # Root component
│   ├── index.tsx       # Application entry
│   └── [utilities]     # Helper functions
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript config
└── README.md          # This file
```

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Runs app in development mode on http://localhost:3000 |
| `npm test` | Launches test runner in interactive watch mode |
| `npm run build` | Builds app for production to `build/` folder |
| `npm run eject` | Ejects to customize build configuration (one-way) |

---

## Browser Support

Modern browsers:
- **Production**: >0.2%, not dead, not op_mini all
- **Development**: Last 1 Chrome, Firefox, Safari versions

---

## Component Architecture

### File Upload Flow
```typescript
// Typical upload flow
1. User drags/selects CSV file
2. React Dropzone captures file
3. PapaParse parses CSV content
4. Validate data with Yup schemas
5. Display preview/errors
6. Submit valid data to backend
```

### Form Validation
```typescript
// Validation schema example
const fundSchema = yup.object().shape({
  fundName: yup.string().required(),
  isin: yup.string().matches(/^[A-Z]{2}[A-Z0-9]{9}[0-9]$/),
  nav: yup.number().positive().required(),
  // ... more fields
});
```

---

## CSV Format Requirements

### Expected Columns
- Fund Name (required)
- ISIN (required, format: XXXXXXXXXXX)
- NAV (required, positive number)
- Date (required, format: YYYY-MM-DD)
- Scheme Code (optional)

### Example CSV
```csv
Fund Name,ISIN,NAV,Date,Scheme Code
"ABC Mutual Fund - Growth",INF123K45678,123.45,2026-04-14,"12345"
"XYZ Fund - Direct Plan",INF987M65432,678.90,2026-04-14,"67890"
```

---

## Development Notes

### Performance Optimization
- **Lazy Loading**: Load components on demand
- **Memoization**: Cache expensive computations
- **Web Workers**: Use PapaParse workers for large files
- **Code Splitting**: Dynamic imports for smaller bundles

### Error Handling
- **User Feedback**: Clear error messages for users
- **Logging**: Console errors for debugging
- **Validation**: Client-side validation before API calls
- **Fallbacks**: Graceful degradation for unsupported features

---

## Configuration

### TypeScript
- **Strict Mode**: Enabled for type safety
- **Path Aliases**: Configured in tsconfig.json
- **Type Definitions**: @types packages for dependencies

### Build
- **Production**: Optimized build with minification
- **Chunking**: Automatic code splitting
- **Hashing**: Filenames include hashes for caching

---

## Related Projects

- **treso_analytics** - Main analytics backend
  - Location: `/Users/akshayrandeva/Treso/code/treso_analytics`
  - Purpose: Processes collected fund data

- **tresowealth-frontend** - Main frontend
  - Location: `/Users/akshayrandeva/Treso/code/tresowealth-frontend`
  - Purpose: TresoWealth platform interface

- **Treso Search** - Search dashboard
  - Location: `/Users/akshayrandeva/Treso/code/Treso Search`
  - Purpose: Fund search and discovery

---

## Status

**Current Phase**: Development
**Last Updated**: November 14, 2025
**Version**: 0.1.0
**Git Repository**: Initialized (main branch)

---

## Testing

### Test Framework
- **React Testing Library**: Component testing
- **Jest**: Test runner
- **User Event**: User interaction simulation

### Running Tests
```bash
# Run all tests
npm test

# Watch mode (interactive)
npm test

# Coverage mode
npm test -- --coverage
```

---

## Deployment

### Build for Production
```bash
# Create production build
npm run build

# Output: build/ directory
# - Optimized assets
# - Minified code
# - Source maps
# - Service worker (if configured)
```

### Deployment Options
- **Static Hosting**: Deploy `build/` to any static host
- **Netlify**: Drag and drop `build/` folder
- **Vercel**: Connect Git repository
- **AWS S3**: Upload to S3 bucket
- **Docker**: Containerize with nginx

---

## Troubleshooting

### Common Issues

**Port 3000 already in use**
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
PORT=3001 npm start
```

**TypeScript errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build failures**
```bash
# Clear cache and rebuild
rm -rf build cache
npm run build
```

---

## Resources

- **React Documentation**: https://react.dev/
- **Create React App**: https://create-react-app.dev/
- **PapaParse**: https://www.papaparse.com/
- **React Hook Form**: https://react-hook-form.com/
- **React Dropzone**: https://react-dropzone.js.org/
