const mongoose = require('mongoose');
const mongoURI = 'mongodb://gofood:gofoodmern@ac-xnkpyzr-shard-00-00.bxzkfsf.mongodb.net:27017,ac-xnkpyzr-shard-00-01.bxzkfsf.mongodb.net:27017,ac-xnkpyzr-shard-00-02.bxzkfsf.mongodb.net:27017/gofood?ssl=true&replicaSet=atlas-14nkkg-shard-0&authSource=admin&retryWrites=true&w=majority';
const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }).then(async (err,result)=>{ 
    console.log('connected')
    
    const fetchdata = mongoose.connection.db.collection('food_items');
    const fetchcate = mongoose.connection.db.collection('foodCategory');
    // fetchdata.find({}).toArray(function( err,data){
    //     if(err) console.log(err);
    //     else {
    //         global.food_items = data;
    //         console.log(global.food_items);
    //         // console.log('123456');
            
    //     }
    // })

    const data = await fetchdata.find({}).toArray();
    global.food_items = data;

    const cate = await fetchcate.find({}).toArray();
    global.foodCategory = cate;
    // console.log(global.food_items);
    //console.log(global.foodCategory);


})
    .catch((err) => { console.error(err) })
}

module.exports = mongoDB;