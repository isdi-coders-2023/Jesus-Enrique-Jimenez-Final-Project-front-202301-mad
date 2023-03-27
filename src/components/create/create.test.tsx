import { render, screen } from '@testing-library/react';

import Create from './create';

jest.mock('../form/form');

describe('Given the Create component', () => {
  describe('When the component is rendered', () => {
    test('Then the main title should be in the document', () => {
      render(<Create></Create>);

      const element = screen.getByRole('heading');
      expect(element).toBeInTheDocument();
    });
  });
});
