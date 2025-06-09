export class Users {
  constructor(
    public readonly id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone: string,
    public role: string,
    public isActive: boolean,
    public isEmailVerified: boolean,
    public password: string,
    public resetPasswordToken: string,
    public clinicId?: string,
    // public resetPasswordExpires: Date,
    // public createdAt: Date,
    // public updatedAt: Date,
  ) {
  }
}
