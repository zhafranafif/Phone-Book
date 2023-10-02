import { Route, Routes } from 'react-router-dom'
import ContactListPages from '../pages/ContactListPages'
import FormContactPage from '../pages/FormContactPage'


const RouteSetup = () => {
  return (
              <Routes>
                <Route path='/' element={<ContactListPages />} />
                <Route path='/form' element={<FormContactPage/>} />
              </Routes>
      
  )
}

export default RouteSetup