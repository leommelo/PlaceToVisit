import { CardActions, IconButton } from '@mui/material';
import './CardCountry.css'
import Card from '@mui/material/Card';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';

interface CountryProps {
    id: string;
    nome: string;
    flag: string;
    local: string;
    meta: string;
    fetchMetas: () => void;
}


function CardCountry({ id,nome, flag, local, meta, fetchMetas }: CountryProps) {

    const deleteMeta = async (id:string) => {
        try{
            const response = await axios.delete(`http://localhost:3001/countries/${id}`);
            fetchMetas();
        }catch(error){
            console.error(error);
        }
    }

  return (
    <div className='card'>
        <Card sx={{ maxWidth: 315 , padding: 3, borderRadius: 3, boxShadow: 8, Height: 250}} >
            <div className='card-upper'>
                <div className='card-country'>
                    <img
                    height="140"
                    src={flag}
                    alt="Bandeira do país"
                    />
                    <h2>{nome}</h2>
                </div>
                <CardActions sx={{ marginTop: -1.5 }}>
                    <IconButton size="small"><EditIcon /></IconButton>
                    <IconButton size="small" onClick={() => deleteMeta(id)}><ClearIcon /></IconButton>
                </CardActions>
            </div>
            <div className='card-lower'>
                <p>Local: {local}</p>
                <p>Meta: {meta}</p>
            </div>
        </Card>
    </div>
  )
}

export default CardCountry