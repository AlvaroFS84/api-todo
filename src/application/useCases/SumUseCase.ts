export interface SumDTO {
  a: number;
  b: number;
}

export interface SumResultDTO {
  a: number;
  b: number;
  result: number;
}

export class SumUseCase {
  execute(dto: SumDTO): SumResultDTO {
    if (isNaN(dto.a) || isNaN(dto.b)) {
      throw new Error('Both "a" and "b" must be valid numbers');
    }
    return { a: dto.a, b: dto.b, result: dto.a + dto.b };
  }
}
