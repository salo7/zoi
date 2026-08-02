/*
 * Language switching for the site. Both languages live in the markup —
 * elements carry data-lang="el" or data-lang="en" and CSS hides the
 * inactive one, so there is no flash of untranslated content.
 */
(function () {
    var KEY = 'zoi-lang';
    var SUPPORTED = ['el', 'en'];
    var root = document.documentElement;

    function read() {
        try { return localStorage.getItem(KEY); } catch (e) { return null; }
    }

    function save(lang) {
        try { localStorage.setItem(KEY, lang); } catch (e) { /* private mode */ }
    }

    function apply(lang) {
        root.setAttribute('lang', lang);
        root.setAttribute('data-lang', lang);

        var title = root.getAttribute('data-title-' + lang);
        if (title) document.title = title;

        var meta = document.querySelector('meta[name="description"]');
        var description = root.getAttribute('data-description-' + lang);
        if (meta && description) meta.setAttribute('content', description);

        var buttons = document.querySelectorAll('.lang-btn');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].setAttribute('aria-pressed', String(buttons[i].dataset.setLang === lang));
        }
    }

    var initial = read();
    if (SUPPORTED.indexOf(initial) === -1) initial = 'el';
    apply(initial);

    document.addEventListener('DOMContentLoaded', function () {
        apply(root.getAttribute('data-lang'));

        document.querySelectorAll('.lang-btn').forEach(function (button) {
            button.addEventListener('click', function () {
                var lang = button.dataset.setLang;
                if (SUPPORTED.indexOf(lang) === -1) return;
                save(lang);
                apply(lang);
            });
        });
    });
})();
