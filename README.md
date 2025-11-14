# Sam-fedel — Personal Website & Tools

Sam-fedel is a lightweight static website and utility collection that includes a homepage, admin page, supporting JavaScript and styles, and a small Python utility (`prontt.py`). This repository contains the source files for the site and simple tooling used to manage or demo features.

Overview
- Project: Sam-fedel personal/portfolio website and small utilities
- Primary technologies: HTML, CSS, JavaScript, Python
- Main pages: `index.html` (homepage), `admin.html` (admin interface)

Why this repo (SEO-friendly summary)
This repository contains a fast, minimal website built with static HTML/CSS/JS and a small Python helper script. It’s optimized for quick hosting and fast page loads, making it suitable for personal portfolios, small business landing pages, or demos. Keywords: Sam-fedel, portfolio, personal website, static site, HTML, CSS, JavaScript, Python utility.

Contents (Files & Folders)
- `index.html` — Main landing page (homepage)
- `admin.html` — Admin interface page (if used for content or site settings)
- `script.js` — JavaScript used by the site for interactivity
- `style.css` — Site CSS and visual styling
- `prontt.py` — Small Python script included in the repo (utility / demo)
- `robots.txt` — Search engine crawling instructions
- `sitemap.xml` — Sitemap to help search engines index pages
- `temp.bat` — Temporary batch file for local Windows tasks
- `samfedel farms/` — Additional assets or content in this folder (rename if needed for clarity)

Quick Start (Local Preview)
1. Open `index.html` in a browser to preview the homepage locally.
2. If the site uses JavaScript features that require a server (fetch, modules), run a simple HTTP server:

For PowerShell (Windows):

```
# From repo root
python -m http.server 8000; Start-Process "http://localhost:8000"
```

3. If you want to run the Python utility `prontt.py`, use:

```
python prontt.py
```

(Confirm your system Python is available and the script is safe to run.)

SEO & Best Practices
- Title and headings: Use descriptive titles and H1/H2 headings inside `index.html` and `admin.html` to improve search relevance.
- Meta tags: Add `meta` description and relevant keywords in the HTML `<head>` of `index.html` and other pages.
- Sitemap & robots: `sitemap.xml` and `robots.txt` are included — ensure `sitemap.xml` lists all indexable pages and `robots.txt` does not block search engine crawlers from important pages.
- Performance: Keep images optimized in `samfedel farms/` and use compressed formats (WebP/optimized JPEG/PNG) for faster load times.
- Accessibility: Use semantic HTML (`nav`, `main`, `header`, `footer`) and provide `alt` text for images.

Improvement ideas
- Add a `README` badge or GitHub Pages link if the site is published.
- Add a short `LICENSE` file if you want to allow reuse.
- Move assets into a clear `assets/` or `images/` folder and update references.
- Add a `requirements.txt` if `prontt.py` depends on external Python packages.

Contact & Attribution
- Repository: `Sam-fedel` (local workspace)
- Author: Add your name and contact details here if you want to be discoverable.

If you want, I can:
- Add meta tags and example SEO-ready `<head>` content to `index.html` and `admin.html`.
- Create a minimal `LICENSE` and `requirements.txt` if `prontt.py` needs dependencies.
- Optimize image assets under `samfedel farms/` and add an `assets/` structure.

