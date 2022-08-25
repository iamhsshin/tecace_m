const swipe = (payload) => {
    let curPos = 0;
    let position = 0;
    let start_x, end_x;

    const { target, distance, btnLeft, btnRight } = payload;

    if (btnLeft && curPos === 0) {
        btnLeft.classList.add('disabled');
    }

    const prev = () => {
        if (curPos > 0) {
            position += distance;
            target.style.transform = `translateX(${position}px)`;
            curPos = curPos - 1;

            if (btnLeft && curPos === 0) {
                btnLeft.classList.add('disabled');
            }

            if (btnRight && curPos < target.childElementCount - 1) {
                btnRight.classList.remove('disabled');
            }
        }
    };
    const next = () => {
        if (curPos < target.childElementCount - 1) {
            position -= distance;
            target.style.transform = `translateX(${position}px)`;
            curPos = curPos + 1;

            if (btnLeft && curPos > 0) {
                btnLeft.classList.remove('disabled');
            }

            if (btnRight && curPos === target.childElementCount - 1) {
                btnRight.classList.add('disabled');
            }
        }
    };

    const touch_start = (event) => {
        start_x = event.touches[0].pageX;
    };

    const touch_end = (event) => {
        end_x = event.changedTouches[0].pageX;
        if (start_x > end_x) {
            next();
        } else {
            prev();
        }
    };

    if (btnLeft) {
        btnLeft.onclick = () => {
            prev();
        };
    }

    if (btnRight) {
        btnRight.onclick = () => {
            next();
        };
    }

    target.addEventListener('touchstart', touch_start);
    target.addEventListener('touchend', touch_end);
};
