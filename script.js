const head = document.getElementById("site-head");
const onScroll = () => head.classList.toggle("is-scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.querySelector(button.dataset.copy);
    if (!target) return;
    const label = button.querySelector("span");
    try {
      await navigator.clipboard.writeText(target.textContent.trim());
      label.textContent = "Copied";
    } catch {
      const range = document.createRange();
      range.selectNodeContents(target);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      label.textContent = "Selected";
    }
    setTimeout(() => { label.textContent = "Copy hash"; }, 2200);
  });
});

const shots = [
  ["assets/screenshots/01.png", "Home — AMAN OS"],
  ["assets/screenshots/02.png", "Chat with sources — AMAN OS"],
  ["assets/screenshots/03.png", "Projects — AMAN OS"],
  ["assets/screenshots/04.png", "Tasks — AMAN OS"],
  ["assets/screenshots/05.png", "Agents — AMAN OS"],
  ["assets/screenshots/06.png", "Settings — AMAN OS"],
  ["assets/screenshots/07.png", "Web search with source cards — AMAN OS"],
];

const dialog = document.getElementById("shot-dialog");
const dialogImage = document.getElementById("shot-image");
const dialogCaption = document.getElementById("shot-caption");
let current = 0;

const showShot = (index) => {
  current = (index + shots.length) % shots.length;
  const [src, caption] = shots[current];
  dialogImage.src = src;
  dialogImage.alt = caption;
  dialogCaption.textContent = `${String(current + 1).padStart(2, "0")} / ${shots.length} · ${caption}`;
};

document.querySelectorAll("[data-shot]").forEach((button) => {
  button.addEventListener("click", () => {
    const index = shots.findIndex(([src]) => src === button.dataset.shot);
    showShot(index < 0 ? 0 : index);
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  });
});

document.getElementById("shot-prev").addEventListener("click", () => showShot(current - 1));
document.getElementById("shot-next").addEventListener("click", () => showShot(current + 1));
document.getElementById("shot-close").addEventListener("click", () => dialog.close());

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

dialog.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") { event.preventDefault(); showShot(current - 1); }
  if (event.key === "ArrowRight") { event.preventDefault(); showShot(current + 1); }
});
