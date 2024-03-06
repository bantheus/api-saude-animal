export interface IEspecie {
  nome: string;
}

export interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

export interface IParamProps {
  id?: string;
}
