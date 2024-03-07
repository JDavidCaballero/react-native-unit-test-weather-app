import LocationService from './LocationService';

describe('LocationService', () => {
  it('should return a position', async () => {
    const position = await LocationService.getCurrentPosition();
    expect(position).toEqual({
      latitude: 0,
      longitude: 0,
    });
  });
});
