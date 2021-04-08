const express=require('express');
const router=express.Router();
const asyncCatcher=require("../utilites/asyncCatcher");
const {placeSchema}=require('../joiSchema'); 
const AppError=require("../utilites/AppError");
const Place=require("../models/place");
const {isAuthenticated}=require('../middlewear/isAuthenticated');

// --------------MiddleWare--------------
const validatePlace=(req,res,next)=>{
	const{error}=placeSchema.validate(req.body);
	if(error){
		const msg=error.details.map((e)=> e.message).join(",")
		throw new AppError(msg,400)
		} 
	else next()
};

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
router.post("/",isAuthenticated,validatePlace,asyncCatcher(async(req,res)=>{
	console.log(req.body.place)
	const place=new Place(req.body.place);
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
    const place=await Place.findById(id).populate('reviews');
	if (!place) {
			req.flash('error', 'Place does not exist!');
			res.redirect('/places')
			// return next(new AppError('Place not found!', 404));
		}
    res.render("places/show",{place})
	})
);

//Edit place Page | EJS: edit
router.get("/:id/edit",isAuthenticated,asyncCatcher(async(req,res)=>{
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
router.put("/:id",isAuthenticated,validatePlace,asyncCatcher(async(req,res)=>{
	const id=req.params.id;
	const place=await Place.findByIdAndUpdate(id,{...req.body.place});
	req.flash("success","New Place was successfully updated!")
	res.redirect(`/places/${id}`);

}));

//delete a place 
router.delete("/:id/delete",isAuthenticated,asyncCatcher(async(req,res)=>{
	const {id}=req.params;
	await Place.findByIdAndDelete(id);
	req.flash("success","The Place was successfully deleted!");
	res.redirect("/places");
}));

module.exports=router;