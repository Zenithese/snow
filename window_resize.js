var resize;

function windowResize() {
    for (let i = 0; i < snowflakes.length; i++) {
        const snowflake = snowflakes[i];
        if (snowflake.settled === true) {
            snowflake.settled = false
            snowflake.shaken = true
        } else {
            continue
        }
        if (W < window.innerWidth || H < window.innerHeight) {
            clearTimeout(resize)
            resize = setTimeout(() => {
                expandSnow()
            }, 500)
        }
    };
};

function expandSnow() {
    const canvas = document.getElementById("canvas");
    W = window.innerWidth
    H = window.innerHeight
    canvas.width = W;
    canvas.height = H;
}