/*************************************************************
 * This is the script for the General area of the Episode pages of ACUvid V3
 * ************************************************************/

    let watch_pg_show_link = "";
    let watch_pg_show_ssns = [];


    // Opens the Watch Page without reloading the page
    function preWatchPage(url = "")
    {
        if(url.length > 0)
        {
            history.pushState(null, '', url);
            initWatchPage(url.split("/")[4], url.split("/")[5]);
        }
    }
    

    // Init watch page
    async function initWatchPage(ssn = null, eps = null)
    {

        // Build page base
        let show_title = showsStructData?.name || showsStructData?.title || "N/A";
        const watchPgBase = document.createElement("div");
        watchPgBase.className = "watch_pg_base";
        watchPgBase.innerHTML = 
        `
            <div class="watch_pg_bcg"></div>
            <div class="watch_pg_bdr">
                <div class="watch_pg_box">
                    <div class="watch_pg_plyr_bdr">
                        <div class="watch_pg_plyr_box">
                            <div class="watch_pg_plyr_ldr_bdr">
                                <div class="watch_pg_plyr_ldr_box">
                                    <div class="watch_pg_plyr_ldr_pctl_bdr">
                                        <div class="watch_pg_plyr_ldr_icon_bdr">
                                        </div>
                                        <div class="watch_pg_plyr_ldr_pctl_box">
                                            <p class="watch_pg_plyr_ldr_pctl_txt">N/A%</p>
                                        </div>
                                        <div class="watch_pg_plyr_atn_bdr">
                                            <button type="button" class="genBtnBox genIconBtn transBtn watch_pg_plyr_atn_btn hide" disabled>
                                                <div class="genBtnIcon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="genBtnSvg">
                                                        <path d="M21.409 9.353a2.998 2.998 0 0 1 0 5.294L8.597 21.614C6.534 22.737 4 21.277 4 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648z" />
                                                    </svg>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="vid_bdr">
                                <div class="vid_box">
                                    <div class="container video_player show-controls">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="watch_pg_nav_bdr">
                        <div class="watch_pg_nav_box">
                            <div class="watch_pg_det_bdr">
                                <div class="watch_pg_det_box">
                                    <button type="button" class="genBtnBox transBtn thin watch_pg_ret_btn">
                                        <div class="genBtnIcon">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="genBtnSvg">
                                                <path fill-rule="evenodd" d="M15.488 4.43a.75.75 0 0 1 .081 1.058L9.988 12l5.581 6.512a.75.75 0 1 1-1.138.976l-6-7a.75.75 0 0 1 0-.976l6-7a.75.75 0 0 1 1.057-.081" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                        <span class="genBtnText">Back</span>
                                    </button>
                                    <div class="watch_pg_dvd_box">
                                        <p class="watch_pg_dvd_txt">/</p>
                                    </div>
                                    <div class="watch_pg_ttl_box">
                                        <p class="watch_pg_ttl_txt">${show_title}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        documentCtnt.insertAdjacentElement('beforeend', watchPgBase);

        // Add selectors
        watchPgRetBtn = watchPgBase.querySelector(".watch_pg_ret_btn");
        let watch_pg_tmr;

        // Returning back to show's info page (Closes the watch page)
        const clsWatchPgMdl = async (isVal = false) =>
        {
            document.querySelector(".watch_pg_plyr_ldr_bdr").classList.remove("loaded");

            // Stop and remove video
            const currVid = document.querySelector(".video_player .main-video");
            
            if(currVid) 
            {
                currVid.pause();

                // Revoke the blob URL to free memory
                const srcSets = currVid.querySelectorAll("source");
                if((srcSets) && (srcSets.length > 0))
                {
                    srcSets.forEach((source) => 
                    {
                        // Revoke blob URL
                        if(source.src.startsWith("blob:"))
                        {
                            URL.revokeObjectURL(source.src);
                        }

                        // Remove src
                        source.removeAttribute("src"); 
                    });
                }

                // Revoke the video's src
                URL.revokeObjectURL(currVid.src);
                currVid.removeAttribute("src");

                // Unload the video
                currVid.load();
            }

            await saveWatchProgessInHist();

            // Update show's CTA button
            updInfoPageCTA();

            // Update page url with equivalent
            history.pushState(null, '', info_pg_show_link);

            watchPgBase.classList.remove("active");
            watch_pg_tmr = setTimeout(() => 
            {
                clearTimeout(watch_pg_tmr);
                documentBody.classList.remove("bodystop");
                watchPgBase.remove();
            },300);
        }

        // Clean up url (Remove unsued sections)
        history.replaceState(null, '', `#/${info_pg_show_type}/${info_pg_show_id}/watch`);

        // Display base
        watch_pg_tmr = setTimeout(() => 
        {
            clearTimeout(watch_pg_tmr);
            watchPgBase.classList.add("active");
            attachGenMenuModalEventListeners();

            watchPgBase.addEventListener("transitionend", function handleTransitionEnd()
            {
                documentBody.classList.add("bodystop");
                watchPgBase.removeEventListener("transitionend", handleTransitionEnd);
                preUVPlyr();
            });
        },300);

        // Close the watch page
        watchPgRetBtn.onclick = () => clsWatchPgMdl();
    }
