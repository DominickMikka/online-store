export interface IProduct {
  id: number,
  quantity: number,
  brand: string,
  platform: string,
  name: string,
  year: number,
  popular: string,
  image: string,
  inCart?: boolean,
}