 // JavaScript to handle the copy functionality
 document.getElementById('copyButton').addEventListener('click', function() {
  // Create a temporary textarea element
  var tempInput = document.createElement('textarea');
  tempInput.value = document.getElementById('textToCopy').innerText;
  document.body.appendChild(tempInput);

  // Select the text field
  tempInput.select();
  tempInput.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  document.execCommand('copy');

  // Remove the temporary textarea
  document.body.removeChild(tempInput);

  // Optional: Alert the copied text
  //alert('Copied the text: ' + tempInput.value);
});

// JavaScript to handle LinkedIn share functionality
document.getElementById('linkedinShareButton').addEventListener('click', function(event) {
  event.preventDefault();
  
  const urlToShare = encodeURIComponent(window.location.href);
  
  const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${urlToShare}`;
  
  window.open(shareUrl, 'linkedinShareWindow', 'height=450,width=550,top=' + (screen.height / 2 - 225) + ',left=' + (screen.width / 2 - 275) + ',toolbar=0,location=0,menubar=0,directories=0,scrollbars=0');
});

// JavaScript to handle the Facebook share functionality
document.getElementById('fbshareButton').addEventListener('click', function() {
  // Use the Facebook share dialog to share the current page
  FB.ui({
      method: 'share',
      href: window.location.href
  }, function(response){});
});