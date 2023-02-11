import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import Pix from '../../../src/Domain/Pix';
import IPix from '../../../src/interfaces/IPix';
import PixService from '../../../src/Services/PixService';

describe('Testes de unidade Model Pix', function () {
  it('Consegue fazer a transferência com sucesso', async function () {
    const input: IPix = {
      transferBy: 'pessoa2',
      transferTo: 'pessoa1',
      amount: 100,
      key: '123.456.789-10'
    };
    
    const output = { ...input, _id: '63e56ca042a6116f9b7f5840' };
    
    Sinon.stub(Model, 'create').resolves(output);
    const service = new PixService();
    const result: Pix = await service.transfer(input);
    expect(result.getKey()).to.be.equal(input.key);
  });

  it('Não consegue fazer a transferência com sucesso, erro no cpf', async function () {
    const input: IPix = {
      transferBy: 'pessoa2',
      transferTo: 'pessoa1',
      amount: 100,
      key: '123.456.789-10XX'
    };
    
    const output = { ...input, _id: '63e56ca042a6116f9b7f5840' };
    
    Sinon.stub(Model, 'create').resolves(output);
    try {
      const service = new PixService();
      await service.transfer(input);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid key!');
    }
  });

  it('Não consegue reverter uma transferência, erro no id', async function () {
    const input: IPix = {
      transferBy: 'pessoa2',
      transferTo: 'pessoa1',
      amount: 100,
      key: '123.456.789-10XX'
    };
    
    const output = { ...input, _id: '63e56ca042a6116f9b7f5840' };
    
    Sinon.stub(Model, 'findOneAndUpdate').resolves(output);
    try {
      const service = new PixService();
      await service.cancellTransfer('63e56ca042a6116f9b7f5840X');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid Id!');
    }
  });

  it('Realiza a busca por todos os pixes filtrando por key com sucesso', async function () {
    const output: IPix[] = [
      {
        transferBy: 'pessoa2',
        transferTo: 'pessoa1',
        amount: 100,
        key: '123.456.789-10',
        id: '63e56ca042a6116f9b7f5840',
        status: 2,
    },
    {
      transferBy: 'pessoa3',
      transferTo: 'pessoa1',
      amount: 200,
      key: '123.456.789-10',
      id: '63e56ca042a6116f9b7f5860',
      status: 1,
  }
  ];

    const mockResult = [
      new Pix('63e56ca042a6116f9b7f5840', 'pessoa2', 'pessoa1', 100, '123.456.789-10', 2),
      new Pix('63e56ca042a6116f9b7f5860', 'pessoa3', 'pessoa1', 200, '123.456.789-10', 1),
    ]
    
    Sinon.stub(Model, 'find').resolves(output);

      const service = new PixService();
      const result = await service.getByKey(output[0].key);
      expect(result).to.be.deep.equal(mockResult);
  });

  it('Realiza a busca por todos os pixes com sucesso', async function () {
    const output: IPix[] = [
      {
        transferBy: 'pessoa2',
        transferTo: 'pessoa1',
        amount: 100,
        key: '123.456.789-10',
        id: '63e56ca042a6116f9b7f5840',
        status: 2,
      },
      {
        transferBy: 'pessoa3',
        transferTo: 'pessoa1',
        amount: 200,
        key: '123.456.789-10',
        id: '63e56ca042a6116f9b7f5860',
        status: 1,
      },
      {
        transferBy: 'pessoa1',
        transferTo: 'pessoa2',
        amount: 200,
        key: '321.546.798-10',
        id: '63e56ca042a6116f9b7f5870',
        status: 1,
      }
    ];

    const mockResult = [
    new Pix('63e56ca042a6116f9b7f5840', 'pessoa2', 'pessoa1', 100, '123.456.789-10', 2),
    new Pix('63e56ca042a6116f9b7f5860', 'pessoa3', 'pessoa1', 200, '123.456.789-10', 1),
    new Pix('63e56ca042a6116f9b7f5870', 'pessoa1', 'pessoa2', 200, '321.546.798-10', 1),
  ]
    
    Sinon.stub(Model, 'find').resolves(output);

      const service = new PixService();
      const result = await service.getAll();
      expect(result).to.be.deep.equal(mockResult);
  });

  afterEach(() => Sinon.restore());

});
