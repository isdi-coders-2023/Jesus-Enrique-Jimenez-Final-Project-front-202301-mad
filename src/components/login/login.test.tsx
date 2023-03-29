import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { MemoryRouter as Router } from 'react-router-dom';
import Login from './login';
import { mockStore } from '../../mock/mock.store';
describe('Given the login component', () => {
  describe('When it loads property', () => {
    test('Then it should', async () => {
      render(
        <Provider store={store}>
          <Router>
            <Login />
          </Router>
        </Provider>
      );
      const button = screen.getByRole('button');
      await fireEvent.click(button);
    });
  });
  describe('When it not a loads property', () => {
    test('Then it should', async () => {
      render(
        <Provider store={mockStore}>
          <Router>
            <Login />
          </Router>
        </Provider>
      );
      const button = screen.getByRole('button');
      await fireEvent.click(button);
    });
  });
});
