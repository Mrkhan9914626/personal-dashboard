import { NextResponse } from "next/server";

export async function GET() {
  try {
    const geoRes = await fetch(
      "https://geocoding-api.open-meteo.com/v1/search?name=Charsadda&count=1&language=en&format=json",
      { next: { revalidate: 86400 } }
    );
    const geoData = await geoRes.json();

    if (!geoData.results?.length) {
      return NextResponse.json({ error: "City not found" }, { status: 404 });
    }

    const { latitude, longitude, timezone } = geoData.results[0];

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?` +
        `latitude=${latitude}&longitude=${longitude}` +
        `&current_weather=true` +
        `&timezone=${encodeURIComponent(timezone)}` +
        `&forecast_days=1`,
      { next: { revalidate: 1800 } }
    );
    const weatherData = await weatherRes.json();
    const current = weatherData.current_weather;

    return NextResponse.json({
      temperature: current.temperature,
      windspeed:   current.windspeed,
      weathercode: current.weathercode,
      is_day:      current.is_day,
    });
  } catch {
    return NextResponse.json(
      { error: "Weather fetch failed" },
      { status: 500 }
    );
  }
}
