# Crossroads — Fusion Pairing Cards

A static site publishing one vegetarian fusion pairing card every two weeks.  
Each card contains five recipes: an appetizer, a non-alcoholic drink, a cocktail, a main, and a dessert.

---

## Folder Structure

```
crossroads/
├── index.html          ← The site. Never edit for content changes.
├── data/
│   └── volumes.js      ← Edit this file every week to publish content.
├── assets/
│   ├── images/         ← Drop recipe photos here (jpg/webp).
│   └── icons/          ← SVG icons or other static assets.
└── README.md
```

---

## Weekly Publishing Workflow

### Step 1 — Open `data/volumes.js`

This is the only file you edit to publish new content.  
`index.html` loads it as a `<script>` tag and renders everything dynamically.

### Step 2 — Find your volume

Search for the volume number you're publishing, e.g. `num: 2`.

### Step 3 — Set `released: true`

```js
{ num: 2, released: true, releaseDate: 'Jan 19', ... }
```

Setting `released: false` keeps the card locked with a padlock and the `releaseDate` label.  
Setting `released: true` with an empty `recipes: []` shows the volume cover with a  
"Recipes arriving Jan 19" message — useful for teasing upcoming content.

### Step 4 — Add recipe objects to the `recipes` array

Paste your new recipe object following the schema documented at the top of `volumes.js`.  
A full volume has 5 recipes in this order:

| Index | Course         |
|-------|----------------|
| 0     | Appetizer      |
| 1     | Non-Alcoholic  |
| 2     | Cocktail       |
| 3     | Main           |
| 4     | Dessert        |

You can add them one at a time week by week — the site renders whatever is present.

### Step 5 — Commit and push to GitHub

```bash
git add data/volumes.js
git commit -m "publish: vol 2 appetizer — Tom Yum Burrata"
git push
```

### Step 6 — Done

Netlify or Vercel detects the push and redeploys automatically.  
Typical time from `git push` to live: **20–40 seconds**.

---

## Recipe ID Convention

Every recipe needs a globally unique `id`. Use:

```
v{volumeNumber}r{recipeIndex}
```

Examples: `v2r1`, `v2r2`, `v2r3`, `v2r4`, `v2r5`

Never reuse an ID across volumes. IDs are used as scroll anchors and cook-mode lookups.

---

## Adding Real Photos

Photos live in `/assets/images/`. The naming convention is:

```
v{vol}r{recipe}-short-recipe-name.jpg
```

Example: `v2r1-tom-yum-burrata.jpg`

To use a real photo instead of a gradient placeholder:

1. Drop your image in `/assets/images/`
2. In `index.html`, inside the `<style>` block, add a CSS class:

```css
.ph-v2r1 {
  background-image: url('/assets/images/v2r1-tom-yum-burrata.jpg');
  background-size: cover;
  background-position: center;
}
```

3. In `volumes.js`, set the recipe's `ph` field to `'ph-v2r1'`

Until you add real photos, the five gradient placeholders (`ph1`–`ph5`) work fine.

---

## Deployment (Netlify or Vercel)

The site is fully static — no build step, no server, no database.

### Netlify

1. Connect your GitHub repository in the Netlify dashboard
2. Set **Publish directory** to `/` (the root — `index.html` is at the root)
3. Leave **Build command** blank
4. Deploy

Every push to `main` triggers an automatic redeploy.

### Vercel

1. Import your GitHub repository in the Vercel dashboard
2. Framework preset: **Other** (static)
3. Output directory: `.` (dot — the root)
4. Deploy

### Local development

Because `index.html` loads `data/volumes.js` via a `<script src>` tag, you need a local
server to avoid browser CORS restrictions on `file://` URLs.

The simplest option:

```bash
# Python 3 (built in)
python3 -m http.server 8080
# then open http://localhost:8080
```

Or with Node:

```bash
npx serve .
```

---

## Content Schema Quick Reference

Full documentation with examples is in the comment block at the top of `data/volumes.js`.

### Volume fields

| Field         | Type    | Description                                          |
|---------------|---------|------------------------------------------------------|
| `num`         | Number  | 1-based volume number (renders as Eastern Arabic)    |
| `released`    | Boolean | `true` = open, `false` = locked with padlock         |
| `releaseDate` | String  | Shown on locked cards. Format: `"Jan 5"`             |
| `title`       | String  | First line of the volume title                       |
| `titleEm`     | String  | Second line — italic wine color                      |
| `theme`       | String  | One-sentence mood description                        |
| `occasion`    | String  | Short occasion label for folio/TOC                   |
| `cuisines`    | Array   | Cuisine strings for homepage pill tags               |
| `recipes`     | Array   | Array of recipe objects (empty `[]` is valid)        |

### Recipe fields

| Field       | Type         | Description                                                 |
|-------------|--------------|-------------------------------------------------------------|
| `id`        | String       | Unique ID. Convention: `v2r1`, `v2r2`, etc.                 |
| `course`    | String       | `"Appetizer"` / `"Non-Alcoholic"` / `"Cocktail"` / `"Main"` / `"Dessert"` |
| `courseSub` | String       | Longer folio sub-label e.g. `"Starters & Snacks"`           |
| `title`     | String       | Main title text                                             |
| `titleEm`   | String       | Italic wine-colored second title line                       |
| `cuisines`  | Array        | 2–3 cuisine strings for pill badges                         |
| `deck`      | String       | 1–2 sentence description (plain text, auto drop-cap)        |
| `ph`        | String       | Photo class: `ph1`–`ph5` or a custom `ph-v2r1` class        |
| `stats`     | Array        | 4 stat blocks: `[{ l: "Label", v: "<em>Value</em>" }]`      |
| `ings`      | Array        | Ingredient groups: `[{ sub: "heading", items: [["qty","name"]] }]` |
| `steps`     | Array        | Method steps: `[{ t: "HTML string", sec: 300 }]`            |
| `note`      | String       | Cook's Note (plain text, 2–4 sentences)                     |

---

## Timer Values Reference

Steps with a `sec` value show a live countdown in cook mode.

| Value  | Time     |
|--------|----------|
| `60`   | 1 min    |
| `120`  | 2 min    |
| `180`  | 3 min    |
| `300`  | 5 min    |
| `600`  | 10 min   |
| `900`  | 15 min   |
| `1200` | 20 min   |
| `1800` | 30 min   |
| `null` | No timer |

---

## Design System

The visual design is defined entirely in `index.html`'s `<style>` block.  
**Do not edit `index.html` for content changes.** All content lives in `data/volumes.js`.

The design uses the V4 Burgundy Ember + Ottoman Navy palette:

| Token        | Value       | Used for                         |
|--------------|-------------|----------------------------------|
| `--bg`       | `#EAD9C7`   | Page background                  |
| `--card`     | `#FFFDF7`   | Card surfaces                    |
| `--ink`      | `#1F3658`   | Ottoman Navy — body text         |
| `--wine`     | `#6B2530`   | Burgundy — titles, accents       |
| `--saffron`  | `#CDA559`   | Recipe numbers, quantities, rules|
| `--fire`     | `#AA4A30`   | Hover states, drop caps          |
| `--muted`    | `#6E5F58`   | Secondary text                   |
| `--olive`    | `#74765A`   | Labels, pill separators          |

Fonts: **Instrument Serif** (all italic/editorial moments) + **Manrope** (all utility text).

---

*Crossroads — a vegetarian fusion series.*
