import { Client, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint(process.env.APPWRITE_ENDPOINT as string) // Your Appwrite Endpoint
  .setProject(process.env.APPWRITE_PROJECT_ID as string);

const databases = new Databases(client);

export { client };

export default databases;
