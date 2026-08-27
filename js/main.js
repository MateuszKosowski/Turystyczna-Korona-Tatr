"use strict";

// Oficjalny wykaz PTT: https://www.ptt.org.pl/odznaka-turystyczna-korona-tatr/
const places = Object.freeze([
  { id: 1, name: "Rysy", height: 2503, country: "SK", type: "szczyt" },
  { id: 2, name: "Rysy", height: 2499, country: "PL", type: "szczyt" },
  { id: 3, name: "Krywań", height: 2494, country: "SK", type: "szczyt" },
  { id: 4, name: "Sławkowski Szczyt", height: 2452, country: "SK", type: "szczyt" },
  { id: 5, name: "Mała Wysoka", height: 2429, country: "SK", type: "szczyt" },
  { id: 6, name: "Lodowa Przełęcz", height: 2372, country: "SK", type: "przelecz" },
  { id: 7, name: "Koprowy Wierch", height: 2367, country: "SK", type: "szczyt" },
  { id: 8, name: "Czerwona Ławka", height: 2352, country: "SK", type: "przelecz" },
  { id: 9, name: "Bystry Przechód", height: 2314, country: "SK", type: "przelecz" },
  { id: 10, name: "Przełęcz pod Chłopkiem", height: 2307, country: "PL", type: "przelecz" },
  { id: 11, name: "Świnica", height: 2301, country: "PL", type: "szczyt" },
  { id: 12, name: "Kozi Wierch", height: 2291, country: "PL", type: "szczyt" },
  { id: 13, name: "Rohatka", height: 2288, country: "SK", type: "przelecz" },
  { id: 14, name: "Kozie Czuby", height: 2266, country: "PL", type: "szczyt" },
  { id: 15, name: "Bystra", height: 2248, country: "SK", type: "szczyt" },
  { id: 16, name: "Zadni Granat", height: 2240, country: "PL", type: "szczyt" },
  { id: 17, name: "Pośredni Granat", height: 2234, country: "PL", type: "szczyt" },
  { id: 18, name: "Jagnięcy Szczyt", height: 2229, country: "SK", type: "szczyt" },
  { id: 19, name: "Mały Kozi Wierch", height: 2228, country: "PL", type: "szczyt" },
  { id: 20, name: "Skrajny Granat", height: 2225, country: "PL", type: "szczyt" },
  { id: 21, name: "Raczkowa Czuba", height: 2194, country: "SK", type: "szczyt" },
  { id: 22, name: "Baraniec", height: 2184, country: "SK", type: "szczyt" },
  { id: 23, name: "Banówka", height: 2178, country: "SK", type: "szczyt" },
  { id: 24, name: "Starorobociański Wierch", height: 2176, country: "PL", type: "szczyt" },
  { id: 25, name: "Szpiglasowy Wierch", height: 2172, country: "PL", type: "szczyt" },
  { id: 26, name: "Pachola", height: 2166, country: "SK", type: "szczyt" },
  { id: 27, name: "Hruba Kopa", height: 2163, country: "SK", type: "szczyt" },
  { id: 28, name: "Błyszcz", height: 2159, country: "PL", type: "szczyt" },
  { id: 29, name: "Kościelec", height: 2155, country: "PL", type: "szczyt" },
  { id: 30, name: "Trzy Kopy", height: 2150, country: "SK", type: "szczyt" },
  { id: 31, name: "Wyżni Przysłop", height: 2145, country: "SK", type: "szczyt" },
  { id: 32, name: "Jarząbczy Wierch", height: 2137, country: "PL", type: "szczyt" },
  { id: 33, name: "Rohacz Płaczliwy", height: 2126, country: "SK", type: "szczyt" },
  { id: 34, name: "Krzesanica", height: 2122, country: "PL", type: "szczyt" },
  { id: 35, name: "Skrajne Solisko", height: 2117, country: "SK", type: "szczyt" },
  { id: 36, name: "Małołączniak", height: 2096, country: "PL", type: "szczyt" },
  { id: 37, name: "Ciemniak", height: 2096, country: "PL", type: "szczyt" },
  { id: 38, name: "Rohacz Ostry", height: 2088, country: "SK", type: "szczyt" },
  { id: 39, name: "Spalona", height: 2083, country: "SK", type: "szczyt" },
  { id: 40, name: "Smrek", height: 2089, country: "SK", type: "szczyt" },
  { id: 41, name: "Wołowiec", height: 2064, country: "PL", type: "szczyt" },
  { id: 42, name: "Salatyn", height: 2050, country: "SK", type: "szczyt" },
  { id: 43, name: "Rakuska Czuba", height: 2037, country: "SK", type: "szczyt" },
  { id: 44, name: "Wrota Chałubińskiego", height: 2022, country: "PL", type: "przelecz" },
  { id: 45, name: "Beskid", height: 2012, country: "PL", type: "szczyt" },
  { id: 46, name: "Kopa Kondracka", height: 2005, country: "PL", type: "szczyt" },
  { id: 47, name: "Kończysty Wierch", height: 2002, country: "PL", type: "szczyt" },
  { id: 48, name: "Kasprowy Wierch", height: 1987, country: "PL", type: "szczyt" },
  { id: 49, name: "Osterwa", height: 1984, country: "SK", type: "szczyt" },
  { id: 50, name: "Brestowa", height: 1934, country: "SK", type: "szczyt" },
  { id: 51, name: "Giewont", height: 1895, country: "PL", type: "szczyt" },
  { id: 52, name: "Rakoń", height: 1879, country: "PL", type: "szczyt" },
  { id: 53, name: "Świstowa Czuba", height: 1763, country: "PL", type: "szczyt" },
  { id: 54, name: "Ornak", height: 1854, country: "PL", type: "szczyt" },
  { id: 55, name: "Siwy Wierch", height: 1805, country: "SK", type: "szczyt" },
  { id: 56, name: "Trzydniowiański Wierch", height: 1758, country: "PL", type: "szczyt" },
  { id: 57, name: "Grześ", height: 1653, country: "PL", type: "szczyt" },
  { id: 58, name: "Gęsia Szyja", height: 1489, country: "PL", type: "szczyt" },
  { id: 59, name: "Wielki Kopieniec", height: 1328, country: "PL", type: "szczyt" },
  { id: 60, name: "Nosal", height: 1206, country: "PL", type: "szczyt" },
]);

// Dodaj numery pozycji do odpowiedniej listy, gdy potwierdzimy Wasze dotychczasowe wejścia.
const completedPlaces = {
  mateusz: new Set([]),
  artur: new Set([]),
};

const countryNames = {
  PL: "Polska",
  SK: "Słowacja",
};

const personNames = {
  mateusz: "Mateusz Kosowski",
  artur: "Artur Urbaniak",
};

const normalizeText = (value) =>
  value
    .toLocaleLowerCase("pl")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l");

function createStatusMarkup(person, placeId) {
  const isCompleted = completedPlaces[person].has(placeId);
  const stateLabel = isCompleted ? "zdobyty" : "brak wpisu";
  const symbol = isCompleted ? "✓" : "—";

  return `
    <span class="status ${isCompleted ? "status--done" : "status--empty"}">
      <span class="status-mark" aria-hidden="true">${symbol}</span>
      <span class="sr-only">${personNames[person]}: ${stateLabel}</span>
    </span>
  `;
}

function createPlaceRow(place) {
  const row = document.createElement("tr");
  const typeLabel = place.type === "przelecz" ? "Przełęcz" : "Szczyt";
  const typeClass = place.type === "przelecz" ? " type-badge--pass" : "";

  row.innerHTML = `
    <td class="column-index">${place.id}</td>
    <th class="column-place" scope="row">
      ${place.name}
      <span class="place-mobile-meta">
        <span>${String(place.id).padStart(2, "0")}</span>
        <span>${typeLabel}</span>
        <span>${place.country}</span>
        <span>${place.height} m n.p.m.</span>
      </span>
    </th>
    <td class="column-type"><span class="type-badge${typeClass}">${typeLabel}</span></td>
    <td class="column-country">
      <abbr class="country-badge" title="${countryNames[place.country]}">${place.country}</abbr>
    </td>
    <td class="column-height">${place.height} <small>m n.p.m.</small></td>
    <td class="column-person">${createStatusMarkup("mateusz", place.id)}</td>
    <td class="column-person">${createStatusMarkup("artur", place.id)}</td>
  `;

  return row;
}

function updateProfileSummaries() {
  Object.keys(completedPlaces).forEach((person) => {
    const completed = places.filter((place) => completedPlaces[person].has(place.id)).length;
    const percentage = Math.round((completed / places.length) * 100);
    const countElement = document.querySelector(`[data-completed="${person}"]`);
    const percentageElement = document.querySelector(`[data-percentage="${person}"]`);
    const progressElement = document.querySelector(`[data-progress="${person}"]`);

    if (countElement) countElement.textContent = completed;
    if (percentageElement) percentageElement.textContent = `${percentage}%`;
    if (progressElement) progressElement.style.width = `${percentage}%`;
  });
}

function initializeTable() {
  const tableBody = document.querySelector("#summits-table-body");
  const searchInput = document.querySelector("#place-search");
  const filterButtons = [...document.querySelectorAll("[data-filter]")];
  const resultCount = document.querySelector("#result-count");

  if (!tableBody || !searchInput || !resultCount) return;

  let activeFilter = "all";

  function renderTable() {
    const searchTerm = normalizeText(searchInput.value.trim());
    const filteredPlaces = places.filter((place) => {
      const matchesType = activeFilter === "all" || place.type === activeFilter;
      const searchableText = normalizeText(
        `${place.name} ${place.height} ${place.country} ${countryNames[place.country]} ${place.type}`,
      );

      return matchesType && searchableText.includes(searchTerm);
    });

    const fragment = document.createDocumentFragment();
    filteredPlaces.forEach((place) => fragment.append(createPlaceRow(place)));

    tableBody.replaceChildren(fragment);

    if (filteredPlaces.length === 0) {
      const emptyRow = document.createElement("tr");
      emptyRow.className = "no-results";
      const emptyCell = document.createElement("td");
      emptyCell.colSpan = 7;
      const title = document.createElement("strong");
      title.textContent = "Nie znaleziono takiego miejsca";
      const hint = document.createElement("span");
      hint.textContent = "Zmień wpisaną nazwę lub wybierz inny filtr.";
      emptyCell.append(title, hint);
      emptyRow.append(emptyCell);
      tableBody.append(emptyRow);
    }

    resultCount.textContent = `Wyświetlono ${filteredPlaces.length} z ${places.length} miejsc`;
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      filterButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });
      renderTable();
    });
  });

  searchInput.addEventListener("input", renderTable);
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && searchInput.value) {
      searchInput.value = "";
      renderTable();
    }
  });

  renderTable();

  if (window.location.hash) {
    window.addEventListener(
      "load",
      () => {
        window.setTimeout(() => {
          let targetId;

          try {
            targetId = decodeURIComponent(window.location.hash.slice(1));
          } catch {
            return;
          }

          const target = document.getElementById(targetId);
          if (!target) return;

          const headerHeight = document.querySelector(".site-header")?.offsetHeight ?? 0;
          const targetTop = target.offsetTop - headerHeight;
          const root = document.documentElement;
          const previousScrollBehavior = root.style.scrollBehavior;
          root.style.setProperty("scroll-behavior", "auto", "important");
          getComputedStyle(root).scrollBehavior;
          root.scrollTop = Math.max(0, targetTop);
          document.body.scrollTop = Math.max(0, targetTop);
          requestAnimationFrame(() => {
            root.style.scrollBehavior = previousScrollBehavior;
          });
        }, 0);
      },
      { once: true },
    );
  }
}

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

updateProfileSummaries();
initializeTable();
