const amqplib = require("amqplib");

const common_exchange_options = { durable: false };
let connection;
let channel;

(async () => {
  console.log("Connecting to RabbitMQ " + process.env.RABBITMQ_CONNSTR);
  connection = await amqplib.connect(process.env.RABBITMQ_CONNSTR);
  channel = await connection.createConfirmChannel();

  channel.assertExchange(
    process.env.EXCHANGE_NAME,
    "direct",
    common_exchange_options
  );
})();

exports.register = function (event) {
  channel?.publish(
    process.env.EXCHANGE_NAME,
    event.eventName,
    Buffer.from(JSON.stringify(event))
  );
};
