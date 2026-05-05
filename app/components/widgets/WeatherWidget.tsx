"use client";
import { useState, useEffect } from "react";
import Card from "@/app/components/ui/Card";

const WMO_CODES: Record<number, { label: string; icon: string }> = {
  0:  { label: "Clear sky",      icon: "☀️"  },
  1:  { label: "Mainly clear",   icon: "🌤️" },
  2:  { label: "Partly cloudy",  icon: "⛅"  },
  3:  { label: "Overcast",       icon: "☁️"  },
  45: { label: "Foggy",          icon: "🌫️" },
  48: { label: "Icy fog",        icon: "🌫️" },
  51: { label: "Light drizzle",  icon: "🌦️" },
  53: { label: "Drizzle",        icon: "🌦️" },
  55: { label: "Heavy drizzle",  icon: "🌦️" },
  61: { label: "Slight rain",    icon: "🌧️" },
  63: { label: "Moderate rain",  icon: "🌧️" },
  65: { label: "Heavy rain",     icon: "🌧️" },
  71: { label: "Slight snow",    icon: "🌨️" },
  73: { label: "Moderate snow",  icon: "🌨️" },
  75: { label: "Heavy snow",     icon: "❄️"  },
  80: { label: "Rain showers",   icon: "🌦️" },
  81: { label: "Rain showers",   icon: "🌧️" },
  82: { label: "Heavy showers",  icon: "🌧️" },
  95: { label: "Thunderstorm",   icon: "⛈️" },
  96: { label: "Thunderstorm",   icon: "⛈️" },
  99: { label: "Thunderstorm",   icon: "⛈️" },
};

type WeatherData = {
  temperature: number;
  weathercode: number;
  windspeed: number;
  is_day: number;
};

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);

  useEffect(() => {
    fetch("/api/weather")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) { setError(true); } else { setWeather(d); }
        setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <Card>
        <div className="h-24 animate-pulse bg-dashboard-border rounded" />
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <p className="text-sm text-dashboard-muted">Weather unavailable</p>
      </Card>
    );
  }

  const condition =
    WMO_CODES[weather!.weathercode] ?? { label: "Unknown", icon: "🌡️" };

  return (
    <Card>
      <p className="text-sm text-dashboard-muted mb-2">
        Charsadda, Pakistan
      </p>
      <div className="flex items-center gap-3">
        <span className="text-5xl">{condition.icon}</span>
        <div>
          <p className="text-4xl font-bold text-dashboard-text">
            {Math.round(weather!.temperature)}°C
          </p>
          <p className="text-dashboard-muted text-sm">{condition.label}</p>
          <p className="text-dashboard-muted text-xs mt-1">
            Wind: {weather!.windspeed} km/h
          </p>
        </div>
      </div>
    </Card>
  );
}
