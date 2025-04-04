import axios from 'axios';

const API_URL = 'http://localhost:3001';

// Interface para os dados de país
export interface Country {
  id: string;
  nome: string;
  flag: string;
  local: string;
  meta: string;
}

// Interface para os dados do formulário
export interface FormData {
  nome: string;
  flag: string;
  local: string;
  meta: string;
}

// Serviço para gerenciar as requisições relacionadas a países
export const countryService = {
  // Buscar todos os países
  getAll: async (): Promise<Country[]> => {
    const response = await axios.get(`${API_URL}/countries`);
    return response.data;
  },

  // Criar um novo país
  create: async (data: FormData): Promise<Country> => {
    const response = await axios.post(`${API_URL}/countries`, data);
    return response.data;
  },

  // Atualizar um país existente
  update: async (id: string, data: Partial<Country>): Promise<Country> => {
    const response = await axios.patch(`${API_URL}/countries/${id}`, data);
    return response.data;
  },

  // Excluir um país
  delete: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/countries/${id}`);
  },

  // Buscar todos os países da API externa
  fetchAllCountries: async (): Promise<{ nome: string; flag: string; }[]> => {
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      const countriesData = response.data.map((country: any) => ({
        nome: country.translations.por?.common || country.name.common,
        flag: country.flags?.png || ''
      }));

      // Ordenar países por nome em português
      countriesData.sort((a: { nome: string }, b: { nome: string }) =>
        a.nome.localeCompare(b.nome, 'pt', { sensitivity: 'base' })
      );

      return countriesData;
    } catch (error) {
      console.error('Error fetching countries:', error);
      // Retornar um país de fallback em caso de erro
      return [{
        "nome": "Afeganistão",
        "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_the_Taliban.svg/320px-Flag_of_the_Taliban.svg.png",
      }];
    }
  }
}; 