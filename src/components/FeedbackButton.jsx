// FeedbackButton.jsx
const FeedbackButton = ({ onOpenDialog }) => {
    return (
      <button
        style={{ position: 'fixed', bottom: '10px', right: '10px' }}
        onClick={onOpenDialog}
      >
         Feedback
      </button>
    );
  };
  export default FeedbackButton;


