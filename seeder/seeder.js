const mongoose=require('mongoose');
//to import my collection use 
const Place=require('../models/place');

//Mongoose Connecting to MongoDB
mongoose
	.connect('mongodb://localhost:27017/placesDB', {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Mongo Connection Open');
	})
	.catch((error) => handleError(error));


const sampleData=[{
        name: " Bali",
		images:[{
			url:"https://images.unsplash.com/photo-1546484475-7f7bd55792da?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fGJhbGl8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"},
			{
			url:"https://images.unsplash.com/photo-1517480448885-d5c53555ba8c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjR8fGJhbGl8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=60" },
			{url:"https://images.unsplash.com/photo-1553902000-e036b7d05af5?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTl8fGJhbGl8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=60"} ,
		],	
        country: "Indonesia",
        description:"Obviously we had to include the home of the world’s greenest school. Founded in 2006 by former jewelry maker John Hardy, Green School was built with sustainable natural materials and is powered by over 100 solar panels. Located in the Sibang Kajha area north of the Badung Regency, each classroom has its own rice paddy, which children are tasked with maintaining as they learn how to live sustainably.",
		price: "$",
		company: "bali"
    },
    {
        name: "Santa Barbara",
		images:[{
			url:"https://images.unsplash.com/photo-1500745714021-72b5d3c31813?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjN8fHNhbnRhJTIwYmFyYmFyYXxlbnwwfHwwfA%3D%3D&auto=format&fit=crop&w=1000&q=60"},
			{url:"https://images.unsplash.com/photo-1607055871157-92653c6fc69f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjZ8fHNhbnRhJTIwYmFyYmFyYXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=60"} ,
			{url:"https://images.unsplash.com/photo-1528218171320-9d6f43a90d24?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzR8fHNhbnRhJTIwYmFyYmFyYXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=60"} ,

		],
        country:"USA",
        description:"Floodwaters have shaped the steep canyons and cliffs along the Cuyama River in the northeastern corner of Santa Barbara County. But while its population is scarce, the area is one of the most dynamic producers of oil and gas in the country. Its green claim to fame are healthy crops like pistachios, wine grapes, and lettuce.",
		price: "$",
		company: "USA"
    },
	{
		name:"Helsinki",
		images:[{
			url:"https://images.unsplash.com/photo-1547827987-6a6bf5b472e5?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8aGVsc2lua2klMjBvYnNlcnZhdG9yeXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=60"} ,
			{url:"https://images.unsplash.com/photo-1559552006-e32abbfe5103?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"},
			{url: "https://images.unsplash.com/photo-1601298213071-f3cd29397304?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"},

		],
		country:"Finland",
		description:"Not only does this port city off the Baltic aim to rid itself of cars by 2050, it completed a pedestrian and bicycle corridor in 2012. The Baanas, or “rail” as it’s known in colloquial Finnish, conserved as much of its original rail line structures as possible while adding new lighting, foliage, and bike lanes. At the southern end of the trail, you’ll find ping pong tables, pétanque pitches, and basketball courts.",
		price: "$",
		company: "Finland"

	},
	{
		name:"Berlin",
		images:[{
			url:"https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8YmVybGlufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=60"} ,
			{url:"https://images.unsplash.com/photo-1509136561942-7d8663edaaa2?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nnx8YmVybGlufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=60" },
			{url:"https://images.unsplash.com/photo-1552553302-9211bf7f7053?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8YmVybGlufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=60" }],
		country:"Germany",
		description:"In the Kreuzberg neighborhood of former West Berlin, where gentrification and rising rents are a hard reality, the nonprofit Nomadisch Grün (Nomadic Green) has built a vibrant garden on brownfield leased from the city. The aim of Prinzessinnengarten, which is entirely mobile, is to encourage others to start a garden of their own. The 25-person nonprofit makes money by selling food and soil.",
		price: "$",
		company: "Germany"

	},
	{
        name: "Denver",
		images:[{
			url:"https://images.unsplash.com/photo-1521708266372-b3547456cc2d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=362&q=80"},
			{url:"https://images.unsplash.com/flagged/photo-1566838634698-48b165cb0a9d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"} ,
			{url:"https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8c29sYXIlMjBwYW5lbHMlMjBpbiUyMHN1bnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"} ,

		],
        country:"Colorado",
        description:"Not everyone in Denver loves Ordinance 300, which mandates that building owners install rooftop gardens or solar panels. However, Mayor Michael Hancock remains a proponent of battling climate change, which many residents are behind. Not only did he vow to uphold the Paris Climate Agreement, but last year he unveiled a three-year project to jumpstart entrepreneurship in Denver.",
		price: "$",
		company: "Colorado"
    },
	// {
    //     name: "",
	// 	images:[{
	// 		url:""},
	// 		{url:""} ,
	// 		{url:""} ,

	// 	],
    //     country:"",
    //     description:"",
	// 	price: "$",
	// 	company: ""
    // },
];

// We first clear our database and then add in our restaurant sample
const seedDB = async () => {
	await Place.deleteMany({});
	const res = await Place.insertMany(sampleData)
		.then((data) => console.log('Data inserted'))
		.catch((e) => console.log(e));
};

// We run our seeder function then close the database after.
seedDB().then(() => {
	mongoose.connection.close();
});

