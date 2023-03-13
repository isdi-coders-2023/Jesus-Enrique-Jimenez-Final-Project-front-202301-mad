import { render, screen } from '@testing-library/react';

import App from './App';

describe('Given App component', () => {
  describe('When it is render', () => {
    test('Then it should call UsersList component', () => {
      render(<App />);

      const element = screen.getByText('Loading..');
      expect(element).toBeInTheDocument();
    });
  });
});
