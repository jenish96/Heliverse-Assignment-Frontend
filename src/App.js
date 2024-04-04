import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import { Provider } from 'react-redux';
import store from './services/store'
import NewUser from './components/NewUser';

function App() {
  return (
    <>
      <Provider store={store}>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
