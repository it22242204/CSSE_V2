import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecycleService.css';
import cloth from './assets/cloth.jpg';
import glass from './assets/glass.jpg';
import metal from './assets/metal.jpg';
import organic from './assets/organic.jpg';
import paper from './assets/paper.jpg';
import plastic from './assets/plastic.jpg';
import { format } from 'date-fns';
import Footer from '../../Footer/Footer';
import AfterNav from '../Home/NavBar/AfterNav';

const RecycleService = () => {
  const [wasteTypes, setWasteTypes] = useState([
    { name: 'Cardboard', image: paper, price: 54, quantity: 0 },
    { name: 'Plastic cans', image: plastic, price: 98, quantity: 0 },
    { name: 'Metal', image: metal, price: 124, quantity: 0 },
    { name: 'Glass', image: glass, price: 72, quantity: 0 },
    { name: 'Cloth', image: cloth, price: 33, quantity: 0 },
    { name: 'Organic Waste', image: organic, price: 20, quantity: 0 },
  ]);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleQuantityChange = (name, change) => {
    setWasteTypes((prev) =>
      prev.map((waste) =>
        waste.name === name
          ? { ...waste, quantity: Math.max(0, waste.quantity + change) }
          : waste
      )
    );
  };

  const handleAdd = (name) => {
    const selectedWaste = wasteTypes.find((waste) => waste.name === name);

    if (selectedWaste.quantity > 0) {
      const storedWaste = JSON.parse(localStorage.getItem('selectedWaste')) || [];

      const updatedWaste = {
        name: selectedWaste.name,
        pricePerKg: selectedWaste.price,
        quantity: selectedWaste.quantity,
      };

      storedWaste.push(updatedWaste);
      localStorage.setItem('selectedWaste', JSON.stringify(storedWaste));
      alert(`${selectedWaste.name} added successfully!`);

      setWasteTypes((prev) =>
        prev.map((waste) =>
          waste.name === name ? { ...waste, quantity: 0 } : waste
        )
      );
    } else {
      alert('Please enter a valid weight.');
    }
  };

  const handleConfirmOrder = () => {
    const selectedWasteDetails = JSON.parse(localStorage.getItem('selectedWaste')) || [];

    if (selectedWasteDetails.length > 0) {
      const orderDate = new Date();
      const formattedDate = format(orderDate, 'yyyy-MM-dd HH:mm:ss');

      const newOrder = { date: formattedDate, wasteDetails: selectedWasteDetails };
      const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
      localStorage.setItem('orderHistory', JSON.stringify([...orderHistory, newOrder]));

      localStorage.removeItem('selectedWaste');

      setWasteTypes((prev) => prev.map((waste) => ({ ...waste, quantity: 0 })));

      navigate('/summary', { state: { wasteDetails: selectedWasteDetails } });
    } else {
      alert('Please select at least one waste type with a quantity greater than zero.');
    }
  };

  const handleNext = () => {
    setLoading(true);

    const selectedWasteDetails = JSON.parse(localStorage.getItem('selectedWaste')) || [];

    if (selectedWasteDetails.length > 0) {
      handleConfirmOrder();
    } else {
      alert('Please select at least one waste type with a quantity greater than zero.');
    }

    setLoading(false);
  };

  return (
    <>
    <AfterNav></AfterNav>
    <div className="recycle-page">
      <h1>Recycle Management Unit</h1>
      <div className="columns">
        <div className="column">
          {wasteTypes.slice(0, 3).map((waste) => (
            <div className="waste-card" key={waste.name}>
              <h2>{waste.name}</h2>
              <img
                src={waste.image}
                alt={waste.name}
                style={{ width: '100%', maxWidth: '300px', height: 'auto', borderRadius: '20px' }}
              />
              <p>Rs {waste.price}/kg</p>
              <div className="quantity-control">
                <button onClick={() => handleQuantityChange(waste.name, -1)}>-</button>
                <span>{waste.quantity}</span>
                <button onClick={() => handleQuantityChange(waste.name, 1)}>+</button>
              </div>
              <button className="ashaadd" onClick={() => handleAdd(waste.name)}>
                Add
              </button>
            </div>
          ))}
        </div>

        <div className="column">
          {wasteTypes.slice(3).map((waste) => (
            <div className="waste-card" key={waste.name}>
              <h2>{waste.name}</h2>
              <img
                src={waste.image}
                alt={waste.name}
                style={{ width: '100%', maxWidth: '300px', height: 'auto', borderRadius: '20px' }}
              />
              <p>Rs {waste.price}/kg</p>
              <div className="quantity-control">
                <button onClick={() => handleQuantityChange(waste.name, -1)}>-</button>
                <span>{waste.quantity}</span>
                <button onClick={() => handleQuantityChange(waste.name, 1)}>+</button>
              </div>
              <button className="ashaadd" onClick={() => handleAdd(waste.name)}>
                Add
              </button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        <button className="next-button" onClick={handleNext}>
          {loading ? 'Fetching...' : 'Next'}
        </button>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default RecycleService;
