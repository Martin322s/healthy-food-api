const router = require('express').Router();
const authService = require('../services/authServices');
const { check, isEmail, equals } = require('express-validator');

router.post('/register', async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        imageUrl,
        secretWord,
        password,
        rePass } = req.body;

    try {
        if (!check(password).equals(rePass)) {
            return res.status(400).json({ message: 'Passwords do not match' });
        } else if (!check(email).isEmail()) {
            return res.status(400).json({ message: 'Email is not valid!' });
        } else {
            const result = await authService.registerUser({
                firstName,
                lastName,
                email,
                imageUrl,
                secretWord,
                password
            });

            if (typeof result === 'string') {
                throw result;
            } else {
                const token = await authService.generateToken({ _id: result._id });
                res.cookie('session', token);
                res.json({
                    _id: result._id,
                    email: result.email,
                    firstName: result.firstName,
                    lastName: result.lastName,
                    accessToken: token
                });
            };
        };
    } catch (err) {
        res.json(err);
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await authService.loginUser({ email, password });

        if (typeof user === 'string') {
            throw user;
        } else {
            const token = await authService.generateToken({ _id: user._id });
            res.cookie('session', token);
            res.json({
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                accessToken: token
            });
        };
    } catch (err) {
        res.json({ message: err });
    };
});

router.get('/logout', (req, res) => {
    if (req.headers['x-authorization']) {
        res.clearCookie('session');
        res.json();
    } else {
        res.status(401).json('Unauthorized - You don\'t have permissions to do that!');
    }
});

router.post('/email-test', async (req, res) => {
    const { email } = req.body;
    const user = await authService.getByEmail(email.email, email.secretWord);
    if (!user.message) {
        res.json(user[0]);
    } else {
        res.json(user);

    }
});

router.post('/reset', async (req, res) => {
    const { password, rePass, userId } = req.body;
    const user = await authService.getUser(userId);
    if (password === rePass) {
        await authService.resetPassword(userId, user, password);
        res.json({ message: "Password successfully reset!" });
    }
});

router.get('/:userId', async (req, res) => {
    const id = req.params.userId;
    const author = await authService.getUser(id);
    res.json(author);
});

router.post("/unsave/:userId", async (req, res) => {
    if (req.headers['x-authorization']) {
        let recipes = req.body;
        recipes = recipes.map(x => {
            return x._id;
        });
        const author = await authService.unsave(req.params.userId, recipes);
        const user = await authService.getUser(author._id);
        res.json(user.savedRecipes);
    } else {
        res.status(401).json('Unauthorized - You don\'t have permissions to do that!');
    }
});

router.delete("/delete/:userId", async (req, res) => {
    if (req.headers['x-authorization']) {
        const userId = req.params.userId;
        const user = await authService.deleteUser(userId);
        res.json(user);
    } else {
        res.status(401).json('Unauthorized - You don\'t have permissions to do that!');
    }
});

router.patch("/update/:userId", async (req, res) => {
    if (req.headers['x-authorization']) {
        const userId = req.params.userId;
        const newData = req.body;
        const user = await authService.getAuthor(userId)
        const updatedUser = await authService.updateUser(userId, Object.assign(user, newData));
        res.json(updatedUser);
    } else {
        res.status(401).json('Unauthorized - You don\'t have permissions to do that!');
    }
});
module.exports = router;