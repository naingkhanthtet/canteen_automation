// for light box function
function openLightbox(src) {
    var modal = document.getElementById("lightboxModal");
    var img = document.getElementById("enlargedImg");
    img.src = src;
    modal.style.display = "block";

    // Add a click event listener to the modal itself to close it
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeLightboxModal();
        }
    });

    // Remove the click event listener from the image
    img.removeEventListener("click", closeLightboxModal);
}

// close the lightbox
function closeLightboxModal() {
    var modal = document.getElementById("lightboxModal");
    modal.style.display = "none";
}

// Add event listeners to all anchor tags with the "lightbox" class
var lightboxLinks = document.getElementsByClassName("lightbox");
for (var i = 0; i < lightboxLinks.length; i++) {
    lightboxLinks[i].addEventListener("click", function (event) {
        event.preventDefault(); 
        openLightbox(this.href);
    });
}
