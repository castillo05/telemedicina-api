import { Injectable } from '@nestjs/common';
import { CreateClinicsUsecase } from '../use-cases/create-clinics.usecase';
import { FindByIdUsecase } from '../use-cases/find-by-id.usecase';

@Injectable()
export class ClinicService {
  constructor(
    private readonly createClinicUsecase: CreateClinicsUsecase,
    // private readonly updateClinicUsecase: UpdateClinicsUsecase,
    // private readonly findClinicsUsecase: FindClinicsUsecase,
    private readonly findByIdUsecase: FindByIdUsecase,
    // private readonly deleteClinicUsecase: DeleteClinicsUsecase
  ) {
  }

  get create() {
    return this.createClinicUsecase;
  }

  get findById() {
    return this.findByIdUsecase;
  }
}
