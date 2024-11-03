const mongoose = require('mongoose')

//const uri = process.env.URI

const connection = 'mongodb+srv://wesleyfbraga:zhw5Tiaa5iG41WP2@getapet.tzibk.mongodb.net/'

const config = {
    autoIndex: true,
    useNewUrlParser: true,
}

mongoose.connect(connection, config)
  .then(() => console.log('Conectou ao MongoDB com Mongoose!'))
  .catch(err => console.log('Error', err))


module.exports = mongoose