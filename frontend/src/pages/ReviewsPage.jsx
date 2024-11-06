import React, { useState, useEffect } from "react";
import DatePicker from "../components/DatePicker";
import ReviewsTable from "../components/ReviewsTable";
import { fetchAllReviews, fetchReviews, fetchSummary } from "../services/api";

const ReviewsPage = () => {
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState("");
  const [reviews, setReviews] = useState([]);
  const [weeklySummary, setWeeklySummary] = useState(null);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [reviewsError, setReviewsError] = useState(null);
  const [summaryError, setSummaryError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // format YYYY-MM-dD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const login = localStorage.getItem("auth");
    setIsLoggedIn(!!login);
    if (login) {
      const fetchReviewsData = async () => {
        setReviewsLoading(true);
        setReviewsError(null);
        try {
          const fetchedReviews = await fetchAllReviews();
          setReviews(fetchedReviews);
        } catch (error) {
          setReviewsError("Could not load reviews. Please try again later.");
        } finally {
          setReviewsLoading(false);
        }
      };
      fetchReviewsData();
    }
  }, []);
  
  const fetchWeeklySummaryData = async () => {
    setSummaryLoading(true);
    setSummaryError(null);
    try {
      const formattedDate = formatDate(date);
      const fetchedSummary = await fetchSummary(formattedDate);
      setWeeklySummary(fetchedSummary[0]["summary"]);
    } catch (error) {
      setSummaryError("Could not load weekly summary.");
    } finally {
      setSummaryLoading(false);
    }
  };

  useEffect(() => {
    fetchWeeklySummaryData();
  }, []);

  const handleSearch = async () => {
    setReviewsLoading(true);
    setReviewsError(null);
    try {
      const formattedDate = formatDate(date);
      const fetchedReviews = await fetchReviews(formattedDate, category);
      await fetchWeeklySummaryData();
      setReviews(fetchedReviews);
    } catch (error) {
      setReviewsError("Could not load reviews. Please try again later.");
    } finally {
      setReviewsLoading(false);
    }
  };

  const renderReviewsContent = () => {
    if (reviewsLoading) return <p>Loading reviews...</p>;
    if (reviewsError || !reviews) return <p>{reviewsError}</p>;
    if (reviews?.data?.length === 0)
      return <p>No reviews found for the date - {formatDate(date)}</p>;
    return <ReviewsTable reviews={reviews} />;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reviews</h1>
      {isLoggedIn ? (
        <>
        
          <div className="flex gap-4 items-center">
          <DatePicker selectedDate={date} onDateChange={setDate} />

          {/* category Dropdown */}
          <div className="flex gap-2 items-center">
            <label className=" text-sm font-medium">Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="">All</option>
              <option value="Bugs">Bugs</option>
              <option value="Complaints">Complaints</option>
              <option value="Crashes">Crashes</option>
              <option value="Praises">Praises</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>
          <hr />

          <div className="my-4">
            <h2 className="text-xl font-semibold">Day Summary</h2>
            {summaryLoading ? (
              <p>Loading summary...</p>
            ) : summaryError ? (
              <p>{summaryError}</p>
            ) : (
              <div>{weeklySummary}</div>
            )}
          </div>

          <hr />

          <h2 className="text-xl my-6">Reviews</h2>
          {renderReviewsContent()}
        </>
      ) : (
        <p>Please login to continue</p>
      )}
    </div>
  );
};

export default ReviewsPage;
