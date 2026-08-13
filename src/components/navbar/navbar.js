document.addEventListener(
    "DOMContentLoaded",
    async () => {

        /*
         * =========================
         * FIND NAVBAR CONTAINER
         * =========================
         */

        const navbarContainer =
            document.getElementById(
                "navbar-container"
            );


        if (!navbarContainer) {
            return;
        }


        /*
         * =========================
         * DETERMINE PROJECT ROOT
         * =========================
         *
         * Home:
         * /
         *
         * Other pages:
         * /pages/
         */

        const isInsidePages =
            window.location.pathname
                .includes("/pages/");


        const navbarPath =
            isInsidePages
                ? "../components/navbar/navbar.html"
                : "components/navbar/navbar.html";


        /*
         * =========================
         * LOAD NAVBAR
         * =========================
         */

        try {

            const response =
                await fetch(navbarPath);


            if (!response.ok) {
                throw new Error(
                    "Navbar could not be loaded"
                );
            }


            const navbarHtml =
                await response.text();


            navbarContainer.innerHTML =
                navbarHtml;


        } catch (error) {

            console.error(
                "Navbar loading error:",
                error
            );

            return;

        }


        /*
         * =========================
         * FIX LINKS
         * =========================
         *
         * navbar.html is shared.
         *
         * We change paths depending
         * on current page.
         */

        if (isInsidePages) {

            const brand =
                document.querySelector(
                    ".navbar-brand"
                );

            if (brand) {
                brand.href = "../index.html";
            }


            const homeLink =
                document.querySelector(
                    '[data-page="home"]'
                );

            if (homeLink) {
                homeLink.href =
                    "../index.html";
            }


            const profitLinks =
                document.querySelectorAll(
                    '[data-page="profit"]'
                );

            profitLinks.forEach((link) => {
                link.href =
                    "profit.html";
            });


            const loanLinks =
                document.querySelectorAll(
                    '[data-page="loan"]'
                );

            loanLinks.forEach((link) => {
                link.href =
                    "loan.html";
            });


            const aboutLinks =
                document.querySelectorAll(
                    '[data-page="about"]'
                );

            aboutLinks.forEach((link) => {
                link.href =
                    "about.html";
            });


            const cta =
                document.querySelector(
                    ".navbar-cta"
                );

            if (cta) {
                cta.href =
                    "profit.html";
            }

        }


        /*
         * =========================
         * ACTIVE PAGE
         * =========================
         */

        const currentPage =
            document.body.dataset.page;


        if (currentPage) {

            const links =
                document.querySelectorAll(
                    "[data-page]"
                );


            links.forEach((link) => {

                if (
                    link.dataset.page ===
                    currentPage
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            });

        }


        /*
         * =========================
         * MOBILE MENU
         * =========================
         */

        const menuButton =
            document.getElementById(
                "navbarMenuButton"
            );


        const mobileMenu =
            document.getElementById(
                "mobileMenu"
            );


        if (
            !menuButton ||
            !mobileMenu
        ) {
            return;
        }


        menuButton.addEventListener(
            "click",
            () => {

                mobileMenu.classList.toggle(
                    "open"
                );

            }
        );


        /*
         * Close menu after navigation
         */

        const mobileLinks =
            mobileMenu.querySelectorAll(
                "a"
            );


        mobileLinks.forEach((link) => {

            link.addEventListener(
                "click",
                () => {

                    mobileMenu.classList.remove(
                        "open"
                    );

                }
            );

        });

    }
);