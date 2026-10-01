# 5D Storage — Editorial Index v2

1 October 2026 · Current local website

[Elements](#page-elements) · [Formatting](#formatting) · [Spacing](#spacing) · [Photos and layout](#photos-and-layout)

Use the codes below to request changes. **Blue = #1784a6; green = #6bbb45.** A slash in the content column means a line break.

## Page elements

### H — Header

| Code | Element | Content |
| --- | --- | --- |
| H1 | Centered logo | 5D Storage |
| H2 | Tagline | MAKE ROOM FOR LIFE |
| H3 | Service title | Convenient Storage Services |
| H5 | Green location link and pin | Addition Hills, Mandaluyong → location section |
| H4 | Contact buttons | Contact Us on Viber / Email Us; two equal buttons side by side |

### F — Storage Spaces

| Code | Element | Content |
| --- | --- | --- |
| F1 | Heading | Storage Spaces / **from 1-to-8 sqm** (green) |
| F2 | Facility photo | Woman pushing a cart of storage boxes in the green-door corridor |
| F3 | Lower-left portrait | Approved full unit filled with belongings |
| F4 | Lower-right portrait | Approved closed green lockers |

### L — Lifestyle

| Code | Element | Content |
| --- | --- | --- |
| L1 | Heading | Keep the things. / **Make space for life.** (green) |
| L2 | Left photo | Hobby man in Wack Wack Studio |
| L3 | Upper-right photo | Shopping woman in Serendra Studio |
| L4 | Lower-right photo | Business woman packing accessories in warehouse |
| L5 | Caption | A little extra space for what matters to you. |

### T — Life’s next chapter

| Code | Element | Content |
| --- | --- | --- |
| T1 | Heading | For life's next chapter. / **Store what matters.** (green) |
| T2 | Left photo | Young couple leaving The Grove with four large suitcases |
| T3 | Left caption | Travel light. / **Keep your things.** (green) |
| T4 | Right photo | Elderly Couple A and movers outside Xavierville House |
| T5 | Right caption | A smaller home. / **A fuller life.** (green) |

### M — Location

| Code | Element | Content |
| --- | --- | --- |
| C1 | Section top divider | Thin blue line |
| C2 | Main heading | Ready to Declutter? |
| M1 | Location text | Addition Hills, Mandaluyong / **near S&R Shaw and Mandaue Foam** (green) |
| M6 | Hours | Open Mon-Sun, 6am-9pm |
| M2 | Map | Google Maps embed |
| M2a | Link inside map | Google Maps |
| M3 | Caption link below map | Google Maps |
| M4 | Entrance photo | Proposed finished entrance and reception counter |
| M5 | Entrance caption | 2nd Floor, RRI Building |

Map links point to RRI Building, 811 S Laurel Street, Addition Hills, Mandaluyong City.

### C — Bottom contact

| Code | Element | Content |
| --- | --- | --- |
| C4 | Contact buttons | Contact Us on Viber / Email Us; matches H4 |

Viber: +639171447801 · Email: sales@5dstorage.ph

### B — Footer

| Code | Element | Content |
| --- | --- | --- |
| B1 | Centered logo | 5D Storage |
| B3 | Ownership | Operated by Gorditos Inc. / All rights reserved. |

## Formatting

Poppins throughout. White background. All headings and captions centered. Green second lines use the same size and weight as their first line.

Sizes below show **390px mobile / 1440px desktop**. Fluid sizes adjust between those widths. Weight 600 = semibold; 700 = bold. Line height is a multiplier of font size.

| Style | Elements | Size mobile / desktop | Weight | Line height |
| --- | --- | --- | --- | --- |
| Service title | H3 | 22 / 36px | 600 | 1.3 |
| Main headings | F1, L1, T1, C2 | 22 / 29px | 600 | 1.3 |
| Green city link | H5 | 22 / 29px | 600 | 1.3 |
| Captions and location text | L5, T3, T5, M1, M3, M5, M6 | 13 / 18px | 700 | 1.55 |
| Contact buttons | H4, C4 | 13 / 15px | 500 | Normal |
| Uppercase tagline | H2 | 9 / 11px | 600 | Normal |
| Ownership | B3 | 11 / 13px | 400 | 1.7 |
| Map overlay link | M2a | 12 / 12px | 400 | Normal |

- Headings and H5: letter spacing −0.035em. Captions/location text: normal letter spacing. H2: 0.32em.
- All blue text uses brand blue. H5 and marked second lines use green.
- Buttons: white fill, 1.5px blue border, fully rounded; blue fill and white text on hover.
- Photos: **8px corner radius**, controlled by `--photo-radius` / `border-radius`.

### Fluid font rules

| Style | CSS size |
| --- | --- |
| H3 | clamp(22px, 3.6vw − 1px, 36px) |
| Main headings / H5 | clamp(22px, 3vw − 1px, 29px) |
| Captions / M1 / M6 | clamp(13px, 1.8vw, 18px) |
| H2 | clamp(9px, 1.1vw, 11px) |
| B3 | clamp(11px, 1.4vw, 13px) |

## Spacing

Values are the specified CSS gaps/margins/padding. **Mobile = ≤640px; desktop = >640px.** Text wrapping can affect the visible space.

### Page and header

| Control | Between / controls | Mobile / desktop |
| --- | --- | --- |
| page.width | Content width | Viewport − 32px / min(960px, viewport − 40px) |
| sections.gap | Between major sections | clamp(48px, 7vw, 84px) |
| header.top | Page top → logo | clamp(40px, 7vw, 76px) |
| header.logo-tagline | H1 → H2 | 12px |
| header.tagline-title | H2 → H3 | 30 / 38px |
| header.title-city | H3 → H5 | 12 / 14px |
| header.pin-text | Pin → city text | 8px |
| header.city-buttons | H5 → H4 | 26 / 30px |
| header.bottom | H4 → F1 | Same as sections.gap |

### Headings, photos and captions

| Control | Between / controls | Mobile / desktop |
| --- | --- | --- |
| headings.photos | F1/L1/T1 → photos | 20 / 24px |
| lifestyle.gutter | Both collage gaps | 6 / 8px |
| transitions.gutter | Between T columns | 10 / 14px |
| facility.details-gap | F2 → F3/F4 row | 20 / 24px |
| facility.details-gutter | Between F3 and F4 | 10 / 14px |
| captions.gap | Photos → L5/M3/M5 | 14px |
| transitions.caption-gap | T2→T3; T4→T5 | 12 / 14px |

### Location

| Control | Between / controls | Value |
| --- | --- | --- |
| location.divider | C1 thickness | 1px |
| location.divider-heading | C1 → C2 | 34px |
| location.heading-text | C2 → M1 | 16px |
| location.text-hours | M1 → M6 | 10px |
| location.hours-panels | M6 → visual panels | 24px |
| location.panel-gap | Between map and entrance figures | 28px vertical mobile / 14px horizontal desktop |
| location.map-label | Overlay link inset | 12px left/bottom; padding 8px vertical, 12px horizontal |
| location.scroll-offset | Anchor clearance | 24px |

### Contact and footer

| Control | Between / controls | Mobile / desktop |
| --- | --- | --- |
| buttons.width | Group maximum width | 560px; two equal columns |
| buttons.gap | Viber ↔ Email | 8 / 12px |
| buttons.height | Minimum height | 56 / 46px |
| buttons.padding | Text inset | 10px vertical; 12px horizontal |
| footer.top | C4 → B1 | 36 / 44px |
| footer.logo-copy | B1 → B3 | 18px |
| footer.bottom | B3 → page bottom | 48px |

## Photos and layout

| Group | Layout | Frame ratio |
| --- | --- | --- |
| F2 | Full content width | 2:1 |
| F3/F4 | Two equal columns on all screens, beneath F2; whole row matches F2 width | Each photo 4:5 |
| L2/L3/L4 | Two equal columns; L2 spans both rows | Whole collage: 1.55:1 mobile / 1.95:1 desktop |
| T2/T4 | Two equal columns on all screens | Each photo 3:2 |
| M2/M4 | Stacked mobile; two equal columns desktop | Each panel 3:2 |

Photos fill their frames with cover cropping. Logo width: H1 210–320px fluid; B1 210px. Location pin: 26px. Overall content stays vertical with a 960px maximum width.

Photo mood: natural phone snapshots, neutral colors, bright windows and darker indoor shadows.

## Files

[Page](public/index.html) · [Styles](public/styles.css) · [Contact settings](public/site-config.js) · [Style guide](STYLE.md)
