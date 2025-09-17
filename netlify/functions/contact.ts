import type { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
  try {
    // forced error for demo showcase
    if (event.queryStringParameters?.forceError === "true") {
      console.error("Forced error triggered (showcase)");
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: "Forced error (demo)" }),
      };
    }

    const body = JSON.parse(event.body || "{}");
    console.log("Form submission:", body);

    // pretend processing
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error("Server error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: "Internal server error" }),
    };
  }
};
