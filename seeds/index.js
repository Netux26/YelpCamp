const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', { useUnifiedTopology: true })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});


const sample = (array) => array[Math.floor(Math.random() * array.length)];



const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6423145f0c1d8175f59ec85b',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati odio ea, molestias impedit enim fugiat facilis voluptates nesciunt. Eos aliquam sapiente enim. Aliquid quia harum culpa minima cum, sit dignissimos.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [{
                url: 'https://res.cloudinary.com/djfjehgkz/image/upload/v1680190584/YelpCamp/bgbbzfbbztijrpy5xqsk.jpg',
                filename: 'YelpCamp/yo1rziecopawu45lsb4n',
            },
            {
                url: 'https://res.cloudinary.com/djfjehgkz/image/upload/v1680189717/YelpCamp/it6zthupiqfqe5y2fx2z.jpg',
                filename: 'YelpCamp/it6zthupiqfqe5y2fx2z',
            }]
        })
        await camp.save();
    }
}


seedDB().then(() => {
    mongoose.connection.close();
})
