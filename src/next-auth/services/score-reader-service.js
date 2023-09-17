const HDR_RATE_LIMIT = "X-RateLimit-Limit",
  HDR_RATE_REMAINING = "X-RateLimit-Remaining",
  HDR_RATE_INSECONDS = "X-RateLimit-InSeconds";

export default {
  get: async (userlogin) => {
    const url = `${process.env.SCORE_READER_API}/${userlogin}`;

    let result = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    let resultData = null;
    if (result.status == 200) {
      resultData = await result.json();
    }

    return {
      statusText: result.statusText,
      data: resultData,
      rateLimit: result.headers.get(HDR_RATE_LIMIT),
      rateRemaining: result.headers.get(HDR_RATE_REMAINING),
      rateInSeconds: result.headers.get(HDR_RATE_INSECONDS),
    };
  },
};
