import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MenuOption } from '../../core/app/App';

// Temp const Register = lazy(() => import('../components/register/register'));
const Login = lazy(() => import('../../feature/components/login/login'));
// const Users = lazy(() => import('../components/user.list/user.list'));

type AppRouterProps = {
  menuOptions: MenuOption[];
};

export function AppRouter({ menuOptions }: AppRouterProps) {
  return (
    <Suspense>
      <Routes>
        {/* <Route path={"/"} element={<Register></Register>}></Route> */}
        <Route
          path={menuOptions[0].path}
          //          element={<Register></Register>}
        ></Route>
        <Route path={menuOptions[1].path} element={<Login></Login>}></Route>
        {/* <Route path={menuOptions[2].path} element={<Users></Users>}></Route>
        <Route path={'*'} element={<Users></Users>}></Route> */}
      </Routes>
    </Suspense>
  );
}
