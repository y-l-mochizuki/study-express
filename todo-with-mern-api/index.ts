import express from "express";

const app = express();

// express.urlencoded({ extended: true })は、URLエンコードされたデータ（フォームから送信されたデータなど）を解析し、express.json()はJSON形式のデータを解析します
// HTMLフォームから送信されるデータ json形式で送る場合には不要
// app.use(express.urlencoded({ extended: true }));
// express.json()はJSON形式のデータを解析する。req.bodyを通じてリクエスト本文内のデータにアクセスできるようになります
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json("こんにちは");
});

app.post("/item/create", (req, res) => {
  console.log(req.body.title);
  return res.status(200).json("こんにちは");
});

app.listen(5001, () => {
  console.log("Listening on localhost port 5001");
});
