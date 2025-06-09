export class Doctors {
  constructor(
    public readonly id: string,
    public speciality: string,
    public licenceNumber: string,
    public clinicName: string,
    public clinicAddress: string,
    public userId: string,
    public isActive: boolean,
    public clinicId: string,
  ) {}
}
