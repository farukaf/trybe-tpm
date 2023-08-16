export default {
  register: async (user, eventName) => {
    const event = {
      user,
      eventName,
      timestamp: new Date().getTime(),
    };

    await fetch(process.env.EVENT_API, {
      method: "POST",
      body: JSON.stringify(event),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  },
};
