document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Activate Bootstrap scrollspy
    var scrollSpy = new bootstrap.ScrollSpy(document.body, {
        target: '#navbarNav'
    });

    // Fade in sections on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Show welcome message using SweetAlert2
    Swal.fire({
        title: 'Welcome to My Portofolio!',
        text: 'Feel free to explore and get in touch.',
        icon: 'info',
        iconColor: '#816745',
        confirmButtonText: 'Explore',
        confirmButtonColor: '#816745',
        background: '#f8f9fa',
        customClass: {
            title: 'custom-swal-title',
            content: 'custom-swal-content',
        }
    });

    // Add click event to Download CV button
    document.querySelector('a[download]').addEventListener('click', function(e) {
        e.preventDefault();
        Swal.fire({
            title: 'Downloading CV',
            text: 'Your download will start shortly.',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            window.location.href = this.href;
        });
    });

     // Add click event listeners to all "Learn More" buttons
     document.querySelectorAll('.learn-more').forEach(button => {
        button.addEventListener('click', function() {
            // Get project details from data attributes
            const projectTitle = this.getAttribute('data-project-title');
            const projectDescription = this.getAttribute('data-project-description');
            const projectTech = this.getAttribute('data-project-tech');
            const projectLink = this.getAttribute('data-project-link');

            // Show SweetAlert2 modal with project details
            Swal.fire({
                title: projectTitle,
                html: `
                    <div class="project-details">
                        <div class="description">
                            <h4 class="mb-3">Project Description</h4>
                            <p style="text-align: left; white-space: pre-line;">${projectDescription}</p>
                        </div>
                        <div class="technologies mt-4">
                            <h4 class="mb-2">Technologies Used</h4>
                            <p>${projectTech}</p>
                        </div>
                        <div class="project-link mt-4">
                            <a href="${projectLink}" target="_blank" class="btn btn-primary">
                                View Project
                            </a>
                        </div>
                    </div>
                `,
                width: '600px',
                showCloseButton: true,
                showConfirmButton: false,
                customClass: {
                    container: 'project-modal',
                    popup: 'project-modal-popup',
                    content: 'project-modal-content'
                }
            });
        });
    });
});