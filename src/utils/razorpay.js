const Razorpay=require('razorpay');

var instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports=instance;

// This will initialize razorpay and give us an instance