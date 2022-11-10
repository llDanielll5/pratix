import express from "express";

const app = express();
const port = 3000;

const publishableKey =
  "pk_test_51M0F3JJa035AVNUnRheBKqci12Ke9ON4LEZfN0LE8h5E0CDTmbMqP4ZrcUnzWWu5N4iO4BWTQtBY9cMTI7NBXhUi00It8JzIRO";
const secretKey =
  "sk_test_51M0F3JJa035AVNUnWQfeLNdqxkSimo7r3ov1A8Vy14JifeZCAsKakFAHXeXw0jn15y5T9w8IsY50Ly9Un7wNM6i900CqZuuiEF";

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
