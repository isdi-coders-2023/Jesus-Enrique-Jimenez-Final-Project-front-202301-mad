import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Details from './details';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ player: 'test-id' }),
}));

jest.mock('../../hooks/use.players', () => ({
  usePlayer: () => ({
    allPlayers: [
      {
        id: 'test-id',
        position: 'test',
        foot: 'test',
        image: 'image-url',
        nationality: 'brazilian',
        name: 'test',
        age: 3,
        creator: { name: 'test-name' },
      },
    ],
    loadOnePlayer: jest.fn(() => ({
      id: 'test-id',
      position: 'test',
      foot: 'test',
      image: 'image-url',
      nationality: 'brazilian',
      name: 'test',
      age: 3,
      creator: { name: 'test-name' },
    })),
  }),
}));

describe('Given a detail component', () => {
  describe('When it renders and the detail is undefined', () => {
    test('Then it should return a loading message', () => {
      render(
        <MemoryRouter>
          <Details></Details>
        </MemoryRouter>
      );
      const element = screen.getByRole('heading');
      expect(element).toBeInTheDocument();
    });
  });
});
