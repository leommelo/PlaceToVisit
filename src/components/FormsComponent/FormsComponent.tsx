import InputMask from 'react-input-mask'
import { FormsComponentProps } from '../../types'

const FormsComponent = ({ data, handleChange, countries }: FormsComponentProps) => {
  return (
    <>
      <div className="form-group">
        <label htmlFor="nome">País</label>
        <select name="nome" id="nome" value={data.nome} onChange={handleChange} data-cy="select-form">
          <option value="">Selecione um país</option>
          {countries.map((country, index) => (
            <option key={index} value={country.nome}>
              {country.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group" id='form-group-local'>
        <label htmlFor="local">Local</label>
        <input 
          type="text" 
          name='local' 
          id='local' 
          value={data.local} 
          onChange={handleChange} 
          placeholder='Digite o local que deseja visitar' 
          data-cy='input-local-form'
        />
      </div>

      <div className="form-group">
        <label htmlFor="meta">Meta</label>
        <InputMask 
          mask="99/9999" 
          name='meta'
          id="meta"
          placeholder="Mês/Ano"
          type="text"
          value={data.meta}
          onChange={handleChange}
          data-cy='input-meta-form'
        />
      </div>

      <button type="submit" className='botao-adicionar' data-cy='botao-form'>Adicionar</button>
    </>
  )
}

export default FormsComponent