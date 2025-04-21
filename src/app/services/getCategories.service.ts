import { Injectable } from '@angular/core';
import { CATEGORIES} from '../constants/categories';

@Injectable({
  providedIn: 'root',
})
export class GetCategoriesService {
  private categories = CATEGORIES;

  constructor() {}

  async getCategories() {
    try {
      return Promise.resolve(this.categories);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
