// // Create a Stripe client.
// const stripe = Stripe("pk_test_51NzafLGA07QCghFzglRF55Po9aplhXFixBmLrL7RHe21s04qJfbxTcPXP8y1qKX4btXtov1EebWREgYdqBMtSZSa00gITdAunu");

// // Create an instance of Elements.
// const elements = stripe.elements();

// const style = {
//   base: {
//     color: "#32325d",
//     fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//     fontSmoothing: "antialiased",
//     fontSize: "16px",
//   },
//   invalid: {
//     color: "#fa755a",
//     iconColor: "#fa755a",
//   },
// };

// // Create an instance of the card Element.
// const card = elements.create("card", { style: style });

// // Add an instance of the card Element into the `card-element` <div>.
// card.mount("#card-element");

// // Handle real-time validation errors from the card Element.
// card.addEventListener("change", function (event) {
//   const displayError = document.getElementById("card-errors");
//   if (event.error) {
//     displayError.textContent = event.error.message;
//   } else {
//     displayError.textContent = "";
//   }
// });

// // Handle form submission.
// const $form = $("#checkout-form");

// $form.submit(function (event) {
//   event.preventDefault();
//   $form.find("button").prop("disabled", true);

//   const extraDetails = {
//     name: $("#card-name").val(),
//   };

//   stripe.createToken(card, extraDetails).then(function (result) {
//     if (result.error) {
//       $form.find("button").prop("disabled", false); // Re-enable submission
//     } else {
//       // Send the token to your server.
//       stripeTokenHandler(result.token);
//     }
//   });
// });

// // Submit the form with the token ID.
// function stripeTokenHandler(token) {
//   // Insert the token ID into the form so it gets submitted to the server
//   $form.append($('<input type="hidden" name="stripeToken" />').val(token.id));
//   // Submit the form
//   $form.get(0).submit();
// }

// Get the Payment method element from the DOM
const paymentMethodSelect = document.getElementById("paymentMethod");

// Listen for the change event on the Payment method element
paymentMethodSelect.addEventListener("change", function () {
  // Get the selected Payment method value
  const selectedPaymentMethod = paymentMethodSelect.value;

  // Get the elements related to Stripe information
  const stripeCardHolderName = document.getElementById("stripeCardHolderName");
  const stripeCardInfo = document.getElementById("stripeCardInfo");
  const cardNameInput = document.getElementById("card-name");

  if (selectedPaymentMethod === "stripe") {
    // Display the Stripe information fields and enable the Card Holder Name input
    stripeCardHolderName.style.display = "unset";
    stripeCardInfo.style.display = "unset";
    cardNameInput.disabled = false;
    // Start processing Stripe
    initializeStripe();
  } else {
    // Hide the Stripe information fields and disable the Card Holder Name input
    stripeCardHolderName.style.display = "none";
    stripeCardInfo.style.display = "none";
    cardNameInput.disabled = true;
  }
});

// Initialize Stripe when "Payment method" is selected as Stripe
const stripe = Stripe(
  "pk_test_51NzafLGA07QCghFzglRF55Po9aplhXFixBmLrL7RHe21s04qJfbxTcPXP8y1qKX4btXtov1EebWREgYdqBMtSZSa00gITdAunu"
);

const elements = stripe.elements();

const style = {
  base: {
    color: "#32325d",
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: "antialiased",
    fontSize: "16px",
  },
  invalid: {
    color: "#fa755a",
    iconColor: "#fa755a",
  },
};

const card = elements.create("card", { style: style });

function initializeStripe() {
  card.mount("#card-element");

  card.addEventListener("change", function (event) {
    const displayError = document.getElementById("card-errors");
    if (event.error) {
      displayError.textContent = event.error.message;
    } else {
      displayError.textContent = "";
    }
  });
}

// Handle form submission for Stripe
const $form = $("#checkout-form");

$form.submit(function (event) {
  event.preventDefault();
  const selectedPaymentMethod = $("#paymentMethod").val();
  if (selectedPaymentMethod === "stripe") {
    $form.find("button").prop("disabled", true);

    const extraDetails = {
      name: $("#card-name").val(),
    };

    stripe.createToken(card, extraDetails).then(function (result) {
      if (result.error) {
        $form.find("button").prop("disabled", false);
      } else {
        stripeTokenHandler(result.token);
      }
    });
  } else {
    // Submit the form
    $form.get(0).submit();
  }
});

// Submit the form with the token ID.
function stripeTokenHandler(token) {
  // Insert the token ID into the form so it gets submitted to the server
  $form.append($('<input type="hidden" name="stripeToken" />').val(token.id));
  // Submit the form
  $form.get(0).submit();
}
