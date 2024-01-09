function shareOnFacebook() {
  window.open(
    "https://www.facebook.com/sharer/sharer.php?u=" +
      encodeURIComponent(window.location.href)
  );
}

function shareOnTwitter() {
  window.open(
    "https://twitter.com/intent/tweet?url=" +
      encodeURIComponent(window.location.href)
  );
}

function shareOnWhatsApp() {
  window.open(
    "whatsapp://send?text=" + encodeURIComponent(window.location.href)
  );
}

function shareOnPinterest() {
  window.open(
    "https://pinterest.com/pin/create/button/?url=" +
      encodeURIComponent(window.location.href)
  );
}
