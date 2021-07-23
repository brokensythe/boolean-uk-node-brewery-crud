const express = require("express")
const fetch = require("node-fetch")

const toursRouter = express.Router()

let storedTours = [
    {
        id: 1,
        breweryId: 9180,
        numberPeople: 2,
        date: "23/12/2021",
      },
      {
        id: 2,
        breweryId: 10217,
        numberPeople: 20,
        date: "23/10/2021",
      }
]


    toursRouter.get("/", (req, res) => {
        const { date } = req.query
        if (date) {
            const filterByDate = storedTours.filter(tour=>tour.date===date)
            res.json(filterByDate)
            return
        }
        res.json({ storedTours })
    })

    toursRouter.get("/:id", (req, res) => {
            const { id } = req.params
            res.json(storedTours[Number(id)-1])
    })

    toursRouter.post("/", (req, res) => {
        const additionalTour = req.body
        storedTours.push(additionalTour)

        res.status(201).json({ tour : additionalTour })
    })

    toursRouter.delete("/:id", (req, res) => {
        const { id } = req.params
        storedTours = storedTours.filter(tour=>tour.id!==Number(id))

        res.status(200).json({})
    })

    module.exports = toursRouter
