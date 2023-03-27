import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { Player } from '../../models/players';

import { store } from '../../store/store';
import { Card } from './card';

const mockPlayer = {
  id: 'idTest',
  name: 'name test',
  images: ['1', '2'],
} as unknown as Player;

describe('Given the card component', () => {
  beforeEach(async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      // eslint-disable-next-line testing-library/no-render-in-setup
      render(
        <Provider store={store}>
          <Router>
            <Card player={mockPlayer}></Card>
          </Router>
        </Provider>
      );
    });
  });

  describe('when the CARD component is rendered', () => {
    test('then it should contain the list role', () => {
      const elements = screen.getAllByRole('listitem');
      expect(elements[0]).toBeInTheDocument();
    });
  });
});
