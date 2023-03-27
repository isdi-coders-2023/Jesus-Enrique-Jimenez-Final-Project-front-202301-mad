import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { Menu } from '../menu/menu';
import Header from './header';

jest.mock('../menu/menu');

describe('Given the Header component', () => {
  describe('When the component is rendered', () => {
    test('Then the logo image should be in the document', () => {
      render(
        <Router>
          <Header></Header>
        </Router>
      );
      const element = screen.getByRole('banner');
      expect(element).toBeInTheDocument();
      expect(Menu).toHaveBeenCalled();
    });
  });
});
