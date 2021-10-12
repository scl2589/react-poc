import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Header from './Header';

const HeaderContainer = () => {
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  return <Header user={user} />;
};

export default HeaderContainer;
