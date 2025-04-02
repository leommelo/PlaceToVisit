import Header from '../../components/Header/Header'
import FormPlace from '../../components/FormPlace/FormPlace'
import { CardsArea } from '../../components/CardsArea/CardsArea'
import { useEffect, useState } from 'react';
import axios from 'axios';
import './MainPage.css'

interface CountryProps {
  id: string;
  nome: string;
  flag: string;
  local: string;
  meta: string;
}

const MainPage = () => {
  const [metas, setMetas] = useState<CountryProps[]>([]);

  const fetchMetas = async () => {
    try {
      const response = await axios.get("http://localhost:3001/countries");
      setMetas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMetas(); 
  }, []);

  return (
    <div className='main-page'>
      <Header/>
      <FormPlace fetchMetas={fetchMetas}/>
      <CardsArea metas={metas} fetchMetas={fetchMetas}/>
    </div>
  )
}

export default MainPage;
