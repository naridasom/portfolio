// JavaScript source code
$(function () {
    var shrinkHeader = 140;
    $(window).scroll(function () {
        var scroll = getCurrentScroll();
        if (scroll >= shrinkHeader) {
            $('#header').addClass('shrink');
        } else {
            $('#header').removeClass('shrink');
        }
    });
    function getCurrentScroll() {
        return window.pageYOffset || document.documentElement.scrollTop;
    }   
});

//     var filter = $(".filter li");
//     var port = $(".port-list li");

//     filter.click(function () {
//         if ($(this).hasClass('all')) {
//             filter.removeClass("active");
//             $(this).addClass("active");
//             port.show().addClass("");
//         }
//         else if ($(this).hasClass('app')) {
//             filter.removeClass("active");
//             $(this).addClass("active");
//             port.hide().removeClass("");
//             $(".port-list li.app").show().addClass("");
//         }
//         else if ($(this).hasClass('pc')) {
//             filter.removeClass("active");
//             $(this).addClass("active");
//             port.hide().removeClass("");
//             $(".port-list li.pc").show().addClass("");
//         }
//         else if ($(this).hasClass('rw')) {
//             filter.removeClass("active");
//             $(this).addClass("active");
//             port.hide().removeClass("");
//             $(".port-list li.rw").show().addClass("");
//         }
//     });
// });

// gsap.registerPlugin(Flip);

// const activeClass = "is-active";
// const inactiveClass = "is-inactive";
// const cards = document.querySelectorAll(".card");

// console.log(cards);
// cards.forEach((card, idx) => {
//     console.log(cards);
//   card.addEventListener("click", () => {
//     const state = Flip.getState(cards);
//     const isCardActive = card.classList.contains(activeClass);

//     cards.forEach((otherCard, otherIdx) => {
//       otherCard.classList.remove(activeClass);
//       otherCard.classList.remove(inactiveClass);
//       if (!isCardActive && idx !== otherIdx)
//         otherCard.classList.add(inactiveClass);
//     });

//     if (!isCardActive) {
//       card.classList.add(activeClass);
//     }

//     Flip.from(state, {
//       duration: 1,
//       ease: "expo.out",
//       absolute: true
//     });
//   });
// });

// gsap.registerPlugin(Flip);

// // Variables
// const activeClass = "is-active";
// const cards = document.querySelectorAll("[data-card]");

// const updateCard = (card, idx, active) => {
//   const cardInner = card.querySelector(".card-inner");
//   const image = card.querySelector(".card-icon");

//   // Bail out if we're in the middle of a flip
//   if (Flip.isFlipping(cardInner)) return;

//   const cardState = Flip.getState(cardInner, {
//     props: "box-shadow, border-radius"
//   });
//   const imageState = Flip.getState(image);
//   card.classList.toggle(activeClass, active);

//   const duration = active ? 0.7 : 0.5;
//   const ease = "quint.out";

//   const cardContent = document.querySelectorAll(".port-cont")[idx];
//   gsap.killTweensOf(cardContent);
//   gsap.to(cardContent, {
//     duration: active ? 1 : 0.2,
//     ease: "expo.out",
//     stagger: 0.1,
//     alpha: active ? 1 : 0,
//     y: active ? 0 : 20,
//     delay: active ? 0.4 : 0
//   });

//   Flip.from(cardState, {
//     duration: duration,
//     ease: ease,
//     absolute: true,
//     zIndex: 1
//   });

//   Flip.from(imageState, {
//     duration: duration,
//     absolute: true,
//     ease: ease,
//     simple: true
//   });
// };

// // Init
// cards.forEach((card, idx) => {
//   updateCard(card, idx, false);
//   card.addEventListener("click", (evt) => {
//     updateCard(card, idx, !card.classList.contains(activeClass));
//   });
// });