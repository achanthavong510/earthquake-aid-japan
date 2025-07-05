# earthquake-aid-japan

## Project Summary & Recent Updates

URL: https://achanthavong510.github.io/earthquake-aid-japan/

This project is a multilingual earthquake aid website for Japan, built with HTML, TailwindCSS, and Leaflet.js. It provides real-time earthquake information, emergency resources, and language support for both English and Japanese users. Below is a summary of the key features and recent improvements:

### Key Features & Improvements
- **Multilingual Support:**
  - Supports English and Japanese, with language switching and phrasebook for common emergency phrases (including Kanji, Hiragana, Katakana, and Romaji).
  - Phrasebook page (`phrases.html`) with a responsive, Tailwind-styled table.
- **Earthquake Map & Data:**
  - Uses the Wolfx JMA JSON API for real-time earthquake data.
  - Custom Leaflet markers by magnitude (red for M5+, orange for M4–4.9, blue for <M4), with accessible popups and alt text.
  - Earthquake region assignment improved using both place name mapping and latitude/longitude bounding boxes.
  - Map uses OSM France tiles for English labels.
  - Marker and list item click-to-zoom implemented.
  - Map height and info box layout improved for clarity and responsiveness.
- **Earthquake List UX:**
  - Only the 3 most recent earthquakes are shown by default, with a "View More Earthquakes" button to reveal the rest.
  - List and map refresh every 5 minutes.
  - Earthquake list items are color-coded by magnitude (red, orange, blue) for consistency with map markers.
  - Consistent spacing and layout improvements for the list.
- **UI/UX and Navigation:**
  - Homepage features four main hero buttons: Latest Earthquakes, Earthquake Resources, Earthquake Tips, and Common Emergency Phrases.
  - Standalone, mobile-friendly pages for "Earthquake Tips" and "Common Emergency Phrases".
  - "How This Map Works" info box styled for clarity and non-overlapping layout.
  - Official Resources section uses modern Tailwind cards and updated content.
  - Consistent section spacing and improved responsiveness.
- **Other Improvements:**
  - City/location names in the earthquake list are translated to English using a manual mapping approach.
  - All dark mode features and code have been removed (site is now light mode only).
  - Various UI tweaks for spacing, font size, and accessibility.
  - GitHub link and resource descriptions updated as needed.

---

For more details, see the code and documentation in this repository.
