import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { usePlayers } from '../../hooks/use.players';
import { Player } from '../../models/players';
import { PlayersRepo } from '../../services/players.api.repo';
import { store } from '../../store/store';
import Form from './form';

const mockParams = { id: '2' };

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => mockParams,
}));
jest.mock('../../hooks/use.players');

const mockRepo = {
  url: 'testing',
  loadOnePlayer: jest.fn(),
  createPlayer: jest.fn(),
  updatePlayer: jest.fn(),
  deleteOnePlayer: jest.fn(),
} as unknown as PlayersRepo;
describe('Given the Form component', () => {
  let elements: HTMLElement[];

  describe('When we render the form component', () => {
    beforeEach(async () => {
      (usePlayers as jest.Mock).mockReturnValue({
        playersState: {
          allPlayers: [
            {
              id: '1',
              name: 'test1',
              nationality: 'test1',
            } as Player,
            {
              id: '2',
              name: 'test2',
              nationality: 'test2',
            } as Player,
          ],
        },

        createPlayer: jest.fn(),
        updatePlayer: jest.fn(),
      });
      // eslint-disable-next-line testing-library/no-unnecessary-act
      await act(async () => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(
          <Provider store={store}>
            <MemoryRouter>
              <Form></Form>
            </MemoryRouter>
          </Provider>
        );
      });
    });
    test('Then the Form should appear on the screen', () => {
      const element = screen.getAllByAltText('name');
      expect(element).toBeInTheDocument();
    });

    describe('When the user clicks the submit button and there is an existing player', () => {
      test('then it calls updatePlayers when submitting a player', async () => {
        elements = await screen.findAllByRole('button');
        await userEvent.click(elements[0]);
        expect(usePlayers(mockRepo).updatePlayer).toHaveBeenCalled();
      });
    });
  });
});
