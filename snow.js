const snowflakes = [];
let W = window.innerWidth;
let H = window.innerHeight;

window.onload = function () {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = W;
    canvas.height = H;

    let mp = 200;
    for (let i = 0; i < mp; i++) {
        snowflakes.push(
            new Snowflake(W, H, mp)
        );
    };

    function draw() {
        ctx.clearRect(0, 0, W, H);

        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.beginPath();
        for (let i = 0; i < mp; i++) {
            const p = snowflakes[i];
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
            const p = snowflakes[i];
            const elements = document.getElementsByClassName("roof");
            const boundaires = [];
            for (let i = 0; i < elements.length; i++) {
                const el = elements[i];
                boundaires[i] = el.getBoundingClientRect();
            };
            //Updating X and Y coordinates
            //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
            //Every particle has its own density which can be used to make the downward movement different for each flake
            //Lets make it more random by adding in the radius
            if (p.settled) continue;
            p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
            p.x += Math.sin(angle) * 2;

            //Sending flakes back from the top when it exits
            if (p.x > W + 5 || p.x < -5 || p.y > H) {
                snowflakes[i].x = Math.random() * W;
                snowflakes[i].y = -10;
                snowflakes[i].shaken = false
            } else { // made contact with div
                // if (collisionDetection(p)) continue
                boundaires.forEach(boundary => {
                    if (p.shaken === false && p.x > boundary.left && p.x < boundary.right && p.y > boundary.top - 5 && p.y < boundary.bottom) {
                        if (p.y - boundary.top < Math.min(p.x - boundary.left, boundary.right - p.x) && p.y - boundary.top - 5 < 1) {
                            p.settled = true;
                            if (mp < 800) mp++;
                            const snowflake = new Snowflake(W, H, mp);
                            snowflakes.push(snowflake);
                            snowflake.x = Math.random() * W;
                            snowflake.y = -10;
                        } else if (p.x - boundary.left < boundary.right - p.x) {
                            snowflakes[i].x = -5;
                            snowflakes[i].y = Math.random() * H;
                        } else {
                            snowflakes[i].x = W + 5
                            snowflakes[i].y = Math.random() * H;
                        }
                    }
                })
            }
        }
        if (snowflakes.length > 800) {
            let settledNotFound = true
            while (settledNotFound) {
                const s = snowflakes.shift();
                if (s.settled === false) {
                    snowflakes.push(s)
                } else {
                    settledNotFound = false
                }
            }
        }
    }

    function collisionDetection(snowflake) {
        for (let i = 0; i < mp; i++) {
            if (distance(snowflakes[i], snowflake) <= snowflakes[i]["r"] + snowflake["r"]
            && snowflakes[i].settled) {
                snowflake.settled = true;
                mp++;
                const newSnowflake = new Snowflake(W, H, mp);
                snowflakes.push(newSnowflake);
                newSnowflake.x = Math.random() * W;
                newSnowflake.y = -10;
                return true
            }
        }
    }

    function distance(a, b) {
        return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
    }

    setInterval(draw, 33);
}