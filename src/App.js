import './App.css';
import Footer from './Components/Footer';
import Header from "./Components/Header";
import Home from "./Components/Home";
import AddPropertyForm from "./Components/AddPropertyForm"
import SearchResult from "./Components/SearchResult";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router";


function App() {
  return (
    <div>
      <Header/>
      <BrowserRouter>
      <Routes>
        <Route index element={[<Home/>]}/> 
        <Route path='/add' element={<AddPropertyForm/>}/>
        <Route path='/search/:' element={<SearchResult/>}/>
      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
