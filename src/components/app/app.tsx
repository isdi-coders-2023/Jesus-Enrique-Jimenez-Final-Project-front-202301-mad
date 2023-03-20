import { AppRouter } from '../app-router/app.router';
import { Header } from '../header/header';
import { Menu } from '../menu/menu';

export type MenuOption = {
  label: string;
  path: string;
};

export const menuOptions: MenuOption[] = [
  { label: 'access', path: '/access' },
  { label: 'Register', path: '/users/register' },
  { label: 'Login', path: '/users/login' },
];

export function App() {
  return (
    <>
      <Header>
        <Menu options={menuOptions}></Menu>
      </Header>
      <AppRouter menuOptions={menuOptions}></AppRouter>
    </>
  );
}

export default App;
