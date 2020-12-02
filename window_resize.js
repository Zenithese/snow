function windowResize() {
    const canvas = document.getElementById("canvas");
    for (let i = 0; i < snowflakes.length; i++) {
        const snowflake = snowflakes[i];
        snowflake.settled = false
        snowflake.shaken = true
        W = window.innerWidth
        H = window.innerHeight
        canvas.width = W;
        canvas.height = H;
    };
};