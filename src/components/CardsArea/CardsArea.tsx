import './CardsArea.css'
import CardCountry from '../CardCountry/CardCountry';
import { AnimatePresence, motion } from 'framer-motion';

  interface CountryProps {
    id: string;
    nome: string;
    flag: string;
    local: string;
    meta: string;
}

interface CardsAreaProps {
  metas: CountryProps[];
  fetchMetas: () => void; 
}

  export const CardsArea = ({fetchMetas, metas}: CardsAreaProps ) => {


    return (
      <div className="cards-area">
        <AnimatePresence>
          {metas.map((country) => (
            <motion.div
              key={country.nome}
              initial={{ opacity: 0, y: 20 }} // Começa invisível e abaixo
              animate={{ opacity: 1, y: 0 }} // Anima para a posição final
              exit={{ opacity: 0, y: -20 }} // Remove suavemente
              transition={{ duration: 0.3 }}
            >
              <CardCountry {...country} fetchMetas={fetchMetas}/>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  }
