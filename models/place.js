const mongoose=require('mongoose');
const Review=require('./review')
const Schema=mongoose.Schema;


const PlaceSchema=new Schema({
    name: String,
    images: [{
        url: String
    }],
    country: String,
    description: String ,
    price: String,
    company: String,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

PlaceSchema.post('findOneAndDelete', async function (data) {
	if (data) {
		await Review.deleteMany({
			_id: {
				$in: data.reviews,
			},
		});
	}
});

const Place=new mongoose.model("Place",PlaceSchema);

module.exports=Place;