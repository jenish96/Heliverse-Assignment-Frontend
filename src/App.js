import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import { Provider } from 'react-redux';
import store from './services/store'
import NewUser from './components/NewUser';
import Team from './components/Team';

function App() {
  return (
    <>
      <Provider store={store}>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/team' element={<Team />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
