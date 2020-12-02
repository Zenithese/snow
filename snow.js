window.onload = function () {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    let mp = 200;
    const particles = [];
    for (let i = 0; i < mp; i++) {
        particles.push(
            new Snowflake(W, H, mp)
        )
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);

        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.beginPath();
        for (let i = 0; i < mp; i++) {
            const p = particles[i];
            ctx.moveTo(p.x, p.y);
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
        }
        ctx.fill();
        update();
    }

    //Function to move the snowflakes
    //angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
    let angle = 0;
    function update() {
        angle += 0.01;
        for (let i = 0; i < mp; i++) {
            const p = particles[i];
            const div = document.getElementById("div1").getBoundingClientRect()
            //Updating X and Y coordinates
            //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
            //Every particle has its own density which can be used to make the downward movement different for each flake
            //Lets make it more random by adding in the radius
            if (p.settled) continue
            p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
            p.x += Math.sin(angle) * 2;

            //Sending flakes back from the top when it exits
            if (p.x > W + 5 || p.x < -5 || p.y > H) {
                particles[i].x = Math.random() * W;
                particles[i].y = -10;
            } else if (p.x > div.left && p.x < div.right && p.y > div.top - 5 && p.y < div.bottom) { // made contact with div
                if (p.y - div.top < Math.min(p.x - div.left, div.right - p.x) && p.y - div.top - 5 < 1) {
                    p.settled = true;
                    mp++;
                    const snowflake = new Snowflake(W, H, mp);
                    particles.push(snowflake);
                    snowflake.x = Math.random() * W;
                    snowflake.y = -10;
                } else if (p.x - div.left < div.right - p.x) {
                    particles[i].x = -5;
                    particles[i].y = Math.random() * H;
                } else {
                    particles[i].x = W + 5
                    particles[i].y = Math.random() * H;
                }
            }
        }
    }

    setInterval(draw, 33);
}