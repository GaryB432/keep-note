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
rm -rf -- tmp
mkdir -p tmp

node ./bin.ts takeout "$input_dir" -o tmp --ci > /tmp/keep-note-e2e.out 2>&1

if [ ! -f "tmp/summary.md" ]; then
  cat /tmp/keep-note-e2e.out >&2
  echo "Missing summary.md at tmp/summary.md" >&2
  exit 1
fi

if ! grep -q 'I skipped to this' tmp/summary.md; then
  cat /tmp/keep-note-e2e.out >&2
  echo "summary.md did not include expected fixture content" >&2
  exit 1
fi

if ! grep -q 'cp .*19d27298421\.828c1c769f7cce46\.jpg .*tmp/19d27298421\.828c1c769f7cce46\.jpg' tmp/summary.md; then
  cat /tmp/keep-note-e2e.out >&2
  echo "summary.md did not preserve the original attachment filename" >&2
  exit 1
fi

echo "ok: keep-note takeout --ci wrote tmp/summary.md"