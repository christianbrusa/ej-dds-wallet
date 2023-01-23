interface Transferencia {
  ejecutar(): void;
}

class Billetera {
  constructor(cbu:number, saldoActual:number){
    this.cbu = cbu;
    this.saldoActual = saldoActual;
  }
  
}