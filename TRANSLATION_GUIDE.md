# Translation Guide

## Overview
This portfolio now supports bilingual content (Spanish and English) with a styled language switcher in the navbar.

## Features
- **Language Toggle Switch**: Styled switch in the navbar matching the portfolio's design
- **Persistent Language Selection**: Language preference is saved in localStorage
- **Complete Translation**: All content including navigation, hero, about, projects, contact, and footer sections
- **Responsive Design**: Language switch works on both desktop and mobile views

## File Structure
```
src/
├── locales/
│   ├── es.ts          # Spanish translations
│   ├── en.ts          # English translations
│   └── index.ts       # Export file
├── contexts/
│   └── LanguageContext.tsx  # Language state management
├── components/
│   └── LanguageSwitch.tsx   # Toggle switch component
└── app/
    ├── layout.tsx     # Wrapped with LanguageProvider
    └── page.tsx       # Uses translations via useLanguage hook
```

## How to Use

### Accessing Translations in Components
```tsx
import { useLanguage } from '@/contexts/LanguageContext';

function MyComponent() {
  const { t, language, setLanguage } = useLanguage();
  
  return (
    <div>
      <h1>{t.hero.greeting}</h1>
      <button onClick={() => setLanguage('en')}>English</button>
    </div>
  );
}
```

### Adding New Translations
1. Add the new key to `src/locales/es.ts`
2. Add the corresponding English translation to `src/locales/en.ts`
3. Use it in your component with `t.yourKey`

## Language Switch Design
The language switch features:
- Rounded toggle design matching the portfolio's color scheme
- Smooth animations on toggle
- Clear ES/EN labels
- Hover effects with the signature teal glow
- Accessible with proper ARIA labels

## Technical Details
- **Context API**: Used for global state management
- **localStorage**: Persists user's language preference
- **TypeScript**: Fully typed translations for better DX
- **Client-side**: All language switching happens on the client

## Default Language
The default language is Spanish (ES), but it will automatically load the user's previously selected language from localStorage on subsequent visits.

## CV Download by Language
The CV download button automatically serves the correct version based on the selected language:
- **Spanish (ES)**: `/images/Currículum_Benjamín_GarcíaHuidobro.docx.pdf`
- **English (EN)**: `/images/CV_Benjamin_GarciaHuidobro_EN.pdf`

Make sure to place your English CV in the `public/images/` folder with the name `CV_Benjamin_GarciaHuidobro_EN.pdf`.
