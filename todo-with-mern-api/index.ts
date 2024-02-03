import "dotenv/config";
import express from "express";
import jwt from "jsonwebtoken";
import { connectDB } from "./db";
import { Models } from "./models";
import { auth } from "./utils";

const app = express();

// express.urlencoded({ extended: true })は、URLエンコードされたデータ（フォームから送信されたデータなど）を解析し、express.json()はJSON形式のデータを解析します
// HTMLフォームから送信されるデータ json形式で送る場合には不要
// app.use(express.urlencoded({ extended: true }));
// express.json()はJSON形式のデータを解析する。req.bodyを通じてリクエスト本文内のデータにアクセスできるようになります
app.use(express.json());

app.get("/items", auth, async (req, res) => {
  try {
    await connectDB();
    const items =
      (await Models.ItemModel.find({ email: req.body.email })) || [];
    return res.status(200).json({
      message: "アイテム読み取り成功",
      items,
    });
  } catch (error) {
    return res.status(500).json("アイテム読み取り失敗");
  }
});

app.post("/items/new", auth, async (req, res) => {
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

app.get("/items/:_id", auth, async ({ params: { _id } }, res) => {
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

app.put("/items/:_id/edit", auth, async ({ params: { _id }, body }, res) => {
  try {
    await connectDB();
    const findItem = await Models.ItemModel.findById({ _id });
    if (findItem?.email !== body.email) {
      throw new Error("権限がありません");
    }

    const updateItem = await Models.ItemModel.findByIdAndUpdate(
      {
        _id,
      },
      body,
      {
        new: true,
      },
    );

    if (!updateItem) {
      throw new Error("アイテムが見つかりません");
    }

    return res.status(200).json({
      message: "アイテム編集成功",
      item: updateItem,
    });
  } catch (error) {
    const isError = error instanceof Error;
    return res.status(500).json({
      message: isError ? error.message : "アイテム編集失敗",
    });
  }
});

app.delete(
  "/items/:_id/delete",
  auth,
  async ({ params: { _id }, body }, res) => {
    try {
      await connectDB();
      const findItem = await Models.ItemModel.findById({ _id });
      if (findItem?.email !== body.email) {
        throw new Error("権限がありません");
      }

      const item = await Models.ItemModel.findOneAndDelete({ _id });

      if (item === null) {
        throw new Error("アイテムが見つかりません");
      }

      return res.status(200).json({
        message: "アイテム削除成功",
      });
    } catch (error) {
      const isError = error instanceof Error;
      return res.status(500).json({
        message: isError ? error.message : "アイテム削除失敗",
      });
    }
  },
);

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
    const secret_key = process.env.SECRET_KEY!;
    const payload = {
      email,
    };
    const token = jwt.sign(payload, secret_key, { expiresIn: "24h" });
    return res.status(200).json({
      message: "ログイン成功",
      token,
    });
  } catch (error) {
    return res.status(400).json({
      message: typeof error === "string" ? error : "ログイン失敗",
    });
  }
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Listening on localhost port ${port}`);
});
