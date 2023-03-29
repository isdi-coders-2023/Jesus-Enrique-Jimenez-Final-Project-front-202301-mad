import { screen, fireEvent, render, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useUsers } from '../../hooks/use.users';
import { store } from '../../store/store';
import { MemoryRouter as Router } from 'react-router-dom';
import Register from './register';

jest.mock('../../hooks/use.users');

describe('Given the register function', () => {
  beforeEach(async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      (useUsers as jest.Mock).mockReturnValue({
        userRegister: jest.fn(),
      });
      // eslint-disable-next-line testing-library/no-render-in-setup
      render(
        <Provider store={store}>
          <Router>
            <Register />
          </Router>
        </Provider>
      );
    });
  });

  describe('When it loads property', () => {
    test('Then it should', async () => {
      const button = screen.getByRole('button');
      await fireEvent.click(button);
    });
  });
});
