const track = document.getElementById('image_track');

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
}

window.onmousemove = e => {
    if (track.dataset.mouseDownAt === '0') return;
    e.preventDefault();
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    maxDelta = window.innerWidth / 2;
    const percentage = (mouseDelta / maxDelta) * (-100);
    const unconstrainedPercentage = parseFloat(track.dataset.previousPercentage) + percentage;
    const nextPercentage = Math.max(Math.min(unconstrainedPercentage, 0), -100);
    track.dataset.percentage = nextPercentage;

    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, {duration: 1200, fill: 'forwards'});
    
    const images = document.querySelectorAll('img');
    for (let image of images) {
        image.animate({
            objectPosition: `${nextPercentage + 100}% 50%`
        }, {duration: 1200, fill: 'forwards'});
    }
}

window.onmouseup = () => {
    track.dataset.mouseDownAt = '0';
    track.dataset.previousPercentage = track.dataset.percentage;
}