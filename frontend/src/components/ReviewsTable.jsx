import React from 'react';

const ReviewsTable = ({ reviews }) => {
  console.log(reviews)
  return(
  <table className="w-full bg-white rounded shadow-md">
    <thead>
      <tr>
        <th className="p-2 border">Date</th>
        <th className="p-2 border">User</th>
        <th className="p-2 border">Review</th>
        <th className="p-2 border">Rating</th>
        <th className="p-2 border">Category</th>
      </tr>
    </thead>
    <tbody>
      {reviews?.data?.map((review) => (
        <tr key={review.id}>
          <td className="p-2 border">{new Date(review.date).toLocaleDateString()}</td>
          <td className="p-2 border">{review.reviewBy}</td>
          <td className="p-2 border">{review.text}</td>
          <td className="p-2 border">{review.score}</td>
          <td className="p-2 border">{review.category}</td>
        </tr>
      ))}
    </tbody>
  </table>
)};

export default ReviewsTable;
