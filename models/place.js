const mongoose=require('mongoose');
const Review=require('./review')
const Schema=mongoose.Schema;


const PlaceSchema=new Schema({
    name: String,
    image: [{
        url: String,
        filename: String
    }],
    country: String,
    description: String ,
    // price: String,
    // company: String,
    submittedBy: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
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