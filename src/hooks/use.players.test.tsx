/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */

import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Player } from '../models/players';
import { PlayersRepo } from '../services/players.api.repo';
import { store } from '../store/store';
import { usePlayers } from './use.players';

jest.mock('react-router-dom');
describe('Given our players custom hook', () => {
  let payloadMock: Player;
  let repoMock: PlayersRepo;
  const mockPass = 'Test!';

  beforeEach(async () => {
    payloadMock = {
      email: 'ThisIsATest@test.com',
      password: mockPass,
    } as unknown as Player;

    const toCreateMock = {
      player: '2',
      age: 3,
      position: 'forward',
    } as unknown as Player;

    repoMock = {
      create: jest.fn(),
      deleteOnPlayer: jest.fn(),
    } as unknown as PlayersRepo;

    const TestComponent = function () {
      const {
        loadPlayers,
        loadOnePlayer,
        createPlayer,
        updatePlayer,
        deleteOnePlayer,
      } = usePlayers(repoMock);

      return (
        <>
          <button onClick={() => loadPlayers()}>players</button>
          <button onClick={() => loadOnePlayer('')}>details</button>
          <button onClick={() => createPlayer(payloadMock)}>create</button>
          <button onClick={() => updatePlayer(payloadMock)}>update</button>
          <button onClick={() => deleteOnePlayer('')}>Delete</button>

          <button onClick={() => createPlayer(toCreateMock)}></button>
        </>
      );
    };

    await act(async () =>
      render(
        <Provider store={store}>
          <Router>
            <TestComponent></TestComponent>
          </Router>
        </Provider>
      )
    );
  });

  describe('When the TestComponent is being rendered', () => {
    test('Then, the buttons should be rendered', async () => {
      const button = await screen.findAllByText('button');
      expect(button[0]).toBeInTheDocument();
    });
  });
  describe('When the loadPlayers button is clicked', () => {
    test('Then, our loadPlayers method should be called', async () => {
      const buttons = await screen.findAllByRole('buttons');
      await act(async () => userEvent.click(buttons[0]));
      expect(repoMock.loadPlayers).toHaveBeenCalled();
    });

    describe('When the create button is clicked', () => {
      test('Then, our createPlayer method should be called', async () => {
        const buttons = await screen.findAllByText('buttons');
        await act(async () => userEvent.click(buttons[1]));
        expect(repoMock.createPlayer).toHaveBeenCalled();
      });
    });
    describe('When delete button is clicked', () => {
      test('Then, our delete method should be called', async () => {
        const buttons = await screen.findAllByRole('button');
        await act(async () => userEvent.click(buttons[2]));
        expect(repoMock.deletePlayer).toHaveBeenCalled();
      });
    });
  });
});
