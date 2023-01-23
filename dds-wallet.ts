interface Transferencia {
  ejecutar(): void;
}

class Billetera {
  constructor(cbu:number, saldoActual:number){
    this.cbu = cbu;
    this.saldoActual = saldoActual;
  }

  restarSaldo(monto){
    console.log(`Restando dinero al usuario ${this.cbu}`);
    this.saldoActual -= monto;
  }
  
  sumarSaldo(monto){
    console.log(`Sumando dinero al usuario ${this.cbu}`);
    this.saldoActual += monto;
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

class Usuario {
  constructor(billetera: Billetera){
    this.billetera = billetera;
  }
  
  transferencia: Transferencia;
  
  setTransferencia(transferencia){
    this.transferencia = transferencia;
  }
  
  transferir(){
    this.transferencia.ejecutar();
  }
}