/**
 * @swagger
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       required:
 *         - userid
 *
 *       properties:
 *         userid:
 *           type: integer
 *           description: The autogenerated ID of the user.
 *         description:
 *           type: string
 *           description: The description of the user.
 *         avatar:
 *           type: string
 *           description: The avatar of the user.
 *         work:
 *           type: string
 *           description: The work of the user.
 *         hobby:
 *           type: string
 *           description: The hobby of the user.
 *         rating:
 *           type: string
 *           description: The rating of the user.
 *         education:
 *           type: string
 *           description: The education of the user.
 *         tags:
 *           type: string
 *           description: The tags of the user.
 *
 */
import express from "express";
import { Profile } from "../domain/model/profile";
import profileService from "../service/profile.service";
const router = express.Router();


/**
 * @swagger
 * tags:
 *  name: Profiles
 *  description: The profile managing API
 */

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Returns all profiles
 *     tags: [Profiles]
 *     responses:
 *       200:
 *         description: A list of profiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profile'
 *       500:
 *         description: Internal server error
 */

router.get("/", async (req, res) => {
    try {
        const profiles = await profileService.getAllProfiles();
        res.status(200).json(profiles)
    } catch(error) {
        res.status(500).json({status: 'error', errorMessage: error.message})
    }
})

/**
 * @swagger
 * /profile/{id}:
 *   get:
 *     summary: Returns profile by id
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: profile by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profile'
 *       500:
 *         description: Internal server error
 */
router.get("/:id", async (req, res) => {
    try {
        const profile = await profileService.getProfileById({id: req.params.id});
        res.status(200).json(profile)
    } catch(error) {
        res.status(500).json({status: 'error', errorMessage: error.message})
    }
})

/**
 * @swagger
 * /profile/createprofile:
 *   post:
 *     summary: Create profile
 *     tags: [Profiles]
 *     requestBody:
 *       description: User create their profile
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Returns created profile
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profile'
 *       500:
 *         description: Internal server error
 */
router.post("/createprofile", async (req, res) => {
    try {
        const profile = new Profile(req.body);
        const newProfile = await profileService.createProfile(profile);
        res.status(200).json(newProfile)
    } catch(error) {
        res.status(500).json({status: 'error', errorMessage: error.message})
    }
})

/**
 * @swagger
 * /profile/update:
 *   put:
 *     summary: Update Profile
 *     tags: [Profiles]
 *     requestBody:
 *       description: User updates their profile information
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: integer
 *                 example: 1
 *               description:
 *                 type: string
 *                 example: I'm bert
 *               avatar:
 *                 type: string
 *                 example: AvatarBert
 *               work:
 *                 type: string
 *                 example: Bert's work
 *               hobby:
 *                 type: string
 *                 example: Basketball
 *               rating:
 *                 type: string
 *                 example: 5
 *               education:
 *                 type: string
 *                 example: Bert's education
 *               tags:
 *                 type: string
 *                 example: Bert's tags
 *     responses:
 *       200:
 *         description: Returns updated profile
 *         content:
 *           application/json:
 *             schema:
 *               type: User
 *               items:
 *                 $ref: '#/components/schemas/Profile'
 *       500:
 *         description: Internal Server Error
 */
router.put("/update", async (req, res) => {
    const {userid, ...rest} = req.body;
    try {
        const profile = await profileService.updateProfile({id: userid}, {data: rest});
        res.status(200).json(profile)
    } catch(error) {
        res.status(500).json({status: 'error', errorMessage: error.message})
    }
})

/**
 * @swagger
 * /profile/delete/{id}:
 *   delete:
 *     summary: Returns if profile has been deleted
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: delete profile by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profile'
 *       500:
 *         description: Internal server error
 */
router.delete("/delete/:id", async (req, res) => {
    try {
        const profile = await profileService.deleteProfileById({id: req.params.id});
        res.status(200).json(profile)
    } catch(error) {
        res.status(500).json({status: 'error', errorMessage: error.message})
    }
})



export default router