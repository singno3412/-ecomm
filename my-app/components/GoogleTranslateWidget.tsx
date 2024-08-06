"use client";

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

const GoogleTranslateWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const addGoogleTranslateScript = () => {
      return new Promise<void>((resolve, reject) => {
        if (window.google && window.google.translate) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Google Translate script failed to load.'));
        document.body.appendChild(script);
      });
    };

    const googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          { pageLanguage: 'en', layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE },
          'google_translate_element'
        );
      }
    };

    window.googleTranslateElementInit = googleTranslateElementInit;

    addGoogleTranslateScript()
      .then(() => {
        if (window.googleTranslateElementInit) {
          window.googleTranslateElementInit();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleLanguageChange = (language: string) => {
    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (select) {
      select.value = language;
      select.dispatchEvent(new Event("change"));
    }
    setIsOpen(false);
  };

  return (
    <div className="dropdown dropdown-right dropdown-end relative inline-block text-left">
      <div
        tabIndex={0}
        role="button"
        className="btn m-1 inline-flex justify-center w-full rounded-md border border-opacity-35 shadow-sm px-4 py-2 bg-white bg-opacity-0 text-sm font-medium hover:bg-gray-50 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        Select Language
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 01-1.414 0l-4-4a1 1 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {isOpen && (
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow origin-top-right absolute right-0 mt-2"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <li role="menuitem" onClick={() => handleLanguageChange('en')}>
            <a className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100">English</a>
          </li>
          <li role="menuitem" onClick={() => handleLanguageChange('th')}>
            <a className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100">Thai</a>
          </li>
          <li role="menuitem" onClick={() => handleLanguageChange('es')}>
            <a className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100">Spanish</a>
          </li>
          <li role="menuitem" onClick={() => handleLanguageChange('fr')}>
            <a className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100">French</a>
          </li>
          <li role="menuitem" onClick={() => handleLanguageChange('de')}>
            <a className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100">German</a>
          </li>
          <li role="menuitem" onClick={() => handleLanguageChange('zh-CN')}>
            <a className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100">Chinese</a>
          </li>
        </ul>
      )}
      <div id="google_translate_element" className="hidden"></div>
    </div>
  );
};

export default GoogleTranslateWidget;
