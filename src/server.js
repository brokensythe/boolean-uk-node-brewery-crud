// Description
// Yesterday, we created our very first API with only READ capabilities: we could read data about breweries but we could not add, edit or delete. Let's add CREATE, UPDATE and DELETE functionalities to our BreweryDB API replica.

// Instructions
// Just like yesterday, our source of truth will be an array of objects stored "in memory".
// So, at the top of your file, you should declare
// const let breweries = [{"id":9094,"obdb_id.....blahblah....}] copy/pasting from https://api.openbrewerydb.org/breweries
// @here
// What our API will offer:

// Breweries resource
// - A GET endpoint /breweries to have a full list of breweries available. The return type expected is an array of objects. (same as yesterday)
// - A GET endpoint /breweries?brewery_type=TYPE to have a filtered list by brewery_type. The return type expected is (always) an array of objects. (e.g /breweries?brewery_type=micro should return an array of objects representing all breweries having micro as brewery_type) (same as yesterday)
// - A POST endpoint /breweries to add (CREATE) a new brewery to the list: The body of the request should contain all the elements of the object. you can use this as a template

// {"id":1,"obdb_id":"bln-brewery","name":"BLN Brewery, LLC","brewery_type":"micro","street":"Regis House, 45 King William Street","address_2":null,"address_3":null,"city":"London","state":null,"county_province":null,"postal_code":"EC4R 9AN","country":"United Kingdom","longitude":null,"latitude":null,"phone":null,"website_url":"https://boolean.co.uk/%22,%22updated_at%22:%222020-07-24T00:00:00.000Z%22,%22created_at%22:%222020-07-24T00:00:00.000Z%22%7D

// - A DELETE endpoint /brewery/:id to delete a brewery from the list by ID.

// Tours resource

// Create the exact same request methods and paths from the breweries above, but this time for the tours path. The filter should be by date instead of brewery_type

// A tour object will look like this 

// {
//   id: 1,
//   breweryId: 9242,
//   numberPeople: 2,
//   date: "23/12/2021",
// }

// Create an array with two tours as the initial data to serve
// @here
// What to do with IDs?
// There shouldn't be two objects with the same ID: IDs must always be unique. Backends should provide checks for data integrity but for now, we are relying on users to give us unique id.
// (We will solve this next week using databases so let's not waste time on this today)

// Extra
// - A PATCH endpoint  to UPDATE info about your resources: The body of the request should be one or multiple elements to be updated or added to an existing resource

// Tips
// - Your breweries array will be reset every time you run the application: that's expected, we are not dealing with persistency just yet :slight_smile:
// - The first two endpoints are from yesterday's exercise, we suggest you to write them from scratch as a refresher 
// - You should use [Insomnia](https://insomnia.rest/) to test your routes


const express = require("express")
const morgan = require("morgan")

const app = express()

const breweriesRouter = require("./resources/breweries/routes")
const toursRouter = require("./resources/tours/routes")

app.use(morgan("dev"))
app.use(express.json())

app.use("/breweries", breweriesRouter)
app.use("/tours", toursRouter)


app.get("*", (req, res) => {
    res.status(404).send("<h1>404 Page Not Found</h1>")
})

app.listen(4000, ()=>{
    console.log("I have arrived");
})