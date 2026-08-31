#!/usr/bin/env bash
#
# Generate gallery thumbnails.
#
# The source screenshots in public/assets/images/Grid are ~3000px wide but render
# in ~346px grid tiles. This downscales them so the gallery doesn't pull ~34MB on
# first paint. The lightbox still loads the untouched original.
#
# 700px is 2x the 346px tile, i.e. exactly retina. These stay PNG because they're
# UI screenshots full of small text, which JPEG chroma subsampling smears. sips
# can read WebP but not write it, so PNG is the floor here — the rest of the win
# comes from loading="lazy" on the tiles.
#
# Uses sips, which ships with macOS — no dependency to install. Output is
# committed, so this only needs re-running when images are added or replaced.
#
#   npm run thumbs
#
set -euo pipefail

SRC_DIR="public/assets/images/Grid"
OUT_DIR="$SRC_DIR/thumbs"
MAX_EDGE=700

if ! command -v sips >/dev/null 2>&1; then
  echo "error: sips not found (this script expects macOS)" >&2
  exit 1
fi

mkdir -p "$OUT_DIR"

count=0
for src in "$SRC_DIR"/*.png; do
  [ -e "$src" ] || continue
  out="$OUT_DIR/$(basename "$src")"

  # Skip if the thumb is already newer than its source.
  if [ -f "$out" ] && [ "$out" -nt "$src" ]; then
    echo "skip  $(basename "$src")"
    continue
  fi

  sips -Z "$MAX_EDGE" "$src" --out "$out" >/dev/null
  echo "thumb $(basename "$src")"
  count=$((count + 1))
done

echo
echo "$count thumbnail(s) written to $OUT_DIR"
du -sh "$SRC_DIR"/*.png | tail -1 >/dev/null 2>&1 || true
printf 'originals: %s\nthumbs:    %s\n' \
  "$(du -ch "$SRC_DIR"/*.png | tail -1 | cut -f1)" \
  "$(du -ch "$OUT_DIR"/*.png | tail -1 | cut -f1)"
