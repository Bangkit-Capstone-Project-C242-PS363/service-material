export const generateCert = async (userName: string) => {
  try {
    const response = await fetch(
      "https://signmaster-certificate-kji5w4ybbq-et.a.run.app/generate-certificate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data["certificate_url"];
  } catch (error) {
    console.error("Error:", error);
    return "";
  }
};
