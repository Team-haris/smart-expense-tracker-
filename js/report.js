document.addEventListener("DOMContentLoaded", () => {
  qsa("[data-export]").forEach(button => {
    button.addEventListener("click", () => {
      const type = button.dataset.export.toUpperCase();
      showToast(`${type} report prepared for download.`);
    });
  });
});
