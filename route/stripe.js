// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.

const stripe = require("stripe")(
  "sk_test_51LWEIjLNnNunaJbo5FbWAIwFK8cQq861yuDnfMSU3HUEKbAG3QEiz81ETM9Cg2FblPD7Uv4WZIuEOSZTAtDodknV00CZGVjG1p"
);
const express = require("express");
const router = express.Router();
const app = express();
// router.use(express.static("public"));

// const YOUR_DOMAIN = "http://localhost:4242";

router.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "{{PRICE_ID}}",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${"http://localhost:3000"}/checkout-success`,
    cancel_url: `${"http://localhost:3000"}/cart`,
  });

  res.send({ url: session.url });
});

module.exports = router;
