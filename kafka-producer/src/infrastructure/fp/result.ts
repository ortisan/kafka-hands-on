import { Result as ResultFP } from '@thames/monads';

type NonUndefined = {} | null;

export type Result<T extends NonUndefined, E extends NonUndefined> = ResultFP<
  T,
  E
>;

export type AsyncResult<
  T extends NonUndefined,
  E extends NonUndefined,
> = Promise<Result<T, E>>;
