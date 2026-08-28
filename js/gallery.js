"use strict";

function initializeGalleryLightbox() {
  const dialog = document.querySelector("#gallery-lightbox");
  const items = [...document.querySelectorAll("[data-gallery-item]")];
  const image = dialog?.querySelector("[data-lightbox-image]");
  const caption = dialog?.querySelector("[data-lightbox-caption]");
  const counter = dialog?.querySelector("[data-lightbox-counter]");
  const status = dialog?.querySelector("[data-lightbox-status]");
  const closeButton = dialog?.querySelector("[data-lightbox-close]");
  const previousButton = dialog?.querySelector("[data-lightbox-prev]");
  const nextButton = dialog?.querySelector("[data-lightbox-next]");

  if (
    !dialog ||
    items.length === 0 ||
    !image ||
    !caption ||
    !counter ||
    !status ||
    !closeButton ||
    !previousButton ||
    !nextButton
  ) {
    return;
  }

  let currentIndex = 0;
  let lastTrigger = null;
  let touchStartX = null;

  function showItem(index) {
    currentIndex = (index + items.length) % items.length;
    const item = items[currentIndex];
    const thumbnail = item.querySelector("img");

    image.src = item.href;
    image.alt = thumbnail?.alt ?? "";
    const description = item.dataset.caption ?? thumbnail?.alt ?? "Zdjęcie z galerii";

    caption.textContent = description;
    counter.textContent = `${currentIndex + 1} / ${items.length}`;
    status.textContent = `Zdjęcie ${currentIndex + 1} z ${items.length}: ${description}`;
  }

  function openLightbox(index, trigger) {
    if (typeof dialog.showModal !== "function") return;

    lastTrigger = trigger;
    showItem(index);
    dialog.showModal();
  }

  items.forEach((item, index) => {
    item.addEventListener("click", (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        typeof dialog.showModal !== "function"
      ) {
        return;
      }

      event.preventDefault();
      openLightbox(index, item);
    });
  });

  previousButton.hidden = items.length < 2;
  nextButton.hidden = items.length < 2;
  previousButton.addEventListener("click", () => showItem(currentIndex - 1));
  nextButton.addEventListener("click", () => showItem(currentIndex + 1));
  closeButton.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showItem(currentIndex - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      showItem(currentIndex + 1);
    }
  });

  dialog.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0]?.clientX ?? null;
    },
    { passive: true },
  );
  dialog.addEventListener(
    "touchend",
    (event) => {
      if (touchStartX === null) return;

      const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
      const difference = touchEndX - touchStartX;
      touchStartX = null;

      if (Math.abs(difference) < 50) return;
      showItem(currentIndex + (difference < 0 ? 1 : -1));
    },
    { passive: true },
  );

  dialog.addEventListener("close", () => {
    lastTrigger?.focus();
  });
}

initializeGalleryLightbox();
