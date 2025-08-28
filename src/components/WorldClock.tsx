import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Clock } from '@phosphor-icons/react';
import { TimezoneSelect } from './TimezoneSelect';
import { formatTime, formatDate, getCurrentOffset, ALL_TIMEZONES } from '@/lib/timezone-utils';
import { useKV } from '@github/spark/hooks';
import { useTranslation } from '../hooks/useTranslation';

interface WorldClockZone {
  id: string;
  timezone: string;
  label: string;
  city: string;
}

export function WorldClock() {
  const { t } = useTranslation();
  const [worldClockZones, setWorldClockZones] = useKV<WorldClockZone[]>('world-clock-zones', []);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showAddZone, setShowAddZone] = useState(false);
  const [newTimezone, setNewTimezone] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const addZone = () => {
    if (!newTimezone) return;
    
    const timezoneData = ALL_TIMEZONES.find(tz => tz.value === newTimezone);
    if (!timezoneData) return;

    const newZone: WorldClockZone = {
      id: Date.now().toString(),
      timezone: newTimezone,
      label: timezoneData.label,
      city: timezoneData.city,
    };

    setWorldClockZones(current => [...current, newZone]);
    setNewTimezone('');
    setShowAddZone(false);
  };

  const removeZone = (id: string) => {
    setWorldClockZones(current => current.filter(zone => zone.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addZone();
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            {t('worldclock.title')}
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddZone(!showAddZone)}
            className="shrink-0"
          >
            <Plus className="h-4 w-4 mr-1" />
            {t('worldclock.add')}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {showAddZone && (
          <div className="flex gap-2">
            <div className="flex-1">
              <TimezoneSelect
                value={newTimezone}
                onValueChange={setNewTimezone}
                placeholder="Select timezone to add"
              />
            </div>
            <Button 
              onClick={addZone} 
              disabled={!newTimezone}
              className="px-4"
            >
              {t('common.add')}
            </Button>
          </div>
        )}

        {worldClockZones.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">{t('worldclock.empty')}</p>
            <p className="text-xs">{t('worldclock.empty.description')}</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {worldClockZones.map((zone) => (
              <div
                key={zone.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors group"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-lg">{zone.city}</h3>
                    <Badge variant="outline" className="text-xs">
                      {getCurrentOffset(zone.timezone)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{zone.label}</p>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold tabular-nums mb-1">
                    {formatTime(currentTime, zone.timezone, true)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(currentTime, zone.timezone)}
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeZone(zone.id)}
                  className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}