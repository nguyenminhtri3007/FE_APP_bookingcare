export class SpecialtyModel {
  limit?: number;
  name?: string;
  description?: string;
  image?: string; 

  constructor(limit?: number, name?: string,image?: string, description?: string) {
    this.limit = limit ?? undefined;
    this.name = name ?? '';
    this.description = description ?? '';
    this.image = image ?? ''; 
  }
}
export class SpecialtyByIdModel {
  id?: string;
  location?: string;

  constructor(id?: string, location?: string) {
    this.id = id ?? '';
    this.location = location ?? '';
  }
}

export class SpecialtyResponseModel {
  id!: number;
  name!: string;
  image?: string;
  descriptionHTML?: string;
  descriptionMarkdown?: string;
  createdAt?: string;
  updatedAt?: string;

  constructor(data: Partial<SpecialtyResponseModel>) {
    Object.assign(this, data);
  }
}