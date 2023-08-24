const mongoose = require('mongoose');
const { getAuthor } = require('../services/authServices');
const router = require('express').Router();
const recipeService = require('../services/recipeService');
const authService = require('../services/authServices');
const { getOne } = require('../services/recipeService');
const PDFDocument = require('pdfkit');

router.post('/create', async (req, res) => {
    const { title, category, imageUrl, ingredients, preparation, _ownerId } = req.body;

    if (req.headers['X-Authorization']) {
        try {
            if (title == "" || category == "" || imageUrl == "") {
                throw "All fields are required!";
            } else {
                const publication = await recipeService.createRecipe({
                    title,
                    category,
                    imageUrl,
                    ingredients,
                    preparation,
                    _ownerId
                });
                res.json(publication);
            }
        } catch (err) {
            res.json({ message: err });
        }
    } else {
        res.status(401).json('Unauthorized - You don\'t have permissions to do that!');
    }
});

router.get('/all', async (req, res) => {
    const recipes = await recipeService.getAll();
    res.json(recipes);
});

router.get('/:id', async (req, res) => {
    const recipeId = req.params.id;
    const recipe = await getOne(recipeId);
    res.json(recipe);
});

router.get('/profile/:ownerId', async (req, res) => {
    const _ownerId = mongoose.Types.ObjectId(req.params.ownerId);
    const recipes = await recipeService.getAll();
    const owned = recipes.filter(recipe => recipe._ownerId.toString() === _ownerId.toString());
    res.json(owned);
});

router.get('/author/:id', async (req, res) => {
    const userId = req.params.id;
    const author = await getAuthor(userId);
    res.json(author);
});

router.put('/edit/:id', async (req, res) => {
    if (req.headers['X-Authorization']) {
        const data = req.body;
        const recipeId = req.params.id;
        const editted = await recipeService.editRecipe(recipeId, data);
        res.json(editted);
    } else {
        res.status(401).json('Unauthorized - You don\'t have permissions to do that!');
    }
});

router.delete('/delete/:id', async (req, res) => {
    if (req.headers['X-Authorization']) {
        const recipeId = req.params.id;
        const deleted = await recipeService.deleteRecipe(recipeId);
        res.json(deleted);
    } else {
        res.status(401).json('Unauthorized - You don\'t have permissions to do that!');
    }
});

router.post('/save/:recipeId', async (req, res) => {
        const { userId } = req.body;
        const recipeId = req.params.recipeId;
        const recipe = await recipeService.getOne(recipeId);
        await authService.saveRecipe(userId, recipe);
        const author = await authService.getUser(userId);
        res.json(author.savedRecipes);
});

router.get('/save/:userId', async (req, res) => {
    const userId = req.params.userId;
    const author = await authService.getUser(userId);
    res.json(author.savedRecipes);
});

router.post('/download', (req, res) => {
        const data = req.body;
        const doc = new PDFDocument();
        const content = `${data.title}\n\nCategory: ${data.category}\n\nIngredients:\n${data.ingredients.join('\n')}\n\nPreparation:\n${data.preparation}`;
        doc.title = 'Recipe PDF';
        doc.text(content);
        res.setHeader('Content-Disposition', `attachment; filename=${data.title}.pdf`);
        res.setHeader('Content-Type', 'application/pdf');
        doc.pipe(res);
        doc.end();
});

router.post('/comments', async (req, res) => {
    const newComment = await recipeService.createComment(req.body);
    res.json(newComment);
});

router.get('/comments/:recipeId', async (req, res) => {
    const recipeId = req.params.recipeId;
    const comments = await recipeService.getAllComments(recipeId);
    res.json(comments);
});

module.exports = router;