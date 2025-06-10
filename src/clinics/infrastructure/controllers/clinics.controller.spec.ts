import { Test, TestingModule } from '@nestjs/testing';
import { ClinicsController } from './clinics.controller';
import { ClinicService } from '../../application/services/clinics.service';

describe('ClinicsController', () => {
  let controller: ClinicsController;
  let clinicsServiceMock: any;
  enum UserRole {
    ADMIN = 'admin',
    DOCTOR = 'doctor',
    PATIENT = 'patient',
  }

  beforeEach(async () => {
    clinicsServiceMock = {
      create: { execute: jest.fn() },
      findAll: { execute: jest.fn() },
      findById: { execute: jest.fn() },
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClinicsController],
      providers: [
        {
          provide: ClinicService,
          useValue: clinicsServiceMock
        },
      ]
    }).compile();

    controller = module.get<ClinicsController>(ClinicsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createClinic', () => {
    it('should create a new clinic', async () => {
      const dto = { name: 'Clinic A', address: '123 Street' };
      const expected = { id: 'uuid1', ...dto };

      clinicsServiceMock.create.execute.mockResolvedValue(expected);

      const result = await controller.createClinic(dto as any);
      expect(result).toEqual(expected);
      expect(clinicsServiceMock.create.execute).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAllClinics', () => {
    it('should return a list of clinics', async () => {
      const clinics = [
        { id: 'uuid1', name: 'Clinic A' },
        { id: 'uuid2', name: 'Clinic B' },
      ];

      clinicsServiceMock.findAll.execute.mockResolvedValue(clinics);

      const result = await controller.findAllClinics();
      expect(result).toEqual(clinics);
    });
  });

  describe('findClinicById', () => {
    it('should return a clinic by ID', async () => {
      const clinic = { id: 'uuid1', name: 'Clinic A' };

      clinicsServiceMock.findById.execute.mockResolvedValue(clinic);

      const result = await controller.findClinicById('uuid1');
      expect(result).toEqual(clinic);
      expect(clinicsServiceMock.findById.execute).toHaveBeenCalledWith('uuid1');
    });

    it('should return null if clinic not found', async () => {
      clinicsServiceMock.findById.execute.mockResolvedValue(null);

      const result = await controller.findClinicById('nonexistent-id');
      expect(result).toBeNull();
    });
  });
});

describe('ClinicsController - Role Guards and Swagger decorators', () => {
  enum UserRole {
    ADMIN = 'admin',
    DOCTOR = 'doctor',
    PATIENT = 'patient',
  }
  it('should have role guard and JWT guard applied at controller level', () => {
    const controllerMetadata = Reflect.getMetadata('__guards__', ClinicsController);
    expect(controllerMetadata).toBeDefined();
  });

  it('findAllClinics should have @Get and @Roles(UserRole.ADMIN) decorators', () => {
    const roles = Reflect.getMetadata('roles', ClinicsController.prototype.findAllClinics);
    expect(roles).toContain(UserRole.ADMIN);
  });

  it('findClinicById should allow ADMIN and DOCTOR roles', () => {
    const roles = Reflect.getMetadata('roles', ClinicsController.prototype.findClinicById);
    expect(roles).toEqual(expect.arrayContaining([UserRole.ADMIN, UserRole.DOCTOR]));
  });
});
