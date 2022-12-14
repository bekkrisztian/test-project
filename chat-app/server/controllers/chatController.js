const models = require("../models")
const { Op } = require("sequelize")
const { sequelize } = require("../models")
const User = models.User
const Chat = models.Chat
const ChatUser = models.ChatUser
const Message = models.Message

exports.chat = async (req, res) => {

    const user = await User.findOne({
        where: {
            id: req.user.id
        },
        include: [
            {
                model: Chat,
                include: [
                    {
                        model: User,
                        where: {
                            [Op.not]: {
                                id: req.user.id
                            }
                        }
                    },
                    {
                        model: Message,
                        include: [
                            {
                                model: User
                            }
                        ],
                        limit: 20,
                        order: [["id", "DESC"]]
                    }
                ]
            }
        ]
    })

    return res.json(user.Chats)
}

exports.create = async (req, res) => {

    const { partnerId } = req.body

    const t = await sequelize.transaction()

    try {

        const user = await User.findOne({
            where: {
                id: req.user.id
            },
            include: [
                {
                    model: Chat,
                    where: {
                        type: "dual"
                    },
                    include: [
                        {
                            model: ChatUser,
                            where: {
                                userId: partnerId
                            }
                        }
                    ]
                }
            ]
        })

        if (user && user.Chats.length > 0)
            return res.status(403).json({ status: "Error", message: "Chat with this user already exists!" })

        const chat = await Chat.create({ type: "dual" }, { transaction: t })

        await ChatUser.bulkCreate([
            {
                chatId: chat.id,
                userId: req.user.id
            },
            {
                chatId: chat.id,
                userId: partnerId
            }
        ], { transaction: t })


        await t.commit()

        const creator = await User.findOne({
            where: {
                id: req.user.id
            }
        })

        const partner = await User.findOne({
            where: {
                id: partnerId
            }
        })

        const forCreator = {
            id: chat.id,
            type: "dual",
            Users: [partner],
            Messages: []
        }

        const forReceiver = {
            id: chat.id,
            type: "dual",
            Users: [creator],
            Messages: []
        }


        return res.json([forCreator, forReceiver])

    } catch (e) {
        await t.rollback()
        return res.status(500).json({ status: "Error", message: e.message })
    }
}

exports.messages = async (req, res) => {

    const limit = 10
    const page = req.query.page || 1
    const offset = page > 1 ? page * limit : 0

    const messages = await Message.findAndCountAll({
        where: {
            chatId: req.query.id
        },
        include: [
            {
                model: User
            }
        ],
        limit,
        offset,
        order: [["id", "DESC"]]
    })

    const totalPages = Math.ceil(messages.count / limit)

    if (page > totalPages) return res.json({ data: { messages: [] } })

    const result = {
        messages: messages.rows,
        pagination: {
            page,
            totalPages
        }
    }

    return res.json(result)
}

exports.imageUpload = (req, res) => {
    if (req.file) {
        return res.json({ url: req.file.filename })
    }

    return res.status(500).json("No image uploaded")
}


exports.deleteChat = async (req, res) => {
    const { id } = req.params

    try {
        const chat = await Chat.findOne({
            where: {
                id
            },
            include: [
                {
                    model: User
                }
            ]
        })

        const notifyUsers = chat.Users.map(user => user.id)

        await chat.destroy()
        return res.json({ chatId: id, notifyUsers })

    } catch (e) {
        return res.status(500).json({ status: "Error", message: e.message })
    }
}