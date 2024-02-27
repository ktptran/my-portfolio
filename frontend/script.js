/*
  Name: Kevin Tran
  Date: April 15th, 2020

  This script.js is for my website focused on giving functionality to the html encoded in
  home.html and css encoded in home.css.
*/
// 1. Scrolling function for navbar
$(document).ready(function() {
  let scrollLink = $('.scroll');

  // Smooth scrolling
  scrollLink.click(function(event) {
    event.preventDefault();
    $('body,html').animate({
      scrollTop: $(this.hash).offset().top - 75
    }, 750)
  })
});

// 2. About me section
// About-me section constants
const TABS = document.querySelectorAll('[data-tab-target]')
const TAB_CONTENTS = document.querySelectorAll('[data-tab-content]')

// About me section TABS
TABS.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.tabTarget)
    TAB_CONTENTS.forEach(tabContent => {
      tabContent.classList.remove('active')
    })
    target.classList.add('active')
    TABS.forEach(tab => {
      tab.classList.remove('active')
    })
    tab.classList.add('active')
    target.classList.add('active')
  })
});

// Projects section
const TABS_PROJECT = document.querySelectorAll('[data-tab-target-project]')
const TAB_CONTENTS_PROJECT = document.querySelectorAll('[data-tab-project]')

// About me section TABS
TABS_PROJECT.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.tabTargetProject);
    TAB_CONTENTS_PROJECT.forEach(tabContentProject => {
      tabContentProject.classList.remove('active')
    })
    target.classList.add('active')
    TABS_PROJECT.forEach(tab => {
      tab.classList.remove('active')
    })
    tab.classList.add('active')
    target.classList.add('active')
  })
});

// 3. Fading in and out effects
const FADERS = document.querySelectorAll('.fade-in');
const SLIDERS =document.querySelectorAll(".slide-in");
const APPEAR_OPTIONS = {
  threshold: 0,
  rootMargin: "0px 0px -100px 0px"
};
const appearOnScroll = new IntersectionObserver
(function(
  entries,
  appearOnScroll
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add('appear');
      appearOnScroll.unobserve(entry.target);
    }
  })
},
APPEAR_OPTIONS);

FADERS.forEach(fader => {
  appearOnScroll.observe(fader);
});

SLIDERS.forEach(slider => {
  appearOnScroll.observe(slider)
});

$(function() {
  $(".toggle").on("click", function() {
    if($(".item").hasClass("active")) {
      $(".item").removeClass("active");
    }
    else {
      $(".item").addClass("active");
    }
  })
});
