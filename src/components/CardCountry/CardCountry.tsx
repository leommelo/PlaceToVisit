import { Button, CardActions, Dialog, DialogContent, IconButton, TextField } from '@mui/material';
import './CardCountry.css'
import Card from '@mui/material/Card';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import { useState } from 'react';
import InputMask from 'react-input-mask'
import SnackbarAlert from '../SnackBarAlert/SnackbarAlert';
import { motion } from 'framer-motion';

interface CountryProps {
    id: string;
    nome: string;
    flag: string;
    local: string;
    meta: string;
    fetchMetas: () => void;
}


function CardCountry({ id,nome, flag, local, meta, fetchMetas }: CountryProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({ local, meta });
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        mensagem: "",
        severity: undefined as 'error' | 'info' | 'success' | 'warning' | undefined,
      });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedData({ 
        ...editedData, 
        [event.target.name]: event.target.value // Atualiza dinamicamente o campo correto
    });
    };


    const deleteMeta = async (id:string) => {
        try{
            const response = await axios.delete(`http://localhost:3001/countries/${id}`);
            fetchMetas();
        }catch(error){
            console.error(error);
        }
    }

    const saveEdit = async(id:string) => {
        try {
            const [mes, ano] = editedData.meta.split('/').map(Number);
            const dataAtual = new Date();
            const anoAtual = dataAtual.getFullYear();
            const mesAtual = dataAtual.getMonth() + 1;

            if (editedData.local === '') {
                setSnackbarState({ open: true, mensagem: "Escreva um local", severity: "error" });
            }else if (!editedData.meta.match(/^(0[1-9]|1[0-2])\/\d{4}$/)) {
              setSnackbarState({ open: true, mensagem: "Formato de data inválido", severity: "error" });
            } else if (ano < anoAtual || (ano === anoAtual && mes < mesAtual)) {
              setSnackbarState({ open: true, mensagem: "A data deve estar no futuro", severity: "error" });
            } else {
            const response = await axios.patch(`http://localhost:3001/countries/${id}`, {
                local: editedData.local,
                meta: editedData.meta
            });
            fetchMetas();
            setIsEditing(false);
        }
        }catch(error){
            console.error(error)
        }
    }

    const handleEditClick = () => {
        setIsEditing(true); // Ativa a animação
    };

  return (
    <div className='card'>
        <Card
            sx={{
                maxWidth: 315,
                padding: 3,
                borderRadius: 3,
                boxShadow: 8,
                minHeight: 250,
                "@media (max-width: 874px)": {
                    maxWidth:418,
                    minHeight: 270, // Ajusta a altura mínima
                    padding: 2, // Reduz o padding
                },
            }}
        >
            <div className="card-upper">
                <div className="card-country">
                    <img height="140" src={flag} alt="Bandeira do país" />
                    <h2>{nome}</h2>
                </div>
                <CardActions sx={{ marginTop: -1.5 }}>
                    <IconButton size="small" onClick={handleEditClick}><EditIcon /></IconButton>
                    <IconButton size="small" onClick={() => deleteMeta(id)}><ClearIcon /></IconButton>
                </CardActions>
            </div>
            <div className="card-lower">
                <p>Local: {local}</p>
                <p>Meta: {meta}</p>
            </div>
        </Card>

        <Dialog
            open={isEditing}
            onClose={() => setIsEditing(false)}
            fullWidth
            maxWidth="md"
            sx={{ 
                "& .MuiPaper-root": { 
                    overflow: "hidden", 
                    borderRadius: "12px" 
                } 
            }}
        >
            <motion.div
                initial={{ scale: 0.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                <DialogContent sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: "hidden" }}>
                    <motion.img
                        src={flag}
                        alt={`Bandeira de ${nome}`}
                        style={{ width: '150px', marginBottom: '15px' }}
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                    />
                    <h2>{nome}</h2>
                    <div className="form-place__forms">
                        <div className="form-group">
                            <label htmlFor="local">Local</label>
                            <input type="text" name="local" id="local" value={editedData.local} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="meta">Meta</label>
                            <InputMask
                                mask="99/9999"
                                name="meta"
                                id="meta"
                                placeholder="Mês/Ano"
                                type="text"
                                value={editedData.meta}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                        <Button variant="contained" color="success" onClick={() => saveEdit(id)}>
                            Salvar
                        </Button>
                        <Button variant="contained" color="error" onClick={() => setIsEditing(false)}>
                            Cancelar
                        </Button>
                    </div>
                </DialogContent>
            </motion.div>
        </Dialog>

      <SnackbarAlert state={snackbarState} setState={setSnackbarState} />
    </div>
  )
}

export default CardCountry