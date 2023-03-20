import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MenuOption } from '../app/app';

const Access = lazy(() => import('../access/access'));
const Login = lazy(() => import('../login/login'));
const Register = lazy(() => import('../register/register'));
// const About = lazy(() => import('../about/about'));
// const MyPlayers = lazy(() => import('../myPlayers/myPlayers'));
// const ErrorPage = lazy(() => import('../errorPage/errorPage'));
// const Details = lazy(() => import('../details/details'));
// const EditPage = lazy(() => import('../editPage/editPage'));
// const CreatePage = lazy(() => import('../createPage/createPage'));

type AppRouterProps = {
  menuOptions: MenuOption[];
};

export function AppRouter({ menuOptions }: AppRouterProps) {
  return (
    <Suspense>
      <Routes>
        <Route path={'/'} element={<Access></Access>}></Route>
        <Route path={'/'} element={<Login></Login>}></Route>
        <Route path={'/'} element={<Register></Register>}></Route>
        {/* <Route path={menuOptions[1].path} element={<MyPlayers></MyPlayers>}></Route>
        <Route path={menuOptions[2].path} element={<About></About>}></Route>
        <Route path={'/details/:id'} element={<Details></Details>}></Route>
        <Route path={'/edit'} element={<EditPage editPlayer></EditPage>}></Route>
        <Route path={'/create'} element={<CreatePage></CreatePage>}></Route>
        <Route path={'*'} element={<ErrorPage></ErrorPage>}></Route> */}
      </Routes>
    </Suspense>
  );
}
