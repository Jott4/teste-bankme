import mongoose from "mongoose";

export default function connection() {
  mongoose.connect(
    "mongodb+srv://admin:admin@cluster0.gmi3k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
}
