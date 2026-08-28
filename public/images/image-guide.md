**Great question.** Since you're building one-pagers that need to look good both on the web (`?pdf=1` preview) **and** in the final PDF, image handling matters more than in a normal webpage.

Here’s a practical guide tailored to your use case:

### 1. Recommended File Types

| Use Case              | Best Format     | Alternative     | Why |
|-----------------------|-----------------|------------------|-----|
| **Hero images**       | **WebP**        | JPG             | Smaller file size, good quality |
| **Product thumbnails**| **WebP**        | PNG (if transparency needed) | Clean edges + small size |
| **Icons / Logos**     | **SVG** (preferred) or PNG | — | Scalable, crisp at any size |
| **Photos**            | **WebP**        | JPG             | Best balance of quality vs size |

**Recommendation**: Use **WebP** as your default for photos and thumbnails. It’s well supported now and keeps file sizes much smaller (important for PDF generation).

### 2. Recommended Image Sizes

Here are practical sizes that work well for **Letter-size PDFs** with good quality:

| Image Type              | Recommended Dimensions | Max Height in PDF Mode | Notes |
|-------------------------|------------------------|------------------------|-------|
| **Hero Image**          | 1200–1600px wide      | ~300–400px            | 16:9 or 3:2 aspect ratio works well |
| **Product / Feature Thumbnail** | 600–800px wide     | ~180–220px            | 4:3 or 1:1 (square) usually looks cleanest |
| **Small Icons**         | 64–128px              | —                     | Use SVG when possible |

**Rule of thumb**:
- Don’t go much smaller than **600px wide** for thumbnails — they can look pixelated in PDFs.
- Don’t go crazy with very large images (2000px+) — they increase PDF file size with little visual benefit.

### 3. Folder Structure Suggestion
public/images/
├── heroes/                    # High-res hero banners
├── thumbnails/                # 4:3 cropped for cards/grids
├── products/                  # Full-size product shots
└── logos/                     # Brand assets
text### 4. Additional Tips for Your Workflow

- **Optimization**: Run images through a tool like [Squoosh.app](https://squoosh.app) or use a script. Aim for **under 300KB** per image when possible.
- **Aspect Ratios**: Try to be consistent within a one-pager (e.g., all thumbnails 4:3). This makes the layout look cleaner.
- **PDF Considerations**: Since Playwright renders these into PDFs, higher quality source images are better, but they still need to be web-optimized.
- **Alt Text**: Add meaningful `alt` text even if it’s just for the PDF preview.

---

### Final Structure & Usage (July 10, 2026)

All images have been optimized to WebP and placed in:
public/images/
├── heroes/          # 3 high-res files (cloud-vms, iq, realvue)
├── thumbnails/      # 16 files – pre-cropped 4:3 where appropriate
├── products/        # 17 full-size product shots
├── logos/           # realwave-logo.webp
└── (legacy files)
text**Usage Guidelines**
- **Heroes**: Top banners – maintain aspect ratio.
- **Thumbnails**: Feature cards/grids – consistent 800x600 4:3.
- **Products**: Detailed views / lightboxes.
- **Logos**: Brand elements (consider SVG for realwave-logo in future).
- In Next.js use the built-in `Image` component with appropriate `sizes`, `priority` for heroes, and `alt` text.

You’re all set! The images are production-ready for one-pagers and the site.
