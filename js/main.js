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