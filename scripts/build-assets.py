"""Build the site's image assets from the supplied photograph.

Outputs
  public/profile/minhaz-alam.jpg   800x1000 (4:5)  ~ optimized JPEG
  public/profile/minhaz-alam.webp  800x1000         WebP
  public/og-image.png              1200x630         social sharing card

Run from the project root:  python scripts/build-assets.py
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
SOURCE = Path(r"C:\Users\Minhaz alam\Downloads\WhatsApp Image 2026-11-11 at 12.23.49.jpeg")

FONT_DIR = Path(r"C:\Windows\Fonts")
BOLD = FONT_DIR / "segoeuib.ttf"
REGULAR = FONT_DIR / "segoeui.ttf"
MONO = FONT_DIR / "consola.ttf"


def load_font(path: Path, size: int) -> ImageFont.FreeTypeFont:
    try:
        return ImageFont.truetype(str(path), size)
    except OSError:
        return ImageFont.load_default(size)


def cover_crop(img: Image.Image, ratio_w: int, ratio_h: int, anchor: str = "top") -> Image.Image:
    """Crop to the requested aspect ratio, keeping the top of the frame."""
    target = ratio_w / ratio_h
    width, height = img.size
    current = width / height

    if current > target:  # too wide -> trim sides
        new_width = int(height * target)
        left = (width - new_width) // 2
        box = (left, 0, left + new_width, height)
    else:  # too tall -> trim bottom
        new_height = int(width / target)
        if anchor == "top":
            top = 0
        elif anchor == "center":
            top = (height - new_height) // 2
        else:
            top = height - new_height
        box = (0, top, width, top + new_height)

    return img.crop(box)


def build_portrait() -> tuple[Image.Image, Image.Image]:
    source = Image.open(SOURCE).convert("RGB")
    # 834x1446 -> 4:5 keeps head and shoulders; a few pixels down from the very
    # top so the hair is not clipped.
    crop = source.crop((0, 26, source.width, 26 + int(source.width / 0.8)))
    portrait = crop.resize((800, 1000), Image.LANCZOS)

    PUBLIC.joinpath("profile").mkdir(parents=True, exist_ok=True)
    portrait.save(PUBLIC / "profile" / "minhaz-alam.jpg", "JPEG", quality=84, optimize=True, progressive=True)
    portrait.save(PUBLIC / "profile" / "minhaz-alam.webp", "WEBP", quality=82, method=6)
    return portrait, source


def build_og_image(portrait: Image.Image) -> None:
    width, height = 1200, 630

    # Base vertical gradient: deep navy at the top, near-black at the bottom.
    strip = Image.new("RGB", (1, height))
    for y in range(height):
        t = y / (height - 1)
        strip.putpixel(
            (0, y),
            (int(10 - 5 * t), int(15 - 7 * t), int(34 - 22 * t)),
        )
    canvas = strip.resize((width, height)).convert("RGBA")

    # Coloured light, composited with real alpha so it stays a glow.
    glow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse((-300, 120, 520, 940), fill=(139, 92, 246, 165))
    gdraw.ellipse((720, -340, 1500, 400), fill=(56, 189, 248, 105))
    glow = glow.filter(ImageFilter.GaussianBlur(150))
    canvas = Image.alpha_composite(canvas, glow)

    # Faint grid, low alpha on its own layer.
    grid = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(grid)
    for x in range(0, width, 60):
        gdraw.line([(x, 0), (x, height)], fill=(255, 255, 255, 13), width=1)
    for y in range(0, height, 60):
        gdraw.line([(0, y), (width, y)], fill=(255, 255, 255, 13), width=1)
    canvas = Image.alpha_composite(canvas, grid)

    # Portrait panel on the right.
    panel_w, panel_h = 360, 452
    panel = cover_crop(portrait, panel_w, panel_h, anchor="top").resize((panel_w, panel_h), Image.LANCZOS)
    mask = Image.new("L", (panel_w, panel_h), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, panel_w, panel_h), radius=26, fill=255)
    px, py = width - panel_w - 88, (height - panel_h) // 2 - 4

    # Soft purple shadow behind the panel.
    shadow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rounded_rectangle(
        (px - 14, py + 22, px + panel_w + 14, py + panel_h + 34), radius=34, fill=(120, 60, 220, 150)
    )
    canvas = Image.alpha_composite(canvas, shadow.filter(ImageFilter.GaussianBlur(40)))

    canvas.paste(panel, (px, py), mask)
    outline = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    ImageDraw.Draw(outline).rounded_rectangle(
        (px, py, px + panel_w, py + panel_h), radius=26, outline=(255, 255, 255, 90), width=2
    )
    canvas = Image.alpha_composite(canvas, outline)

    # Soften the bright ceiling strip at the top of the photograph.
    top_fade = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    fdraw = ImageDraw.Draw(top_fade)
    for y in range(py, py + 130):
        alpha = int(120 * (1 - (y - py) / 130))
        fdraw.line([(px + 2, y), (px + panel_w - 2, y)], fill=(7, 9, 18, max(0, alpha)))
    canvas = Image.alpha_composite(canvas, top_fade)

    draw = ImageDraw.Draw(canvas)

    # Type block.
    left = 88
    name_font = load_font(BOLD, 74)
    role_font = load_font(BOLD, 30)
    mono_font = load_font(MONO, 22)
    tag_font = load_font(MONO, 18)

    draw.text((left, 112), "MINHAZ ALAM", font=name_font, fill=(248, 249, 253))

    # Gradient rule under the name.
    rule = Image.new("RGBA", (196, 3))
    for x in range(196):
        t = x / 195
        rule.putpixel((x, 0), (int(167 - 111 * t), int(139 - 83 * t), 250, 255))
    canvas.alpha_composite(rule, (left, 222))
    draw = ImageDraw.Draw(canvas)

    draw.text((left, 252), "Full Stack  ·  MERN Stack Developer", font=role_font, fill=(196, 181, 253))
    draw.text((left, 306), "React  ·  Node.js  ·  Express  ·  MongoDB", font=mono_font, fill=(170, 181, 203))
    draw.text((left, 348), "Delhi NCR, India  ·  open to junior developer roles", font=mono_font, fill=(139, 150, 171))

    # Badge.
    badge = Image.new("RGBA", (330, 50), (0, 0, 0, 0))
    bdraw = ImageDraw.Draw(badge)
    bdraw.rounded_rectangle((0, 0, 329, 49), radius=25, fill=(26, 22, 52, 210), outline=(167, 139, 250, 120), width=1)
    bdraw.ellipse((20, 21, 28, 29), fill=(52, 211, 153, 255))
    bdraw.text((40, 14), "PORTFOLIO  ·  OPEN TO WORK", font=tag_font, fill=(214, 205, 255))
    canvas.alpha_composite(badge, (left, 428))

    # Subtle vignette so the corners settle down.
    vignette = Image.new("L", (width, height), 0)
    ImageDraw.Draw(vignette).ellipse((-260, -220, width + 260, height + 220), fill=255)
    vignette = vignette.filter(ImageFilter.GaussianBlur(120))
    dark = Image.new("RGBA", (width, height), (3, 4, 9, 255))
    canvas = Image.composite(canvas, dark, vignette)

    canvas.convert("RGB").save(PUBLIC / "og-image.png", "PNG", optimize=True)


def build_icons() -> None:
    """Square app icons for the manifest and iOS home screen."""

    def make_icon(size: int, rounded: bool) -> Image.Image:
        scale = 4
        s = size * scale
        icon = Image.new("RGBA", (s, s), (0, 0, 0, 0))

        # Diagonal purple -> blue gradient.
        grad = Image.new("RGB", (s, s))
        px = grad.load()
        for y in range(s):
            for x in range(s):
                t = (x + y) / (2 * (s - 1))
                if t < 0.48:
                    u = t / 0.48
                    c = (int(167 + (124 - 167) * u), int(139 + (58 - 139) * u), int(250 + (237 - 250) * u))
                else:
                    u = (t - 0.48) / 0.52
                    c = (int(124 + (29 - 124) * u), int(58 + (78 - 58) * u), int(237 + (216 - 237) * u))
                px[x, y] = c

        mask = Image.new("L", (s, s), 0)
        radius = int(s * 0.235) if rounded else 0
        ImageDraw.Draw(mask).rounded_rectangle((0, 0, s - 1, s - 1), radius=radius, fill=255)
        icon.paste(grad, (0, 0), mask)

        draw = ImageDraw.Draw(icon)
        pts = [(0.234, 0.734), (0.234, 0.31), (0.5, 0.552), (0.766, 0.31), (0.766, 0.734)]
        draw.line([(x * s, y * s) for x, y in pts], fill=(255, 255, 255, 255), width=int(s * 0.082), joint="curve")
        for x, y in (pts[0], pts[-1]):
            r = s * 0.041
            draw.ellipse((x * s - r, y * s - r, x * s + r, y * s + r), fill=(255, 255, 255, 255))

        return icon.resize((size, size), Image.LANCZOS)

    make_icon(192, rounded=True).save(PUBLIC / "icon-192.png", "PNG", optimize=True)
    make_icon(512, rounded=True).save(PUBLIC / "icon-512.png", "PNG", optimize=True)
    make_icon(180, rounded=False).save(PUBLIC / "apple-touch-icon.png", "PNG", optimize=True)


def main() -> None:
    portrait, _ = build_portrait()
    build_og_image(portrait)
    build_icons()
    for name in ("profile/minhaz-alam.jpg", "profile/minhaz-alam.webp", "og-image.png", "icon-192.png", "icon-512.png", "apple-touch-icon.png"):
        path = PUBLIC / name
        print(f"wrote {name}  {path.stat().st_size / 1024:.0f} KB")


if __name__ == "__main__":
    main()
