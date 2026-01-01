'use client';

import { useState, useEffect } from 'react';

interface AgeCounterProps {
  birthDate: Date;
}

interface AgeDetails {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function AgeCounter({ birthDate }: AgeCounterProps) {
  const [age, setAge] = useState<AgeDetails>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateAge = () => {
      const now = new Date();
      const birth = new Date(birthDate);

      let years = now.getFullYear() - birth.getFullYear();
      let months = now.getMonth() - birth.getMonth();
      let days = now.getDate() - birth.getDate();
      let hours = now.getHours() - birth.getHours();
      let minutes = now.getMinutes() - birth.getMinutes();
      let seconds = now.getSeconds() - birth.getSeconds();

      if (seconds < 0) {
        seconds += 60;
        minutes--;
      }

      if (minutes < 0) {
        minutes += 60;
        hours--;
      }

      if (hours < 0) {
        hours += 24;
        days--;
      }

      if (days < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
      }

      if (months < 0) {
        months += 12;
        years--;
      }

      setAge({ years, months, days, hours, minutes, seconds });
    };

    calculateAge();
    const interval = setInterval(calculateAge, 1000);

    return () => clearInterval(interval);
  }, [birthDate]);

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="text-2xl md:text-3xl font-bold text-white tabular-nums">
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-[10px] md:text-xs text-white/50 uppercase tracking-wider mt-1">
        {label}
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
      <TimeBlock value={age.years} label="Years" />
      <span className="text-white/30 text-xl">:</span>
      <TimeBlock value={age.months} label="Months" />
      <span className="text-white/30 text-xl">:</span>
      <TimeBlock value={age.days} label="Days" />
      <span className="text-white/30 text-xl hidden md:block">:</span>
      <div className="hidden md:flex items-center gap-2 md:gap-4">
        <TimeBlock value={age.hours} label="Hours" />
        <span className="text-white/30 text-xl">:</span>
        <TimeBlock value={age.minutes} label="Min" />
        <span className="text-white/30 text-xl">:</span>
        <TimeBlock value={age.seconds} label="Sec" />
      </div>
      <div className="flex md:hidden items-center gap-2 w-full justify-center mt-2">
        <TimeBlock value={age.hours} label="Hrs" />
        <span className="text-white/30 text-lg">:</span>
        <TimeBlock value={age.minutes} label="Min" />
        <span className="text-white/30 text-lg">:</span>
        <TimeBlock value={age.seconds} label="Sec" />
      </div>
    </div>
  );
}
