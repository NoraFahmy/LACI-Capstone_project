const express=require('express');
const router=express.Router();
const asyncCatcher=require("../utilities/asyncCatcher");
const {placeSchema}=require('../joiSchema');
const AppError=require("../utilities/AppError");
const Place=require("../models/place");
const multer = require("multer");
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });
const { cloudinary } = require('../cloudinary/index');
const {isAuthenticated,isCreator,validatePlace}=require('../middlewear/middleware');


// Route: /places
// Method: GET
// Desc: Render all places
// Render: index.ejs
// Permissions: Public

//show all | EJS:index
router.get("/",asyncCatcher(async (req,res)=>{
	//to get all info in Place tabele
    const places=await Place.find({});
    res.render("places/index",{places});

	})
);

// show the new place | EJS:show
// add authenication to prevent any user to post any new info from the serverside using postman
router.post("/",upload.array("image"),isAuthenticated,validatePlace,asyncCatcher(async(req,res)=>{
	const place=new Place(req.body.place);
	place.submittedBy=req.user._id;
		place.image = req.files.map((f) => ({
		url: f.path,
		filename: f.filename,
	}));
	await place.save();
	req.flash('success','New place was successfully added!');
	res.redirect(`/places/${place.id}`);
	})
);

//create a new place | EJS:new
router.get("/new", isAuthenticated,(req,res)=>{
	res.render("places/new");
});

//Show Individual Place Details | EJS:show
router.get("/:id",asyncCatcher(async (req,res,next)=>{
    const id=req.params.id;
	const len=id.length;
	if (len!=24) {
			req.flash('error', 'Place does not exist!');
			res.redirect('/places');
	}
    const place=await Place.findById(id).populate({
				path: "reviews",
				populate: {
					path:"author"
				}
			})
	.populate('submittedBy');
	if (!place) {
			req.flash('error', 'Place does not exist!');
			res.redirect('/places');
		}
    res.render("places/show",{place})
	})
);

//Edit place Page | EJS: edit
router.get("/:id/edit",isAuthenticated,isCreator,asyncCatcher(async(req,res)=>{
	const id=req.params.id;
	const place= await Place.findById(id);
	if(!place) {
			req.flash('error','Place does not exist!');
			res.redirect("/places")
		}
	res.render('places/edit', { place });
	})
);


// Update Place Endpoint
router.put("/:id",upload.array("image"),isAuthenticated,isCreator, validatePlace,asyncCatcher(async(req,res)=>{
	const id=req.params.id;
	const place=await Place.findByIdAndUpdate(id,{...req.body.place});
	// Just like in our create route we will map over our array and create a new array of objects with a url and filename key
	const imgs = req.files.map((f) => ({
		url: f.path,
		filename: f.filename,
	}));
	// Since we are creating an array in our map we need to destructure our array and then push it into our place images array.
	place.image.push(...imgs);
	// Then we can save it
	await place.save();
	// This is where all of our logic lives for deleting an image.
	if (req.body.selectedImages) {
		// We loop over each image from our body and delete them from cloudinary
		for (let filename of req.body.selectedImages) {
			await cloudinary.uploader.destroy(filename);
		}
		// This query pulls out each image we want to delete from our image object in mongo. This is a very advanced query and I have posted the link to a stack overflow post on how this works below.
		await place.updateOne({
			$pull: { image: { filename: { $in: req.body.selectedImages } } },
		});
	}
	req.flash("success","New Place was successfully updated!")
	res.redirect(`/places/${place.id}`);

}));

//delete a place
router.delete("/:id/delete",isAuthenticated,isCreator,asyncCatcher(async(req,res)=>{
	const {id}=req.params;
	await Place.findByIdAndDelete(id);
	req.flash("success","The Place was successfully deleted!");
	res.redirect("/places");
}));

module.exports=router;
