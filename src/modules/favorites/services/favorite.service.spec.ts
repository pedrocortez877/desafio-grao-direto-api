import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteService } from './favorite.service';
import { FavoriteRepository } from '../repositories/favorite.repository';
import { Favorite } from '@prisma/client';

describe('FavoriteService', () => {
  let service: FavoriteService;
  let repository: FavoriteRepository;

  const mockFavoriteRepository = {
    createFavorite: jest.fn(),
    removeFavorite: jest.fn(),
    getFavoritesByUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoriteService,
        {
          provide: FavoriteRepository,
          useValue: mockFavoriteRepository,
        },
      ],
    }).compile();

    service = module.get<FavoriteService>(FavoriteService);
    repository = module.get<FavoriteRepository>(FavoriteRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a favorite', async () => {
    const userId = 'userId1';
    const restaurantId = 'restaurantId1';
    const favorite: Favorite = { id: 'favId1', userId, restaurantId };

    mockFavoriteRepository.createFavorite.mockResolvedValue(favorite);

    const result = await service.addFavorite(userId, restaurantId);

    expect(result).toEqual(favorite);
    expect(repository.createFavorite).toHaveBeenCalledWith(
      userId,
      restaurantId,
    );
  });

  it('should remove a favorite', async () => {
    const userId = 'userId1';
    const restaurantId = 'restaurantId1';

    await service.removeFavorite(userId, restaurantId);

    expect(repository.removeFavorite).toHaveBeenCalledWith(
      userId,
      restaurantId,
    );
  });

  it('should get user favorites', async () => {
    const userId = 'userId1';
    const favorites: Favorite[] = [
      { id: 'favId1', userId, restaurantId: 'restaurantId1' },
      { id: 'favId2', userId, restaurantId: 'restaurantId2' },
    ];

    mockFavoriteRepository.getFavoritesByUser.mockResolvedValue(favorites);

    const result = await service.getUserFavorites(userId);

    expect(result).toEqual(favorites);
    expect(repository.getFavoritesByUser).toHaveBeenCalledWith(userId);
  });
});
