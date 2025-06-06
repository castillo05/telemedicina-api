import { Injectable } from '@nestjs/common';
import { CreateDoctorsUsecase } from '../use-cases/create-doctors.usecase';
import { UpdateDoctorsUsecase } from '../use-cases/update-doctors.usecase';
import { FindDoctorsUsecase } from '../use-cases/find-doctors.usecase';
import { FindDoctorUsecase } from '../use-cases/find-doctor.usecase';
import { DeleteDoctorsUsecase } from '../use-cases/delete-doctors.usecase';

@Injectable()
export class DoctorsService {
  constructor(
    private readonly createDoctorUsecase: CreateDoctorsUsecase,
    private readonly updateDoctorUsecase: UpdateDoctorsUsecase,
    private readonly findDoctorsUsecase: FindDoctorsUsecase,
    private readonly findDoctorUsecase: FindDoctorUsecase,
    private readonly deleteDoctorUsecase:DeleteDoctorsUsecase
  ) {}

  get create() {
    return this.createDoctorUsecase;
  }

  get update() {
    return this.updateDoctorUsecase;
  }

  get find() {
    return this.findDoctorsUsecase;
  }

  get findOne() {
    return this.findDoctorUsecase;
  }

  get delete() {
    return this.deleteDoctorUsecase;
  }

}
