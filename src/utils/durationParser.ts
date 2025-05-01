type TimeUnit = {
    regex: RegExp;
    multiplier: number;
  };
  
  const TIME_UNITS: { [key: string]: TimeUnit } = {
    m: { regex: /^(\d+)m$/, multiplier: 60 * 1000 }, // minutes en millisecondes
    h: { regex: /^(\d+)h$/, multiplier: 3600 * 1000 }, // heures en millisecondes
    d: { regex: /^(\d+)d$/, multiplier: 86400 * 1000 }, // jours en millisecondes
  };
  
  export function parseExpirationDate(duration: string): Date | null {
    if (!duration || typeof duration !== 'string') {
      return null;
    }
  
    for (const [unit, { regex, multiplier }] of Object.entries(TIME_UNITS)) {
      const match = duration.match(regex);
      if (match) {
        const value = parseInt(match[1], 10);
        if (isNaN(value) || value <= 0) {
          return null;
        }
        const now = new Date();
        const expirationDate = new Date(now.getTime() + (value * multiplier));
        
        return expirationDate;
      }
    }
  
    return null;
  }
  
  export function isValidDurationFormat(duration: string): boolean {
    if (!duration) return false;
    
    const validFormats = Object.values(TIME_UNITS)
      .map(unit => unit.regex)
      .some(regex => regex.test(duration));
  
    return validFormats;
  }