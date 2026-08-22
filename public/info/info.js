/***************************************************************
 * This will display the details about all shows
 * 
****************************************************************/


    let info_pg_show_link = "";
    let info_pg_show_type = "";
    let info_pg_show_id = "";
    let showsStructData = {};
    const infoPageNav = 
    `
        <div class="topNavBdr">
            <div class="topNavBox">
                <section class="topNav_section">
                    <div class="topNav_titleBox">
                        <div class="topNav_titleText"></div>
                    </div>
                </section>
                <section class="topNav_section">
                    <div class="sideNavItemsCardBase">
                        <button type="button" class="sideNavItemsCardBdr shareShowBtn" title="Share this show">
                            <div class="sideNavItemsCardBox">
                                <div class="sideNavItemsCardIcon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="sideNavItemsCardSvg sideNavOutlineIcon">
                                        <path fill-rule="evenodd" d="M16.5 2.25a3.25 3.25 0 0 0-3.2 3.824L8.57 9.386l-.068.053a3.25 3.25 0 1 0 0 5.121l.068.054l4.73 3.312q-.05.28-.05.574a3.25 3.25 0 1 0 .667-1.973L9.438 13.39c.2-.422.312-.893.312-1.391s-.112-.97-.312-1.391l4.48-3.136A3.25 3.25 0 1 0 16.5 2.25M14.75 5.5a1.75 1.75 0 1 1 3.5 0a1.75 1.75 0 0 1-3.5 0M6.5 10.25a1.75 1.75 0 1 0 0 3.5a1.75 1.75 0 0 0 0-3.5m10 6.5a1.75 1.75 0 1 0 0 3.5a1.75 1.75 0 0 0 0-3.5" clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </button>
                    </div>
                    <div class="sideNavItemsCardBase">
                        <div class="sideNavItemsCardBdr openCastingOptBtn" onclick="notification('notifyBad' , 'Feature currently unavailable')">
                            <div class="sideNavItemsCardBox">
                                <div class="sideNavItemsCardIcon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="sideNavItemsCardSvg sideNavOutlineIcon">
                                        <path d="M6.452 3.25c-.418 0-.685 0-.918.023a4.75 4.75 0 0 0-4.261 4.261c-.023.233-.023.5-.023.918V8.5a.75.75 0 1 0 1.5 0c0-.482 0-.669.016-.819A3.25 3.25 0 0 1 5.68 4.766c.15-.015.337-.016.819-.016H14c1.907 0 3.262.002 4.29.14c1.005.135 1.585.389 2.008.812s.677 1.003.812 2.009c.138 1.028.14 2.382.14 4.289s-.002 3.262-.14 4.29c-.135 1.005-.389 1.585-.812 2.008s-1.003.677-2.009.812c-1.027.138-2.382.14-4.289.14a.75.75 0 0 0 0 1.5h.056c1.838 0 3.294 0 4.433-.153c1.172-.158 2.121-.49 2.87-1.238c.748-.749 1.08-1.698 1.238-2.87c.153-1.14.153-2.595.153-4.433v-.112c0-1.838 0-3.294-.153-4.433c-.158-1.172-.49-2.121-1.238-2.87c-.749-.748-1.698-1.08-2.87-1.238c-1.14-.153-2.595-.153-4.433-.153z" />
                                        <path d="M2 10.25a.75.75 0 0 0 0 1.5A8.25 8.25 0 0 1 10.25 20a.75.75 0 0 0 1.5 0A9.75 9.75 0 0 0 2 10.25" />
                                        <path d="M1.25 14a.75.75 0 0 1 .75-.75A6.75 6.75 0 0 1 8.75 20a.75.75 0 0 1-1.5 0c0-2.9-2.35-5.25-5.25-5.25a.75.75 0 0 1-.75-.75" />
                                        <path d="M2 16.25a.75.75 0 0 0 0 1.5A2.25 2.25 0 0 1 4.25 20a.75.75 0 0 0 1.5 0A3.75 3.75 0 0 0 2 16.25" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    `;
    const info_pg_dflt_bcg = `/images/uvid-green-bcg1-dark.webp`;
    let trailerTimer;
    const prsnLmt = 20;
    const epSetLength = 40;
    let epSelectedSet = 0;
    let epSetArr = [];
    let sample_ep_duration = `00:57`;



    async function preShowSection()
    {
        info_pg_show_link = `#/${hash_parts[1]}/${hash_parts[2]}`;
        info_pg_show_id = `${hash_parts[2]}`;
        info_pg_show_type =  `${hash_parts[1].toString().toLowerCase()}`;

        // Fetch show details
        try
        {
            showsStructData = db_Id.get(info_pg_show_id);

            if(((hash_parts[3]) && (hash_parts[3].toString().trim().toLowerCase() === "watch")))
            {
                initWatchPage();
            }
        }
        catch(error)
        {
            console.error(error);
            page_route_error("error");
            return;
        }
            
        const isAdltCtnt = showsStructData?.adult;

        // Return if user has adult content set to hidden
        if((isAdltCtnt == true) && (window?.____show_adult_ctnt == false))
        {
            window.location.hash = "#/home";
            notification('notifyBad', `The selected content is unavailable`);
            return;
        }

        let show_rating = showsStructData?.adult ? "Yes" : "No";
        let show_background = (showsStructData?.backdrop_path)
            ? `https://image.tmdb.org/t/p/w1280/${showsStructData?.backdrop_path}`
            : info_pg_dflt_bcg;
        let show_foreground = `https://image.tmdb.org/t/p/w500/${showsStructData?.poster_path}`;

        let show_title = showsStructData?.name || showsStructData?.title || "N/A";

        let show_tagline = (showsStructData?.tagline) 
            ? 
                `
                    <div class="quick_det_bdr">
                        <div class="quick_det_box">
                            <div class="quick_det_item">
                                <span class="quick_det_text tagline">${showsStructData?.tagline}</span>
                            </div>
                        </div>
                    </div>
                ` 
            : "";
        let show_trailers = (getShowMainTrailer(showsStructData?.videos)?.key)
            ? `https://www.youtube.com/embed/${getShowMainTrailer(showsStructData?.videos)?.key}`
            : null;

        let show_scores = (typeof showsStructData?.vote_average === "number")
            ? Number(showsStructData?.vote_average).toFixed(1)
            : "N/A";
        let show_description = showsStructData?.overview || "No description available";
        let show_duration = `${showsStructData?.episode_run_time?.map(item => item).join(", ") || showsStructData?.runtime || "N/A"}`;

        let show_og_ttl = showsStructData?.original_name || showsStructData?.original_title || "N/A";
        let show_og_cntry = 
        `${
            showsStructData?.origin_country?.map(country => 
            {
                return uvp_regions.find(rgn => rgn.rg_code.toLowerCase() === country.toLowerCase())?.rg_name || "N/A";
            }).join(", ") || "N/A"
        }`;
        let show_languages = `${uvp_langs.find(lang => lang.iso_639_1.toLowerCase() === showsStructData?.original_language.toLowerCase())?.english_name || "N/A"}`;
        let show_type = info_pg_show_type.toUpperCase() || "N/A";
        let show_year = showsStructData?.first_air_date?.split("-")[0] || showsStructData?.release_date || "N/A";
        let show_airing_status = showsStructData?.status || "N/A";
        let show_studios = `${showsStructData?.production_companies?.map(item => item?.name).join(", ") || "N/A"}`;
        let show_gnr = showsStructData?.genres || showsStructData?.genre_ids;
        let show_genre = 
        `
            ${
                show_gnr?.map(genre => 
                {
                    const genre_match = uvp_genres.find(gnr => gnr?.id == (genre?.id || genre));
                    if(genre_match)
                    {
                        return `<a class="abt-detText-minor abt-detText-link-text">${genre_match?.name}</a>`;
                    }
                    else
                    {
                        return `${genre?.name}`;
                    }
                }).join("") || "N/A"
            }
        `;
        
        const showHTMLCtnt =  
        `
            <div class="info_pg_base">
                <div class="info_pg_bcg">
                    <div class="bcg_img_bdr">
                        <div class="bcg_img_box">
                            <div class="img_preload_box">
                                <div class="img_preload_sibling"></div>
                                <img loading="lazy" 
                                    onload="if(!(this.parentElement.classList.contains('loaded'))) this.parentElement.classList.add('loaded')" 
                                    onerror="if(!(this.parentElement.classList.contains('loaderror'))) this.parentElement.classList.add('loaderror')"
                                    src="${show_background}" alt="Thumbnail image of ${show_title}" class="bcgImg"
                                >
                            </div>
                        </div>
                        <div class="bcg_img_gradient"></div>
                    </div>
                    <div class="info_pg_bdr">
                        <div class="info_pg_box">
                            <div class="title-plate">
                                <div class="title_ImgBdr">
                                    <div class="title_ImgBox">
                                        <div class="img_preload_box">
                                            <div class="img_preload_sibling"></div>
                                            <img loading="lazy" 
                                                onload="if(!(this.parentElement.classList.contains('loaded'))) this.parentElement.classList.add('loaded')" 
                                                onerror="if(!(this.parentElement.classList.contains('loaderror'))) this.parentElement.classList.add('loaderror')"
                                                src="${show_foreground}" alt="Thumbnail image of ${show_title}" class="title_Img"
                                            >
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="title_ctntBdr">
                                    <h1 id="show_Header_Name">${show_title}</h1>

                                    ${show_tagline}

                                    <div class="quick_det_bdr">
                                        <div class="quick_det_box">
                                            <div class="quick_det_item">
                                                <div class="quick_det_rating_icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="quick_det_rating_svg">
                                                        <path d="M9.153 5.408C10.42 3.136 11.053 2 12 2s1.58 1.136 2.847 3.408l.328.588c.36.646.54.969.82 1.182s.63.292 1.33.45l.636.144c2.46.557 3.689.835 3.982 1.776c.292.94-.546 1.921-2.223 3.882l-.434.507c-.476.557-.715.836-.822 1.18c-.107.345-.071.717.001 1.46l.066.677c.253 2.617.38 3.925-.386 4.506s-1.918.051-4.22-1.009l-.597-.274c-.654-.302-.981-.452-1.328-.452s-.674.15-1.328.452l-.596.274c-2.303 1.06-3.455 1.59-4.22 1.01c-.767-.582-.64-1.89-.387-4.507l.066-.676c.072-.744.108-1.116 0-1.46c-.106-.345-.345-.624-.821-1.18l-.434-.508c-1.677-1.96-2.515-2.941-2.223-3.882S3.58 8.328 6.04 7.772l.636-.144c.699-.158 1.048-.237 1.329-.45s.46-.536.82-1.182z" />
                                                    </svg>
                                                </div>
                                                <span class="quick_det_text">${show_scores}</span>
                                            </div>
                                            <div class="quick_det_item">
                                                <span class="quick_det_text quick_det_divider">•</span>
                                            </div>
                                            <div class="quick_det_item">
                                                <span class="quick_det_text">${show_airing_status}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="info_atn_bdr">
                                        <button type="button" class="genBtnBox lightSolidBtn watchShowNowBtn">
                                            <div class="genBtnIcon">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="genBtnSvg">
                                                    <path d="M21.409 9.353a2.998 2.998 0 0 1 0 5.294L8.597 21.614C6.534 22.737 4 21.277 4 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648z" />
                                                </svg>
                                            </div>
                                            <div class="genBtnText">Play Now</div>
                                        </button>
                                        <div class="quick_atnBcg">
                                            <div class="quick_atnBdr">
                                                <div class="quick_atnBox watchTrailer_box" src="${show_trailers}" title="Watch trailer" aria-label="show-score">
                                                    <div class="quick_atnCtnt">
                                                        <div class="topCtnt">
                                                            <div class="topIconBox">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="topIcon">
                                                                    <path fill-rule="evenodd" d="M18.059 4.708a2.25 2.25 0 0 0-2.166-1.25a3 3 0 0 0-.51.096l-.446 3.74l3.118-.836a8 8 0 0 0 .289-.083a.25.25 0 0 0 .137-.238l-.01-.052l-.063-.24c-.19-.708-.26-.955-.35-1.137m-4.683 3.003l.447-3.743l-4.719 1.264l-.446 3.743zM7.098 9.394l.446-3.743c-.817.219-1.401.379-1.85.544c-.474.174-.728.33-.904.505c-.279.28-.48.628-.582 1.009c-.064.24-.072.537.014 1.034c.063.362.167.79.31 1.338zM3.25 11.093c-.226-.843-.408-1.526-.506-2.094c-.104-.6-.129-1.141.015-1.678a3.75 3.75 0 0 1 .97-1.681c.394-.393.875-.643 1.447-.853c.554-.203 1.259-.392 2.132-.626l.78-.21a.8.8 0 0 1 .286-.076l5.972-1.6l.021-.006a.8.8 0 0 1 .286-.076c.474-.126.821-.21 1.142-.232a3.75 3.75 0 0 1 3.609 2.084c.164.332.272.736.43 1.328l.023.084l.012.046c.048.176.097.359.109.534a1.75 1.75 0 0 1-.973 1.684a3 3 0 0 1-.562.186L9.697 10.25h6.355c.898 0 1.648 0 2.242.08c.628.084 1.195.27 1.65.725c.456.456.642 1.023.726 1.65c.08.595.08 1.345.08 2.243v1.107c0 1.367 0 2.47-.117 3.337c-.12.9-.38 1.658-.982 2.26s-1.36.86-2.26.981c-.866.117-1.969.117-3.336.117h-4.11c-1.368 0-2.47 0-3.337-.117c-.9-.12-1.658-.38-2.26-.981c-.602-.602-.86-1.36-.982-2.26c-.116-.867-.116-1.97-.116-3.337zm1.5.657V16c0 1.435.001 2.436.103 3.192c.099.734.28 1.122.556 1.399c.277.277.665.457 1.399.556c.755.101 1.756.103 3.192.103h4c1.435 0 2.436-.002 3.192-.103c.733-.099 1.122-.28 1.399-.556c.277-.277.457-.665.556-1.4c.101-.755.103-1.756.103-3.191v-1c0-.964-.002-1.612-.067-2.095c-.062-.461-.169-.659-.3-.789s-.327-.237-.789-.3c-.483-.065-1.13-.066-2.094-.066zm8.448 2.83l.047.034l.042.03c.361.259.7.501.94.738c.27.265.523.623.523 1.118s-.252.852-.522 1.118c-.241.237-.58.48-.94.738l-.043.03l-.047.034c-.361.26-.706.506-1.001.652c-.315.155-.834.321-1.33-.029c-.43-.304-.533-.795-.574-1.138c-.043-.358-.043-.826-.043-1.358v-.094c0-.533 0-1 .043-1.358c.04-.343.144-.834.575-1.138c.495-.35 1.014-.185 1.329-.03c.295.146.64.394 1.001.653m-1.429.832c-.018.25-.02.593-.02 1.088s.002.838.02 1.088c.149-.097.34-.234.602-.421c.418-.3.658-.474.805-.619q.03-.028.046-.048l-.046-.048c-.147-.145-.387-.32-.805-.619a18 18 0 0 0-.602-.421" clip-rule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <div class="btmCtnt">
                                                            <p class="btmText">Trailer</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="quick_atnBox like_buttonsBox open_quickAtnModalBdr" like-status="dflt" title="Rate this show">
                                                    <div class="quick_atnCtnt">
                                                        <div class="topCtnt">
                                                            <div class="topIconBox like_dflt">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="topIcon">
                                                                    <path fill-rule="evenodd" d="M12.438 2.778a.6.6 0 0 0-.438.03a.52.52 0 0 0-.28.33l-.476 1.834a8.4 8.4 0 0 1-.72 1.844c-.485.907-1.218 1.604-1.898 2.19l-1.438 1.24a.92.92 0 0 0-.315.774l.812 9.393a.916.916 0 0 0 .911.837h4.649c3.136 0 5.779-2.182 6.286-5.113l.705-4.08a.916.916 0 0 0-.901-1.073h-5.181c-.977 0-1.72-.876-1.562-1.84l.663-4.044a4 4 0 0 0-.076-1.664a.89.89 0 0 0-.596-.611zl.23-.714zm-1.09-1.321a2.1 2.1 0 0 1 1.549-.107l.145.047l-.23.714l.23-.714c.777.25 1.383.87 1.589 1.662c.193.746.229 1.524.104 2.284l-.663 4.044a.083.083 0 0 0 .082.097h5.18c1.5 0 2.636 1.352 2.38 2.829l-.705 4.08c-.638 3.688-3.938 6.357-7.764 6.357H8.596a2.416 2.416 0 0 1-2.405-2.208l-.813-9.393a2.42 2.42 0 0 1 .83-2.04l1.44-1.24c.655-.564 1.206-1.111 1.552-1.76a6.8 6.8 0 0 0 .592-1.514l.476-1.833a2.01 2.01 0 0 1 1.08-1.305m-8.38 8.028a.75.75 0 0 1 .78.685l.97 11.236a1.237 1.237 0 1 1-2.468.107V10.234a.75.75 0 0 1 .718-.75" clip-rule="evenodd" />
                                                                </svg>
                                                            </div>
                                                            <div class="topIconBox like_yes">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="topIcon">
                                                                    <path d="m20.27 16.265l.705-4.08a1.666 1.666 0 0 0-1.64-1.95h-5.181a.833.833 0 0 1-.822-.969l.663-4.045a4.8 4.8 0 0 0-.09-1.973a1.64 1.64 0 0 0-1.092-1.137l-.145-.047a1.35 1.35 0 0 0-.994.068c-.34.164-.588.463-.68.818l-.476 1.834a7.6 7.6 0 0 1-.656 1.679c-.415.777-1.057 1.4-1.725 1.975l-1.439 1.24a1.67 1.67 0 0 0-.572 1.406l.812 9.393A1.666 1.666 0 0 0 8.597 22h4.648c3.482 0 6.453-2.426 7.025-5.735" />
                                                                    <path fill-rule="evenodd" d="M2.968 9.485a.75.75 0 0 1 .78.685l.97 11.236a1.237 1.237 0 1 1-2.468.107V10.234a.75.75 0 0 1 .718-.749" clip-rule="evenodd" />
                                                                </svg>
                                                            </div>
                                                            <div class="topIconBox like_no">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="topIcon">
                                                                    <path d="m20.27 8.485l.705 4.08a1.666 1.666 0 0 1-1.64 1.95h-5.181a.833.833 0 0 0-.822.969l.663 4.045a4.8 4.8 0 0 1-.09 1.974c-.139.533-.55.962-1.092 1.136l-.145.047c-.328.105-.685.08-.994-.068a1.26 1.26 0 0 1-.68-.818l-.476-1.834a7.6 7.6 0 0 0-.656-1.679c-.415-.777-1.057-1.4-1.725-1.975l-1.439-1.24a1.67 1.67 0 0 1-.572-1.406l.812-9.393A1.666 1.666 0 0 1 8.597 2.75h4.648c3.482 0 6.453 2.426 7.025 5.735" />
                                                                    <path fill-rule="evenodd" d="M2.968 15.265a.75.75 0 0 0 .78-.685l.97-11.236a1.237 1.237 0 1 0-2.468-.107v11.279a.75.75 0 0 0 .718.75" clip-rule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <div class="btmCtnt">
                                                            <p class="btmText">Rate</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="quick_atnBox wl_show_page openGenMenuModalBtn" data-gen-menu-modal-type="wl_body_cards" title="Watchlist">
                                                    <div class="quick_atnCtnt">
                                                        <div class="topCtnt">
                                                            <div class="topIconBox">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="topIcon wlIconSvg wlIconOUT">
                                                                    <path fill-rule="evenodd" d="M5.624 4.424C3.965 5.182 2.75 6.986 2.75 9.137c0 2.197.9 3.891 2.188 5.343c1.063 1.196 2.349 2.188 3.603 3.154q.448.345.885.688c.526.415.995.778 1.448 1.043s.816.385 1.126.385s.674-.12 1.126-.385c.453-.265.922-.628 1.448-1.043q.437-.344.885-.687c1.254-.968 2.54-1.959 3.603-3.155c1.289-1.452 2.188-3.146 2.188-5.343c0-2.15-1.215-3.955-2.874-4.713c-1.474-.673-3.41-.568-5.304 1.088L14.53 6.97a.75.75 0 1 1-1.06 1.061l-2-1.999l-.01-.01c-2.058-2.14-4.224-2.335-5.836-1.598M12 4.46C9.688 2.39 7.099 2.1 5 3.059C2.786 4.074 1.25 6.426 1.25 9.138c0 2.665 1.11 4.699 2.567 6.339c1.166 1.313 2.593 2.412 3.854 3.382q.43.33.826.642c.513.404 1.063.834 1.62 1.16s1.193.59 1.883.59s1.326-.265 1.883-.59c.558-.326 1.107-.756 1.62-1.16q.396-.312.826-.642c1.26-.97 2.688-2.07 3.854-3.382c1.457-1.64 2.567-3.674 2.567-6.339c0-2.712-1.535-5.064-3.75-6.077c-2.099-.96-4.688-.67-7 1.399" clip-rule="evenodd" />
                                                                </svg>
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="topIcon wlIconSvg wlIconIN hide">
                                                                    <path d="M8.106 18.247C5.298 16.083 2 13.542 2 9.137C2 4.274 7.5.825 12 5.501l2 1.998a.75.75 0 0 0 1.06-1.06l-1.93-1.933C17.369 1.403 22 4.675 22 9.137c0 4.405-3.298 6.946-6.106 9.11q-.44.337-.856.664C14 19.729 13 20.5 12 20.5s-2-.77-3.038-1.59q-.417-.326-.856-.663" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <div class="btmCtnt">
                                                            <p class="btmText">Watchlist</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="quick_atnBox openAddToCLBtn" title="Add to Collection">
                                                    <div class="quick_atnCtnt">
                                                        <div class="topCtnt">
                                                            <div class="topIconBox">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="topIcon">
                                                                    <path fill-rule="evenodd" d="M6.448 1.75c-.898 0-1.648 0-2.242.08c-.628.084-1.195.27-1.65.725c-.456.456-.642 1.023-.726 1.65c-.08.595-.08 1.345-.08 2.243v.104c0 .898 0 1.648.08 2.242c.084.628.27 1.195.725 1.65c.456.456 1.023.642 1.65.726c.595.08 1.345.08 2.243.08h.104c.898 0 1.648 0 2.242-.08c.628-.084 1.195-.27 1.65-.726c.456-.455.642-1.022.726-1.65c.08-.594.08-1.344.08-2.242v-.104c0-.898 0-1.648-.08-2.242c-.084-.628-.27-1.195-.726-1.65c-.455-.456-1.022-.642-1.65-.726c-.594-.08-1.344-.08-2.242-.08zM3.616 3.616c.13-.13.328-.237.79-.3c.482-.064 1.13-.066 2.094-.066s1.612.002 2.095.067c.461.062.659.169.789.3s.237.327.3.788c.064.483.066 1.131.066 2.095s-.002 1.612-.067 2.095c-.062.461-.169.659-.3.789s-.327.237-.788.3c-.483.064-1.131.066-2.095.066s-1.612-.002-2.095-.067c-.461-.062-.659-.169-.789-.3s-.237-.327-.3-.788C3.253 8.112 3.25 7.464 3.25 6.5s.002-1.612.067-2.095c.062-.461.169-.659.3-.789" clip-rule="evenodd" />
                                                                    <path d="M18.25 3.5a.75.75 0 0 0-1.5 0v2.25H14.5a.75.75 0 0 0 0 1.5h2.25V9.5a.75.75 0 0 0 1.5 0V7.25h2.25a.75.75 0 0 0 0-1.5h-2.25z" />
                                                                    <path fill-rule="evenodd" d="M17.448 12.75h.104c.899 0 1.648 0 2.242.08c.628.084 1.195.27 1.65.726c.456.455.642 1.022.726 1.65c.08.594.08 1.343.08 2.242v.104c0 .899 0 1.648-.08 2.242c-.084.628-.27 1.195-.726 1.65c-.455.456-1.022.642-1.65.726c-.594.08-1.343.08-2.242.08h-.104c-.898 0-1.648 0-2.242-.08c-.628-.084-1.195-.27-1.65-.726c-.456-.455-.642-1.022-.726-1.65c-.08-.594-.08-1.343-.08-2.242v-.104c0-.899 0-1.648.08-2.242c.084-.628.27-1.195.726-1.65c.455-.456 1.022-.642 1.65-.726c.594-.08 1.343-.08 2.242-.08m-2.043 1.566c-.461.063-.659.17-.789.3s-.237.328-.3.79c-.064.482-.066 1.13-.066 2.094s.002 1.612.066 2.095c.063.461.17.659.3.789s.328.237.79.3c.482.064 1.13.066 2.094.066s1.612-.002 2.095-.067c.461-.062.659-.169.789-.3s.237-.327.3-.788c.064-.483.066-1.131.066-2.095s-.002-1.612-.067-2.095c-.062-.461-.169-.659-.3-.789s-.327-.237-.788-.3c-.483-.064-1.131-.066-2.095-.066s-1.612.002-2.095.066M6.448 12.75c-.898 0-1.648 0-2.242.08c-.628.084-1.195.27-1.65.726c-.456.455-.642 1.022-.726 1.65c-.08.594-.08 1.343-.08 2.242v.104c0 .899 0 1.648.08 2.242c.084.628.27 1.195.725 1.65c.456.456 1.023.642 1.65.726c.595.08 1.345.08 2.243.08h.104c.898 0 1.648 0 2.242-.08c.628-.084 1.195-.27 1.65-.726c.456-.455.642-1.022.726-1.65c.08-.594.08-1.343.08-2.242v-.104c0-.899 0-1.648-.08-2.242c-.084-.628-.27-1.195-.726-1.65c-.455-.456-1.022-.642-1.65-.726c-.594-.08-1.344-.08-2.242-.08zm-2.832 1.866c.13-.13.328-.237.79-.3c.482-.064 1.13-.066 2.094-.066s1.612.002 2.095.066c.461.063.659.17.789.3s.237.328.3.79c.064.482.066 1.13.066 2.094s-.002 1.612-.067 2.095c-.062.461-.169.659-.3.789s-.327.237-.788.3c-.483.064-1.131.066-2.095.066s-1.612-.002-2.095-.067c-.461-.062-.659-.169-.789-.3s-.237-.327-.3-.788c-.064-.483-.066-1.131-.066-2.095s.002-1.612.067-2.095c.062-.461.169-.659.3-.789" clip-rule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <div class="btmCtnt">
                                                            <p class="btmText">Collections</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="quickAtnModalBdr">
                                                <div class="quickAtnModalBox">
                                                    <button class="quickAtnModal_btn score_btn like_buttons add_to_LikedShowsBox" title="I like this show" aria-label="I like this epsidoe">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="quickAtnModal_btnIcon">
                                                            <path d="m20.27 16.265l.705-4.08a1.666 1.666 0 0 0-1.64-1.95h-5.181a.833.833 0 0 1-.822-.969l.663-4.045a4.8 4.8 0 0 0-.09-1.973a1.64 1.64 0 0 0-1.092-1.137l-.145-.047a1.35 1.35 0 0 0-.994.068c-.34.164-.588.463-.68.818l-.476 1.834a7.6 7.6 0 0 1-.656 1.679c-.415.777-1.057 1.4-1.725 1.975l-1.439 1.24a1.67 1.67 0 0 0-.572 1.406l.812 9.393A1.666 1.666 0 0 0 8.597 22h4.648c3.482 0 6.453-2.426 7.025-5.735" />
                                                            <path fill-rule="evenodd" d="M2.968 9.485a.75.75 0 0 1 .78.685l.97 11.236a1.237 1.237 0 1 1-2.468.107V10.234a.75.75 0 0 1 .718-.749" clip-rule="evenodd" />
                                                        </svg>
                                                        <p class="quickAtnModal_btnText score_btnText">I like this</p>
                                                    </button>
                                                    <button class="quickAtnModal_btn score_btn like_buttons add_to_DislikedShowsBox" title="This show isn't for me" aria-label="I don't like this episode">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="quickAtnModal_btnIcon">
                                                            <path d="m20.27 8.485l.705 4.08a1.666 1.666 0 0 1-1.64 1.95h-5.181a.833.833 0 0 0-.822.969l.663 4.045a4.8 4.8 0 0 1-.09 1.974c-.139.533-.55.962-1.092 1.136l-.145.047c-.328.105-.685.08-.994-.068a1.26 1.26 0 0 1-.68-.818l-.476-1.834a7.6 7.6 0 0 0-.656-1.679c-.415-.777-1.057-1.4-1.725-1.975l-1.439-1.24a1.67 1.67 0 0 1-.572-1.406l.812-9.393A1.666 1.666 0 0 1 8.597 2.75h4.648c3.482 0 6.453 2.426 7.025 5.735" />
                                                            <path fill-rule="evenodd" d="M2.968 15.265a.75.75 0 0 0 .78-.685l.97-11.236a1.237 1.237 0 1 0-2.468-.107v11.279a.75.75 0 0 0 .718.75" clip-rule="evenodd" />
                                                        </svg>
                                                        <p class="quickAtnModal_btnText score_btnText">Not for me</p>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Content -->
                            <div class="ctnt-plate">
                                <div class="tro">

                                    <!-- About the Show -->
                                    <div class="sect-tab sect-abt-bdr selected" id="abt">
                                        <div class="sect-abt-box">
                                            <div class="sect-abt-card sect-abt-description">
                                                <div class="sect-abt-header">
                                                    <div class="sect-head">
                                                        <div class="sect-headText"><span class="major">D</span>escription</div>
                                                    </div>
                                                    <div class="sect-abt-headerText">Description</div>
                                                </div>
                                                <div class="abt-stmt-long">
                                                    <p class="abt-stmt-longText">${show_description}</p>
                                                </div>
                                                <div class="abt-stmt-short">
                                                    <p class="abt-stmt-shortText">${show_description}</p>
                                                    <div class="abt-stmt-detBdr" id="ep">
                                                        <div class="abt-stmt-detBox">
                                                            <label for="abt-stmt-checkBoxId" class="abt-stmt-detBtn read_more_btn">
                                                                <input type="checkbox" name="abt-stmt-checkBox" id="abt-stmt-checkBoxId" class="abt-stmt-checkBoxCls">
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="sect-abt-card sect-abt-details">
                                                <div class="sect-abt-header">
                                                    <div class="sect-head">
                                                        <div class="sect-headText"><span class="major">D</span>etails</div>
                                                    </div>
                                                    <div class="sect-abt-headerText">Details</div>
                                                </div>
                                                <div class="abt-det"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.title = `Watch ${show_title} • ACUvid V3`;
        genShowLinkForCL = info_pg_show_link;
        epSetArr.length = 0;
        epSelectedSet = 0;
        topNavBar.innerHTML = infoPageNav;
        topNavBar.classList.add("initialize");
        let showType = info_pg_show_type;

        const infoPageBase = document.createElement("div");
        infoPageBase.className = "info_pg_base";
        infoPageBase.innerHTML = showHTMLCtnt;
        documentCtnt.insertAdjacentElement(`afterbegin` , infoPageBase);

        const abtDetBase = infoPageBase.querySelector(".abt-det");


        if((showType == "tv"))
        {
            let show_aired = `${showsStructData?.first_air_date || "N/A"} to ${showsStructData?.last_air_date || "N/A"}`;
            let show_seasons = showsStructData?.number_of_seasons || "N/A";
            let show_episodes = showsStructData?.number_of_episodes || "N/A";

            abtDetBase.innerHTML = 
            `
                <p class="abt-detText"><span class="abt-detText-major">Original Name</span><span class="abt-detText-minor">${show_og_ttl}</span></p>
                <p class="abt-detText"><span class="abt-detText-major">Original Lang.</span><span class="abt-detText-minor">${show_languages}</span></p>
                <p class="abt-detText"><span class="abt-detText-major">Origin Country</span><span class="abt-detText-minor">${show_og_cntry}</span></p>
                <p class="abt-detText"><span class="abt-detText-major">Type</span><span class="abt-detText-minor">${show_type}</span></p>
                <p class="abt-detText"><span class="abt-detText-major">Adult</span><span class="abt-detText-minor">${show_rating}</span></p>
                <p class="abt-detText"><span class="abt-detText-major">Seasons</span><span class="abt-detText-minor">${show_seasons}</span></p>
                <p class="abt-detText"><span class="abt-detText-major">Episodes</span><span class="abt-detText-minor">${show_episodes}</span></p>
                <p class="abt-detText"><span class="abt-detText-major">Duration</span><span class="abt-detText-minor">${show_duration} mins</span></p>
                <p class="abt-detText"><span class="abt-detText-major">Release Year</span><span class="abt-detText-minor">${show_year}</span></p>
                <p class="abt-detText"><span class="abt-detText-major">Aired</span><span class="abt-detText-minor">${show_aired}</span></p>
                <p class="abt-detText"><span class="abt-detText-major">Status</span><span class="abt-detText-minor">${show_airing_status}</span></p>
                <p class="abt-detText"><span class="abt-detText-major">Studios</span><span class="abt-detText-minor">${show_studios}</span></p>
                <p class="abt-detText"><span class="abt-detText-major">Genres</span><span class="abt-detText-minor abt-detText-link-set">${show_genre}</span></p>
            `;
        }
        else if((showType === "movie"))
        {
            abtDetBase.innerHTML = 
            `
                <p class="abt-detText"><span class="abt-detText-major">Original Name</span><span class="abt-detText-minor">${show_og_ttl}</span></p>
                <p class="abt-detText"><span class="abt-detText-major">Original Lang.</span><span class="abt-detText-minor">${show_languages}</span></p>
                <p class="abt-detText"><span class="abt-detText-major">Origin Country</span><span class="abt-detText-minor">${show_og_cntry}</span></p>
                <p class="abt-detText"><span class="abt-detText-major">Type</span><span class="abt-detText-minor">${show_type}</span></p>
                <p class="abt-detText"><span class="abt-detText-major">Adult</span><span class="abt-detText-minor">${show_rating}</span></p>
                <p class="abt-detText"><span class="abt-detText-major">Release Date</span><span class="abt-detText-minor">${show_year}</span></p>
                <p class="abt-detText"><span class="abt-detText-major">Duration</span><span class="abt-detText-minor">${show_duration} mins</span></p>
                <p class="abt-detText"><span class="abt-detText-major">Status</span><span class="abt-detText-minor">${show_airing_status}</span></p>
                <p class="abt-detText"><span class="abt-detText-major">Studios</span><span class="abt-detText-minor">${show_studios}</span></p>
                <p class="abt-detText"><span class="abt-detText-major">Genres</span><span class="abt-detText-minor abt-detText-link-set">${show_genre}</span></p>
            `;
        }

        startShowSection();
    }


    // Initialize the Info page functionalities
    async function startShowSection()
    {

        // DEFINITION

            let selectedProfile = await getSelectedProfile();
            let bcgImgBdr = document.querySelector(".bcg_img_bdr");
            let bcgImgBox = document.querySelector(".bcg_img_box");
            let bcgImgGradient = document.querySelector(".bcg_img_gradient");
            let bcgImgBdrBound = 0;
            let bcgImgBdrHeight = 0;
            let bcgImgBdrHalf = 0;
            let bcgImgBdr3Qarts = 0;
            let bcgImgBdr3QartsH = 0;
            let openQuickAtnModalBdr = document.querySelector(".open_quickAtnModalBdr");
            let quickAtnModalBdr = document.querySelector(".quickAtnModalBdr");
            let likeBtnBox = document.querySelector(".like_buttonsBox");
            let likeTheEp = document.querySelector(".add_to_LikedShowsBox");
            let dontLikeTheEp = document.querySelector(".add_to_DislikedShowsBox");
            let showHeaderName = document.querySelector("#show_Header_Name");
            let watchTrailerBox = document.querySelector('.watchTrailer_box');
            let dwldSsnBtn = document.querySelectorAll(".ssn_dwld_btn");
            let markSsnAsWatched = document.querySelectorAll(".ssn_markAsWatched_btn");
            let ctntNavBtns = document.querySelectorAll(".ctnt-tab-headerOpt");
            let ctntSectTabs = document.querySelectorAll(".sect-tab");
            let seasonHeaderBox = document.querySelector(".seasons_headerBox");
            let seasonHeaderText = document.querySelector(".seasons_headerText");
            let seasonSelectorBdr = document.querySelector(".seasons_selectorBdr");
            let seasonSelectorBox = document.querySelector(".seasons_selectorBox");
            let seasonSelector = document.querySelectorAll(".seasons_selector");
            let sortEPbtn = document.querySelectorAll('.episode_orderBtn');
            let epSearchField = document.querySelectorAll(".episode_searchFieldClass");
            let seasonSub;
            let seasonSet;

    
        // Reattaching listeners
        
            attachGenMenuModalEventListeners();
            attachAddToCLEventListeners();
            attachSharePageEventListeners();


        // POSITIONING THE CONTENT

            function checkBcgImgBdrBounds()
            {
                bcgImgBdrBound = bcgImgBdr.getBoundingClientRect();
                bcgImgBdrHeight = Math.round(bcgImgBdrBound.height);
                bcgImgBdrHalf = Math.round(bcgImgBdrHeight/2);
                bcgImgBdr3Qarts = bcgImgBdrHeight + bcgImgBdrHalf;
                bcgImgBdr3QartsH = bcgImgBdrHeight + bcgImgBdrHalf + 10;

                bcgImgBox.setAttribute("style", `--ImgHeight:${bcgImgBdr3Qarts}px`);
                bcgImgGradient.setAttribute("style", `--ImgHeight:${bcgImgBdr3QartsH}px`);

                if(seasonSelectorBdr?.classList.contains("active"))
                {
                    if(window.innerWidth <= 768)
                    {
                        documentBody.classList.add("bodystop");
                        return;
                    }
                    documentBody.classList.remove("bodystop");
                }
            }
            window.addEventListener("resize" , () => 
            {
                checkBcgImgBdrBounds();
            });
            checkBcgImgBdrBounds();



        // QUICK ACTIONS

            // Open Quick Actions Box
            openQuickAtnModalBdr.addEventListener("click" , () => 
            {
                quickAtnModalBdr.classList.toggle("active");
            });

            // Closing the Quick Actions Box
            document.addEventListener("click" , e => 
            {
                // Close the Scores Action Box
                if((
                    (openQuickAtnModalBdr.matches(":hover")) 
                    // || (quickAtnModalBdr.matches(":hover"))
                ))
                {
                    return;
                }
                quickAtnModalBdr.classList.remove("active");
            });



        // RATE THE SHOW

            // Getting Rate status on load
            let initRateLike = selectedProfile.prof_likes.filter(item => item.ls_item === info_pg_show_link);
            let initRateDislike = selectedProfile.prof_dislikes.filter(item => item.ds_item === info_pg_show_link);

            if(initRateLike.length > 0)
            {
                likeBtnBox.setAttribute(`like-status` , `yes`);
                likeBtnBox.querySelector(".btmText").textContent = "Rated";
                likeTheEp.classList.add("selected");
            }
            else if(initRateDislike.length > 0)
            {
                likeBtnBox.setAttribute(`like-status` , `no`);
                likeBtnBox.querySelector(".btmText").textContent = "Rated";
                dontLikeTheEp.classList.add("selected");
            }

            // Like the show
            likeTheEp.addEventListener("click" , async () => 
            {
                let selectedProfile = await getSelectedProfile();

                if(likeTheEp.classList.contains("selected"))
                {
                    // Remove from the likes array
                    selectedProfile.prof_likes = selectedProfile.prof_likes.filter(item => item.ls_item !== info_pg_show_link);
                    
                    // Update user data
                    await updUsrProfFlds(
                    {
                        prof_likes: selectedProfile.prof_likes
                    });

                    // Remove "selected" class from the like button
                    likeTheEp.classList.remove("selected");

                    // Update button Icon & text
                    likeBtnBox.setAttribute(`like-status` , `dflt`);
                    likeBtnBox.querySelector(".btmText").textContent = "Rate";
                }
                else
                {
                    // Remove from the disliked shows if present there
                    if(dontLikeTheEp.classList.contains("selected"))
                    {
                        // Remove item from the dislikes array
                        selectedProfile.prof_dislikes = selectedProfile.prof_dislikes.filter(item => item.ds_item !== info_pg_show_link);

                        // Remove "selected" class from the dislike button
                        dontLikeTheEp.classList.remove("selected");
                    }

                    // Add item to the likes array
                    selectedProfile.prof_likes.push(
                        {
                            ls_item: `${info_pg_show_link}`,
                        }
                    );

                    // Update user data
                    await updUsrProfFlds(
                    {
                        prof_likes: selectedProfile.prof_likes,
                        prof_dislikes: selectedProfile.prof_dislikes
                    });

                    // Add "selected" class to the like button
                    likeTheEp.classList.add("selected");

                    // Update button Icon & text
                    likeBtnBox.setAttribute(`like-status` , `yes`);
                    likeBtnBox.querySelector(".btmText").textContent = "Rated";
                }
            });
            
            // Dislike the show
            dontLikeTheEp.addEventListener("click" , async () => 
            {
                let selectedProfile = await getSelectedProfile();

                if(dontLikeTheEp.classList.contains("selected"))
                {
                    // Remove from the dislikes array
                    selectedProfile.prof_dislikes = selectedProfile.prof_dislikes.filter(item => item.ds_item !== info_pg_show_link);

                    // Update user data
                    await updUsrProfFlds(
                    {
                        prof_dislikes: selectedProfile.prof_dislikes
                    });

                    // Remove "selected" class from the like button
                    dontLikeTheEp.classList.remove("selected");

                    // Update button Icon & text
                    likeBtnBox.setAttribute(`like-status` , `dflt`);
                    likeBtnBox.querySelector(".btmText").textContent = "Rate";
                }
                else
                {
                    // Remove from the liked shows if present there
                    if(likeTheEp.classList.contains("selected"))
                    {
                        // Remove item from the likes array
                        selectedProfile.prof_likes = selectedProfile.prof_likes.filter(item => item.ls_item !== info_pg_show_link);

                        // Remove "selected" class from the like button
                        likeTheEp.classList.remove("selected");
                    }

                    // Add item to the likes array
                    selectedProfile.prof_dislikes.push(
                        {
                            ds_item: `${info_pg_show_link}`,
                        }
                    );

                    // Update user data
                    await updUsrProfFlds(
                    {
                        prof_likes: selectedProfile.prof_likes,
                        prof_dislikes: selectedProfile.prof_dislikes
                    });

                    // Add "selected" class to the like button
                    dontLikeTheEp.classList.add("selected");

                    // Update button Icon & text
                    likeBtnBox.setAttribute(`like-status` , `no`);
                    likeBtnBox.querySelector(".btmText").textContent = "Rated";
                }
            });



        // WATCHLIST

            // Toggle the state if show in watchlist
            let initShowinWL = selectedProfile.prof_watchlist.filter(item => item.wl_item === info_pg_show_link);

            if((initShowinWL.length > 0))
            {
                document.querySelectorAll(".wl_show_page").forEach((btn) => 
                {
                    btn.querySelector(".wlIconSvg.wlIconOUT").classList.add("hide");
                    btn.querySelector(".wlIconSvg.wlIconIN").classList.remove("hide");
                });
            }



        // WATCH TRAILER

            // Setting the title of the button
            watchTrailerBox.title = "Watch " + showHeaderName.textContent + " trailer";

            // Handling the rendering of thr trailer elements
            watchTrailerBox.addEventListener("click" , () => 
            {
                const src = watchTrailerBox.getAttribute("src");
                initShowMediaVid(src, watchTrailerBox?.title);
            });


        // NAVIGATING THE CONTENT TABS

            ctntNavBtns.forEach((thisBtn, i) => 
            {
                const navTab = () => 
                {
                    ctntNavBtns.forEach((othBtn) => 
                    {
                        if((othBtn.classList.contains("selected")))
                        {
                            othBtn.classList.remove("selected");
                        }
                    });
                    ctntSectTabs.forEach((oldTab) => 
                    {
                        if((oldTab.classList.contains("selected")))
                        {
                            oldTab.classList.remove("selected");
                        }
                    });
                    thisBtn.classList.add("selected");
                    ctntSectTabs[i].classList.add("selected");
                }
                thisBtn.addEventListener("click" , navTab);
            });

        

        // WATCH NOW

            // Inits the watch now button
            updInfoPageCTA();

    }


    // Gets the show's main trailer
    function getShowMainTrailer(vids)
    {
        return (
            vids?.results.find(
                v =>
                    v.type === "Trailer" &&
                    v.site === "YouTube" &&
                    v.official === true
            ) ||
            vids?.results.find(
                v => v.type === "Trailer" && v.site === "YouTube"
            ) || null
        );
    }


    // Setting the Primary CTA button
    async function updInfoPageCTA()
    {
        const watchNowBtn = document.querySelector(".watchShowNowBtn");

        watchNowBtn.onclick = () =>
        {
            preWatchPage(`${info_pg_show_link}/watch`);
        };
    }


    // Initializes a modal to watch the videos associated with a show
    function initShowMediaVid(src = null, title = "")
    {
        const trailerTitle = title !== ""
            ? title
            : document.querySelector("#show_Header_Name")?.textContent;
        const trailerSrc = src.toString().trim();

        // if source is empty or not available(N/A) notify and return
        if(((trailerSrc == undefined) || (trailerSrc == null) || (trailerSrc === "") 
            || (trailerSrc === "undefined") || (trailerSrc === "null")
            || (trailerSrc.includes("undefined")) || (trailerSrc.includes("null"))
        ))
        {
            notification(`notifyBad` , `Trailer unavailable`);
            return;
        }

        const trailerBdr = document.createElement("div");
        trailerBdr.classList.add("trailer_Bdr");
        trailerBdr.innerHTML =
        `
            <div class="trailer_Box">
                <div class="closeTrailerIcon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="closeTrailer closeTrailerSvg">
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                    </svg>
                </div>
                <iframe class="trailer_Frame" src="${trailerSrc}" title="${trailerTitle}" frameborder="0" autoplay="true" allowfullscreen></iframe>
            </div>
        `;

        documentCtnt.appendChild(trailerBdr);
        documentBody.classList.add('bodystop');

        trailerTimer = setTimeout
        (
            function()
            {
                trailerBdr.classList.add("active");

                clearTimeout(trailerTimer);

                const closeTrailer = trailerBdr.querySelector(".closeTrailer");
                closeTrailer.addEventListener("click" , () => 
                {
                    trailerBdr.remove();
                    documentBody.classList.remove('bodystop');
                });
            }
        ,100);
    }


