/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstname
 *         - lastname
 *         - email
 *         - password
 *
 *       properties:
 *         userid:
 *           type: integer
 *           description: The autogenerated ID of the user.
 *         firstname:
 *           type: string
 *           description: The first name of the user.
 *         lastname:
 *           type: string
 *           description: The last name of the user.
 *         email:
 *           type: string
 *           description: The email of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *         nickname:
 *           type: string
 *           description: The nickname of the user.
 *
 *   parameters:
 *     userId:
 *       name: id
 *       in: path
 *       description: ID of the user to get or update
 *       required: true
 *       schema:
 *         type: integer
 *         format: int64
 *
 */
import express from "express";
import { User } from "../domain/model/user";
import userService from "../service/user.service";
const router = express.Router();


/**
 * @swagger
 * tags:
 *  name: Users
 *  description: The users managing API
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Returns all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */

router.get("/", async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users)
    } catch(error) {
        res.status(500).json({status: 'error', errorMessage: error.message})
    }
})

/**
* @swagger
 * /user/{id}:
 *   get:
 *     summary: Get user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: An user with given id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */
router.get("/:id", async (req, res) => {
    try {
        const user = (await userService.getUserById(req.params.id))
        res.status(200).json(user)
    } catch(error) {
        res.status(500).json({status: 'error', errorMessage: error.message})
    }
})

/**
* @swagger
 * /user/{id}/profile:
 *   get:
 *     summary: Get user and profile by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: An user and their profile with given id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */
router.get("/:id/profile", async (req, res) => {
    try {
        const userProfile = (await userService.getUserAndProfileById(req.params.id))
        res.status(200).json(userProfile)
    } catch(error) {
        res.status(500).json({status: 'error', errorMessage: error.message})
    }
})

/**
* @swagger
 * /user/find/{name}:
 *   get:
 *     summary: Get users with given name
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of users with given name
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */
router.get("/find/:name", async (req, res) => {
    try {
        const allUsers = (await userService.getAllUsersByName(req.params.name))
        res.status(200).json({status: "success", allUsers})
    } catch(error) {
        res.status(500).json({status: 'error', errorMessage: error.message})
    }
})

/**
 * @swagger
 * /user/registreer:
 *   post:
 *     summary: Let user register
 *     tags: [Users]
 *     requestBody:
 *       description: User details to create an account
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: John
 *               lastname:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: example@domain.com
 *               password:
 *                 type: string
 *                 example: secret
 *     responses:
 *       200:
 *         description: Returns created user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid argument
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 errorMessage:
 *                   type: string
 */

router.post("/registreer", async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    try {
        const user = await userService.createUser(new User({firstname, lastname, email, password}))
        res.status(200).json({status: "success", user})
    } catch(error) {
        res.status(400).json({status: 'error', errorMessage: error.message})
    }
})


/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Let user login
 *     tags: [Users]
 *     requestBody:
 *       description: User details to create an account
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: example@domain.com
 *               password:
 *                 type: string
 *                 example: secret
 *     responses:
 *       200:
 *         description: Returns user
 *         content:
 *           application/json:
 *             schema:
 *               type: User
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       403:
 *         description: Forbidden
 */
router.post("/login", async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    try {
        const user = await userService.loginUser(email, password)
        res.status(200).json({status: "success", user})
    } catch(error) {
        res.status(403).json({status: 'error', errorMessage: error.message})
    }
})

/**
 * @swagger
 * /user/update:
 *   put:
 *     summary: Let user update
 *     tags: [Users]
 *     requestBody:
 *       description: User updates their details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: integer
 *                 example: 1
 *               firstname:
 *                 type: string
 *                 example: Bert
 *               lastname:
 *                 type: string
 *                 example: Ernie
 *               nickname:
 *                 type: string
 *                 example: Bertie
 *               password:
 *                 type: string
 *                 example: secret
 *     responses:
 *       200:
 *         description: Returns updated user
 *         content:
 *           application/json:
 *             schema:
 *               type: User
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal Server Error
 */
router.put("/update", async (req, res) => {
    const {userid, ...changed} = req.body
    try {
        const updatedUser = await userService.updateUser({id: userid}, {data: changed})
        res.status(200).json({status: "success", updatedUser})
    } catch(error) {
        res.status(500).json({status: 'error', errorMessage: error.message || "Something went wrong"})
    }
})

/**
 * @swagger
 * /user/delete/{id}:
 *   delete:
 *     summary: Delete user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns deleted user
 *         content:
 *           application/json:
 *             schema:
 *               type: User
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal Server Error
 */
router.delete("/delete/:id", async (req, res) => {
    try {
        const deleteUser = await userService.deleteUserById({id: req.params.id})
        res.status(200).json({status: "success", deleteUser})
    } catch(error) {
        res.status(500).json({status: 'error', errorMessage: error.message})
    }

})



export default router