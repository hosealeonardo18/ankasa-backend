const pool = require("../config/db");

const messageModel = {
  newMessage: ({ sender, receiver, message }) => {
    return pool.query(
      `
        INSERT INTO chat (sender, receiver, message)
        VALUES ($1, $2, $3)        
        `,
      [sender, receiver, message]
    );
  },
  getMessage: (sender, receiver) => {
    return pool.query(
      `
        SELECT * FROM chat
        WHERE (sender = $1 AND receiver = $2)
        OR (sender = $3 AND receiver = $4)
        `,
      [sender, receiver, receiver, sender]
    );
  },
};

module.exports = messageModel;
