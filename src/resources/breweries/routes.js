const express = require("express")
const fetch = require("node-fetch")

const breweriesRouter = express.Router()

fetch("https://api.openbrewerydb.org/breweries")
.then(resp=>resp.json())
.then(data=> {
    storedBreweries = data
    runRoutes(storedBreweries)
})

let storedBreweries = []

function runRoutes(breweries) {
    breweriesRouter.get("/", (req, res) => {
        const { brewery_type } = req.query
        if (brewery_type) {
            const filterByBreweryType = breweries.filter(brewery=>brewery.brewery_type===brewery_type)
            return res.json(filterByBreweryType)
        }
        res.json({ breweries })
    })

    breweriesRouter.get("/:id", (req, res) => {
            const { id } = req.params
            res.json(breweries[Number(id)-1])
    })

    breweriesRouter.post("/", (req, res) => {
        const additionalBrewery = req.body
        storedBreweries.push(additionalBrewery)

        res.status(201).json({ brewery : additionalBrewery })
    })

    breweriesRouter.delete("/:id", (req, res) => {
        const { id } = req.params
        storedBreweries = storedBreweries.filter(brewery=>brewery.id!==Number(id))

        res.status(200).json({})
    })
}

module.exports = breweriesRouter