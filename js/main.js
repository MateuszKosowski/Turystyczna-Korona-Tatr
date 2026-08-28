"use strict";

function removeLocationHash() {
  if (!window.location.hash) return;

  const urlWithoutHash = window.location.href.slice(0, -window.location.hash.length);
  window.history.replaceState(window.history.state, "", urlWithoutHash);
}

function scrollToTopInstantly() {
  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;

  root.style.setProperty("scroll-behavior", "auto", "important");
  window.scrollTo(0, 0);
  root.scrollTop = 0;
  document.body.scrollTop = 0;

  requestAnimationFrame(() => {
    root.style.scrollBehavior = previousScrollBehavior;
  });
}

function initializePagePosition() {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  removeLocationHash();
  scrollToTopInstantly();
  window.addEventListener("load", scrollToTopInstantly, { once: true });
}

function initializeInternalNavigation() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      let targetId;

      try {
        targetId = decodeURIComponent(link.hash.slice(1));
      } catch {
        return;
      }

      const target = document.getElementById(targetId);
      if (!target) return;

      event.preventDefault();
      removeLocationHash();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });

      if (link.classList.contains("skip-link")) {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
        target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
      }
    });
  });
}

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
  mateusz: new Set([60]),
  artur: new Set([]),
};

// Dodawaj tu wyłącznie potwierdzone wyprawy. Brak wpisu oznacza pusty katalog.
const profileEntries = Object.freeze({
  mateusz: Object.freeze({
    60: Object.freeze({
      date: "2021-10-01",
      page: "entries/mateusz/nosal/index.html",
      route: Object.freeze({
        label: "ul. Bulwary Słowackiego → zielony szlak → Nosal",
        duration: "0:40 h",
        distanceKm: 0.9,
        ascentM: 250,
        descentM: 0,
      }),
      photos: Object.freeze([
        Object.freeze({
          src: "assets/MK/Nosal/1.webp",
          width: 1532,
          height: 1532,
          alt: "Mateusz na leśnym szlaku nad potokiem, z Tatrami w tle",
          caption: "Na leśnym odcinku szlaku",
        }),
        Object.freeze({
          src: "assets/MK/Nosal/2.webp",
          width: 1531,
          height: 1532,
          alt: "Skalisty szlak na Nosalu pośród jesiennego lasu",
          caption: "Skalisty grzbiet Nosala",
        }),
        Object.freeze({
          src: "assets/MK/Nosal/3.webp",
          width: 1532,
          height: 1531,
          alt: "Mateusz siedzący na skałach na szczycie Nosala",
          caption: "Na szczycie Nosala",
        }),
      ]),
    }),
  }),
  artur: Object.freeze({}),
});

const FOLDER_PREVIEW_LIMIT = 12;

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
    const stage = completed >= 60
      ? "Złota Odznaka"
      : completed >= 40
        ? "Srebrna Odznaka"
        : completed >= 20
          ? "Brązowa Odznaka"
          : "Początek drogi";
    const galleryCount = Object.values(profileEntries[person] ?? {}).filter(
      (entry) => Array.isArray(entry.photos) && entry.photos.length > 0,
    ).length;

    document.querySelectorAll(`[data-completed="${person}"]`).forEach((element) => {
      element.textContent = completed;
    });
    document.querySelectorAll(`[data-percentage="${person}"]`).forEach((element) => {
      element.textContent = `${percentage}%`;
    });
    document.querySelectorAll(`[data-progress="${person}"]`).forEach((element) => {
      element.style.width = `${percentage}%`;
    });
    document.querySelectorAll(`[data-progressbar="${person}"]`).forEach((element) => {
      element.setAttribute("aria-valuenow", String(completed));
    });
    document.querySelectorAll(`[data-to-bronze="${person}"]`).forEach((element) => {
      element.textContent = Math.max(0, 20 - completed);
    });
    document.querySelectorAll(`[data-gallery-count="${person}"]`).forEach((element) => {
      element.textContent = galleryCount;
    });
    document.querySelectorAll(`[data-stage="${person}"]`).forEach((element) => {
      element.textContent = stage;
    });
  });
}

function getPhotoCount(person, placeId) {
  const photos = profileEntries[person]?.[placeId]?.photos;
  return Array.isArray(photos) ? photos.length : 0;
}

function formatPhotoCount(count) {
  if (count === 1) return "1 zdjęcie";

  const lastTwoDigits = count % 100;
  const lastDigit = count % 10;
  const usesFewForm = lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14);

  return `${count} ${usesFewForm ? "zdjęcia" : "zdjęć"}`;
}

function formatEntryDate(value, style = "long") {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return value;

  if (style === "short") {
    return `${String(day).padStart(2, "0")}.${String(month).padStart(2, "0")}.${year}`;
  }

  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

function createFolderCard(place, person) {
  const entry = profileEntries[person]?.[place.id];
  const hasPage = Boolean(entry?.page);
  const card = document.createElement(hasPage ? "a" : "article");
  const isCompleted = completedPlaces[person]?.has(place.id) ?? false;
  const photoCount = getPhotoCount(person, place.id);
  const typeLabel = place.type === "przelecz" ? "Przełęcz" : "Szczyt";
  const accessibleDate = entry?.date ? formatEntryDate(entry.date) : "data do uzupełnienia";
  const dateMarkup = entry?.date
    ? `<time class="folder-date" datetime="${entry.date}">Zdobyty ${formatEntryDate(entry.date, "short")}</time>`
    : "";

  card.className = `folder-card${isCompleted ? " is-completed" : " is-empty"}${hasPage ? " has-gallery" : ""}`;
  if (hasPage) {
    card.href = entry.page;
    card.setAttribute(
      "aria-label",
      `Otwórz galerię: ${place.name}, ${accessibleDate}, ${formatPhotoCount(photoCount)}`,
    );
  }
  card.innerHTML = `
    <div class="folder-card-topline">
      <span class="folder-index">${String(place.id).padStart(2, "0")}</span>
      <span class="folder-photo-count">${formatPhotoCount(photoCount)}</span>
    </div>
    <span class="folder-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d="M2.5 6.5h6l2 2h11v10.5h-19z"></path>
        <path d="M2.5 9h19"></path>
      </svg>
    </span>
    <div class="folder-card-copy">
      <p>${typeLabel} <span aria-hidden="true">·</span> ${place.height} m n.p.m.</p>
      <h3>${place.name}</h3>
      ${dateMarkup}
    </div>
    <div class="folder-card-footer">
      <span class="folder-state"><i aria-hidden="true"></i>${hasPage ? "Otwórz galerię" : isCompleted ? "Zdobyty" : "Brak wpisu"}</span>
      <abbr title="${countryNames[place.country]}">${place.country}</abbr>
    </div>
  `;

  return card;
}

function initializeProfileFolders() {
  const grid = document.querySelector("#profile-folders");
  const searchInput = document.querySelector("#folder-search");
  const filterButtons = [...document.querySelectorAll("[data-folder-filter]")];
  const resultCount = document.querySelector("#folder-result-count");
  const toggleButton = document.querySelector("#folder-toggle");

  if (!grid || !searchInput || !resultCount || !toggleButton) return;

  const person = grid.dataset.profile;
  if (!person || !completedPlaces[person]) return;

  let activeFilter = "all";
  let showAll = false;

  function renderFolders() {
    const searchTerm = normalizeText(searchInput.value.trim());
    const hasActiveCriteria = Boolean(searchTerm) || activeFilter !== "all";
    const completedProfilePlaces = places
      .filter((place) => completedPlaces[person].has(place.id))
      .sort((firstPlace, secondPlace) => {
        const firstDate = profileEntries[person]?.[firstPlace.id]?.date;
        const secondDate = profileEntries[person]?.[secondPlace.id]?.date;

        if (firstDate && secondDate) return firstDate.localeCompare(secondDate);
        if (firstDate) return -1;
        if (secondDate) return 1;
        return firstPlace.id - secondPlace.id;
      });
    const filteredPlaces = completedProfilePlaces.filter((place) => {
      const matchesType = activeFilter === "all" || place.type === activeFilter;
      const searchableText = normalizeText(
        `${place.name} ${place.height} ${place.country} ${countryNames[place.country]} ${place.type}`,
      );

      return matchesType && searchableText.includes(searchTerm);
    });
    const visiblePlaces = showAll || hasActiveCriteria
      ? filteredPlaces
      : filteredPlaces.slice(0, FOLDER_PREVIEW_LIMIT);

    if (visiblePlaces.length === 0) {
      const emptyMessage = document.createElement("p");
      emptyMessage.className = "folder-no-results";
      emptyMessage.textContent = "Nie znaleziono katalogu pasującego do wybranych kryteriów.";
      grid.replaceChildren(emptyMessage);
    } else {
      const fragment = document.createDocumentFragment();
      visiblePlaces.forEach((place) => fragment.append(createFolderCard(place, person)));
      grid.replaceChildren(fragment);
    }

    resultCount.textContent = `Wyświetlono ${visiblePlaces.length} z ${filteredPlaces.length} katalogów`;

    const canToggle = !hasActiveCriteria && filteredPlaces.length > FOLDER_PREVIEW_LIMIT;
    toggleButton.hidden = !canToggle;
    if (canToggle) {
      toggleButton.querySelector("span").textContent = showAll
        ? "Pokaż mniej katalogów"
        : `Pokaż wszystkie katalogi (${filteredPlaces.length})`;
      toggleButton.classList.toggle("is-expanded", showAll);
    }
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.folderFilter;
      filterButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });
      renderFolders();
    });
  });

  searchInput.addEventListener("input", renderFolders);
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && searchInput.value) {
      searchInput.value = "";
      renderFolders();
    }
  });

  toggleButton.addEventListener("click", () => {
    showAll = !showAll;
    renderFolders();
  });

  renderFolders();
}

function initializeEntryPage() {
  const entryPage = document.querySelector("[data-entry-person][data-entry-place]");
  if (!entryPage) return;

  const person = entryPage.dataset.entryPerson;
  const placeId = Number(entryPage.dataset.entryPlace);
  const place = places.find((item) => item.id === placeId);
  const entry = profileEntries[person]?.[placeId];

  if (!place || !entry) return;

  document.querySelectorAll("[data-entry-name]").forEach((element) => {
    element.textContent = place.name;
  });
  document.querySelectorAll("[data-entry-height]").forEach((element) => {
    element.textContent = place.height;
  });
  document.querySelectorAll("[data-entry-country]").forEach((element) => {
    element.textContent = countryNames[place.country];
  });
  document.querySelectorAll("[data-entry-date]").forEach((element) => {
    element.textContent = formatEntryDate(entry.date);
    element.setAttribute("datetime", entry.date);
  });
  document.querySelectorAll("[data-entry-photo-count]").forEach((element) => {
    element.textContent = formatPhotoCount(entry.photos.length);
  });

  const gallery = document.querySelector("#entry-gallery");
  if (gallery) {
    const fragment = document.createDocumentFragment();

    entry.photos.forEach((photo, index) => {
      const link = document.createElement("a");
      link.className = "gallery-tile";
      link.href = photo.src;
      link.dataset.galleryItem = "";
      link.dataset.caption = photo.caption;
      link.setAttribute(
        "aria-label",
        `Otwórz zdjęcie ${index + 1} z ${entry.photos.length}: ${photo.caption}`,
      );
      link.innerHTML = `
        <img
          src="${photo.src}"
          alt="${photo.alt}"
          width="${photo.width}"
          height="${photo.height}"
          loading="${index < 4 ? "eager" : "lazy"}"
          decoding="async"
        >
        <span class="gallery-tile-number">${String(index + 1).padStart(2, "0")}</span>
        <span class="gallery-tile-caption">${photo.caption}</span>
        <span class="gallery-tile-open" aria-hidden="true">
          <svg viewBox="0 0 20 20"><path d="M7 3H3v4m10-4h4v4M7 17H3v-4m10 4h4v-4"></path></svg>
        </span>
      `;
      fragment.append(link);
    });

    gallery.replaceChildren(fragment);
  }

  const route = entry.route;
  const routeCard = document.querySelector("[data-route-card]");
  const routePending = document.querySelector("[data-route-pending]");
  const routeLink = document.querySelector("[data-route-link]");
  const distanceFormatter = new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 1 });

  document.querySelectorAll("[data-route-label]").forEach((element) => {
    element.textContent = route?.label ?? "Do uzupełnienia";
  });
  document.querySelectorAll("[data-route-distance]").forEach((element) => {
    const details = [];

    if (route?.duration) details.push(route.duration);
    if (Number.isFinite(route?.distanceKm)) {
      details.push(`${distanceFormatter.format(route.distanceKm)} km`);
    }

    element.textContent = details.join(" · ") || "—";
  });
  document.querySelectorAll("[data-route-ascent]").forEach((element) => {
    element.textContent = Number.isFinite(route?.ascentM) ? `${route.ascentM} m` : "—";
  });
  document.querySelectorAll("[data-route-descent]").forEach((element) => {
    element.textContent = Number.isFinite(route?.descentM) ? `${route.descentM} m` : "—";
  });

  routeCard?.classList.toggle("is-pending", !route);
  if (routePending) routePending.hidden = Boolean(route);
  if (routeLink) {
    routeLink.hidden = !route?.mapUrl;
    if (route?.mapUrl) routeLink.href = route.mapUrl;
  }
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
}

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

initializePagePosition();
initializeInternalNavigation();
updateProfileSummaries();
initializeProfileFolders();
initializeEntryPage();
initializeTable();
