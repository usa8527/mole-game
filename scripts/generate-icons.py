#!/usr/bin/env python3
"""Generate PWA PNG icons without external dependencies."""
import struct
import zlib
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "icons"


def png_chunk(tag: bytes, data: bytes) -> bytes:
    crc = zlib.crc32(tag + data) & 0xFFFFFFFF
    return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", crc)


def write_png(path: Path, width: int, height: int, rgba_rows):
    raw = b""
    for row in rgba_rows:
        raw += b"\x00" + row
    compressed = zlib.compress(raw, 9)

    ihdr = struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0)
    png = b"\x89PNG\r\n\x1a\n"
    png += png_chunk(b"IHDR", ihdr)
    png += png_chunk(b"IDAT", compressed)
    png += png_chunk(b"IEND", b"")
    path.write_bytes(png)


def clamp(v):
    return max(0, min(255, int(v)))


def lerp(a, b, t):
    return clamp(a + (b - a) * t)


def rgb(r, g, b, a=255):
    return bytes((clamp(r), clamp(g), clamp(b), clamp(a)))


def render_icon(size: int):
    rows = []
    cx, cy = size / 2, size * 0.42
    for y in range(size):
        row = bytearray()
        for x in range(size):
            t = y / max(size - 1, 1)
            bg = (
                lerp(0xA8, 0xDC, t),
                lerp(0xE6, 0xED, t),
                lerp(0xCF, 0xC1, t),
            )
            r, g, b, a = bg[0], bg[1], bg[2], 255

            # grass hole
            hx, hy = size / 2, size * 0.72
            hole_rx, hole_ry = size * 0.34, size * 0.11
            nd = ((x - hx) / hole_rx) ** 2 + ((y - hy) / hole_ry) ** 2
            if nd <= 1:
                r, g, b = 0x3E, 0x27, 0x23
                if nd > 0.72:
                    r, g, b = 0x5D, 0x40, 0x37

            # mole head
            head_cy = size * 0.38
            head_r = size * 0.22
            hd = ((x - cx) / head_r) ** 2 + ((y - head_cy) / (head_r * 1.05)) ** 2
            if hd <= 1:
                r, g, b = 0xA1, 0x88, 0x7F
                if hd < 0.55:
                    r, g, b = 0x8D, 0x6E, 0x63

            # eyes
            for ex in (cx - head_r * 0.42, cx + head_r * 0.42):
                ey, erx, ery = head_cy - head_r * 0.12, head_r * 0.16, head_r * 0.18
                ed = ((x - ex) / erx) ** 2 + ((y - ey) / ery) ** 2
                if ed <= 1:
                    r, g, b = 0x1A, 0x12, 0x10
                shine_d = ((x - (ex - erx * 0.25)) / (erx * 0.22)) ** 2 + (
                    (y - (ey - ery * 0.2)) / (ery * 0.22)
                ) ** 2
                if shine_d <= 1:
                    r, g, b = 0xFF, 0xFF, 0xFF

            # nose
            ny = head_cy + head_r * 0.22
            nrx, nry = head_r * 0.18, head_r * 0.12
            nd2 = ((x - cx) / nrx) ** 2 + ((y - ny) / nry) ** 2
            if nd2 <= 1:
                r, g, b = 0xFF, 0xAB, 0x91

            # cheeks
            for sign in (-1, 1):
                chx = cx + sign * head_r * 0.55
                chy = head_cy + head_r * 0.18
                cd = ((x - chx) / (head_r * 0.12)) ** 2 + ((y - chy) / (head_r * 0.1)) ** 2
                if cd <= 1:
                    r, g, b = 0xF4, 0x8F, 0xB1

            row.extend((r, g, b, a))
        rows.append(bytes(row))
    return rows


def main():
    ROOT.mkdir(parents=True, exist_ok=True)
    for size, name in [(180, "icon-180.png"), (192, "icon-192.png"), (512, "icon-512.png")]:
        out = ROOT / name
        write_png(out, size, size, render_icon(size))
        print(f"Wrote {out}")


if __name__ == "__main__":
    main()
