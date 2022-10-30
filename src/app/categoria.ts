import { Produto } from "./produto";

export interface Categoria {
    idCategoria: number;
    nome: string;
    foto: string;
    produtos: Produto[];
}
