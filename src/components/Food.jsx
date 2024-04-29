import { useState, useEffect } from 'react';
import FoodItem from './FoodItem.jsx';
import FeedbackButton from './FeedbackButton.jsx';
import FeedbackDialog from './FeedbackDialog.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Foods() {    
    const [loadedFoods, setLoadedFoods] = useState([]);
    //
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false); 

    useEffect(() => {
        async function fetchFoods() {

            const response = await fetch('https://bk6zghetl5.execute-api.us-east-1.amazonaws.com/prod/foods/all');            
            
            if(!response.ok) {
                console.error("Error fetching food data");
                return;
            }   
    
            const foods = await response.json();
            setLoadedFoods(foods);
        }

        fetchFoods();
    }, []);

    const handleOpenFeedback = () => {
        setIsFeedbackOpen(true);
    };
    // post feedback to api
    const handleFeedbackSubmit = async (feedbackData) => {

        const postData = {
            comment: feedbackData.comment,
            rating: parseInt(feedbackData.rating) 
        };
        
        const response = await fetch('http://getfeedbacksapp-zsa1p.eba-nigz8xzs.us-east-1.elasticbeanstalk.com/api/v1/feedbacks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(feedbackData),
        });

        if(response.ok) {
            const responseData = await response.json();
            // console.log('Thank you for your feedback', responseData);
            // alert('Thank you for your feedback. Your feedback ID is: ');
            toast.success('Thank you for your feedback.', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setIsFeedbackOpen(false); 
        } else {
            toast.error('Error', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };    

    return (
        <>
            <ToastContainer />
            <ul id="foods">
                {loadedFoods.map((food) => (                
                    <FoodItem key={food.id} food={food} />
                ))}
            </ul>            
            <FeedbackButton onOpenDialog={handleOpenFeedback} /> 
            <FeedbackDialog
                isOpen={isFeedbackOpen}
                onClose={() => setIsFeedbackOpen(false)}
                onSubmitFeedback={handleFeedbackSubmit}
            />
        </>
    );
}