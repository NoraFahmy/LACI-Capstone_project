const Joi=require('joi');

module.exports.placeSchema=Joi.object({
    place:Joi.object({
        name: Joi.string().required(),
        country: Joi.string().required(),
        description: Joi.string().required(), 
        price: Joi.string().required(),
        company: Joi.string().required(),
    }),	
    selectedImages: Joi.array(),	
});
module.exports.reviewSchema = Joi.object({
	review: Joi.object({
		body: Joi.string().required(),
		rating: Joi.number().required().min(1).max(5),
	}).required(),
});
