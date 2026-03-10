import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { listarPedidos, deletarPedido } from '../services/orderService'

// Página principal — lista todos os pedidos da API
function ListaPedidos() {
  const navigate = useNavigate()

  // Estado que guarda a lista de pedidos
  const [pedidos, setPedidos] = useState([])
  // Estado para mostrar mensagem de carregando
  const [loading, setLoading] = useState(true)
  // Estado para mensagens de erro
  const [erro, setErro] = useState(null)

  // Busca os pedidos quando a página carrega
  useEffect(() => {
    carregarPedidos()
  }, [])

  const carregarPedidos = async () => {
    try {
      setLoading(true)
      const data = await listarPedidos()
      setPedidos(data.data || [])
    } catch (error) {
      setErro('Erro ao carregar pedidos. Verifique se a API está rodando.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeletar = async (numeroPedido) => {
    if (!confirm(`Deseja deletar o pedido ${numeroPedido}?`)) return
    try {
      await deletarPedido(numeroPedido)
      carregarPedidos()
    } catch (error) {
      alert('Erro ao deletar pedido.')
    }
  }

  if (loading) return <p style={estilos.loading}>Carregando pedidos...</p>
  if (erro) return <p style={estilos.erro}>{erro}</p>

  return (
    <div style={estilos.container}>
      <h1 style={estilos.titulo}>📦 Pedidos</h1>

      {/* Botão para ir para a página de criar pedido */}
      <button style={estilos.btnNovo} onClick={() => navigate('/criar')}>
        ➕ Novo Pedido
      </button>

      {pedidos.length === 0 ? (
        <p style={estilos.vazio}>Nenhum pedido encontrado.</p>
      ) : (
        <table style={estilos.tabela}>
          <thead>
            <tr>
              <th style={estilos.th}>Número do Pedido</th>
              <th style={estilos.th}>Valor Total</th>
              <th style={estilos.th}>Data de Criação</th>
              <th style={estilos.th}>Itens</th>
              <th style={estilos.th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.orderId} style={estilos.tr}>
                <td style={estilos.td}>{pedido.orderId}</td>
                <td style={estilos.td}>
                  R$ {pedido.value?.toLocaleString('pt-BR')}
                </td>
                <td style={estilos.td}>
                  {new Date(pedido.creationDate).toLocaleDateString('pt-BR')}
                </td>
                <td style={estilos.td}>{pedido.items?.length} item(s)</td>
                <td style={estilos.td}>
                  <button
                    style={estilos.btnDeletar}
                    onClick={() => handleDeletar(pedido.orderId)}
                  >
                    🗑️ Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

const estilos = {
  container: { padding: '2rem', fontFamily: 'sans-serif' },
  titulo: { color: '#1a1a2e', marginBottom: '1rem' },
  btnNovo: { backgroundColor: '#1a1a2e', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', marginBottom: '1.5rem' },
  tabela: { width: '100%', borderCollapse: 'collapse' },
  th: { backgroundColor: '#1a1a2e', color: 'white', padding: '12px', textAlign: 'left' },
  tr: { borderBottom: '1px solid #ddd' },
  td: { padding: '12px', color: '#333' },
  btnDeletar: { backgroundColor: '#c84b31', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' },
  loading: { padding: '2rem', color: '#555' },
  erro: { padding: '2rem', color: 'red' },
  vazio: { padding: '2rem', color: '#555' },
}

export default ListaPedidos