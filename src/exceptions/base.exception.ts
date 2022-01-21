export abstract class Exception {
  abstract type: number;

  constructor(
    public readonly code: number,
    public readonly message: string,
    public readonly inner?: any,
  ) {}

  toString(): string {
    // Здесь логика сериализации, работа со стек-трейсами, вложенными ошибками и проч...
    return '';
  }
}
