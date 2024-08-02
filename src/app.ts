import express, { Request, Response } from 'express';

import logger from '@utils/logger';
import { StatusMsg } from '@utils/response'

const app = express();
const port = process.env.PORT || 8081;

app.use(express.json());

app.get('/agents', (req: Request, res: Response) => {
  logger.info("Initializing request to get customer's agents")

  return res.status(200).json({
    message: 'Agents"s response successful',
    result: [
      { id: 1, name: 'Nikolai' }
    ],
    status_code: 200,
    status_message: StatusMsg.SUCCESS
  })
});

app.listen(port, () => {
  logger.info(`Servidor escuchando en http://localhost:${port}`);
});
