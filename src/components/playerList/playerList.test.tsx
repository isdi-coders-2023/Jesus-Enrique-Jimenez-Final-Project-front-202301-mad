/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { PlayersList } from './playerList';

jest.mock('../../hooks/use.players', () => ({
  usePlayers: jest.fn(() => ({
    playersState: { allPlayers: [] },
    loadPlayers: jest.fn(),
  })),
}));

describe('PlayersList', () => {
  const allPlayers = [
    { id: 1, name: 'Player 1', position: 'Forward' },
    { id: 2, name: 'Player 2', position: 'Midfielder' },
    { id: 3, name: 'Player 3', position: 'Defender' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render a list of players', async () => {
    const usePlayersMock = require('../../hooks/use.players').usePlayers;
    usePlayersMock.mockImplementation(() => ({
      playersState: { allPlayers },
      loadPlayers: jest.fn(),
    }));

    render(
      <MemoryRouter>
        <PlayersList />
      </MemoryRouter>
    );

    expect(screen.getByRole('textbox', { name: '' })).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Player 1')).toBeInTheDocument();
      expect(screen.getByText('Player 2')).toBeInTheDocument();
      expect(screen.getByText('Player 3')).toBeInTheDocument();
    });
  });

  it('should filter players by position', async () => {
    const usePlayersMock = require('../../hooks/use.players').usePlayers;
    usePlayersMock.mockImplementation(() => ({
      playersState: { allPlayers },
      loadPlayers: jest.fn(),
    }));

    render(
      <MemoryRouter>
        <PlayersList />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox', { name: '' });
    expect(input).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Player 1')).toBeInTheDocument();
      expect(screen.getByText('Player 2')).toBeInTheDocument();
      expect(screen.getByText('Player 3')).toBeInTheDocument();
    });

    await userEvent.type(input, 'for');
    expect(screen.getByText('Player 1')).toBeInTheDocument();
    expect(screen.queryByText('Player 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Player 3')).not.toBeInTheDocument();

    await userEvent.clear(input);
    await userEvent.type(input, 'def');
    expect(screen.getByText('Player 3')).toBeInTheDocument();
    expect(screen.queryByText('Player 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Player 2')).not.toBeInTheDocument();
  });
});
