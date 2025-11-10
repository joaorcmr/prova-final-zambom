import { ClassProvider, Type } from '@nestjs/common';

export const useClass = <T>(
  provide: symbol,
  useClass: Type<T>,
): ClassProvider => {
  return {
    provide,
    useClass,
  };
};
