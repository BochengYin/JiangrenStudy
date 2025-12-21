const liveRegion = document.querySelector("#purchase-status");
const cards = Array.from(document.querySelectorAll(".card"));

for (const card of cards) {
  const button = card.querySelector(".card__button");
  if (button) button.setAttribute("aria-pressed", "false");
}

function setSelectedCard(selectedCard) {
  for (const card of cards) {
    const isSelected = card === selectedCard;
    card.classList.toggle("is-selected", isSelected);

    const button = card.querySelector(".card__button");
    if (button) {
      button.textContent = isSelected ? "Selected" : "Purchase";
      button.setAttribute("aria-pressed", String(isSelected));
    }
  }
}

document.addEventListener("click", (event) => {
  const button = event.target.closest(".card__button");
  if (!button) return;

  const card = event.target.closest(".card");
  if (!card) return;

  const plan = card.dataset.plan || "this plan";
  setSelectedCard(card);

  if (liveRegion) liveRegion.textContent = `Selected ${plan}.`;
});
