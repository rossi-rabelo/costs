import { Routes, Route } from 'react-router-dom'

import Home from './components/pages/Home';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import NewProject from './components/pages/NewProject';
import Projects from './components/pages/Projects';
import Project from './components/pages/Project';

const RouterView = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Home />}></Route>
      <Route path="/company" element={<Company />}></Route>
      <Route path="/contact" element={<Contact />}></Route>
      <Route path="/new-project" element={<NewProject />}></Route>
      <Route path="/projects" element={<Projects />}></Route>
      <Route path="/projects/:id" element={<Project />}></Route>
    </Routes>
  )
}

export default RouterView
