/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { usePlayers } from '../../hooks/use.players';
import { Player } from '../../models/players';
import { PlayersRepo } from '../../services/players.api.repo';
import { store } from '../../store/store';
import { PlayersList } from './playerList';

jest.mock('../../hooks/use.players');
jest.mock('../card/card');

const mockRepo = {
  url: 'testing',
  loadPlayers: jest.fn(),
  loadOnePlayer: jest.fn(),
  createPlayer: jest.fn(),
  updatePlayer: jest.fn(),
  deletePlayer: jest.fn(),
} as unknown as PlayersRepo;
describe('Given players List component', () => {
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

      loadPlayers: jest.fn(),
    });

    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <PlayersList></PlayersList>
          </MemoryRouter>
        </Provider>
      );
    });
  });

  describe('When the players list component is rendered', () => {
    test("Then it should appear the 'crear jugador' button", async () => {
      await act(async () => {
        const buttons = await screen.findAllByRole('button');
        expect(buttons[0]).toBeInTheDocument();
        await userEvent.click(buttons[1]);
        expect(usePlayers(mockRepo).loadPlayers).toHaveBeenCalled();
      });
    });
  });
});
