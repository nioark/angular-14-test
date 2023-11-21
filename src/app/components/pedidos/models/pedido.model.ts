export class Pedido {
    id?: number;
    name: string;
    quantidade: number;
    usuarioid: number;
  
    constructor(name: string, usuarioid: number, quantidade: number, id?: number) {
        this.id = id;
        this.name = name;
        this.usuarioid = usuarioid;
        this.quantidade = quantidade;
    }
}
  