window.addEventListener("load", function(){
        //let contents=wrapper.children;
        let t=window.pageYOffset; // 윈도우 상단 위치 변수입니다.
        // console.log("t : "+t);
        let offsety=[]; // 위치 이동 배열입니다.
        let n=0; // 카테고리 번호 변수입니다.
        let state1=true;
        let state2=true;
        let state3=true;
        let state4=true;
        let state5=true;
        let state6=true;
        let state7=true;
        let state8=true;
        let state9=true;
        let state10=true;


        window.addEventListener("scroll", function(){
		   t=window.pageYOffset;
		   console.log("t : "+t);
           
           if(t > 200 && state1==true){
              state1=false;
              document.querySelector(".services_txt h5").classList.add("act");
              document.querySelector(".services_txt h3").classList.add("act");
              document.querySelector(".services_txt h1").classList.add("act");
              document.querySelector(".services_txt .txt1").classList.add("act");
              document.querySelector(".services_txt h4").classList.add("act");
              document.querySelector(".services_txt .txt2").classList.add("act");
              document.querySelector(".services_img").classList.add("act");
              document.querySelector(".services_txt > button").classList.add("act");
              document.querySelector(".services_menu").classList.add("act");
              document.querySelector(".services_menu button").classList.add("act");
           }else if(t < 180 && state1==false){
              state1=true;
              document.querySelector(".services_txt h5").classList.remove("act");
              document.querySelector(".services_txt h3").classList.remove("act");
              document.querySelector(".services_txt h1").classList.remove("act");
              document.querySelector(".services_txt .txt1").classList.remove("act");
              document.querySelector(".services_txt h4").classList.remove("act");
              document.querySelector(".services_txt .txt2").classList.remove("act");
              document.querySelector(".services_img").classList.remove("act");
              document.querySelector(".services_txt > button").classList.remove("act");
              document.querySelector(".services_menu").classList.remove("act");
              document.querySelector(".services_menu button").classList.remove("act");
           }

           if(t > 1400 && state2==true){
              state2=false;
              document.querySelector(".performance_inner > h5").classList.add("act");
              document.querySelector(".performance_inner > h3").classList.add("act");
              document.querySelector(".performance_box").classList.add("act");
           }else if(t < 1200 && state2==false){
              state2=true;
              document.querySelector(".performance_inner > h5").classList.remove("act");
              document.querySelector(".performance_inner > h3").classList.remove("act");
              document.querySelector(".performance_box").classList.remove("act");
           }


           if(t > 3000 && state9==true){
                state9=false;
                document.querySelector("#esg .esg_img").classList.add("act");
                document.querySelector("#esg .esg_title").classList.add("act");
           }else if(t < 2900 && state9==false){
                state9=true;
                    document.querySelector("#esg .esg_img").classList.remove("act");
                    document.querySelector("#esg .esg_title").classList.remove("act");
           }

           if(t > 3800 && state10==true){
                state10=false;
                document.querySelector("#esg .esg_img").style.display = "none";
                document.querySelector("#esg .esg_title").style.display = "none";
                
           }else if(t < 3750 && state10==false){
                state10=true;
                    document.querySelector("#esg .esg_img").style.display = "block";
                    document.querySelector("#esg .esg_title").style.display = "block";
           }


           if(t > 4100 && state4==true){
              state4=false;
              document.querySelector(".archive_inner h5").classList.add("act");
              document.querySelector(".archive_inner h3").classList.add("act");
              document.querySelector(".archive_slider ").classList.add("act");
           }else if(t < 4000&& state4==false){
              state4=true;
              document.querySelector(".archive_inner h5").classList.remove("act");
              document.querySelector(".archive_inner h3").classList.remove("act");
              document.querySelector(".archive_slider ").classList.remove("act");
           }

           if(t > 5300 && state5==true){
              state5=false;
              document.querySelector(".news_text").classList.add("act");
              document.querySelector(".news_list").classList.add("act");
           }else if(t < 5200&& state5==false){
              state5=true;
              document.querySelector(".news_text").classList.remove("act");
              document.querySelector(".news_list").classList.remove("act");
           }

           if(t > 5900 && state6==true){
              state6=false;
              document.querySelector(".notice_l").classList.add("act");
              document.querySelector(".notice_r").classList.add("act");
           }else if(t < 5800&& state6==false){
              state6=true;
              document.querySelector(".notice_l").classList.remove("act");
              document.querySelector(".notice_r").classList.remove("act");
           }

           if(t > 6200 && state7==true){
              state7=false;
              document.querySelector("#mcontact").classList.add("act");
              document.querySelector(".mcontact_l").classList.add("act");
              document.querySelector(".mcontact_r button").classList.add("act");
           }else if(t < 6100 && state7==false){
              state7=true;
              document.querySelector("#mcontact").classList.remove("act");
              document.querySelector(".mcontact_l").classList.remove("act");
              document.querySelector(".mcontact_r button").classList.remove("act");
              
           }

           if(t > 6600 && state8==true){
              state8=false;
              document.querySelector(".msite_menu").classList.add("act");
           }else if(t < 6400 && state8==false){
              state8=true;
              document.querySelector(".msite_menu").classList.remove("act");
           }
        }); 
});
const lenis = new Lenis({
  duration: 1.2,
  smoothWheel: true,
  wheelMultiplier: 0.8,
  touchMultiplier: 1.5,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const motionItems = document.querySelectorAll(
    ".archive_inner h5, .archive_inner h3, .archive_slider, .archive_pagination, .news_text, .news_list, .notice_l, .notice_r, #mcontact, .mcontact_l, .mcontact_r button, .msite_menu"
);

const observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
        if(entry.isIntersecting){
            entry.target.classList.add("act");
        }
    });
}, {
    threshold: 0.15,
    rootMargin: "0px 0px -10% 0px"
});

motionItems.forEach(function(item){
    observer.observe(item);
});
