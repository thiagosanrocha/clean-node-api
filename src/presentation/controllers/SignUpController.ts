import { MissingParamError, InvalidParamError } from '../errors';
import { badRequest } from '../helpers/httpHelper';
import {
  Controller,
  HttpRequest,
  HttpResponse,
  EmailValidator,
} from '../protocols';

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  public handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = [
      'name',
      'email',
      'password',
      'passwordConfirmation',
    ];

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }

    const emailIsValid = this.emailValidator.isValid(httpRequest.body.email);

    if (!emailIsValid) {
      return badRequest(new InvalidParamError('email'));
    }

    return {
      statusCode: 200,
      body: 'Success',
    };
  }
}
