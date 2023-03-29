/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */

import { configureStore } from '@reduxjs/toolkit';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Player, ServerPlayer } from '../models/players';
import { playerReducer } from '../reducer/players.slice';
import { userReducer } from '../reducer/users.slice';
import { PlayersRepo } from '../services/players.api.repo';
import { store } from '../store/store';
import { usePlayers } from './use.players';

jest.mock('@firebase/storage', () => ({
  ...jest.requireActual,
  ref: jest.fn().mockReturnValue('storage'),
  getStorage: jest.fn().mockReturnValue(''),
  getDownloadURL: jest.fn().mockReturnValue(''),
}));

const mockStore = configureStore({
  reducer: {
    users: userReducer,
    players: playerReducer,
  },
  preloadedState: {
    users: {
      allUsers: [
        {
          id: '',
          userName: 'test',
          password: '2',
          players: [],
          email: 'test',
          results: 'test',
        },
      ],
      user: {
        id: '',
        userName: 'test',
        password: 'test',
        players: [],
        email: 'test',
        results: 'test',
      },
      userLogged: {
        id: '',
        token: 'TestToken',
        userName: 'test',
        password: 'test',
        players: [],
        email: 'test',
        results: 'test',
      },
    },
  },
});
describe('Given our players custom hook', () => {
  let payloadMock: Player;
  let repoMock: PlayersRepo;

  describe('Given our players custom hook is rendered', () => {
    beforeEach(async () => {
      payloadMock = {
        player: '2',
        age: 3,
        position: 'forward',
      } as unknown as Player;

      repoMock = {
        createPlayer: jest.fn(),
        deletePlayer: jest.fn(),
        updatePlayer: jest.fn(),
        loadPlayers: jest.fn(),
        loadOnePlayer: jest.fn(),
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
            <button onClick={() => loadPlayers()}></button>
            <button onClick={() => loadOnePlayer('1')}></button>
            <button onClick={() => createPlayer(payloadMock)}>create</button>
            <button onClick={() => updatePlayer(payloadMock)}>update</button>
            <button onClick={() => deleteOnePlayer('7')}>Delete</button>

            <button onClick={() => createPlayer(payloadMock)}></button>
          </>
        );
      };

      await act(async () =>
        render(
          <Provider store={mockStore}>
            <Router>
              <TestComponent></TestComponent>
            </Router>
          </Provider>
        )
      );
    });

    describe('When we render it', () => {
      test('Then it has to be a button', async () => {
        const elements = await screen.findAllByRole('button');
        expect(elements[0]).toBeInTheDocument();
        expect(elements[1]).toBeInTheDocument();
        expect(elements[2]).toBeInTheDocument();
        expect(elements[3]).toBeInTheDocument();
        expect(elements[4]).toBeInTheDocument();
        expect(elements[5]).toBeInTheDocument();
      });
    });

    describe('When i use the load players function', () => {
      test('Then the function should be called', async () => {
        const elements = await screen.findAllByRole('button');
        await userEvent.click(elements[0]);
        expect(repoMock.loadPlayers).toHaveBeenCalled();
      });
    });

    describe('When i use the loadOnePlayer function', () => {
      test('Then the function should be called', async () => {
        const elements = await screen.findAllByRole('button');
        await userEvent.click(elements[1]);
        expect(repoMock.loadOnePlayer).toHaveBeenCalled();
      });
    });
    describe('When i use the updatePlayer function', () => {
      test('Then the function should be called', async () => {
        const elements = await screen.findAllByRole('button');
        await userEvent.click(elements[3]);
        expect(repoMock.updatePlayer).toHaveBeenCalled();
      });
    });

    describe('When i use the create new pet function', () => {
      test('Then the function should be called', async () => {
        const elements = await screen.findAllByRole('button');
        (repoMock.createPlayer as jest.Mock).mockReturnValue(
          {} as ServerPlayer
        );
        await fireEvent.click(elements[2]);
        expect(repoMock.createPlayer).toHaveBeenCalled();
      });
    });
    describe('When i use the delete player function', () => {
      test('Then the function should be called', async () => {
        const elements = await screen.findAllByRole('button');
        await fireEvent.click(elements[4]);
        await act(async () => userEvent.click(elements[4]));
        expect(repoMock.deletePlayer).toHaveBeenCalled();
      });
    });
  });
  describe('Given our players custom hook be rendered', () => {
    beforeEach(async () => {
      payloadMock = {
        player: '2',
        age: 3,
        position: 'forward',
      } as unknown as Player;

      repoMock = {
        createPlayer: jest.fn(),
        deletePlayer: jest.fn(),
        updatePlayer: jest.fn(),
        loadPlayers: jest.fn(),
        loadOnePlayer: jest.fn(),
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
            <button onClick={() => loadPlayers()}></button>
            <button onClick={() => loadOnePlayer('1')}></button>
            <button onClick={() => createPlayer(payloadMock)}>create</button>
            <button onClick={() => updatePlayer(payloadMock)}>update</button>
            <button onClick={() => deleteOnePlayer('7')}>Delete</button>

            <button onClick={() => createPlayer(payloadMock)}></button>
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

    describe('When i render it', () => {
      test('Then it has to be a button', async () => {
        const elements = await screen.findAllByRole('button');
        expect(elements[0]).toBeInTheDocument();
        expect(elements[1]).toBeInTheDocument();
        expect(elements[2]).toBeInTheDocument();
        expect(elements[3]).toBeInTheDocument();
        expect(elements[4]).toBeInTheDocument();
        expect(elements[5]).toBeInTheDocument();
      });
    });

    describe('When we use the load players function', () => {
      test('Then the function should be called', async () => {
        const elements = await screen.findAllByRole('button');
        await userEvent.click(elements[0]);
        expect(repoMock.loadPlayers).not.toHaveBeenCalled();
      });
    });

    describe('When we use the loadOnePlayer function', () => {
      test('Then the function should be called', async () => {
        const elements = await screen.findAllByRole('button');
        await userEvent.click(elements[1]);
        expect(repoMock.loadOnePlayer).not.toHaveBeenCalled();
      });
    });
    describe('When we use the updatePlayer function', () => {
      test('Then the function should be called', async () => {
        const elements = await screen.findAllByRole('button');
        await userEvent.click(elements[3]);
        expect(repoMock.updatePlayer).not.toHaveBeenCalled();
      });
    });

    describe('When we use the create new pet function', () => {
      test('Then the function should be called', async () => {
        const elements = await screen.findAllByRole('button');
        (repoMock.createPlayer as jest.Mock).mockReturnValue(
          {} as ServerPlayer
        );
        await fireEvent.click(elements[2]);
        expect(repoMock.createPlayer).not.toHaveBeenCalled();
      });
    });
    describe('When we use the delete player function', () => {
      test('Then the function should be called', async () => {
        const elements = await screen.findAllByRole('button');
        await fireEvent.click(elements[4]);
        await act(async () => userEvent.click(elements[4]));
        expect(repoMock.deletePlayer).not.toHaveBeenCalled();
      });
    });
  });
});
