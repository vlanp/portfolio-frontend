interface ISignInFormElements extends HTMLFormControlsCollection {
  emailInput: HTMLInputElement;
  passwordInput: HTMLInputElement;
}
interface ISignInFormElement extends HTMLFormElement {
  readonly elements: ISignInFormElements;
}

export type { ISignInFormElement, ISignInFormElements };
