import { MemoryRouter as Router, useLocation } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { useUsers } from '../../hooks/use.users';
import Details from '../details/details';

jest.mock('../../hooks/use.users');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useNavigate: () => mockNavigate,
}));

describe('Given the playerDetails component', () => {
  const preparationTest = (role: string) => {
    const location = {
      state: {
        playerProps: { id: '1' },
      },
    };

    (useLocation as jest.Mock).mockReturnValue(location);

    (useUsers as jest.Mock).mockReturnValue({
      usersState: {
        userLogged: {
          role: role,
        },
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <Details></Details>
        </Router>
      </Provider>
    );
  };

  describe('When the component is rendered', () => {
    test('Then the main heading should be in the document', async () => {
      preparationTest('User');
      const element = screen.getByRole('heading');
      expect(element).toBeInTheDocument();
    });
  });
});
