# Result Page — Block Redesign (draft, 2026-08-13)

Working draft of the new result-page block structure: catchy unlock/teaser titles
plus short synthesized content, designed to make people want to pay to read more.
Drafted collaboratively, worked example throughout: **24.09.1973** (woman).

Status (updated 2026-08-13, later same day): **partially wired and live** — see
"Implementation status" below for exactly what's on the site now vs. still
planning-only. Do not re-enable the paywall for these (or any) modules until the
whole redesign is ready — `TEMP_UNLOCK_WIRED_MODULES` in
[src/app/[locale]/result/page.tsx](../src/app/[locale]/result/page.tsx) stays `true`
in the meantime; the new ancestral-programs/sexuality sections added this session
render unconditionally open (no lock UI at all), same policy.

## Final block numbering (confirmed 2026-08-17)

The user supplied a final, canonical 1-20 block list/naming pass. It **only
renames/renumbers/groups** the existing 25 concepts below — it does not change
any already-approved teaser titles or written content. Two groupings collapse
several old numbers under one parent block with lettered sub-items:

- **New block 14** ("Енергія роду") groups the old родові material (blocks
  14-17) *plus* a genuinely new sub-item, **14.1 Підтримка від предків**, which
  is `ancestralStrength` from `programs.ts` (the existing 1-number "підтримка
  роду" value) — confirmed by the user this is the same value, just newly given
  a numbered slot in this doc. It has no teaser title or content yet (see "Open
  follow-ups").
- **New block 17** ("Призначення") groups the old purpose blocks (20-22) — no
  new content, pure grouping.
- Blocks 1-13, 15, 16, 18-20 map 1:1 to the old numbers with renamed labels
  only (see "Old #" column in the table below and the mapping note at the top
  of "Full block content").
- Old blocks 5/6 keep their **same relative order** under new names (5 = karmic
  tail «Сімейні пристрасті» 8-5-15 → "Карма з минулого життя"; 6 = main-problem
  point 8 → "Ваш головний кармічний урок: точка особистого зростання") —
  explicitly confirmed, not swapped.

All narrative below (implementation status, per-block content) still refers to
blocks by their **old 1-25 numbers** where it predates this renumbering — use
the "Old #" column to translate. New work going forward should use the new 1-20
numbers.

## Implementation status

**Live now:**
- Blocks 1-13, 19-23's *titles* are just planning copy in this doc — not all of
  them have a real place in the code yet (see per-block notes in the table).
- The **13 originally-existing unlock items** (talents, spiritual-purpose,
  soul-tasks-before-40, money-blocks, ancestry, soul-lessons, past-life, purpose,
  money, money-after-40, relationships, parents-children, health) got their
  dictionary titles updated to the new copy in `uk.ts` and `ru.ts` (not `en.ts` yet
  — translate once approved, per the project's usual uk-first convention). Their
  underlying content is unchanged (existing per-arcana interpretation library).
- **Blocks 14-18 (родові programs + sexuality)** are now a real feature:
  `src/lib/programs.ts` (sorted-triple lookup + markdown loader),
  `src/content/programs/uk/{sortedTriple}.md` (5 files: the 4 ancestral corners +
  sexuality, content from this doc), `src/components/ProgramList.tsx` (renders
  name + plus/minus, or a "coming soon" note if a user's specific number combo
  has no written content yet), wired into
  `src/app/[locale]/result/page.tsx` as two new always-open sections. Verified
  live against `?d=24&m=9&y=1973` — all 4 ancestral names + sexuality name/content
  render correctly. **Only uk content exists** — ru/en show "coming soon" for
  everyone until translated.
- Removed (per explicit user request, out of scope for now): Compatibility and
  Child Matrix nav items/cards/tabs, and the "Learn the method" + "Free
  masterclass" promo blocks — across `AccountSidebar.tsx`,
  `FreeCalculateSection`'s cards, the `tabs` array, and `PromoBlocks`' items, all
  3 locales + `types.ts`. No child/couple calculator exists in the code (single
  birth-date only) — confirmed, not a gap to fix later, just correctly unbuilt.

**Full audit 2026-08-13 (user: "перевір усе"):** cross-checked every wired title
in `uk.ts`/`ru.ts` against this doc's block table, item by item. Found and fixed
2 more misses beyond the parents-children one: `unlockList.freeCharacterTitle`
and `unlockList.freeComfortTitle` (the two always-free blocks) had never been
touched at all — still showing their original pre-redesign text — even though
blocks 1 and 4's titles were designed and approved early in the session. Now
match blocks 1/4 exactly, confirmed live. Everything else checked out: blocks
without a live key (3, 7, 11, 13, 21, 23, 25) are correctly unwired (no dictionary
key represents them, nothing to fix); blocks 14-18's `ancestralPrograms`/
`sexualityProgram` dictionary text matches this doc's approved copy exactly.

**Live now (continued, 2026-08-13 later still):**
- **Block 12 (точка балансу)** is now a full new module: `balance-point`, added
  to `PERIPHERAL_MODULES` in `matrixContentMapping.ts` (maps to
  `matrix.channels.money.junction`, same value as `channels.love.junction`), 22
  arcana written from scratch at `src/content/interpretations/uk/balance-point/`
  (via background agent, verified: correct frontmatter, exactly 9 `##` sections
  per file, spot-checked for quality/theme fit — e.g. Пустельник's file centers
  on solitude-for-work vs. fear-of-loneliness-in-relationships). Title wired in
  `uk.ts`/`ru.ts`. Confirmed live on `?d=24&m=9&y=1973`.
- Corrected two title-mapping mistakes caught by the user: `parents-children`
  now uses the actual final block-19 title (was mistakenly using an intermediate
  draft phrase); `soul-lessons` now reuses block 6's exact approved title
  ("Ваша головна проблема з минулого життя") instead of an unapproved early-draft
  phrase; `soul-tasks-before-40` uses a minimal age-flavored derivation of that
  same approved phrase (no exact plan title existed for it); `ancestry` reverted
  to its original pre-session title rather than keep an unapproved invented one,
  since the plan's родові rework (blocks 14-17) superseded this key's concept
  rather than replacing its title 1:1.

**Still planning-only (no code yet):**
- Blocks 8, 9, 10, 11, 13 (money/love channel sub-points as individual cards) —
  the *existing* `money` and `relationships` modules already show all 3 of their
  channel's numbers stacked (entrance/energy/junction) under ONE bundled title
  each (now blocks 8's and 10's hooks respectively). Splitting them into
  separate cards would mostly **duplicate** already-visible content
  (money-blocks/money-career and relationship-problems/relationship-readiness
  already cover the energy point from other angles) — not pursuing further
  unless there's a concrete reason to prefer 6 small cards over 2 bundled ones.
- ~~Block 19 (дитячо-батьківська triple)~~ — **DONE 2026-08-13.** Turned out much
  simpler than first assessed: `TRIPLE_MODULES` doesn't need distinct content per
  stacked point (confirmed by re-reading how `past-life`/`relationships`/`money`
  actually render — they just show the *same* module's content 3× for 3
  different arcana numbers). Added `parents-children` to `TRIPLE_MODULES` with
  `[day, dayAxis[0], dayAxis[1]]`, reusing the already-existing 22
  `parents-children` files as-is — zero new content needed. Verified live on
  `?d=24&m=9&y=1973` (shows Закохані/Сонце/Смерть for 6/19/13).
- Block 24 (chakra deep-dive) — unchanged, still needs the other 5 chakras'
  source material before any code makes sense.

**Block 25 (age-period forecast) — formula fully reverse-engineered and
implemented 2026-08-13.** The methodology text + a second reference date
(29.06.2008, cross-checked against its own full table) confirmed: 8 "vertex"
points spaced 10 years apart cycling forever — `day(0), nw(10), month(20),
ne(30), year(40), se(50), karma(60), sw(70)`, then day again at 80, etc. Each
10-year span between two vertices subdivides via `buildFullAxis` (the *same*
function already used for the day/month/year/karma axes) applied symmetrically
from both ends toward a shared midpoint `S = reduce(val1 + val2)`. Verified
exactly against 3 independent decade-segments across the 2 reference dates (27
individual values, zero mismatches) before implementing.

Implemented in `src/lib/matrix.ts`: `calculateAgePeriods(birthDate, maxAge)`
(full table), `calculateFractionalAge`, `getCurrentAgePeriod` (which period
"today" falls into). New `AgePeriodsTable.tsx` component + `agePeriods` section
on the result page (always open), current period highlighted. Verified live on
`?d=24&m=9&y=1973` — table values match the reference exactly, current-period
highlight confirmed after fixing a reference-equality bug (`===` on freshly
computed objects never matches; fixed to compare `fromAge`/`toAge` by value).

**Page reordered to match the agreed 1-25 sequence (2026-08-13):** sections now
render in this order: free character(1)+comfort(4) → early items in canonical
order (talents=2, past-life=5, soul-lessons=6, energy-field=23, soul-tasks-
before-40=6b, money=8, money-after-40=8b, money-blocks=9, relationships=10,
balance-point=12, ancestry) → ancestral programs(14-17) → sexuality(18) → late
items (parents-children=19, purpose=20, spiritual-purpose=22) → any remaining
locked teaser cards → chakra deep-dive(24) → age periods(25) → pricing. Ordering
logic lives in `EARLY_BLOCK_KEYS`/`LATE_BLOCK_KEYS` in `result/page.tsx`, not in
the dictionary array itself (the dictionary array's own order is now mostly
cosmetic/unused for rendering order, since the page explicitly reorders via
these two key lists).

**Blocks 20/21/22 (Призначення) grouped into one dedicated section
(2026-08-13, user: "воно щось розкидане не зрозуміло"):** `purpose` and
`spiritual-purpose` used to be split apart by an unrelated `parents-children`
card between them, and block 21 (social purpose) had never been wired at all.
Added a new `social-purpose` peripheral module (`matrix.destinations.social.total`,
only arcana 14 content written so far) and a dedicated "Призначення" section
(`r.purposeSection`) in `result/page.tsx` rendering all three
(`purpose`/`social-purpose`/`spiritual-purpose`) together via
`PURPOSE_BLOCK_KEYS`, positioned right after the parents-children card, before
the chakra section. Verified live — all 3 titles render together under one
"Призначення" heading. **(This grouping is now also block 17 in the final
1-20 numbering above.)**

**`money-after-40` and `soul-tasks-before-40` removed entirely (2026-08-13,
user: "це баг"):** both modules resolve to the exact same matrix point as an
already-shown sibling (`money`/`soul-lessons` respectively) with no genuine
age-specific calculation behind the "before/after 40" framing — showing them as
separate cards implied a distinct 40-year-mark insight that doesn't actually
exist in the underlying math. Removed from `unlockList.items` (uk/ru) and from
`EARLY_BLOCK_KEYS` in `result/page.tsx`. Note: `purpose`'s "до 40 років" wording
is NOT the same issue — `destinations.personal/social/spiritual` are genuinely
different calculated values per life stage, not a relabeled duplicate — left
as-is.

**Also fixed same pass:** `result.chakraTitle` (the real chakra section's own
heading) was still the pre-redesign text ("Карта здоров'я по чакрах") — updated
to block 24's approved title. This made the "health" locked-teaser item in
`unlockList.items` an exact-text duplicate of the real section, so it was
removed from the array entirely (uk/ru) — the real chakra section now fully
represents block 24 on its own. Final order verified live by extracting every
`<h2>` in the actual rendered HTML (not the embedded RSC JSON, which has its own
unrelated internal ordering and briefly caused a false negative during
verification): early items → Родові програми(14-17) → Програма
сексуальності(18) → late items(19,20,22) → Чакрова карта здоров'я(24) → Карта
долі по роках життя(25) → pricing. Matches the agreed sequence exactly.

**Block 23 (energy-field) also caught as missing and fixed same pass:** had
content drafted in this doc but was never wired to any key at all until the
user asked "і де пункт про енергію". Added as a new peripheral module
`energy-field` -> `matrix.karma` (same point as soul-lessons/soul-tasks-
before-40, framed as the "how to strengthen it" answer side) — only arcana 8 has
written content so far (the one example we had), other karma values render
nothing until filled in.

**Not yet done for block 25:** the actual prognosis *prose* per period (like the
two example texts the user provided — "юність"/"старість") is a much bigger,
separate content project (many age-windows × many possible energy values) —
same status as the chakra deep-dive. The calculation/display is real and live;
the written interpretations are not.

## Example matrix (24.09.1973)

day=6, month=9, year=20, karma=8, center=7, nw=15, ne=11, se=10, sw=14,
ancestralStrength=5, dayAxis=[19,13,20], monthAxis=[7,16,5], yearAxis=[11,9,16],
karmaAxis=[5,15,22], destinations: personal=7, social=14, spiritual=21,
channels: money{entrance=9, energy=15, junction=6}, love{entrance=15, energy=21,
junction=6}, sexuality=[7,5,12].

## Content templates

**Simple block** (single or few points, no named archetype):
teaser title (locked) → short 1-2 sentence "суть" (revealed on unlock).

**Named "program" block** (родові лінії, кармічний хвіст, сексуальність, and any
future 3-number combo with a known archetype name):
neutral teaser title (does *not* reveal the archetype name) → on unlock: archetype
name + number code → short plus (4-5 речень) → short minus (4-5 речень) → one
soft reassuring closing line ("це тенденція, яку можна пропрацювати, а не вирок").

For archetype names/content, **gadalkindom.ru**'s full catalog of 250 родові +
many неродові karmic programs (pasted into chat 2026-08-13) is now the reference
for looking up any 3-number combo by exact match — no more guessing needed. The
local PDF "Программы — трактовка кодов" (Кравченко) mentioned in memory may have
overlapping/fuller material.

## The 20 blocks (final numbering — confirmed 2026-08-17)

"Old #" is the number used everywhere else in this doc (table below this one
predates the renumbering and wasn't rewritten wholesale — see "Final block
numbering" note above).

| # | Block | Old # | Points (example) | Teaser title | Content status |
|---|---|---|---|---|---|
| 1 | Візитна картка: характер особистості | 1 | day = 6 | «Ваша візитна картка: сильні й слабкі сторони одним поглядом» | content written |
| 2 | Ваші таланти та приховані здібності, духовна енергія, внутрішній ресурс | 2 | 9 → 7 → 16 (month, monthAxis) | «Дар, який дала вам вища сила — і який ви ще не розкрили на повну» | content written |
| 3 | Задача душі: шлях вашого розвитку, матеріальна реалізація | 3 | 20 | «Задача, яку доля поставила ще до вашого народження» | content written |
| 4 | Зона комфорту: душа, характер і точка внутрішньої гармонії та рівноваги | 4 | center = 7 | «Точка, від якої залежить усе ваше життя — навіть коли ви цього не помічаєте» | content written |
| 5 | Карма з минулого життя, кармічний хвіст | 5 | 8, 5, 15 | «Кармічний хвіст: які уроки треба вирішити з минулого» | plus/minus written |
| 6 | Ваш головний кармічний урок: точка особистого зростання | 6 | 8 (= karma) | «Ваша головна проблема з минулого життя» | content written |
| 7 | Матеріальна карма: що блокує ваші гроші | 7 | 20 (nwAxis[0]) | «Справжня причина, чому гроші не затримуються у вас» | content written |
| 8 | Вхід у грошовий канал: ваш напрямок реалізації | 8 | money.entrance = 9 | «Напрямок, який уже відкриває вам потік грошей — а ви ним ще не користуєтесь» | content written |
| 9 | Енергія грошей: професії та сфери реалізації | 9 | money.energy = 15 | «Професії та сфери, в яких саме для вас відкритий грошовий потік» | content written |
| 10 | Вхід у канал стосунків: ваш сценарій кохання та внутрішні блоки | 10 | love.entrance = 15 | «Що насправді заважає вам побудувати здорові стосунки» | content written |
| 11 | Портрет вашого ідеального партнера | 11 | love.energy = 21 | «Портрет партнера, який вам справді підходить» | content written |
| 12 | Точка балансу: стосунки та фінанси | 12 | junction = 6 | «Чому вам важко мати одночасно і гроші, і кохання» | content written |
| 13 | Енергія фінансового благополуччя | 13 | yearAxis[0] = 11 (was wrongly mapped to `ne`, which also = 11 for this date only — see note below) | «Що виводить ваші гроші на новий рівень — або тримає їх на місці» | content written |
| 14 | **Енергія роду: підтримка, таланти та кармічні уроки** (група з 5 підпунктів) | — | — | — | — |
| 14.1 | Підтримка від предків | *(нове)* | ancestralStrength (`programs.ts`) | «Прихована сила від предків, яка підтримує вас навіть тоді, коли ви цього не відчуваєте» | content written 2026-08-17 |
| 14.2 | Дари батьківського роду, таланти за батьківською лінією | 14 | 15, 20, 8 (nw) | «Сила, яку приховує батьківська лінія роду» | plus/minus written (sourced from gadalkindom.ru) |
| 14.3 | Дари материнського роду, таланти за материнською лінією | 15 | 11, 16, 9 (ne) | «Сила, яку приховує материнська лінія роду» | plus/minus written (sourced from gadalkindom.ru) |
| 14.4 | Матеріальна родова карма за батьківською лінією | 16 | 14, 6, 19 (sw) | «Що блокує гроші по батьківській лінії роду» | plus/minus written (sourced from gadalkindom.ru) |
| 14.5 | Матеріальна родова карма за материнською лінією | 17 | 10, 15, 7 (se) | «Що блокує гроші по материнській лінії роду» | plus/minus written (full source text) |
| 15 | Ваша сексуальна енергія: сила та внутрішні блоки | 18 | 7, 5, 12 | «Що насправді блокує вашу сексуальну енергію» | plus/minus written (full source text) |
| 16 | Канал дитячо-батьківських стосунків | 19 | 6, 19, 13 (day + dayAxis) | «Стосунки з батьками і дітьми: що насправді каже ваша внутрішня дитина» | content written |
| 17 | **Призначення: особисте, соціальне та духовне** (група з 3 підпунктів) | — | — | — | — |
| 17.1 | Особисте призначення — до 40 років, завдання людини для себе та власного розвитку | 20 | personal.total = 7 | «Місія, яку ви мали реалізувати ще до 40 років» | content written |
| 17.2 | Соціальне призначення — від 40 до 60 років, реалізація серед людей і в суспільстві | 21 | social.total = 14 | «Ваша роль у світі після 40 — те, заради чого варто прокидатись» | content written |
| 17.3 | Духовне призначення — після 60 років, вищий сенс і духовний розвиток | 22 | spiritual.total = 21 | «Вища мета, яка розкриється лише з віком» | content drafted from existing site article + practical addition |
| 18 | Де ви втрачаєте енергію та як її відновити | 23 | 8 (та сама точка, що й блок 6, plus/answer сторона) | «Що виснажує вас найбільше — і як повернути енергію» | content drafted (practices: тіло, емоційна рівновага, справедливість) |
| 19 | Чакрова карта здоров'я: тіло, енергія та емоції | 24 | усі 7 чакр (physics/energy/emotions) + Ітог | «Чакрова карта здоров'я» | wired 2026-08-18: 7 chakra descriptions + arcana-keyed plus/minus for arcana 6, 8, 10, 14, 15 (covers current example date + Ітог reuse); other arcana show "coming soon" |
| 20 | Карта життя за віковими періодами | 25 | вік-залежні енергії по всьому життю | «Карта долі по роках життя» | structure only, deferred |

## Full block content

Teaser title is what's shown locked; everything under "Контент" is revealed on
unlock. Simple blocks get a short "суть" paragraph; program blocks follow the
plus/minus/closing-line template from "Content templates" above. **Headings
below still use the old 1-25 numbers** (see "Old #" column above to translate
to the final 1-20 numbering).

### 1. Візитна картка: характер особистості — day = 6
Тизер: «Ваша візитна картка: сильні й слабкі сторони одним поглядом»
Контент: Повний портрет вашого характеру — сильні сторони, які всі помічають
одразу, і слабкі, які видно лише зблизька. Це та енергія, через яку вас сприймає
світ від перших секунд знайомства.

### 2. Ваші таланти та приховані здібності, духовна енергія, внутрішній ресурс — 9 → 7 → 16
Тизер: «Дар, який дала вам вища сила — і який ви ще не розкрили на повну»
Контент: Три точки одним ланцюжком — головний талант, дарований вищими силами й
пов'язаний з інтуїцією (9), тип мислення, через який цей талант проявляється (7),
і ще один прихований талант — самовираження та комунікація (16).

### 3. Задача душі: шлях вашого розвитку, матеріальна реалізація — 20
Тизер: «Задача, яку доля поставила ще до вашого народження»
Контент: Задача, яку душа прийшла реалізувати в цьому житті — саме по цій точці
йде основний розвиток і проходження життєвих уроків.

### 4. Зона комфорту: душа, характер і точка внутрішньої гармонії та рівноваги — center = 7
Тизер: «Точка, від якої залежить усе ваше життя — навіть коли ви цього не
помічаєте»
Контент: Одна з найважливіших точок матриці — впливає на всі сфери життя. Якщо не
пропрацьована, фоново тягне у негативні стани та притягує складні ситуації;
пропрацьована — дає стабільне відчуття гармонії й опори.

### 5. Карма з минулого життя, кармічний хвіст — «Сімейні пристрасті» — 8, 5, 15
Тизер: «Кармічний хвіст: які уроки треба вирішити з минулого»
Контент:
- *Плюс:* здатність глибоко й пристрасно віддаватися стосункам і родинним
  зв'язкам, цінувати сім'ю та близькість по-справжньому.
- *Мінус:* несвідоме повторення сімейних драм з минулого — ревнощі, боротьба за
  увагу, конфлікти, які вже проживались раніше і тягнуться в це життя знову.
- Але це можна усвідомити й розірвати цикл.

### 6. Ваш головний кармічний урок (точка особистого зростання) — 8 (= karma)
Тизер: «Ваша головна проблема з минулого життя»
Контент: Енергія, «об яку людина спотикається по життю» — від народження
проявлена в мінусі. Це корінна перешкода, яка стоїть на шляху до бажаного життя,
поки її не усвідомити.

### 7. Матеріальна карма: що блокує ваші гроші — 20 (nwAxis[0])
Тизер: «Справжня причина, чому гроші не затримуються у вас»
Контент: Матеріальна карма з минулого життя — «камінь спотикання» фінансів. Поки
цю енергію не активувати, вона блокує прихід грошей, ресурсів і можливостей.

### 8. Вхід у грошовий канал: ваш напрямок реалізації — money.entrance = 9
Тизер: «Напрямок, який уже відкриває вам потік грошей — а ви ним ще не
користуєтесь»
Контент: Напрямок — те, що ви вже вмієте, знаєте й можете, — через який енергія
заходить у грошовий канал і відкриває потік грошей.

### 9. Енергія грошей: професії та сфери реалізації — money.energy = 15
Тизер: «Професії та сфери, в яких саме для вас відкритий грошовий потік»
Контент: Конкретні професії та сфери діяльності, в яких саме для вас відкритий
грошовий потік — де цей потік найлегше примножити.

### 10. Вхід у канал стосунків: ваш сценарій кохання та внутрішні блоки — love.entrance = 15
Тизер: «Що насправді заважає вам побудувати здорові стосунки»
Контент: Неусвідомлена проблема на вході в канал любові — звідки беруться типові
складнощі й повторювані сценарії в стосунках.

### 11. Портрет вашого ідеального партнера — love.energy = 21
Тизер: «Портрет партнера, який вам справді підходить»
Контент: Які якості потрібно проявляти в стосунках, який партнер вам справді
підходить — і чого саме не вистачає вашому роду в парі.

### 12. Точка балансу: стосунки та фінанси — junction = 6
Тизер: «Чому вам важко мати одночасно і гроші, і кохання»
Контент: Спільна точка для обох каналів — гроші й стосунки. Показує, чи не
«з'їдає» одна сфера життя іншу, і чому важко мати обидві на повну одночасно.

### 13. Енергія фінансового благополуччя — yearAxis[0] = 11
Тизер: «Що виводить ваші гроші на новий рівень — або тримає їх на місці»
Контент: Двосторонній перемикач: у плюсі виводить усі інші грошові енергії на
новий масштаб, у мінусі саме тут закладені головні грошові блоки й негативні
установки.

**Corrected 2026-08-25:** this point was originally guessed as `ne`
(reduce(month+year)) with no independent birth-date cross-check. User
reported the live site showing 15 (Диявол) for 26.07.1997 where the correct
value is 8 (Справедливість) per their reference source — `ne` gives 15
there (wrong), `yearAxis[0]` gives 8 (right). For this doc's own reference
date (24.09.1973) the two formulas happen to coincide (both = 11), which is
exactly why the mistake wasn't caught when the block was written — all 22
arcana content files under `wellbeing` are unaffected since they're keyed
by arcana number, not by formula.

### 14.1. Підтримка від предків — ancestralStrength = 5 (для 24.09.1973)
Тизер: «Прихована сила від предків, яка підтримує вас навіть тоді, коли ви
цього не відчуваєте»
Контент: Енергія сили предків — ресурс, який активує підтримку роду у вашому
житті. Це прихована опора, яка діє навіть тоді, коли ви не усвідомлюєте її
присутності.
Джерело: скріншот матриці іншого сайту (2026-08-17), точка 5 поряд із center=7
для дати 24.09.1973 — підпис на сайті: «Енергія сили предків. Активація цієї
енергії запускає підтримку сили предків.» (значення 5 співпадає з
`ancestralStrength=5` у прикладовій матриці цього доку — підтверджує формулу).

### 14.2. Дари батьківського роду, таланти за батьківською лінією — «У клітці протиріч» — 15, 20, 8 (nw)
Тизер: «Сила, яку приховує батьківська лінія роду»
Контент (синтез джерела https://gadalkindom.ru/matritsa-sudby/karmicheskie-programmy/15-8-20-v-kletke-protivorechij.html, 2026-08-17):
- *Плюс:* здатність бачити ситуацію з різних сторін одразу, тонка емпатія й
  розвинена аналітика, висока адаптивність до зміни обставин, потенціал для
  особистісного росту через усвідомлення власних протиріч і глибоку рефлексію.
- *Мінус:* паралізуюча нерішучість, коли забагато варіантів заважають зробити
  вибір; виснажливий внутрішній конфлікт між протилежними переконаннями;
  неузгодженість слів і вчинків; у важких випадках — стан емоційного паралічу.
- Усвідомлення цього патерну звільняє від застрягання — клітка стає джерелом сили.

### 14.3. Дари материнського роду, таланти за материнською лінією — «Саморуйнування» — 11, 16, 9 (ne)
Тизер: «Сила, яку приховує материнська лінія роду»
Контент (синтез джерела https://gadalkindom.ru/matritsa-sudby/karmicheskie-programmy/11-9-16-samorazrushenie.html, 2026-08-17):
- *Плюс:* потужна життєлюбна енергія, внутрішня радість і щирість, рішучість і
  відповідальність, сильна трансформаційна сила та здатність переродитися після
  кризи, гостра інтуїція щодо того, що вже віджило своє.
- *Мінус:* успадкована від роду схильність несвідомо шкодити собі — саботувати
  власний успіх, стосунки чи здоров'я саме тоді, коли стає «занадто добре»;
  ризиковані експерименти віддаляють від близьких і б'ють по фінансах і кар'єрі.
- Розпізнаний вчасно, патерн перетворюється на ту саму життєлюбну силу.

### 14.4. Матеріальна родова карма за батьківською лінією — «Тихе сімейне щастя» — 14, 6, 19 (sw)
Тизер: «Що блокує гроші по батьківській лінії роду»
Контент (синтез джерела https://gadalkindom.ru/matritsa-sudby/karmicheskie-programmy/14-6-19-tihoe-semejnoe-schaste.html, 2026-08-17):
- *Плюс:* щире прагнення створити дім і родину, дар цінувати прості стабільні
  радощі, вміння бути зразковим сім'янином — оселя випромінює спокій і безпеку.
- *Мінус:* страх перед масштабом і ризиком заради збереження спокою — людина
  несвідомо звужує коло спілкування і відмовляється від великих можливостей,
  щоб не «сполохати» тихе щастя; звідси й грошовий блок.
- Справжній спокій не руйнується від нового досвіду — це не або/або.

### 14.5. Матеріальна родова карма за материнською лінією — «Шлях спокус» — 10, 15, 7 (se)
Тизер: «Що блокує гроші по материнській лінії роду»
Контент (синтез повного джерела):
- *Плюс:* глибока тяга до самопізнання, стійка сила волі, здатність долати
  спокуси й труднощі, мудрість і стійкість, набуті через випробування, тонка
  емоційна глибина, натхненна творчість, здатність до усвідомленого вибору.
- *Мінус:* неконтрольована імпульсивність, схильність до залежностей, втрата
  самоконтролю в стресі, нестійкі моральні орієнтири, саморуйнівні тенденції,
  нехтування пріоритетами заради миттєвих бажань.
- Це тенденція, яку можна усвідомити й пропрацювати, а не вирок.

### 15 (old 18). Ваша сексуальна енергія: сила та внутрішні блоки — «Сексуальність» — 7, 5, 12
Тизер: «Що насправді блокує вашу сексуальну енергію»
Контент (синтез повного джерела):
- *Плюс:* потужна сексуальна енергія та магнетизм, майстерність спокуси,
  харизма, впевненість у собі, відкритість до експериментів, чесність намірів
  щодо партнерів, вміння дарувати справжнє задоволення.
- *Мінус:* може перетворитись на одержимість сексом — постійну гонитву за новими
  відчуттями, емоційне вигорання, нездатність будувати глибокі стосунки, іноді —
  свідоме руйнування чужих стосунків заради відчуття влади.
- Але це лише тенденція, яку можна усвідомити й пропрацювати, а не вирок.

### 16 (old 19). Канал дитячо-батьківських стосунків — 6, 19, 13
Тизер: «Стосунки з батьками і дітьми: що насправді каже ваша внутрішня дитина»
Контент: Три точки: базова ідентичність (дата народження), внутрішня дитина —
як ви ставитесь до дітей і проявляєтесь у батьківстві, внутрішній батько/мати —
тип мислення щодо стосунків із дітьми й батьками.

### 17.1 (old 20). Особисте призначення — до 40 років, завдання людини для себе та власного розвитку — personal.total = 7
Тизер: «Місія, яку ви мали реалізувати ще до 40 років»
Контент: Ключова місія, яку ви мали реалізувати в першій половині життя — до 40
років.

### 17.2 (old 21). Соціальне призначення — від 40 до 60 років, реалізація серед людей і в суспільстві — social.total = 14
Тизер: «Ваша роль у світі після 40 — те, заради чого варто прокидатись»
Контент: Роль, яку доля готує вам після 40 років — етап соціальної реалізації.

### 17.3 (old 22). Духовне призначення — після 60 років, вищий сенс і духовний розвиток — spiritual.total = 21
Тизер: «Вища мета, яка розкриється лише з віком»
Контент: Якщо ви пропрацювали соціальні та особисті задачі, духовні прийдуть як
бонус у плюсі. Зазвичай пропрацювання цих задач відбувається у віці старше 60
років, хоча ця енергія працює впродовж усього життя. Ваше духовне призначення
(аркан Світ) — навчитися бачити ціле там, де інші бачать лише розрізнені шматки,
і власним життям показувати, що таке справжня завершеність. Здобути цю
цілісність можна через дипломатичність, розширення мислення та адаптацію:
подорожуйте, щоб збагачуватись новими знаннями; розвивайте вміння дружити,
об'єднувати людей і будувати стосунки; уникайте поділу на «своїх і чужих»;
вирішуйте конфлікти мирним шляхом, не нав'язуючи власних ідеалів.

### 18 (old 23). Де ви втрачаєте енергію та як її відновити — 8 (та сама точка, що й блок 6)
Тизер: «Що виснажує вас найбільше — і як повернути енергію»
Контент: Ваше енергополе підсилюється через логіку, справедливість і глибину.
Важливо дбати про тіло — здоровий спосіб життя, правильне харчування, регулярна
фізична активність, — адже здоров'я енергетичного тіла напряму пов'язане з
фізичним і психічним станом. Емоційна та ментальна рівновага теж мають значення:
приділяйте час релаксації, медитації, гармонії з собою і світом. І головне —
будьте справедливими у своїх діях і стосунках з іншими, відповідально ставтесь
до своїх обов'язків.

### 19 (old 24). Чакрова карта здоров'я: тіло, енергія та емоції
### 20 (old 25). Карта життя за віковими періодами
See table above and "Open follow-ups" below for content status.

## Notes / decisions made along the way

- **Block 6 vs 18 (old 23)** are two sides of the same point (8): 6 = diagnosis
  ("what's wrong"), 18 = prescription ("how to fix it"). Block 5 covers the
  same number 8 again but as part of the 3-number karmic-tail chain — titles
  were deliberately de-duplicated so none of the three overlap in wording.
- **Block 9's point 15** = professions/spheres where the money channel actually
  pays off; **block 8's point 9** = the *direction* that opens the channel in the
  first place (what you already know/can do). Keep this distinction in the copy.
- **Block 19 (health, old 24)** replaces the earlier flagged duplicate ("13. Карта
  здоров'я по чакрах" duplicating the free chakra table) — this is now the real,
  richer paid content sitting behind that free table, not a copy of it. Confirmed
  the free table's **"Емоції" column = the arcana number gadalkindom labels "що
  потрібно пропрацювати"** for that chakra (verified against 2 real examples for
  this date: chakra 7/Сахасрара → emotions=15=Диявол; chakra 6/Аджна →
  emotions=8=Справедливість — both matched exactly).
- **Block 20 (age-period forecast, old 25)** needs its own formula
  reverse-engineered (how the age brackets and their energies are derived from
  the birth date) before any real content can be written — bigger, separate
  task. **(Update: formula since solved and implemented — see "Implementation
  status" above; only the written prognosis prose is still open.)**
- Sexuality program 7-5-12 has two names in the wild: "Сукуб та Інкуб" (site that
  supplied the full plus/minus article we used) vs. plain "Сексуальність"
  (gadalkindom's catalog). Went with **«Сексуальність»** as the label.
- Arcana 21 (Світ) for block 17.3 (old 22): kept the site's own established
  canonical theme ("завершеність і цілісність", per `src/lib/arcana.ts` /
  gallery keyword) rather than switching to a different source's
  "миролюбність/подорожі" framing, since the latter would require rewriting all
  22 arcana in the `spiritual-purpose` module, not just this one. Added the
  "diplomacy/travel/adaptation" material as a practical *how-to* addition
  instead of replacing the core theme.

## Open follow-ups for next session

- **Block 14.1 (Підтримка від предків / ancestralStrength) — new, 2026-08-17:**
  has no teaser title or content yet. Needs the usual collaborative round (2-3
  title options, pick a content template) before it can be wired as its own
  card in `ProgramList.tsx` / the ancestral-programs section.
- ~~Родові програми (14.2-14.4, old 14-16) had synthesized-by-Claude plus/minus
  content~~ — **DONE 2026-08-17.** User supplied the gadalkindom.ru catalog
  link; found and fetched the 3 exact program pages (15-8-20 «В клетке
  противоречий», 11-9-16 «Саморазрушение», 14-6-19 «Тихое семейное счастье»)
  and rewrote `src/content/programs/uk/{8-15-20,9-11-16,6-14-19}.md` to match
  the real source content (richer plus/minus, same depth as 14.5/15). Not yet
  translated to ru/en program content files.
- ~~Chakra deep-dive (19, old 24): only 2 of 7 chakras have real source text~~ —
  **DONE 2026-08-18.** User supplied full source text for the remaining chakras
  (3/Маніпура, 2/Свадхистана, 1/Муладхара) plus the Ітог/total row, same
  structure as Сахасрара/Аджна (На рівні органів/душі/що блокує/як
  відкрити/якщо працює правильно). Implemented as `src/lib/chakraContent.ts`
  `CHAKRA_DESCRIPTIONS` (fixed per-chakra text, keys 0-7, 0 = Ітог) +
  `src/lib/chakraDeepDive.ts` `getChakraHealthContent(arcana, locale)`
  (arcana-keyed, NOT chakra-keyed — confirmed the source reuses the identical
  arcana write-up regardless of which chakra/row it lands in, e.g. arcana 8's
  text is verbatim identical for Аджна and for Ітог) +
  `src/content/chakra-health/uk/{arcana}.md` (currently 6, 8, 10, 14, 15
  written) + `ChakraDeepDive.tsx` accordion component, wired into
  `result/page.tsx` right after the free `ChakraTableView`. Verified live via
  Playwright — one real bug caught and fixed: the bullet-parsing regex dropped
  formatting on each list's *first* item (needed `^` in the split regex, not
  just `\n`, since the first bullet has no preceding newline). Still open:
  arcana besides 6/8/10/14/15 fall back to "coming soon" — same incremental
  pattern as the ancestral programs.
- Age-period forecast (20, old 25): calculation is implemented and live; the
  written prognosis prose per period is not — same methodology gap as the
  chakra deep-dive (need source examples for more age-window/energy
  combinations).
- Nothing here is wired into `src/i18n/dictionaries/*.ts` or the interpretation
  content library yet beyond what "Implementation status" above already lists
  as live — this doc is the source of truth to work from once ready.
