#!/bin/sh

set -eu

script_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
repo_root=$(CDPATH= cd -- "$script_dir/.." && pwd)

input_dir="$repo_root/e2e/fixtures/Takeout/Keep"
if [ ! -d "$input_dir" ]; then
  echo "Missing Takeout fixture directory: $input_dir" >&2
  exit 1
fi

cd "$repo_root"

xdg_dir=${XDG_RUNTIME_DIR:-${TMPDIR:-/tmp}}
output_dir="$xdg_dir/keep-note-e2e-$$"
rm -rf -- "$output_dir"
mkdir -p "$output_dir"

node ./bin.ts takeout "$input_dir" -o "$output_dir" --ci > /tmp/keep-note-e2e.out 2>&1

if [ ! -f "$output_dir/summary.md" ]; then
  cat /tmp/keep-note-e2e.out >&2
  echo "Missing summary.md at $output_dir/summary.md" >&2
  exit 1
fi

if ! grep -q 'I skipped to this' "$output_dir/summary.md"; then
  cat /tmp/keep-note-e2e.out >&2
  echo "summary.md did not include expected fixture content" >&2
  exit 1
fi

if ! grep -q 'cp .*watermarked_img\.jpg .*watermarked_img\.jpg' "$output_dir/summary.md"; then
  cat /tmp/keep-note-e2e.out >&2
  echo "summary.md did not preserve the original attachment filename" >&2
  exit 1
fi

echo "ok: keep-note takeout --ci wrote $output_dir/summary.md"