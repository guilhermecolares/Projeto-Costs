import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Home from './components/pages/Home';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import NewProject from './components/pages/NewProject';
import Projects from './components/pages/Projects';
import Project from './components/pages/Project';

import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

          <Container customClass='min-height'>
            <Routes>
              <Route exact path='/' element={<Home />}/>
              <Route path='/projects' element={<Projects />}/>
              <Route path='/project/:id' element={<Project />}/>
              <Route path='/company' element={<Company />}/>
              <Route path='/contact' element={<Contact />}/>
              <Route path='/newproject' element={<NewProject />}/>
            </Routes>
          </Container>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
