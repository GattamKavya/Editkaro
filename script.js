const filterButtons = document.querySelectorAll(".filter-btn");

const cards = document.querySelectorAll(".card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filterValue = button.dataset.filter;

        cards.forEach(card => {

            if (
                filterValue === "all" ||
                card.dataset.category === filterValue
            ) {

                card.style.display = "block";

            }

            else {

                card.style.display = "none";

            }

        });

    });

});

const videos = document.querySelectorAll("video");

videos.forEach(video => {

    video.addEventListener("mouseenter", () => {
        video.play();
    });

    video.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
    });

});

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }

    });

});

sections.forEach(section => {
    section.classList.add("hidden");
    observer.observe(section);
});

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;
            const target = +counter.dataset.target;

            let count = 0;

            const updateCounter = () => {

                const increment = target / 50;

                if (count < target) {

                    count += increment;

                    counter.innerText = Math.ceil(count);

                    setTimeout(updateCounter, 30);

                } else {

                    if (target === 100) {
                        counter.innerText = "100M+";
                    } else {
                        counter.innerText = target + "+";
                    }

                }

            };

            updateCounter();

            counterObserver.unobserve(counter);

        }

    });

});

counters.forEach(counter => {
    counterObserver.observe(counter);
});

const texts = [
    "We Create Scroll-Stopping Videos",
    "We Edit Viral Reels",
    "We Create Cinematic Stories",
    "We Grow Social Media Brands",
    "We Make Content That Converts"
];

const typingText = document.getElementById("typing-text");

let textIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const currentText = texts[textIndex];

    if (!deleting) {

        typingText.textContent = currentText.substring(0, charIndex);
        charIndex++;

        if (charIndex > currentText.length) {
            deleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }

    } else {

        typingText.textContent = currentText.substring(0, charIndex);
        charIndex--;

        if (charIndex < 0) {
            deleting = false;
            textIndex = (textIndex + 1) % texts.length;
            charIndex = 0;
        }

    }

    setTimeout(typeEffect, deleting ? 50 : 100);
}

typeEffect();

const portfolioVideos = document.querySelectorAll(".card video");

portfolioVideos.forEach(video => {

    video.addEventListener("click", () => {

        if(video.controls){
            video.controls = false;
        } else {
            video.controls = true;
        }

    });

});

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzPAjjeHfsGp1jrSzTmdiW-a6uQtTHSrymrxat02BJXIo3L2vInvYoijvdrfaHNlx60Fw/exec";




// Email Form
const emailForm = document.getElementById("emailForm");

if(emailForm){

emailForm.addEventListener("submit", async (e)=>{

e.preventDefault();

const email =
document.getElementById("subscriberEmail").value;

try{

await fetch(SCRIPT_URL,{
method:"POST",
body:JSON.stringify({
type:"subscriber",
email:email
})
});

showPopup("✅ Thank you for subscribing to Editkaro!");
emailForm.reset();

}catch(error){

console.error(error);

alert("❌ Subscription failed. Please try again later.");

}
});

}

// Contact Form
const contactForm = document.getElementById("contactForm");

if(contactForm){

contactForm.addEventListener("submit", async (e)=>{

e.preventDefault();

try{

await fetch(SCRIPT_URL,{
method:"POST",
body:JSON.stringify({
type:"contact",
name:document.getElementById("name").value,
email:document.getElementById("email").value,
phone:document.getElementById("phone").value,
message:document.getElementById("message").value
})
});

alert("✅ Thank you! Your message has been sent successfully.");

contactForm.reset();

}catch(error){

console.error(error);

showPopup("❌ Failed to send message. Please try again later.");

}

});

}

function showPopup(message){
    document.getElementById("popupText").innerText = message;
    document.getElementById("successPopup").style.display = "flex";
}

function closePopup(){
    document.getElementById("successPopup").style.display = "none";
}