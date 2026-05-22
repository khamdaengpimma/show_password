(async function () {
    'use strict';

    const settings = await chrome.storage.sync.get({
        enabled: true
    });

    if (!settings.enabled) return;

    function addEyeButton(input) {

        if (input.dataset.eyeAdded) return;

        input.dataset.eyeAdded = "true";

        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.style.display = 'inline-block';
        wrapper.style.width = input.offsetWidth + 'px';

        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);

        const eye = document.createElement('button');

        eye.innerHTML = '👁';
        eye.type = 'button';

        eye.style.position = 'absolute';
        eye.style.right = '5px';
        eye.style.top = '50%';
        eye.style.transform = 'translateY(-50%)';
        eye.style.border = 'none';
        eye.style.background = 'transparent';
        eye.style.cursor = 'pointer';
        eye.style.fontSize = '16px';
        eye.style.zIndex = '9999';

        eye.onclick = () => {
            input.type =
                input.type === 'password'
                    ? 'text'
                    : 'password';
        };

        wrapper.appendChild(eye);
    }

    function detectPasswords() {

        const inputs = document.querySelectorAll('input');

        inputs.forEach((input) => {

            const isPassword =
                input.type === 'password' ||
                input.getAttribute('type') === 'password';

            if (!isPassword) return;

            addEyeButton(input);
        });
    }

    detectPasswords();

    const observer = new MutationObserver(() => {
        detectPasswords();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();