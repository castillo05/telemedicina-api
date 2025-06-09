
export class Clinics {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly address: string,
    public readonly phone: string,
    public readonly logoUrl: string,
    public readonly email?: string,
    public readonly website?: string,
    public readonly description?: string,
    public readonly isActive: boolean = true,
    public readonly planId?: string,
    public readonly users: any[] = [], // Assuming users is an array of user entities
  ) {}

  // Additional methods or properties can be added here if needed
}
