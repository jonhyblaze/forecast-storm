class ForecastStorm < Formula
  desc "Terminal weather TUI — a CLI companion for forecast-storm dashboard"
  homepage "https://github.com/jonhyblaze/forecast-storm"
  url "https://github.com/jonhyblaze/forecast-storm/archive/refs/tags/v1.0.0.tar.gz"
  sha256 "REPLACE_WITH_ACTUAL_SHA256_AFTER_RELEASE"
  license "MIT"
  version "1.0.0"

  depends_on "jq"
  uses_from_macos "bash" => :build
  uses_from_macos "curl"

  def install
    bin.install "cli/forecast-storm"
  end

  def caveats
    <<~EOS
      forecast-storm works out of the box with Open-Meteo (no API key).

      For full features (detailed moon data, AQI), configure API keys:
        forecast-storm --setup

      Or set environment variables:
        export VISUAL_CROSSING_KEY="your_key"
        export WEATHERAPI_KEY="your_key"

      Keys can be obtained from:
        Visual Crossing: https://www.visualcrossing.com/weather-api
        WeatherAPI:      https://www.weatherapi.com/
    EOS
  end

  test do
    assert_match "forecast-storm", shell_output("#{bin}/forecast-storm --version")
    assert_match "usage", shell_output("#{bin}/forecast-storm --help").downcase
  end
end
