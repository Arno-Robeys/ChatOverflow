/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       required:
 *         - userid
 *         - message
 *         - time
 *         - messageid
 *         - chatid
 *
 *       properties:
 *         messageid:
 *           type: integer
 *           description: The autogenerated ID of the user.
 *         userid:
 *           type: integer
 *           description: The id of the user who sent the message.
 *         chatid:
 *           type: integer
 *           description: The id of the chat the message belongs to.
 *         message:
 *           type: string
 *           description: The content of the message.
 *         time:
 *           type: string
 *           description: The time the message was sent.
 *         read:
 *           type: string
 *           description: The status of the message.
 *
 */
import express from "express";
import messageService from "../service/message.service";
const router = express.Router();
import { pusherServer } from "../pusher"


/**
 * @swagger
 * tags:
 *  name: Messages
 *  description: The message managing API
 */

/**
 * @swagger
 * /message:
 *   get:
 *     summary: Returns all messages
 *     tags: [Messages]
 *     responses:
 *       200:
 *         description: A list of messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       500:
 *         description: Internal server error
 */

router.get("/", async (req, res) => {
    try {
        const messages = await messageService.getAllMessages();
        res.status(200).json(messages)
    } catch(error) {
        res.status(500).json({status: 'error', errorMessage: error.message})
    }
})

/**
 * @swagger
 * /message/chat/{chatid}:
 *   get:
 *     summary: Returns all messages from a chat
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: chatid
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       500:
 *         description: Internal server error
 */
router.get("/chat/:chatid", async (req, res) => {
    const chatid = req.params.chatid
    try {
        const messages = await messageService.getAllMessagesByChatId(chatid);
        res.status(200).json(messages)
    } catch(error) {
        res.status(500).json({status: 'error', errorMessage: error.message})
    }
})

/**
 * @swagger
 * /message/{messageid}:
 *   get:
 *     summary: Returns a message
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: messageid
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A message
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       500:
 *         description: Internal server error
 */
router.get("/:messageid", async (req, res) => {
    const messageid = req.params.messageid
    try {
        const messages = await messageService.getMessageById(messageid);
        res.status(200).json(messages)
    } catch(error) {
        res.status(500).json({status: 'error', errorMessage: error.message})
    }
})

/**
 * @swagger
 * /message/send:
 *   post:
 *     summary: Send a message
 *     tags: [Messages]
 *     requestBody:
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
 *               message:
 *                 type: string
 *                 example: Hey, how are you?
 *     responses:
 *       200:
 *         description: A message
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       500:
 *         description: Internal server error
 */
router.post("/send", async (req, res) => {
    const data = req.body
    try {
        const messages = await messageService.createMessage(data);
        pusherServer.trigger(`chat${data.chatid}`, "message", {
            message: messages.message,
            userid: messages.userid,
            time: messages.time,
            messageid: messages.messageid,
        });
        pusherServer.trigger(`updateChats${data.chatid}`, "message", "message sent")
        res.status(200).json(messages)
    } catch(error) {
        res.status(500).json({status: 'error', errorMessage: error.message})
    }
})

/**
 * @swagger
 * /message/update:
 *   put:
 *     summary: Updates a message
 *     tags: [Messages]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               messageid:
 *                 type: integer
 *                 example: 1
 *               message:
 *                 type: string
 *                 example: I'm fine, what about you?
 *     responses:
 *       200:
 *         description: A message
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       500:
 *         description: Internal server error
 */
router.put("/update", async (req, res) => {
    const {messageid , ...data} = req.body
    try {
        const messages = await messageService.updateMessage({id: messageid}, {data: data});
        res.status(200).json(messages)
    } catch(error) {
        res.status(500).json({status: 'error', errorMessage: error.message})
    }
})

/**
 * @swagger
 * /message/delete/{messageid}:
 *   delete:
 *     summary: Returns true if the message is deleted
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: messageid
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A message
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       500:
 *         description: Internal server error
 */
router.delete("/delete/:messageid", async (req, res) => {
    const messageid = req.params.messageid
    try {
        const messages = await messageService.deleteMessageById({id: messageid});
        res.status(200).json(messages)
    } catch(error) {
        res.status(500).json({status: 'error', errorMessage: error.message})
    }
})


export default router;