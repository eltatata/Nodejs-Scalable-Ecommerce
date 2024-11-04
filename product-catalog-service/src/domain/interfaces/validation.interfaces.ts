export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult<T> {
  errors?: ValidationError[];
  validatedData?: T;
}
