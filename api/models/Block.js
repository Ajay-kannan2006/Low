const mongoose = require('mongoose');

const BlockSchema = new mongoose.Schema({
    user_id: { type: String, required: true }, // Link block to user
    block_name: { type: String, required: true },
    block_html: { type: String, required: true },
    block_css: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Block', BlockSchema);
