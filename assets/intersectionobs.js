const translateLeft = document.querySelectorAll('.translate-left');
const translateRight = document.querySelectorAll('.translate-right');

const observerOnTheLeft = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting == true) {
            let delay = entry.target.dataset.delay;
            entry.target.style.animation = 'translate-left 1s ' + delay + ' forwards ease-out';
        } else {
            entry.target.style.animation = 'none';
        }
    })
});
translateLeft.forEach(element => {
    observerOnTheLeft.observe(element);
})

const observerOnTheRight = new IntersectionObserver(function(entries){
    entries.forEach(entry => {
        if (entry.isIntersecting == true) {
            let delay = entry.target.dataset.delay;
            entry.target.style.animation = 'translate-right 1s ' + delay + ' forwards ease-out';
        } else {
            entry.target.style.animation = 'none';
        }
    })
})
translateRight.forEach(element => {
    observerOnTheRight.observe(element);
})
