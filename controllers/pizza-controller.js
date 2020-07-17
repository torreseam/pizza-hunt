const { Pizza } = require ('../models');

// Create find Methods
const pizzaController = {
    // get all pizzas- serves as a call back funtion for the get/api/pizza usig mongoose find()
    getAllPizza(req, res) {
        Pizza.find({})
            .populate({
                path: 'comments',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbPizzaData => res.json(dbPizzaData))
        // .then(dbPizzaData => res.json(dbPizzaData))
        // .catch(err => {
        //     console.log(err);
        //     res.status(500).json(err)
        // });
                .catch(err => {
                    console.log(err);
                    res.sendStatus(400);
                });
    },
//get pizza by id- find one method for a single pizza by ID
    getPizzaById({ params }, res) {
        // Pizza.findOne({ _id: params.id })
        // .then(dbPizzaData => {
        //     //if not pizza is found send 404 error
        //     if (!dbPizzaData) {
        //         res.status(404).json({ message: 'No pizza found with this id!' });
        //         return;
        //     }
        //     res.json(dbPizzaData)
        // })
        //     .catch(err => {
        //         console.log(err);
        //         res.status(400).json(err);
        //     });
        Pizza.findOne({ _id: params.id })
            .populate({
                path: 'comments',
                select: '-__v'
            })
            .select('-__v')
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },


    // createPizza
    createPizza({ body }, res) {
        Pizza.create(body)
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => res.status(400).json(err));
    },

    // update pizza by id- Mongoose finds a single document we want to update, then updates it and returns the updated document.
    updatePizza({ params, body }, res) {
        //true, we're instructing Mongoose to return the new version of the document
 Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
    .then(dbPizzaData => {
      if (!dbPizzaData) {
        res.status(404).json({ message: 'No pizza found with this id!' });
        return;
      }
      res.json(dbPizzaData);
    })
    .catch(err => res.json(err));
},

    // delete a pizza from the database when we make a request to DELETE /api/pizzas/:id
    // find one document to be returned and deleted from the DB
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    },

};




module.exports = pizzaController