import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, Globe, Search } from '@phosphor-icons/react';
import { Timezone, COMMON_TIMEZONES, searchTimezones, getCurrentOffset } from '@/lib/timezone-utils';
import { cn } from '@/lib/utils';

interface TimezoneSelectProps {
  value: string;
  onValueChange: (timezone: string) => void;
  placeholder?: string;
}

export function TimezoneSelect({ value, onValueChange, placeholder = "Select timezone" }: TimezoneSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredTimezones, setFilteredTimezones] = useState<Timezone[]>(COMMON_TIMEZONES);

  const selectedTimezone = COMMON_TIMEZONES.find(tz => tz.value === value) || 
    searchTimezones('').find(tz => tz.value === value);

  useEffect(() => {
    const results = searchTimezones(search);
    setFilteredTimezones(results);
  }, [search]);

  const handleSelect = (timezone: Timezone) => {
    onValueChange(timezone.value);
    setOpen(false);
    setSearch('');
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-auto min-h-10 p-3"
        >
          {selectedTimezone ? (
            <div className="flex items-center gap-3 text-left">
              <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">{selectedTimezone.city}</div>
                <div className="text-xs text-muted-foreground">
                  {selectedTimezone.label} • {getCurrentOffset(selectedTimezone.value)}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{placeholder}</span>
            </div>
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search cities or timezones..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="max-h-60 overflow-y-auto">
          {!search && (
            <div className="p-3 border-b bg-muted/30">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Common Timezones</h4>
              <div className="flex flex-wrap gap-1">
                {COMMON_TIMEZONES.slice(0, 6).map((tz) => (
                  <Badge
                    key={tz.value}
                    variant="secondary"
                    className={cn(
                      "cursor-pointer text-xs hover:bg-secondary/80 transition-colors",
                      value === tz.value && "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                    onClick={() => handleSelect(tz)}
                  >
                    {tz.label}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <div className="p-1">
            {filteredTimezones.length === 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No timezones found
              </div>
            ) : (
              filteredTimezones.map((timezone) => (
                <button
                  key={timezone.value}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-accent hover:text-accent-foreground rounded-sm transition-colors",
                    value === timezone.value && "bg-accent text-accent-foreground"
                  )}
                  onClick={() => handleSelect(timezone)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{timezone.city}</span>
                      <Badge variant="outline" className="text-xs">
                        {getCurrentOffset(timezone.value)}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {timezone.country && `${timezone.country} • `}{timezone.label}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}