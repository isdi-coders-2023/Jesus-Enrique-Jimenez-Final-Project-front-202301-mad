import { render, screen } from '@testing-library/react';
import Home from './home';

jest.mock('../PlayerList/PlayerList');

describe('Given the Home component', () => {
  describe('When the component is rendered', () => {
    test('Then the main title should be in the document', () => {
      render(<Home></Home>);
      const elements = screen.getAllByRole('heading');
      expect(elements[0]).toBeInTheDocument();
    });
  });
});
