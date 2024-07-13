import foods from './foods.json';
import { Row, Divider, Button } from 'antd';
import FoodItem from './components/FoodItem';
import AddFoodForm from './components/AddFoodForm';
import { useState } from 'react';
import Search from './components/Search';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [foodItems, setFoodItems] = useState(foods);
  const [searchValue, setSearchValue] = useState('');

  const displayForm = () => setShowForm(!showForm);

  const addNewFood = (newFood) => {
    const newFoodItems = [...foodItems, newFood];
    setFoodItems(newFoodItems);
  };

  const deleteItem = (name) => {
    const deletedItems = foodItems.filter((food) => {
      return food.name !== name;
    });
    setFoodItems(deletedItems);
  };

  const filteredFoodItems = foodItems.filter((el) => {
    return el.name.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <div className="App">
      {showForm && <AddFoodForm addNewFood={addNewFood} />}

      <Button onClick={displayForm}>
        {showForm ? 'Hide Form' : 'Add New Food'}
      </Button>

      <Search searchValue={searchValue} setSearchValue={setSearchValue} />

      <Divider>Food List</Divider>

      {filteredFoodItems.length > 0 ? (
        <Row style={{ width: '100%', justifyContent: 'center' }}>
          {filteredFoodItems.map((food) => {
            return <FoodItem food={food} deleteItem={deleteItem} />;
          })}
        </Row>
      ) : (
        <h2>Nothing to see here</h2>
      )}
    </div>
  );
}

export default App;
