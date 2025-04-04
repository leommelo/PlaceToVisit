import './CardsArea.css'
import CardCountry from '../CardCountry/CardCountry';
import { AnimatePresence, motion } from 'framer-motion';
import { CardsAreaProps } from '../../types';

export const CardsArea = ({ fetchMetas, metas }: CardsAreaProps) => {
    return (
        <div className="cards-area">
            <AnimatePresence>
                {metas.map((country) => (
                    <motion.div
                        key={country.nome}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <CardCountry {...country} fetchMetas={fetchMetas}/>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};
