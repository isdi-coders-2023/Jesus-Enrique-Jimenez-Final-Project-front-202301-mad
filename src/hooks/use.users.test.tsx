/* eslint-disable testing-library/no-unnecessary-act */
import { ServerUser, User } from '../models/users';
import { UsersApiRepo } from '../services/users.api.repo';
import { useUsers } from './use.users';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../store/store';

describe('Given a users custom hook', () => {
  let payloadMock: User;
  let repoMock: UsersApiRepo;
  let mockResponseFalse: ServerUser;

  const mockPass = 'Test';

  beforeEach(async () => {
    payloadMock = {
      email: 'ThisTest@test.com',
      password: mockPass,
    } as unknown as User;

    repoMock = {
      create: jest.fn(),
    } as unknown as UsersApiRepo;

    mockResponseFalse = {
      results: [
        {
          username: 'test',
          email: 'test',
          id: '1',
        },
      ],
    } as unknown as ServerUser;

    const TestComponent = function () {
      const { userLogin, userRegister } = useUsers(repoMock);

      return (
        <>
          <button onClick={() => userLogin(payloadMock)}>Login</button>
          <button onClick={() => userRegister(payloadMock)}>Register</button>
        </>
      );
    };

    await act(async () =>
      // eslint-disable-next-line testing-library/no-render-in-setup
      render(
        <Provider store={store}>
          <TestComponent></TestComponent>
        </Provider>
      )
    );
  });

  describe('When the TestComponent is being rendered', () => {
    test('Then, the buttons should be rendered', async () => {
      const buttons = await screen.findAllByRole('button');
      expect(buttons[0]).toBeInTheDocument();
    });
  });
  describe('When the login button is clicked', () => {
    test('Then, our login method should be called', async () => {
      const buttons = await screen.findAllByRole('button');
      await act(async () => userEvent.click(buttons[0]));
      expect(repoMock.create).toHaveBeenCalled();
    });
  });
  describe('When the Register button is clicked', () => {
    test('Then, our register method should be called', async () => {
      const buttons = await screen.findAllByRole('button');
      await act(async () => userEvent.click(buttons[1]));
      expect(repoMock.create).toHaveBeenCalled();
    });
  });
});
