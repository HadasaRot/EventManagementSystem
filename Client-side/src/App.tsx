import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import ProducerDashboard from "./pages/ProducerDashboard";
import UserDashboard from "./pages/UserDashboard";
import AddingProducer from "./components/AddingProducer"; 
import  ProducerEventList from "./components/ProducerEventList"; 
import ProducerDetail from "./components/ProducerDetails";
import { EventDetailsForProducer } from "./components/EventDetailsForProducer";
import {AddEvent } from "./components/AddEvent";  
import { EventListForUsers } from "./components/EventListForUsers";
import { EventDetailsForUser } from "./components/EventDetailsForUser";
function App() {

  return (
    <>
      <Router>
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/ProducerDashboard" element={<ProducerDashboard />} />
          <Route path="/UserDashboard" element={<UserDashboard />} />
          <Route path = "/AddingProducer" element = {<AddingProducer/>} />  
          <Route path = "/ProducerEventList" element = {<ProducerEventList email="example@example.com"/> } />
          <Route path = "/ProducerDetails" element = {<ProducerDetail/>} />
          <Route path = "/EventDetailsForProducer" element = {<EventDetailsForProducer/>} />
          <Route path = "/AddEvent" element = {<AddEvent/>} />
          <Route path = "/EventListForUsers" element = {<EventListForUsers/>} />
          <Route path = "/EventDetailsForUser" element = {<EventDetailsForUser/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App








