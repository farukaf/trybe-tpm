const amqplib = require("amqplib");
const userFeedService = require("./user-feed-service")

const common_queue_options = { durable: true, noAck: true };
const common_exchange_options = { durable: false };
let connection;
let channel;

const consumeEvent = async (msg) => {
  let msgObj = JSON.parse(msg.content.toString());
  await userFeedService.process(msgObj);
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
  channel.bindQueue(process.env.QUEUE_NAME, process.env.EXCHANGE_NAME, "feed");

  channel.qos(1, false);

  channel.consume(process.env.QUEUE_NAME, consumeEvent);
})();

exports.start = function () {};
