import app from './app';

const port = process.env.BACKEND_PORT || 5000;

app.listen(port, () => {
  console.log(`Server has been started on ${port}`);
});
