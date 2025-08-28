import { WorldClock } from './components/WorldClock';
import { TimezoneConverter } from './components/TimezoneConverter';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { LanguageProvider } from './contexts/LanguageContext';
import { useTranslation } from './hooks/useTranslation';
import { Globe } from '@phosphor-icons/react';
import { useEffect } from 'react';

function AppContent() {
  const { t } = useTranslation();
  
  // Update document title when language changes
  useEffect(() => {
    document.title = t('app.title') + ' - 世界の時刻を変換・表示';
  }, [t]);
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex-1" />
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">{t('app.title')}</h1>
            </div>
            <div className="flex-1 flex justify-end">
              <LanguageSwitcher />
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('app.description')}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <TimezoneConverter />
          </div>
          
          <div className="space-y-6">
            <WorldClock />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>{t('app.footer')}</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;