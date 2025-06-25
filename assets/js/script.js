$(document).ready(function () {
    // Initialize EmailJS
    emailjs.init("hrpFgApt65AmbM1QL");

    // Menu toggle
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    // Scroll and load behavior
    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            $('#scroll-top').addClass('active');
        } else {
            $('#scroll-top').removeClass('active');
        }

        // Scroll spy
        $('section').each(function () {
            const height = $(this).height();
            const offset = $(this).offset().top - 200;
            const top = $(window).scrollTop();
            const id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // Smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear');
    });

    // Form submission
    $("#contact-form").submit(function (event) {
        event.preventDefault();
        $("#form-time").val(new Date().toLocaleString());

        emailjs.sendForm('service_wi60gma', 'template_p7s44wk', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.error('FAILED...', error);
                alert("Form Submission Failed! Try Again");
            });
    });
});


async function fetchData(type = "skills") {
    let response;
    if (type === "skills") {
        response = await fetch("skills.json");
    } else if (type === "projects") {
        response = await fetch("projects.json"); 
    }
    const data = await response.json();
    return data;
}


function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    const projectsContainer = document.querySelector("#work .box-container");
    const visibleProjects = projects;

    projectsContainer.innerHTML = visibleProjects.map(project => `
        <div class="box grid-item" style="margin: 1rem">
            <img 
  draggable="false" 
  src="./assets/images/projects/${project.image}.png" 
  alt="${project.name}" 
  style="display: block; margin: auto; max-width: 100%; max-height: 200px; object-fit: contain;" 
/>

            <div class="content">
                <div class="tag">
                    <h3>${project.name}</h3>
                </div>
                <div class="desc">
                    <p>${project.desc}</p>
                    <div class="btns">
                        <a href="${project.links.code}" class="btn" target="_blank">
                            Code <i class="fas fa-code"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `).join("");

    // Scroll reveal animation
    ScrollReveal().reveal('.work .box', {
        origin: 'top',
        distance: '80px',
        duration: 1000,
        interval: 200,
        reset: false
    });
}

fetchData().then(data => {
    showSkills(data);
});

fetchData("projects").then(data => {
    console.log("Loaded Projects:", data);
    showProjects(data);
});

/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });
srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });

/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });