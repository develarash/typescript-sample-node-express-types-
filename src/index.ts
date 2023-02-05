import App from "./app";
import database from "./database";


// Starting the server
database();

const app = new App();
app.start();    