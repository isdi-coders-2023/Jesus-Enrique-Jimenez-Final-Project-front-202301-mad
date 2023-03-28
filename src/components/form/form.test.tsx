/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form, MemoryRouter, Route, Routes } from 'react-router-dom';
import { usePlayers } from '../../hooks/use.players';
import { useUsers } from '../../hooks/use.users';

jest.mock('../../hooks/use.players');
jest.mock('../../hooks/use.users');
jest.mock('../../create/create');
jest.mock('../../edit/edit');

describe('Given form component', () => {
  describe('When it renders with ID the form create an item', () => {
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useParams: jest.fn().mockReturnValue({
        playerEditId: '1234',
      }),
    }));

    let elements: HTMLElement[];

    beforeEach(async () => {
      (usePlayers as jest.Mock).mockReturnValue({
        player: [{ id: '1234' }],
        addPlayer: jest.fn(),
        updatePlayer: jest.fn(),
      });

      (useUsers as jest.Mock).mockReturnValue({
        users: [],
      });

      // eslint-disable-next-line testing-library/no-render-in-setup
      render(
        <MemoryRouter initialEntries={['/edit/1234']}>
          <Routes>
            <Route path="/edit/:playerEditId" element={<Form />} />
          </Routes>
        </MemoryRouter>
      );

      elements = [
        screen.getByRole('heading'),
        ...screen.getAllByRole('textbox'),
        ...screen.getAllByRole('combobox'),
        screen.getByRole('button'),
      ];
    });

    test('Then it should be in the document', () => {
      expect(elements[0]).toBeInTheDocument();
      expect(elements.length).toBe(7);
    });

    test('Then it should be in the screen', async () => {
      const mockText = 'test';
      await act(async () => {
        await userEvent.type(elements[2], mockText);
      });
      await expect(elements[2]).toHaveValue(mockText);
    });

    test('Then submit button and update hook should be called if clicked', async () => {
      await act(async () => {
        await userEvent.click(elements[6]);
      });
      expect(usePlayers).toHaveBeenCalled();
    });
  });

  describe('When it renders without ID the form add an item', () => {
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useParams: jest.fn().mockReturnValue({
        playerEditId: undefined,
      }),
    }));

    let elements: HTMLElement[];

    beforeEach(async () => {
      (usePlayers as jest.Mock).mockReturnValue({
        player: [{ id: '1234' }],
        addPlayer: jest.fn(),
        updatePlayer: jest.fn(),
      });

      (useUsers as jest.Mock).mockReturnValue({
        users: [],
      });

      // eslint-disable-next-line testing-library/no-render-in-setup
      render(
        <MemoryRouter initialEntries={['/edit/1234']}>
          <Routes>
            <Route path="/edit/:playerEditI" element={<Form />} />
          </Routes>
        </MemoryRouter>
      );

      elements = [
        screen.getByRole('heading'),
        ...screen.getAllByRole('textbox'),
        ...screen.getAllByRole('combobox'),
        screen.getByRole('button'),
      ];
    });

    test('Then it should be in the screen', async () => {
      const mockText2 = 'test';

      await act(async () => {
        await userEvent.type(elements[2], mockText2);
      });
      expect(elements[2]).toHaveValue(mockText2);
    });

    test('Then submit button and update hook should be called if clicked', async () => {
      await act(async () => {
        await userEvent.click(elements[6]);
      });
      expect(usePlayers).toHaveBeenCalled();
    });
  });
});
