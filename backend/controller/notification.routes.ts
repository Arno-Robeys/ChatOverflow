/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       required:
 *         - userid
 *         - messageid
 *         - time
 *         - chatid
 *
 *       properties:
 *         notificationid:
 *           type: integer
 *           description: The autogenerated ID of the user.
 *         userid:
 *           type: integer
 *           description: The id of the user who sent the message.
 *         chatid:
 *           type: integer
 *           description: The id of the chat the message belongs to.
 *         messageid:
 *           type: integer
 *           description: The id of the message.
 *         time:
 *           type: string
 *           description: The time the message was sent.
 *
 */
import express from "express";
import { Notification } from "../domain/model/notification";
import notificationService from "../service/notification.service";
import { pusherServer } from "../pusher";
const router = express.Router();


/**
 * @swagger
 * tags:
 *  name: Notifications
 *  description: The notification managing API
 */

/**
 * @swagger
 * /notification:
 *   get:
 *     summary: Returns all notifications
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: A list of notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 *       500:
 *         description: Internal server error
 */

router.get("/", async (req, res) => {
    try {
        const notification = await notificationService.getAllNotifications();
        res.status(200).json(notification)
    } catch(error) {
        res.status(500).json({status: 'error', errorMessage: error.message})
    }
})

/**
 * @swagger
 * /notification/user/{id}:
 *   get:
 *     summary: Returns all notifications of user
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of notifications of user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 *       500:
 *         description: Internal server error
 */
router.get("/user/:id", async (req, res) => {
    try {
        const notifications = await notificationService.getAllNotificationsByUserId(req.params.id);
        res.status(200).json(notifications)
        } catch(error) {
            res.status(500).json({status: 'error', errorMessage: error.message})
        }
})

/**
 * @swagger
 * /notification/createnotification:
 *   post:
 *     summary: Create notification
 *     tags: [Notifications]
 *     requestBody:
 *       description: a new notification is created
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: integer
 *                 example: 1
 *               chatid:
 *                 type: integer
 *                 example: 1
 *               messageid:
 *                 type: integer
 *                 example: 1
 * 
 *     responses:
 *       200:
 *         description: Returns created notification
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 *       500:
 *         description: Internal server error
 */
router.post("/createnotification", async (req, res) => {
    try{
        const notification = new Notification(req.body);
        const newNotification = await notificationService.createNotification(notification);
        pusherServer.trigger(`notification-${req.body.userid}`, 'notification', "new notification");
        res.status(200).json(newNotification);
    } catch(error) {
        res.status(500).json({status: 'error', errorMessage: error.message})
    }
})

/**
 * @swagger
 * /notification/read/{userid}:
 *   put:
 *     summary: Update notification as read
 *     tags: 
 *       - Notifications
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns updated notification
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 *       500:
 *         description: Internal server error
 */ 

router.put("/read/:userid", async (req, res) => {
    try {
        const updatedNotification = await notificationService.updateNotificationByUserId(req.params.userid);
        pusherServer.trigger(`notification-${req.params.userid}`, 'notification', "notification read");
        res.status(200).json(updatedNotification)
        } catch(error) {
            res.status(500).json({status: 'error', errorMessage: error.message})
        }
})

/**
 * @swagger
 * /notification/delete/{id}:
 *   delete:
 *     summary: Returns if notification has been deleted
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: delete notification by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 *       500:
 *         description: Internal server error
 */
router.delete("/delete/:id", async (req, res) => {
    try {
        const deletedNotification = await notificationService.deleteNotificationById(req.params.id);
        res.status(200).json(deletedNotification)
        } catch(error) {
            res.status(500).json({status: 'error', errorMessage: error.message})
        }
})


export default router;