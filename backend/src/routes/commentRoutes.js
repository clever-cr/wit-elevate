const express = require('express');
const {
  createComment,
  AllComments,
  deleteComment,
  updateComment,
} = require('../controllers/commentController');
const { verifyUserToken } = require('../middleware/verifyToken');

const router = express.Router();

router.post("/postComment/:blogId", verifyUserToken, createComment);
router.get("/comments/:blogId", AllComments);
router.delete("/comment/:id", verifyUserToken, deleteComment);
router.patch("/comment/:id", verifyUserToken, updateComment);

module.exports = router; 