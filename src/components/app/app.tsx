import { AppRouter } from '../app-router/app.router';
import Footer from '../footer/footer';
import { Header } from '../header/header';
import { Menu, menuOptions } from '../menu/menu';

function App() {
  return (
    <>
      <div className="App">
        <Header>
          <Menu options={menuOptions}></Menu>
        </Header>
        <AppRouter></AppRouter>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
