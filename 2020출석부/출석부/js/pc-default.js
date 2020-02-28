const btns = document.querySelectorAll('.select-Btns');

function selectBtnClick() {
    btns.forEach(function(btn) {
        if (btn !== this) {
            btn.classList.remove('selected');
        }
    });
    this.classList.add('selected');
}

btns.forEach(function(btn) {
    btn.addEventListener("click", selectBtnClick);
});