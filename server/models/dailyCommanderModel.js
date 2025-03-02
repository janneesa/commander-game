const mongoose = require("mongoose");

const dailyCommander = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    colors: { type: [String], required: false },
    card_type: { type: [String], required: false },
    type_line: { type: [String], required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("DailyCommander", dailyCommander);
