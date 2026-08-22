

/*************************************************************
 * This is the script for the policies page of ACUvid V3
 * 
 * @name (Anyanwu_Benedict_Chukwuemeka)
 * @version (v0.01)
 *************************************************************/

    const uvidplus_tou_ = 
    `
            <div class="error_bdr">
                <div class="error_box">
                    <div class="error_note">
                        <div class="header">
                            <h1 class="header_note hN1">T</h1>
                            <h1 class="header_note hN2">O</h1>
                            <h1 class="header_note hN3">U</h1>
                        </div>
                        <div class="middle">
                            <h3 class="mid_Title">Terms Of Use</h3>
                            <p class="mid_Note">
                                ACUvid V3 ("Uvid", "ACUvid", "we", "us") is a project developed by the GitHub account
                                <a class="goToHome" href="https://github.com/ACBennny" target="_blank">acbennny</a> 
                                and accessible for free as a static "demo" through 
                                <a class="goToHome" href="https://acuvid-v3.netlify.app" target="_blank">acuvid-v3.netlify.app</a>
                                which simulates the user interface and user experience of a streaming platform.
                                It is provided as is, without warranty, and without guarantee, of any kind.
                                <br><br>
                                By creating an account on 
                                <a class="goToHome" href="https://acuvid-v3.netlify.app" target="_blank">ACUvid V3</a>,
                                you voluntaringly agree to respect, value, uphold, and be binded by these terms. 
                                <br>
                                Likewise, by deleting your
                                <a class="goToHome" href="https://acuvid-v3.netlify.app" target="_blank">ACUvid V3</a> account,
                                you are immediately relieved of these terms.
                                <br><br>
                                As ACUvid V3 is simulating a streaming service, you may see elements or components of the demo that appear to conflict with our policy. 
                                In any conflicts of interest, our terms of use, and privacy policy remain absolute.
                                <br><br>
                                Note that this policy can be updated at any time without prior notification.
                            </p>
                        </div>
                        <div class="footer">
                            <div class="logoBox">
                                <a onclick="window.location.hash = page_route_fallback()" class="logo">
                                    <h2 class="logo1">U</h2>
                                    <h2 class="logo2">VID+</h2>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    `;

    const uvidplus_privacy_ = 
    `
        <div class="error_bdr">
            <div class="error_box">
                <div class="error_note">
                    <div class="header">
                        <h1 class="header_note hN1">P</h1>
                        <h1 class="header_note hN2">rivacy</h1>
                        <h1 class="header_note hN3">!</h1>
                    </div>
                    <div class="middle">
                        <h3 class="mid_Title">Privacy</h3>
                        <p class="mid_Note">
                            ACUvid V3 does not store anything. It is merely a static page.
                            <br><br>
                            Note that this policy can be updated at any time without prior notification.
                        </p>
                    </div>
                    <div class="footer">
                        <div class="logoBox">
                            <a onclick="window.location.hash = page_route_fallback()" class="logo">
                                <h2 class="logo1">U</h2>
                                <h2 class="logo2">VID+</h2>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    const uvidplus_ad_chc = 
    `
        <div class="error_bdr">
            <div class="error_box">
                <div class="error_note">
                    <div class="header">
                        <h1 class="header_note hN1">Ad</h1>
                        <h1 class="header_note hN2">Choices</h1>
                        <h1 class="header_note hN3">✓</h1>
                    </div>
                    <div class="middle">
                        <h3 class="mid_Title">Ad Choices</h3>
                        <p class="mid_Note">
                            ACUvid V3 does NOT in itself provide any ADs on its platform.
                            <br><br>
                            Note that this policy can be updated at any time without prior notification.
                        </p>
                    </div>
                    <div class="footer">
                        <div class="logoBox">
                            <a onclick="window.location.hash = page_route_fallback()" class="logo">
                                <h2 class="logo1">U</h2>
                                <h2 class="logo2">VID+</h2>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;



    const uvidplus_cpy_right_ = 
    `
        <div class="error_bdr">
            <div class="error_box">
                <div class="error_note">
                    <div class="header">
                        <h1 class="header_note hN1">C</h1>
                        <h1 class="header_note hN2">opyright</h1>
                        <h1 class="header_note hN3">©</h1>
                    </div>
                    <div class="middle">
                        <h3 class="mid_Title">Copyright Disclaimer</h3>
                        <p class="mid_Note">
                            ACUvid V3 does NOT host/distribute any media files. Sample data for the static page is provided by TMDB.
                            <br><br>
                            Note that this policy can be updated at any time without prior notification.
                        </p>
                    </div>
                    <div class="footer">
                        <div class="logoBox">
                            <a onclick="window.location.hash = page_route_fallback()" class="logo">
                                <h2 class="logo1">U</h2>
                                <h2 class="logo2">VID+</h2>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    function display_tou_()
    {
        // Remove side & bottom navbars
        sideNavBar.classList.add("hidden");
        btmNavBar.classList.add("hidden");

        // Insert topNavBar struct
        topNavBar.insertAdjacentHTML(`beforeend` , topNavBarStruct);
        topNavBar.classList.add("initialize");
        attachReturnToHomePageListeners();

        // Insert the tou struct
        documentCtnt.insertAdjacentHTML(`beforeend` , uvidplus_tou_);
    }

    function display_privacy_()
    {
        // Remove side & bottom navbars
        sideNavBar.classList.add("hidden");
        btmNavBar.classList.add("hidden");
    
        // Insert topNavBar struct
        topNavBar.insertAdjacentHTML(`beforeend` , topNavBarStruct);
        topNavBar.classList.add("initialize");
        attachReturnToHomePageListeners();
    
        // Insert the tou struct
        documentCtnt.insertAdjacentHTML(`beforeend` , uvidplus_privacy_);
    }

    function display_ad_chc_()
    {
        // Remove side & bottom navbars
        sideNavBar.classList.add("hidden");
        btmNavBar.classList.add("hidden");
    
        // Insert topNavBar struct
        topNavBar.insertAdjacentHTML(`beforeend` , topNavBarStruct);
        topNavBar.classList.add("initialize");
        attachReturnToHomePageListeners();
    
        // Insert the tou struct
        documentCtnt.insertAdjacentHTML(`beforeend` , uvidplus_ad_chc);
    }

    
    function display_cpy_right_()
    {
        // Remove side & bottom navbars
        sideNavBar.classList.add("hidden");
        btmNavBar.classList.add("hidden");
    
        // Insert topNavBar struct
        topNavBar.insertAdjacentHTML(`beforeend` , topNavBarStruct);
        topNavBar.classList.add("initialize");
        attachReturnToHomePageListeners();
    
        // Insert the tou struct
        documentCtnt.insertAdjacentHTML(`beforeend` , uvidplus_cpy_right_);
    }
    