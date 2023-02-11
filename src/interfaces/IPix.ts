import statusPix from '../enums/statusPix';

export default interface IPix {
  transferBy: string,
  transferTo: string,
  amount: number;
  key: string;
  id?: string;
  status?: statusPix;
}
