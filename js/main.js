/* Navbar */
/* Sticky Navbar */
$(".navbar").sticky();

$(".navbar").on("sticky-start", function () {
    $(this).css("height", "75px");
    $(this).removeClass("bg-dark text-bg-dark").css("background-color", "rgba(0, 0, 0, 0.9)");
    $('.navbar-brand').css('height', '65px');
    if ($(window).width() < 748) {
        $(".navbar").css("max-height", "65px");
        $(".navbar-brand").css("max-height", "50px");
    }
});
$(".navbar").on("sticky-end", function () {
    $(this).css("height", "90px");
    $(this).addClass("bg-dark text-bg-dark");
    $('.navbar-brand').css('height', '70px');
    if ($(window).width() < 748) {
        $(".navbar").css("max-height", "55px");
        $(".navbar-brand").css("max-height", "50px");
    }
});

/* NavLink Navbar */
$(window).on("scroll", function () {
    var scrollPosition = $(document).scrollTop();
    var windowHeight = $(window).height();

    // Per ogni sezione, controlliamo se è visibile
    $("section").each(function () {
        var sectionTop = $(this).offset().top - 100;
        var sectionBottom = sectionTop + $(this).outerHeight();
        var id = $(this).attr("id");

        // Calcola la visibilità della sezione (se almeno il 50% è visibile)
        var isSectionVisible =
            scrollPosition + windowHeight / 2 >= sectionTop &&
            scrollPosition + windowHeight / 2 < sectionBottom;

        if (isSectionVisible) {
            // Aggiungi la classe active al link corrispondente
            $("a[href='#" + id + "']").addClass("active");
        } else {
            // Rimuovi la classe active dal link non visibile
            $("a[href='#" + id + "']").removeClass("active");
        }
    });
});

document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const offCanvas = document.getElementById('offcanvasNavbar');
        const bstOfInst = bootstrap.Offcanvas.getOrCreateInstance(offCanvas);
        bstOfInst.hide();
    })
});

/* Portfolio */

/* Load more card */
$('#load-more').click(function (e) {
    e.preventDefault();
    $('#portfolio .col.d-none').slice(0, 2).fadeIn().removeClass('d-none');
    if ($('#portfolio .col.d-none').length === 0) {
        $('#load-more').addClass('d-none');
        $('#load-portfolio').removeClass('d-none');
    }
});

/* Send Mail */
/* document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const successAlert = document.querySelector('.alert-success');
    const dangerAlert = document.querySelector('.alert-danger');

    try {
        const response = await fetch('/send-email.php', {
            method: 'POST',
            body: formData,
            credentials: 'same-origin'
        });

        if (!response.ok) {
            throw new Error(`HTTP status ${response.status}`);
        }

        const data = await response.json();

        if (data.status === 'success') {
            successAlert.classList.remove('d-none');
            successAlert.querySelector('.response-message').textContent = data.message;
        } else {
            dangerAlert.classList.remove('d-none');
            dangerAlert.querySelector('.response-message').textContent = data.message;
        }

    } catch (error) {
        dangerAlert.classList.remove('d-none');
        dangerAlert.querySelector('.response-message').textContent = 'Si è verificato un errore. Riprova più tardi.';
        console.error('Errore', error);

    } finally {
        document.getElementById('contactForm').reset();
    }
}); */

$('#contactForm').submit(function (e) {
    e.preventDefault();

    var formData = $(this).serialize();

    $.ajax({
        type: "POST",
        url: "/send-email.php",
        data: formData,
        dataType: "json",
        success: function (response) {
            if (response.status === 'success') {
                $('.alert-success').removeClass("d-none").fadeIn(500);
                $('.response-message').text(response.message);

                // Nascondi il messaggio di successo dopo 5 secondi (5000ms)
                setTimeout(function () {
                    $('.alert-success').addClass("d-none").fadeOut(500);
                }, 5000);  // 5 secondi

                // Reset del form
                $('#contactForm')[0].reset();
            } else {
                $('.alert-danger').removeClass("d-none").fadeIn(500);
                $('.response-message').text(response.message);
            }
        },
        error: function (response) {
            $('.alert-danger').removeClass("d-none");
            $('.response-message').text('Si è verificato un errore. Riprova più tardi.');
            console.log(response.message);
        }

    });
});

// Funzione che toglie l’hash e ripristina l’URL senza frammento
function removeHash() {
    if (window.location.hash) {
        // (opzionale) fai lo scroll all’elemento prima di rimuovere l’hash
        const id = window.location.hash.slice(1);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView();

        // rimuove l’hash dall’URL corrente
        history.replaceState(null, '', window.location.pathname + window.location.search);
    }
}
// Al caricamento iniziale della pagina
window.addEventListener('DOMContentLoaded', removeHash);
// Alla variazione della hash (es. clic su un anchor interno)
window.addEventListener('hashchange', removeHash);



/*******************
 *   Icons
********************/

const logo = `<svg height="100%" id="CDB" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 315.13 200.93" style="fill: #fff;" aria-label="Logo"><title>Logo</title>
  <path id="B" d="M217.13,48.12l-4.49-6.05c1.18-5.68-1.94-4.32-5.01-6.94-13.37-11.4-24.86-22.14-42.51-27.57-3.61-1.11-10.72-2.77-13.67-3.41-10.56-2.3-20.79.29-29.88-2-1.67-.42-2.92,1-2.43-2.02,21.49.24,43.03-.32,64.54-.05,22.11.28,53.28-1.51,73.45,7.55,21.64,9.73,27.92,31.47,15.84,51.81-4.32,7.28-11.53,12.37-15.82,19.67,20.13,5.81,48.37,20.12,54.72,41.79,1.99,6.81.34,14.21,3.28,19.73-4.1.72-.35,5.31-1.09,7.82-.22.73-1.54.75-1.81,1.47-2.01,5.32-6.97,16.99-11.54,20.26-1.43,1.02-3.43.78-4.48,1.52-41.7,29.39-67.78,24.95-116.58,25.23-6.25.04-18.29-1.81-22.19,3.17-5.37-1.87-17.97,4.09-19.3-1.98,5.37,1,12.04-3.33,15.58-7.02,2.08-2.17,1.74-1.93,4.47-4.42,4.12-3.76,9.25-12.74,13.02-14.99,7.23-4.31,20.6-4.85,27.92-10.58v15.5c2.47,1.84,9.32,2.17,12.67,2.12,16.17-.23,36.2-4.95,48.39-16.08,5.49-5.01,4.93-10.99,7.47-13.61.85-.88,2.24.07,2.35-.06,1.39-1.67,1.34-12.43,3.15-15.3l-2.08-1.19,1.05-5.38-1.97,1.01c-3.16-12.78-15.92-21.8-27.54-26.61l-2.2.89c-3.38,5.27-7.28,10.42-11.32,15.19-4.36,5.15-10.31,12.53-14.93,17.07-.92.91-7.23,6.23-8.04,5.45l30.98-37.51c-.71-4.8-8.13,2.47-8.98,1.51-.74-1.89,1.16-5.25.87-6.44s-2.6-1.13-2.9-2.25c-.66-2.5.32-7.62.02-10.79-.64-6.77-3.29-14.04-2-20.52l-1.98-.47c1.87-2.36,1.42-1.15,2.97,0,4.51,3.35,9.39,6.93,15.06,8.01,7.12-8.02,9.65-19.41,6.67-29.74-1.02-3.54-4.53-6.25-2.72-9.78-.38-.32-1.96.86-3.04.46-.98-.37-9.14-7.54-11.22-8.81l-4.74.34,1.02-1.99-9.01.99v25Z"/>
  <path id="D" d="M196.72,38.57c19.22,18.56,26.27,49.58,15.9,74.54-5.9,14.19-18.51,26.69-32.48,33.01.93-8.44.9-16.95,1.01-25.48.22-16.76.06-34.01-.06-51.05-.06-8.58,1.13-17.76-.4-26.51-2.04-11.66-22.05-23.52-32.55-27.44.79-2.05,5.42-.39,7.01-.01,14.9,3.58,30.6,12.36,41.57,22.95Z"/>
  <path id="C" d="M141.13,12.13c.24,1.74-2.27.95-3.48.99-2.25.08-13.03-.4-13.57,1.61-.28,48.62-3.19,97.74,1.16,146.28,26.31,2.34,53.52-2.84,78.69-10.61,11.83-3.65,20.88-8.5,31.88-13.12.92-.38,2.54-2.18,3.33-.67-20.16,14.42-44.09,24.24-67.86,30.33l-1.12-1.81c.09.49.01,1.36-.35,1.6-13.39,8.64-42.06,6.25-57.87,9.69-5.39,1.17-9.98,4.39-14.32,5.69-3.51,1.05.68-4.99,1.06-6s-.54-2.42-.28-2.84,2.68.45,1.73-2.15l-15.99-2c1.72,3.12,7.01,1.89,9.99,3-.6,1.87-5.91,1.08-7.39.88-24.25-3.27-54.37-17.98-70.57-36.43-1.4-1.6-7.59-9.62-8.02-10.99-.16-.51-.27-1.63.48-1.48,2.64,1.9,3.8,4.88,5.65,7.35.7.93,2.02,3.13,1.84.17-4.03-7.25-9.91-13.97-11-22.52l-1.97.48c1.21,3.45,2.45,6.93,3.61,10.39.57,1.71.93,3.22-1.13,1.13-7.56-15.59-6.56-32.59-2.48-49.01l1.98,1.01c.22-2.68,1.4-10.1,2.49-12.1.48-.88,2.06.03,2.3-.21,1.1-1.09,1.84-3.73,3.72-4.69.03,2.59-1.63,5-2.14,7.87-.29,1.65-1.12,3.26,1.13,1.13l9.48-16.52-2.98-.49c-.16-.17,2.09-3.51,2.57-3.92,18.93-16.32,34.98-26.18,60.4-31.6,3.15-.67,15.19-1.4,16.06-1.94,2.59-1.6-1.84-4.79-2.03-6.52,14.13,6,29.8,6.61,44.99,8ZM101.12,17.12c-12.1,3.98-23.35,10.2-33,18.49-3.16,2.72-4.35,6.45-8.73,7.71-11.57,24.36-18.73,45.42-7.03,72.07,7.71,17.55,21.14,30.08,38.27,37.73,3.56,1.59,7.27,2.85,10.98,4.02,1.09-6.4,1.79-13.01,1.95-19.51.73-29.86.55-63.27-.48-92.96-.32-9.22.35-18.49-1.97-27.54Z"/>
</svg>`;
$(".navbar-brand, .offcanvas-title").append(logo);


/******************
 * End Icons
********************/


