function sanitizeReview(review) {
    
    const sanitizedReview = {
        reviewBy: review.userName,
        reviewId: review.id,
        userImage: review.userImage || null,
        date: new Date(review.date).toISOString(),
        score: review.score,
        text: review.text || "",
        replyDate: review.replyDate ? new Date(review.replyDate).toISOString() : null,
        replyText: review.replyText || "",
        version: review.version || "unknown",
        evaluated: false,
        thumbsUp: typeof review.thumbsUp === 'number' ? review.thumbsUp : 0,
    };

    return sanitizedReview;
}

module.exports = {
    sanitizeReview: sanitizeReview
}