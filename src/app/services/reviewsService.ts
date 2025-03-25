import axios from 'axios';

// Create a Review
export const createReview = async (beachId: any, rating: any, comment: any) => {
  try {
    const { data } = await axios.post('/api/reviews', {
      beachId,
      rating,
      comment,
    });
    console.log('Review created:', data);
    return data;
  } catch (error) {
  }
};

// Get Reviews by Beach
export const getReviewsByBeach = async (beachId: any) => {
  try {
    const { data } = await axios.get(`/api/reviews/beach/${beachId}`);
    console.log('Reviews for beach:', data);
    return data.reviews;
  } catch (error) {
  }
};

// Update a Review
export const updateReview = async (reviewId: any, rating: any, comment: any) => {
  try {
    const { data } = await axios.put(`/api/reviews/${reviewId}`, {
      rating,
      comment,
    });
    console.log('Review updated:', data);
    return data;
  } catch (error) {
  }
};

// Delete a Review
export const deleteReview = async (reviewId: any) => {
  try {
    const { data } = await axios.delete(`/api/reviews/${reviewId}`);
    console.log('Review deleted:', data);
    return data;
  } catch (error) {
  }
};

