import { BrowserRouter as Router } from 'react-router-dom'

import RouterView from './RouterView';

import Container from './components/layouts/Container';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';

function App() {
  return (
    <Router>
      <Navbar/>
      
      <Container customClass="min-height">
        <RouterView/>
      </Container>

      <Footer/>
    </Router>
  );
}

export default App;
