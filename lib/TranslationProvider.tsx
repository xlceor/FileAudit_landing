'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const translations: Record<string, any> = {
  en: {
    Header: { 
      About: "About", 
      Features: "Features", 
      HowItWorks: "How it Works", 
      Licensing: "Licensing Model", 
      FAQ: "FAQ", 
      AdminPortal: "Admin Portal", 
      GetDesktopApp: "Get Desktop App" 
    },
    Hero: { 
      Tag: "High-Performance Desktop Audit Suite", 
      TitlePart1: "Reconcile files with your database at", 
      TitlePart2: "Light Speed", 
      Description: "FileMaster solves the core data integrity issue: matching physical directories and storage dumps against master records in Excel, CSV, or JSON formats. Perfect for high-volume enterprise pipelines.",
      DownloadButton: "Download Desktop Client",
      ExploreButton: "Explore Core Engines"
    }
  },
  es: {
    Header: { 
      About: "Sobre nosotros", 
      Features: "Características", 
      HowItWorks: "Cómo funciona", 
      Licensing: "Modelo de licencias", 
      FAQ: "Preguntas frecuentes", 
      AdminPortal: "Portal de administración", 
      GetDesktopApp: "Descargar aplicación" 
    },
    Hero: { 
      Tag: "Suite de auditoría de escritorio", 
      TitlePart1: "Reconcilia archivos con tu base de datos a", 
      TitlePart2: "Velocidad de la luz", 
      Description: "FileMaster resuelve el problema principal de integridad de datos: hacer coincidir directorios físicos y volcados de almacenamiento con registros maestros en formatos Excel, CSV o JSON. Perfecto para flujos de trabajo empresariales de alto volumen.",
      DownloadButton: "Descargar cliente",
      ExploreButton: "Explorar motores"
    }
  }
};

const TranslationContext = createContext({
  t: (key: string) => key,
  setLocale: (l: 'en' | 'es') => {},
  locale: 'en'
});

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<'en' | 'es'>('en');

  useEffect(() => {
    // Detect browser language
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'es') setLocale('es');
  }, []);

  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = translations[locale];
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    return typeof value === 'string' ? value : key;
  };

  return (
    <TranslationContext.Provider value={{ t, setLocale, locale }}>
      {children}
    </TranslationContext.Provider>
  );
}

export const useTranslation = () => useContext(TranslationContext);
