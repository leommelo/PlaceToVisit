import React from 'react'
import InputMask from 'react-input-mask'

interface Country {
    nome: string;
    flag: string;
  }
  
  interface FormsComponentProps {
    data: {
      nome: string;
      local: string;
      meta: string;
    };
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    countries: Country[];
  }

const FormsComponent = ({ data, handleChange, countries }: FormsComponentProps) => {
  return (
    <>
        <div className="form-group">
          <label htmlFor="name">País</label>
          <select name="nome" id="name" value={data?.nome} onChange={handleChange} data-cy="select-form">
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
          <input type="text" name='local' id='local' value={data?.local} onChange={handleChange} placeholder='Digite o local que deseja conhecer' data-cy='input-local-form'/>
        </div>

        <div className="form-group">
          <label htmlFor="meta">Meta</label>
          <InputMask 
            mask="99/9999" 
            name='meta'
            id="meta"
            placeholder="Mês/Ano"
            type="text"
            value={data?.meta}
            onChange={handleChange}
            data-cy='input-meta-form'
          />
        </div>

        <button type="submit" className='botao-adicionar' data-cy='botao-form'>Adicionar</button>
    </>
  )
}

export default FormsComponent