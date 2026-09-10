/* =========================================
   BIRTHDAY SURPRISE JOURNEY
========================================= */


const music =
    document.getElementById("music");


/* =========================================
   START JOURNEY
========================================= */

function startJourney() {

    music.play().catch(() => {});

    createConfetti(100);

    nextScreen(2);

}


/* =========================================
   SCREEN NAVIGATION
========================================= */

function nextScreen(number) {

    document
        .querySelectorAll(".screen")
        .forEach(
            screen => {

                screen.classList.remove(
                    "active"
                );

            }
        );


    const next =
        document.getElementById(
            "screen" + number
        );


    if (next) {

        next.classList.add("active");

        /*
         * Always start the new screen
         * from the top.
         */

        next.scrollTop = 0;

    }

}


/* =========================================
   GIFT
========================================= */

function openGift() {

    const gift =
        document.getElementById("gift");

    const message =
        document.getElementById(
            "giftMessage"
        );


    /*
     * Prevent multiple clicks
     */

    if (
        gift.classList.contains(
            "opening"
        )
    ) {

        return;

    }


    /*
     * Open the gift
     */

    gift.classList.add("opening");


    /*
     * Confetti explosion
     */

    createConfetti(150);


    /*
     * Make the gift disappear
     * after opening.
     */

    setTimeout(function () {

        gift.style.opacity = "0";

        gift.style.transform =
            "scale(0.5)";

    }, 700);


    /*
     * Show the surprise message.
     */

    setTimeout(function () {

        message.classList.add("show");

        createConfetti(100);

    }, 950);

}


/* =========================================
   SECRET LETTER
========================================= */

function revealLetter() {

    const text =
        document.getElementById(
            "secretText"
        );


    const message =
        "You are one of those people who make ordinary days feel special. I hope you always remember how valuable, wonderful and unique you are. ❤️";


    text.innerHTML = "";


    let i = 0;


    function typeMessage() {

        if (
            i <
            message.length
        ) {

            text.innerHTML +=
                message.charAt(i);

            i++;

            setTimeout(
                typeMessage,
                40
            );

        } else {

            setTimeout(
                () => {

                    const button =
                        document.createElement(
                            "button"
                        );

                    button.className =
                        "next-btn";

                    button.textContent =
                        "Continue →";

                    button.onclick =
                        () => nextScreen(5);

                    text.parentElement
                        .appendChild(
                            button
                        );

                },

                500
            );

        }

    }


    typeMessage();

}


/* =========================================
   BLOW CANDLES
========================================= */

function blowCandles() {

    document
        .querySelectorAll(
            ".flame"
        )
        .forEach(
            flame => {

                flame.style.display =
                    "none";

            }
        );


    createConfetti(150);


    setTimeout(
        () => {

            nextScreen(7);

        },

        1500
    );

}


/* =========================================
   FIREWORKS
========================================= */

const canvas =
    document.getElementById(
        "fireworks"
    );


const ctx =
    canvas.getContext("2d");


function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


let particles = [];


class Particle {

    constructor(
        x,
        y,
        color
    ) {

        this.x = x;

        this.y = y;

        this.color = color;

        this.velocityX =
            (
                Math.random()
                - 0.5
            ) * 9;

        this.velocityY =
            (
                Math.random()
                - 0.5
            ) * 9;

        this.gravity =
            0.06;

        this.alpha =
            1;

        this.size =
            Math.random() * 3 + 1;

    }


    update() {

        this.x +=
            this.velocityX;

        this.y +=
            this.velocityY;

        this.velocityY +=
            this.gravity;

        this.alpha -=
            0.012;

    }


    draw() {

        ctx.save();

        ctx.globalAlpha =
            this.alpha;

        ctx.fillStyle =
            this.color;

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();

    }

}


/* =========================================
   FIREWORK LAUNCH
========================================= */

function launchFirework(
    x,
    y
) {

    const colors = [

        "#ff3cac",
        "#ffd166",
        "#00e5ff",
        "#9d4edd",
        "#ffffff",
        "#ff6b6b"

    ];


    const color =
        colors[
            Math.floor(
                Math.random() *
                colors.length
            )
        ];


    for (
        let i = 0;
        i < 120;
        i++
    ) {

        particles.push(
            new Particle(
                x,
                y,
                color
            )
        );

    }

}


/* =========================================
   FIREWORK LOOP
========================================= */

function animateFireworks() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles =
        particles.filter(
            particle =>
                particle.alpha > 0
        );


    particles.forEach(
        particle => {

            particle.update();

            particle.draw();

        }
    );


    requestAnimationFrame(
        animateFireworks
    );

}


animateFireworks();


/* =========================================
   START FIREWORK SHOW
========================================= */

function startFireworks() {

    let count = 0;


    const interval =
        setInterval(
            () => {

                launchFirework(

                    Math.random() *
                    window.innerWidth,

                    Math.random() *
                    window.innerHeight *
                    0.65

                );


                count++;


                if (
                    count >= 20
                ) {

                    clearInterval(
                        interval
                    );

                    setTimeout(
                        () => {

                            nextScreen(8);

                        },

                        2500
                    );

                }

            },

            250
        );

}


/* =========================================
   FINAL EXPLOSION
========================================= */

function finalExplosion() {

    createConfetti(500);


    let count = 0;


    const interval =
        setInterval(
            () => {

                launchFirework(

                    Math.random() *
                    window.innerWidth,

                    Math.random() *
                    window.innerHeight

                );


                count++;


                if (
                    count > 30
                ) {

                    clearInterval(
                        interval
                    );

                }

            },

            150
        );


    createFloatingHearts();

}


/* =========================================
   CONFETTI
========================================= */

function createConfetti(
    amount
) {

    const colors = [

        "#ff3cac",
        "#ffd166",
        "#00e5ff",
        "#9d4edd",
        "#ffffff",
        "#ff6b6b"

    ];


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const piece =
            document.createElement(
                "div"
            );


        piece.style.position =
            "fixed";


        piece.style.top =
            "-20px";


        piece.style.left =
            Math.random() *
            100 +
            "vw";


        piece.style.width =
            "8px";


        piece.style.height =
            "15px";


        piece.style.background =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        piece.style.zIndex =
            "100";


        piece.style.pointerEvents =
            "none";


        document.body.appendChild(
            piece
        );


        const duration =
            Math.random() * 3 +
            3;


        piece.animate(

            [

                {
                    transform:
                        "translateY(0) rotate(0)"
                },

                {
                    transform:
                        `translateY(
                            ${window.innerHeight + 100}px
                        )
                        rotate(
                            ${Math.random() * 1000}deg
                        )`
                }

            ],

            {

                duration:
                    duration * 1000,

                easing:
                    "linear"

            }

        );


        setTimeout(
            () => {

                piece.remove();

            },

            duration * 1000
        );

    }

}


/* =========================================
   FLOATING HEARTS
========================================= */

function createFloatingHearts() {

    for (
        let i = 0;
        i < 80;
        i++
    ) {

        setTimeout(
            () => {

                const heart =
                    document.createElement(
                        "div"
                    );


                heart.textContent =
                    "❤️";


                heart.style.position =
                    "fixed";


                heart.style.left =
                    Math.random() *
                    100 +
                    "vw";


                heart.style.bottom =
                    "-50px";


                heart.style.fontSize =
                    Math.random() *
                    30 +
                    20 +
                    "px";


                heart.style.zIndex =
                    "100";


                heart.style.pointerEvents =
                    "none";


                document.body.appendChild(
                    heart
                );


                heart.animate(

                    [

                        {

                            transform:
                                "translateY(0) scale(.5)",

                            opacity: 0

                        },

                        {

                            opacity: 1

                        },

                        {

                            transform:
                                `translateY(
                                    -${window.innerHeight + 100}px
                                )
                                scale(1.5)
                                rotate(360deg)`,

                            opacity: 0

                        }

                    ],

                    {

                        duration:
                            5000,

                        easing:
                            "linear"

                    }

                );


                setTimeout(
                    () => {

                        heart.remove();

                    },

                    5000
                );


            },

            i * 100
        );

    }

}