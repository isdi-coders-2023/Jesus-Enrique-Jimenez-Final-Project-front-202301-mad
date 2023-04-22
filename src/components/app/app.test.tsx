import { render } from '@testing-library/react';
import Footer from '../footer/footer';
import { AppRouter } from '../app-router/app.router';
import App from './app';

jest.mock('../header/header');
jest.mock('../app-router/app.router');
jest.mock('../footer/footer');

describe('Given App component', () => {
  describe('When it is render', () => {
    test('Then it should call UsersList component', () => {
      render(<App />);

      expect(Footer).toHaveBeenCalled();
      expect(AppRouter).toHaveBeenCalled();
      expect(Footer).toHaveBeenCalled();
    });
  });
});
