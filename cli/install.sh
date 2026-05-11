#!/usr/bin/env bash
# forecast-storm installer
# Usage:
#   curl  -fsSL https://forecast-storm.vercel.app/install.sh | bash
#   wget  -qO-  https://forecast-storm.vercel.app/install.sh | bash
set -euo pipefail

BINARY_URL="https://forecast-storm.vercel.app/cli"
BINARY="forecast-storm"

# Pick install dir: Homebrew prefix (macOS) > /usr/local/bin > ~/.local/bin
if command -v brew &>/dev/null; then
  INSTALL_DIR="$(brew --prefix)/bin"
elif [[ -d "/usr/local/bin" && -w "/usr/local/bin" ]]; then
  INSTALL_DIR="/usr/local/bin"
else
  INSTALL_DIR="${HOME}/.local/bin"
fi

# Colors
RED="\033[31m" GREEN="\033[32m" YELLOW="\033[33m"
CYAN="\033[36m" FG_GRAY="\033[38;5;245m" BOLD="\033[1m" RESET="\033[0m"

_ok()   { echo -e "${GREEN}  ✓${RESET} $*"; }
_err()  { echo -e "${RED}${BOLD}  ✗ error:${RESET} $*" >&2; exit 1; }
_info() { echo -e "${FG_GRAY}  $*${RESET}"; }
_head() { echo -e "\n${CYAN}${BOLD}$*${RESET}\n"; }

_head "⛈  forecast-storm installer"

# Check dependencies
_info "Checking dependencies..."
for cmd in curl bash; do
  command -v "$cmd" &>/dev/null || _err "missing: $cmd"
done
_ok "curl + bash found"

# Check for jq
if ! command -v jq &>/dev/null; then
  echo -e "${YELLOW}  ⚠  jq not found — attempting install...${RESET}"
  if command -v apt-get &>/dev/null; then
    sudo apt-get install -y jq -q || _err "could not install jq. Install manually: https://jqlang.github.io/jq/"
  elif command -v brew &>/dev/null; then
    brew install jq || _err "could not install jq. Run: brew install jq"
  elif command -v dnf &>/dev/null; then
    sudo dnf install -y jq
  elif command -v yum &>/dev/null; then
    sudo yum install -y jq
  elif command -v apk &>/dev/null; then
    sudo apk add jq
  else
    _err "could not install jq automatically.\n  Please install jq: https://jqlang.github.io/jq/download/"
  fi
fi
_ok "jq found"

# Ensure install dir exists and is writable; fall back to ~/.local/bin
mkdir -p "$INSTALL_DIR"
if [[ ! -w "$INSTALL_DIR" ]]; then
  INSTALL_DIR="${HOME}/.local/bin"
  mkdir -p "$INSTALL_DIR"
  _info "No write access — installing to ${INSTALL_DIR}"
fi

DEST="${INSTALL_DIR}/${BINARY}"

# Warn if the chosen dir isn't in PATH yet
if [[ ":$PATH:" != *":${INSTALL_DIR}:"* ]]; then
  echo -e "${YELLOW}  ⚠  ${INSTALL_DIR} is not in your PATH.${RESET}"
  if [[ "$(uname)" == "Darwin" ]]; then
    echo    "     Add to ~/.zshrc (or ~/.bash_profile):"
  else
    echo    "     Add to ~/.bashrc:"
  fi
  echo    "     export PATH=\"${INSTALL_DIR}:\$PATH\""
fi

# Download
_info "Downloading from ${BINARY_URL}..."
if ! curl -fsSL --progress-bar "$BINARY_URL" -o "$DEST"; then
  _err "download failed. Check your internet connection or visit:\n  https://github.com/jonhyblaze/forecast-storm"
fi
chmod +x "$DEST"
_ok "installed to ${DEST}"

# Verify
if command -v forecast-storm &>/dev/null || [[ -x "$DEST" ]]; then
  echo ""
  _ok "Installation complete!"
  echo ""
  _info "Quick start:"
  echo  "    forecast-storm                     # auto-detect your city"
  echo  "    forecast-storm Tokyo               # specific city"
  echo  "    forecast-storm --setup             # configure API keys"
  echo  "    forecast-storm --help              # full usage"
  echo ""
  _info "Optional: add API keys for full features (moon, AQI):"
  echo  "    forecast-storm --setup"
  echo ""
fi
