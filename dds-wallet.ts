interface Transferencia {
  ejecutar(): void;
}

class Billetera {
  constructor(cbu:number, saldoActual:number){
    this.cbu = cbu;
    this.saldoActual = saldoActual;
  }

}

class Enviar implements Transferencia {
  constructor(remitente: Billetera, destinatario: Billetera, montoEnviar: number){
    this.remitente = remitente;
    this.destinatario = destinatario;
    this.montoEnviar = montoEnviar;
  }
  
  ejecutar(){
    
  }
}