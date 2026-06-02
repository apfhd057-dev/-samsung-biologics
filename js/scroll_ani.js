window.addEventListener("load", function(){

    function showItems(selectors){
        selectors.forEach(function(selector){
            const el = document.querySelector(selector);
            if(el) el.classList.add("act");
        });
    }

    function hideItems(selectors){
        selectors.forEach(function(selector){
            const el = document.querySelector(selector);
            if(el) el.classList.remove("act");
        });
    }

    function sectionMotion(sectionSelector, showSelectors, offset){
        const section = document.querySelector(sectionSelector);
        if(!section) return;

        const sectionTop = section.getBoundingClientRect().top;
        const windowH = window.innerHeight;

        if(sectionTop < windowH - offset){
            showItems(showSelectors);
        }else{
            hideItems(showSelectors);
        }
    }

    function scrollMotion(){
        sectionMotion("#services", [
            ".services_txt h5",
            ".services_txt h3",
            ".services_txt h1",
            ".services_txt .txt1",
            ".services_txt h4",
            ".services_txt .txt2",
            ".services_img",
            ".services_txt > button",
            ".services_menu",
            ".services_menu button"
        ], 180);

        sectionMotion("#performance", [
            ".performance_inner > h5",
            ".performance_inner > h3",
            ".performance_box"
        ], 180);

        sectionMotion("#archive", [
            ".archive_inner h5",
            ".archive_inner h3",
            ".archive_slider"
        ], 220);

        sectionMotion("#newsroom", [
            ".news_text",
            ".news_list"
        ], 220);

        sectionMotion("#notice", [
            ".notice_l",
            ".notice_r"
        ], 220);

        sectionMotion("#mcontact", [
            "#mcontact",
            ".mcontact_l",
            ".mcontact_r button"
        ], 220);

        sectionMotion("#msitemap", [
            ".msite_menu"
        ], 220);
    }

    window.addEventListener("scroll", scrollMotion, { passive: true });
    scrollMotion();
});