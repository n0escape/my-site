window.addEventListener('scroll', function() {
    var footer = document.querySelector('footer');
    var bottomLeft = document.getElementsByClassName('pageUp')[0];
    var footerOffset = footer.getBoundingClientRect().top - window.innerHeight;

    if (footerOffset <= 0) {
        bottomLeft.style.bottom = Math.abs(footerOffset) + 'px';
    } else {
        bottomLeft.style.bottom = '10px';
    }
});