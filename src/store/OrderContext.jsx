import { createContext } from "react";

const OrderContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {}
});

function OrderContextProvider() {
    
}