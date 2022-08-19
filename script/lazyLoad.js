document.addEventListener('DOMContentLoaded', () => {
    let lazyLoadImages;

    if ('IntersectionObserver' in window) {
        lazyLoadImages = document.querySelectorAll('.lazy');

        let imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    let image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.remove('lazy');
                    image.classList.add('lazy-off');
                    imageObserver.unobserve(image);
                }
            });
        });

        lazyLoadImages.forEach((image) => {
            imageObserver.observe(image);
        });
    } else {
        let lazyLoadThrottleTimeout;
        lazyLoadImages = document.querySelectorAll('.lazy');

        const lazyLoad = () => {
            if (lazyLoadThrottleTimeout) {
                clearTimeout(lazyLoadThrottleTimeout);
            }

            lazyLoadThrottleTimeout = setTimeout(() => {
                let scrollTop = window.pageYOffset;
                lazyLoadImages.forEach((img) => {
                    if (img.offsetTop < window.innerHeight + scrollTop) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        image.classList.add('lazy-off');
                    }
                });
                if (lazyLoadImages.length === 0) {
                    document.removeEventListener('scroll', lazyLoad);
                    window.removeEventListener('resize', lazyLoad);
                    window.removeEventListener('orientationChange', lazyLoad);
                }
            }, 20);
        };

        document.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationChange', lazyLoad);
    }
});
