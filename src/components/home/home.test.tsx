import { render, screen } from '@testing-library/react';
import { PlayersList } from '../playerList/playerList';
import Home from './home';

jest.mock('../playerList/playerList');

describe('Given the Home component', () => {
  describe('When the component is rendered', () => {
    test('Then the main title should be in the document', () => {
      render(<Home></Home>);
      const elements = screen.getAllByRole('heading');
      expect(elements[0]).toBeInTheDocument();
    });
    test('should playersList', () => {
      render(<Home></Home>);

      expect(PlayersList).toHaveBeenCalled();
    });
  });
});
