import express, { Application, NextFunction, Request, Response } from 'express';
import { sequelize } from './database/sequelize';
import { PORT } from './const/appcfg';
import router from './routes/indexRoutes';
import cors from 'cors';

const app: Application = express();
app.use(cors());
function handleError(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    res.status(500).send({ message: err.message });
}

app.use(express.json());

app.use('/api', router);

app.use(handleError);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});