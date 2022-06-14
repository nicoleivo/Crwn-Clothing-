import { Routes, Route } from 'react-router-dom'

import Home from './routes/home/home'
import NavigationBar from './routes/navigation/navigation-bar'
import Shop from './routes/shop/shop'
import SignIn from './routes/sign-in/sign-in'

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<NavigationBar />}>
        <Route index element={<Home />} />
        <Route path='sign-in' element={<SignIn />} />
      </Route>
    </Routes>
  )
};

export default App;