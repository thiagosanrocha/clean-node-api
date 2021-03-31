import { MissingParamError } from '../errors/MissingParamError';
import { SignUpController } from './SignUpController';

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = new SignUpController();

    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse).toEqual({
      statusCode: 400,
      body: new MissingParamError('name'),
    });
  });

  test('Should return 400 if no email is provided', () => {
    const sut = new SignUpController();

    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_passowrd',
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  test('Should return 400 if no password is provided', () => {
    const sut = new SignUpController();

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        passwordConfirmation: 'any_password',
      },
    };

    const { statusCode, body } = sut.handle(httpRequest);

    expect(statusCode).toBe(400);
    expect(body).toEqual(new MissingParamError('password'));
  });
});
