$(function () {
    // header scroll animaiton
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

let lastScrollY = window.scrollY;
let activeIndex = 0; // 현재 활성화된 단어의 인덱스

document.addEventListener("scroll", () => {
    const words = document.querySelectorAll(".word");
    const sticky = document.getElementById("sticky");
    const container = document.querySelector(".sticky-container");
    const rect = container.getBoundingClientRect();

    // sticky 영역이 화면에 들어왔는지 확인
    if (rect.top < window.innerHeight * 0.4 && rect.bottom > window.innerHeight * 0.2) {
        let currentScrollY = window.scrollY;

        // 아래로 스크롤할 때
        if (currentScrollY > lastScrollY) {
            if (activeIndex < words.length) {
                words[activeIndex].classList.add("active");
                activeIndex++;
            }
        } 
        // 위로 스크롤할 때
        else if (currentScrollY < lastScrollY) {
            if (activeIndex > 0) {
                activeIndex--;
                words[activeIndex].classList.remove("active");
            }
        }

        lastScrollY = currentScrollY;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // contact animation
    const letters = document.querySelectorAll(".letter");

    // 페이지 로드 시 초기 애니메이션 적용
    letters.forEach((letter, index) => {
        letter.style.animation = `bounce 0.4s ease-out forwards`;
        letter.style.animationDelay = `${index * 0.05}s`;
    });

    // Hover 시 애니메이션 다시 실행
    document.querySelector(".contact").addEventListener("mouseenter", () => {
        letters.forEach((letter, index) => {
            letter.style.animation = "none"; // 기존 애니메이션 초기화
            setTimeout(() => {
                letter.style.animation = `bounce 0.4s ease-out forwards`;
                letter.style.animationDelay = `${index * 0.05}s`;
            }, 10);
        });
    });

    // text animation
    const scrollContents = document.querySelectorAll('.scroll-txt');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });

    scrollContents.forEach(content => observer.observe(content));

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



// email copy event
function email_copy() {
    const emailText = document.getElementById("emailTxt").textContent;
    navigator.clipboard.writeText(emailText).then(() => {
        showModal(`메일 주소가 복사되었습니다.`);
    }).catch(err => {
        console.error("복사 실패", err);
        showModal("메일 주소가 복사되지 않았습니다.");
    });
}

// modal open event
function showModal(message) {
    const modal = document.getElementById("modal");
    const overlay = document.getElementById("overlay");
    const modalText = document.getElementById("modal-text");

    modalText.innerHTML = message; // 동적으로 문구 변경
    modal.classList.add("show");
    overlay.classList.add("show");

    setTimeout(closeModal, 5000);
}

// modal close event
function closeModal() {
    document.getElementById("modal").classList.remove("show");
    document.getElementById("overlay").classList.remove("show");
}