require('dotenv').config();
const connectDB = require('../config/db');
const Recipe = require('../models/Recipe');

const sample = [
  {
    name: "High Protein Paneer Tikka Bowl",
    ingredients: ["paneer", "curd", "tikka masala", "capsicum", "onion", "olive oil"],
    image: "https://images.unsplash.com/photo-1604908177522-040a9b3d718a?w=400&h=300&fit=crop",
    prepTime: "15 min",
    cookTime: "20 min",
    servings: 2,
    difficulty: "Medium",
    calories: 460,
    category: "veg",
    protein: "high",
    description: "Paneer tikka tossed with veggies and served over a salad for a high-protein Indian bowl.",
    instructions: ["Marinate paneer", "Grill paneer cubes", "Assemble the bowl", "Serve warm"],
    nutrition: { protein: "34", carbs: "22", fat: "20", fiber: "4" }
  },

  {
    name: "Chicken Tikka Meal Prep Box",
    ingredients: ["chicken breast", "yogurt", "tikka masala", "ginger garlic paste", "capsicum"],
    image: "https://images.unsplash.com/photo-1625937285636-bf3a9089c9e4?w=400&h=300&fit=crop",
    prepTime: "20 min",
    cookTime: "25 min",
    servings: 3,
    difficulty: "Medium",
    calories: 480,
    category: "non-veg",
    protein: "high",
    description: "Lean chicken tikka paired with sautéed peppers for a protein-rich meal prep option.",
    instructions: ["Marinate chicken", "Bake at 200°C", "Stir-fry veggies", "Assemble box"],
    nutrition: { protein: "46", carbs: "18", fat: "12", fiber: "3" }
  },

  {
    name: "Egg Masala Protein Scramble",
    ingredients: ["eggs", "onion", "green chilli", "tomato", "turmeric", "pepper"],
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop",
    prepTime: "5 min",
    cookTime: "10 min",
    servings: 1,
    difficulty: "Easy",
    calories: 320,
    category: "egg",
    protein: "high",
    description: "A spicy Indian-style scramble loaded with protein and flavor.",
    instructions: ["Sauté onions & chilli", "Add tomato & spices", "Scramble eggs", "Serve hot"],
    nutrition: { protein: "28", carbs: "8", fat: "20", fiber: "2" }
  },

  {
    name: "High Protein Chicken Biryani (Healthy)",
    ingredients: ["chicken breast", "basmati rice", "curd", "biryani masala", "mint", "onion"],
    image: "https://images.unsplash.com/photo-1600634967160-0e6c9fa6b8c5?w=400&h=300&fit=crop",
    prepTime: "25 min",
    cookTime: "35 min",
    servings: 3,
    difficulty: "Medium",
    calories: 520,
    category: "non-veg",
    protein: "high",
    description: "A lighter chicken biryani made using minimal oil and lean chicken breast.",
    instructions: ["Marinate chicken", "Cook rice", "Layer biryani", "Steam on low flame"],
    nutrition: { protein: "40", carbs: "58", fat: "10", fiber: "3" }
  },

  {
    name: "Protein Dosa (Moong Dal)",
    ingredients: ["moong dal", "water", "ginger", "salt", "cumin"],
    image: "https://images.unsplash.com/photo-1647577538028-4484a7c8fa5c?w=400&h=300&fit=crop",
    prepTime: "4 hours (soak)",
    cookTime: "15 min",
    servings: 3,
    difficulty: "Easy",
    calories: 290,
    category: "veg",
    protein: "high",
    description: "Protein-rich dosa made using moong dal instead of rice.",
    instructions: ["Soak dal", "Blend batter", "Cook dosa", "Serve with chutney"],
    nutrition: { protein: "22", carbs: "32", fat: "6", fiber: "4" }
  },

  {
    name: "High Protein Pav Bhaji",
    ingredients: ["vegetables", "paneer", "pav bhaji masala", "butter (low-fat)", "peas"],
    image: "https://images.unsplash.com/photo-1633933334920-581b9e8e5cec?w=400&h=300&fit=crop",
    prepTime: "15 min",
    cookTime: "20 min",
    servings: 2,
    difficulty: "Medium",
    calories: 420,
    category: "veg",
    protein: "medium",
    description: "A healthier pav bhaji with added paneer for an extra punch of protein.",
    instructions: ["Cook veggies", "Mash & add spices", "Add grated paneer", "Serve hot"],
    nutrition: { protein: "25", carbs: "48", fat: "14", fiber: "7" }
  },

  {
    name: "Chicken Shawarma Protein Wrap",
    ingredients: ["chicken breast", "whole wheat roti", "garlic sauce", "lettuce", "onion"],
    image: "https://images.unsplash.com/photo-1604908811927-097259c9a8c0?w=400&h=300&fit=crop",
    prepTime: "15 min",
    cookTime: "20 min",
    servings: 2,
    difficulty: "Medium",
    calories: 450,
    category: "non-veg",
    protein: "high",
    description: "A high-protein version of shawarma using whole wheat wraps and lean chicken.",
    instructions: ["Marinate chicken", "Grill strips", "Assemble wrap", "Toast lightly"],
    nutrition: { protein: "38", carbs: "40", fat: "9", fiber: "5" }
  },

  {
    name: "Paneer Bhurji (Protein Style)",
    ingredients: ["paneer", "onion", "tomato", "turmeric", "spices"],
    image: "https://images.unsplash.com/photo-1599021347286-42ab3689b6a1?w=400&h=300&fit=crop",
    prepTime: "10 min",
    cookTime: "10 min",
    servings: 2,
    difficulty: "Easy",
    calories: 380,
    category: "veg",
    protein: "high",
    description: "Fluffy paneer bhurji cooked with aromatic Indian spices and vegetables.",
    instructions: ["Sauté veggies", "Add spices", "Add crumbled paneer", "Cook 5 minutes"],
    nutrition: { protein: "32", carbs: "10", fat: "22", fiber: "3" }
  },

  {
    name: "Egg White Masala Omelette",
    ingredients: ["egg whites", "onion", "tomato", "green chilli", "pepper"],
    image: "https://images.unsplash.com/photo-1588167108293-eb7f6a3d3bc8?w=400&h=300&fit=crop",
    prepTime: "5 min",
    cookTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    calories: 210,
    category: "egg",
    protein: "high",
    description: "A fluffy egg white omelette cooked with Indian spices for a protein-packed breakfast.",
    instructions: ["Whisk whites", "Cook veggies", "Pour, cook & fold"],
    nutrition: { protein: "24", carbs: "4", fat: "6", fiber: "1" }
  },

  {
    name: "High Protein Chicken Pizza (Healthy)",
    ingredients: ["whole wheat base", "chicken breast", "low-fat cheese", "pizza sauce", "capsicum"],
    image: "https://images.unsplash.com/photo-1601924582971-df6a6b0ae8e9?w=400&h=300&fit=crop",
    prepTime: "15 min",
    cookTime: "20 min",
    servings: 2,
    difficulty: "Medium",
    calories: 540,
    category: "non-veg",
    protein: "high",
    description: "A healthier chicken pizza using whole wheat crust and lean toppings.",
    instructions: ["Prepare base", "Add toppings", "Bake for 20 minutes"],
    nutrition: { protein: "42", carbs: "60", fat: "14", fiber: "6" }
  },
  // Continuing from previous list

{
  name: "Low-Calorie Butter Chicken",
  ingredients: ["chicken breast", "tomato puree", "curd", "butter (low-fat)", "spices"],
  image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop",
  prepTime: "20 min",
  cookTime: "25 min",
  servings: 3,
  difficulty: "Medium",
  calories: 490,
  category: "non-veg",
  protein: "high",
  description: "A healthier take on butter chicken using low-fat ingredients but full of flavor.",
  instructions: ["Marinate chicken", "Cook tomato gravy", "Add chicken & simmer", "Serve hot"],
  nutrition: { protein: "38", carbs: "28", fat: "18", fiber: "3" }
},

{
  name: "Protein Idli (Rava + Moong Mix)",
  ingredients: ["rava", "moong dal", "curd", "salt", "eno"],
  image: "https://images.unsplash.com/photo-1630383249895-0781b5a8c069?w=400&h=300&fit=crop",
  prepTime: "10 min",
  cookTime: "15 min",
  servings: 3,
  difficulty: "Easy",
  calories: 260,
  category: "veg",
  protein: "high",
  description: "Soft idlis made using a high-protein moong dal and rava batter.",
  instructions: ["Blend dal", "Mix batter", "Steam for 12 minutes"],
  nutrition: { protein: "20", carbs: "38", fat: "3", fiber: "4" }
},

{
  name: "High Protein Chicken Roll",
  ingredients: ["whole wheat roti", "chicken breast", "onion", "mint chutney", "capsicum"],
  image: "https://images.unsplash.com/photo-1629189329480-19794b2074fa?w=400&h=300&fit=crop",
  prepTime: "15 min",
  cookTime: "20 min",
  servings: 2,
  difficulty: "Medium",
  calories: 430,
  category: "non-veg",
  protein: "high",
  description: "Mumbai-style chicken roll made healthier with whole wheat and lean chicken.",
  instructions: ["Cook chicken strips", "Warm roti", "Assemble roll", "Serve hot"],
  nutrition: { protein: "36", carbs: "42", fat: "10", fiber: "5" }
},

{
  name: "Paneer Tawa Pizza (High Protein)",
  ingredients: ["paneer", "whole wheat base", "cheese (low-fat)", "pizza sauce", "vegetables"],
  image: "https://images.unsplash.com/photo-1548366086-7fbcdde64f38?w=400&h=300&fit=crop",
  prepTime: "10 min",
  cookTime: "15 min",
  servings: 2,
  difficulty: "Easy",
  calories: 510,
  category: "veg",
  protein: "high",
  description: "A high-protein desi-style pizza loaded with paneer and veggies.",
  instructions: ["Prepare base", "Add paneer topping", "Cook on tawa", "Cut & serve"],
  nutrition: { protein: "34", carbs: "54", fat: "16", fiber: "6" }
},

{
  name: "Egg Keema Masala",
  ingredients: ["eggs", "onion", "tomato", "garam masala", "green peas"],
  image: "https://images.unsplash.com/photo-1627662164320-e0a4f113fb39?w=400&h=300&fit=crop",
  prepTime: "10 min",
  cookTime: "15 min",
  servings: 2,
  difficulty: "Easy",
  calories: 350,
  category: "egg",
  protein: "high",
  description: "A spicy and protein-rich keema-style dish made with grated boiled eggs.",
  instructions: ["Grate boiled eggs", "Prepare masala", "Mix eggs", "Cook for 5 minutes"],
  nutrition: { protein: "28", carbs: "14", fat: "18", fiber: "3" }
},

{
  name: "Healthy Chicken Burger (High Protein)",
  ingredients: ["chicken mince", "egg white", "whole wheat bun", "lettuce", "tomato"],
  image: "https://images.unsplash.com/photo-1611050690400-5e8b1d56c8dd?w=400&h=300&fit=crop",
  prepTime: "15 min",
  cookTime: "15 min",
  servings: 1,
  difficulty: "Medium",
  calories: 520,
  category: "non-veg",
  protein: "high",
  description: "A guilt-free high-protein burger made with lean chicken mince.",
  instructions: ["Form patty", "Pan fry", "Assemble burger", "Serve immediately"],
  nutrition: { protein: "40", carbs: "48", fat: "14", fiber: "4" }
},

{
  name: "Protein Samosa (Air-Fried)",
  ingredients: ["whole wheat flour", "paneer", "peas", "spices", "onion"],
  image: "https://images.unsplash.com/photo-1626082927389-a261a6b63b29?w=400&h=300&fit=crop",
  prepTime: "20 min",
  cookTime: "10 min",
  servings: 3,
  difficulty: "Medium",
  calories: 310,
  category: "veg",
  protein: "medium",
  description: "A protein-packed samosa made with paneer and air-fried for a healthy twist.",
  instructions: ["Prepare filling", "Shape samosa", "Air fry for 10 minutes"],
  nutrition: { protein: "16", carbs: "38", fat: "8", fiber: "4" }
},

{
  name: "Egg Fried Rice (Protein Upgrade)",
  ingredients: ["rice", "egg whites", "soy sauce", "peas", "carrots"],
  image: "https://images.unsplash.com/photo-1632179078496-288c7b1c2c2d?w=400&h=300&fit=crop",
  prepTime: "10 min",
  cookTime: "10 min",
  servings: 2,
  difficulty: "Easy",
  calories: 420,
  category: "egg",
  protein: "high",
  description: "A high-protein version of fried rice loaded with egg whites.",
  instructions: ["Cook rice", "Scramble egg whites", "Mix and stir fry"],
  nutrition: { protein: "26", carbs: "58", fat: "8", fiber: "3" }
},

{
  name: "Chicken Seekh Kebab (Healthy)",
  ingredients: ["chicken mince", "onion", "garam masala", "mint", "green chilli"],
  image: "https://images.unsplash.com/photo-1625938261182-93926ab4dd98?w=400&h=300&fit=crop",
  prepTime: "15 min",
  cookTime: "12 min",
  servings: 3,
  difficulty: "Medium",
  calories: 390,
  category: "non-veg",
  protein: "high",
  description: "Soft and juicy seekh kebabs made using lean chicken and minimal oil.",
  instructions: ["Mix ingredients", "Shape kebabs", "Grill for 12 minutes"],
  nutrition: { protein: "32", carbs: "10", fat: "16", fiber: "2" }
},

{
  name: "Protein Dal Tadka",
  ingredients: ["toor dal", "moong dal", "ghee (low-fat)", "garlic", "spices"],
  image: "https://images.unsplash.com/photo-1601050690597-1e78a3b9da29?w=400&h=300&fit=crop",
  prepTime: "10 min",
  cookTime: "15 min",
  servings: 2,
  difficulty: "Easy",
  calories: 300,
  category: "veg",
  protein: "high",
  description: "A protein-heavy dal made with a blend of toor and moong dal.",
  instructions: ["Pressure cook dal", "Prepare tadka", "Mix & simmer"],
  nutrition: { protein: "22", carbs: "38", fat: "4", fiber: "5" }
},
{
  name: "High Protein Chole (Kabuli Chana)",
  ingredients: ["kabuli chana", "tomato", "onion", "ginger garlic", "chole masala"],
  image: "https://images.unsplash.com/photo-1668236543091-a3316d0ca8ed?w=400&h=300&fit=crop",
  prepTime: "10 min",
  cookTime: "25 min",
  servings: 3,
  difficulty: "Medium",
  calories: 430,
  category: "veg",
  protein: "high",
  description: "A protein-dense version of chole using minimal oil and extra chickpeas.",
  instructions: ["Pressure cook chana", "Prepare masala", "Mix & simmer"],
  nutrition: { protein: "28", carbs: "56", fat: "6", fiber: "10" }
},

{
  name: "Grilled Chicken Tandoori Legs",
  ingredients: ["chicken legs", "yogurt", "tandoori masala", "lemon", "garlic"],
  image: "https://images.unsplash.com/photo-1604908554160-75de01ec78de?w=400&h=300&fit=crop",
  prepTime: "20 min",
  cookTime: "30 min",
  servings: 2,
  difficulty: "Medium",
  calories: 480,
  category: "non-veg",
  protein: "high",
  description: "Tandoori-style grilled chicken legs with a spicy yogurt marinade.",
  instructions: ["Marinate chicken", "Grill till charred", "Squeeze lemon & serve"],
  nutrition: { protein: "42", carbs: "10", fat: "22", fiber: "2" }
},

{
  name: "Masala Oats Protein Bowl",
  ingredients: ["oats", "vegetables", "paneer cubes", "spices", "water"],
  image: "https://images.unsplash.com/photo-1627369882641-a7ff7019b0ae?w=400&h=300&fit=crop",
  prepTime: "5 min",
  cookTime: "10 min",
  servings: 1,
  difficulty: "Easy",
  calories: 350,
  category: "veg",
  protein: "medium",
  description: "Savory masala oats enriched with paneer for added protein.",
  instructions: ["Cook veggies", "Add oats & water", "Add paneer", "Serve warm"],
  nutrition: { protein: "22", carbs: "45", fat: "8", fiber: "7" }
},

{
  name: "Chicken Bhuna (Low Oil)",
  ingredients: ["chicken breast", "onion", "tomato", "garam masala", "ginger garlic"],
  image: "https://images.unsplash.com/photo-1625937327083-e148fb2ba769?w=400&h=300&fit=crop",
  prepTime: "15 min",
  cookTime: "25 min",
  servings: 3,
  difficulty: "Medium",
  calories: 410,
  category: "non-veg",
  protein: "high",
  description: "A low-oil high-protein chicken bhuna packed with spices and flavor.",
  instructions: ["Sauté onions", "Add tomato & spices", "Cook chicken", "Simmer"],
  nutrition: { protein: "40", carbs: "12", fat: "14", fiber: "3" }
},

{
  name: "Spinach Egg White Omelette",
  ingredients: ["egg whites", "spinach", "onion", "pepper", "olive oil"],
  image: "https://images.unsplash.com/photo-1603048683970-751b673b30ba?w=400&h=300&fit=crop",
  prepTime: "5 min",
  cookTime: "5 min",
  servings: 1,
  difficulty: "Easy",
  calories: 200,
  category: "egg",
  protein: "high",
  description: "Light and fluffy omelette packed with protein and iron-rich spinach.",
  instructions: ["Whisk whites", "Cook spinach", "Pour mixture", "Fold & serve"],
  nutrition: { protein: "24", carbs: "4", fat: "6", fiber: "1" }
},

{
  name: "Healthy Paneer Makhani",
  ingredients: ["paneer", "tomato puree", "cashews", "milk", "masala"],
  image: "https://images.unsplash.com/photo-1626082927310-c58f575ec0f5?w=400&h=300&fit=crop",
  prepTime: "15 min",
  cookTime: "20 min",
  servings: 2,
  difficulty: "Medium",
  calories: 470,
  category: "veg",
  protein: "high",
  description: "A creamy yet healthy paneer makhani made with minimal butter and more protein.",
  instructions: ["Blend gravy", "Cook paneer", "Mix & simmer"],
  nutrition: { protein: "32", carbs: "30", fat: "18", fiber: "4" }
},

{
  name: "Tandoori Egg Skewers",
  ingredients: ["boiled eggs", "yogurt", "tandoori masala", "lemon", "onion"],
  image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop",
  prepTime: "10 min",
  cookTime: "10 min",
  servings: 2,
  difficulty: "Easy",
  calories: 300,
  category: "egg",
  protein: "high",
  description: "A unique skewer-style tandoori dish made using boiled eggs.",
  instructions: ["Cut eggs", "Coat in marinade", "Grill lightly", "Serve hot"],
  nutrition: { protein: "24", carbs: "6", fat: "14", fiber: "1" }
},

{
  name: "High Protein Rajma",
  ingredients: ["rajma", "tomato", "onion", "spices", "ginger garlic"],
  image: "https://images.unsplash.com/photo-1626082927338-3e456c772316?w=400&h=300&fit=crop",
  prepTime: "10 min",
  cookTime: "30 min",
  servings: 2,
  difficulty: "Medium",
  calories: 420,
  category: "veg",
  protein: "high",
  description: "A protein-rich rajma dish prepared with minimal oil and packed with fiber.",
  instructions: ["Boil rajma", "Prepare gravy", "Mix & simmer 10 min"],
  nutrition: { protein: "26", carbs: "58", fat: "6", fiber: "9" }
},

{
  name: "Chicken Kheema Fry",
  ingredients: ["chicken mince", "onion", "tomato", "spices", "green peas"],
  image: "https://images.unsplash.com/photo-1625937325065-3a8b9d4c22e1?w=400&h=300&fit=crop",
  prepTime: "10 min",
  cookTime: "20 min",
  servings: 3,
  difficulty: "Easy",
  calories: 460,
  category: "non-veg",
  protein: "high",
  description: "Protein-dense chicken kheema cooked with peas and spices.",
  instructions: ["Cook mince", "Add masala", "Add peas & simmer"],
  nutrition: { protein: "38", carbs: "18", fat: "20", fiber: "3" }
},

{
  name: "Protein Upma",
  ingredients: ["rava", "moong dal", "vegetables", "mustard seeds", "chilli"],
  image: "https://images.unsplash.com/photo-1630383249895-0781b5a8c069?w=400&h=300&fit=crop",
  prepTime: "10 min",
  cookTime: "12 min",
  servings: 2,
  difficulty: "Easy",
  calories: 300,
  category: "veg",
  protein: "medium",
  description: "Upma upgraded with moong dal for extra protein without changing the classic taste.",
  instructions: ["Roast rava", "Cook veggies", "Add dal & water", "Mix well"],
  nutrition: { protein: "18", carbs: "44", fat: "6", fiber: "4" }
},
{
  name: "High Protein Vegetable Pulao",
  ingredients: ["basmati rice", "soya chunks", "peas", "carrots", "spices"],
  image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=400&h=300&fit=crop",
  prepTime: "15 min",
  cookTime: "20 min",
  servings: 3,
  difficulty: "Easy",
  calories: 430,
  category: "veg",
  protein: "high",
  description: "A protein-rich pulao enhanced with soft soya chunks and aromatic spices.",
  instructions: ["Boil soya", "Sauté vegetables", "Add rice & cook", "Serve warm"],
  nutrition: { protein: "26", carbs: "62", fat: "6", fiber: "5" }
},

{
  name: "Tawa Chicken Breast (Low Oil)",
  ingredients: ["chicken breast", "turmeric", "red chilli", "ginger garlic", "lemon"],
  image: "https://images.unsplash.com/photo-1625937327010-c68a798edc2b?w=400&h=300&fit=crop",
  prepTime: "10 min",
  cookTime: "15 min",
  servings: 1,
  difficulty: "Easy",
  calories: 320,
  category: "non-veg",
  protein: "high",
  description: "Quick and healthy tawa-cooked chicken breast with Indian spices.",
  instructions: ["Marinate chicken", "Pan-sear each side", "Squeeze lemon & serve"],
  nutrition: { protein: "34", carbs: "2", fat: "10", fiber: "1" }
},

{
  name: "Egg Bhurji with Sprouts",
  ingredients: ["eggs", "onion", "tomato", "sprouts", "masala"],
  image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop",
  prepTime: "5 min",
  cookTime: "8 min",
  servings: 1,
  difficulty: "Easy",
  calories: 330,
  category: "egg",
  protein: "high",
  description: "Street-style bhurji enriched with sprouts for extra protein and crunch.",
  instructions: ["Cook veggies", "Add sprouts", "Add eggs & scramble"],
  nutrition: { protein: "26", carbs: "12", fat: "18", fiber: "3" }
},

{
  name: "Protein Paratha (Paneer + Moong)",
  ingredients: ["whole wheat flour", "paneer", "moong dal", "spices"],
  image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop",
  prepTime: "20 min",
  cookTime: "10 min",
  servings: 2,
  difficulty: "Medium",
  calories: 420,
  category: "veg",
  protein: "medium",
  description: "A paratha stuffed with a paneer–moong dal mix for a protein-packed breakfast.",
  instructions: ["Prepare stuffing", "Roll paratha", "Cook on tawa", "Serve hot"],
  nutrition: { protein: "22", carbs: "52", fat: "12", fiber: "5" }
},

{
  name: "Grilled Chicken Salad",
  ingredients: ["chicken breast", "lettuce", "cucumber", "tomato", "olive oil"],
  image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
  prepTime: "10 min",
  cookTime: "12 min",
  servings: 2,
  difficulty: "Easy",
  calories: 360,
  category: "non-veg",
  protein: "high",
  description: "A refreshing salad topped with lean grilled chicken breast.",
  instructions: ["Grill chicken", "Chop vegetables", "Assemble salad", "Serve chilled"],
  nutrition: { protein: "32", carbs: "10", fat: "14", fiber: "3" }
},

{
  name: "High Protein Poha (Soya + Veg)",
  ingredients: ["poha", "soya granules", "peas", "onion", "mustard seeds"],
  image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=400&h=300&fit=crop",
  prepTime: "10 min",
  cookTime: "8 min",
  servings: 2,
  difficulty: "Easy",
  calories: 300,
  category: "veg",
  protein: "medium",
  description: "A healthier poha prepared with protein-packed soya granules.",
  instructions: ["Hydrate soya", "Cook poha & veggies", "Mix well", "Serve hot"],
  nutrition: { protein: "20", carbs: "48", fat: "5", fiber: "4" }
},

{
  name: "Chicken Curry (Lean & Light)",
  ingredients: ["chicken breast", "onion", "tomato", "ginger garlic", "spices"],
  image: "https://images.unsplash.com/photo-1601050690597-1e78a3b9da29?w=400&h=300&fit=crop",
  prepTime: "15 min",
  cookTime: "20 min",
  servings: 3,
  difficulty: "Medium",
  calories: 410,
  category: "non-veg",
  protein: "high",
  description: "A classic Indian curry made with minimal oil and lean chicken.",
  instructions: ["Cook onions", "Add spices & tomato", "Add chicken & simmer"],
  nutrition: { protein: "38", carbs: "14", fat: "16", fiber: "3" }
},

{
  name: "Protein Khandvi",
  ingredients: ["besan", "curd", "water", "turmeric", "green chilli"],
  image: "https://images.unsplash.com/photo-1627369882641-a7ff7019b0ae?w=400&h=300&fit=crop",
  prepTime: "20 min",
  cookTime: "10 min",
  servings: 3,
  difficulty: "Medium",
  calories: 260,
  category: "veg",
  protein: "medium",
  description: "Soft Gujarati khandvi rolls made with a protein-rich besan base.",
  instructions: ["Cook batter", "Spread thin", "Roll tightly", "Temper & serve"],
  nutrition: { protein: "18", carbs: "32", fat: "5", fiber: "4" }
},

{
  name: "Egg Pepper Fry",
  ingredients: ["boiled eggs", "pepper", "onion", "curry leaves", "chilli flakes"],
  image: "https://images.unsplash.com/photo-1588167108293-eb7f6a3d3bc8?w=400&h=300&fit=crop",
  prepTime: "5 min",
  cookTime: "6 min",
  servings: 2,
  difficulty: "Easy",
  calories: 260,
  category: "egg",
  protein: "high",
  description: "A quick South Indian–style peppery egg fry packed with protein.",
  instructions: ["Slice eggs", "Sauté onions", "Add spices", "Mix eggs"],
  nutrition: { protein: "22", carbs: "6", fat: "14", fiber: "2" }
},

{
  name: "High Protein Vegetable Khichdi",
  ingredients: ["moong dal", "toor dal", "rice", "veggies", "spices"],
  image: "https://images.unsplash.com/photo-1626082927338-3e456c772316?w=400&h=300&fit=crop",
  prepTime: "10 min",
  cookTime: "20 min",
  servings: 2,
  difficulty: "Easy",
  calories: 390,
  category: "veg",
  protein: "high",
  description: "Comforting khichdi enriched with a dal blend for extra protein.",
  instructions: ["Wash dal & rice", "Pressure cook", "Add tadka & serve"],
  nutrition: { protein: "24", carbs: "52", fat: "6", fiber: "6" }
},
{
  name: "High Protein Chicken Tawa Fry",
  ingredients: ["chicken breast", "curd", "ginger garlic paste", "red chilli", "lemon"],
  image: "https://images.unsplash.com/photo-1625937327010-c68a798edc2b?w=400&h=300&fit=crop",
  prepTime: "15 min",
  cookTime: "12 min",
  servings: 2,
  difficulty: "Medium",
  calories: 390,
  category: "non-veg",
  protein: "high",
  description: "A spicy high-protein chicken tawa fry with minimal oil and maximum flavor.",
  instructions: ["Marinate chicken", "Cook on tawa", "Reduce marinade", "Serve hot"],
  nutrition: { protein: "36", carbs: "6", fat: "14", fiber: "1" }
},

{
  name: "Paneer Masala Gravy (Low Oil)",
  ingredients: ["paneer", "onion", "tomato", "ginger garlic", "garam masala"],
  image: "https://images.unsplash.com/photo-1626082927310-c58f575ec0f5?w=400&h=300&fit=crop",
  prepTime: "10 min",
  cookTime: "15 min",
  servings: 2,
  difficulty: "Easy",
  calories: 430,
  category: "veg",
  protein: "high",
  description: "A lighter paneer masala made with minimal butter and a creamy tomato gravy.",
  instructions: ["Cook onion base", "Add tomato", "Add paneer", "Simmer & serve"],
  nutrition: { protein: "32", carbs: "22", fat: "20", fiber: "4" }
},

{
  name: "Egg & Paneer Power Bowl",
  ingredients: ["boiled eggs", "paneer", "lettuce", "pepper", "olive oil"],
  image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop",
  prepTime: "8 min",
  cookTime: "3 min",
  servings: 1,
  difficulty: "Easy",
  calories: 350,
  category: "egg",
  protein: "high",
  description: "A nutrient-dense bowl combining paneer and eggs for a powerful protein boost.",
  instructions: ["Cube paneer", "Slice eggs", "Assemble bowl", "Dress lightly"],
  nutrition: { protein: "30", carbs: "8", fat: "20", fiber: "2" }
},

{
  name: "Soya & Veg Cutlets (Air-Fried)",
  ingredients: ["soya granules", "potato", "peas", "spices", "green chilli"],
  image: "https://images.unsplash.com/photo-1626082927389-a261a6b63b29?w=400&h=300&fit=crop",
  prepTime: "15 min",
  cookTime: "10 min",
  servings: 3,
  difficulty: "Easy",
  calories: 280,
  category: "veg",
  protein: "medium",
  description: "Golden air-fried cutlets enriched with protein-packed soya granules.",
  instructions: ["Mix dough", "Shape cutlets", "Air fry 10 min", "Serve hot"],
  nutrition: { protein: "16", carbs: "32", fat: "8", fiber: "4" }
},

{
  name: "High Protein Chicken Kofta",
  ingredients: ["chicken mince", "onion", "garam masala", "tomato puree", "egg white"],
  image: "https://images.unsplash.com/photo-1625937325065-3a8b9d4c22e1?w=400&h=300&fit=crop",
  prepTime: "20 min",
  cookTime: "25 min",
  servings: 3,
  difficulty: "Medium",
  calories: 520,
  category: "non-veg",
  protein: "high",
  description: "Juicy chicken koftas simmered in a low-oil gravy packed with flavor.",
  instructions: ["Form koftas", "Lightly fry", "Cook gravy", "Simmer koftas"],
  nutrition: { protein: "42", carbs: "20", fat: "18", fiber: "3" }
},

{
  name: "Chilli Paneer (High Protein)",
  ingredients: ["paneer", "capsicum", "soy sauce", "onion", "chilli flakes"],
  image: "https://images.unsplash.com/photo-1604908177522-040a9b3d718a?w=400&h=300&fit=crop",
  prepTime: "12 min",
  cookTime: "10 min",
  servings: 2,
  difficulty: "Easy",
  calories: 410,
  category: "veg",
  protein: "high",
  description: "A healthier chilli paneer stir fry made with high-protein paneer cubes.",
  instructions: ["Sauté veggies", "Add paneer", "Add sauces", "Stir fry"],
  nutrition: { protein: "30", carbs: "20", fat: "18", fiber: "3" }
},

{
  name: "Egg Curry (Light & High Protein)",
  ingredients: ["eggs", "onion", "tomato", "garam masala", "coriander"],
  image: "https://images.unsplash.com/photo-1588167108293-eb7f6a3d3bc8?w=400&h=300&fit=crop",
  prepTime: "10 min",
  cookTime: "15 min",
  servings: 2,
  difficulty: "Easy",
  calories: 340,
  category: "egg",
  protein: "high",
  description: "A lighter version of the classic egg curry using minimal oil.",
  instructions: ["Make gravy", "Add boiled eggs", "Simmer 5 minutes"],
  nutrition: { protein: "26", carbs: "12", fat: "16", fiber: "2" }
},

{
  name: "Protein Dhokla",
  ingredients: ["besan", "curd", "water", "eno", "green chilli"],
  image: "https://images.unsplash.com/photo-1627369882641-a7ff7019b0ae?w=400&h=300&fit=crop",
  prepTime: "10 min",
  cookTime: "10 min",
  servings: 3,
  difficulty: "Easy",
  calories: 260,
  category: "veg",
  protein: "medium",
  description: "A fluffy, steamed dhokla made with protein-rich besan.",
  instructions: ["Mix batter", "Steam 10 minutes", "Temper", "Serve"],
  nutrition: { protein: "16", carbs: "32", fat: "5", fiber: "3" }
},

{
  name: "Healthy Chicken Noodles (Protein Upgraded)",
  ingredients: ["whole wheat noodles", "chicken breast", "capsicum", "soy sauce", "spring onion"],
  image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop",
  prepTime: "10 min",
  cookTime: "12 min",
  servings: 2,
  difficulty: "Easy",
  calories: 480,
  category: "non-veg",
  protein: "high",
  description: "A desi-chinese chicken noodles recipe made healthier with whole wheat noodles.",
  instructions: ["Cook noodles", "Stir fry chicken", "Add veggies", "Mix & serve"],
  nutrition: { protein: "34", carbs: "58", fat: "10", fiber: "5" }
},

{
  name: "Paneer Fried Rice (High Protein)",
  ingredients: ["rice", "paneer", "peas", "soy sauce", "carrot"],
  image: "https://images.unsplash.com/photo-1632179078496-288c7b1c2c2d?w=400&h=300&fit=crop",
  prepTime: "10 min",
  cookTime: "10 min",
  servings: 2,
  difficulty: "Easy",
  calories: 420,
  category: "veg",
  protein: "high",
  description: "An Indian-Chinese style high protein fried rice with paneer.",
  instructions: ["Cook rice", "Sauté paneer", "Mix veggies & rice", "Serve hot"],
  nutrition: { protein: "28", carbs: "58", fat: "8", fiber: "4" }
}
];


const run = async () => {
  await connectDB();
  await Recipe.deleteMany({});
  await Recipe.insertMany(sample);
  console.log('Seeded recipes');
  process.exit(0);
};

run().catch(err => { console.error(err); process.exit(1); });
