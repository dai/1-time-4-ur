export interface Timezone {
  value: string;
  label: string;
  city: string;
  country: string;
  offset: string;
}

export const COMMON_TIMEZONES: Timezone[] = [
  { value: 'UTC', label: 'UTC', city: 'Coordinated Universal Time', country: '', offset: '+00:00' },
  { value: 'America/New_York', label: 'EST/EDT', city: 'New York', country: 'United States', offset: '-05:00/-04:00' },
  { value: 'America/Chicago', label: 'CST/CDT', city: 'Chicago', country: 'United States', offset: '-06:00/-05:00' },
  { value: 'America/Denver', label: 'MST/MDT', city: 'Denver', country: 'United States', offset: '-07:00/-06:00' },
  { value: 'America/Los_Angeles', label: 'PST/PDT', city: 'Los Angeles', country: 'United States', offset: '-08:00/-07:00' },
  { value: 'Europe/London', label: 'GMT/BST', city: 'London', country: 'United Kingdom', offset: '+00:00/+01:00' },
  { value: 'Europe/Paris', label: 'CET/CEST', city: 'Paris', country: 'France', offset: '+01:00/+02:00' },
  { value: 'Asia/Tokyo', label: 'JST', city: 'Tokyo', country: 'Japan', offset: '+09:00' },
  { value: 'Asia/Shanghai', label: 'CST', city: 'Shanghai', country: 'China', offset: '+08:00' },
  { value: 'Australia/Sydney', label: 'AEST/AEDT', city: 'Sydney', country: 'Australia', offset: '+10:00/+11:00' },
];

export const ALL_TIMEZONES: Timezone[] = [
  ...COMMON_TIMEZONES,
  { value: 'America/Anchorage', label: 'AKST/AKDT', city: 'Anchorage', country: 'United States', offset: '-09:00/-08:00' },
  { value: 'Pacific/Honolulu', label: 'HST', city: 'Honolulu', country: 'United States', offset: '-10:00' },
  { value: 'America/Toronto', label: 'EST/EDT', city: 'Toronto', country: 'Canada', offset: '-05:00/-04:00' },
  { value: 'America/Vancouver', label: 'PST/PDT', city: 'Vancouver', country: 'Canada', offset: '-08:00/-07:00' },
  { value: 'America/Mexico_City', label: 'CST/CDT', city: 'Mexico City', country: 'Mexico', offset: '-06:00/-05:00' },
  { value: 'America/Sao_Paulo', label: 'BRT/BRST', city: 'São Paulo', country: 'Brazil', offset: '-03:00/-02:00' },
  { value: 'America/Buenos_Aires', label: 'ART', city: 'Buenos Aires', country: 'Argentina', offset: '-03:00' },
  { value: 'Europe/Berlin', label: 'CET/CEST', city: 'Berlin', country: 'Germany', offset: '+01:00/+02:00' },
  { value: 'Europe/Rome', label: 'CET/CEST', city: 'Rome', country: 'Italy', offset: '+01:00/+02:00' },
  { value: 'Europe/Madrid', label: 'CET/CEST', city: 'Madrid', country: 'Spain', offset: '+01:00/+02:00' },
  { value: 'Europe/Amsterdam', label: 'CET/CEST', city: 'Amsterdam', country: 'Netherlands', offset: '+01:00/+02:00' },
  { value: 'Europe/Stockholm', label: 'CET/CEST', city: 'Stockholm', country: 'Sweden', offset: '+01:00/+02:00' },
  { value: 'Europe/Zurich', label: 'CET/CEST', city: 'Zurich', country: 'Switzerland', offset: '+01:00/+02:00' },
  { value: 'Europe/Moscow', label: 'MSK', city: 'Moscow', country: 'Russia', offset: '+03:00' },
  { value: 'Asia/Dubai', label: 'GST', city: 'Dubai', country: 'UAE', offset: '+04:00' },
  { value: 'Asia/Kolkata', label: 'IST', city: 'Mumbai', country: 'India', offset: '+05:30' },
  { value: 'Asia/Bangkok', label: 'ICT', city: 'Bangkok', country: 'Thailand', offset: '+07:00' },
  { value: 'Asia/Singapore', label: 'SGT', city: 'Singapore', country: 'Singapore', offset: '+08:00' },
  { value: 'Asia/Hong_Kong', label: 'HKT', city: 'Hong Kong', country: 'Hong Kong', offset: '+08:00' },
  { value: 'Asia/Seoul', label: 'KST', city: 'Seoul', country: 'South Korea', offset: '+09:00' },
  { value: 'Australia/Melbourne', label: 'AEST/AEDT', city: 'Melbourne', country: 'Australia', offset: '+10:00/+11:00' },
  { value: 'Pacific/Auckland', label: 'NZST/NZDT', city: 'Auckland', country: 'New Zealand', offset: '+12:00/+13:00' },
];

export function formatTime(date: Date, timezone: string, format24h: boolean = true): string {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: format24h ? '2-digit' : 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: !format24h,
  });
  
  return formatter.format(date);
}

export function formatTimeWithoutSeconds(date: Date, timezone: string, format24h: boolean = true): string {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: format24h ? '2-digit' : 'numeric',
    minute: '2-digit',
    hour12: !format24h,
  });
  
  return formatter.format(date);
}

export function formatDate(date: Date, timezone: string): string {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  
  return formatter.format(date);
}

export function getCurrentOffset(timezone: string): string {
  const now = new Date();
  const utc = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
  const targetTime = new Date(utc.toLocaleString('en-US', { timeZone: timezone }));
  const diff = targetTime.getTime() - utc.getTime();
  const hours = Math.floor(Math.abs(diff) / (1000 * 60 * 60));
  const minutes = Math.floor((Math.abs(diff) % (1000 * 60 * 60)) / (1000 * 60));
  const sign = diff >= 0 ? '+' : '-';
  
  return `${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

export function convertTime(time: string, date: string, fromTimezone: string, toTimezone: string): Date {
  const [hours, minutes] = time.split(':').map(Number);
  const targetDate = new Date(date);
  
  // Create a date in the source timezone
  const sourceDate = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), hours, minutes);
  
  // Get the time as if it were in the source timezone
  const tempDate = new Date(sourceDate.toLocaleString('en-US', { timeZone: 'UTC' }));
  const sourceInUTC = new Date(sourceDate.getTime() - (tempDate.getTime() - new Date(sourceDate.toLocaleString('en-US', { timeZone: fromTimezone })).getTime()));
  
  return sourceInUTC;
}

export function searchTimezones(query: string): Timezone[] {
  if (!query.trim()) return COMMON_TIMEZONES;
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return ALL_TIMEZONES.filter(tz => 
    tz.city.toLowerCase().includes(normalizedQuery) ||
    tz.country.toLowerCase().includes(normalizedQuery) ||
    tz.label.toLowerCase().includes(normalizedQuery) ||
    tz.value.toLowerCase().includes(normalizedQuery)
  );
}

export function getUserTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}