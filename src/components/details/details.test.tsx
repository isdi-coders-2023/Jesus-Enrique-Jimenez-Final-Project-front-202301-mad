/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { usePlayers } from '../../hooks/use.players';
import { Player } from '../../models/players';
import { store } from '../../store/store';
import Details from './details';

jest.mock('../../hooks/use.players');
jest.mock('../home/home');
jest.mock('../card/card');
describe('Given details component', () => {
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
      loadOnePlayer: jest.fn(),
      deletePlayer: jest.fn(),
    });

    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <Details></Details>
          </MemoryRouter>
        </Provider>
      );
    });
  });

  describe('When the details component is rendered', () => {
    test("Then it should appear the 'eliminar' button", async () => {
      await act(async () => {
        const buttons = await screen.findAllByRole('button');
        expect(buttons[0]).toBeInTheDocument();
        await userEvent.click(buttons[1]);
        expect(usePlayers).toHaveBeenCalled();
      });
    });
  });
});
