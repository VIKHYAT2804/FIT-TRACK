const Recipe = require('../models/Recipe');

exports.getRecipes = async (req, res) => {
  try {
    const { search, filter } = req.query;
    let query = {};

    if (search) {
      const terms = search
        .split(',')
        .map(t => t.trim())
        .filter(Boolean);

      if (terms.length > 0) {
        query.$or = [
          { name: { $regex: terms.join('|'), $options: 'i' } },
          { ingredients: { $in: terms.map(t => new RegExp(t, 'i')) } }
        ];
      }
    }
    if (filter) {
      switch (filter) {
        case 'veg':
          query.category = 'veg';
          break;
        case 'non-veg':
          query.category = 'non-veg';
          break;
        case 'high-protein':
          query.protein = 'high';
          break;
        case 'low-calorie':
          query.calories = { $lt: 400 };
          break;
      }
    }

    const recipes = await Recipe.find(query).limit(200);

    res.json(recipes);
  } catch (err) {
    console.error('Error fetching recipes:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json(recipe);
  } catch (err) {
    console.error('Error fetching single recipe:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
