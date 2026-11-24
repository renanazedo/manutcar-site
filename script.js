const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

if (menuToggle instanceof HTMLButtonElement && siteNav instanceof HTMLElement) {
  document.documentElement.classList.add("has-js");
  menuToggle.hidden = false;

  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    siteNav.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute("aria-label", isExpanded ? "Abrir menu" : "Fechar menu");
    siteNav.classList.toggle("is-open", !isExpanded);
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && siteNav.classList.contains("is-open")) {
      closeMenu();
      menuToggle.focus();
    }
  });
}

const yearElement = document.querySelector("#current-year");
if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

const shareQrCode = document.querySelector("#share-qr-code");
const shareLink = document.querySelector("#share-link");
const shareError = document.querySelector("#share-error");

if (shareQrCode instanceof HTMLImageElement && shareLink instanceof HTMLAnchorElement) {
  const shareUrl = "https://renanazedo.github.io/manutcar-site/";
  shareLink.href = shareUrl;
  shareLink.hidden = false;
  shareQrCode.src = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=12&data=${encodeURIComponent(shareUrl)}`;
  shareQrCode.hidden = false;

  shareQrCode.addEventListener("error", () => {
    shareQrCode.hidden = true;
    if (shareError instanceof HTMLElement) {
      shareError.hidden = false;
    }
  }, { once: true });
}

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealElements.length > 0) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12 });

  for (const element of revealElements) {
    observer.observe(element);
  }

  document.documentElement.classList.add("reveal-ready");
}
