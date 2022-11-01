export default {
  name: "ready",
  once: true,
  run(client) {
    console.log("Successfully logged in as " + client.user.tag);
  },
};
