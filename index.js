const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';


// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    const arrozConBogavante = new Recipe ({ 
        title: 'Arroz con Bogavante',
        ingredients: ['arroz', 'bogavante'],
        cuisine: 'mediterranean',
        dishType: 'main_course',
        duration: 30,
      })
    arrozConBogavante.save()
    console.log(`The ${arrozConBogavante.title} recipe`)
  })

  .then(() => {
    return Recipe.insertMany(data)
  })

  .then(() => {
    console.log('Recipes: ${recipeSchema.title}') //Esto no me funciona, entiendo que tendré que hacer un ForEach en otro .then??
    return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration:100})
  })

  .then(() => {
    console.log('The Rigatoni alla Genovese Updated!')
    return Recipe.deleteOne({title: 'Carrot Cake'});
  })

  .then(() => {
    console.log('Carrot cake Deleted!')
    mongoose.disconnect()
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
