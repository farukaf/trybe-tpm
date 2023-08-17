const amqplib = require("amqplib");

const common_queue_options = { durable: true, noAck: true };
const common_exchange_options = { durable: false };
let connection;
let channel;

const consumeLogin = async (msg) => {
  let msgObj = JSON.parse(msg.content.toString());
  channel.ack(msg)
};

(async () => {
  connection = await amqplib.connect(process.env.RABBITMQ_CONNSTR);
  channel = await connection.createConfirmChannel();

  channel.assertExchange(
    process.env.EXCHANGE_NAME,
    "direct",
    common_exchange_options
  );
  channel.assertQueue(process.env.QUEUE_NAME, common_queue_options);
  channel.bindQueue(process.env.QUEUE_NAME, process.env.EXCHANGE_NAME, "login");

  channel.qos(1, false);

  //channel.consume(process.env.QUEUE_NAME, consumeLogin);
})();

exports.start = function () {};
