function windowResize() {
    for (let i = 0; i < snowflakes.length; i++) {
        const snowflake = snowflakes[i];
        snowflake.settled = false
        snowflake.shaken = true
    };
};