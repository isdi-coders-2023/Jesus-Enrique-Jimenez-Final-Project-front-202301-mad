import { render, screen } from '@testing-library/react';
import Edit from './edit';

jest.mock('../form/form');

describe('Given the Edit component', () => {
  describe('When the component is rendered', () => {
    test('Then the main title should be in the document', () => {
      render(<Edit></Edit>);
      const elements = screen.getAllByRole('heading');
      expect(elements[0]).toBeInTheDocument();
    });
  });
});
