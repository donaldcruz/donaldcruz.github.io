window.addEventListener('DOMContentLoaded', () => {
    try{
        new MainScript();
    }catch(e){}
});

class MainScript{
    constructor(){
        this.header = document.querySelector('header');
        this.footer = document.querySelector('footer');
        this.nav = document.querySelector('nav');
        this.currentVideo = document.querySelector('.video-carousel video');
        this.navMenuItems = document.querySelectorAll('header nav ul>li a');
        this.menuIcon = document.querySelector('.menu-icon');
        this.typeIndex = 0;
        this.typeSpeed = 80;
        this.INTERVAL = 1000;

        this.location = location.origin;

        this.email = 'DonaldCruz01@gmail.com';
        this.phone = '+61 428 328 284';

        this.init();
    }
    init(){
        this.mobileMenu();
        this.scrollToSection();
        this.typewriterEffect();
        this.copyrightyear();
        this.intersectionAnimate();
        this.videoCarousel();
        this.videoControls();
        this.carouselThumbnailControls();
        this.contactMe();
    }
    mobileMenu(){

        if(this.menuIcon != undefined){
            this.menuIcon.addEventListener('click', () => {

                this.menuIcon.classList.toggle('active');

                if(this.nav.style.maxHeight){
                    this.nav.style.maxHeight = null;
                    this.nav.classList.remove('sliding-nav');
                }else{
                    this.nav.style.maxHeight = `${this.nav.scrollHeight}px`;
                    this.nav.classList.add('sliding-nav');
                }
            });
        }

        // only do this on mobile and tablet screens
        if(window.innerWidth <= 1023){
            this.navMenuItems.forEach(navMenu => {
                navMenu.addEventListener('click', (event) => {
                    event.preventDefault();
                    this.menuIcon.classList.remove('active');
                    this.nav.classList.remove('sliding-nav');
                    this.nav.removeAttribute('style');
                });
            });
        }
    }
    scrollToSection(){
        this.navMenuItems.forEach(navMenu => {
            navMenu.addEventListener('click', (event) => {
                event.preventDefault();
                let currentLink = navMenu.href.split('/')[3];
                let targetElement = document.querySelector(`.content-body ${currentLink}`);
                setTimeout(() => {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        left: 0,
                        behavior: 'smooth'
                    });
                }, (this.INTERVAL /2));
            });
        });
    }
    typewriterEffect(){
        const typewriter = document.querySelector('.typewriter');

        if(typewriter != undefined){

            let text = `Hi! I'm Donald`;

            setInterval(() => {
                if(this.typeIndex < text.length){
                    typewriter.innerHTML += text.charAt(this.typeIndex);
                    this.typeIndex++;
                }
            }, this.typeSpeed);
        }
    }
    copyrightyear(){
        let copyright = document.querySelector('#copyright');
        if(copyright != undefined){
            const date = new Date();
            let currentYear = date.getFullYear();
            let newYear = date.getFullYear();
            if(newYear > currentYear){
                copyright.innerHTML = `&copy; ${newYear} - ${currentYear} Copyright - Donald Cruz`;
            }else{
                copyright.innerHTML = `&copy; ${currentYear} Copyright - Donald Cruz`;
            }
        }
    }
    intersectionAnimate(){
        const dataAnimateIntersect = document.querySelectorAll('[data-animate="intersect"]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if(entry.isIntersecting){
                    entry.target.classList.add('animate');
                }else{
                    // entry.target.classList.remove('animate');
                }
            });
        }, { threshold: 0.35 });

        dataAnimateIntersect.forEach((el) => observer.observe(el));
    }
    videoCarousel(){
        let videoCarouselThumbnails = document.querySelector('.video-carousel-thumbnails');
        let url = `${this.location}/data/career.json`;

        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            for(let i = 0; i < data.length; i++){
                const img = document.createElement('img');
                img.src = `./res/${data[i]['poster']}`;
                img.className = `video-thumbnail`;
                img.setAttribute('data-video-url', `./res/${data[i]['video']}`);
                img.setAttribute('aria-label','thumbnail');
                img.setAttribute('title', `${data[i]['title']}`);
                videoCarouselThumbnails.appendChild(img);
            }
        })
        .catch((error) => {});
    }
    videoControls(){
        this.currentVideo.addEventListener('click', () => {
            this.currentVideo.toggleAttribute('muted');
            let pausedState = 'paused';
            let playingState = 'playing';
            if(this.currentVideo.paused){
                this.currentVideo.play();
                this.currentVideo.muted = false;
                this.currentVideo.parentElement.classList.remove(pausedState);
                this.currentVideo.parentElement.classList.add(playingState);
            }else{
                this.currentVideo.pause();
                this.currentVideo.muted = true;
                this.currentVideo.parentElement.classList.remove(playingState);
                this.currentVideo.parentElement.classList.add(pausedState);
            }

        });
    }
    carouselThumbnailControls(){
        window.addEventListener('click', (event) => {
            
            if(event.target.className === 'video-thumbnail'){
                
                let url = event.target.getAttribute('data-video-url');
                this.currentVideo.src = `${url}`;
                this.currentVideo.removeAttribute('muted');
                this.currentVideo.muted = false;
                this.currentVideo.play();
                this.currentVideo.volume = 1.0;
                this.currentVideo.parentElement.classList.remove('paused');
                this.currentVideo.parentElement.classList.remove('playing');
            }

            const loader = document.createElement('div');
            loader.className = 'loader';
            this.currentVideo.parentElement.appendChild(loader);
            setTimeout(() => {
                this.currentVideo.parentElement.removeChild(loader);
            }, this.INTERVAL);
        })
    }
    contactMe(){
        const contactButtons = document.querySelectorAll('#contact .content-button button');

        if(contactButtons != undefined){
            
            contactButtons.forEach(button => {

                button.addEventListener('click', () => {
                    
                    if(button.classList.contains('email')){
                        window.location.href = `mailto:${this.email}`;
                    }else if (button.classList.contains('phone')){
                        window.location.href = `tel:${this.phone}`;
                    }
                });

            });
        }
    }
}