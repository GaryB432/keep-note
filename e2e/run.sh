#!/bin/sh

set -eu

RED='\033[31m'
GREEN='\033[32m'
WHITE='\033[97m'
RESET='\033[0m'

script_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
repo_root=$(CDPATH= cd -- "$script_dir/.." && pwd)

input_dir="$repo_root/e2e/fixtures/Takeout/Keep"
if [ ! -d "$input_dir" ]; then
  printf '%bMissing Takeout fixture directory: %s%b\n' "$RED" "$input_dir" "$RESET" >&2
  exit 1
fi

cd "$repo_root"

xdg_dir=${XDG_RUNTIME_DIR:-${TMPDIR:-/tmp}}
output_dir="$xdg_dir/keep-note-e2e-$$"
# rm -rf -- "$output_dir"
# mkdir -p "$output_dir"

if ! node ./bin.ts takeout "$input_dir" -o "$output_dir" --ci > /tmp/keep-note-e2e.out 2>&1; then
  cat /tmp/keep-note-e2e.out >&2
  printf '%btakeout command failed%b\n' "$RED" "$RESET" >&2
  exit 1
fi

if [ ! -f "$output_dir/summary.md" ]; then
  cat /tmp/keep-note-e2e.out >&2
  printf '%bMissing summary.md at %s%b\n' "$RED" "$output_dir/summary.md" "$RESET" >&2
  exit 1
fi

if ! grep -q 'fairly lengthy' "$output_dir/summary.md"; then
  cat "$output_dir/summary.md" >&2
  printf '%bsummary.md did not include expected fixture content%b\n' "$RED" "$RESET" >&2
  exit 1
fi

if ! grep -q 'cp ".*watermarked_img\.jpg" ".*watermarked_img\.jpg"' "$output_dir/summary.md"; then
  cat "$output_dir/summary.md" >&2
  printf '%bsummary.md did not preserve the original attachment filename%b\n' "$RED" "$RESET" >&2
  exit 1
fi

printf '%b✔%b %bkeep-note takeout --ci wrote %s%b\n' "$GREEN" "$RESET" "$WHITE" "$output_dir/summary.md" "$RESET"