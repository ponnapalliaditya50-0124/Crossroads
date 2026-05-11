/* ============================================================
   CROSSROADS — data/volumes.js
   ============================================================
   This is the ONLY file you edit to publish new content.
   index.html loads this file and renders everything from it.
   No build step. No backend. Just edit, commit, and deploy.

   ── WEEKLY PUBLISHING WORKFLOW ──────────────────────────────
   1. Open this file (data/volumes.js).
   2. Find the volume you're publishing (search for "num: X").
   3. Set  released: true  on that volume.
   4. Add your recipe objects to its  recipes: []  array.
   5. Save → commit to GitHub → Netlify/Vercel auto-deploys.
   Typical turnaround from save to live: ~30 seconds.

   ── LOCKING / SCHEDULING ────────────────────────────────────
   released: false  = padlock shown, releaseDate shown, not clickable.
   released: true   = card is open. If recipes: [] is empty, the
                      volume cover shows "Recipes arriving [date]"
                      so you can tease upcoming content before
                      the recipes are ready.

   ── FILE STRUCTURE ──────────────────────────────────────────
   crossroads/
   ├── index.html          ← Never edit for content changes
   ├── data/
   │   └── volumes.js      ← Edit this every week ✓
   ├── assets/
   │   ├── images/         ← Drop recipe photos here
   │   └── icons/          ← SVG icons if needed
   └── README.md

   ============================================================
   VOLUME OBJECT — FULL SCHEMA
   ============================================================

   {
     num         : Number   1-based. Renders as Eastern Arabic numeral.
                            Do not skip or reuse numbers.

     released    : Boolean  true  → card clickable, recipes visible.
                            false → locked card with releaseDate shown.

     releaseDate : String   Shown on locked cards. Format: "Jan 5"
                            No year needed.

     title       : String   First line of the volume title (plain text).

     titleEm     : String   Second line, rendered italic + wine color.

     theme       : String   One-sentence mood / description shown on the
                            homepage card and volume cover page.

     occasion    : String   Short label for card folio + TOC footer.
                            "New Year" | "Valentine's Day" | "Cinco de Mayo" etc.

     cuisines    : Array    Cuisine strings for homepage pill tags.
                            List all cuisines in the volume; the UI slices
                            to 3 for the card pills. 3-5 strings recommended.

     recipes     : Array    Array of recipe objects. See recipe schema below.
                            Empty array [] is valid — shows a coming-soon cover.
   }

   ============================================================
   RECIPE OBJECT — FULL SCHEMA
   ============================================================
   A full volume has exactly 5 recipes, in this order:
     index 0 → Appetizer
     index 1 → Non-Alcoholic drink
     index 2 → Cocktail
     index 3 → Main
     index 4 → Dessert

   You can publish them one at a time — add them week by week.
   The TOC and chapter dividers auto-render from whatever is present.

   {
     id          : String   Unique ID across all volumes and recipes.
                            Convention: "v{volNum}r{recipeIndex}"
                            Examples: "v2r1", "v2r2", "v15r3"
                            MUST be globally unique — never duplicate.

     course      : String   Short course label for the folio bar and TOC.
                            Recommended values (keep consistent):
                            "Appetizer" | "Non-Alcoholic" | "Cocktail"
                            "Main" | "Dessert"

     courseSub   : String   Longer sub-label in the folio bar.
                            "Starters & Snacks" | "Drinks" | "Mains & Hearths"
                            "Sweets & Endings"

     title       : String   Main title, plain text.
                            Example: "Masala Arancini"

     titleEm     : String   Italic wine-colored second part of the title.
                            Example: "with Cilantro-Mint Chutney"

     cuisines    : Array    2-3 cuisine strings for this recipe's pill badges.
                            Example: ['Italian', 'Indian']

     deck        : String   1-2 sentence description. The first letter gets
                            an automatic drop-cap. Keep under ~200 characters.
                            Plain text only (no HTML tags).

     ph          : String   CSS class for the placeholder photo gradient.
                            "ph1" amber/rust/navy  — warm, food-forward
                            "ph2" warm brown        — earthy
                            "ph3" golden/dark-red   — drinks / cocktails
                            "ph4" orange/charcoal   — mains
                            "ph5" olive/warm-gold   — desserts
                            ─────────────────────────────────────────────
                            To use a real photo instead of a gradient:
                            1. Add your image to /assets/images/
                               e.g. v2r1-tom-yum-burrata.jpg
                            2. In index.html <style>, add:
                               .ph-v2r1 {
                                 background-image: url('/assets/images/v2r1-tom-yum-burrata.jpg');
                                 background-size: cover;
                                 background-position: center;
                               }
                            3. Set this field to: 'ph-v2r1'

     stats       : Array    4 stat blocks in the stats bar below the photo.
                            Each item: { l: "Label string", v: "Value string" }
                            Value can include <em>...</em> for italic wine styling.
                            Examples:
                              { l: 'Serves', v: '<em>4–6</em>' }
                              { l: 'Active', v: '<em>25</em> min' }
                              { l: 'Total',  v: '<em>1 hr 10</em>' }
                              { l: 'Ahead',  v: '<em>3</em> days' }
                            Aim for exactly 4. Use whatever labels suit the recipe:
                            Serves / Active / Total / Chill / Ahead / Heat /
                            Makes / Batch / Yield / Glass

     ings        : Array    Ingredient groups.
                            Each group object:
                            {
                              sub   : String  Section heading.
                                              E.g. "For the dough", "To serve"
                              items : Array   Each item is a 2-element array:
                                              [ "quantity string", "ingredient name" ]
                                              Examples:
                                              ["240 g",   "cooked chickpeas, very dry"]
                                              ["1 tbsp",  "kosher salt"]
                                              ["2 stalks","lemongrass, bruised"]
                                              ["—",       "lime wedges, to serve"]
                            }

     steps       : Array    Method steps shown in the recipe card AND cook mode.
                            Each step object:
                            {
                              t   : String        Step HTML. Wrap the action title
                                                  in <strong>...</strong> tags.
                                                  Example:
                                                  '<strong>Toast the rice.</strong>
                                                   Add arborio and stir constantly
                                                   for 2 minutes until glossy.'
                              sec : Number|null   Countdown timer in seconds.
                                                  Shown as a live timer in cook mode.
                                                  null = no timer for this step.
                                                  Common values:
                                                  60   = 1 min     180  = 3 min
                                                  300  = 5 min     600  = 10 min
                                                  900  = 15 min    1200 = 20 min
                                                  1800 = 30 min
                            }

     note        : String   Cook's Note. Shown below the recipe body in a
                            saffron-ruled panel with italic burgundy label.
                            Plain text only (no HTML). 2–4 sentences.
                            Cover ONE of: key technique, fusion bridge story,
                            make-ahead tip, or substitution guidance.
   }

   ============================================================
   EXAMPLE — Adding Volume 2, Recipe 1 (Appetizer)
   ============================================================

   Find the Volume 2 object below and update it like this:

   {
     num: 2, released: true, releaseDate: 'Jan 19',
     title: 'Slow Sunday', titleEm: 'Warmth',
     ...
     recipes: [
       {
         id: 'v2r1',
         course: 'Appetizer',
         courseSub: 'Starters & Snacks',
         title: 'Tom Yum',
         titleEm: 'Burrata',
         cuisines: ['Thai', 'Italian'],
         deck: 'Creamy burrata meets the sharp herbal perfume of tom yum — lemongrass, kaffir lime, and galangal-infused oil pooled over torn mozzarella on toasted ciabatta.',
         ph: 'ph1',
         stats: [
           { l: 'Serves', v: '<em>4</em>' },
           { l: 'Active', v: '<em>20</em> min' },
           { l: 'Total',  v: '<em>30</em> min' },
           { l: 'Ahead',  v: '<em>1</em> day' }
         ],
         ings: [
           {
             sub: 'Tom yum oil',
             items: [
               ['3 tbsp',   'neutral oil'],
               ['2 stalks', 'lemongrass, bruised and sliced'],
               ['4 leaves', 'kaffir lime leaves, torn'],
               ['2 slices', 'galangal or fresh ginger'],
               ['1',        'Thai bird chili, halved'],
               ['½ tsp',    'kosher salt']
             ]
           },
           {
             sub: 'To plate',
             items: [
               ['2 balls', 'fresh burrata (about 250 g total)'],
               ['4 slices','thick ciabatta, toasted'],
               ['—',       'flaky sea salt'],
               ['—',       'fresh Thai basil leaves']
             ]
           }
         ],
         steps: [
           { t: '<strong>Infuse the oil.</strong> Combine neutral oil, lemongrass, kaffir lime leaves, galangal, and chili in a small saucepan. Warm over medium-low until the oil just begins to sizzle around the aromatics, then reduce to the lowest heat and infuse 15 minutes.', sec: 900 },
           { t: '<strong>Strain.</strong> Pour through a fine-mesh sieve into a bowl. Discard the solids. The oil should be fragrant and pale yellow-green. Taste — it should be herbaceous, citrusy, and gently hot.', sec: null },
           { t: '<strong>Toast the ciabatta.</strong> Brush slices with a little neutral oil and toast in a skillet or under the broiler until golden and crisp at the edges.', sec: null },
           { t: '<strong>Plate.</strong> Tear each burrata ball over two toasts. Spoon the warm tom yum oil generously over the cheese. Finish with flaky salt and fresh Thai basil. Serve immediately while the cheese is still cold and the oil is warm.', sec: null }
         ],
         note: 'The tom yum oil keeps refrigerated for up to 1 week — rewarm gently before using. The key is low heat during the infusion; high heat turns the lemongrass bitter and dulls the kaffir lime.'
       }
       // Add recipes 2–5 in subsequent weeks:
       // v2r2 Non-Alcoholic, v2r3 Cocktail, v2r4 Main, v2r5 Dessert
     ]
   }

   ============================================================ */


/* ── Volume 1: PUBLISHED — all 5 recipes live ────────────── */
const VOLS = [
  {
    num: 1,
    released: true,
    releaseDate: 'Jan 5',
    title: 'New Year,',
    titleEm: 'New Table',
    theme: 'Bright, fresh, and optimistic — a clean start after the holidays',
    occasion: 'New Year',
    cuisines: ['Thai', 'Mediterranean', 'Indian', 'Mexican', 'Italian'],
    recipes: [
      {
        id: 'v1r1',
        course: 'Appetizer',
        courseSub: 'Starters & Snacks',
        title: 'Lemongrass Hummus',
        titleEm: 'with Crispy Chickpeas',
        cuisines: ['Thai', 'Mediterranean'],
        deck: 'Silky hummus gets a Thai lift from lemongrass, lime, ginger, and coconut milk, then returns to the Mediterranean table with tahini, cumin, and a crown of chili-cumin crispy chickpeas.',
        ph: 'ph1',
        stats: [
          { l: 'Serves', v: '<em>6–8</em>' },
          { l: 'Active', v: '<em>25</em> min' },
          { l: 'Total',  v: '<em>45</em> min' },
          { l: 'Ahead',  v: '<em>3</em> days' }
        ],
        ings: [
          {
            sub: 'Crispy chickpeas',
            items: [
              ['240 g',   'cooked chickpeas, very dry'],
              ['1½ tbsp', 'olive oil'],
              ['¾ tsp',   'ground cumin'],
              ['½ tsp',   'Kashmiri chili powder'],
              ['½ tsp',   'kosher salt'],
              ['¼ tsp',   'lime zest']
            ]
          },
          {
            sub: 'Lemongrass hummus',
            items: [
              ['2 stalks', 'lemongrass, tender core only'],
              ['3 tbsp',   'lime juice + 1 tbsp lemon juice'],
              ['1 clove',  'garlic'],
              ['1 tsp',    'ginger, grated'],
              ['480 g',    'cooked chickpeas'],
              ['75 g',     'tahini'],
              ['60 ml',    'full-fat coconut milk'],
              ['45 ml',    'extra-virgin olive oil'],
              ['1 tsp',    'ground cumin'],
              ['¾ tsp',    'kosher salt']
            ]
          },
          {
            sub: 'To serve',
            items: [
              ['—', 'warm pita or pita chips'],
              ['—', 'cilantro, mint, sesame seeds'],
              ['—', 'sliced Thai chili, lime wedges']
            ]
          }
        ],
        steps: [
          { t: '<strong>Bake the crispy chickpeas.</strong> Heat oven to 210°C (425°F). Toss very dry chickpeas with olive oil, cumin, Kashmiri chili powder, and salt on a sheet pan. Roast 22–28 min, shaking once, until deeply golden. Sprinkle lime zest while hot.', sec: 1500 },
          { t: '<strong>Prep the lemongrass.</strong> Peel away the tough outer layers to reach the pale tender core. Thinly slice only the bottom 10–12 cm, then mince very finely — about 2 tablespoons.', sec: null },
          { t: '<strong>Make the lemongrass paste.</strong> In a mini food processor, blend the lemongrass, lime juice, lemon juice, garlic, and ginger until as smooth as possible. Add 1 tbsp coconut milk to help the blades catch.', sec: null },
          { t: '<strong>Process the hummus.</strong> In a food processor, combine chickpeas, tahini, lemongrass paste, coconut milk, olive oil, cumin, and salt. Process 1 minute, then scrape the bowl.', sec: 60 },
          { t: '<strong>Blend until silky.</strong> With the machine running, drizzle in 2 tbsp ice water. Continue 2–3 minutes, adding more water 1 tbsp at a time, until very smooth, pale, and spoonable.', sec: 180 },
          { t: '<strong>Rest and adjust.</strong> Let the hummus sit 10 minutes so the lemongrass settles. Taste and adjust with more salt, lime, or lemon juice.', sec: 600 },
          { t: '<strong>Plate and serve.</strong> Swoosh into a shallow bowl, drizzle with olive oil. Pile on crispy chickpeas, scatter cilantro, mint, chili, sesame seeds, and a squeeze of lime. Serve with warm pita.', sec: null }
        ],
        note: 'Use only the tender inner core of the lemongrass — the outer layers stay fibrous regardless. Lemongrass and lime bring the Thai side through aroma, not heat. Coconut milk softens the tahini without turning the dip sweet or soupy.'
      },
      {
        id: 'v1r2',
        course: 'Non-Alcoholic',
        courseSub: 'Drinks',
        title: 'Tamarind-Mint',
        titleEm: 'Cooler',
        cuisines: ['Indian', 'Mexican'],
        deck: 'Tangy tamarind, fresh mint, lime, roasted cumin, and jaggery shake into a cooler that lands between Indian imli pani and a Mexican agua fresca — sweet-sour, gently salty, built for lots of ice.',
        ph: 'ph2',
        stats: [
          { l: 'Serves', v: '<em>4–6</em>' },
          { l: 'Active', v: '<em>15</em> min' },
          { l: 'Total',  v: '<em>20</em> min' },
          { l: 'Ahead',  v: '<em>2</em> days' }
        ],
        ings: [
          {
            sub: 'Tamarind-mint base',
            items: [
              ['720 ml', 'cold water, divided'],
              ['90 g',   'tamarind concentrate'],
              ['55 g',   'jaggery or brown sugar'],
              ['2 tbsp', 'lime juice + zest'],
              ['¾ tsp',  'roasted ground cumin'],
              ['½ tsp',  'kosher salt'],
              ['¼ tsp',  'chaat masala, optional'],
              ['1 cup',  'fresh mint leaves'],
              ['½ cup',  'cilantro, tender stems'],
              ['1',      'serrano, seeded (optional)']
            ]
          },
          {
            sub: 'To serve',
            items: [
              ['480 ml', 'cold sparkling or still water'],
              ['—',      'ice and lime wedges'],
              ['—',      'fresh mint leaves'],
              ['½ tsp',  'Tajín or flaky salt for rim']
            ]
          }
        ],
        steps: [
          { t: '<strong>Dissolve the base.</strong> Combine 240 ml water, tamarind concentrate, jaggery, lime juice and zest, roasted cumin, salt, and chaat masala in a small saucepan. Warm over medium-low 2–3 min, stirring, until sugar dissolves. Do not boil.', sec: 180 },
          { t: '<strong>Cool slightly.</strong> Pour into a blender with the remaining 480 ml cold water. Wait 5 minutes so the herbs stay bright when blended.', sec: 300 },
          { t: '<strong>Blend with herbs.</strong> Add mint, cilantro, and serrano if using. Blend until very smooth and green-flecked, 30–45 seconds.', sec: 45 },
          { t: '<strong>Strain and season.</strong> Strain through a fine-mesh sieve into a pitcher. Adjust with lime, sugar, salt, or cold water — it should be tart, sweet, and slightly concentrated.', sec: null },
          { t: '<strong>Chill.</strong> Refrigerate at least 30 minutes until very cold. Stir before serving — tamarind settles.', sec: 1800 },
          { t: '<strong>Serve.</strong> Stir cold sparkling water into the pitcher just before pouring. Fill ice-packed glasses, garnish with mint and a lime wedge.', sec: null }
        ],
        note: 'Add sparkling water only right before serving so the bubbles stay lively. Taste cold, over ice — balance shifts with temperature. For a stronger drink, use 360 ml sparkling; for a lighter cooler, use the full 480 ml.'
      },
      {
        id: 'v1r3',
        course: 'Cocktail',
        courseSub: 'Drinks',
        title: 'Lemongrass-Lime',
        titleEm: 'Mojito',
        cuisines: ['Thai', 'Mexican'],
        deck: 'Fresh mint, white rum, lime, and soda keep the mojito familiar and crisp, while a quick lemongrass syrup pulls it toward Thai limeade territory — cold, aromatic, and citrus-bright.',
        ph: 'ph3',
        stats: [
          { l: 'Makes', v: '<em>1</em> cocktail' },
          { l: 'Syrup', v: '<em>1 week</em>' },
          { l: 'Active', v: '<em>15</em> min' },
          { l: 'Batch',  v: 'serves <em>6</em>' }
        ],
        ings: [
          {
            sub: 'Lemongrass syrup (6 drinks)',
            items: [
              ['120 ml',   'water'],
              ['100 g',    'granulated sugar'],
              ['2 stalks', 'lemongrass, bruised and sliced'],
              ['1 tsp',    'lime zest'],
              ['⅛ tsp',    'kosher salt']
            ]
          },
          {
            sub: 'Per cocktail',
            items: [
              ['8',         'fresh mint leaves'],
              ['2',         'lime wedges'],
              ['30 ml',     'lemongrass syrup, chilled'],
              ['22 ml',     'fresh lime juice'],
              ['60 ml',     'white rum'],
              ['—',         'crushed ice'],
              ['90–120 ml', 'cold club soda']
            ]
          }
        ],
        steps: [
          { t: '<strong>Make the lemongrass syrup.</strong> Combine water, sugar, sliced bruised lemongrass, lime zest, and salt in a small saucepan. Warm over medium, stirring, until sugar dissolves and syrup just steams, 3–4 minutes.', sec: 240 },
          { t: '<strong>Steep.</strong> Remove from heat, cover, steep 15 minutes. The syrup should smell citrusy and herbal, not cooked or woody.', sec: 900 },
          { t: '<strong>Strain and chill.</strong> Strain through a fine-mesh sieve into a jar, pressing the lemongrass lightly. Refrigerate at least 30 minutes, or chill in an ice bath.', sec: 1800 },
          { t: '<strong>Optional rim.</strong> Rub the rim of a highball glass with a lime wedge and dip lightly into a sugar-salt mixture. Keep it delicate.', sec: null },
          { t: '<strong>Muddle.</strong> In the glass, combine mint leaves, 2 lime wedges, and chilled lemongrass syrup. Muddle gently 5–6 times — bruise the mint, do not shred it.', sec: null },
          { t: '<strong>Build.</strong> Add lime juice and rum. Stir 5 seconds. Fill with crushed ice, top with 90–120 ml club soda, stir once gently from the bottom.', sec: null },
          { t: '<strong>Serve.</strong> Garnish with a lime wheel, mint sprig, and a lemongrass stalk. Serve immediately while the mint is bright and the bubbles are lively.', sec: null }
        ],
        note: 'Mojito should land bright, cool, and lightly sweet. If your limes are sharp, use the full 30 ml syrup. Batch for 6: combine ¾ cup syrup, 9 tbsp lime juice, and 1½ cups white rum; muddle fresh mint and lime in each glass, top with ice and soda.'
      },
      {
        id: 'v1r4',
        course: 'Main',
        courseSub: 'Mains & Hearths',
        title: 'Thai Green Curry',
        titleEm: 'Risotto with Crispy Tofu',
        cuisines: ['Thai', 'Italian'],
        deck: 'Coconut-lemongrass risotto built like an Italian classic, scented like a Thai green curry — arborio stirred with curry paste, coconut milk, lime, and Thai basil, crowned with golden crispy tofu and fried shallots.',
        ph: 'ph4',
        stats: [
          { l: 'Serves', v: '<em>4</em>' },
          { l: 'Active', v: '<em>45</em> min' },
          { l: 'Total',  v: '<em>1 hr 10</em>' },
          { l: 'Heat',   v: '<em>Medium</em>' }
        ],
        ings: [
          {
            sub: 'Crispy tofu',
            items: [
              ['400 g',        'extra-firm tofu, pressed and cubed'],
              ['1 tbsp',       'soy sauce + 1 tbsp lime juice'],
              ['1 tsp',        'sesame oil + 1 tsp maple syrup'],
              ['1 small clove','garlic, grated'],
              ['2 tsp',        'cornstarch'],
              ['2 tbsp',       'neutral oil']
            ]
          },
          {
            sub: 'Risotto base',
            items: [
              ['1 liter',              'low-sodium vegetable stock'],
              ['400 ml',               'full-fat coconut milk, divided'],
              ['2 stalks',             'lemongrass, tender core, minced'],
              ['2 tbsp',               'butter + 1 tbsp neutral oil'],
              ['1 shallot + 3 cloves', 'garlic, finely diced / minced'],
              ['1 tbsp',               'fresh ginger, grated'],
              ['2–3 tbsp',             'vegetarian Thai green curry paste'],
              ['300 g',                'arborio rice'],
              ['120 ml',               'dry white wine']
            ]
          },
          {
            sub: 'To finish',
            items: [
              ['60 g',  'vegetarian parmesan-style cheese'],
              ['1 tbsp','butter + lime juice + lime zest'],
              ['½ cup', 'Thai basil, torn'],
              ['¼ cup', 'cilantro leaves'],
              ['½ cup', 'crispy fried shallots'],
              ['1 tbsp','toasted sesame seeds']
            ]
          }
        ],
        steps: [
          { t: '<strong>Marinate the tofu.</strong> Pat cubed tofu very dry. Whisk soy sauce, lime juice, sesame oil, maple syrup, and grated garlic. Toss tofu and let sit 15 minutes (or refrigerate up to 24 hours).', sec: 900 },
          { t: '<strong>Warm the coconut stock.</strong> Combine vegetable stock, 300 ml coconut milk, and minced lemongrass in a saucepan. Bring to a gentle simmer, reduce to low, keep warm. Reserve the remaining 100 ml coconut milk.', sec: null },
          { t: '<strong>Crisp the tofu.</strong> Toss marinated tofu with 2 tsp cornstarch. Heat 2 tbsp oil in a large skillet over medium-high. Cook tofu in a single layer, turning every 2 minutes, 8–10 minutes until golden on most sides. Set aside.', sec: 600 },
          { t: '<strong>Start the risotto.</strong> Melt butter with oil in a wide heavy pot over medium. Add shallot; cook 3–4 min until translucent. Add garlic and ginger; cook 1 minute more.', sec: 240 },
          { t: '<strong>Bloom the curry paste.</strong> Stir in green curry paste; cook until glossy and fragrant, about 1 minute. Add arborio rice; stir constantly 2 minutes until every grain is slicked with curry butter.', sec: 120 },
          { t: '<strong>Deglaze with wine.</strong> Pour in white wine; stir until almost fully absorbed, 1–2 minutes.', sec: 120 },
          { t: '<strong>Cook the risotto.</strong> Add warm coconut stock one ladle at a time, stirring often, letting each addition mostly absorb before adding the next. Continue 18–22 minutes until the rice is al dente and the texture is loose and creamy.', sec: 1200 },
          { t: '<strong>Enrich.</strong> Stir in salt, soy sauce, a pinch of brown sugar, and the reserved 100 ml coconut milk. Cook 1–2 minutes more. The risotto should flow slowly when you drag a spoon through it.', sec: 90 },
          { t: '<strong>Finish off heat.</strong> Remove from heat. Stir in parmesan-style cheese, butter, lime juice, lime zest, Thai basil, and cilantro. Taste; adjust with more salt or lime.', sec: null },
          { t: '<strong>Serve immediately.</strong> Spoon into warm shallow bowls. Top with crispy tofu, fried shallots, toasted sesame seeds, and sliced chili. Serve with lime wedges.', sec: null }
        ],
        note: 'Risotto should move — when spooned into a bowl it settles into a soft wave, not a mound. Coconut milk thickens as it sits; finish slightly looser than you think. Look for a vegetarian Thai green curry paste — many traditional versions contain shrimp paste.'
      },
      {
        id: 'v1r5',
        course: 'Dessert',
        courseSub: 'Sweets & Endings',
        title: 'Cardamom-Pistachio',
        titleEm: 'Tiramisu',
        cuisines: ['Italian', 'Indian'],
        deck: 'Classic tiramisu gets a mithai-shop glow — ladyfingers dipped in cardamom-scented coffee, layered with egg-free mascarpone-pistachio cream, finished with cocoa, toasted pistachios, and an optional trace of rose.',
        ph: 'ph5',
        stats: [
          { l: 'Serves', v: '<em>8–10</em>' },
          { l: 'Active', v: '<em>45</em> min' },
          { l: 'Chill',  v: '<em>8+</em> hrs' },
          { l: 'Ahead',  v: '<em>2</em> days' }
        ],
        ings: [
          {
            sub: 'Cardamom-coffee soak',
            items: [
              ['300 ml', 'strong espresso or coffee, hot'],
              ['50 g',   'sugar'],
              ['6',      'green cardamom pods, crushed'],
              ['1 pinch','kosher salt'],
              ['1 tbsp', 'rose water (optional)']
            ]
          },
          {
            sub: 'Pistachio-mascarpone cream',
            items: [
              ['225 g', 'mascarpone, cold'],
              ['240 ml','cold heavy cream'],
              ['115 g', 'plain whole-milk Greek yogurt'],
              ['75 g',  'unsweetened pistachio paste'],
              ['65 g',  'powdered sugar'],
              ['½ tsp', 'ground cardamom + 1 tsp vanilla']
            ]
          },
          {
            sub: 'Assembly & finishing',
            items: [
              ['220–250 g', 'crisp savoiardi / ladyfingers (~24)'],
              ['25 g',      'unsweetened cocoa powder'],
              ['50 g',      'pistachios, toasted and chopped'],
              ['—',         'dried rose petals (optional)']
            ]
          }
        ],
        steps: [
          { t: '<strong>Steep the coffee soak.</strong> Combine hot espresso, sugar, crushed cardamom pods, and salt. Stir until sugar dissolves, then steep 15 minutes so cardamom perfumes the coffee.', sec: 900 },
          { t: '<strong>Strain and cool.</strong> Remove cardamom pods. Stir in rose water if using. Cool to room temperature — do not dip savoiardi in hot coffee or they will collapse.', sec: null },
          { t: '<strong>Make the cream base.</strong> Whisk cold mascarpone, Greek yogurt, pistachio paste, powdered sugar, vanilla, ground cardamom, and salt until smooth and pale green. Scrape the bowl well.', sec: null },
          { t: '<strong>Whip the cream.</strong> In a separate bowl, whip cold heavy cream to medium peaks — it should hold soft lines but still look plush, not stiff or grainy.', sec: null },
          { t: '<strong>Fold together.</strong> Stir one-third of the whipped cream into the mascarpone mixture to loosen. Fold in the remaining cream gently until airy and evenly green.', sec: null },
          { t: '<strong>Anchor the dish.</strong> Spread a thin spoonful of cream across the bottom of a 20×20 cm dish to hold the first layer.', sec: null },
          { t: '<strong>First layer.</strong> Dip half the savoiardi quickly in the cooled soak, about 1 second per side. Arrange snugly. Spread half the cream over the top; dust with cocoa; scatter half the pistachios.', sec: null },
          { t: '<strong>Second layer.</strong> Dip remaining savoiardi in the soak, layer over the cream. Spread remaining cream in an even layer.', sec: null },
          { t: '<strong>Chill.</strong> Cover and refrigerate at least 8 hours or up to 2 days. The savoiardi need time to absorb the coffee and soften into sliceable layers.', sec: null },
          { t: '<strong>Finish and serve.</strong> Dust with remaining cocoa. Scatter with pistachios, rose petals, and a pinch of ground cardamom if you want the aroma more pronounced.', sec: null }
        ],
        note: 'Mascarpone brings body, whipped cream brings air, Greek yogurt brings tang, and pistachio paste adds flavor and structure — the result slices cleanly without a custard. Use crisp savoiardi, not soft sponge-cake ladyfingers; dryness is what lets them absorb the soak without collapsing.'
      }
    ]
  },

  /* ── Volumes 2–26: future issues — add recipes weekly ────── */
  { num:2, released:true,  releaseDate:'Jan 19', title:'Slow Sunday',    titleEm:'Warmth',      theme:'Cozy, layered flavors for cold January weekends',                    occasion:'Midwinter',              cuisines:['Indian','Italian','Mexican','Thai'],               recipes:[] },
  { num:3, released:true,  releaseDate:'Feb 2',  title:'Love at the',   titleEm:'Crossroads',  theme:"Romantic and indulgent — elegant enough for Valentine's Day",       occasion:"Valentine's Day",        cuisines:['Italian','Indian','Middle Eastern','French'],      recipes:[] },
  { num:4, released:true,  releaseDate:'Feb 16', title:'Smoke',         titleEm:'& Simmer',    theme:'Bold warming spice blends for the last stretch of winter',           occasion:'Late Winter',            cuisines:['North African','Mexican','Indian','Italian'],      recipes:[] },
  { num:5, released:true,  releaseDate:'Mar 2',  title:'First Green',   titleEm:'Things',      theme:'Spring herbs and bright flavors as the season turns',                occasion:'Early Spring',           cuisines:['Indian','Italian','Thai','Japanese'],              recipes:[] },
  { num:6, released:true,  releaseDate:'Mar 16', title:'The Persian',   titleEm:'Garden',      theme:'Florals, saffron, and citrus — inspired by Nowruz',                  occasion:'Nowruz / Spring Equinox',cuisines:['Persian','Middle Eastern','Mexican','Indian'],     recipes:[] },
  { num:7, released:true,  releaseDate:'Mar 30', title:'Spring',        titleEm:'Fling',       theme:'Light, crunchy, and playful — a menu that feels like a Sunday market',occasion:'Spring',                cuisines:['Indian','Mexican','Korean','Italian'],             recipes:[] },
  { num:8, released:true,  releaseDate:'Apr 13', title:'Earth',         titleEm:'& Green',     theme:'Earthy vegetables and umami-forward pairings for spring',            occasion:'Earth Day Season',       cuisines:['Middle Eastern','Indian','Japanese','Italian'],    recipes:[] },
  { num:9, released:true,  releaseDate:'Apr 27', title:'Fiesta',        titleEm:'at Dusk',     theme:'Festive and vibrant — a Cinco de Mayo week celebration',             occasion:'Cinco de Mayo',          cuisines:['Indian','Mexican','Middle Eastern'],               recipes:[] },
  { num:10,released:true,  releaseDate:'May 11', title:'Long Afternoon',titleEm:'Light',       theme:'Bright and breezy — for lingering late spring meals outdoors',       occasion:'Late Spring',            cuisines:['Greek','Italian','Vietnamese','Thai'],             recipes:[] },
  { num:11,released:true,  releaseDate:'May 25', title:'The Grill',     titleEm:'Adjacent',    theme:'Bold smoky flavors for Memorial Day weekend',                        occasion:'Memorial Day',           cuisines:['Indian','Mexican','Italian','Argentinian'],        recipes:[] },
  { num:12,released:true,  releaseDate:'Jun 8',  title:'Rooftop',       titleEm:'Hours',       theme:'Cool, light, and refreshing — perfect for summer evenings',          occasion:'Early Summer',           cuisines:['Mexican','Italian','Indian','Filipino'],           recipes:[] },
  { num:13,released:true,  releaseDate:'Jun 22', title:'Midsummer',     titleEm:'Night',       theme:'Warm nights, tropical notes, and a festive summer spirit',           occasion:'Summer Solstice',        cuisines:['Indian','Thai','Mexican','Filipino'],              recipes:[] },
  { num:14,released:true,  releaseDate:'Jul 6',  title:'Red, White',    titleEm:'& Global',    theme:'A patriotic party palette remixed with global flair',                occasion:'4th of July',            cuisines:['Thai','Mexican','Indian','Cajun'],                 recipes:[] },
  { num:15,released:true,  releaseDate:'Jul 20', title:'Peak Summer',   titleEm:'Heat',        theme:'Maximum summer — bright acid, chili heat, cold drinks',              occasion:'Mid Summer',             cuisines:['Thai','Mexican','Indian','Korean'],                recipes:[] },
  { num:16,released:true,  releaseDate:'Aug 3',  title:'Late Summer',   titleEm:'Abundance',   theme:'Celebrating peak produce — tomatoes, corn, stone fruit',             occasion:'Late Summer',            cuisines:['Italian','Indian','Thai','Mexican'],               recipes:[] },
  { num:17,released:true,  releaseDate:'Aug 17', title:'Back-to-School',titleEm:'Sundays',     theme:'Comforting, crowd-pleasing, and easy to share',                      occasion:'Back to School',         cuisines:['Indian','Thai','Japanese'],                        recipes:[] },
  { num:18,released:true,  releaseDate:'Aug 31', title:'Golden',        titleEm:'Hour',        theme:'The amber warmth of September — harvest flavors arriving',           occasion:'Labor Day',              cuisines:['Italian','Indian','Moroccan','British'],           recipes:[] },
  { num:19,released:true,  releaseDate:'Sep 14', title:'Harvest',       titleEm:'Table',       theme:'Autumn spices, root vegetables, and warming lentils',                occasion:'Mid Fall',               cuisines:['Indian','Greek','Mexican','Moroccan'],             recipes:[] },
  { num:20,released:true,  releaseDate:'Sep 28', title:'Spiced',        titleEm:'& Candlelit', theme:'Cozy evenings with deep spice blends and slow-cooked warmth',        occasion:'Fall Equinox',           cuisines:['Indian','Italian','Middle Eastern'],               recipes:[] },
  { num:21,released:true,  releaseDate:'Oct 12', title:'Trick',         titleEm:'or Treat',    theme:'Fun, dramatic, and a little spooky — for Halloween entertaining',    occasion:'Halloween',              cuisines:['Indian','Mexican','Thai','Middle Eastern'],        recipes:[] },
  { num:22,released:true,  releaseDate:'Oct 26', title:'Autumn',        titleEm:'Richness',    theme:'Nutty, warming, and deeply satisfying — peak fall comfort',          occasion:'Late Fall',              cuisines:['Mexican','Japanese','Indian','American'],          recipes:[] },
  { num:23,released:true,  releaseDate:'Nov 9',  title:'Gratitude',     titleEm:'Feast',       theme:'A global take on the abundance of Thanksgiving week',                occasion:'Thanksgiving',           cuisines:['Indian','Mexican','Middle Eastern'],               recipes:[] },
  { num:24,released:true,  releaseDate:'Nov 23', title:'Holiday',       titleEm:'Prelude',     theme:'Rich and celebratory — the December entertaining season begins',     occasion:'Holiday Season Opener',  cuisines:['Indian','Italian','Middle Eastern','Persian'],     recipes:[] },
  { num:25,released:true,  releaseDate:'Dec 7',  title:'Solstice',      titleEm:'Gathering',   theme:'Festive, warming, and suited for holiday parties',                   occasion:'Winter Solstice',        cuisines:['Indian','Mexican','Italian','Japanese'],           recipes:[] },
  { num:26,released:true,  releaseDate:'Dec 21', title:"Year's End",    titleEm:'Indulgence',  theme:'Luxurious and celebratory — close out the year in style',            occasion:"Christmas / New Year's Eve",cuisines:['Greek','Italian','Indian','Middle Eastern'],    recipes:[] }
];
