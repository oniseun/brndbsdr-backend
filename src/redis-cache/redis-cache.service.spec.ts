import { RedisCacheService } from './redis-cache.service';
import { Cache } from 'cache-manager';
describe('RedisCacheService', () => {
  let service: RedisCacheService;

  beforeEach(() => {
    service = new RedisCacheService(Cache);
  });

  it('should get value', async () => {
    const key = 'random';
    const result = { randomObjkey: 'randomValue' };
    const prom = new Promise((resolve) => resolve(result));
    jest.spyOn(service, 'get').mockImplementation(() => prom);

    expect(await service.get(key)).toBe(result);
  });

  it('should set value', async () => {
    const key = 'random';
    const value = { randomObjkey: 'randomValue' };
    const prom = new Promise((resolve) => resolve(true));
    jest.spyOn(service, 'set').mockImplementation(() => prom);

    expect(await service.set(key, value)).toBe(true);
  });
  it('should reset cache', async () => {
    const prom = new Promise((resolve) => resolve(true));
    jest.spyOn(service, 'reset').mockImplementation(() => prom);

    expect(await service.reset()).toBe(true);
  });

  it('should delete key ', async () => {
    const key = 'random';
    const prom = new Promise((resolve) => resolve(true));
    jest.spyOn(service, 'del').mockImplementation(() => prom);

    expect(await service.del(key)).toBe(true);
  });
});
