import express from 'express';
import { ssr } from './ssr';

const PORT = process.env.CLIENT_PORT || 50021;
const app = express();

app.use('/', express.static('./dist/static'));

ssr(app);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
