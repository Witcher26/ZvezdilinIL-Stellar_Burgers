import AppHeader from './components/appHeader/AppHeader';
import BurgerIngredients from './components/burgerIngredients/BurgerIngredients';

import BurgerConstructor from './components/burgerConstructor/BurgerConstructor';

import './App.css';

function App() {
    return (
        <div>
            <header className="App-header">
                <AppHeader/>
                <div className='components-position'>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </div>
            </header>
        </div>
    );
}

export default App;
