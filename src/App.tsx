import { WorldClock } from './components/WorldClock';
import { TimezoneConverter } from './components/TimezoneConverter';
import { Globe } from '@phosphor-icons/react';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Globe className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Timezone Converter</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Convert times between different timezones and keep track of multiple world clocks. 
            Perfect for scheduling meetings and coordinating across global teams.
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
          <p>All times are calculated using your browser's timezone database</p>
        </div>
      </div>
    </div>
  );
}

export default App;