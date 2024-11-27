(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Roadmap carousel
    $(".roadmap-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        dots: false,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            },
            1200:{
                items:5
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });

    
})(jQuery);

let ethPriceUSD = 55.42;
let ethPriceINR = ethPriceUSD * 85; // 1 USD = Rs. 85
let currentPriceUSD = ethPriceUSD;
let currentPriceINR = ethPriceINR;

let priceInterval;

function fluctuatePrice() {
    let priceChange = (Math.random() * 0.2 - 0.1).toFixed(2); // Random fluctuation between -$0.10 and +$0.10
    currentPriceUSD = (parseFloat(currentPriceUSD) + parseFloat(priceChange)).toFixed(2);
    currentPriceINR = (currentPriceUSD * 85).toFixed(2);
    updatePriceDisplay();
}

function updatePriceDisplay() {
    document.getElementById("eth-price").innerHTML = `
        USD: $${currentPriceUSD}<br>
        INR: ₹${currentPriceINR}
    `;
    calculateReceivedAmount();
}

function calculateReceivedAmount() {
    const currency = document.getElementById("currency").value;
    const coinAmount = parseFloat(document.getElementById("coin-amount").value);

    if (isNaN(coinAmount) || coinAmount <= 0) {
        document.getElementById("received-amount").value = "";
        return;
    }

    let receivedAmount = 0;
    if (currency === "usd") {
        receivedAmount = coinAmount * currentPriceUSD;
    } else if (currency === "inr") {
        receivedAmount = coinAmount * currentPriceINR;
    }

    document.getElementById("received-amount").value = receivedAmount.toFixed(2);
}

// Event listener for currency change
document.getElementById("currency").addEventListener("change", function () {
    const currency = this.value;
    const addressInput = document.getElementById("address");
    
    if (currency === "usd") {
        addressInput.placeholder = "Enter your BEP20 USDT address";
    } else if (currency === "inr") {
        addressInput.placeholder = "Enter your UPI ID";
    }

    calculateReceivedAmount(); // Ensure amount is recalculated
});


function calculateReceivedAmount() {
    const currency = document.getElementById("currency").value;
    const coinAmount = parseFloat(document.getElementById("coin-amount").value);

    if (isNaN(coinAmount) || coinAmount <= 0) {
        document.getElementById("received-amount").value = "";
        return;
    }

    let receivedAmount = 0;
    let currencySymbol = ""; // Initialize currency symbol

    if (currency === "usd") {
        receivedAmount = coinAmount * currentPriceUSD;
        currencySymbol = "$"; // Set USD symbol
    } else if (currency === "inr") {
        receivedAmount = coinAmount * currentPriceINR;
        currencySymbol = "₹"; // Set INR symbol
    }

    // Update the input box with currency symbol and value
    document.getElementById("received-amount").value = `${currencySymbol}${receivedAmount.toFixed(2)}`;
}







// Event listener for coin amount change
document.getElementById("coin-amount").addEventListener("input", calculateReceivedAmount);

// Update price display and start fluctuating price
updatePriceDisplay();
priceInterval = setInterval(fluctuatePrice, 5000); // Update price every 5 seconds

// Add event listener to the "NEXT" button
document.getElementById("next-button").addEventListener("click", function () {
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = "Please connect Pi Wallet first";
    errorMessage.style.display = "block"; // Ensure the message is visible
});

