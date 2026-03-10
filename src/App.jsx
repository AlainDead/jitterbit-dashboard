import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ListaPedidos from './pages/ListaPedidos'
import CriarPedido from './pages/CriarPedido'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListaPedidos />} />
        <Route path="/criar" element={<CriarPedido />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App