import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, ArrowsClockwise } from '@phosphor-icons/react';
import { TimezoneSelect } from './TimezoneSelect';
import { formatTimeWithoutSeconds, convertTime, getCurrentOffset, getUserTimezone } from '@/lib/timezone-utils';
import { useKV } from '@github/spark/hooks';
import { useTranslation } from '../hooks/useTranslation';

export function TimezoneConverter() {
  const { t } = useTranslation();
  const [sourceTimezone, setSourceTimezone] = useKV('converter-source-timezone', getUserTimezone());
  const [targetTimezone, setTargetTimezone] = useKV('converter-target-timezone', 'UTC');
  const [sourceTime, setSourceTime] = useKV('converter-source-time', '12:00');
  const [sourceDate, setSourceDate] = useKV('converter-source-date', new Date().toISOString().split('T')[0]);
  
  const [convertedResult, setConvertedResult] = useState<{
    time: string;
    date: string;
    dayDifference: number;
  } | null>(null);

  useEffect(() => {
    if (sourceTime && sourceDate && sourceTimezone && targetTimezone) {
      try {
        const convertedDate = convertTime(sourceTime, sourceDate, sourceTimezone, targetTimezone);
        
        // Format the converted time and date
        const convertedTime = formatTimeWithoutSeconds(convertedDate, targetTimezone, true);
        const convertedDateStr = convertedDate.toLocaleDateString('en-CA', { timeZone: targetTimezone });
        
        // Calculate day difference
        const sourceDay = new Date(sourceDate);
        const targetDay = new Date(convertedDateStr);
        const dayDifference = Math.round((targetDay.getTime() - sourceDay.getTime()) / (1000 * 60 * 60 * 24));
        
        setConvertedResult({
          time: convertedTime,
          date: convertedDateStr,
          dayDifference
        });
      } catch (error) {
        console.error('Conversion error:', error);
        setConvertedResult(null);
      }
    }
  }, [sourceTime, sourceDate, sourceTimezone, targetTimezone]);

  const swapTimezones = () => {
    const temp = sourceTimezone;
    setSourceTimezone(targetTimezone);
    setTargetTimezone(temp);
  };

  const setCurrentTime = () => {
    const now = new Date();
    const currentTime = formatTimeWithoutSeconds(now, sourceTimezone, true);
    const currentDate = now.toLocaleDateString('en-CA', { timeZone: sourceTimezone });
    
    setSourceTime(currentTime);
    setSourceDate(currentDate);
  };

  const getDayDifferenceText = (diff: number) => {
    if (diff === 0) return '';
    if (diff === 1) return ` (+1 ${t('time.today').toLowerCase() === 'today' ? 'day' : '日'})`;
    if (diff === -1) return ` (-1 ${t('time.today').toLowerCase() === 'today' ? 'day' : '日'})`;
    if (diff > 1) return ` (+${diff} ${t('time.today').toLowerCase() === 'today' ? 'days' : '日'})`;
    return ` (${diff} ${t('time.today').toLowerCase() === 'today' ? 'days' : '日'})`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowsClockwise className="h-5 w-5" />
          {t('converter.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Source Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">{t('converter.from')}</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={setCurrentTime}
              className="text-xs"
            >
              <Calendar className="h-3 w-3 mr-1" />
              {t('time.now')}
            </Button>
          </div>
          
          <TimezoneSelect
            value={sourceTimezone}
            onValueChange={setSourceTimezone}
            placeholder={t('converter.from')}
          />
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="source-time" className="text-sm">{t('converter.time')}</Label>
              <Input
                id="source-time"
                type="time"
                value={sourceTime}
                onChange={(e) => setSourceTime(e.target.value)}
                className="tabular-nums"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="source-date" className="text-sm">{t('converter.date')}</Label>
              <Input
                id="source-date"
                type="date"
                value={sourceDate}
                onChange={(e) => setSourceDate(e.target.value)}
              />
            </div>
          </div>
          
          {sourceTimezone && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="outline" className="text-xs">
                {getCurrentOffset(sourceTimezone)}
              </Badge>
              <span>UTC {t('language.japanese') === '日本語' ? 'オフセット' : 'offset'}</span>
            </div>
          )}
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={swapTimezones}
            className="h-10 w-10 p-0 rounded-full"
          >
            <ArrowsClockwise className="h-4 w-4" />
          </Button>
        </div>

        {/* Target Section */}
        <div className="space-y-4">
          <Label className="text-base font-medium">{t('converter.to')}</Label>
          
          <TimezoneSelect
            value={targetTimezone}
            onValueChange={setTargetTimezone}
            placeholder={t('converter.to')}
          />
          
          {targetTimezone && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="outline" className="text-xs">
                {getCurrentOffset(targetTimezone)}
              </Badge>
              <span>UTC {t('language.japanese') === '日本語' ? 'オフセット' : 'offset'}</span>
            </div>
          )}
        </div>

        {/* Result */}
        {convertedResult && (
          <div className="p-4 bg-accent/20 rounded-lg border-2 border-accent/30">
            <div className="flex items-center gap-2 mb-2">
              <ArrowRight className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">{t('converter.result')}</span>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold tabular-nums">
                {convertedResult.time}
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  {new Date(convertedResult.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                  {getDayDifferenceText(convertedResult.dayDifference)}
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}