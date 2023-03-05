import React from 'react';
import { useSelector } from 'react-redux';
import './Header.module.css';
import PublicNav from './PublicNav';
import UserNav from './UserNav';

function Header() {
  const auth = useSelector((state) => state.auth.value.token);
  const user = useSelector((state) => state.auth.value.user);


  return <div>{auth ? <UserNav user={user}/> : <PublicNav />}</div>
}

export default Header;
