import axios from 'axios'

// URL base da API — aponta para o backend Node.js rodando localmente
const api = axios.create({
  baseURL: 'http://localhost:3000'
})

// Busca todos os pedidos
export const listarPedidos = async () => {
  const response = await api.get('/order/list')
  return response.data
}

// Busca um pedido pelo número
export const buscarPedido = async (numeroPedido) => {
  const response = await api.get(`/order/${numeroPedido}`)
  return response.data
}

// Cria um novo pedido
export const criarPedido = async (pedido) => {
  const response = await api.post('/order', pedido)
  return response.data
}

// Deleta um pedido
export const deletarPedido = async (numeroPedido) => {
  const response = await api.delete(`/order/${numeroPedido}`)
  return response.data
}