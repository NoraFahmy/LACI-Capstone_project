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
		image:[{
			url:"https://res.cloudinary.com/norafahmy/image/upload/v1617782494/Laci%20Capstone/photo-1518548419970-58e3b4079ab2_ghyemj.jpg",
			filename:'Laci Capstone/photo-1518548419970-58e3b4079ab2_ghyemj'
		},
			{
			url:"https://res.cloudinary.com/norafahmy/image/upload/v1617782494/Laci%20Capstone/photo-1544644181-1484b3fdfc62_ewuypq.jpg",
			filename:'Laci Capstone/photo-1544644181-1484b3fdfc62_ewuypq'
		},
			{url:"https://res.cloudinary.com/norafahmy/image/upload/v1617782495/Laci%20Capstone/photo-1546484475-7f7bd55792da_iua5at.jpg",
			filename:'Laci Capstone/photo-1546484475-7f7bd55792da_iua5at'
		}],	
        country: "Indonesia",
        description:"Obviously we had to include the home of the world’s greenest school. Founded in 2006 by former jewelry maker John Hardy, Green School was built with sustainable natural materials and is powered by over 100 solar panels. Located in the Sibang Kajha area north of the Badung Regency, each classroom has its own rice paddy, which children are tasked with maintaining as they learn how to live sustainably.",
		// price: "$",
		// company: "bali",
		submittedBy:"606f499d17a7a6c2f41d6673"
    },
    {
        name: "Santa Barbara",
		image:[{
			url:"https://res.cloudinary.com/norafahmy/image/upload/v1617782684/Laci%20Capstone/santa-barbara3_hryvya.jpg",
			filename:'Laci Capstone/santa-barbara3_hryvya'
		},
			{url:"https://res.cloudinary.com/norafahmy/image/upload/v1617782682/Laci%20Capstone/santa-barbara2_xnyecf.jpg",
			filename:'Laci Capstone/santa-barbara2_xnyecf'
		} ,
			{url:"https://res.cloudinary.com/norafahmy/image/upload/v1617782683/Laci%20Capstone/santa-barbara1_ub3bev.jpg",
			filename:'Laci Capstone/santa-barbara1_ub3bev'
		}],
        country:"USA",
        description:"Floodwaters have shaped the steep canyons and cliffs along the Cuyama River in the northeastern corner of Santa Barbara County. But while its population is scarce, the area is one of the most dynamic producers of oil and gas in the country. Its green claim to fame are healthy crops like pistachios, wine grapes, and lettuce.",
		// price: "$",
		// company: "USA",
		submittedBy:"606f499d17a7a6c2f41d6673"
    },
	{
		name:"Helsinki",
		image:[{
			url:"https://res.cloudinary.com/norafahmy/image/upload/v1617783459/Laci%20Capstone/Helsinki1_do23lr.jpg",
			filename:'Laci Capstone/Helsinki1_do23lr'	
		} ,
			{url:"https://res.cloudinary.com/norafahmy/image/upload/v1617783458/Laci%20Capstone/Helsinki2_mno2bh.jpg",
			filename:'Laci Capstone/Helsinki2_mno2bh'
		},
			{url: "https://res.cloudinary.com/norafahmy/image/upload/v1617783459/Laci%20Capstone/Helsinki3_bl3ad1.jpg",
			filename:'Laci Capstone/Helsinki3_bl3ad1'
		}],
		country:"Finland",
		description:"Not only does this port city off the Baltic aim to rid itself of cars by 2050, it completed a pedestrian and bicycle corridor in 2012. The Baanas, or “rail” as it’s known in colloquial Finnish, conserved as much of its original rail line structures as possible while adding new lighting, foliage, and bike lanes. At the southern end of the trail, you’ll find ping pong tables, pétanque pitches, and basketball courts.",
		// price: "$",
		// company: "Finland",
		submittedBy:"606f499d17a7a6c2f41d6673"

	},
	{
		name:"Berlin",
		image:[{
			url:"https://res.cloudinary.com/norafahmy/image/upload/v1617782884/Laci%20Capstone/berlin2_hxbcwg.jpg",
			filename:'Laci Capstone/berlin2_hxbcwg'
		} ,
			{url:"https://res.cloudinary.com/norafahmy/image/upload/v1617782884/Laci%20Capstone/berlin_hm5yme.jpg",
			filename:'Laci Capstone/berlin_hm5yme'
		},
			{url:"https://res.cloudinary.com/norafahmy/image/upload/v1617782883/Laci%20Capstone/berlin3_u0ryvl.jpg",
			filename:'Laci Capstone/berlin3_u0ryvl'
		 }],
		country:"Germany",
		description:"In the Kreuzberg neighborhood of former West Berlin, where gentrification and rising rents are a hard reality, the nonprofit Nomadisch Grün (Nomadic Green) has built a vibrant garden on brownfield leased from the city. The aim of Prinzessinnengarten, which is entirely mobile, is to encourage others to start a garden of their own. The 25-person nonprofit makes money by selling food and soil.",
		// price: "$",
		// company: "Germany",
		submittedBy:"606f499d17a7a6c2f41d6673"

	},
	{
        name: "Denver",
		image:[{
			url:"https://res.cloudinary.com/norafahmy/image/upload/v1617782982/Laci%20Capstone/denver3_rpisnm.jpg",
			filename:'Laci Capstone/denver3_rpisnm'
		},
			{url:"https://res.cloudinary.com/norafahmy/image/upload/v1617782982/Laci%20Capstone/denver2_o1ivrv.jpg",
			filename:'Laci Capstone/denver2_o1ivrv'
		} ,
			{url:"https://res.cloudinary.com/norafahmy/image/upload/v1617782982/Laci%20Capstone/denver_ztpqyh.jpg",
			filename:'Laci Capstone/denver_ztpqyh'
		}],
        country:"Colorado",
        description:"Not everyone in Denver loves Ordinance 300, which mandates that building owners install rooftop gardens or solar panels. However, Mayor Michael Hancock remains a proponent of battling climate change, which many residents are behind. Not only did he vow to uphold the Paris Climate Agreement, but last year he unveiled a three-year project to jumpstart entrepreneurship in Denver.",
		// price: "$",
		// company: "Colorado",
		submittedBy:"606f499d17a7a6c2f41d6673"
    },
	{
        name: "San Diego",
		image:[{
			url:"https://res.cloudinary.com/norafahmy/image/upload/v1618094319/Laci%20Capstone/dofdsr0ernv34tiplr1n.jpg",
			filename:"Laci Capstone/dofdsr0ernv34tiplr1n"},
			{url:"https://res.cloudinary.com/norafahmy/image/upload/v1617958484/Laci%20Capstone/crcecdk6pprvc4hogki2.jpg",
			filename:"Laci Capstone/crcecdk6pprvc4hogki2"} ,
			{url:"https://res.cloudinary.com/norafahmy/image/upload/v1618112035/Laci%20Capstone/drtl8vgz5cvfgfvi4qrc.jpg",
			filename:"Laci Capstone/drtl8vgz5cvfgfvi4qrc"} ,

		],
        country:"USA",
        description:"With the addition of a 77-acre property in Encinitas, the Nature Collective, a Southern California nonprofit land trust, remains devoted to natural land preservation. Next year, the collective’s habitat restoration staff will work with volunteers to rejuvenate the property’s native plants and animals while creating trail connections for people to enjoy the space. Among the endangered species that live there are the San Diego pocket mouse and the California gnatcatcher.",
		// price: "$",
		// company: "USA",
		submittedBy:"606f499d17a7a6c2f41d6673"
    },
	{
        name: "Vancouver",
		image:[{
			url:"https://res.cloudinary.com/norafahmy/image/upload/v1618202213/Laci%20Capstone/photo-1554321585-ef3194b190cd_z7hmt2.jpg",
			filename:"Laci Capstone/photo-1554321585-ef3194b190cd_z7hmt2"},
			{url:"https://res.cloudinary.com/norafahmy/image/upload/v1618202213/Laci%20Capstone/photo-1610381800160-b9c7f46a9bb3_agxubs.jpg",
			filename:"Laci Capstone/photo-1610381800160-b9c7f46a9bb3_agxubs"} ,
			{url:"https://res.cloudinary.com/norafahmy/image/upload/v1618202213/Laci%20Capstone/photo-1532996122724-e3c354a0b15b_lqka0l.jpg",
			filename:"Laci Capstone/photo-1532996122724-e3c354a0b15b_lqka0l"} ,

		],
        country:"Canada",
        description:"This city is serious about tackling waste — a June report found 2.6 million disposable cups wind up in the trash every week — and it recently approved a controversial modular housing project to help the homeless.According to Mayor Gregor Robertson, walking, biking, and public transportation trump cars when it comes to transit.",
		// price: "$",
		// company: "Canada",
		submittedBy:"606f499d17a7a6c2f41d6673"
    },
	{
        name: "Milwaukee",
		image:[{
			url:"https://res.cloudinary.com/norafahmy/image/upload/v1618203305/Laci%20Capstone/Milwaukee1_vaycg5.jpg",
			filename:"Laci Capstone/Milwaukee1_vaycg5"},
			{url:"https://res.cloudinary.com/norafahmy/image/upload/v1618203305/Laci%20Capstone/Milwaukee3_qo7pcl.jpg",
			filename:"Laci Capstone/Milwaukee3_qo7pcl"} ,
			{url:"https://res.cloudinary.com/norafahmy/image/upload/v1618203305/Laci%20Capstone/Milwaukee2_zdmhsq.jpg",
			filename:"Laci Capstone/Milwaukee2_zdmhsq"} ,

		],
        country:"USA",
        description:'My message to winter is, "Bring it on," said Mayor Tom Barrett, who recently did away with Milwaukee’s four-inch rule. Before, certain residential streets prohibited parking when snowfall reached four inches or more. But with the formal rule no longer in place, the city is unleashing new "green" salt to prepare for the winter, which has magnesium chloride and a rust inhibitor.',
		// price: "$",
		// company: "USA",
		submittedBy:"606f499d17a7a6c2f41d6673"
    },
	{
        name: "Seoul",
		image:[{
			url:"https://res.cloudinary.com/norafahmy/image/upload/v1618203363/Laci%20Capstone/seoul3_xqowlt.jpg",
			filename:"Laci Capstone/seoul3_xqowlt"},
			{url:"https://res.cloudinary.com/norafahmy/image/upload/v1618203364/Laci%20Capstone/seoul1_pnthrx.jpg",
			filename:"Laci Capstone/seoul1_pnthrx"} ,
			{url:"https://res.cloudinary.com/norafahmy/image/upload/v1618203363/Laci%20Capstone/seoul2_ddntxf.jpg",
			filename:"Laci Capstone/seoul2_ddntxf"} ,

		],
        country:"South Korea",
        description:"Like New York City’s High Line, the Skygarden in Seoul turned a derelict highway into something magical. The dazzling space, which is open 24-hours a day, has bridges that connect it to adjacent commercial buildings, along with performance spaces, street markets, and libraries. One “library” of 24,000 plants, grouped according to the Korean alphabet, denotes the use of certain spaces — like a rose, which compelled Dutch architects MVRDV to build a theater nearby.",
		// price: "$",
		// company: "South Korea",
		submittedBy:"606f499d17a7a6c2f41d6673"
    },
	// {
    //     name: "",
	// 	image:[{
	// 		url:"",
	//		filename:""},
	// 		{url:"",
	//		filename:""} ,
	// 		{url:"",
	//		filename:""} ,

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

