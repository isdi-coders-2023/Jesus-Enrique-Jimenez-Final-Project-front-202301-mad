import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './footer';

describe('Given Footer component', () => {
  describe('When it is render', () => {
    test('Then it should have the footer in the screen', () => {
      render(<Footer></Footer>);
      const element = screen.getByText('Follow us on');
      expect(element).toBeInTheDocument();
    });
  });
});
