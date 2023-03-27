import { AppRouter } from '../app-router/app.router';
import React from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';

export type MenuOption = {
  label: string;
  path: string;
};
export const menuOptions: MenuOption[] = [
  { label: 'home', path: '/home' },
  { label: 'About', path: '/About' },
  { label: 'MyPlayers', path: '/MyPlayers' },
];

function App() {
  return (
    <>
      <Header></Header>
      <AppRouter menuOptions={menuOptions}></AppRouter>
      <Footer></Footer>
    </>
  );
}

export default App;
