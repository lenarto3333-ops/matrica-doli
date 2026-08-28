# Родові (ancestral-line) programs catalog

Source of truth for `ANCESTRAL_PROGRAM_NAMES` in `src/lib/programs.ts`. This
file exists so the catalog is never again only "pasted into chat and lost" —
see the 2026-08-13 session where a full catalog was shared but never
persisted, forcing a re-scrape here on 2026-08-27.

## Source

`https://gadalkindom.ru/matritsa-sudby/karmicheskie-programmy` — a table of
~250 raw rows ("Родовые программы"), each row a 3-digit code (e.g. `15-8-20`)
+ Russian archetype name, each with a link to an individual article page.
Scraped 2026-08-27 via chunked fetches (grouped by leading digit, 2 through
22); 249 of the ~250 rows were captured (248 from the initial name-only
scrape + 1 more, `19-9-10`, found later while pulling URLs).

## The key-scheme bug, and how it was found and fixed

**First attempt (wrong):** grouped all raw rows by their **fully sorted**
ascending triple (`a-b-c`, a≤b≤c), on the assumption a родова program is the
same regardless of number order. This produced 161 distinct sets, 4 of which
had **conflicting names** depending on which raw rotation was looked at —
e.g. the set `{5,9,14}` was «Месть» under rotations `5-14-9`/`9-14-5` but
«Внутренний учитель» under `9-5-14`/`14-5-9`. Picking a name for those 4 by
guesswork would have been a coin flip.

**The pattern:** in every conflict, the deciding factor was **which number
sat literally in the middle of the raw code**, not the outer two (their order
never mattered — `5-14-9` and `9-14-5` both gave «Месть»). A 5th independent
case surfaced later while pulling individual-article URLs: `19-10-9` =
«Странствующий мудрец» but `19-9-10` = «Чистый поток энергии» — same 3
numbers {9,10,19}, different archetype by middle position. This meant the
bug wasn't 4 isolated exceptions — it could silently affect any triple where
only one rotation had been observed (the vast majority, since most triples
only had 1-2 of their 3 possible rotations listed in the table at all).

**Root-caused against the real formula:** `getAncestralPrograms` builds each
corner's triple as `[corner, axis[0]=inner, axis[1]=outer]`
(`buildAncestralAxis` in `matrix.ts`: `inner = reduce(seed + corner)`,
`outer = reduce(corner + inner)`). Computing real values for 2 birth dates
(24.09.1973 and 29.06.2008, all 4 corners each = 8 real triples) and
comparing against the exact individual-article URLs gadalkindom links to for
each proved, 8-for-8:

**The real key is `${min(corner, axis[0])}-${axis[1]}-${max(corner, axis[0])}`
— axis[1] (the "outer" ancestral value) is always the middle number; corner
and axis[0] can appear in either order.** E.g. for 24.09.1973's `nw` corner
(corner=15, axis=[20, 8]): predicted key `15-8-20` — matches the real URL
`.../15-8-20-v-kletke-protivorechij.html` exactly. All 8 corners across both
dates matched with zero exceptions.

**Fixed in `programs.ts`:** `ancestralProgramKey(corner, axis)` replaces the
old `sortedKey(numbers)` call in `getAncestralPrograms`. The catalog below
was rebuilt with this key format (166 entries — the 4 conflicting sets
correctly split into 8 real distinct entries once middle-position is
respected, plus the 1 bonus row found later, replacing the earlier
157-entry/full-sort catalog which is now void). Five already-written content
files had to be renamed to match (their old full-sort filenames happened to
coincidentally work only because no other real triple collided with them):
`8-15-20.md`→`15-8-20.md`, `9-11-16.md`→`11-9-16.md`,
`6-14-19.md`→`14-6-19.md`, `7-10-15.md`→`10-7-15.md`,
`2-8-10.md`→`2-10-8.md` (frontmatter `numbers:` field updated to match in
each).

**Caution for future work:** the displayed `numbers` badge on the result
page (`corner.numbers.join("-")`) is unaffected — it stays in natural
`[corner, axis0, axis1]` order for display, only the lookup `programKey` was
wrong. Don't re-introduce a plain `sortedKey`/full-sort anywhere in this
ancestral-program pipeline.

## Full catalog (166 triples, corrected key)

Key (`outerMin-middle-outerMax`), name (uk, as wired into
`ANCESTRAL_PROGRAM_NAMES`), and every raw code the site listed for it (for
future re-verification):

```
2-6-22     Нерозважливий романтик                     (2-6-22)
2-8-6      Зріла любов                                (2-8-6)
2-9-7      Просвітлений                               (2-9-7)
2-10-8     Безтурботний балакун                        (2-10-8)
2-11-9     Прихований потенціал                        (2-11-9)
2-12-10    Незвичайний талант                          (2-12-10)
2-13-11    Тренер                                      (2-13-11)
2-14-12    Смирення й очікування                       (2-14-12)
2-15-13    Перехід на темний бік                       (2-15-13)
2-16-14    Зламаний баланс                             (2-16-14)
2-17-15    Згубна мрія                                 (2-17-15)
2-20-18    Жриця Місяця                                (2-20-18)
3-5-20     Храм або Скверна                            (20-5-3)
3-6-21     Любов без меж                               (3-6-21, 21-6-3)
3-7-22     В'язень                                     (22-7-3)
3-8-5      Випробування достатком                      (3-8-5)
3-9-6      Неприйняття власного тіла (краси)           (3-9-6)
3-10-7     Життя в достатку                            (3-10-7)
3-11-8     Успішний правитель                          (3-11-8, 8-11-3)
3-12-9     Жіноча самотність                           (3-12-9, 9-12-3)
3-13-10    Самогубець                                  (3-13-10)
3-14-11    Ні багатства, ні бідності                   (3-14-11)
3-15-12    Фатальна жінка (чоловік)                    (3-15-12)
3-16-13    Випробування нуждою                         (3-16-13)
3-17-14    Скромна велич                               (3-17-14)
3-18-15    Найкраще або найгірше                       (3-18-15)
3-19-16    Багате життя                                (3-19-16, 16-19-3)
3-20-17    Таємна любов                                (3-20-17, 17-20-3)
3-21-18    Від ілюзій до реальності                    (18-21-3)
3-22-19    Ненароджена дитина                          (3-22-19, 19-22-3)
4-5-19     Переоцінка сил                              (19-5-4)
4-6-20     Влада любові                                (4-6-20, 20-6-4)
4-7-21     Глобальні завдання                          (21-7-4)
4-8-22     В'язниця                                    (4-8-22, 22-8-4)
4-10-6     Тягар керівника                             (4-10-6)
4-11-7     Охоронець порядку                           (4-11-7)
4-12-8     Скинутий правитель                          (4-12-8)
4-13-9     Скінченність буття                          (4-13-9)
4-14-10    Нема віри в себе                            (4-14-10, 10-14-4)
4-15-11    Спокуса владою                              (4-15-11)
4-16-12    Володар                                     (4-16-12)
4-17-13    Капсулювання, поховання                     (4-17-13)
4-19-15    Багатоваріантність успіху                   (4-19-15)
4-20-16    Втрата влади й контролю                     (4-20-16)
4-21-17    Розсіяність або фокус                       (4-21-17, 17-21-4)
4-22-18    Розтоптати віру                             (4-22-18, 18-22-4)
5-5-18     Магічні знання роду та ідеалізація сім'ї    (5-5-18, 18-5-5)
5-6-19     Вогонь любові                               (5-6-19, 19-6-5)
5-7-20     Вигнання із системи                         (20-7-5)
5-8-21     Порушення ієрархії                          (5-8-21, 21-8-5)
5-9-22     Вільний мислитель                           (22-9-5)
5-10-5     Вчений                                      (5-10-5)
5-12-7     Духовний застій                             (5-12-7)
5-13-8     Чуже місце                                  (5-13-8)
5-14-9     Помста                                      (5-14-9, 9-14-5)
5-14-19    Код мільйонера                              (5-14-19, individual article, not in main table)
5-15-10    Висока місія об'єднання                     (5-15-10, 10-15-5)
5-16-11    Знецінення                                  (5-16-11, 11-16-5)
5-17-12    Публічна ганьба                              (5-17-12, 12-17-5)
5-18-13    Сакральна жертва                            (5-18-13, 13-18-5)
5-19-14    Багатство                                   (5-19-14)
5-20-15    Бунтар                                      (5-20-15, 15-20-5)
5-21-16    Псування майна                              (5-21-16, 16-21-5)
5-22-17    Академічні знання                           (5-22-17, 17-22-5)
6-5-17     Фізична і духовна краса                     (6-5-17, 17-5-6)
6-6-18     Нерозділена любов                           (6-6-18, 18-6-6)
6-7-19     Винен за всіх                                (6-7-19, 19-7-6)
6-8-20     Ганьба родини                                (6-8-20, 20-8-6)
6-9-21     Усиновлення                                  (21-9-6)
6-10-22    Погана компанія                              (6-10-22, 22-10-6)
6-12-6     Жертва заради любові                         (6-12-6)
6-14-8     Деспот                                       (6-14-8)
6-15-9     Пристрасть чи любов                          (6-15-9)
6-16-10    Музей або доступ до цінностей                (6-16-10, 10-16-6)
6-17-11    Нереалізований талант                        (6-17-11, 11-17-6)
6-18-12    Залежні стосунки                             (6-18-12, 12-18-6)
6-19-13    Життя без вигорання                          (6-19-13, 13-19-6)
6-20-14    Жертва                                       (6-20-14, 14-20-6)
6-21-15    Розгул                                       (6-21-15, 15-21-6)
6-22-16    Жарт чи серйозність                          (6-22-16, 16-22-6)
7-5-16     Втрата авторитету                            (7-5-16, 16-5-7)
7-6-17     Паралельна любов                             (7-6-17, 17-6-7)
7-7-18     Страх розвитку                               (7-7-18, 18-7-7)
7-8-19     Шлях до самореалізації                       (7-8-19, 19-8-7)
7-9-20     Ніхто не забере                              (7-9-20, 20-9-7)
7-10-21    Воїн віри                                    (7-10-21, 21-10-7)
7-11-22    Від наївності до сили                        (22-11-7)
7-16-9     Мовчання                                     (7-16-9)
7-17-10    Шлях до відомості                            (7-17-10)
7-18-11    Бойовий маг                                  (7-18-11, 11-18-7)
7-19-12    Військовий                                   (7-19-12, 12-19-7)
7-20-13    Шлях переродження                            (7-20-13, 13-20-7)
7-21-14    Знущання і тортури                           (7-21-14, 14-21-7)
7-22-15    Азарт, ризик, адреналін                      (7-22-15, 15-22-7)
8-3-22     Уявна любов                                  (8-3-22, 22-3-8)
8-5-15     Сімейні пристрасті                           (8-5-15, 15-5-8)
8-6-16     У полоні любові                              (8-6-16, 16-6-8)
8-7-17     Ексклюзив                                    (8-7-17, 17-7-8)
8-8-18     Страх розчарування й обману                  (8-8-18, 18-8-8)
8-9-19     Безнадія                                     (8-9-19, 19-9-8)
8-10-20    Звільнення з неволі                          (8-10-20, 20-10-8)
8-11-21    Творець нової реальності                     (8-11-21, 21-11-8)
8-18-10    У пошуках справедливості                     (8-18-10)
8-19-11    Господар своєї долі                          (8-19-11)
8-20-12    Спустошення душі                             (8-20-12, 12-20-8)
8-21-13    Системна помилка                             (8-21-13, 13-21-8)
8-22-14    Скупість                                     (8-22-14, 14-22-8)
9-3-21     Наглядач                                     (9-3-21, 21-3-9)
9-4-22     Несвобода                                    (9-4-22, 22-4-9)
9-5-14     Внутрішній учитель                           (9-5-14, 14-5-9)
9-6-15     Казковий світ, письменник і творець          (9-6-15, 15-6-9)
9-7-16     Руйнівник ілюзій                             (9-7-16, 16-7-9)
9-8-17     Приховування істини                          (9-8-17, 17-8-9)
9-9-18     Заборонені знання                            (9-9-18, 18-9-9)
9-10-19    Мандрівний мудрець                           (9-10-19, 19-10-9)
9-11-20    Мудрий Лев                                   (9-11-20, 20-11-9)
9-21-12    Переоцінка життєвого шляху                   (9-21-12)
9-22-13    Неспокійні душі                              (9-22-13, 13-22-9)
10-3-20    Обман з боку жінок                           (10-3-20, 20-3-10)
10-4-21    Пригнічений дух                              (10-4-21, 21-4-10)
10-5-13    Перегляд звичних шаблонів                    (10-5-13)
10-5-22    Інквізиція                                   (10-5-22, 22-5-10)
10-6-14    Поворот долі                                 (10-6-14, 14-6-10)
10-7-15    Шлях спокус                                  (10-7-15, 15-7-10)
10-8-16    Змова, змовник                               (10-8-16, 16-8-10)
10-9-17    Ідеаліст                                     (10-9-17, 17-9-10)
10-9-19    Чистий потік енергії                         (19-9-10)
10-10-18   Страх довіри Богу                            (10-10-18, 18-10-10)
10-11-19   Вигорання, спалах                            (10-11-19, 19-11-10)
11-3-19    Марність зусиль                              (11-3-19, 19-3-11)
11-4-20    Сильна воля                                  (11-4-20, 20-4-11)
11-5-21    Підробка                                     (11-5-21, 21-5-11)
11-6-22    Маніпуляція дитиною                          (11-6-22, 22-6-11)
11-7-14    Розмірене життя                              (11-7-14)
11-8-15    Фізична агресія                              (11-8-15, 15-8-11)
11-9-16    Саморуйнування                               (11-9-16, 16-9-11)
11-10-17   Втрачений шанс                               (11-10-17, 17-10-11)
11-11-18   Страх прийняття магічної сили                (11-11-18, 18-11-11)
12-3-18    Фізичні страждання                           (12-3-18)
12-4-19    Жертва заради влади                          (12-4-19)
12-5-20    Жертва заради мрії                           (12-5-20)
12-6-21    Жертва обставин                              (12-6-21)
12-7-22    Пошук обхідних шляхів                        (12-7-22)
12-9-15    Усвідомлені жертви                           (12-9-15)
12-10-16   Втрачені можливості                          (12-10-16)
12-11-17   Незвичайні мрії                              (12-11-17)
13-3-17    Метаморфози долі                             (13-3-17)
13-4-18    Страх влади та відповідальності              (13-4-18)
13-5-19    Неприйняття вчителів                         (13-5-19)
13-6-20    Страх серйозних стосунків                    (13-6-20)
13-7-21    Руйнівник і вбивця                           (13-7-21)
13-8-22    Потяг до невиправданого ризику               (13-8-22)
14-5-18    Хибні духовні цінності                       (14-5-18)
14-6-19    Тихе сімейне щастя                           (14-6-19)
14-7-20    Шлях у тиху гавань                           (14-7-20)
14-8-21    Баланс протилежностей                        (14-8-21)
14-9-22    Занудний всезнайко                           (14-9-22)
15-7-19    У пошуку задоволень                          (15-7-19)
15-8-20    У клітці протиріч                            (15-8-20)
15-9-21    Самотність серед натовпу                     (15-9-21)
15-10-22   Циклічне саморуйнування                      (15-10-22)
16-9-20    Реформатор традицій                          (16-9-20)
16-10-21   Духовний учитель                             (16-10-21)
16-11-22   Відновлення зруйнованого                     (16-11-22)
17-11-21   Маяк в океані                                (17-11-21)
17-12-22   Переворот світогляду                         (17-12-22)
18-4-22    Мандрівник без мети                          (18-4-22)
```

## Not yet covered

A handful of raw rows (mostly single-rotation entries in the 13-22 leading-digit
ranges) may still be missing from this 166-entry set. If a birth date produces
a corner triple that still falls back to the generic label, it's worth a
targeted re-fetch of that specific number range before assuming the program
simply isn't named — and worth double-checking that the *correct* rotation
(middle = axis[1]) was searched for, not a full-sort guess.

## Content status

Content-writing started 2026-08-27 (user pasting individual gadalkindom
articles, a few triples at a time). Written so far (all filenames/keys below
are already in the corrected `outerMin-middle-outerMax` form):
- `15-8-20` «У клітці протиріч» (original, pre-dates this session)
- `11-9-16` «Саморуйнування» (original)
- `14-6-19` «Тихе сімейне щастя» (original)
- `10-7-15` «Шлях спокус» (original)
- `2-10-8` «Безтурботний балакун»
- `5-14-19` «Код мільйонера» — a genuinely separate program from `5-19-14`
  «Багатство» (same 3 numbers, different middle: 14 vs 19). Confirmed NOT a
  conflict once the key scheme was corrected — both are now real, separate
  catalog entries.
- `8-8-18` «Страх розчарування й обману»
- `5-6-11` «Гармонія та затишок у домі» — see "2-number programs" below;
  not part of `ANCESTRAL_PROGRAM_NAMES`/`getAncestralPrograms` at all.

**Batch 1 (2026-08-27, 30 triples attempted) — 26 DONE, 4 reverted**, written
autonomously via 3 parallel background agents fetching individual gadalkindom
pages directly (no more user-pasted text needed — the catalog's URLs,
gathered while fixing the key-scheme bug above, made this possible). Kept:
`2-6-22`, `2-8-6`, `2-9-7`, `2-11-9`, `2-12-10`, `2-13-11`, `2-14-12`,
`2-15-13`, `2-16-14`, `2-17-15`, `2-20-18`, `3-5-20`, `3-6-21`, `3-8-5`,
`3-9-6`, `3-10-7`, `3-11-8`, `3-14-11`, `3-15-12`, `3-16-13`, `3-17-14`,
`3-18-15`, `3-19-16`, `3-20-17`, `3-21-18`, `4-5-19`. Verified afterward
(spot-read ~7 files): consistent template, no garbles (one caught and fixed
by its own writing agent in `4-5-19` — a repeated "applied applied applied"
glitch in the closing sentence).

**Bug found and fixed same session — родові programs and кармічні хвости
(karmic tails) are genuinely two separate gadalkindom program systems, NOT
just two article templates for the same thing (confirmed explicitly by the
user).** 4 of the 30 batch-1 URLs (`3-7-22` «В'язень», `3-12-9` «Жіноча
самотність», `3-13-10` «Самогубець», `3-22-19` «Ненароджена дитина») resolved
to `/matritsa-sudby/karmicheskij-hvost/...` pages (past-life/current-
incarnation framing, not Положительное/Отрицательное проявление) despite
being listed in the same "Родовые программы" summary table used to build
this whole catalog. The agents initially adapted these into родові-style
content, which was wrong — **reverted**: deleted the 4 content files and
removed their entries from `ANCESTRAL_PROGRAM_NAMES` in `programs.ts`. These
4 triples now correctly fall back to the generic label until a real родові
source is found for them (or until `matrix.ts`'s separate `karmicTail` field
— `[karma, D1, D2]`, unrelated to the 4 ancestral corners — gets its own
content system, which is where this "хвіст" content actually belongs).
**Policy for all future batches: if a URL resolves to `/karmicheskij-hvost/`
instead of `/karmicheskie-programmy/`, SKIP it — do not write a file, do not
adapt the structure.** The summary table's row classification is not a
reliable signal for this; only the resolved URL's path is.

**Proactive catalog cleanup (2026-08-27, same session):** rather than only
catching karmic-tail entries one at a time as batches reach them, scanned
the full `raw_urls.txt` harvest against every key still in
`ANCESTRAL_PROGRAM_NAMES` and removed **18 total** karmic-tail-only entries
in one pass: `4-16-12`, `5-20-15` (already caught during batch 2), plus 16
more that hadn't been touched yet — `6-6-18`, `6-8-20`, `6-14-8`, `6-15-9`,
`6-17-11`, `6-20-14`, `7-10-21`, `7-19-12`, `8-5-15`, `9-3-21`, `9-9-18`,
`10-4-21`, `11-8-15`, `12-3-18`, `13-7-21`, `16-10-21`. None of these 16 had
content files written yet, so no file deletions were needed for them — just
catalog entries removed. Catalog is now at **145 entries** (was 163). Re-ran
the scan afterward: zero remaining karmic-tail-only entries.

**Namespace collision discovered during this cleanup:** `9-9-18` (one of the
16 above) turned out to ALSO be a `SEXUALITY_PROGRAM_NAMES` key (`"9-9-18":
"Тіні минулих стосунків"`) — sexuality and родові programs both read from
the same flat `src/content/programs/uk/` directory via the same
`getProgramContent(key, locale)` function, so if `9-9-18` had been kept as
an ancestral catalog entry AND content had been written for it, a real
birth date whose ancestral corner produced key `9-9-18` would have
incorrectly displayed the sexuality program's content. This one resolved
itself for free (removed as karmic-tail anyway), but it's worth a policy
note for future batches: **before writing a new ancestral content file,
check its key isn't already a `SEXUALITY_PROGRAM_NAMES` key** (25 keys,
listed above in this file) to avoid silently overwriting/colliding with
sexuality content. A one-time full cross-check of all 145 remaining
ancestral keys against the 25 sexuality keys found no other collisions.

Writing content for the remaining ~118 unwritten triples (down from 145
minus what's now written) is a large, still-incremental task, continuing a
few batches at a time. Since the catalog's URLs are now known for
essentially all entries (harvested while fixing the key-scheme bug), this no
longer requires the user to paste article text or links — batches can be
fetched and written autonomously, reviewed a batch at a time. **Policy for
every future batch, going forward:** (1) skip any key whose URL resolves to
`/karmicheskij-hvost/` — don't write, don't adapt; (2) before writing, check
the key isn't already claimed by `SEXUALITY_PROGRAM_NAMES`.

**Batch 2 (2026-08-27, 30 triples attempted) — 28 DONE, 2 correctly
skipped as karmic-tail per the corrected policy** (agents were redirected
mid-flight after the batch-1 mistake was caught): `4-6-20`, `4-7-21`,
`4-8-22`, `4-10-6`, `4-11-7`, `4-12-8`, `4-13-9`, `4-14-10`, `4-15-11`,
`4-17-13`, `4-19-15`, `4-20-16`, `4-21-17`, `4-22-18`, `5-5-18`, `5-6-19`,
`5-7-20`, `5-8-21`, `5-9-22`, `5-10-5`, `5-12-7`, `5-13-8`, `5-14-9`,
`5-15-10`, `5-16-11`, `5-17-12`, `5-18-13`, `5-19-14`. Skipped (karmic-tail,
already removed from catalog too): `4-16-12`, `5-20-15`. One URL glitch
caught: `4-15-11`'s given `.htm` URL served an unrelated page; the writing
agent found the correct content at the `.html` variant instead, verified
afterward to match the expected "Спокуса владою" theme. Spot-read 2 files
(`4-15-11`, `5-19-14`) afterward — consistent template, on-theme, no
garbles.

**Structural bug found and fixed (2026-08-27, same session, live on the
site):** родові and sexuality program content used to share one flat
directory (`src/content/programs/{locale}/{key}.md`), keyed only by the
number string with no separation between program types. A real user tested
birth date 27.08.2026 and its `ne`/`sw` ancestral corners both computed
lookup key `9-9-18` (displayed badge `18-9-9`, natural corner-axis order —
the badge and the lookup key are NOT the same string, see
`ancestralProgramKey`) — which silently loaded the pre-existing SEXUALITY
file `9-9-18.md` («Тіні минулих стосунків»), showing that content mislabeled
as a generic родова program. `9-9-18` had already been removed from
`ANCESTRAL_PROGRAM_NAMES` in the karmic-tail cleanup above, but the
*content* lookup (`getProgramContent`) never checked the catalog at all — it
just reads whatever file exists at that path, name or no name. **Fixed
properly, not just patched:** all 62 родові content files moved to their own
`src/content/programs/ancestral/{locale}/` subdirectory (mirroring how
`parents-children` already had its own subdirectory); `programs.ts` got a
dedicated `getAncestralProgramContent()` reading from that path, `result/
page.tsx` updated to call it instead of the shared `getProgramContent`. This
closes the collision for every past and future родові key, not just `9-9-18`
— cross-checked all 145 remaining catalog keys against all 25
`SEXUALITY_PROGRAM_NAMES` keys afterward and found no other overlaps.
**All future родові content files must be written to
`src/content/programs/ancestral/{locale}/{key}.md`, not
`src/content/programs/{locale}/{key}.md`.**

**Batch 3 (2026-08-27, 30 triples) — 30/30 DONE**, first batch written
entirely under the corrected `ancestral/` subdirectory from the start:
`5-21-16`, `5-22-17`, `6-5-17`, `6-7-19`, `6-9-21`, `6-10-22`, `6-12-6`,
`6-16-10`, `6-18-12`, `6-19-13`, `6-21-15`, `6-22-16`, `7-5-16`, `7-6-17`,
`7-7-18`, `7-8-19`, `7-9-20`, `7-11-22`, `7-16-9`, `7-17-10`, `7-18-11`,
`7-20-13`, `7-21-14`, `7-22-15`, `8-3-22`, `8-6-16`, `8-7-17`, `8-9-19`,
`8-10-20`, `8-11-21`. None resolved to karmic-tail (guaranteed by
construction — this batch's list was built only from catalog entries that
survived the earlier proactive hvost cleanup). Spot-read 3 files afterward
(`6-16-10`, `7-9-20`, `8-11-21`) — consistent template, on-theme, no
garbles; one agent self-caught and fixed a stray English word ("water") in
`6-16-10` before finalizing.

**Batch 4 (2026-08-27, 54 triples) — 54/54 DONE.** This was every remaining
catalog entry, written via 6 parallel background agents (9 each):
`8-18-10`, `8-19-11`, `8-20-12`, `8-21-13`, `8-22-14`, `9-4-22`, `9-5-14`,
`9-6-15`, `9-7-16`, `9-8-17`, `9-10-19`, `9-11-20`, `9-21-12`, `9-22-13`,
`10-3-20`, `10-5-13`, `10-5-22`, `10-6-14`, `10-8-16`, `10-9-17`, `10-9-19`,
`10-10-18`, `10-11-19`, `11-3-19`, `11-4-20`, `11-5-21`, `11-6-22`,
`11-7-14`, `11-10-17`, `11-11-18`, `12-4-19`, `12-5-20`, `12-6-21`,
`12-7-22`, `12-9-15`, `12-10-16`, `12-11-17`, `13-3-17`, `13-4-18`,
`13-5-19`, `13-6-20`, `13-8-22`, `14-5-18`, `14-7-20`, `14-8-21`, `14-9-22`,
`15-7-19`, `15-9-21`, `15-10-22`, `16-9-20`, `16-11-22`, `17-11-21`,
`17-12-22`, `18-4-22`. Zero karmic-tail hits (guaranteed by construction —
list built only from already-cleaned catalog entries), zero fetch failures.
Spot-read 3 files afterward (`10-9-19`, `17-12-22`, `13-8-22`) — consistent
template, on-theme, no garbles.

**ALL 145 родові catalog entries now have written plus/minus content**
(146 files total including the special-case `5-6-11`). Typecheck clean.
This closes out the родові content-writing project started 2026-08-27 —
only remaining open items are the ones noted elsewhere in this doc: `9-3`
(non-ancestral category, deliberately not written here), and translating
this content to `ru`/`en` (not started, same incremental-task status as the
rest of the interpretation library's translation work).

## Кармічний хвіст (karmic tail) — new feature, 2026-08-27

Same day, the user pointed out that `9-9-18` — the exact triple that had been
showing wrong (sexuality) content before the subfolder fix above — actually
has a **second, genuine catalog entry under gadalkindom's separate
`karmicheskij-hvost` system**, with a different meaning than either the
родові or sexuality readings of the same 3 numbers. `matrix.ts` already
computes this independently as `karmicTail: [karma, loveEntrance, d2]`
(`d2 = reduce(karma + loveEntrance)`) but it was wired to nothing beyond the
matrix diagram's numeric display — no name/content system existed for it.

**Formula validated the same way as ancestral programs:** computed
`karmicTail` for 24.09.1973 → `[8, 15, 5]` and for 27.08.2026 → `[9, 18, 9]`.
Applying the `outerMin-middle-outerMax` convention (middle = `d2`, exactly
mirroring `ancestralProgramKey`'s corner/axis[0]/axis[1] structure) predicts
keys `8-5-15` and `9-9-18` — both are real, exact entries in gadalkindom's
karmic-tail catalog («Сімейные страсти» / «Семейные страсти» and «Запретные
знания» respectively). 2-for-2 match, same confidence level as the original
ancestral-formula validation.

**Catalog is small and closed:** gadalkindom's karmic-tail index page
(`https://gadalkindom.ru/matritsa-sudby/karmicheskij-hvost`) states "26
программ-хвостов" exist, but only **24 cards actually link out** from that
page (verified by re-checking the "9"-leading group specifically, which
returned just 2 entries vs. 4-5 for other leading digits — no hidden 3rd/4th
entry found; the page itself is short 2 of its own claimed total). Treated
as the source's own incompleteness, not a scraping gap — the missing 2
remain unwritten with no fabricated placeholder.

**Architecture, built from scratch mirroring the ancestral fix (not
retrofitted after a bug this time):**
- `KARMIC_TAIL_PROGRAM_NAMES` in `src/lib/programs.ts` — all 24 names,
  translated to Ukrainian, keyed the same way as `ANCESTRAL_PROGRAM_NAMES`.
- `getKarmicTailInfo(matrix)` builds the key from `matrix.karmicTail`.
- Content lives in its own `src/content/programs/karmic-tail/{locale}/`
  subdirectory from day one (never shared a folder with anything else) —
  `getKarmicTailContent()` reads from there. **Confirmed real overlap with
  the родові catalog**: `6-5-17` and `6-15-9` each name a genuinely
  different program in the two catalogs (e.g. родові's `6-5-17` = «Фізична і
  духовна краса», karmic-tail's `6-5-17` = «Краса і марнославство» — related
  themes, different archetypes) — proof the subfolder separation is load-
  bearing, not just precautionary.
- `src/i18n/types.ts` + all 3 dictionaries: new `karmicTail` block
  (`title`/`teaser`/`genericNameLabel`/`comingSoon`), mirroring
  `sexualityProgram`'s shape exactly (single item, not 4 corners).
  uk/ru copy written properly; en given a plain direct translation (no
  content exists to translate yet regardless).
- `result/page.tsx`: new always-open section right after the sexuality
  block, same `ProgramList` component reused.

**Content:** all 24 available programs written in one pass (3 parallel
background agents, 8 each), same "Суть/Плюс/Мінус/Підсумок" template as
родові but with the required opening phrase "Це кармічний хвіст із минулого
життя про..." instead of "Це успадкована родова програма про...". Zero
fetch failures. Spot-read 3 files (`9-9-18`, `6-5-17`, `8-5-15`) — on-theme,
correct opening phrase, no garbles. Typecheck clean; confirmed live on the
dev server for 27.08.2026 (karmic tail = `9-9-18`, now resolving to its own
real content instead of the old cross-contamination bug or a "no data"
fallback).

### 2-number "programs" — a genuinely different category

`6-5` («Гармония и уют в доме») and `9-3` («Преодоление трудностей») are not
abbreviated triples — per the user (citing Юлія Донбравої's course material),
`6-5` is a real 2-arcana program with **no fixed third number** in the general
catalog; it names the interaction of exactly those 2 arcana. A third number
only appears when the pair shows up in a specific zone of someone's real
matrix, and how it's derived depends on the zone:
- **Health/chakra line:** the emotions (summary) value of a chakra row is
  `reduce(physical + energy)`, i.e. `reduce(corner_a + corner_b)`. For `6-5`
  this gives `6+5=11`, so the concrete triplet in that context is `5-6-11`
  (written above as «Гармонія та затишок у домі»). Not wired into any lookup
  system yet — this is content for a future chakra-context feature.
- **Personal forecast / родові channels:** adjacent arcana around the matrix
  circle add up per the normal matrix rules; the resulting third number
  varies per birth date (the user's own examples: could be 19, 14, or 12,
  depending on the person) — there's no single universal triple here.

**Resolved 2026-08-27:** `9-3` («Преодоление трудностей») is NOT part of the
родові (ancestral-corner) system at all — the user confirmed it belongs to a
different, non-ancestral gadalkindom category, unlike `6-5` which genuinely is
an ancestral 2-arcana program. `3-9-12` stays «Жіноча самотність» (the main
catalog's existing entry, unchanged); `9-3`'s content was NOT written here.
If this "Преодоление трудностей" program is wanted later, it belongs under
whatever non-ancestral program system fits its real category (see
`SEXUALITY_PROGRAM_NAMES` for the shape of that kind of catalog), not under
`ANCESTRAL_PROGRAM_NAMES`/`src/content/programs/uk`.
