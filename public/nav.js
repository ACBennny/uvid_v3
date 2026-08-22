/***************************************************************
 * This will hold the code for the navigating pages
 * 
****************************************************************/


// DEFINITIONS

    let hash_win;
    let hash_parts;
    let hash_pages = [];
    let last_hash_page;
    let hash_timer;

    const uvid_pg_routes = 
    {
        'landing': 
        {
            route_pbl_only: true,
            route_auth: false,
            route_member: false,
            route_atn: "initialiseLanding",
            route_title: null,
        },
        'signup': 
        {
            route_pbl_only: true,
            route_auth: false,
            route_member: false,
            route_atn: "initSignUpForm",
            route_title: "Sign Up for ACUvid V3",
        },
        'setup': 
        {
            route_pbl_only: true,
            route_auth: true,
            route_member: false,
            route_atn: null,
            route_title: "Setup your account • ACUvid V3",
        },
        'signin': 
        {
            route_pbl_only: true,
            route_auth: false,
            route_member: false,
            route_atn: "initSignInForm",
            route_title: "Sign In to ACUvid V3",
        },
        'signout': 
        {
            route_pbl_only: false,
            route_auth: true,
            route_member: false,
            route_atn: "cfrmB4SignOut",
            route_title: null,
        },
        'tou': 
        {
            route_pbl_only: false,
            route_auth: false,
            route_member: false,
            route_atn: "display_tou_",
            route_title: "Terms of Use • ACUvid V3",
        },
        'privacy': 
        {
            route_pbl_only: false,
            route_auth: false,
            route_member: false,
            route_atn: "display_privacy_",
            route_title: "Privacy • ACUvid V3",
        },
        'ad-choices': 
        {
            route_pbl_only: false,
            route_auth: false,
            route_member: false,
            route_atn: "display_ad_chc_",
            route_title: "Ad Choices & Disclaimers • ACUvid V3",
        },
        'copyright': 
        {
            route_pbl_only: false,
            route_auth: false,
            route_member: false,
            route_atn: "display_cpy_right_",
            route_title: "Copyright Act & Disclaimers • ACUvid V3",
        },
        'help': 
        {
            route_pbl_only: false,
            route_auth: false,
            route_member: false,
            route_atn: "nav_help_pgs",
            route_title: "Help Center • ACUvid V3",
        },
        'news': 
        {
            route_pbl_only: false,
            route_auth: false,
            route_member: false,
            route_atn: "page_route_error",
            route_title: "News • ACUvid V3",
        },
        

        // Requries auth
        'home': 
        {
            route_pbl_only: false,
            route_auth: true,
            route_member: true,
            route_atn: "preHomeSection",
            route_title: null,
        },
        'explore': 
        {
            route_pbl_only: false,
            route_auth: true,
            route_member: true,
            route_atn: "initCatalogBase",
            route_title: "Explore • ACUvid V3",
        },
        'my-list': 
        {
            route_pbl_only: false,
            route_auth: true,
            route_member: true,
            route_atn: "preLoadMyListPageStruct",
            route_title: "My Lists • ACUvid V3",
        },
        'tv': 
        {
            route_pbl_only: false,
            route_auth: true,
            route_member: true,
            route_atn: "preShowSection",
            route_title: null,
        },
        'movie': 
        {
            route_pbl_only: false,
            route_auth: true,
            route_member: true,
            route_atn: "preShowSection",
            route_title: null,
        },
        'watch': 
        {
            route_pbl_only: false,
            route_auth: true,
            route_member: true,
            route_atn: "initWatchPage",
            route_title: null,
        },
        'schedule': 
        {
            route_pbl_only: false,
            route_auth: true,
            route_member: true,
            route_atn: "initSchedule",
            route_title: "Schedule • ACUvid V3",
        },
        'profile': 
        {
            route_pbl_only: false,
            route_auth: true,
            route_member: true,
            route_atn: "initProfilePage",
            route_title: "Profile • ACUvid V3",
        },
        'settings': 
        {
            route_pbl_only: false,
            route_auth: true,
            route_member: true,
            route_atn: "initSettPage",
            route_title: "Settings • ACUvid V3",
        },
        'feedback': 
        {
            route_pbl_only: false,
            route_auth: false,
            route_member: false,
            route_atn: "init_FeedbackForm",
            route_title: "Feedback • ACUvid V3",
        },
    };



// ROUTING


    // Actions for successful routes
    function page_route_success(funcName)
    {
        window.scrollTo(0, 0);
        if((documentBody.classList.contains("bodystop"))) documentBody.classList.remove("bodystop");
        if((documentBody.hasAttribute("data-modal-state"))) documentBody.removeAttribute("data-modal-state");
        if((documentBody.hasAttribute("gen-menu-modal-is-dragging"))) documentBody.removeAttribute("gen-men-modal-is-dragging");
        callGlobalFunctions(funcName, null);
        preload.classList.add("preloadClose");
    }

    // Displays error message for failed routing
    function page_route_error(type)
    {
        window.scrollTo(0, 0);
        preload.classList.add("preloadClose");
        if(type === "error")
        {
            documentCtnt.innerHTML = error404Struct;
        }
        else
        {
            // shows that page is under construction
            documentCtnt.innerHTML = error503Struct;
        }
    }

    // Goes to the default fallback page
    function page_route_fallback()
    {
        return isUserSignedIn() ? "#/home" : "#/landing";
    }

    // Goes back to previous page route
    function prev_page_route()
    {
        if((last_hash_page == undefined))
        {
            window.location.hash = page_route_fallback();
            return;
        }
        window.location.hash = last_hash_page;
    }

    // Goes to the page user originally attempted accessing after signing in
    async function defer_page_route(atn = "set")
    {
        // return notification(`notifyBad`, `Defer ${atn} functionality is unavailable at this time`);
        if(atn === "get" && isUserSignedIn())
        {
            // After logging in, the attempted page is opened. If none, it defaults to the home page
            let attempt_pg_str = JSON.parse(localStorage.getItem('uvid_atmpt_pg')) || "#/home";
            localStorage.removeItem('uvid_atmpt_pg');
            window.location.hash = attempt_pg_str;
        }
        else
        {
            if((isUserSignedIn())) return;

            // Stores the page user is attempting to access
            let curr_pg = window.location.hash || "#/home";
            localStorage.removeItem('uvid_atmpt_pg');
            localStorage.setItem('uvid_atmpt_pg', JSON.stringify(curr_pg));

            window.location.hash = "#/signin";
        }
    }

    // Handles routing process
    async function page_router()
    {
        // Get the current hash value
        hash_win = window.location.hash || page_route_fallback();

        // Set last hash page
        last_hash_page = hash_pages.at(-1) || page_route_fallback();
        hash_pages.push(hash_win);

        if(hash_pages.length > 3) hash_pages = hash_pages.reverse().slice(0, 3).reverse();

        // Split into sections
        hash_parts = hash_win.split('/');

        // Display preloader
        preload.classList.remove("preloadClose");

        // Clear the navbar and doc content and scroll to the top
        documentBody.scrollTo(0, 0);
        documentCtnt.innerHTML = "";
        topNavBar.innerHTML = "";
        topNavBar.className = "topNavBar";
        sideNavBar.className = "sideNavBar";
        btmNavBar.className = "btmNavBar";
        sideNavLinks.forEach((navLink) => 
        {
            if(navLink.classList.contains("active"))
            {
                navLink.classList.remove("active");
            }
        });
        btmNavLinks.forEach((navLink) => 
        {
            if(navLink.classList.contains("active"))
            {
                navLink.classList.remove("active");
            }
        });
        if((navbarUnderlayer.classList.contains("active"))) navbarUnderlayer.classList.remove("active");


        // Find matching route
        const curr_route = uvid_pg_routes[hash_parts[1]];
        const isUsrIn = isUserSignedIn();

        // If no route is found
        if(!curr_route)
        {
            if((isUsrIn))
            {
                window.location.hash = "#/home";
                return;
            }
            return page_route_error("error");
        }

        // Update page title according to route
        documentTitle.textContent = curr_route.route_title != null ? curr_route.route_title : "Stream Movies, Tv Shows, and so much more • ACUvid V3";
        
        // Default to login page if user tries to access auth required pages
        if((curr_route.route_auth) && !(isUsrIn))
        {
            defer_page_route("#/signin");
            return;
        }

        // Defer signed-in user to homepage if on public-only page (e.g landing, signup/sign in)
        if((curr_route.route_pbl_only) && (isUsrIn))
        {
            window.location.hash = "#/home";
            return;
        }

        // Initialize navbars if user is signed in
        if((isUsrIn))
        {
            sideNavBar.classList.add("initialize");
            btmNavBar.classList.add("initialize");
        }

        // Run the routes action
        page_route_success(curr_route.route_atn);
    }


    // Listen for hash changes
    window.addEventListener('hashchange', page_router);
