document.addEventListener("DOMContentLoaded", () => { /* * Home page only. * * Calculator buttons intentionally don't navigate anywhere. * They are placeholders until the calculator pages are implemented. */
    const calculatorButtons = document.querySelectorAll(".card-button");
    calculatorButtons.forEach((button) => {
        button.addEventListener("click", () => {
            button.classList.add("clicked");
            setTimeout(() => {
                button.classList.remove("clicked");
            }, 180);
        });
    }); /* * Smooth FAQ behavior * * Only one FAQ item stays open at a time. */
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach((item) => {
        item.addEventListener("toggle", () => {
            if (!item.open) {
                return;
            }
            faqItems.forEach((otherItem) => {
                if (otherItem !== item) {
                    otherItem.removeAttribute("open");
                }
            });
        });
    });
});