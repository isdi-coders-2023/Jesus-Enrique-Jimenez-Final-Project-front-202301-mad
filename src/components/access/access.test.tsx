import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../store/store';
import Access from './access';

jest.mock('../register/register');

describe('Given the access component', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Access></Access>
        </BrowserRouter>
      </Provider>
    );
  });

  test('then the handleChange function should handle the case when boolean is equal to toChange', () => {
    const button1 = screen.getByText('Login');
    fireEvent.click(button1);
    fireEvent.click(button1);

    const button2 = screen.getByText('Register');
    fireEvent.click(button2);
    fireEvent.click(button2);

    const login = screen.queryByText('Login');
    expect(login).toBeInTheDocument();

    const register = screen.queryByText('Register');
    expect(register).toBeInTheDocument();
  });
});
