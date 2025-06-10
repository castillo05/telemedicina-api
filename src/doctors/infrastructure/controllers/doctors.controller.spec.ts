import { Test, TestingModule } from '@nestjs/testing';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from '../../application/services/doctors.service';

describe('DoctorsController', () => {
  let controller: DoctorsController;
  let doctorsServiceMock: any;

  beforeEach(async () => {
    doctorsServiceMock = {
      create: { execute: jest.fn() },
      update: { execute: jest.fn() },
      find: { execute: jest.fn() },
      findOne: { execute: jest.fn() },
      delete: { execute: jest.fn() },
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorsController],
      providers: [
        {
          provide: DoctorsService,
          useValue: doctorsServiceMock,
        },
      ],
    }).compile();

    controller = module.get<DoctorsController>(DoctorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
