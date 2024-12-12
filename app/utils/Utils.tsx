export const maskUsername = (username: string) => {
  if (username.includes("@")) {
    // Email address
    const [localPart, domain] = username.split("@");
    if (localPart.length <= 3) return username;
    return (
      localPart.substring(0, 3) +
      "*".repeat(localPart.length - 3) +
      localPart[localPart.length - 1] +
      "@" +
      domain
    );
  } else {
    // Mobile number
    if (username.length <= 3) return username;
    return (
      username.substring(0, 3) +
      "*".repeat(username.length - 4) +
      username[username.length - 1]
    );
  }
};
