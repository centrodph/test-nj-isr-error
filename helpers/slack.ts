export const sendNotification = async (text: string) => {
  if (!process.env.SLACK_WEBHOOK_URL) {
    throw new Error("Missing SLACK_WEBHOOK_URL env var");
  }
  await fetch(
    `https://hooks.slack.com/services/${process.env.SLACK_WEBHOOK_URL}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
      }),
    }
  );
};
