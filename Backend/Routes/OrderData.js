const express = require('express')
const router = express.Router()
const Order = require('../models/Orders')
// const axios = require('axios');

// router.post('/getlocation', async (req, res) => {
//     try {
//       const { lat, long } = req.body;
  
//       const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=fd25c6e7870d43a39db8c98f7ab5b24a`);
//       const components = response.data.results[0].components;
//       const { village, county, state_district, state, postcode } = components;
//       const location = `${village}, ${county}, ${state_district}, ${state}\n${postcode}`;
  
//       res.send({ location });
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send("Server Error");
//     }
//   });



router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0, 0, { Order_date: req.body.order_date })

    //if email not existing in db then create else insert
    let eId = await Order.findOne({ 'email': req.body.email })
    console.log(eId);

    if (eId === null) {
        try {

            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true })
            })



        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }

    else {
        try {

            await Order.findOneAndUpdate({ email: req.body.email },
                {
                    $push: { order_data: data }
                }
            ).then(() => {
                res.json({ success: true })
            })

        } catch (error) {
            res.send("Server error", error.message)
        }
    }

})


router.post('/myorderData', async (req, res) => {
    try {
        let myData = await Order.findOne({ 'email': req.body.email })
        res.json({ orderData: myData })

    } catch (error) {
        res.send('Server Error', error.message)
    }


})


module.exports = router;
