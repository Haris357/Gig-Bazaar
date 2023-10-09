const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
      },
      receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
      },
      message: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      proposalId:{
        type:String,
        required: true,
      }
  });
const DevNoti = mongoose.model('DevNoti',notificationSchema);

module.exports = DevNoti;