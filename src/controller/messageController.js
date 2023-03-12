const messageModel = require("../model/messageModel");
const commonHelper = require("../helper/common");

const messageController = {
  getMessage: async (req, res) => {
    try {
      const { id: receiver } = req.params;
      const { id: sender } = req.decoded;
      const { rows: messages } = await messageModel.getMessage(
        sender,
        receiver
      );
      commonHelper.response(res, messages, 201, "Get Messages success");
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = messageController;
