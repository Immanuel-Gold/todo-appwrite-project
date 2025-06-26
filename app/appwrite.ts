import { Client, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://fra.cloud.appwrite.io/v1") // Your Appwrite Endpoint
  .setProject("6844239c00096847d06a");

const databases = new Databases(client);

export { client };

export default databases;
