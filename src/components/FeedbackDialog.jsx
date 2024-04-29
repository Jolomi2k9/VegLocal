import React, { useState } from 'react';

const FeedbackDialog = ({ isOpen, onClose, onSubmitFeedback }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const question = 'How satisfied are you with this website?';
    const [hoverRating, setHoverRating] = useState(null);

    const handleStarHover = (index) => {
      setHoverRating(index);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      const feedbackData = { rating, comment, question };
      await onSubmitFeedback(feedbackData);
      onClose(); // Close the dialog after submission
    };

    if (!isOpen) {
        return null;
    }

    // Star rating handler
    const handleStarClick = (index) => {
      setRating(index);
    };

    return (
      <div className="backdrop" onClick={onClose}>
            <div className="dialog" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                      <div>
                          <label>{question}</label>
                          <div className="star-rating">
                            {[...Array(5)].map((_, index) => (
                              <span key={index} onClick={() => handleStarClick(index + 1)}>
                                {rating > index ? '★' : '☆'}
                              </span>
                            ))}
                          </div>
                      </div>
                      <label>
                        <textarea 
                          placeholder="Comment (optional)"
                          value={comment} 
                          onChange={e => setComment(e.target.value)}
                        />
                      </label>
                      <button type="submit" className="submit-button">Submit Feedback</button>
                  </form>
                <button className="close-button" onClick={onClose}>Close</button>
            </div>
      </div>
    );
};

export default FeedbackDialog;
