const express=require('express');
const router=express.Router({mergeParams:true});
const asyncCatcher=require("../utilites/asyncCatcher");
const {reviewSchema}=require('../joiSchema'); 
const AppError=require("../utilites/AppError");
const Place=require("../models/place");
const Review=require("../models/review");


/*--------------MiddleWare--------------*/
const validateReview = (req, res, next) => {
	const { error } = reviewSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((e) => e.message).join(',');
		throw new AppError(msg, 400);
	} else {
		next();
	}
};

/*--------------Review routes--------------*/

// creat a new review | EJS: show
router.post('/', validateReview,asyncCatcher(async (req,res)=>{
	const {id}=req.params;
	const place=await Place.findById(id);
	const review=new Review(req.body.review);
	place.reviews.push(review);
	await place.save();
	await review.save();
	req.flash("success","New Review was successfully Added!");
	res.redirect(`/places/${id}`)

})); 

// delete a review 
router.delete(
	'/:reviewId',
	asyncCatcher(async (req, res) => {
		const { id, reviewId } = req.params;
		await Place.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
		await Review.findByIdAndDelete(reviewId);
		req.flash("success","The Review was successfully Deleted!");
		res.redirect(`/places/${id}`);
	})
);

module.exports=router;