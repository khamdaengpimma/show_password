(async function () {
    'use strict';

    const settings = await chrome.storage.sync.get({
        enabled: true
    });

    if (!settings.enabled) return;

    function hasExistingToggle(input) {

        const parent = input.parentElement;

        if (!parent) return false;

        // search nearby elements
        const nearby = parent.querySelectorAll('button, span, div, svg, i');

        for (const el of nearby) {

            const text = (el.innerText || '').toLowerCase();
            const cls = (el.className || '').toString().toLowerCase();
            const aria = (el.getAttribute('aria-label') || '').toLowerCase();

            // detect common show/hide password controls
            if (
                text.includes('show') ||
                text.includes('hide') ||
                text.includes('eye') ||
                aria.includes('password') ||
                cls.includes('eye') ||
                cls.includes('toggle') ||
                cls.includes('visibility')
            ) {
                return true;
            }

            // detect eye svg icon
            if (el.tagName.toLowerCase() === 'svg') {
                return true;
            }
        }

        return false;
    }

    function addEyeButton(input) {

        if (input.dataset.eyeAdded) return;

        // skip if website already has button
        if (hasExistingToggle(input)) return;

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
        eye.style.right = '8px';
        eye.style.top = '50%';
        eye.style.transform = 'translateY(-50%)';
        eye.style.border = 'none';
        eye.style.background = 'transparent';
        eye.style.cursor = 'pointer';
        eye.style.fontSize = '16px';
        eye.style.zIndex = '999999';

        eye.onclick = () => {

            if (input.type === 'password') {
                input.type = 'text';
                eye.innerHTML = '🙈';
            } else {
                input.type = 'password';
                eye.innerHTML = '👁';
            }
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