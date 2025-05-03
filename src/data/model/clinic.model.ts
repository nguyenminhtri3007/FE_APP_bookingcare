
export class ClinicModel {
  limit?: number;
  name?: string;
  description?: string;
  image?: string;
  address?: string;

  constructor(limit?: number, name?: string, image?: string, description?: string, address?: string) {
    this.limit = limit ?? undefined;
    this.name = name ?? '';
    this.description = description ?? '';
    this.image = image ?? '';
    this.address = address ?? '';
  }
}
export class ClinicByIdModel {
  id?: string;

  constructor(id?: string) {
    this.id = id ?? '';
    
  }
}