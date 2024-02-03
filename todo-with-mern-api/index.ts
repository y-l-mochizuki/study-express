import express from "express";
import { connectDB } from "./db";
import { Models } from "./models";

const app = express();

// express.urlencoded({ extended: true })は、URLエンコードされたデータ（フォームから送信されたデータなど）を解析し、express.json()はJSON形式のデータを解析します
// HTMLフォームから送信されるデータ json形式で送る場合には不要
// app.use(express.urlencoded({ extended: true }));
// express.json()はJSON形式のデータを解析する。req.bodyを通じてリクエスト本文内のデータにアクセスできるようになります
app.use(express.json());

type ItemType = {
  title: string;
  image: string;
  price: string;
  description: string;
  email: string;
};

app.get("/items", async (_, res) => {
  try {
    await connectDB();
    const items = (await Models.ItemModel.find()) || [];
    return res.status(200).json({
      message: "アイテム読み取り成功",
      items,
    });
  } catch (error) {
    return res.status(500).json("アイテム読み取り失敗");
  }
});

app.post("/items/new", async (req, res) => {
  try {
    await connectDB();
    const item = (
      await Models.ItemModel.create(req.body, {
        new: true,
      })
    )[0];

    return res.status(200).json({
      message: "アイテム作成成功",
      item,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "アイテム作成失敗",
    });
  }
});

app.get("/items/:_id", async ({ params: { _id } }, res) => {
  try {
    await connectDB();
    const item = await Models.ItemModel.findById({
      _id,
    });
    return res.status(200).json({
      message: "アイテム読み取り成功",
      item,
    });
  } catch (error) {
    return res.status(500).json({
      message: "アイテム読み取り失敗",
    });
  }
});

app.put("/items/:_id/edit", async ({ params: { _id }, body }, res) => {
  try {
    await connectDB();
    const item = await Models.ItemModel.findByIdAndUpdate(
      {
        _id,
      },
      body,
      {
        new: true,
      },
    );
    return res.status(200).json({
      message: "アイテム編集成功",
      item,
    });
  } catch (error) {
    return res.status(500).json({
      message: "アイテム編集失敗",
    });
  }
});

app.delete("/items/:_id/delete", async ({ params: { _id } }, res) => {
  try {
    await connectDB();
    const item = await Models.ItemModel.findOneAndDelete({ _id });
    if (item === null) {
      throw "アイテムが見つかりません";
    }
    return res.status(200).json({
      message: "アイテム削除成功",
    });
  } catch (error) {
    return res.status(500).json({
      message: typeof error === "string" ? error : "アイテム削除失敗",
    });
  }
});

app.post("/register", async (req, res) => {
  try {
    await connectDB();
    await Models.UserModel.create(req.body);
    return res.status(200).json({
      message: "ユーザー登録成功",
    });
  } catch (error) {
    return res.status(400).json({
      message: "ユーザー登録失敗",
    });
  }
});

app.post("/login", async ({ body: { email, password } }, res) => {
  try {
    await connectDB();
    const userData = await Models.UserModel.findOne({
      email,
    });
    if (!userData) {
      throw "ログイン失敗: ユーザー登録をしてください。";
    }
    if (password !== userData.password) {
      throw "ログイン失敗: パスワードが違います。";
    }
    return res.status(200).json({
      message: "ログイン成功",
    });
  } catch (error) {
    return res.status(400).json({
      message: typeof error === "string" ? error : "ログイン失敗",
    });
  }
});

app.listen(5001, () => {
  console.log("Listening on localhost port 5001");
});
