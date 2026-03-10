import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { criarPedido } from '../services/orderService'

// Página com formulário para criar um novo pedido
function CriarPedido() {
  const navigate = useNavigate()

  // Estado do formulário principal
  const [form, setForm] = useState({
    numeroPedido: '',
    valorTotal: '',
    dataCriacao: '',
  })

  // Estado dos itens do pedido
  const [items, setItems] = useState([
    { idItem: '', quantidadeItem: '', valorItem: '' }
  ])

  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState(null)

  // Atualiza os campos principais do formulário
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Atualiza um item específico da lista
  const handleItemChange = (index, e) => {
    const novosItems = [...items]
    novosItems[index][e.target.name] = e.target.value
    setItems(novosItems)
  }

  // Adiciona um novo item vazio
  const adicionarItem = () => {
    setItems([...items, { idItem: '', quantidadeItem: '', valorItem: '' }])
  }

  // Remove um item da lista
  const removerItem = (index) => {
    setItems(items.filter((_, i) => i !== index))
  }

  // Envia o formulário para a API
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErro(null)

    try {
      await criarPedido({
        numeroPedido: form.numeroPedido,
        valorTotal: Number(form.valorTotal),
        dataCriacao: form.dataCriacao,
        items: items.map((item) => ({
          idItem: item.idItem,
          quantidadeItem: Number(item.quantidadeItem),
          valorItem: Number(item.valorItem),
        })),
      })
      // Volta para a lista após criar
      navigate('/')
    } catch (error) {
      setErro('Erro ao criar pedido. Verifique os dados e tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={estilos.container}>
      <h1 style={estilos.titulo}>➕ Novo Pedido</h1>

      <form onSubmit={handleSubmit} style={estilos.form}>

        {/* Dados principais */}
        <div style={estilos.grupo}>
          <label style={estilos.label}>Número do Pedido</label>
          <input
            style={estilos.input}
            name="numeroPedido"
            value={form.numeroPedido}
            onChange={handleChange}
            placeholder="Ex: PEDIDO-004"
            required
          />
        </div>

        <div style={estilos.grupo}>
          <label style={estilos.label}>Valor Total (R$)</label>
          <input
            style={estilos.input}
            name="valorTotal"
            type="number"
            value={form.valorTotal}
            onChange={handleChange}
            placeholder="Ex: 1500"
            required
          />
        </div>

        <div style={estilos.grupo}>
          <label style={estilos.label}>Data de Criação</label>
          <input
            style={estilos.input}
            name="dataCriacao"
            type="datetime-local"
            value={form.dataCriacao}
            onChange={handleChange}
            required
          />
        </div>

        {/* Itens do pedido */}
        <h2 style={estilos.subtitulo}>📦 Itens do Pedido</h2>

        {items.map((item, index) => (
          <div key={index} style={estilos.itemBox}>
            <div style={estilos.itemRow}>
              <div style={estilos.grupo}>
                <label style={estilos.label}>ID do Item</label>
                <input
                  style={estilos.input}
                  name="idItem"
                  value={item.idItem}
                  onChange={(e) => handleItemChange(index, e)}
                  placeholder="Ex: 1001"
                  required
                />
              </div>
              <div style={estilos.grupo}>
                <label style={estilos.label}>Quantidade</label>
                <input
                  style={estilos.input}
                  name="quantidadeItem"
                  type="number"
                  value={item.quantidadeItem}
                  onChange={(e) => handleItemChange(index, e)}
                  placeholder="Ex: 2"
                  required
                />
              </div>
              <div style={estilos.grupo}>
                <label style={estilos.label}>Valor Unitário (R$)</label>
                <input
                  style={estilos.input}
                  name="valorItem"
                  type="number"
                  value={item.valorItem}
                  onChange={(e) => handleItemChange(index, e)}
                  placeholder="Ex: 750"
                  required
                />
              </div>
              {items.length > 1 && (
                <button
                  type="button"
                  style={estilos.btnRemover}
                  onClick={() => removerItem(index)}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        ))}

        <button type="button" style={estilos.btnAdicionar} onClick={adicionarItem}>
          + Adicionar Item
        </button>

        {erro && <p style={estilos.erro}>{erro}</p>}

        <div style={estilos.botoes}>
          <button
            type="button"
            style={estilos.btnCancelar}
            onClick={() => navigate('/')}
          >
            Cancelar
          </button>
          <button type="submit" style={estilos.btnSalvar} disabled={loading}>
            {loading ? 'Salvando...' : '✅ Salvar Pedido'}
          </button>
        </div>

      </form>
    </div>
  )
}

const estilos = {
  container: { padding: '2rem', fontFamily: 'sans-serif', maxWidth: '700px', margin: '0 auto' },
  titulo: { color: '#1a1a2e', marginBottom: '1.5rem' },
  subtitulo: { color: '#1a1a2e', marginTop: '1.5rem', marginBottom: '1rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  grupo: { display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 },
  label: { fontSize: '13px', color: '#555', fontWeight: 'bold' },
  input: { padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px' },
  itemBox: { backgroundColor: '#f9f9f9', padding: '1rem', borderRadius: '8px', border: '1px solid #eee' },
  itemRow: { display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' },
  btnRemover: { backgroundColor: '#e53e3e', color: 'white', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', fontSize: '14px' },
  btnAdicionar: { backgroundColor: '#2d6a4f', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', alignSelf: 'flex-start' },
  botoes: { display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' },
  btnCancelar: { backgroundColor: '#ccc', color: '#333', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' },
  btnSalvar: { backgroundColor: '#1a1a2e', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' },
  erro: { color: 'red', fontSize: '14px' },
}

export default CriarPedido