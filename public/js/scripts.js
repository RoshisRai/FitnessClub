jQuery( document ).ready(function( $ ) {
	"use strict";

        // Page loading animation
        $("#preloader").animate({
            'opacity': '0'
        }, 600, function(){
            setTimeout(function(){
                $("#preloader").css("visibility", "hidden").fadeOut();
            }, 300);
        });  
});

//For Alert
$(()=>{
    setTimeout(function(){
        $('.alert').fadeIn();
        setTimeout(function(){
            $('.alert').fadeOut();
        }, 2200);
    }, 2000);
    $('.alert span:last-child').on('click',function(){
        $(this).parent().fadeOut();
    })
})

$(document).ready(function(){
    //Nav Search Toggle
    $(".nav-dropdown").on("click", function(){
        $(".navlinks").addClass("navlinks-show")
        $(".nav-shadow").addClass("nav-shadow-show")
        $(this).toggleClass('dropped')
    })
    $(".cross-icon").on("click", function(){
        $(".navlinks").removeClass("navlinks-show")
        $(".nav-shadow").removeClass("nav-shadow-show")
        $(".nav-dropdown").toggleClass('dropped')
    })
    $("#nav-shadow").on("click", function(){
        $(".navlinks").removeClass("navlinks-show")
        $(".nav-shadow").removeClass("nav-shadow-show")
        $(".nav-dropdown").toggleClass('dropped')
    })

    //Nav Search Toggle
    $(".nav-search-toggle").on("click", function(){
        $(".search-body").toggleClass("nav-search-active")
        $(this).toggleClass("fa-solid fa-magnifying-glass")
        $(this).toggleClass("fa-solid fa-xmark")
    })

    $(window).on("scroll", function (e) {
        $(".search-body").removeClass("nav-search-active")
        if($(".nav-search-toggle").hasClass('fa-magnifying-glass')){
            $(".nav-search-toggle").removeClass("fa-magnifying-glass")
            $(".nav-search-toggle").addClass("fa-xmark")
        }
        if(!$(".nav-search-toggle").hasClass('fa-magnifying-glass')){
            $(".nav-search-toggle").addClass("fa-magnifying-glass")
            $(".nav-search-toggle").removeClass("fa-xmark")
        }
    });
    $(window).on("resize", function (e) {
        $(".search-body").removeClass("nav-search-active")
        if(!$(".nav-search-toggle").hasClass('fa-magnifying-glass')){
            $(".nav-search-toggle").addClass("fa-magnifying-glass")
            $(".nav-search-toggle").removeClass("fa-xmark")
        }
    });
})

window.onscroll = function() { myFunction() };
var navbar = document.getElementById("navbar");
var addMargin = document.getElementById("add-margin");
var sticky = navbar.offsetTop;

function myFunction() {
    if (window.scrollY >= sticky) {
        navbar.classList.add("sticky")
        addMargin.classList.add("add-margin")
    } else {
        navbar.classList.remove("sticky");
        addMargin.classList.remove("add-margin");
    }
}

const myslide = document.querySelectorAll('.myslide'),
	  dot = document.querySelectorAll('.dot');
let counter = 1;
slidefun(counter);

let timer = setInterval(autoSlide, 8000);
function autoSlide() {
	counter += 1;
	slidefun(counter);
}
function plusSlides(n) {
	counter += n;
	slidefun(counter);
	resetTimer();
}
function currentSlide(n) {
	counter = n;
	slidefun(counter);
	resetTimer();
}
function resetTimer() {
	clearInterval(timer);
	timer = setInterval(autoSlide, 8000);
}

function slidefun(n) {
    gsap.set('.sth3', {scale: 0})
    gsap.to(".sth3", {scale: 1, duration: 2, delay: .5, ease: "elastic.out(1, 0.3)"})

    gsap.set('.sth2', {y: 50, opacity: 0})
    gsap.to(".sth2", {y: 0, opacity: 1, duration:1.5, delay: 0, ease: "back.out(1.7)"})

    gsap.set(".stp", {x: -100, opacity: 0})
    gsap.to(".stp", {x: 0, opacity: 1, duration: .5, delay: .5, ease: 'easeout'})

    gsap.set(".stbtns", {scale: 0})
    gsap.to(".stbtns", {scale: 1,duration: 2, ease: "easeout"})
	
	let i;
	for(i = 0;i<myslide.length;i++){
		myslide[i].style.display = "none";
	}
	for(i = 0;i<dot.length;i++) {
		dot[i].className = dot[i].className.replace(' active', '');
	}
	if(n > myslide.length){
	   counter = 1;
	   }
	if(n < 1){
	   counter = myslide.length;
	   }
	myslide[counter - 1].style.display = "block";
	dot[counter - 1].className += " active";

}


const gallery  = document.querySelectorAll(".image"),
previewBox = document.querySelector(".preview-box"),
previewImg = previewBox.querySelector("img"),
closeIcon = previewBox.querySelector(".icon"),
currentImg = previewBox.querySelector(".current-img"),
totalImg = previewBox.querySelector(".total-img"),
shadow = document.querySelector(".shadow");
window.onload = ()=>{
    for (let i = 0; i < gallery.length; i++) {
        totalImg.textContent = gallery.length; //passing total img length to totalImg variable
        let newIndex = i; //passing i value to newIndex variable
        let clickedImgIndex; //creating new variable
        gallery[i].onclick = () =>{
            clickedImgIndex = i; //passing cliked image index to created variable (clickedImgIndex)
            function preview(){
                currentImg.textContent = newIndex + 1; //passing current img index to currentImg varible with adding +1
                let imageURL = gallery[newIndex].querySelector("img").src; //getting user clicked img url
                previewImg.src = imageURL; //passing user clicked img url in previewImg src
            }
            preview(); //calling above function
    
            const prevBtn = document.querySelector(".pre");
            const nextBtn = document.querySelector(".nex");
            if(newIndex == 0){ //if index value is equal to 0 then hide prevBtn
                prevBtn.style.display = "none"; 
            }
            if(newIndex >= gallery.length - 1){ //if index value is greater and equal to gallery length by -1 then hide nextBtn
                nextBtn.style.display = "none"; 
            }
            prevBtn.onclick = ()=>{ 
                newIndex--; //decrement index
                if(newIndex == 0){
                    preview(); 
                    prevBtn.style.display = "none"; 
                }else{
                    preview();
                    nextBtn.style.display = "block";
                } 
            }
            nextBtn.onclick = ()=>{ 
                newIndex++; //increment index
				console.log('hello next')
                if(newIndex >= gallery.length - 1){
                    preview(); 
                    nextBtn.style.display = "none";
                }else{
                    preview(); 
                    prevBtn.style.display = "block";
                }
            }
            document.querySelector("body").style.overflow = "hidden";
            previewBox.classList.add("show"); 
            shadow.style.display = "block"; 
            closeIcon.onclick = ()=>{
                newIndex = clickedImgIndex; //assigning user first clicked img index to newIndex
                prevBtn.style.display = "block"; 
                nextBtn.style.display = "block";
                previewBox.classList.remove("show");
                shadow.style.display = "none";
            }
        }
        
    } 
}