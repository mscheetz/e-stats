import * as express from 'express';
import bodyParser from 'body-parser';
//import * as cors from 'cors';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as cron from 'node-cron';

//const bodyParser = require('body-parser');
//const cors = require('cors');
// const compression = require('compression');
// const helmet = require('helmet');
// const cron = require('node-cron');
// const app = express();
// const http = require('http');
// const server = http.createServer(app);

class App {
  public app;
  public port: number;

  constructor (controllers, port) {
    this.app = express()
    this.port = port;
    
    this.initializeMiddlewares();
    this.initControllers(controllers);
  }

  private initializeMiddlewares() {
      this.app.use(bodyParser);
      this.app.use(compression());
      this.app.use(helmet());
  }

  private initControllers(controllers) {
      controllers.forEach(controller => {
          this.app.use('/', controller.router);
      })
  }

  public listen() {
      this.app.listen(this.port, () => {
            console.log(`server is listening on ${this.port}`)
      })
  }
}

export default App;