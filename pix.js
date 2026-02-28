const pixBtn = document.getElementById("pix");
const pixModal = document.getElementById("pixModal");
const closePixModalBtn = document.getElementById("closePixModal");

if (pixBtn && pixModal && closePixModalBtn) {
  const openPixModal = () => {
    pixModal.classList.add("is-open");
    pixModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    closePixModalBtn.focus();
  };

  const closePixModal = () => {
    pixModal.classList.remove("is-open");
    pixModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    pixBtn.focus();
  };

  pixBtn.addEventListener("click", openPixModal);
  closePixModalBtn.addEventListener("click", closePixModal);

  pixModal.addEventListener("click", (event) => {
    if (event.target === pixModal) {
      closePixModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && pixModal.classList.contains("is-open")) {
      closePixModal();
    }
  });
}
