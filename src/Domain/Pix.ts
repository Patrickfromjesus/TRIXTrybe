import statusPix from '../enums/statusPix'

class Pix {
  constructor(
    private id: string,
    private transferBy: string,
    private transferTo: string,
    private amount: number,
    private key: string,
    private status: statusPix,
   ) { }

   getTransferBy () { return this.transferBy };
   setTransferBy (person: string) { this.transferBy = person };
   getTransferTo () { return this.transferTo };
   setTransferTo (person: string) { this.transferBy = person };
   getAmount () { return this.amount };
   setAmount (amount: number) { this.amount = amount };
   getId () { return this.id };
   getKey () { return this.key };
   setKey (key: string) { this.key = key };
   getStatus (): statusPix { return this.status };
   setStatus (status: statusPix) { this.status = status };
}

export default Pix;
