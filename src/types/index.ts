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

// Interface para o estado do Snackbar
export interface SnackbarState {
  open: boolean;
  mensagem: string;
  severity: 'error' | 'info' | 'success' | 'warning' | undefined;
}

// Interface para as props do CardCountry
export interface CardCountryProps {
  id: string;
  nome: string;
  flag: string;
  local: string;
  meta: string;
  fetchMetas: () => void;
}

// Interface para as props do CardsArea
export interface CardsAreaProps {
  metas: Country[];
  fetchMetas: () => void;
}

// Interface para as props do FormPlace
export interface FormPlaceProps {
  fetchMetas: () => void;
}

// Interface para as props do FormsComponent
export interface FormsComponentProps {
  data: FormData;
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  countries: { nome: string; flag: string; }[];
  handleSubmit: (event: React.FormEvent) => void;
} 