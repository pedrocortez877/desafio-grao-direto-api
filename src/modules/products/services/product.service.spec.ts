import { Test, TestingModule } from '@nestjs/testing';
import { ProductRepository } from '../repositories/product.repository';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let repository: ProductRepository;

  const mockProductRepository = {
    findByMenuId: jest.fn(),
    findByName: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ProductRepository,
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get<ProductRepository>(ProductRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find by menu id', async () => {
    const menuId = 'menuId1';
    const product = { id: 'productId1', name: 'product1', menuId };

    mockProductRepository.findByMenuId.mockResolvedValue(product);

    const result = await service.findByMenuId(menuId);

    expect(result).toEqual(product);
    expect(repository.findByMenuId).toHaveBeenCalledWith(menuId);
  });

  it('should find by name', async () => {
    const name = 'product1';
    const product = { id: 'productId1', name, menuId: 'menuId1' };

    mockProductRepository.findByName.mockResolvedValue(product);

    const result = await service.findByName(name);

    expect(result).toEqual(product);
    expect(repository.findByName).toHaveBeenCalledWith(name);
  });
});
