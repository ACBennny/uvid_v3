/***************************************************************
 * This will hold the code for the Search Interface and Engine
 * 
****************************************************************/


// DECLARATIONS

    const catalogStruct = 
    `
        <div class="catalogBase">
            <div class="catalogBdr">
                <div class="catalogBox">
                    <div class="toggleCatFiltbdr">
                        <div class="toggleCatFiltBox">
                            <button type="button" class="genBtnBox greySolidBtn toggleCatFiltBtn" title="Toggle filters">
                                <div class="genBtnIcon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="genBtnSvg">
                                        <path d="M19 3H5c-1.414 0-2.121 0-2.56.412S2 4.488 2 5.815v.69c0 1.037 0 1.556.26 1.986s.733.698 1.682 1.232l2.913 1.64c.636.358.955.537 1.183.735c.474.411.766.895.898 1.49c.064.284.064.618.064 1.285v2.67c0 .909 0 1.364.252 1.718c.252.355.7.53 1.594.88c1.879.734 2.818 1.101 3.486.683S15 19.452 15 17.542v-2.67c0-.666 0-1 .064-1.285a2.68 2.68 0 0 1 .899-1.49c.227-.197.546-.376 1.182-.735l2.913-1.64c.948-.533 1.423-.8 1.682-1.23c.26-.43.26-.95.26-1.988v-.69c0-1.326 0-1.99-.44-2.402C21.122 3 20.415 3 19 3" />
                                    </svg>
                                </div>
                                <span class="genBtnText">Filter</span>
                            </button>
                        </div>
                    </div>
                    <div class="catalogHeadBdr">
                        <div class="catalogHeadBcg">
                            <div class="catalogHeadBox">
                                <div class="catalogHeadTitleBox">
                                    <div class="catalogHeadTitleText">Filter</div>
                                </div>
                                <div class="catalogFilterBdr">
                                    <div class="catalogFilterBox"></div>
                                </div>
                                <div class="catalogHeadTitleBox">
                                    <div class="catalogHeadTitleText">Genre</div>
                                </div>
                                <div class="catalogGenreBdr">
                                    <div class="catalogGenreBox"></div>
                                </div>
                                <div class="catalogActionBdr">
                                    <div class="catalogActionBox">
                                        <button type="button" class="genBtnBox midSolidBtn applycatFiltBtn" title="Apply selected filters">
                                            <div class="genBtnIcon">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="genBtnSvg">
                                                    <path d="m11.4 18.161l7.396-7.396a10.3 10.3 0 0 1-3.326-2.234a10.3 10.3 0 0 1-2.235-3.327L5.839 12.6c-.577.577-.866.866-1.114 1.184a6.6 6.6 0 0 0-.749 1.211c-.173.364-.302.752-.56 1.526l-1.362 4.083a1.06 1.06 0 0 0 1.342 1.342l4.083-1.362c.775-.258 1.162-.387 1.526-.56q.647-.308 1.211-.749c.318-.248.607-.537 1.184-1.114m9.448-9.448a3.932 3.932 0 0 0-5.561-5.561l-.887.887l.038.111a8.75 8.75 0 0 0 2.092 3.32a8.75 8.75 0 0 0 3.431 2.13z" />
                                                </svg>
                                            </div>
                                            <span class="genBtnText">Apply</span>
                                        </button>
                                        <button type="button" class="genBtnBox greySolidBtn clearCatalogFilters" title="Clear all filters">
                                            <div class="genBtnIcon">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="genBtnSvg">
                                                    <path d="M3 6.524c0-.395.327-.714.73-.714h4.788c.006-.842.098-1.995.932-2.793A3.68 3.68 0 0 1 12 2a3.68 3.68 0 0 1 2.55 1.017c.834.798.926 1.951.932 2.793h4.788c.403 0 .73.32.73.714a.72.72 0 0 1-.73.714H3.73A.72.72 0 0 1 3 6.524"></path>
                                                    <path fill-rule="evenodd" d="M11.596 22h.808c2.783 0 4.174 0 5.08-.886c.904-.886.996-2.34 1.181-5.246l.267-4.187c.1-1.577.15-2.366-.303-2.866c-.454-.5-1.22-.5-2.753-.5H8.124c-1.533 0-2.3 0-2.753.5s-.404 1.289-.303 2.866l.267 4.188c.185 2.906.277 4.36 1.182 5.245c.905.886 2.296.886 5.079.886m-1.35-9.811c-.04-.434-.408-.75-.82-.707c-.413.043-.713.43-.672.864l.5 5.263c.04.434.408.75.82.707c.413-.044.713-.43.672-.864zm4.329-.707c.412.043.713.43.671.864l-.5 5.263c-.04.434-.409.75-.82.707c-.413-.044-.713-.43-.672-.864l.5-5.264c.04-.433.409-.75.82-.707" clip-rule="evenodd"></path>
                                                </svg>
                                            </div>
                                            <span class="genBtnText">Clear</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="catalogResultBdr">
                        <div class="catalogResultTitleBox"></div>
                        <div class="emptyResultBdr">
                            <div class="emptyResultBox">
                                <div class="emptyResultText">Oops!</div>
                                <div class="emptyResultText">No results found :(</div>
                            </div>
                        </div>
                        <div class="catalogResultBox basicCatalogBox"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    const searchstruct = 
    `
        <div class="catalogSearchBase search_atv">
            <div class="catalogSearchBdr">
                <div class="catalogSearchInputIcon catalogSearchInputLeftIcon openCatalogSearchInputCoverIcon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="catalogSearchInputSvg">
                        <path fill-rule="evenodd" d="M10.53 5.47a.75.75 0 0 1 0 1.06l-4.72 4.72H20a.75.75 0 0 1 0 1.5H5.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0" clip-rule="evenodd" />
                    </svg>
                </div>
                <div class="catalogSearchInputIcon catalogSearchInputLeftIcon catalogSearchFieldIcon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="catalogSearchInputSvg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 2.75a8.75 8.75 0 1 0 0 17.5a8.75 8.75 0 0 0 0-17.5M1.25 11.5c0-5.66 4.59-10.25 10.25-10.25S21.75 5.84 21.75 11.5c0 2.56-.939 4.902-2.491 6.698l3.271 3.272a.75.75 0 1 1-1.06 1.06l-3.272-3.271A10.2 10.2 0 0 1 11.5 21.75c-5.66 0-10.25-4.59-10.25-10.25"/>
                    </svg>
                </div>
                <div class="catalogSearchBox">
                    <input type="search" inputmode="search" name="catalogSearchFieldName" id="catalogSearchFieldId" class="catalogSearchFieldClass" placeholder="What do you want to watch?">
                    <label for="catalogSearchFieldId" class="catalogSearchInputIcon catalogSearchInputRightIcon catalogSearchInputClearIcon">
                        <svg transform="scale(0.75)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="catalogSearchInputSvg">
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                        </svg>
                    </label>
                </div>
            </div>
        </div>
    `;
    let catalogBase;
    let catalogParamsOrder = ["search", "sort", "format", "score", "year", "lang", "genre"];
    let catalogURLandQueryCombine;
    let catalogURLParams;
    let catalogURLSearchParam;
    let catalogURLSortParam;
    let catalogURLFormatParam;
    let catalogURLScoreParam;
    let catalogURLYearParam;
    let catalogURLLangParam;
    let catalogURLGenreParam;
    let catalogSearchQuery = "";
    let catalogSearchBdr;
    let catalogSearchInputCover;
    let openCatalogSearchInputCoverIcon;
    let catalogSearchInput;
    let catalogSearchXmark;
    let toggleCatFiltBtn;
    let catalogHeadBdr;
    let catalogResultBox;
    let clearCatalogFilters;
    let catalogFilterBdr;
    let catalogFilterBox;
    let catalogFilterSelect;
    let catalogGenreBox;
    let catalogGenreCards;
    let catalogFilterDisplayBtn;
    let catalogFilterListMenu;
    let catalogResultTitleBox;
    let noResultsFound;
    let applycatFiltBtn;
    let currFilterMenuIndex = null;
    let sortParam = 
    { 
        key: '', 
        order: 'asc' 
    };
    let selectedGenres = [];
    let selectedFilters = 
    {
        search: "",
        format: "",
        score: "",
        year: "",
        language: "",
        genres: [],
    };
    const ctgYrLwrBnd = 1960;
    const ctgYrUprBnd = new Date().getFullYear();
    let ctgYrCurr = ctgYrUprBnd;



// CATALOG URL PARAMS

    // Initializing URL Params
    function initURLParams()
    {
        sideNavLinks[1].classList.add("active");
        btmNavLinks[1].classList.add("active");

        // Get current url params
        catalogURLParams = new URLSearchParams(hash_parts[2]);

        // Check if any parameter is missing and add it if necessary
        catalogParamsOrder.forEach(param => 
        {
            if (!catalogURLParams.has(param)) 
            {
                // Add missing parameter with an empty value
                catalogURLParams.set(param, '');
            }
        });

        // Rebuild the URL in the original order
        const newUrl = `#/explore/?${catalogParamsOrder.map(param => `${param}=${catalogURLParams.get(param).toLowerCase()}`).join('&')}`;

        // Update the URL without reloading the page
        window.history.replaceState(null, '', newUrl);

        // Getting each param value
        catalogURLSearchParam = catalogURLParams.get(`${catalogParamsOrder[0]}`);
        catalogURLSortParam = catalogURLParams.get(`${catalogParamsOrder[1]}`);
        catalogURLFormatParam = catalogURLParams.get(`${catalogParamsOrder[2]}`);
        catalogURLScoreParam = catalogURLParams.get(`${catalogParamsOrder[3]}`);
        catalogURLYearParam = catalogURLParams.get(`${catalogParamsOrder[4]}`);
        catalogURLLangParam = catalogURLParams.get(`${catalogParamsOrder[5]}`);
        catalogURLGenreParam = catalogURLParams.get(`${catalogParamsOrder[6]}`);

        // Combining params
        catalogURLandQueryCombine = `#/explore/?search=${catalogURLSearchParam}&sort=${catalogURLSortParam}&format=${catalogURLFormatParam}&year=${catalogURLYearParam}&lang=${catalogURLLangParam}&genre=${catalogURLGenreParam}`;
    }

    // Updating URL Params
    function updateURLParams(theURLParam, paramValue)
    {
        // Set the given param
        catalogURLParams.set(theURLParam , paramValue);

        // Rebuild the URL in the original order
        const newUrl = `#/explore/?${catalogParamsOrder.map(param => `${param}=${catalogURLParams.get(param).toLowerCase()}`).join('&')}`;

        // Update the URL without reloading the page
        window.history.replaceState(null, '', newUrl);
    }



// INITIALIZING THE CATALOG BASE

    function initCatalogBase()
    {
        // DOM Insertions
        documentCtnt.insertAdjacentHTML(`afterbegin` , catalogStruct);
        topNavBar.insertAdjacentHTML(`afterbegin` , searchstruct);
        topNavBar.classList.add("initialize");

        // Get/Set URL Params
        initURLParams();

        // Attach Input sanitization listeners
        preSanitizaUserInput();

        // Definitions
        catalogSearchQuery = '';
        catalogBase = document.querySelector(".catalogBase");
        catalogSearchBdr = document.querySelector(".catalogSearchBdr");
        catalogSearchInput = document.querySelector('#catalogSearchFieldId');
        catalogSearchXmark = document.querySelector(".catalogSearchInputClearIcon");
        toggleCatFiltBtn = document.querySelector(".toggleCatFiltBtn");
        catalogHeadBdr = document.querySelector(".catalogHeadBdr");
        catalogResultBox = document.querySelector(".basicCatalogBox");
        clearCatalogFilters = document.querySelector(".clearCatalogFilters");
        catalogFilterBdr = document.querySelector(".catalogFilterBdr");
        catalogFilterBox = document.querySelector(".catalogFilterBox");
        catalogGenreBox = document.querySelector(".catalogGenreBox");
        catalogResultTitleBox = document.querySelector(".catalogResultTitleBox");
        noResultsFound = document.querySelector(".emptyResultBdr");
        applycatFiltBtn = document.querySelector(".applycatFiltBtn");

        // Update catalog search Input and add event listener   
        catalogSearchInput.setAttribute(`value` , `${catalogURLSearchParam}`);

        // Get matching results & Hide/Unhide x-mark button while typing
        catalogSearchInput.addEventListener("input", () => 
        {
            if(catalogSearchInput.value.length > 0)
            {
                catalogSearchXmark.classList.add("isTyping");
            }
            else
            {
                catalogSearchXmark.classList.remove("isTyping");
            }
            getFilterAndSortInput();
        });

        // Close filters while typing
        catalogSearchInput.addEventListener("click" , (e) => 
        {
            catalogHeadBdr.classList.remove("show");
        });

        // Get matching results
        catalogSearchInput.addEventListener("keyup" , (e) => 
        {
            if((typeof e !== "undefined") && (typeof e.key !== "undefined") && (e.key.toLowerCase() === "enter"))
            {
                catalogSearchInput.blur();
                getFilterAndSortInput();
            }
        });

        // Clear Search field
        catalogSearchXmark.addEventListener("click" , () => 
        {
            catalogSearchInput.value = "";
            catalogSearchQuery = "";
            catalogSearchXmark.classList.remove("isTyping");
        });

        // Open/Close filters
        toggleCatFiltBtn.addEventListener("click" , () => 
        {
            catalogHeadBdr.classList.toggle("show");
        });

        // Apply filters
        applycatFiltBtn.addEventListener("click" , getFilterAndSortInput);

        // Clear all filters
        clearCatalogFilters.addEventListener("click" , () => 
        {
            clrCtgFilters();
        });

        // Initialize filters
        initCatalogFilters();

        // Focus on search bar
        catalogSearchInput.focus();
    }



// INITIALIZING CATALOG FILTERS

    // Importing from inventory
    function initCatalogFilters()
    {
        // Generate the filter cards to contain the filter menus
        for(let i = 0; i < filterInv.length; i++)
        {
            let catFiltBdr = document.createElement("div");
            catFiltBdr.classList.add("catalogFilterCardBdr");

            let catFiltBox = document.createElement("div");
            catFiltBox.classList.add("catalogFilterCardBox");
            catFiltBox.innerHTML = 
            `
                    <div class="catalogFilterDisplayIcon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="catalogFilterDisplaySvg">
                            <path fill-rule="evenodd" d="M13.698 3.314a.75.75 0 0 1 .809.133l6 5.5a.75.75 0 0 1-1.014 1.106L14.75 5.705V20a.75.75 0 0 1-1.5 0V4a.75.75 0 0 1 .448-.687M10 3.25a.75.75 0 0 1 .75.75v16a.75.75 0 0 1-1.257.553l-6-5.5a.75.75 0 0 1 1.014-1.106l4.743 4.348V4a.75.75 0 0 1 .75-.75" clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <div class="catalogFilterTitleBox">
                        <div class="catalogFilterTitleText">${filterInv[i].category}</div>
                    </div>
            `;

            // Create the selctor bdr
            let catSelBdr = document.createElement("div");
            catSelBdr.classList.add("catalogFilterSelectBdr");

            // Create the selector element
            let catSelBox = document.createElement("select");
            catSelBox.classList.add("catalogFilterSelectBox");
            catSelBox.setAttribute(`name` , `${filterInv[i].category.toLowerCase()}`);
            catSelBox.setAttribute(`id` , `filter_${filterInv[i].category.toLowerCase()}`);
            catSelBox.innerHTML = `<option value="">Any</option>`;

            for(let j = 0; j < filterInv[i].options.length; j++)
            {
                if((filterInv[i].category.toLowerCase() === "sort"))
                {
                    catSelBox.insertAdjacentHTML(
                        `beforeend`,
                        `
                            <option value="${filterInv[i].options[j].opt_value},${filterInv[i].options[j].opt_order}">${filterInv[i].options[j].opt_name}</option>
                        `
                    );
                }
                else if((filterInv[i].category.toLowerCase() === "adult"))
                {
                    catSelBox.insertAdjacentHTML(
                        `beforeend`,
                        `
                            <option value="${filterInv[i].options[j].opt_value}">${filterInv[i].options[j].opt_name}</option>
                        `
                    );
                }
                else if((filterInv[i].category.toLowerCase() === "origin"))
                {
                    catSelBox.insertAdjacentHTML(
                        `beforeend`,
                        `
                            <option value="${filterInv[i].options[j].rg_code}">${filterInv[i].options[j].rg_name}</option>
                        `
                    );
                }
                else if((filterInv[i].category.toLowerCase() === "lang."))
                {
                    catSelBox.insertAdjacentHTML(
                        `beforeend`,
                        `
                            <option value="${filterInv[i].options[j].iso_639_1}">${filterInv[i].options[j].english_name}</option>
                        `
                    );
                }
                else
                {
                    catSelBox.insertAdjacentHTML(
                        `beforeend`,
                        `
                            <option value="${filterInv[i].options[j].toLowerCase()}">${filterInv[i].options[j]}</option>
                        `
                    );
                }
            }
            catSelBdr.appendChild(catSelBox);
            catFiltBox.appendChild(catSelBdr);
            catFiltBdr.appendChild(catFiltBox);
            catalogFilterBox.appendChild(catFiltBdr);
        }


        // Generate the Year options
        let ctgYrStruct = ``;
        const ctgYrCard = document.createElement("div");
        ctgYrCard.className = "catalogFilterCardBdr";
        ctgYrCard.innerHTML = 
        `
            <div class="catalogFilterCardBox">
                <div class="catalogFilterDisplayIcon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="catalogFilterDisplaySvg">
                        <path fill-rule="evenodd" d="M13.698 3.314a.75.75 0 0 1 .809.133l6 5.5a.75.75 0 0 1-1.014 1.106L14.75 5.705V20a.75.75 0 0 1-1.5 0V4a.75.75 0 0 1 .448-.687M10 3.25a.75.75 0 0 1 .75.75v16a.75.75 0 0 1-1.257.553l-6-5.5a.75.75 0 0 1 1.014-1.106l4.743 4.348V4a.75.75 0 0 1 .75-.75" clip-rule="evenodd"></path>
                    </svg>
                </div>
                <div class="catalogFilterTitleBox">
                    <div class="catalogFilterTitleText">Year</div>
                </div>
                <div class="catalogFilterSelectBdr">
                    <select class="catalogFilterSelectBox" name="year" id="filter_year">
                        <option value="">Any</option>
                    </select>
                </div>
            </div>
        `;

        for(let y = ctgYrUprBnd; y >= ctgYrLwrBnd; y--)
        {
            ctgYrStruct += `<option value="${y}">${y}</option>`;
        }

        ctgYrCard.querySelector("select#filter_year").insertAdjacentHTML(`beforeend`, ctgYrStruct);
        catalogFilterBox.appendChild(ctgYrCard);


        // Generate the Genre options
        for(let i = 0; i < uvp_genres.length; i++)
        {
            let catGnrBdr = document.createElement("div");
            catGnrBdr.classList.add("catalogGenreCard");
            catGnrBdr.setAttribute(`data-id` , `${uvp_genres[i].id}`);
            catGnrBdr.textContent = uvp_genres[i].name;
            catalogGenreBox.appendChild(catGnrBdr);
        }    

        // Define the elements
        catalogFilterSelect = document.querySelectorAll(".catalogFilterSelectBox");
        catalogGenreCards = document.querySelectorAll(".catalogGenreCard");
        let oneNotDflt = false;
        let urlGenres = catalogURLGenreParam.split(",");


        // Check if url params exist and apply accordingly
        catalogFilterSelect.forEach((field) =>
        {
            switch(field.name)
            {
                case 'sort':
                    field.value = `${catalogURLSortParam.toLowerCase()}`;
                    break;

                case 'format':
                    field.value = `${catalogURLFormatParam.toLowerCase()}`;
                    break;
                    
                case 'score':
                    field.value = `${catalogURLScoreParam.toLowerCase()}`;
                    break;
                    
                case 'year':
                    field.value = `${catalogURLYearParam.toLowerCase()}`;
                    break;                                                 
                    
                case 'lang.':
                    field.value = `${catalogURLLangParam.toLowerCase()}`;
                    break;

                default:
                    notification(`notifyBad` , `An error occurred during initialization`);
                    break;
            }
        });

        catalogGenreCards.forEach((card) => 
        {
            // Add active state to card if available
            urlGenres.forEach((item) => 
            {
                if((card.getAttribute("data-id").toLowerCase() === item.toLowerCase()) && !(card.classList.contains("active")))
                {
                    card.classList.add("active");
                }
            });

            // Toggle active state for each genre option
            card.addEventListener("click" , () =>
            {
                card.classList.toggle("active");
            })
        });


        // Check if any filter option was selected
        catalogSearchQuery = catalogSearchInput.value.toString().trim().replace(/\s+/g, ' ').toLowerCase();
        if(catalogSearchQuery.length > 0)
        {
            oneNotDflt = true;
        }
        catalogFilterSelect.forEach((field) =>
        {
            if(field.value.toString() !== "")
            {
                oneNotDflt = true;
                return;
            }
        });
        catalogGenreCards.forEach((card) =>
        {
            if((card.classList.contains("active")))
            {
                oneNotDflt = true;
                return;
            }
        });
        initToApplyCatalogFilter(oneNotDflt);
    }

    // If at least one attribute is not default, then apply filter
    function initToApplyCatalogFilter(once = false)
    {
        if(once == true)
        {
            once = false;
            window.scrollTo(0, 0);
            catalogSearchInput.focus();
            noResultsFound.classList.remove("active");
            getFilterAndSortInput();
        }
    }



// FILTER & DISPLAY ITEMS

    // Get values from search, filter & sort
    async function getFilterAndSortInput()
    {
        // Empty the arrays
        selectedFilters.search = "";
        selectedFilters.format = "";
        selectedFilters.score = "";
        selectedFilters.year = "";
        selectedFilters.language = "";
        selectedFilters.genres.length = 0;
        sortParam.key = "";
        sortParam.order = "";
        selectedGenres.length = 0;

        // Get value from search field
        catalogSearchQuery = postSanitizeUserInput(catalogSearchInput.value.toString().trim().replace(/\s+/g, ' ').toLowerCase());
        selectedFilters.search = catalogSearchQuery;
        updateURLParams(catalogParamsOrder[0], catalogSearchQuery);

        // Get values from filter selectors
        catalogFilterSelect.forEach((select) => 
        {
            switch(select.name)
            {
                case 'sort':
                    let sortEntries = select.value.split(",");
                    sortParam.key = `${sortEntries[0]}`;
                    sortParam.order = `${sortEntries[1]}`;
                    updateURLParams(catalogParamsOrder[1], select.value);
                    break;
                    
                case 'format':
                    selectedFilters.format = `${select.value}`;
                    updateURLParams(catalogParamsOrder[2], select.value);
                    break;
                    
                case 'score':
                    selectedFilters.score = `${select.value}`;
                    updateURLParams(catalogParamsOrder[3], select.value);
                    break;
                    
                case 'year':
                    selectedFilters.year = `${select.value}`;
                    updateURLParams(catalogParamsOrder[4], select.value);
                    break;
                    
                case 'lang.':
                    selectedFilters.language = `${select.value}`;
                    updateURLParams(catalogParamsOrder[5], select.value);
                    break;

                default:
                    notification(`notifyBad` , `An error occurred while filtering`);
                    break;
            }
        });

        // Get values from genre filters
        catalogGenreCards.forEach((card) => 
        {
            if(card.classList.contains("active"))
            {
                let selGenre = card.getAttribute("data-id");
                selectedFilters.genres.push(Number(selGenre));
                selectedGenres.push(`${selGenre}`);
            }
        });
        updateURLParams(catalogParamsOrder[6], selectedGenres);

        // Search & Filter
        ctgQuerySearch(catalogSearchQuery);
        catalogHeadBdr.classList.remove("show");
    }

    // Display items
    function displayCatalogResult(items = [], resultLength = 0) 
    {
        let ctgRsltStruct = ``;

        ctgRsltStruct = items.map((item) => 
        {
            if((catalogSearchQuery !== "") && ((item != undefined) && (item != null)))
            {
                const {
                    show_link = `#/${item?.media_type}/${item?.id}`,
                    show_type = `${item?.media_type}`,
                    show_title = `${item?.name || item?.title || "N/A"}`,
                    show_foreground = `https://image.tmdb.org/t/p/w500/${item?.poster_path}`,
                    show_year = `${item?.first_air_date?.toString()?.trim()?.split("-")[0] || item?.release_date?.toString()?.trim()?.split("-")[0] || "N/A"}`,
                } = item;

                return `
                    <div class="slide_card_base max_sizing">
                        <div class="slide_card_bdr ">
                            <div class="slide_card_box">
                                <div class="slide_card">
                                    <a href="${show_link}" onmousedown="this.click()" title="Watch ${show_title}" class="cardLinkCover"></a>
                                    <div class="cardImgBox">
                                        <div class="img_preload_box">
                                            <div class="img_preload_sibling"></div>
                                            <img loading="lazy" 
                                                onload="if(!(this.parentElement.classList.contains('loaded'))) this.parentElement.classList.add('loaded')" 
                                                onerror="if(!(this.parentElement.classList.contains('loaderror'))) this.parentElement.classList.add('loaderror')"
                                                src="${show_foreground}" alt="Thumbnail image of ${show_title}" class="cardImg"
                                            >
                                        </div>
                                    </div>
                                    <div class="cardinfo cardInfoBdr"></div>
                                </div>
                            </div>
                            <div class="slide_card_bcg"></div>
                        </div>
                    </div>
                `;
            }
        }).join('');
        catalogResultBox.innerHTML = ctgRsltStruct;

        // Let user know if no result was found for their query
        if((catalogResultBox.innerHTML === "") && (catalogSearchQuery.length > 0) && (catalogSearchQuery !== ""))
        {
            noResultsFound.classList.add("active");
        }
        else
        {
            noResultsFound.classList.remove("active");
        }

        if((resultLength > 0) && (catalogSearchQuery !== ""))
        {
            catalogResultTitleBox.innerHTML = 
            `
                <div class="catalogResultTitleText catalogResultTitleStatic">Results for "${catalogSearchQuery}"</div>
                <div class="catalogResultTitleText catalogResultTitleDynamic">${resultLength == 1 ? `1 result` : `${resultLength} results`}</div>
            `;
        }
        else
        {
            catalogResultTitleBox.innerHTML = 
            `
                <div class="catalogResultTitleText catalogResultTitleStatic"></div>
                <div class="catalogResultTitleText catalogResultTitleDynamic"></div>
            `;
        }
    }

    // Filters the fetched results
    function filterCtgResults(results, filters) 
    {
        return results.filter(item => 
        {
            // Format filter
            if(filters.format && item.media_type !== filters.format) 
            {
                return false;
            }

            // Rating filter
            if(filters.score !== null && item.vote_average < filters.score)
            {
                return false;
            }

            // Year filter
            if(filters.year)
            {
                const date = item.first_air_date || item.release_date;

                if(!date || !date.startsWith(filters.year.toString()))
                {
                    return false;
                }
            }

            // Genre filter
            if(filters.genres && filters.genres.length > 0)
            {
                if(!item.genre_ids || !filters.genres.every(g => item.genre_ids.includes(g)))
                {
                    return false;
                }
            }

            // Language filter (original language)
            if(filters.language && item.original_language !== filters.language)
            {
                return false;
            }

            return true;
        });
    }

    // Clear Filters
    function clrCtgFilters(refresh = true)
    {
        // Clear field values and url params
        catalogFilterSelect.forEach((field, index) => 
        {
            field.value = "";
            updateURLParams(catalogParamsOrder[index + 1], '');
        });

        // Clear active Genre cards and url params
        catalogGenreCards.forEach((card) => 
        {
            if(card.classList.contains("active"))
            {
                card.classList.remove("active");
            }
        });
        updateURLParams(catalogParamsOrder[6], '');
        
        // Close the filter menu
        catalogHeadBdr.classList.remove("show");

        // Refresh the results to effect filter removal
        if((refresh == true)) getFilterAndSortInput();
    }

    // Sorts the fetched results
    function sortCtgResults(results, key, order = "asc")
    {
        return results.sort((a, b) => 
        {
            let valA, valB;

            switch(key)
            {
                case "title":
                    valA = a.title || a.name || "";
                    valB = b.title || b.name || "";
                    return order === "asc"
                        ? valA.localeCompare(valB)
                        : valB.localeCompare(valA);

                case "release_date":
                    valA = new Date(a.release_date || a.first_air_date || 0);
                    valB = new Date(b.release_date || b.first_air_date || 0);
                    return order === "asc" ? valA - valB : valB - valA;

                case "vote_average":
                    valA = a.vote_average || 0;
                    valB = b.vote_average || 0;
                    return order === "asc" ? valA - valB : valB - valA;

                case "popularity":
                    valA = a.popularity || 0;
                    valB = b.popularity || 0;
                    return order === "asc" ? valA - valB : valB - valA;

                default:
                    return 0;
            }
        });
    }

    // Fetches results related tothe user's query
    async function ctgQuerySearch(query = catalogSearchQuery) 
    {

        // Scroll to top to see all results
        window.scrollTo(0,0);

        // Get matching results
        let ctg_rslts = db_Nm.filter(item => 
        {
            return (item.media_type === "movie") ? item.title?.toLowerCase().includes(query) : item.name?.toLowerCase().includes(query)
        })
        ctg_rslts = ctg_rslts.slice(0, Math.min(25, ctg_rslts?.length));

        // Apply any selected filters 
        const filteredRslt = filterCtgResults(ctg_rslts, selectedFilters) || [];
        const sortedRslt = sortCtgResults(filteredRslt, sortParam.key, sortParam.order) || [];

        // Display the filtered results
        displayCatalogResult(sortedRslt, sortedRslt.length);
    }
