import './App.css'
import Footer from './components/custom/Footer.jsx'
import Hero from './components/custom/Hero.jsx'
import ImageSlider from './components/custom/ImageSlider.jsx'
import Offers from './components/custom/Offers.jsx'
import Plan from './components/custom/Plan.jsx'
import Rooms from './components/custom/Rooms.jsx'

function App() {

  return (
    <>
        <Hero/>
        <Offers/>
        <Plan/>
        <Rooms/>
        <ImageSlider/>
        <Footer/>
      </>
  )
}

export default App
