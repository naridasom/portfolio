// JavaScript source code
window.addEventListener('scroll', function () {
  const header = document.getElementById('header');

  if (window.scrollY > 0) {
    header.classList.add('shrink');
  } else {
    header.classList.remove('shrink');
  }
});

document.addEventListener('DOMContentLoaded', () => {
const letters = document.querySelectorAll(".letter");
const emailEl = document.querySelector(".email");
const scrollContents = document.querySelectorAll(".scroll-txt");

// 글자 튀는 애니메이션 함수
function playLetterAnimation() {
  letters.forEach((letter, index) => {
    // 기존 애니메이션 초기화
    letter.style.animation = "none";
    letter.style.animationDelay = "0s";

    // reflow 강제해서 "새 애니메이션"으로 인식시키기
    void letter.offsetWidth;

    // 다시 bounce 적용
    letter.style.animation = `bounce 0.4s ease-out forwards`;
    letter.style.animationDelay = `${index * 0.05}s`;
  });
}

// =============================
// 1) scroll-txt용 IntersectionObserver
// =============================
const scrollObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.target.classList.contains("scroll-txt")) {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px",
  }
);

scrollContents.forEach((content) => scrollObserver.observe(content));

// =============================
// 2) email용 IntersectionObserver (중앙 영역 감지)
// =============================
let emailInView = false;

if (emailEl) {
  const emailObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // rootMargin으로 줄어든 "중앙 영역"에 들어온 상태
        const inCenter = entry.isIntersecting;

        // 밖 -> 중앙 진입 순간에만 실행
        if (inCenter && !emailInView) {
          playLetterAnimation();
        }

        emailInView = inCenter;
      });
    },
    {
      threshold: 0, // 1px만 닿아도 true
      // 화면 전체가 아니라 "중앙 10% 정도"만 감지하게 rootMargin으로 위아래를 줄임
      // (위 45%, 아래 45% 잘라낸다고 생각하면 됨)
      rootMargin: "-45% 0px -45% 0px",
    }
  );

  emailObserver.observe(emailEl);

  // Hover 시에도 재생
  //emailEl.addEventListener("mouseenter", playLetterAnimation);
}


  // tab event
  const tabs = document.querySelectorAll(".item");
  const items = document.querySelectorAll(".card");

  // 탭 클릭 이벤트
  tabs.forEach(tab => {
    tab.addEventListener("click", function () {
      // 모든 탭에서 active 클래스 제거 후 현재 탭에 추가
      tabs.forEach(t => t.classList.remove("active"));
      this.classList.add("active");

      const filter = this.dataset.filter;

      // 아이템 필터링
      items.forEach(item => {
        const categories = item.dataset.category.split(" "); // 여러 카테고리 처리

        if (filter === "all" || categories.includes(filter)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
});

/* ===== Floating Contact FAB behavior ===== */
(function () {
  const fab = document.getElementById('fabContact');
  if (!fab) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let idleTimer = null;
  const IDLE_MS = 4000; // 3~5초 권장, 여기선 4초

  function hideFab() { fab.classList.add('fab--hidden'); }
  function showFab() { fab.classList.remove('fab--hidden'); }

  function resetIdle() {
    showFab();
    if (idleTimer) clearTimeout(idleTimer);
    idleTimer = setTimeout(() => hideFab(), IDLE_MS);
  }

  // 유저 활동 감지
  ['scroll', 'mousemove', 'keydown', 'touchstart'].forEach(evt =>
    window.addEventListener(evt, resetIdle, { passive: true })
  );

  // 초기 진입 시 타이머 시작
  resetIdle();

  // Contact 섹션 근처에서 자동 숨김(겹침 방지)
  const contact = document.querySelector('#Contact');
  if (contact && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          hideFab();
          if (idleTimer) clearTimeout(idleTimer);
        } else {
          resetIdle();
        }
      });
    }, { threshold: 0.1 });
    io.observe(contact);
  }

  // 앵커 클릭 시: 즉시 숨기고 스크롤 후 다시 타이머
  fab.addEventListener('click', () => {
    hideFab();
    setTimeout(resetIdle, prefersReduced ? 0 : 700);
  });
})();


// $(function () {
//     var shrinkHeader = 140;
//     $(window).scroll(function () {
//         var scroll = getCurrentScroll();
//         if (scroll >= shrinkHeader) {
//             $('#header').addClass('shrink');
//         } else {
//             $('#header').removeClass('shrink');
//         }
//     });
//     function getCurrentScroll() {
//         return window.pageYOffset || document.documentElement.scrollTop;
//     }   
// });

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

/* =========================================================================
   Refined Interaction (filter + reveal + smooth anchors)
   ===================================================================== */
// (function () {
//   const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

//   // Build card index by type from .site-type text (no extra data-attrs needed)
//   const cards = Array.from(document.querySelectorAll('.contents.portfolio .port-list .card'));
//   const getTypes = (card) => {
//     const spans = card.querySelectorAll('.site-type span');
//     return Array.from(spans).map(s => s.textContent.trim().toLowerCase());
//   };

//   function applyFilter(typeLabel) {
//     const target = typeLabel.toLowerCase();
//     cards.forEach(card => {
//       const types = getTypes(card);
//       const show = (target === 'all') || types.includes(target);
//       if (show) {
//         card.style.display = 'block';
//         if (!prefersReduced && window.gsap) {
//           gsap.to(card, { opacity: 1, duration: 0.22, ease: 'power1.out' });
//         } else {
//           card.style.opacity = 1;
//         }
//       } else {
//         if (!prefersReduced && window.gsap) {
//           gsap.to(card, { opacity: 0, duration: 0.18, ease: 'power1.in', onComplete: () => {
//             card.style.display = 'none';
//           }});
//         } else {
//           card.style.opacity = 0;
//           card.style.display = 'none';
//         }
//       }
//     });
//   }

//   // Set up filter clicks
//   const filter = document.querySelector('.contents.portfolio .filter[data-filter]');
//   if (filter) {
//     filter.addEventListener('click', (e) => {
//       const li = e.target.closest('li[data-type]');
//       if (!li) return;
//       filter.querySelectorAll('li').forEach(el => el.classList.remove('active'));
//       li.classList.add('active');
//       applyFilter(li.dataset.type);
//     });
//   }

//   // On-scroll reveal (subtle)
//   const io = (!prefersReduced && 'IntersectionObserver' in window) ? new IntersectionObserver((entries, obs) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         if (window.gsap) {
//           gsap.fromTo(entry.target, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' });
//         } else {
//           entry.target.style.opacity = 1;
//           entry.target.style.transform = 'none';
//         }
//         obs.unobserve(entry.target);
//       }
//     });
//   }, { threshold: 0.15 }) : null;

//   cards.forEach(card => {
//     if (io) {
//       card.style.opacity = 0;
//       card.style.transform = 'translateY(12px)';
//       io.observe(card);
//     } else {
//       card.style.opacity = 1;
//     }
//   });

//   // Smooth anchor scroll
//   document.querySelectorAll('a[href^="#"]').forEach(a => {
//     a.addEventListener('click', function (e) {
//       const id = this.getAttribute('href');
//       const target = document.querySelector(id);
//       if (target) {
//         e.preventDefault();
//         target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
//       }
//     });
//   });

//   // Initial: set All
//   const active = filter ? filter.querySelector('li.active[data-type]') : null;
//   if (active) applyFilter(active.dataset.type);
// })();




(function () {
  const body = document.body;

  const modalState = {
    current: null,
    lastFocused: null
  };

  function getFocusableElements(container) {
    const selectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(',');
    return Array.from(container.querySelectorAll(selectors))
      .filter(el => !el.hasAttribute('hidden') && el.offsetParent !== null);
  }

  const modal = {
    open(selectorOrElement) {
      const el = typeof selectorOrElement === 'string'
        ? document.querySelector(selectorOrElement)
        : selectorOrElement;
      if (!el) return;

      modalState.lastFocused = document.activeElement;
      modalState.current = el;

      el.classList.add('is-open');
      el.setAttribute('aria-hidden', 'false');
      body.classList.add('modal-open');

      // 애니메이션용 클래스
      requestAnimationFrame(() => {
        el.classList.add('is-visible');
      });

      // 포커스 이동
      const focusable = getFocusableElements(el);
      if (focusable.length) {
        focusable[0].focus();
      } else {
        el.focus();
      }
    },

    close(selectorOrElement) {
      const el = typeof selectorOrElement === 'string'
        ? document.querySelector(selectorOrElement)
        : selectorOrElement;
      if (!el) return;

      // 사라지는 애니메이션
      el.classList.remove('is-visible');

      // 현재 활성 모달 상태 초기화
      if (modalState.current === el) {
        modalState.current = null;
      }

      // 포커스 원래 위치로 복귀
      if (modalState.lastFocused && typeof modalState.lastFocused.focus === 'function') {
        modalState.lastFocused.focus();
        modalState.lastFocused = null;
      }

      // 애니메이션 끝난 후 실제로 닫고 body 클래스 제거
      setTimeout(() => {
        el.classList.remove('is-open');
        el.setAttribute('aria-hidden', 'true');
        body.classList.remove('modal-open'); // 동시에 2개 모달 안 쓸 거라 바로 제거
      }, 200);
    },

    closeAll() {
      document.querySelectorAll('.modal.is-open').forEach(el => {
        el.classList.remove('is-visible');
        setTimeout(() => {
          el.classList.remove('is-open');
          el.setAttribute('aria-hidden', 'true');
        }, 200);
      });

      body.classList.remove('modal-open');

      if (modalState.lastFocused && typeof modalState.lastFocused.focus === 'function') {
        modalState.lastFocused.focus();
        modalState.lastFocused = null;
      }
      modalState.current = null;
    }
  };

  // 클립보드 복사
  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
    } catch (e) {
      console.error('복사 실패', e);
    }
    document.body.removeChild(textarea);
  }

  // 클릭 이벤트 위임
  document.addEventListener('click', function (e) {
    const trigger = e.target.closest('[data-modal-target], .btn-copy');
    const closeBtn = e.target.closest('[data-modal-close]');
    const overlay = e.target.closest('.modal');
    const content = e.target.closest('.modal-box');

    // 1) 메일 복사 버튼
    if (trigger && trigger.classList.contains('btn-copy')) {
      e.preventDefault();
      const email = trigger.getAttribute('data-email') || 'test@test.com';
      copyToClipboard(email);
      modal.open('#alertModal'); // ✅ 카운트다운 없이 열기만
      return;
    }

    // 2) 일반 모달 열기
    if (trigger && trigger.hasAttribute('data-modal-target')) {
      e.preventDefault();
      const targetSelector = trigger.getAttribute('data-modal-target');
      modal.open(targetSelector);
      return;
    }

    // 3) 닫기 버튼
    if (closeBtn) {
      const modalEl = closeBtn.closest('.modal');
      if (modalEl) {
        modal.close(modalEl);
      }
      return;
    }

    // 4) 배경 클릭 시 닫기
    if (overlay && !content) {
      modal.close(overlay);
      return;
    }
  });

  // ESC + 포커스 트랩
  document.addEventListener('keydown', function (e) {
    // ESC
    if (e.key === 'Escape' || e.key === 'Esc') {
      modal.closeAll();
      return;
    }

    // Tab 포커스 트랩
    if (e.key === 'Tab' && modalState.current) {
      const focusable = getFocusableElements(modalState.current);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });

})();