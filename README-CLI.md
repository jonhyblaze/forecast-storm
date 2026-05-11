# ⛈ forecast-storm CLI

A terminal weather TUI — the command-line companion to the **forecast-storm** Next.js dashboard. Renders all 7 widgets (Today, Forecast, Wind, Conditions, Air, Sun, Moon) directly in your terminal with full color, Unicode box-drawing, and a live refresh mode.

Falls back to **Open-Meteo** (no API key) automatically — you get real weather data immediately, with richer data once you add your Visual Crossing / WeatherAPI keys.

---

## Install

### One-liner (Linux + macOS)

```bash
# curl
curl -fsSL https://forecast-storm.vercel.app/install | bash

# wget
wget -qO- https://forecast-storm.vercel.app/install | bash
```

### Homebrew (macOS / Linux)

```bash
brew tap jonhyblaze/forecast-storm
brew install forecast-storm
```

### Manual

```bash
curl -fsSL https://raw.githubusercontent.com/jonhyblaze/forecast-storm/main/cli/forecast-storm \
     -o /usr/local/bin/forecast-storm && chmod +x /usr/local/bin/forecast-storm
```

### From source (in the monorepo)

```bash
git clone https://github.com/jonhyblaze/forecast-storm
cd forecast-storm
chmod +x cli/forecast-storm
./cli/forecast-storm --install          # installs to /usr/local/bin
```

**Dependencies:** `bash` ≥ 4, `curl`, `jq`, `python3` (any version). The installer auto-installs `jq` if missing.

---

## Usage

```
forecast-storm [OPTIONS] [CITY]
```

| Command | Description |
|---|---|
| `forecast-storm` | Auto-detect city from your IP |
| `forecast-storm Tokyo` | Specific city |
| `forecast-storm "New York"` | City with spaces |
| `forecast-storm -p London` | Plain text (pipe-friendly) |
| `forecast-storm -j Berlin \| jq .` | Raw JSON output |
| `forecast-storm -r Paris` | Force refresh (bypass cache) |
| `forecast-storm --setup` | Configure API keys |
| `forecast-storm --clear-cache` | Wipe cached data |
| `forecast-storm --install` | Install to /usr/local/bin |

### Options

```
-h, --help          Show help
-v, --version       Print version
-p, --plain         Plain text — no TUI, no colors — great for pipes/scripts
-j, --json          Raw JSON from the weather API
-r, --refresh       Force cache bypass
    --setup         Interactive API key wizard
    --install [PATH] Copy self to PATH (default: /usr/local/bin)
    --clear-cache   Clear all cached responses
```

---

## API Keys

forecast-storm works **without any API keys** — it falls back to [Open-Meteo](https://open-meteo.com/) (free, open, no account needed).

To unlock full data (moon astronomy, AQI, detailed descriptions), add keys:

```bash
forecast-storm --setup
```

Or export them in your shell profile:

```bash
export VISUAL_CROSSING_KEY="your_key_here"   # https://www.visualcrossing.com/weather-api
export WEATHERAPI_KEY="your_key_here"        # https://www.weatherapi.com
```

Or write them to `~/.config/forecast-storm/config`:

```bash
VISUAL_CROSSING_KEY="your_key_here"
WEATHERAPI_KEY="your_key_here"
```

---

## Piping & Scripting

The script auto-detects whether stdout is a TTY:

- **Interactive terminal** → full TUI with colors, box-drawing, weather icons
- **Pipe / redirect** → plain text (same as `-p`), no escape codes

```bash
# Works in scripts
forecast-storm -p Berlin > /tmp/weather.txt

# In a status bar
forecast-storm -p | head -5

# JSON into other tools
forecast-storm -j Amsterdam | jq '.currentConditions.temp'

# Quick alias
alias weather='forecast-storm -p'
```

---

## curl / wget one-shot (no install)

You can run it entirely without installing:

```bash
# One-shot plain output, any city
curl -fsSL https://raw.githubusercontent.com/jonhyblaze/forecast-storm/main/cli/forecast-storm \
     | bash -s -- -p "São Paulo"

# TUI
curl -fsSL https://raw.githubusercontent.com/jonhyblaze/forecast-storm/main/cli/forecast-storm \
     | bash -s -- Tokyo
```

---

## What's displayed

| Widget | Data |
|---|---|
| **Today** | Temp, feels like, min/max, conditions, city + date |
| **Forecast** | 4-day: date, min/max, icon, precip bar |
| **Wind** | Speed + gusts (m/s + km/h), compass direction, ASCII windrose |
| **Sun** | Sunrise / sunset |
| **Moon** | Phase icon + name, illumination %, moonrise/moonset |
| **Conditions** | Precip probability, cloud cover, precipitation, humidity, visibility |
| **Air** | UV index + level, pressure + level |

---

## Data Sources

Mirrors the Next.js dashboard exactly:

| Source | Used for | Key env var |
|---|---|---|
| [Visual Crossing](https://www.visualcrossing.com/) | Everything weather | `VISUAL_CROSSING_KEY` |
| [WeatherAPI](https://www.weatherapi.com/) | Moon astronomy | `WEATHERAPI_KEY` |
| [Open-Meteo](https://open-meteo.com/) | Fallback (no key needed) | — |
| [ipapi.co](https://ipapi.co/) | IP → city auto-detect | — |

---

## Monorepo structure

```
forecast-storm/
├── app/                    # Next.js App Router
├── lib/
│   ├── weather.ts          # getWeatherData() — shared with CLI
│   ├── astro.ts            # getAstroData()
│   ├── helpers.ts          # UV levels, moon phases, formatters
│   └── location.ts         # IP → city (web only)
├── components/Widgets/
│   └── types.ts            # NormalizedWeather — shared type contract
├── cli/
│   ├── forecast-storm      # ← this script
│   └── install.sh          # one-liner installer
└── forecast-storm.rb       # Homebrew formula
```

The CLI reuses the same data contracts (`NormalizedWeather`) as the web widgets. The `lib/` layer is the SDK — the CLI and the web app share business logic, only the renderer differs.

---

## Caching

Responses are cached in `~/.cache/forecast-storm/` for **15 minutes** (configurable via `CACHE_TTL` env). Use `-r` / `--refresh` to bypass. Clear all with `--clear-cache`.

---

## License

MIT — see [LICENSE](../LICENSE)
