window.onload = () => {
  document.getElementById("loader").style.display = "none";
};

const modal = document.getElementById("modal");
const lightbox = document.getElementById("lightbox");

// ✅ CLICK CARDS
document.querySelectorAll(".site-card").forEach((card) => {
  card.addEventListener("click", () => openModal(card));
});

// ✅ OPEN MODAL
function openModal(card) {
  modal.classList.add("show");

  document.getElementById("modalTitle").textContent = card.dataset.title;
  document.getElementById("modalLocation").textContent = card.dataset.location;
  document.getElementById("modalIntro").textContent = card.dataset.intro;
  document.getElementById("modalStory").innerHTML = card.dataset.story;

  const gallery = document.getElementById("modalGallery");
  gallery.innerHTML = "";

  const images = card.dataset.images
    .split("|")
    .filter((item) => item.trim() !== "");

  for (let i = 0; i < images.length; i += 2) {
    const imgSrc = images[i];
    const caption = images[i + 1] || "";

    if (!imgSrc) continue;

    const img = document.createElement("img");
    img.src = imgSrc.trim();
    img.alt = caption.trim();

    // ✅ CLICK IMAGE → SHOW FULL IMAGE

    img.addEventListener("click", (e) => {
      e.stopPropagation(); // ✅ stops modal interfering

      const lightboxImg = document.getElementById("lightboxImg");
      const caption = document.getElementById("lightboxCaption");

      lightboxImg.src = img.src;
      caption.textContent = img.alt;

      lightbox.style.display = "flex";
    });

    gallery.appendChild(img);
  }

  document.getElementById("modalMap").src = card.dataset.map;
}

// ✅ CLOSE MODAL BUTTON
document.getElementById("closeModal").onclick = () => {
  modal.classList.remove("show");
};

// ✅ CLOSE WHEN CLICK OUTSIDE MODAL

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
  }
});

// ✅ ESC KEY CLOSE
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.classList.remove("show");
    lightbox.style.display = "none";
  }
});

// ✅ CLOSE LIGHTBOX
lightbox.onclick = () => {
  lightbox.style.display = "none";
};
