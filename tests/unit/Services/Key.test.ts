import Sinon from 'sinon';
import { Model } from 'mongoose';
import { expect } from 'chai';
import KeyService from '../../../src/Services/KeyService';
import Cpf from '../../../src/Domain/Keys/Cpf';
import Phone from '../../../src/Domain/Keys/Phone';
import Email from '../../../src/Domain/Keys/Email';

describe('Testes da classe de Domínio Key', function () {
  it('Teste da criação da key pix funcionando com cpf válido', async function () {
    const input = {
      owner: 'person',
      value: '123.456.789-10',
      type: 'cpf',
    }

    const output = {
      _id: '63e56ca042a6116f9b7f5840',
      owner: 'person',
      value: '123.456.789-10',
      type: 'cpf',
    }

    const mockResult = new Cpf('person', 'cpf', '123.456.789-10');

    Sinon.stub(Model, 'create').resolves(output);

    const service = new KeyService();
    const result = await service.createKey(input);

    expect(result).to.be.deep.equal(mockResult);

  });

  it('Teste da criação da key pix funcionando com telefone válido', async function () {
    const input = {
      owner: 'person',
      value: '+55 (71) 912345678',
      type: 'phone',
    }

    const output = {
      _id: '63e56ca042a6116f9b7f5840',
      owner: 'person',
      value: '+55 (71) 912345678',
      type: 'phone',
    }

    const mockResult = new Phone('person', 'phone', '+55 (71) 912345678');

    Sinon.stub(Model, 'create').resolves(output);

    const service = new KeyService();
    const result = await service.createKey(input);

    expect(result).to.be.deep.equal(mockResult);
  });

  it('Teste da criação da key pix funcionando com email válido', async function () {
    const input = {
      owner: 'person',
      value: 'person@test.com',
      type: 'email',
    }

    const output = {
      _id: '63e56ca042a6116f9b7f5840',
      owner: 'person',
      value: 'person@test.com',
      type: 'email',
    }

    const mockResult = new Email('person', 'email', 'person@test.com');

    Sinon.stub(Model, 'create').resolves(output);

    const service = new KeyService();
    const result = await service.createKey(input);

    expect(result).to.be.deep.equal(mockResult);
  });

  it('Teste da criação da key pix, inserindo um cpf inválido', async function () {
    const input = {
      owner: 'person',
      value: '123.456.789-10XX',
      type: 'cpf',
    }

    Sinon.stub(Model, 'create').resolves({});

    try {
      const service = new KeyService();
      await service.createKey(input);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid Cpf!');
    }

  });

  it('Teste da criação da key pix, inserindo um telefone inválido', async function () {
    const input = {
      owner: 'person',
      value: '+55 (71) 912345678XX',
      type: 'phone',
    }

    Sinon.stub(Model, 'create').resolves({});

    try {
      const service = new KeyService();
      await service.createKey(input);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid Phone!');
    }
  });

  it('Teste da criação da key pix, inserindo um email inválido', async function () {
    const input = {
      owner: 'person',
      value: 'emailRuim',
      type: 'email',
    }

    Sinon.stub(Model, 'create').resolves({});

    try {
      const service = new KeyService();
      await service.createKey(input);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid Email!');
    }
  });

  afterEach(() => Sinon.restore());
});