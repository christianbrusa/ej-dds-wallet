import moment from "moment";
import cron from "cron";
import _ from "lodash";

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
    console.log(`El saldo actual del usuario ${this.cbu} es ${this.saldoActual}`);
  }
  
  sumarSaldo(monto){
    console.log(`Sumando dinero al usuario ${this.cbu}`);
    this.saldoActual += monto;
    console.log(`El saldo actual del usuario ${this.cbu} es ${this.saldoActual}`);
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
  
  queue: Array<Transferencia> = [];
  job: cron.CronJob;
  
  setTransferencia(transferencia: Transferencia){
    this.queue.push(transferencia);
  }
  
  transferir(){
    this.job = new cron.CronJob("*/1 * * * *", () => {
      const fechaActual = moment().format();
      this.queue.forEach(transferencia => {
        if(!_.isEmpty(this.queue) && (transferencia.fecha <= fechaActual || transferencia instanceof Enviar)) {
          transferencia.ejecutar();
          this.queue = this.queue.filter(it => it != transferencia);
        }
      })
      console.log("Cola de transferencias actualizada", this.queue);
      if(_.isEmpty(this.queue)){
        this.job.stop();
      }
    });
    this.job.start();
  }
}