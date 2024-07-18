import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantRepository } from '../repositories/restaurant.repository';
import { RestaurantService } from './restaurant.service';

describe('RestaurantService', () => {
  let service: RestaurantService;
  let repository: RestaurantRepository;

  const mockRestaurantRepository = {
    findAll: jest.fn(),
    findById: jest.fn(),
    findMany: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantService,
        {
          provide: RestaurantRepository,
          useValue: mockRestaurantRepository,
        },
      ],
    }).compile();

    service = module.get<RestaurantService>(RestaurantService);
    repository = module.get<RestaurantRepository>(RestaurantRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all', async () => {
    const restaurants = [{ id: 'restaurantId1', name: 'restaurant1' }];

    mockRestaurantRepository.findAll.mockResolvedValue(restaurants);

    const result = await service.findAll();

    expect(result).toEqual(restaurants);
    expect(repository.findAll).toHaveBeenCalled();
  });

  it('should find by id', async () => {
    const id = 'restaurantId1';
    const restaurant = { id, name: 'restaurant1' };

    mockRestaurantRepository.findById.mockResolvedValue(restaurant);

    const result = await service.findById(id);

    expect(result).toEqual(restaurant);
    expect(repository.findById).toHaveBeenCalledWith(id);
  });

  describe('searchRestaurants', () => {
    it('should search restaurants with the correct query', async () => {
      const query = 'pizza';
      const expectedSearchConditions = {
        OR: [
          { name: { contains: query } },
          {
            menus: {
              some: {
                products: {
                  some: {
                    OR: [
                      { name: { contains: query } },
                      { description: { contains: query } },
                    ],
                  },
                },
              },
            },
          },
        ],
      };

      const expectedResult = [
        {
          id: '1',
          name: 'Pizza Place',
          menus: [
            {
              id: '1',
              name: 'Main Menu',
              products: [
                {
                  id: '1',
                  name: 'Margherita Pizza',
                  description: 'Classic margherita pizza with fresh basil',
                },
              ],
            },
          ],
        },
      ];

      mockRestaurantRepository.findMany.mockResolvedValue(expectedResult);

      const result = await service.searchRestaurants(query);

      expect(repository.findMany).toHaveBeenCalledWith({
        where: expectedSearchConditions,
        include: {
          menus: {
            include: {
              products: true,
            },
          },
        },
      });
      expect(result).toEqual(expectedResult);
    });

    it('should return an empty array if no restaurants match the query', async () => {
      const query = 'nonexistent';
      const expectedSearchConditions = {
        OR: [
          { name: { contains: query } },
          {
            menus: {
              some: {
                products: {
                  some: {
                    OR: [
                      { name: { contains: query } },
                      { description: { contains: query } },
                    ],
                  },
                },
              },
            },
          },
        ],
      };

      const expectedResult: any[] = [];

      mockRestaurantRepository.findMany.mockResolvedValue(expectedResult);

      const result = await service.searchRestaurants(query);

      expect(repository.findMany).toHaveBeenCalledWith({
        where: expectedSearchConditions,
        include: {
          menus: {
            include: {
              products: true,
            },
          },
        },
      });
      expect(result).toEqual(expectedResult);
    });
  });
});
