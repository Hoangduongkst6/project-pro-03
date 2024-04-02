// Courses section
const courses = [
    {
        image: "./assets/images/course-1.png",
        title: "Web Design",
        heading: "Basic Web Design 2022",
        price: "$ 149",
        number: "4.5",
        voters: "(5325)",
    },
    {
        image: "./assets/images/course-2.png",
        title: "Web Design",
        heading: "Basic Web Design 2022",
        price: "$ 149",
        number: "4.5",
        voters: "(5325)",
    },
    {
        image: "./assets/images/course-3.png",
        title: "Web Design",
        heading: "Basic Web Design 2022",
        price: "$ 149",
        number: "4.5",
        voters: "(5325)",
    },
    {
        image: "./assets/images/course-4.png",
        title: "Web Design",
        heading: "Basic Web Design 2022",
        price: "$ 149",
        number: "4.5",
        voters: "(5325)",
    },
    {
        image: "./assets/images/course-5.png",
        title: "Web Design",
        heading: "Basic Web Design 2022",
        price: "$ 149",
        number: "4.5",
        voters: "(5325)",
    },
    {
        image: "./assets/images/course-6.png",
        title: "Web Design",
        heading: "Basic Web Design 2022",
        price: "$ 149",
        number: "4.5",
        voters: "(5325)",
    },
    {
        image: "./assets/images/course-3.png",
        title: "Web Design",
        heading: "Basic Web Design 2022",
        price: "$ 149",
        number: "4.5",
        voters: "(5325)",
    },
    {
        image: "./assets/images/course-2.png",
        title: "Web Design",
        heading: "Basic Web Design 2022",
        price: "$ 159",
        number: "4.5",
        voters: "(5325)",
    },
    {
        image: "./assets/images/course-1.png",
        title: "Web Design",
        heading: "Basic Web Design 2022",
        price: "$ 159",
        number: "4.5",
        voters: "(5325)",
    },
];

function rander() {
    const maxCourse = 6;
    const htmls = courses.map((course, idx) => {
        return ` 
            <div class="col-4 col-xl-6 col-md-12 courses-col">
                <article class="item">
                    <a href="#!" class="item-wrap">
                        <img src="./assets/icons/header/arrow.svg" alt="">
                    </a>
                    <figure class="item-image">
                        <img loading="lazy" src="${course.image}" alt="">
                    </figure>

                    <section class="item-body">
                        <div class="item-body-title">${course.title}</div>
                        <div class="item-body-inner">
                            <a href="#!">
                                <h3 class="item-body-inner-heading">${course.heading}</h3>
                            </a>
                            <span class="item-body-inner-price">${course.price}</span>
                        </div>
                        <div class="item-evaluate">
                            <span class="item-evaluate-number">${course.number}</span>
                            <img src="./assets/icons/header/star.svg" alt="">
                            <sapn class="item-evaluate-voters">${course.voters}</sapn>
                        </div>
                    </section>
                </article>
            </div>
        `;
    });
    $(".courses-row").innerHTML = htmls.join("");

    const itemCourse = $$(".courses-col");
    const actButton = $(".courses-act button");

    const itemLength = itemCourse.length;
    let check = true;

    actButton.onclick = function () {
        if (check) {
            for (let i = 0; i < itemLength; i++) {
                if (i + 1 > maxCourse) {
                    itemCourse[i].style.display = "block";
                }
            }
            check = false;
            this.innerText = "Close Courses";
        } else {
            onCourse();
            check = true;

            this.innerText = "All Courses";
        }
    };

    function onCourse() {
        for (let i = 0; i < itemLength; i++) {
            if (i + 1 > maxCourse) {
                itemCourse[i].style.display = "none";
            }
        }
    }
    onCourse();
}

rander();

// Video moda
const popupVideo = $(".js-popupvideo");
const popupVideoInner = $(".js-popupvideo-inner");
const source = $(".popupvideo-iframe video source");

function hideVideo() {
    popupVideo.classList.remove("active");
}

$(".video-wrap").addEventListener("click", function () {
    popupVideo.classList.add("active");
});

$(".js-popupvideo-close").addEventListener("click", hideVideo);

popupVideo.addEventListener("click", hideVideo);

popupVideoInner.addEventListener("click", function (e) {
    e.stopPropagation();
});

//Testimonial
const itemsIestimonial = $$(".testimonial-item");
const dotsTestimonial = $$(".testimonial-dot");

itemsIestimonial.forEach((item, idx) => {
    const dotTestimonial = dotsTestimonial[idx];

    item.onclick = function () {
        $(".testimonial-item.active").classList.remove("active");
        $(".testimonial-dot.active").classList.remove("active");

        this.classList.add("active");
        dotTestimonial.classList.add("active");
    };

    dotTestimonial.onclick = function () {
        $(".testimonial-item.active").classList.remove("active");
        $(".testimonial-dot.active").classList.remove("active");

        item.classList.add("active");
        this.classList.add("active");
    };
});
