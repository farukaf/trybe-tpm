const amqplib = require("amqplib");

let connection;
let channel;

(async () => {
  connection = await amqplib.connect(process.env.RABBITMQ_CONNSTR);
  channel = await connection.createConfirmChannel();

  channel.assertExchange(process.env.EXCHANGE_NAME, "fanout", {
    durable: false,
  });
})();

exports.register = function (event) {
  channel?.publish(
    process.env.EXCHANGE_NAME,
    event.eventName,
    Buffer.from(JSON.stringify(event))
  );
};
