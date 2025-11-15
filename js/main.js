// JavaScript source code
// =============================
// 1. 스크롤 관련: 헤더 shrink + scroll-txt + email 애니메이션
// =============================
document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const letters = document.querySelectorAll('.letter');
  const emailEl = document.querySelector('.email');
  const scrollContents = document.querySelectorAll('.scroll-txt');

  // 헤더 shrink 처리
  function handleHeaderShrink() {
    if (!header) return;
    if (window.scrollY > 0) {
      header.classList.add('shrink');
    } else {
      header.classList.remove('shrink');
    }
  }

  window.addEventListener('scroll', handleHeaderShrink);
  handleHeaderShrink(); // 첫 진입 시 상태 맞추기

  // 글자 튀는 애니메이션
  function playLetterAnimation() {
    letters.forEach((letter, index) => {
      // 기존 애니메이션 초기화
      letter.style.animation = 'none';
      letter.style.animationDelay = '0s';

      // reflow 강제해서 "새 애니메이션"으로 인식시키기
      void letter.offsetWidth;

      // 다시 bounce 적용
      letter.style.animation = 'bounce 0.4s ease-out forwards';
      letter.style.animationDelay = `${index * 0.05}s`;
    });
  }

  // 1) scroll-txt용 IntersectionObserver
  if ('IntersectionObserver' in window && scrollContents.length) {
    const scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.target.classList.contains('scroll-txt')) return;

          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          } else {
            entry.target.classList.remove('show');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px',
      }
    );

    scrollContents.forEach((content) => scrollObserver.observe(content));
  }

  // 2) email용 IntersectionObserver (중앙 영역 감지)
  if (emailEl && 'IntersectionObserver' in window) {
    let emailInView = false;

    const emailObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
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
        rootMargin: '-45% 0px -45% 0px',
      }
    );

    emailObserver.observe(emailEl);
  }
});

// =============================
// 2. Floating Contact FAB behavior
// =============================
(function () {
  const fab = document.getElementById('fabContact');
  if (!fab) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let idleTimer = null;
  const IDLE_MS = 4000; // 3~5초 권장, 여기선 4초

  function hideFab() {
    fab.classList.add('fab--hidden');
  }

  function showFab() {
    fab.classList.remove('fab--hidden');
  }

  function resetIdle() {
    showFab();
    if (idleTimer) clearTimeout(idleTimer);
    idleTimer = setTimeout(() => hideFab(), IDLE_MS);
  }

  // 유저 활동 감지
  ['scroll', 'mousemove', 'keydown', 'touchstart'].forEach((evt) =>
    window.addEventListener(evt, resetIdle, { passive: true })
  );

  // 초기 진입 시 타이머 시작
  resetIdle();

  // Contact 섹션 근처에서 자동 숨김(겹침 방지)
  const contact = document.querySelector('#Contact');
  if (contact && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            hideFab();
            if (idleTimer) clearTimeout(idleTimer);
          } else {
            resetIdle();
          }
        });
      },
      { threshold: 0.1 }
    );
    io.observe(contact);
  }

  // 앵커 클릭 시: 즉시 숨기고 스크롤 후 다시 타이머
  fab.addEventListener('click', () => {
    hideFab();
    setTimeout(resetIdle, prefersReduced ? 0 : 700);
  });
})();

// =============================
// 3. Modal & Clipboard
// =============================
(function () {
  const body = document.body;

  const modalState = {
    current: null,
    lastFocused: null,
  };

  function getFocusableElements(container) {
    const selectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');
    return Array.from(container.querySelectorAll(selectors)).filter(
      (el) => !el.hasAttribute('hidden') && el.offsetParent !== null
    );
  }

  const modal = {
    open(selectorOrElement) {
      const el =
        typeof selectorOrElement === 'string'
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
      const el =
        typeof selectorOrElement === 'string'
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
        body.classList.remove('modal-open'); // 동시에 2개 모달 안 쓰므로 바로 제거
      }, 200);
    },

    closeAll() {
      const openedModals = document.querySelectorAll('.modal.is-open');

      openedModals.forEach((el) => {
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
    },
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
      modal.open('#alertModal'); // 카운트다운 없이 열기만
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
