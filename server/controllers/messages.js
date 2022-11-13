import mongoose from "mongoose";
import { MessageBody, Channel, User, Icon } from "../models/messageBody.js";
import bcrypt from "bcrypt";

export const getChannels = async (req, res) => {
  try {
    const channels = await Channel.find();

    res.status(200).json(channels);
  } catch (err) {
    res.status(404).json(err);
  }
};

export const createChannel = async (req, res) => {
  const channel = req.body;

  const newChannel = new Channel(channel);

  try {
    await newChannel.save();

    res.status(201).json(newChannel);
  } catch (err) {
    res.status(409).json(err);
  }
};

export const getMessages = async (req, res) => {
  const channelId = req.params['channelId'];

  if (!mongoose.Types.ObjectId.isValid(channelId))
    return res.status(404).send("channel not found");

  try {
    const messageBodies = await MessageBody.where({ channel: channelId }).where({ replyToAnother: false });

    res.status(200).json(messageBodies);
  } catch (err) {
    res.status(404).json(err);
  }
};

export const createMessage = async (req, res) => {
  const channelId = req.params['channelId'];

  if (!mongoose.Types.ObjectId.isValid(channelId))
    return res.status(404).send("channel not found");

  const message = req.body;

  const messageWithChannelId = {
    ...message,
    channel: channelId,
  };

  const newMessage = new MessageBody(messageWithChannelId);

  try {
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (err) {
    res.status(409).json(err);
  }
};

export const updateChannel = async (req, res) => {
  const { channelId: _id } = req.params;
  const channel = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("channel not found");

  const updatedChannel = await Channel.findByIdAndUpdate(
    _id,
    { ...channel, _id },
    { new: true }
  );

  res.json(updatedChannel);
};

export const deleteChannel = async (req, res) => {
  const { channelId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(channelId))
    return res.status(404).send("channel not found");

  await Channel.findByIdAndRemove(channelId);

  res.json({ message: "channel deleted successfully" });
};

export const updateMessage = async (req, res) => {
  const { messageId: _id } = req.params;

  const message = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("message not found");

  const updatedMessage = await MessageBody.findByIdAndUpdate(
    _id,
    { ...message, _id },
    { new: true }
  );

  res.json(updatedMessage);
};

export const replyMessage = async (req, res) => {
  const channelId = req.params['channelId'];
  const messageId = req.params['messageId'];

  if (!mongoose.Types.ObjectId.isValid(channelId))
    return res.status(404).send("channel not found");

  if (!mongoose.Types.ObjectId.isValid(messageId))
    return res.status(404).send("message not found");
  
  const message = req.body;

  const messageWithChannelId = {
    ...message,
    channel: channelId,
  };

  const newMessage = new MessageBody(messageWithChannelId);

  let updatedMessage

  try {
    await newMessage.save().then(() => {
      const repliedMessageBody = MessageBody.findById(messageId);

      updatedMessage = MessageBody.findByIdAndUpdate(
      messageId,
      {
        repliedMessage: repliedMessageBody.repliedMessage.push(newMessage._id),
      },
      { new: true }
      );
    })

    res.status(201).json({
      createdMessage: newMessage,
      updatedMessage: updatedMessage,
    });
  } catch (err) {
    res.status(409).json(err);
  }
};

export const deleteMessage = async (req, res) => {
  const { messageId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(messageId))
    return res.status(404).send("message not found");

  await MessageBody.findByIdAndRemove(messageId);

  res.json({ message: "message deleted successfully" });
};

export const iconReply = async (req, res) => {
  const messageId = req.params['messageId'];

  const clickedIcon = req.body;

  if (!mongoose.Types.ObjectId.isValid(messageId))
    return res.status(404).send("message not found");

  const message = await MessageBody.findById(messageId);

  let updatedIcon;

  if (message.icon.includes({ iconType: clickedIcon })) {
    updatedIcon = message.icon.map((icon) => {
      if (icon.iconType === clickedIcon) icon.iconCount + 1;
    });
  } else {
    updatedIcon = message.icon.push({
      iconCount: 1,
      iconType: clickedIcon,
    });
  }

  const updatedMessage = await MessageBody.findByIdAndUpdate(
    messageId,
    {
      icon: updatedIcon,
    },
    { new: true }
  );

  res.json(updatedMessage);
};

export const createUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(409).json(err);
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if(!user) res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) res.status(400).json("wrong password")

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (err) {
    res.status(404).json(err);
  }
};

export const getUser = async (req, res) => {
  const { userId: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("user not found");

  try {
    const user = await User.findById(_id);

    res.status(200).json(user);
  } catch (err) {
    res.status(404).json(err);
  }
};

export const updateUser = async (req, res) => {
  const { userId: _id } = req.params;
  const user = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("user not found");

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { ...user, _id },
    { new: true }
  );

  res.json(updatedUser);
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(404).send("user not found");

  await User.findByIdAndRemove(userId);

  res.json({ message: "user deleted successfully" });
};