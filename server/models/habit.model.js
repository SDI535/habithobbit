const mongoose = require("mongoose");

const habitSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
    },
    frequency: [
      {
        repeat: { type: String },
        mon: { type: Boolean },
        tues: { type: Boolean },
        wed: { type: Boolean },
        thurs: { type: Boolean },
        fri: { type: Boolean },
        sat: { type: Boolean },
        sun: { type: Boolean },
      },
    ],
    endDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Habit", habitSchema);
