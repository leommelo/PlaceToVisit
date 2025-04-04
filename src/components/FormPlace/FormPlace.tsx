import { useEffect, useState } from 'react';
import './FormPlace.css';
import SnackbarAlert from '../SnackBarAlert/SnackbarAlert';
import { Dialog, DialogContent } from '@mui/material';
import { motion } from 'framer-motion';
import FormsComponent from '../FormsComponent/FormsComponent';
import { countryService } from '../../services/api';
import { FormData, FormPlaceProps, SnackbarState } from '../../types';

const FormPlace = ({ fetchMetas }: FormPlaceProps) => {
  const [countries, setCountries] = useState<{ nome: string; flag: string; }[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [data, setData] = useState<FormData>({
    nome: '',
    flag: '',
    local: '',
    meta: ''
  });

  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    open: false,
    mensagem: "",
    severity: undefined,
  });

  const fetchCountries = async () => {
    try {
      const countriesData = await countryService.fetchAllCountries();
      setCountries(countriesData);
    } catch (error) {
      console.error('Error fetching countries:', error);
      const countriesFallBack = [{
        "nome": "Afeganistão",
        "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_the_Taliban.svg/320px-Flag_of_the_Taliban.svg.png",
      }];
      setCountries(countriesFallBack);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const envioData = async () => {
    try {
      await countryService.create(data);
      fetchMetas();
      setSnackbarState({ open: true, mensagem: "Meta adicionada com sucesso", severity: "success" });
    } catch (error) {
      console.error(error);
      setSnackbarState({ open: true, mensagem: "Erro ao adicionar meta", severity: "error" });
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const [mes, ano] = data.meta.split('/').map(Number);
    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();
    const mesAtual = dataAtual.getMonth() + 1;

    if (data.nome === '') {
      setSnackbarState({ open: true, mensagem: "Escolha um país", severity: "error" });
    } else if (data.local === '') {
      setSnackbarState({ open: true, mensagem: "Escreva um local", severity: "error" });
    } else if (!data.meta.match(/^(0[1-9]|1[0-2])\/\d{4}$/)) {
      setSnackbarState({ open: true, mensagem: "Formato de data inválido", severity: "error" });
    } else if (ano < anoAtual || (ano === anoAtual && mes < mesAtual)) {
      setSnackbarState({ open: true, mensagem: "A data deve estar no futuro", severity: "error" });
    } else {
      envioData();
      setData({
        nome: '',
        flag: '',
        local: '',
        meta: ''
      })
      setIsAdding(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    if (name === 'nome') {
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

  return (
    <div className='form-place'>
      <form className='form-place__forms' onSubmit={handleSubmit}>
        <FormsComponent
          data={data}
          handleChange={handleChange}
          countries={countries}
          handleSubmit={handleSubmit}
        />
      </form>

      <button className='botao-adicionar' id='buton-form-open' onClick={() => setIsAdding(true)}>Adicionar</button>

      <Dialog
          open={isAdding}
          onClose={() => setIsAdding(false)}
          fullWidth
          maxWidth="md"
          sx={{ 
              "& .MuiPaper-root": { 
                  overflow: "hidden", 
                  borderRadius: "12px", 
              } 
          }}
      >
          <motion.div
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
          >
              <DialogContent sx={{ padding: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: "hidden" }}>
                  <form className='form-place__forms-cel' onSubmit={handleSubmit}>
                    <FormsComponent
                      data={data}
                      handleChange={handleChange}
                      countries={countries}
                      handleSubmit={handleSubmit}
                    />
                  </form>
              </DialogContent>
          </motion.div>
      </Dialog>

      <SnackbarAlert state={snackbarState} setState={setSnackbarState} />
    </div>
  );
}

export default FormPlace;
