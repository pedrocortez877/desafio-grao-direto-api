import { Test, TestingModule } from '@nestjs/testing';
import { MenuRepository } from '../repositories/menu.repository';
import { MenuService } from './menu.service';

describe('MenuService', () => {
  let service: MenuService;
  let repository: MenuRepository;

  const mockMenuRepository = {
    findByRestaurantId: jest.fn(),
    findByName: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MenuService,
        {
          provide: MenuRepository,
          useValue: mockMenuRepository,
        },
      ],
    }).compile();

    service = module.get<MenuService>(MenuService);
    repository = module.get<MenuRepository>(MenuRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find by restaurant id', async () => {
    const restaurantId = 'restaurantId1';
    const menu = { id: 'menuId1', name: 'menu1', restaurantId };

    mockMenuRepository.findByRestaurantId.mockResolvedValue(menu);

    const result = await service.findByRestaurantId(restaurantId);

    expect(result).toEqual(menu);
    expect(repository.findByRestaurantId).toHaveBeenCalledWith(restaurantId);
  });

  it('should find by name', async () => {
    const name = 'menu1';
    const menu = { id: 'menuId1', name, restaurantId: 'restaurantId1' };

    mockMenuRepository.findByName.mockResolvedValue(menu);

    const result = await service.findByName(name);

    expect(result).toEqual(menu);
    expect(repository.findByName).toHaveBeenCalledWith(name);
  });
});
