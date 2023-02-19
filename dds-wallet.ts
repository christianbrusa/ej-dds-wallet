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
    if(this.montoEnviar > this.remitente.saldoActual){
      throw new Error("No es posible realizar la transferencia debido a que el monto a enviar supera el saldo disponible");
    }
    else{
      this.remitente.restarSaldo(this.montoEnviar);
      this.destinatario.sumarSaldo(this.montoEnviar);
    }
  }
}

class Programar implements Transferencia {
  constructor(remitente: Billetera, destinatario: Billetera, montoEnviar: number, fecha: string){
    this.remitente = remitente;
    this.destinatario = destinatario;
    this.montoEnviar = montoEnviar;
    this.fecha = fecha;
  }
  
  ejecutar(){
    if(this.montoEnviar > this.remitente.saldoActual){
      throw new Error("No es posible realizar la transferencia debido a que el monto a enviar supera el saldo disponible");
    }
    else{
      this.remitente.restarSaldo(this.montoEnviar);
      this.destinatario.sumarSaldo(this.montoEnviar);
    }
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