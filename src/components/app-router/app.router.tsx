import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MenuOption } from '../app/app';

const Access = lazy(() => import('../access/access'));
const Home = lazy(() => import('../home/home'));

const About = lazy(() => import('../about/about'));
const Details = lazy(() => import('../details/details'));
const CreatePlayer = lazy(() => import('../create/create'));
const EditPlayer = lazy(() => import('../edit-player/edit'));

type AppRouterProps = {
  menuOptions: MenuOption[];
};

export function AppRouter({ menuOptions }: AppRouterProps) {
  return (
    <Suspense>
      <Routes>
        <Route path={'/'} element={<Access></Access>}></Route>
        {/* <Route path={'/'} element={<Login></Login>}></Route> */}
        {/* <Route path={'/'} element={<Register></Register>}></Route> */}
        <Route path={menuOptions[0].path} element={<Home></Home>}></Route>
        <Route path={menuOptions[1].path} element={<About></About>}></Route>

        <Route path={'/create'} element={<CreatePlayer></CreatePlayer>}></Route>
        <Route path={'/edit/:id'} element={<EditPlayer></EditPlayer>}></Route>
        <Route path={'/details/:id'} element={<Details></Details>}></Route>
      </Routes>
    </Suspense>
  );
}
