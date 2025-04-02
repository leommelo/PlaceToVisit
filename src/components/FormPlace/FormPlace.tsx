import { useEffect, useState, } from 'react'
import './FormPlace.css'
import InputMask from 'react-input-mask'
import axios from 'axios'
import { Alert, Snackbar, SnackbarCloseReason } from '@mui/material'
import React from 'react'

const FormPlace = ({ fetchMetas }: { fetchMetas: () => void }) => {


    interface Country {
        nome: string;
        flag: string;
    }

    interface Data {
      nome: string;
      flag: string;
      local: string;
      meta: string;
    }

    interface State {
      open:boolean, 
      mensagem: string,
      severity: 'error' | 'info' | 'success' | 'warning' | undefined
    }

    const [state, setState] = React.useState<State>({
      open: false,
      mensagem: "",
      severity: undefined,
    });
    const [countries, setCountries] = useState<Country[]>([])
    const [data, setData] = useState<Data>({
      nome: '',
      flag: '',
      local: '',
      meta: ''
    })

    const fetchCountries = async () => {
        try {
            const response = await axios.get('https://restcountries.com/v3.1/all');
            const countriesData = response.data.map((country: any) => {
                return {
                    nome: country.translations.por?.common || country.name.common, // Nome em português ou nome comum
                    flag: country.flags?.png || '' // URL da bandeira
                };
            });
            
            // Ordenar os países em ordem alfabética pelo nome
            countriesData.sort((a: Country, b: Country) => 
              a.nome.localeCompare(b.nome, 'pt', { sensitivity: 'base' })
            );

            setCountries(countriesData); // Atualiza o estado com a lista de países
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };

    useEffect(() => {
        fetchCountries(); // Chama a função para buscar os países quando o componente é montado
    }
    , []);

    const envioData = async () => {
      try{
        const response = await axios.post("http://localhost:3001/countries", data);
        fetchMetas();
        console.log(response);
      }catch(error){
        console.error(error);
      }
    }

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      if(data.nome == ''){
        setState({open:true, mensagem: "Escolha um país", severity:"error"})
      } else if(data.local == ""){
        setState({open:true, mensagem: "Escreva um local", severity:"error"})
      } else if(data.meta == ""){
        setState({open:true, mensagem: "Defina alguma data válida", severity:"error"})
      }else{
        envioData();
        setState({open:true, mensagem: "Meta adicionada com sucesso", severity:"success"})
      } 
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;

        if (name === 'nome') {
            // Buscar a flag correspondente ao país selecionado
            const selectedCountry = countries.find(country => country.nome === value);
            setData(prevData => ({
                ...prevData,
                nome: value,
                flag: selectedCountry?.flag || ''
            }));
        } else {
            setData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleClose = (
      event: React.SyntheticEvent | Event,
      reason?: SnackbarCloseReason,
    ) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setState({...state, open:false});
    };

  return (
    <div className='form-place'>
      <form action="" className='form-place__forms' onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">País</label>
          <select name="nome" id="name" value={data?.nome} onChange={handleChange}>
            <option value="">Selecione um país</option>
            {countries.map((country: any, index: number) => (
                <option key={index} value={country.nome}>
                    {country.nome} 
                </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="local">Local</label>
          <input type="text" name='local' id='local' value={data?.local} onChange={handleChange}/>
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
          />
        </div>

        <button type="submit" className='botao-adicionar'>Adicionar</button>
      </form>

      <Snackbar
      open={state.open}
      anchorOrigin={{vertical:"top", horizontal: "right"}}
      autoHideDuration={4000}
      onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={state.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {state.mensagem}
        </Alert>
      </Snackbar>

    </div>
  )
}

export default FormPlace