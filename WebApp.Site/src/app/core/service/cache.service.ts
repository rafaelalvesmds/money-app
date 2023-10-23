import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {
  private cache: { [key: string]: any } = {};
  private cacheTTL: number = 60000;

  getFromCache(key: string): any {
    const cachedData = this.cache[key];
    if (cachedData && Date.now() - cachedData.timestamp < this.cacheTTL) {
      return cachedData.data;
    }
    return null;
  }

  addToCache(key: string, data: any): void {
    this.cache[key] = {
      data: data,
      timestamp: Date.now(),
    };
  }
}
