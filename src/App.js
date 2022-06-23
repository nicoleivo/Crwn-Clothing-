import { Routes, Route } from 'react-router-dom'

import Home from './routes/home/home'
import NavigationBar from './routes/navigation/navigation-bar'
import Shop from './routes/shop/shop'
import Authentication from './routes/authentication/authentication'

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<NavigationBar />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
      </Route>
    </Routes>
  )
};

export default App;