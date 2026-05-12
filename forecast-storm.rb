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
      forecast-storm is ready to use — no API key setup required.
        forecast-storm          # auto-detect city
        forecast-storm Tokyo    # specific city
    EOS
  end

  test do
    assert_match "forecast-storm", shell_output("#{bin}/forecast-storm --version")
    assert_match "usage", shell_output("#{bin}/forecast-storm --help").downcase
  end
end
