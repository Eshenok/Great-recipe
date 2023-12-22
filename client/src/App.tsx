import './App.css'
import Tab from "./shared/Tab/Tab";

function App() {

  return (
      <Tab text={'apple'} onClose={() => {console.log('clicked')}} />
  )
}

export default App
