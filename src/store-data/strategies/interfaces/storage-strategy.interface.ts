export interface SaveStringResult {
  id: string | number;
  someString: string;
  createdAt: Date;
}

export interface IStorageStrategy {
  saveString(data: string): Promise<SaveStringResult>;
}
