import Button from './UI/Button.jsx';

export default function FoodItem({food}) {
    // Function to create JSX elements for each nutrient
    const renderNutrients = (nutrients) => {
        return Object.entries(nutrients).map(([key, value]) => (
            <p key={key} className="food-item-nutrient">{`${key}: ${value}`}</p>
        ));
    };

    return (
        <li className="food-item">
            <article>
                <img src={food.image} alt={food.foodName} />
                <div>
                    <h3>{food.foodName}</h3>
                    <p className="food-item-price">{food.category}</p>
                    <div className="food-item-description">
                        {renderNutrients(food.nutrients)}
                    </div>
                    {/* <p className="food-item-description">{food.nutrients}</p> */}
                </div>

                <p className="food-item-actions">
                    {/* <Button>Details</Button>  */}
                </p>               
            
            </article>
        </li>
    );
}