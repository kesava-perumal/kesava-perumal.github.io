document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');

    // Load sidebar and attach sidebar-specific listeners
    fetch('sidebar.html')
        .then(res => res.text())
        .then(html => {
            document.getElementById('sidebar-container').innerHTML = html;

            const sidebar = document.getElementById('sidebar');
            const sidebarLinks = sidebar.querySelectorAll('nav a');

            // Hamburger click: open sidebar and hide hamburger
            hamburger.addEventListener('click', function (e) {
                e.stopPropagation();
                sidebar.classList.add('open');
                document.body.classList.add('sidebar-open');
                hamburger.style.display = 'none';
            });

            // Hide sidebar when clicking outside (mobile)
            document.addEventListener('click', function (e) {
                if (
                    sidebar.classList.contains('open') &&
                    !sidebar.contains(e.target) &&
                    e.target !== hamburger
                ) {
                    sidebar.classList.remove('open');
                    document.body.classList.remove('sidebar-open');
                    hamburger.style.display = 'block';
                }
            });

            // Prevent sidebar click from closing itself
            sidebar.addEventListener('click', function (e) {
                e.stopPropagation();
            });

            // Hide sidebar on mobile when clicking a sidebar link
            sidebarLinks.forEach(link => {
                link.addEventListener('click', function (e) {
                    // Get the link's target (without query/hash)
                    const linkUrl = new URL(link.href, window.location.origin);
                    const currentUrl = new URL(window.location.href);

                    // If the link points to the current page (ignoring hash), prevent reload
                    if (linkUrl.pathname === currentUrl.pathname && !link.hash) {
                        e.preventDefault();
                    }

                    // Existing mobile sidebar close logic
                    if (window.innerWidth <= 768) {
                        sidebar.classList.remove('open');
                        document.body.classList.remove('sidebar-open');
                        hamburger.style.display = 'block';
                    }
                });
            });

            // Expand/collapse timeline details (now inside fetch)
            document.querySelectorAll('.expand-btn').forEach(btn => {
                const item = btn.closest('.timeline-item');
                const details = item.querySelector('.timeline-details');
                // Hide details on load
                item.classList.remove('expanded');
                btn.textContent = 'Show Details';

                btn.addEventListener('click', function (e) {
                    e.stopPropagation();
                    const expanded = item.classList.toggle('expanded');
                    if (expanded) {
                        btn.textContent = 'Hide Details';
                    } else {
                        btn.textContent = 'Show Details';
                    }
                });
            });

            // Responsive: show/hide hamburger on resize
            window.addEventListener('resize', function () {
                if (window.innerWidth > 768) {
                    sidebar.classList.remove('open');
                    document.body.classList.remove('sidebar-open');
                    hamburger.style.display = 'none';
                } else {
                    if (!sidebar.classList.contains('open')) {
                        hamburger.style.display = 'block';
                    }
                }
            });

            // Initial hamburger state
            if (window.innerWidth > 768) {
                hamburger.style.display = 'none';
            } else {
                hamburger.style.display = 'block';
            }
        });
});